---
id: what-is-a-workflow-id-reuse-policy
title: What is a Workflow Id Reuse Policy?
sidebar_label: Workflow Id Reuse Policy
description: Explanation of the three different Workflow Id Reuse Policies
tags:
  - explanation
---

A Workflow Id Reuse Policy determines if new Workflow Executions with a given Workflow Id are allowed.
The operation fails if the Workflow Id is identical to an Open Workflow Execution.

These policies apply to the `StartWorkflowExecution` function.
A Workflow Id Reuse Policy has three possible values:

- **Allow Duplicate**: allows a new run of the Workflow to exist with the same Workflow Id as a closed Workflow Execution.
  **This is the default policy, if one is not specified.**
- **Allow Duplicate Failed Only**: only allows the Workflow Execution to exist if a previous Workflow Execution with the same Workflow Id does not have a Completed status.
  Use this policy to re-execute Failed, Timed Out, Terminated or Cancelled Workflow Executions.
- **Reject Duplicate**: denies new runs of the Workflow to exist with the same Workflow Id as a previous execution, regardless of its Closed status.
  Use this when there can only be one Workflow Execution per Workflow Id within a Namespace for the given retention period.

These policies do not rerun closed Workflow Executions. While the results of a previously stated Workflow can be returned or awaited, this only applies to Closed executions within a Namespace's Retention Period.
