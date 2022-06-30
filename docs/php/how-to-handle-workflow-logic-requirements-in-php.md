---
id: how-to-handle-workflow-logic-requirements-in-php
title: How to handle Workflow logic requirements in PHP
sidebar_label: Activity Execution
---

\*\*Temporal uses the [Microsoft Azure Event Sourcing pattern](https://docs.microsoft.com/en-us/azure/architecture/patterns/event-sourcing) to recover the state of a Workflow object including its local variable values.

In essence, every time a Workflow state has to be restored, its code is re-executed from the beginning.
When replaying, side effects (such as Activity invocations) are ignored because they are already recorded in the Workflow event history.
When writing Workflow logic, the replay is not visible, so the code should be written since it executes only once.
This design puts the following constraints on the Workflow implementation:

- Do not use any mutable global variables because multiple instances of Workflows are executed in parallel.
- Do not call any non-deterministic functions like non seeded random or `UUID` directly from the Workflow code.

Always do the following in the Workflow implementation code:

- Don’t perform any IO or service calls as they are not usually deterministic. Use Activities for this.
- Only use `Workflow::now()` to get the current time inside a Workflow.
- Call `yield Workflow::timer()` instead of `sleep()`.
- Do not use any blocking SPL provided by PHP (i.e. `fopen`, `PDO`, etc) in **Workflow code**.
- Use `yield Workflow::getVersion()` when making any changes to the Workflow code. Without this, any deployment of updated Workflow code
  might break already open Workflows.
- Don’t access configuration APIs directly from a Workflow because changes in the configuration might affect a Workflow execution path.
  Pass it as an argument to a Workflow function or use an Activity to load it.

Workflow method arguments and return values are serializable to a byte array using the provided [DataConverter](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/common/converter/DataConverter.html) interface.
The default implementation uses JSON serializer, but you can use any alternative serialization mechanism.

Make sure to annotate your `WorkflowMethod` using `ReturnType` to specify concrete return type.

> You can not use the default return type declaration as Workflow methods are generators.

The values passed to Workflows through invocation parameters or returned through a result value are recorded in the execution history.
The entire execution history is transferred from the Temporal service to Workflow workers with every event that the Workflow logic needs to process.
A large execution history can thus adversely impact the performance of your Workflow.
Therefore, be mindful of the amount of data that you transfer via Activity invocation parameters or return values.
Otherwise, no additional limitations exist on Activity implementations.\*\*
