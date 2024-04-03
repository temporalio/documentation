import { TestWorkflowEnvironment } from "@temporalio/testing";
import { after, before, describe, it } from "mocha";
import { Worker } from "@temporalio/worker";
import assert from "assert";
import { backgroundCheckNonDeterministic } from "../workflow_dacx";
import { BACKGROUND_CHECK_TASK_QUEUE } from "../shared";
import * as activities from "../activities";

describe("BackgroundCheckNonDeterministicWorkflow", async () => {
  let testEnv: TestWorkflowEnvironment;

  before(async () => {
    testEnv = await TestWorkflowEnvironment.createLocal();
  });

  after(async () => {
    await testEnv?.teardown();
  });

  it("successfully returns the expected output of pass", async () => {
    const { client, nativeConnection } = testEnv;

    const worker = await Worker.create({
      connection: nativeConnection,
      taskQueue: BACKGROUND_CHECK_TASK_QUEUE,
      workflowsPath: require.resolve("../workflow_dacx.ts"),
      activities,
    });

    const result = await worker.runUntil(
      client.workflow.execute(backgroundCheckNonDeterministic, {
        args: ["555-55-5555"],
        workflowId: "background-check-123",
        taskQueue: BACKGROUND_CHECK_TASK_QUEUE,
      })
    );
    assert.equal(result, "pass");
  });
});
