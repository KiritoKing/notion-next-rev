import "server-only";

// "https://chlorinec.notion.site/ab150808bb7e4230be458672b38fc02e?v=01b72e6c718c4ec7b2a35b6d760e5318&pvs=4",
import { NotionAPI } from "notion-client";

const notion = new NotionAPI({
  authToken: process.env.NOTION_TOKEN,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getMapValue<T extends Record<string, any>>(
  map: T,
  key: number | string = 0,
): T[keyof T] {
  if (typeof key === "number") {
    return map[Object.keys(map)[key]];
  } else {
    return map[key];
  }
}

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

export async function getPageData(pageId: string) {
  const page = await notion.getPage(pageId);
  return page;
}
