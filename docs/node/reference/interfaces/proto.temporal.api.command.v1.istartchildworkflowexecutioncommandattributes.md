# Interface: IStartChildWorkflowExecutionCommandAttributes

[command](../modules/proto.temporal.api.command.md).[v1](../modules/proto.temporal.api.command.v1.md).IStartChildWorkflowExecutionCommandAttributes

Properties of a StartChildWorkflowExecutionCommandAttributes.

## Implemented by

* [*StartChildWorkflowExecutionCommandAttributes*](../classes/proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md)

## Table of contents

### Properties

- [control](proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md#control)
- [cronSchedule](proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md#cronschedule)
- [header](proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md#header)
- [input](proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md#input)
- [memo](proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md#memo)
- [namespace](proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md#namespace)
- [parentClosePolicy](proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md#parentclosepolicy)
- [retryPolicy](proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md#retrypolicy)
- [searchAttributes](proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md#searchattributes)
- [taskQueue](proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md#taskqueue)
- [workflowExecutionTimeout](proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md#workflowexecutiontimeout)
- [workflowId](proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md#workflowid)
- [workflowIdReusePolicy](proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md#workflowidreusepolicy)
- [workflowRunTimeout](proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md#workflowruntimeout)
- [workflowTaskTimeout](proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md#workflowtasktimeout)
- [workflowType](proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md#workflowtype)

## Properties

### control

• `Optional` **control**: *null* \| *string*

StartChildWorkflowExecutionCommandAttributes control

___

### cronSchedule

• `Optional` **cronSchedule**: *null* \| *string*

StartChildWorkflowExecutionCommandAttributes cronSchedule

___

### header

• `Optional` **header**: *null* \| [*IHeader*](proto.temporal.api.common.v1.iheader.md)

StartChildWorkflowExecutionCommandAttributes header

___

### input

• `Optional` **input**: *null* \| [*IPayloads*](proto.temporal.api.common.v1.ipayloads.md)

StartChildWorkflowExecutionCommandAttributes input

___

### memo

• `Optional` **memo**: *null* \| [*IMemo*](proto.temporal.api.common.v1.imemo.md)

StartChildWorkflowExecutionCommandAttributes memo

___

### namespace

• `Optional` **namespace**: *null* \| *string*

StartChildWorkflowExecutionCommandAttributes namespace

___

### parentClosePolicy

• `Optional` **parentClosePolicy**: *null* \| [*ParentClosePolicy*](../enums/proto.temporal.api.enums.v1.parentclosepolicy.md)

StartChildWorkflowExecutionCommandAttributes parentClosePolicy

___

### retryPolicy

• `Optional` **retryPolicy**: *null* \| [*IRetryPolicy*](proto.temporal.api.common.v1.iretrypolicy.md)

StartChildWorkflowExecutionCommandAttributes retryPolicy

___

### searchAttributes

• `Optional` **searchAttributes**: *null* \| [*ISearchAttributes*](proto.temporal.api.common.v1.isearchattributes.md)

StartChildWorkflowExecutionCommandAttributes searchAttributes

___

### taskQueue

• `Optional` **taskQueue**: *null* \| [*ITaskQueue*](proto.temporal.api.taskqueue.v1.itaskqueue.md)

StartChildWorkflowExecutionCommandAttributes taskQueue

___

### workflowExecutionTimeout

• `Optional` **workflowExecutionTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

StartChildWorkflowExecutionCommandAttributes workflowExecutionTimeout

___

### workflowId

• `Optional` **workflowId**: *null* \| *string*

StartChildWorkflowExecutionCommandAttributes workflowId

___

### workflowIdReusePolicy

• `Optional` **workflowIdReusePolicy**: *null* \| [*WorkflowIdReusePolicy*](../enums/proto.temporal.api.enums.v1.workflowidreusepolicy.md)

StartChildWorkflowExecutionCommandAttributes workflowIdReusePolicy

___

### workflowRunTimeout

• `Optional` **workflowRunTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

StartChildWorkflowExecutionCommandAttributes workflowRunTimeout

___

### workflowTaskTimeout

• `Optional` **workflowTaskTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

StartChildWorkflowExecutionCommandAttributes workflowTaskTimeout

___

### workflowType

• `Optional` **workflowType**: *null* \| [*IWorkflowType*](proto.temporal.api.common.v1.iworkflowtype.md)

StartChildWorkflowExecutionCommandAttributes workflowType
