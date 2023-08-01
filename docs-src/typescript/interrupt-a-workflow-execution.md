---
id: interrupt-a-workflow-execution
title: How to interrupt a Workflow Execution
description: You can interrupt a Workflow Execution by canceling it or terminating it.
sidebar_label: Interrupt a Workflow Execution
tags:
  - guide-context
---

You can interrupt a Workflow Execution in one of the following ways:

- [Cancel](#cancel)
- [Terminate](#terminate)

The following are the main differences between canceling and terminating a Workflow in Temporal:

##### Cancel

Canceling a Workflow provides a graceful way to stop Workflow Execution.
This action resembles sending a `SIGTERM` to a process.

- The system records a `WorkflowExecutionCancelRequested` event in the Workflow History.
- A Workflow Task gets scheduled to process the cancelation.
- The Workflow code can handle the cancelation and execute any cleanup logic.
- The system doesn't forcefully stop the Workflow.

To cancel a Workflow Execution in TypeScript, use the

```ts
```

##### Terminate

Terminating a Workflow forcefully stops Workflow Execution.
This action resembles killing a process.

- The system records a `WorkflowExecutionTerminated` event in the Workflow History.
- The termination forcefully and immediately stops the Workflow Execution.
- The Workflow code gets no chance to handle termination.
- A Workflow Task doesn't get scheduled.

To terminate a Workflow Execution in TypeScript, use the

```ts
```

##### Summary

In summary:

- Canceling provides a graceful way to stop the Workflow and allows it to handle cancelation logic.
- Termination forcefully stops the Workflow and prevents any further events.

In most cases, canceling is preferable because it allows the Workflow to finish gracefully.
Terminate only if the Workflow is stuck and cannot be canceled normally.
