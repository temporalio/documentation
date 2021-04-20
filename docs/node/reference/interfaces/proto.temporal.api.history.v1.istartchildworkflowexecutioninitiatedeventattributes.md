# Interface: IStartChildWorkflowExecutionInitiatedEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).IStartChildWorkflowExecutionInitiatedEventAttributes

Properties of a StartChildWorkflowExecutionInitiatedEventAttributes.

## Implemented by

* [*StartChildWorkflowExecutionInitiatedEventAttributes*](../classes/proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md)

## Table of contents

### Properties

- [control](proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md#control)
- [cronSchedule](proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md#cronschedule)
- [header](proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md#header)
- [input](proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md#input)
- [memo](proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md#memo)
- [namespace](proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md#namespace)
- [parentClosePolicy](proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md#parentclosepolicy)
- [retryPolicy](proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md#retrypolicy)
- [searchAttributes](proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md#searchattributes)
- [taskQueue](proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md#taskqueue)
- [workflowExecutionTimeout](proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md#workflowexecutiontimeout)
- [workflowId](proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md#workflowid)
- [workflowIdReusePolicy](proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md#workflowidreusepolicy)
- [workflowRunTimeout](proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md#workflowruntimeout)
- [workflowTaskCompletedEventId](proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md#workflowtaskcompletedeventid)
- [workflowTaskTimeout](proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md#workflowtasktimeout)
- [workflowType](proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md#workflowtype)

## Properties

### control

• `Optional` **control**: *null* \| *string*

StartChildWorkflowExecutionInitiatedEventAttributes control

___

### cronSchedule

• `Optional` **cronSchedule**: *null* \| *string*

StartChildWorkflowExecutionInitiatedEventAttributes cronSchedule

___

### header

• `Optional` **header**: *null* \| [*IHeader*](proto.temporal.api.common.v1.iheader.md)

StartChildWorkflowExecutionInitiatedEventAttributes header

___

### input

• `Optional` **input**: *null* \| [*IPayloads*](proto.temporal.api.common.v1.ipayloads.md)

StartChildWorkflowExecutionInitiatedEventAttributes input

___

### memo

• `Optional` **memo**: *null* \| [*IMemo*](proto.temporal.api.common.v1.imemo.md)

StartChildWorkflowExecutionInitiatedEventAttributes memo

___

### namespace

• `Optional` **namespace**: *null* \| *string*

StartChildWorkflowExecutionInitiatedEventAttributes namespace

___

### parentClosePolicy

• `Optional` **parentClosePolicy**: *null* \| [*ParentClosePolicy*](../enums/proto.temporal.api.enums.v1.parentclosepolicy.md)

StartChildWorkflowExecutionInitiatedEventAttributes parentClosePolicy

___

### retryPolicy

• `Optional` **retryPolicy**: *null* \| [*IRetryPolicy*](proto.temporal.api.common.v1.iretrypolicy.md)

StartChildWorkflowExecutionInitiatedEventAttributes retryPolicy

___

### searchAttributes

• `Optional` **searchAttributes**: *null* \| [*ISearchAttributes*](proto.temporal.api.common.v1.isearchattributes.md)

StartChildWorkflowExecutionInitiatedEventAttributes searchAttributes

___

### taskQueue

• `Optional` **taskQueue**: *null* \| [*ITaskQueue*](proto.temporal.api.taskqueue.v1.itaskqueue.md)

StartChildWorkflowExecutionInitiatedEventAttributes taskQueue

___

### workflowExecutionTimeout

• `Optional` **workflowExecutionTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

StartChildWorkflowExecutionInitiatedEventAttributes workflowExecutionTimeout

___

### workflowId

• `Optional` **workflowId**: *null* \| *string*

StartChildWorkflowExecutionInitiatedEventAttributes workflowId

___

### workflowIdReusePolicy

• `Optional` **workflowIdReusePolicy**: *null* \| [*WorkflowIdReusePolicy*](../enums/proto.temporal.api.enums.v1.workflowidreusepolicy.md)

StartChildWorkflowExecutionInitiatedEventAttributes workflowIdReusePolicy

___

### workflowRunTimeout

• `Optional` **workflowRunTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

StartChildWorkflowExecutionInitiatedEventAttributes workflowRunTimeout

___

### workflowTaskCompletedEventId

• `Optional` **workflowTaskCompletedEventId**: *null* \| Long

StartChildWorkflowExecutionInitiatedEventAttributes workflowTaskCompletedEventId

___

### workflowTaskTimeout

• `Optional` **workflowTaskTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

StartChildWorkflowExecutionInitiatedEventAttributes workflowTaskTimeout

___

### workflowType

• `Optional` **workflowType**: *null* \| [*IWorkflowType*](proto.temporal.api.common.v1.iworkflowtype.md)

StartChildWorkflowExecutionInitiatedEventAttributes workflowType
