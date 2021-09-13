---
id: what-is-a-run-id
title: What is a Run Id?
description: A Run Id is a globally unique, platform-level identifier for a Workflow Execution.
tags:
  - explanation
---

A Run Id is a globally unique, platform-level identifier for a [Workflow Execution](/docs/content/what-is-a-workflow-execution).

Temporal guarantees that only one Workflow Execution with a given [Workflow Id](/docs/content/what-is-a-workflow-id) can be in an Open state at any given time.
But once a Workflow Execution reaches a Closed state, it is possible to have another Workflow Execution in an Open state withe same Id.
Temporal Cron Jobs are one example where there is a chain of Workflow Executions all with the same Workflow Id.
Each Workflow Execution within the chain is considered a "Run".

A Run Id uniquely identifies a Workflow Execution even if it shares a Workflow Id with other Workflow Executions.
