import {proxyActivities} from "@temporalio/workflow";

const simpleActivityOptions = {
  startToCloseTimeout: "10 minutes",
};

export async function fullAssembly(params) {
  const activities = proxyActivities(simpleActivityOptions);

  const config = await activities.getConfig(params);

  await activities.createTempDir(config);

  await activities.genSourceObjects(config);

  await activities.attachSourceToGuides(config);

  await activities.genLinkIndexes(config);

  await activities.linkMagic(config);

  await activities.genMarkdownGuides(config);

  await activities.genGlossary(config);

  if (params.runCoverageUpdate) {
    await activities.getQuestionsFromNotion(config);

    await activities.updateCoverageBoard(config);
  }

  await activities.cleanUpTempDir(config);

  return "Assembly completed successfully!";
}
