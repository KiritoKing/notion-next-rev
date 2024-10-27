import "server-only";

import { LRUCache } from "lru-cache";
import { NotionAPI } from "notion-client";
import { cache } from "react";
import type { NotionRenderer } from "react-notion-x";

import type { BlogItem } from "@/components/blog/BlogList";
import {
  ExtendedRecordMap,
  extractProperty,
  getMappedProperties,
  getMappedPropertiesFromPage,
  getMapValue,
} from "@/utils/notion";
import { memoize } from "lodash";

const notion = new NotionAPI({
  authToken: process.env.NOTION_TOKEN,
});

const pageCache = new LRUCache<string, ExtendedRecordMap>({
  max: 100,
  ttl: 1000 * 60 * 10,
  fetchMethod: async (key) => await notion.getPage(key),
});

export interface TOCItem {
  id: string;
  level: number;
  text: string;
  parent: TOCItem | null;
  children?: TOCItem[];
}

export interface PageData {
  metadata: Partial<BlogItem>;
  recordMap: Parameters<typeof NotionRenderer>[0]["recordMap"];
  toc: TOCItem[];
}

export const getPageDataWithCache = cache(
  async (pageId: string): Promise<PageData> => {
    let recordMap: ExtendedRecordMap;
    if (pageCache.has(pageId)) {
      recordMap = pageCache.get(pageId)!;
    } else {
      recordMap = await notion.getPage(pageId);
      pageCache.set(pageId, recordMap);
    }
    const properties = getMappedPropertiesFromPage(recordMap);
    // 获取目录
    const toc: TOCItem[] = [];
    let previousAnchor: TOCItem | null = null;
    const headers = Object.values(recordMap.block)
      .filter((block) => block.value?.type.includes("header"))
      .map((block) => {
        return block.value;
      });

    headers.forEach((header) => {
      const level = header.type.split("_").reduce((acc, cur) => {
        if (cur === "sub") {
          return acc + 1;
        }
        return acc;
      }, 1);
      const text = extractProperty(header.properties.title);
      if (!text) {
        return;
      }
      const h: TOCItem = {
        id: header.id.replace(/-/g, ""),
        level,
        text: extractProperty(header.properties.title) ?? "",
        parent: null,
      };
      let parent = previousAnchor;
      while (parent && parent.level >= level) {
        parent = parent.parent;
      }
      if (parent) {
        h.parent = parent;
        parent.children ||= [];
        parent.children.push(h);
      } else {
        toc.push(h);
      }
      previousAnchor = h;
    });

    return {
      metadata: {
        title: properties.title?.value,
        tags: properties.tag?.value.split(",") ?? [],
      },
      recordMap,
      toc,
    };
  },
);

export interface NotionContext {
  /** 仅包含元数据的博客列表 */
  pageEntries: BlogItem[];
  /** 记录tag到pageId的对应关系 */
  tagFilters: Record<string, string[]>;
  /** 记录category到pageId的对应关系 */
  categoryFilters: Record<string, string[]>;
}

export async function fetchNotionContext(
  databaseId?: string,
): Promise<NotionContext> {
  if (!databaseId) {
    throw new Error("You must provide DATABASE_ID in environment variables");
  }

  const databasePage = await notion.getPage(databaseId);

  const blockMap = databasePage.block;
  const collection = getMapValue(databasePage.collection)?.value;

  if (!collection) {
    throw new Error("No collection found in database");
  }

  const schema = collection.schema;

  const tableView = Object.values(databasePage.collection_view).find(
    (value) => value.value.type === "table",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) as any;
  if (!tableView) {
    throw new Error("No table view found in database");
  }

  const tagFilters: Record<string, string[]> = {};
  const categoryFilters: Record<string, string[]> = {};

  const pageEntries: BlogItem[] = (
    (tableView.value.page_sort as string[]) ?? []
  )
    .filter((id) => {
      const block = blockMap[id]?.value;
      if (!block) {
        return false;
      }
      const tranformedProperties = getMappedProperties(
        block.properties,
        schema,
      );
      // TODO: 状态字段改为可配置
      return tranformedProperties["status"]?.value === "已发表";
    })
    .map((id) => {
      const block = blockMap[id].value;
      const tranformedProperties = getMappedProperties(
        block.properties,
        schema,
      );
      return {
        id: block.id,
        title: tranformedProperties.title?.value,
        tags: tranformedProperties.tag?.value.split(",") ?? [],
        pubDate: new Date(block.created_time),
        categories: tranformedProperties.category?.value.split(",") ?? [],
        excerpt: tranformedProperties.excerpt?.value,
      };
    });

  pageEntries.forEach((item) => {
    if (item.tags) {
      item.tags.forEach((tag) => {
        if (tag in tagFilters) {
          tagFilters[tag].push(item.id);
        } else {
          tagFilters[tag] = [item.id];
        }
      });
    }
    if (item.categories) {
      item.categories.forEach((category) => {
        if (category in categoryFilters) {
          categoryFilters[category].push(item.id);
        } else {
          categoryFilters[category] = [item.id];
        }
      });
    }
  });

  const context = {
    pageEntries,
    tagFilters,
    categoryFilters,
  };

  return context;
}

const memoizedFetchNotionContext = memoize(fetchNotionContext);
export const getNotionContextWithCache = cache(memoizedFetchNotionContext);

export const clearCache = () => {
  pageCache.clear();
  memoizedFetchNotionContext.cache.clear?.();
};
