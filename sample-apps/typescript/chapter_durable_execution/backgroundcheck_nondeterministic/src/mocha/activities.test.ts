import { MockActivityEnvironment } from "@temporalio/testing";
import { describe, it } from "mocha";
import assert from "assert";
import * as activities from "../activities";

describe("activities", () => {
  it("successfully returns the expected output of pass", async () => {
    const env = new MockActivityEnvironment();
    const input = "555-55-5555";
    const ssnTraceActivityResult = await env.run(
      activities.ssnTraceActivity,
      input
    );
    assert.equal(ssnTraceActivityResult, "pass");
  });
});
