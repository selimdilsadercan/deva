// @ts-nocheck

import { getDateValue, getTextContent } from "notion-utils";
import { NotionAPI } from "../lib/notion-api";

const notion = new NotionAPI();

export async function getPageProperties(id: any, block: any, schema: any) {
  const rawProperties = Object.entries(block?.[id]?.value?.properties || []);

  const excludeProperties = ["date", "select", "multi_select", "person", "relation"];
  const properties: any = {};

  for (const [key, val] of rawProperties) {
    properties.id = id;
    if (schema[key]?.type && !excludeProperties.includes(schema[key].type)) {
      properties[schema[key].name] = getTextContent(val);
    }
    ////
    else {
      switch (schema[key]?.type) {
        case "relation": {
          properties[schema[key].name] = extractItems(val);
          break;
        }

        case "date": {
          const dateProperty = getDateValue(val);
          delete dateProperty.type;
          properties[schema[key].name] = dateProperty;
          break;
        }

        case "select":
        case "multi_select": {
          const selects = getTextContent(val);
          if (selects[0]?.length) {
            properties[schema[key].name] = selects.split(",");
          }
          break;
        }

        case "person": {
          const rawUsers = val.flat();
          const users = [];
          for (let i = 0; i < rawUsers.length; i++) {
            if (rawUsers[i][0][1]) {
              const userId = rawUsers[i][0];
              const res = await notion.getUsers(userId);
              const resValue = res?.recordMapWithRoles?.notion_user?.[userId[1]]?.value;
              const user = {
                id: resValue?.id,
                first_name: resValue?.given_name,
                last_name: resValue?.family_name,
                profile_photo: resValue?.profile_photo
              };
              users.push(user);
            }
          }
          properties[schema[key].name] = users;
          break;
        }
        default:
          break;
      }
    }
  }
  return properties;
}

function extractItems(meta: any[][]) {
  const items = [];

  for (const element of meta) {
    if (element[0] === "‣" && element[1] && element[1][0] && element[1][0][0] === "p") {
      const relation = element[1][0][1];
      items.push(relation);
    }
  }

  return items;
}
