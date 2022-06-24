---
id: what-is-a-run-id
title: What is a Run Id?
sidebar_label: Run Id
description: A Run Id is a globally unique, platform-level identifier for a Workflow Execution.
tags:
  - explanation
---

A Run Id is a globally unique, platform-level identifier for a [Workflow Execution](/concepts/what-is-a-workflow-execution).

Temporal guarantees that only one Workflow Execution with a given [Workflow Id](/concepts/what-is-a-workflow-id) can be in an Open state at any given time.
But when a Workflow Execution reaches a Closed state, it is possible to have another Workflow Execution in an Open state with the same Workflow Id.
For example, a Temporal Cron Job is a chain of Workflow Executions that all have the same Workflow Id.
Each Workflow Execution within the chain is considered a "Run".

A Run Id uniquely identifies a Workflow Execution even if it shares a Workflow Id with other Workflow Executions.
