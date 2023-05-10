---
slug: deploy-new-version-of-workflow
title: Use Replay before deploy a new version of a Workflow
tags:
  - troubleshooting
  - how-to
date: 2023-05-11T00:00:00Z
---

When making code changes to a Workflow, it is important to avoid introducing non-deterministic behavior; otherwise, you may encounter non-determinism errors in your Workflow History.

One way to prevent this error from occurring is to use the [Workflow Replayer](/workflows#replays) to replay existing Workflow Histories against your new code before deploying it to production.

:::important

While the Workflow Replay helps to avoid non-deterministic code, it does not guarantee that your code is deterministic.

:::

## How to use the Workflow Replayer

To use the Workflow Replayer, you need to provide the following:

- The Workflow Replayer to register the Workflow that is going to be replayed
- A Workflow History to execute, either:
  - Loaded directly from the Client
  - Loaded from the JSON History file

If you choose to load the Workflow History directly from the Client, consult the [SDK specific documentation](/application-development/testing#replay) for more information.

If you chose to load the Event History from a JSON file on disk, use one the following methods:

### Programmatically

Consult the [SDK specific documentation](/application-development/testing#replay) for information on loading event Histories.

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

Use your existing CI pipeline to replay Workflow Histories against your new Workflow versions to ensure that they are compatible with every change pushed to your version control management.
You can replay existing Workflow Histories in your CI pipeline and validate that they do not break determinism and prevent failures from occurring in production.

For more information on testing Workflows, see [Test frameworks](/application-development/testing#test-frameworks)

## What happens if I don't use the Workflow Replayer?

If you don't use the Workflow Replayer and your Workflow contains non-deterministic code, you may see a non-determinism error.

This may mean that your new code is not compatible with existing Workflow Histories.

If you are making incompatible code changes to your Workflows and have to deal with Workflow versioning, see [Workflow Versioning Strategies](https://community.temporal.io/t/workflow-versioning-strategies/6911) for more information.
