"use server";

import { clearCache } from "@/service/notion";

export async function clearCacheAsync() {
  clearCache();

  return { ok: true };
}
