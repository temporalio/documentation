# Interface: IWorkflowExecutionConfig

[workflow](../modules/proto.temporal.api.workflow.md).[v1](../modules/proto.temporal.api.workflow.v1.md).IWorkflowExecutionConfig

Properties of a WorkflowExecutionConfig.

## Implemented by

* [*WorkflowExecutionConfig*](../classes/proto.temporal.api.workflow.v1.workflowexecutionconfig.md)

## Table of contents

### Properties

- [defaultWorkflowTaskTimeout](proto.temporal.api.workflow.v1.iworkflowexecutionconfig.md#defaultworkflowtasktimeout)
- [taskQueue](proto.temporal.api.workflow.v1.iworkflowexecutionconfig.md#taskqueue)
- [workflowExecutionTimeout](proto.temporal.api.workflow.v1.iworkflowexecutionconfig.md#workflowexecutiontimeout)
- [workflowRunTimeout](proto.temporal.api.workflow.v1.iworkflowexecutionconfig.md#workflowruntimeout)

## Properties

### defaultWorkflowTaskTimeout

• `Optional` **defaultWorkflowTaskTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

WorkflowExecutionConfig defaultWorkflowTaskTimeout

___

### taskQueue

• `Optional` **taskQueue**: *null* \| [*ITaskQueue*](proto.temporal.api.taskqueue.v1.itaskqueue.md)

WorkflowExecutionConfig taskQueue

___

### workflowExecutionTimeout

• `Optional` **workflowExecutionTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

WorkflowExecutionConfig workflowExecutionTimeout

___

### workflowRunTimeout

• `Optional` **workflowRunTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

WorkflowExecutionConfig workflowRunTimeout
