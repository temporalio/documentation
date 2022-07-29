import { Client, LogLevel } from '@notionhq/client'
import fs from 'fs-extra';

export async function getQuestionsFromNotion(config) {
  console.log("getting questions from Notion...");
  const notion = new Client({
    auth: config.notion_key,
    // logLevel: LogLevel.DEBUG,
  });
  const notionPages = [];
  let hasMore = true;
  let cursor = undefined;
  while(hasMore) {
    const pages = await notion.databases.query({
      database_id: config.notion_db,
      page_size: 100,
      start_cursor: cursor,
      filter: {
        or: [
          {
            property: 'Type',
            multi_select: {
              contains: 'Question',
            },
          },
        ],
      },
    });
    hasMore = pages.has_more;
    cursor = pages.next_cursor;
    notionPages.push(...pages.results);
  }
  console.log("writing questions to file...");
  await fs.writeJSON(config.notion_store_file_name, notionPages);
  return;
}
