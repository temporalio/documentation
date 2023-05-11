---
slug: deploy-new-version-of-workflow
title: Use Replay before deploy a new version of a Workflow
tags:
  - troubleshooting
  - how-to
date: 2023-05-11T00:00:00Z
---

When making code changes to a Workflow, it is important to avoid introducing non-deterministic behavior.

One way to prevent this error from occurring is to use the [Workflow Replayer](/workflows#replays) to replay existing Workflow Histories against your new code before deploying it to production.

:::important

While the Workflow Replay helps to avoid non-deterministic code, it does not guarantee that your code is deterministic.

:::

## How to use the Workflow Replayer

To use the Workflow Replayer, you need to provide the following:

- The Workflow Replayer to register the Workflow that you want to replay
- A Workflow History to execute, either:
  - Loaded directly from the Client
  - Loaded from the JSON History file

Consult the [SDK specific documentation](/application-development/testing#replay) for information on using the Workflow Replayer programmatically.

If you chose to load the Event History from a JSON file on disk, you can do so programmatically or from one of the following methods:

### The Temporal CLI

Use the Temporal CLI to download the Workflow History file from the CLI:

```command
temporal workflow show --workflow-id <workflow_id> --output json > <output_file>
```

### The Temporal Web UI

Navigate through the Temporal Web UI to download the Workflow History file:

1. Navigate to the Workflow Execution you want to download the History from.
2. In the **Recent Events** section, select **Download**.

Once you have the Workflow JSON History file, you can use the Workflow Replayer to replay the Workflow History, in the SDK of your choice.

## Replay existing Workflow Histories in CI

Use the Workflow Replayer in your existing Continuous Integration (CI) pipeline to ensure that new versions of your Workflow are compatible with every change pushed to your version control management. By replaying existing Workflow Histories, you can validate that they do not break determinism and prevent failures from occurring in production.

To use the Replayer in your CI pipeline, consider the following steps:

1. Fetch a representative sample of Workflow Histories to replay against your new Workflow version. For example, you could fetch the 100 most recent Histories for your Workflow and replay all of them.
2. Run the Replayer against each of the fetched Histories to ensure that the new Workflow version is compatible with each of them.

   - If the Replayer finds any incompatible changes, the CI pipeline should fail to prevent these changes from going into production. In this case, you should identify and fix the issues before retrying the CI pipeline.
   - If the Replayer does not find any incompatible changes, the CI pipeline should succeed. You can then proceed with confidence that your changes are compatible with your existing Workflow Histories.

For more information on testing Workflows, see [Test frameworks](/application-development/testing#test-frameworks)

## What happens if I don't use the Workflow Replayer?

If you don't use the Workflow Replayer and your Workflow contains non-deterministic code, you may see a non-determinism error.

This may mean that your new code is not compatible with existing Workflow Histories.

If you are making incompatible code changes to your Workflows and have to deal with Workflow versioning, see [Workflow Versioning Strategies](https://community.temporal.io/t/workflow-versioning-strategies/6911) for more information.
