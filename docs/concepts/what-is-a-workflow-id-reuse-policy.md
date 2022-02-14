---
id: what-is-a-workflow-id-reuse-policy
title: What is a Workflow Id Reuse Policy?
sidebar_label: Workflow Id Reuse Policy
description: A Workflow Id Reuse Policy determines whether a Workflow Execution is allowed to spawn with a particular Workflow Id, if that Workflow Id has been used with a previous, and now Closed, Workflow Execution.
tags:
  - explanation
---

A Workflow Id Reuse Policy determines whether a Workflow Execution is allowed to spawn with a particular Workflow Id, if that Workflow Id has been used with a previous, and now Closed, Workflow Execution.

It is never possible for a new Workflow Execution to spawn with the same Workflow Id as another Open Workflow Execution.
An attempt to spawn a Workflow Execution with a Workflow Id that is the same as the Id of a currently Open Workflow Execution results in a "Workflow execution already started" error.

A Workflow Id Reuse Policy has three possible values:

- **Allow Duplicate** The Workflow Execution is allowed to exist regardless of the Closed status of a previous Workflow Execution with the same Workflow Id.
  **This is the default policy, if one is not specified.**
  Use this when it is OK to have a Workflow Execution with the same Workflow Id as a previous, but now Closed, Workflow Execution.
- **Allow Duplicate Failed Only**: The Workflow Execution is allowed to exist only if a previous Workflow Execution with the same Workflow Id does not have a Completed status.
  Use this policy when there is a need to re-execute a Failed, Timed Out, Terminated or Cancelled Workflow Execution and guarantee that the Completed Workflow Execution will not be re-executed.
- **Reject Duplicate**: The Workflow Execution cannot exist if a previous Workflow Execution has the same Workflow Id, regardless of the Closed status.
  Use this when there can only be one Workflow Execution per Workflow Id within a Namespace for the given retention period.

A Workflow Id Reuse Policy applies only if a Closed Workflow Execution with the same Workflow Id exists within the Retention Period of the associated Namespace.
For example, if the Namespace's retention period is 30 days, a Workflow Id Reuse Policy can only compare the Workflow Id of the spawning Workflow Execution against the Closed Workflow Executions for the last 30 days.

If there is an attempt to spawn a Workflow Execution with a Workflow Id Reuse Policy that won't allow it the Server will prevent the Workflow Execution from spawning.
