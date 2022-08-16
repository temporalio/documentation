import {proxyActivities} from "@temporalio/workflow";

const oneSecondSchedToClose = {
  startToCloseTimeout: "10 minutes",
};

// const failedToCompleteMessage = 'Docs assembly failed to complete...';

export async function fullAssembly(params) {

  const {getConfig} = proxyActivities(oneSecondSchedToClose);
  const config = await getConfig(params);

  // const {genGuideOutlines} = proxyActivities(oneSecondSchedToClose);
  // await genGuideOutlines(config);

  const {createTempDir} = proxyActivities(oneSecondSchedToClose);
  await createTempDir(config);

  const {genSourceObjects} = proxyActivities(oneSecondSchedToClose);
  await genSourceObjects(config);

  const {cleanUpTempDir} = proxyActivities(oneSecondSchedToClose);
  await cleanUpTempDir(config);

  return "Assembly completed successfully!";
}

// async function cleanUp(config) {
//     try {
//         const { cleanUpTempDir } = proxyActivities(oneSecondSchedToClose);
//         await cleanUpTempDir(config);
//     } catch (err) {
//         console.log('clean up failed...');
//         console.log(JSON.stringify(err));
//     }
//     return;
// }
