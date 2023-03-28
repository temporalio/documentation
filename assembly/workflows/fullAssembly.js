import { proxyActivities, workflowInfo } from "@temporalio/workflow";

const simpleActivityOptions = {
  startToCloseTimeout: "10 minutes",
};

export async function fullAssembly(params) {
  const activities = proxyActivities(simpleActivityOptions);
  // If these Activities fail, we don't want to retry them, as they will continue failing.
  const deterministicActivities = proxyActivities({
    ...simpleActivityOptions,
    retry: { maximumAttempts: 1 },
  });
  const config = await activities.getConfig(params);
  const info = workflowInfo();
  const workflowID = info.workflowId;
  config.workflow_id = workflowID;

  await activities.createTempDir(config);

  if (params.samples) {
    await activities.getSamplesRepos(config);

    await activities.createNodesFromSamples(config);
  }

  if (params.cli) {
    await activities.genCLI(config);
  }

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
  await activities.genReport(config);

  await activities.cleanUpTempDir(config);

  return "Assembly completed successfully!";
}
