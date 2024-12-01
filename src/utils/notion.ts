/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import type { ExtendedRecordMap } from "notion-types";

import type { BlogItem } from "@/components/blog/BlogList";
import type { BlogFilter } from "@/types/schema";

dayjs.extend(utc);
dayjs.extend(timezone);

export type Collection = ExtendedRecordMap["collection"][string];
export type CollectionValue = Collection["value"];
export type PropertySchema = CollectionValue["schema"];
export type Block = ExtendedRecordMap["block"][string];
export type BlockValue = Block["value"];
export type Property = BlockValue["properties"][string];

/**
 * Notion API中很多property的格式是 `any[][]` 这样的，比如 [["foo"]]
 *
 * 这个函数的作用是从这种格式（[["foo"]]）中提取出 "foo"
 * @param value API输出property格式，形如 [["foo"]]
 * @returns 提取出的值，形如 "foo"
 * @example
 * const title = extractProperty(block.properties.title);
 */
export function extractStringProperty(value: Property): string | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }

  return value
    .map((v) => {
      if (!Array.isArray(v) || v.length < 1) {
        return "";
      }
      return v[0];
    })
    .join("");
}

/**
 * 针对提取标题这个高频场景的简单封装
 * @param block 一定是PageBlock，才能保证有title
 * @returns 若有title，提取出title，否则返回`undefined`
 */
export function extractTitleFromPageBlock(block: Block) {
  if (
    block.value?.type === "page" &&
    block.value.properties &&
    block.value.properties.title
  ) {
    return extractStringProperty(block.value.properties.title);
  }
}

/**
 * 针对获取全页数据的属性做的简单封装
 * @param wholePage
 * @returns
 */
export function getMappedPropertiesFromPage(
  wholePage: ExtendedRecordMap,
): Record<string, { value: string; schema: PropertySchema[string] }> {
  const pageBlock = Object.values(wholePage.block)[0];
  if (!pageBlock) {
    return {};
  }
  const collection = getMapValue(wholePage.collection);
  if (!collection) {
    return {};
  }
  const properties = pageBlock.value.properties;
  const schema = collection.value.schema;

  return getMappedProperties(properties, schema);
}

export type MappedProperty = Record<
  string,
  { value: string; schema: PropertySchema[string]; raw: string; type: string }
>;

/**
 * 将Notion API的property对象（rawProps）的key是一个hash-id，其真实名称存储在 `page.collection.schema` 中
 *
 * 该函数将原property对象利用schema进行还原，输出正确的名称key
 * @param rawProps Notion API得到的property对象
 * @param schema Notion API得到的`collection.schema`对象
 * @returns 还原正确名称后的property
 */
export function getMappedProperties(
  rawProps: any,
  schema: PropertySchema,
): MappedProperty {
  const mappedProperties: MappedProperty = {};

  for (const key in rawProps) {
    const propSchema = schema[key];
    if (propSchema?.name) {
      let value = extractStringProperty(rawProps[key]) ?? "";
      if (propSchema.type.includes("date")) {
        const raw = rawProps[key]?.[0]?.[1]?.[0]?.[1];
        if (raw) {
          value = dayjs
            .tz(`${raw.start_date} ${raw.start_time ?? ""}`, raw.time_zone)
            .toISOString();
        }
      }
      mappedProperties[propSchema.name] = {
        value,
        type: propSchema.type,
        schema: propSchema,
        raw: JSON.stringify(rawProps[key]),
      };
    }
  }

  return mappedProperties;
}

/**
 * 由于Notion API的返回值有很多Map，为了方便取用Map中的值，提供了这个函数，并提供默认的类型推导
 *
 * 该函数一般用于提取Map中的第一个值，也可以提取指定key的值
 *
 * @param map 形如`Record<string, any>`的值
 * @param key 可留空，若留空则取第一个值，不留空则取指定值
 * @returns 返回对应的值，可能得到`undefined`
 * @example
 * const collection = getMapValue(databasePage.collection)?.value;
 */
export function getMapValue<T extends Record<string, any>>(
  map: T,
  key: number | string = 0,
): T[keyof T] | undefined {
  if (typeof key === "number") {
    return map[Object.keys(map)[key]];
  } else {
    return map[key];
  }
}

export function getFilterdBlog(blogs: BlogItem[], filter?: BlogFilter) {
  const { category, tags, orderby } = filter || {};
  return blogs
    .filter((blog) => {
      if (category && !blog.categories?.includes(category)) {
        return false; // 排除掉不是该频道的
      }
      if (tags?.length && !tags.some((tag) => blog.tags?.includes(tag))) {
        return false; // 排除掉和当前标签没有任何交集的
      }
      return true;
    })
    .sort((a, b) => {
      if (orderby === "latest") {
        return b.pubDate.getTime() - a.pubDate.getTime();
      } else {
        // TODO: 兼容hit语法
        return 1;
      }
    });
}
