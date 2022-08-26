import fs from "fs-extra";
import graymatter from "gray-matter";

// const questionRegex = /^([#]*\s|(title)[:]\s)(What|How|When|Where|Why|Who|By whom).*/gm;

const contentQuestionRegex =
  /^([#]*\s)(What|How|When|Where|Why|Who|By whom).*/gm;
const titleQuestionRegex = /^(What|How|When|Where|Why|Who|By whom).*/gm;

export async function findQuestionsInDocs(config) {
  console.log("finding questions in documentation pages...");
  const docsPaths = await fs.readJSON(config.docs_paths_file_name);
  const questions = [];
  for (const docsPath of docsPaths) {
    const rawContent = await fs.readFile(`${docsPath.fullPath}`);
    const meta = graymatter(rawContent);
    const fileQuestions = await extractQuestions(meta, docsPath.path);
    questions.push(...fileQuestions);
  }
  await fs.writeJSON(config.docs_store_file_name, questions);
  return;
}

async function extractQuestions(meta, slug) {
  const fileQuestions = [];
  slug = slug.replaceAll(".md", "");
  if (meta?.data?.title != undefined) {
    const matches = meta.data.title.match(titleQuestionRegex);
    if (matches != null) {
      fileQuestions.push({
        text: matches[0],
        slug: slug,
      });
    }
  }
  const lines = meta.content.split("\n");
  for (const line of lines) {
    const matches = line.match(contentQuestionRegex);
    if (matches != null) {
      const text = matches[0];
      const words = text.split(" ");
      fileQuestions.push({
        text: words.slice(1, words.length).join(" "),
        slug: slug,
      });
    }
  }
  return fileQuestions;
}
