import {Client, LogLevel} from "@notionhq/client";
import fs from "fs-extra";
import path from "path";

export async function updateNotion(config) {
  console.log("comparing data...");
  const notionPages = await fs.readJSON(
    path.join(config.root, config.notion_store_file_name)
  );
  const docsQuestions = await fs.readJSON(
    path.join(config.root, config.docs_store_file_name)
  );
  const notion = new Client({
    auth: config.notion_key,
    // logLevel: LogLevel.DEBUG,
  });
  for (const question of docsQuestions) {
    let foundIt = false;
    let notionPage = {};
    let pageCount = 0;
    for (const page of notionPages) {
      if (question.text == page.properties.Name.title[0].plain_text) {
        foundIt = true;
        notionPage = page;
        break;
      }
      pageCount++;
    }
    if (foundIt) {
      console.log(`found one, updating ${question.text}...`);
      notion.pages.update({
        page_id: notionPage.id,
        properties: {
          Exists: {
            select: {
              name: "Exists",
            },
          },
          Location: {
            url: convertToURL(question.slug),
          },
        },
      });
    } else {
      console.log(`missing ${question.text}, adding now...`);
      notion.pages.create({
        parent: {database_id: config.notion_db},
        properties: {
          Exists: {name: "Exists"},
          Type: [{name: "Question"}],
          Location: convertToURL(question.slug),
          title: [{text: {content: question.text}}],
        },
      });
    }
  }
  return;
}

function convertToURL(slug) {
  return `https://docs.temporal.io/${slug}`;
}
