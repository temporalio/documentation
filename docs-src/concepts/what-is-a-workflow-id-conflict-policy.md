---
id: what-is-a-workflow-id-conflict-policy
title: What is a Workflow Id Conflict Policy?
sidebar_label: Workflow Id Conflict Policy
description: A Workflow Id Conflict Policy determines how to resolve the conflict when spawning a new Workflow Execution with a particular Workflow Id that is used by an Open Workflow Execution already.
tags:
  - term
  - explanation
---

A Workflow Id Conflict Policy determines how to resolve the conflict when spawning a new Workflow Execution with a particular Workflow Id that is used by an Open Workflow Execution already.
See [Workflow Id Reuse Policy](/concepts/what-is-a-workflow-id-reuse-policy) for managing the reuse of a Workflow Id of a Close Workflow.

By default, this results in a `Workflow execution already started` error.

:::note

The default [StartWorkflowOptions](https://pkg.go.dev/go.temporal.io/sdk/internal#StartWorkflowOptions) behavior in the Go SDK is to not return an error when a new Workflow Execution is attempted with the same Workflow Id as an open Workflow Execution.
Instead, it returns a WorkflowRun instance representing the current or last run of the open Workflow Execution.

To return the `Workflow execution already started` error, set `WorkflowExecutionErrorWhenAlreadyStarted` to `true`.

:::

The Workflow Id Conflict Policy can have one of the following values:

- **Fail:** The Workflow Execution is prevented from spawning and a `Workflow execution already started` error is returned.
  **This is the default policy, if one is not specified.**
- **Use Existing:** The Workflow Execution is prevented from spawning and a successful response with the Open Workflow Execution's Run Id is returned.
- **Terminate Existing:** The Open Workflow Execution is terminated first and then the new the Workflow Execution with the same Workflow Id is spawned.
