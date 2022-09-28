import {Client} from "@notionhq/client";
import fs from "fs-extra";
import path from "path";

export async function getQuestionsFromNotion(config) {
  console.log("getting pages from the Coverage Board...");
  const notionCreds = await fs.readJSON("./secure/notion-creds.json");
  const notion = new Client({
    auth: notionCreds.notion_key,
  });
  const notionPages = [];
  let hasMore = true;
  let cursor = undefined;
  while (hasMore) {
    const pages = await notion.databases.query({
      database_id: notionCreds.notion_db,
      page_size: 100,
      start_cursor: cursor,
      filter: {
        or: [
          {
            property: "Type",
            multi_select: {
              contains: "Question",
            },
          },
        ],
      },
    });
    hasMore = pages.has_more;
    cursor = pages.next_cursor;
    notionPages.push(...pages.results);
  }
  const writePath = path.join(
    config.root_dir,
    config.temp_write_dir,
    config.notion_store_file_name
  );
  await fs.writeJSON(writePath, notionPages);
  return;
}
