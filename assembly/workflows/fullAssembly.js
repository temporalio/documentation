import {proxyActivities} from "@temporalio/workflow";

const simpleActivityOptions = {
  startToCloseTimeout: "10 minutes",
};

export async function fullAssembly(params) {
  const activities = proxyActivities(simpleActivityOptions);

  // If these Activities fail, we don't want to retry them, as they will continue failing.
  const deterministicActivities = proxyActivities({
    ...simpleActivityOptions,
    retry: {maximumAttempts: 1},
  });

  const config = await activities.getConfig(params);

  await activities.createTempDir(config);

  await activities.genSourceObjects(config);

  await deterministicActivities.attachSourceToGuides(config);

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
