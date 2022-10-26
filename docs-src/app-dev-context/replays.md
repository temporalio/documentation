---
id: replays
title: How to Replay a Workflow Execution
description: Replay recreates the exact state of a Workflow Execution.
sidebar_label: Replay
tags:
  - guide-context
---


Replay recreates the exact state of a Workflow Execution.
You can replay a Workflow from the beginning of its history.

Replay only succeeds if the [Workflow Definition](/concepts/what-is-a-workflow-definition) is
compatible with the provided history from a deterministic point of view.

An advisable approach to testing changes to your Workflow Definitions is to do the following as
part of your CI checks:

1. Determine what Workflow Types and/or Task Queues will be targeted by the Worker code under test
2. Download the histories of a representative set of recent open and closed workflows from that Task
   Queue, either programmatically using the SDK client, or via `tctl`.
3. Run the histories through replay
4. Fail CI if there is any error encountered during replay

What follow are some examples of fetching and replaying histories: