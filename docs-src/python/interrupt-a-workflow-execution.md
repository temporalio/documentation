---
id: interrupt-a-workflow-execution
title: How to interrupt a Workflow Execution
description:
sidebar_label: Interrupt a Workflow Execution
tags:
  - guide-context
---

You can interrupt a Workflow Execution in one of the following ways:

- [Cancel](#cancel)
- [Terminate](#terminate)

The following are the main differences between canceling and terminating a Workflow in Temporal:

##### Cancel

Canceling a Workflow provides a graceful way to stop Workflow Execution. This action resembles sending a `SIGTERM` to a process.

- The system records a `WorkflowExecutionCancelRequested` event in the Workflow History.
- The Workflow code can handle the cancelation and execute any cleanup logic.
- A Workflow Task gets scheduled to process the cancelation.
- The system doesn't forcefully stop the Workflow.

For more information, see How to cancel a Workflow Execution.

##### Terminate

Terminating a Workflow forcefully stops Workflow Execution. This action resembles killing a process.

- The system records a `WorkflowExecutionTerminated` event in the Workflow History.
- The termination forcefully and immediately stops the Workflow Execution.
- The Workflow code gets no chance to handle termination.
- A Workflow Task doesn't get scheduled.

For more information, see How to terminate a Workflow Execution.

##### Summary

In summary:

- Canceling provides a graceful way to stop the Workflow and allows it to handle cancelation logic.
- Termination forcefully stops the Workflow and prevents any further code execution.

In most cases, canceling is preferable because it allows the Workflow to finish gracefully.
Terminate only if the Workflow is stuck and cannot be canceled normally.
