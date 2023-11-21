// @ts-nocheck

import { NotionAPI } from "@/lib/notion-api";

const notion = new NotionAPI();

export async function getPageBlocks(id: string) {
  const pageBlock = await notion.getPage(id);
  return pageBlock;
}
