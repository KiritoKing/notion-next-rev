import "server-only";

// "https://chlorinec.notion.site/ab150808bb7e4230be458672b38fc02e?v=01b72e6c718c4ec7b2a35b6d760e5318&pvs=4",
import { NotionAPI } from "notion-client";
import { cache } from "react";
import type { NotionRenderer } from "react-notion-x";

import { BlogItem } from "@/components/blog/BlogList";
import { getMappedProperties, getMapValue } from "@/utils/notion";

const notion = new NotionAPI({
  authToken: process.env.NOTION_TOKEN,
});

export interface PageData {
  metadata: Partial<BlogItem>;
  recordMap: Parameters<typeof NotionRenderer>[0]["recordMap"];
}

export const getPageDataWithCache = cache(
  async (pageId: string): Promise<PageData> => {
    const recordMap = await notion.getPage(pageId);
    const properties = getMappedProperties(recordMap);
    console.log(properties);

    return {
      metadata: {
        title: properties.title?.value,
        tags: properties.tag?.value.split(",") ?? [],
      },
      recordMap,
    };
  },
);

export async function parseDatabase(databaseId?: string) {
  if (!databaseId) {
    throw new Error("You must provide DATABASE_ID in environment variables");
  }
  const page = await notion.getPage(databaseId);
  const blockIds = Object.keys(page.block);
  const blocks = page.block;
  const collection = getMapValue(page.collection).value;
  return [blockIds, blocks, collection, page] as const; // index=0是CollectionView，index=1是当前Parent信息，index>2才是子页面
}
