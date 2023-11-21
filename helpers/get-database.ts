// @ts-nocheck

import { TPosts } from "@/types/post";
import { idToUuid } from "notion-utils";
import { getAllPageIds } from "@/lib/get-all-page-ids";
import { getPageProperties } from "@/helpers/get-database-item";
import { mapImgUrl } from "@/lib/map-image";
import { NotionAPI } from "@/lib/notion-api";
import { getPageBlocks } from "./get-page";

const notion = new NotionAPI();

export async function getAllPosts({ includePages = false }) {
  const NOTION_PAGE_ID = "4cd247d1744e48bbb43cfd21aeb33091";
  const id = idToUuid(NOTION_PAGE_ID);

  const response = await notion.getPage(id);
  const collection = Object.values(response.collection)[0]?.value;
  const collectionQuery = response.collection_query;
  const block = response.block;
  const schema = collection?.schema;

  const a = await notion.getPage("8abfa225162e4198a0b12f3f0523ba32");

  const rawMetadata = block[id].value;

  if (rawMetadata?.type !== "collection_view_page" && rawMetadata?.type !== "collection_view") {
    console.log(`pageId "${id}" is not a database`);
    return null;
  }

  const pageIds = getAllPageIds(collectionQuery); //databasedeki  tüm sayfaların idlerini alıyoruz

  const data = [];

  for (const id of pageIds) {
    const properties = (await getPageProperties(id, block, schema)) || null;

    properties.fullWidth = block[id].value?.format?.page_full_width ?? false;
    properties.createdTime = new Date(block[id].value?.created_time).toISOString();
    properties.thumbnail = mapImgUrl(block[id].value?.format?.page_cover, block[id].value) ?? "";
    properties.icon = block[id].value?.format?.page_icon || "";

    data.push(properties);
  }

  // Sort by date
  data.sort((a: any, b: any) => {
    const dateA: any = new Date(a?.date?.start_date || a.createdTime);
    const dateB: any = new Date(b?.date?.start_date || b.createdTime);
    return dateB - dateA;
  });

  const posts = data as TPosts;
  return posts;
}
