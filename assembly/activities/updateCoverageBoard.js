import {Client, LogLevel} from "@notionhq/client";
import fs from "fs-extra";
import path from "path";

const titleQuestionRegex = /^(What|How|When|Where|Why|Who|By whom).*/gm;

export async function updateCoverageBoard(config) {
  console.log("updating the coverage boards...");
  const notionPagesReadPath = path.join(
    config.root_dir,
    config.temp_write_dir,
    config.notion_store_file_name
  );
  const notionPages = await fs.readJSON(notionPagesReadPath);
  const matchedGuidesReadPath = path.join(
    config.root_dir,
    config.temp_write_dir,
    config.guide_configs_with_attached_nodes_file_name
  );
  const matchedGuides = await fs.readJSON(matchedGuidesReadPath);
  const notionCredsReadPath = path.join(
    config.root_dir,
    config.secure_config_dir,
    config.notion_creds_file_name
  );
  const secureData = await fs.readJSON(notionCredsReadPath);
  const notion = new Client({
    auth: secureData.notion_key,
    // logLevel: LogLevel.DEBUG,
  });

  const uniquePages = await deDuplicatePages(notion, notionPages);

  for (const link of matchedGuides.full_index) {
    let foundOne = false;
    let isQuestion = false;
    let notionPage = {};
    if (link.node_title != undefined) {
      const matches = link.node_title.match(titleQuestionRegex);
      if (matches != null) {
        isQuestion = true;
        pageloop: for (const page of uniquePages) {
          if (link.node_title == page.properties.Name.title[0].plain_text) {
            foundOne = true;
            notionPage = page;
            break pageloop;
          }
        }
      }
    }
    if (isQuestion) {
      if (foundOne) {
        await updatePage(notion, notionPage, link);
      } else {
        await createPage(notion, secureData, link);
      }
    }
  }
  return;
}

async function updatePage(notion, notionPage, link) {
  console.log(`updating ${link.node_title}...`);
  notion.pages.update({
    page_id: notionPage.id,
    properties: {
      Exists: {
        select: {
          name: "Exists",
        },
      },
      Location: {
        url: convertToURL(link),
      },
    },
  });
}

async function createPage(notion, secureData, link) {
  console.log(`creating a new page for ${link.node_title}...`);
  notion.pages.create({
    parent: {database_id: secureData.notion_db},
    properties: {
      Exists: {name: "Exists"},
      Type: [{name: "Question"}],
      Location: convertToURL(link),
      title: [{text: {content: link.node_title}}],
    },
  });
}

async function archivePage(notion, page) {
  notion.pages.update({
    page_id: page.id,
    archived: true,
  });
}

async function deDuplicatePages(notion, notionPages) {
  const uniquePages = [];
  for (const page of notionPages) {
    let alreadyThere = checkIfThere(page, uniquePages);
    if (alreadyThere) {
      await archivePage(notion, page);
    } else {
      uniquePages.push(page);
    }
  }
  return uniquePages;
  function checkIfThere(page, uniquePages) {
    for (const uniquePage of uniquePages) {
      if (
        page.properties.Name.title[0].plain_text ==
        uniquePage.properties.Name.title[0].plain_text
      ) {
        return true;
      }
    }
    return false;
  }
}

function convertToURL(link) {
  if (link.file_dir != "/") {
    return `https://docs.temporal.io/${link.file_dir}/${link.guide_id}#${link.local_ref}`;
  } else {
    return `https://docs.temporal.io/${link.guide_id}#${link.local_ref}`;
  }
}
