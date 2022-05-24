---
id: what-is-a-parent-close-policy
title: What is a Parent Close Policy?
sidebar_label: Parent Close Policy
description: If a Workflow Execution is a Child Workflow Execution, a Parent Close Policy determines what happens to the Workflow Execution if its Parent Workflow Execution changes to a Closed status (Completed, Failed, Timed out).
tags:
  - explanation
  - child-workflow-executions
---

A Parent Close Policy determines what happens to a [Child Workflow Execution](/concepts/what-is-a-child-workflow-execution) if its Parent changes to a Closed status (Completed, Failed, or Timed out).
There are three possible values:

- **Abandon**: the Child Workflow Execution is not affected.
- **Terminate** (default): the Child Workflow Execution is forcefully Terminated.
- **Request Cancel**: a Cancellation request is sent to the Child Workflow Execution.

[`ParentClosePolicy` proto definition](https://github.com/temporalio/api/blob/c1f04d0856a3ba2995e92717607f83536b5a44f5/temporal/api/enums/v1/workflow.proto#L44)

Each Child Workflow Execution may have its own Parent Close Policy.
This policy applies only to Child Workflow Executions and has no effect otherwise.

![Parent Close Policy entity relationship](/diagrams/parent-close-policy.svg)

You can set policies per child, which means you can opt out of propagating terminates / cancels on a per-child basis.
This is useful for starting Child Workflows asynchronously (see [relevant issue here](https://community.temporal.io/t/best-way-to-create-an-async-child-workflow/114) or the corresponding SDK docs).
