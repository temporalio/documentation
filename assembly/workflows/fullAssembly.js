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
  config.workflow_id = info.workflowId;

  await activities.createTempDir(config);

  await activities.createNodesFromSamples(config);

  await activities.genSourceObjects(config);

  await activities.userDataSourceTable(config);

  await deterministicActivities.attachSourceToGuides(config);

  await activities.genLinkIndexes(config);

  await activities.devGuideToc(config);

  await activities.linkMagic(config);

  await activities.genMarkdownGuides(config);

  await activities.genGlossary(config);

  await activities.genReport(config);

  await activities.genGitAttributes(config);

  await activities.cleanUpTempDir(config);

  return "Assembly completed successfully!";
}
