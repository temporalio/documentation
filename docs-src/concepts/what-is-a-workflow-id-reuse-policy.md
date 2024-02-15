---
id: what-is-a-workflow-id-reuse-policy
title: What is a Workflow Id Reuse Policy?
sidebar_label: Workflow Id Reuse Policy
description: A Workflow Id Reuse Policy determines whether a Workflow Execution is allowed to spawn with a particular Workflow Id, if that Workflow Id has been used with a previous, and now Closed, Workflow Execution.
tags:
  - term
  - explanation
---

A Workflow Id Reuse Policy determines whether a Workflow Execution is allowed to spawn with a particular Workflow Id, if that Workflow Id has been used with a previous, and now Closed, Workflow Execution.

It is not possible for a new Workflow Execution to spawn with the same Workflow Id as another Open Workflow Execution, regardless of the Workflow Id Reuse Policy.
In some cases, an attempt to spawn a Workflow Execution with a Workflow Id that is the same as the Id of a currently Open Workflow Execution results in a `Workflow execution already started` error.

:::note

The default [StartWorkflowOptions](https://pkg.go.dev/go.temporal.io/sdk/internal#StartWorkflowOptions) behavior in the Go SDK is to not return an error when a new Workflow Execution is attempted with the same Workflow Id as an open Workflow Execution.
Instead, it returns a WorkflowRun instance representing the current or last run of the open Workflow Execution.

To return the `Workflow execution already started` error, set `WorkflowExecutionErrorWhenAlreadyStarted` to `true`.

:::

The Workflow Id Reuse Policy can have one of the following values:

- **Allow Duplicate:** The Workflow Execution is allowed to exist regardless of the Closed status of a previous Workflow Execution with the same Workflow Id.
  **This is the default policy, if one is not specified.**
  Use this when it is OK to have a Workflow Execution with the same Workflow Id as a previous, but now Closed, Workflow Execution.
- **Allow Duplicate Failed Only:** The Workflow Execution is allowed to exist only if a previous Workflow Execution with the same Workflow Id does not have a Completed status.
  Use this policy when there is a need to re-execute a Failed, Timed Out, Terminated or Cancelled Workflow Execution and guarantee that the Completed Workflow Execution will not be re-executed.
- **Reject Duplicate:** The Workflow Execution cannot exist if a previous Workflow Execution has the same Workflow Id, regardless of the Closed status.
  Use this when there can only be one Workflow Execution per Workflow Id within a Namespace for the given retention period.
- **Terminate if Running:** Specifies that if a Workflow Execution with the same Workflow Id is already running, it should be terminated and a new Workflow Execution with the same Workflow Id should be started. This policy allows for only one Workflow Execution with a specific Workflow Id to be running at any given time.

The first three values (Allow Duplicate, Allow Duplicate Failed Only, and Reject Duplicate) of the Workflow Id Reuse Policy apply to Closed Workflow Executions that are retained within the Namespace.
For example, the Temporal Service can only check the Workflow Id of the spawning Workflow Execution based on the Workflow Id Reuse Policy against the Closed Workflow Executions for the last 30 days given a default Retention Period.
The fourth value of the Workflow Id Reuse Policy, Terminate if Running, only applies to a Workflow Execution that is currently open within the Namespace.
For Terminate if Running, the Retention Period is not a consideration for this policy.

If there is an attempt to spawn a Workflow Execution with a Workflow Id Reuse Policy that won't allow it the Server will prevent the Workflow Execution from spawning.
