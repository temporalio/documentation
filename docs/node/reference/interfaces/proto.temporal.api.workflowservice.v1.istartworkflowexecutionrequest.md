# Interface: IStartWorkflowExecutionRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).IStartWorkflowExecutionRequest

Properties of a StartWorkflowExecutionRequest.

## Implemented by

* [*StartWorkflowExecutionRequest*](../classes/proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md)

## Table of contents

### Properties

- [cronSchedule](proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md#cronschedule)
- [header](proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md#header)
- [identity](proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md#identity)
- [input](proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md#input)
- [memo](proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md#memo)
- [namespace](proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md#namespace)
- [requestId](proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md#requestid)
- [retryPolicy](proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md#retrypolicy)
- [searchAttributes](proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md#searchattributes)
- [taskQueue](proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md#taskqueue)
- [workflowExecutionTimeout](proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md#workflowexecutiontimeout)
- [workflowId](proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md#workflowid)
- [workflowIdReusePolicy](proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md#workflowidreusepolicy)
- [workflowRunTimeout](proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md#workflowruntimeout)
- [workflowTaskTimeout](proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md#workflowtasktimeout)
- [workflowType](proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md#workflowtype)

## Properties

### cronSchedule

• `Optional` **cronSchedule**: *null* \| *string*

StartWorkflowExecutionRequest cronSchedule

___

### header

• `Optional` **header**: *null* \| [*IHeader*](proto.temporal.api.common.v1.iheader.md)

StartWorkflowExecutionRequest header

___

### identity

• `Optional` **identity**: *null* \| *string*

StartWorkflowExecutionRequest identity

___

### input

• `Optional` **input**: *null* \| [*IPayloads*](proto.temporal.api.common.v1.ipayloads.md)

StartWorkflowExecutionRequest input

___

### memo

• `Optional` **memo**: *null* \| [*IMemo*](proto.temporal.api.common.v1.imemo.md)

StartWorkflowExecutionRequest memo

___

### namespace

• `Optional` **namespace**: *null* \| *string*

StartWorkflowExecutionRequest namespace

___

### requestId

• `Optional` **requestId**: *null* \| *string*

StartWorkflowExecutionRequest requestId

___

### retryPolicy

• `Optional` **retryPolicy**: *null* \| [*IRetryPolicy*](proto.temporal.api.common.v1.iretrypolicy.md)

StartWorkflowExecutionRequest retryPolicy

___

### searchAttributes

• `Optional` **searchAttributes**: *null* \| [*ISearchAttributes*](proto.temporal.api.common.v1.isearchattributes.md)

StartWorkflowExecutionRequest searchAttributes

___

### taskQueue

• `Optional` **taskQueue**: *null* \| [*ITaskQueue*](proto.temporal.api.taskqueue.v1.itaskqueue.md)

StartWorkflowExecutionRequest taskQueue

___

### workflowExecutionTimeout

• `Optional` **workflowExecutionTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

StartWorkflowExecutionRequest workflowExecutionTimeout

___

### workflowId

• `Optional` **workflowId**: *null* \| *string*

StartWorkflowExecutionRequest workflowId

___

### workflowIdReusePolicy

• `Optional` **workflowIdReusePolicy**: *null* \| [*WorkflowIdReusePolicy*](../enums/proto.temporal.api.enums.v1.workflowidreusepolicy.md)

StartWorkflowExecutionRequest workflowIdReusePolicy

___

### workflowRunTimeout

• `Optional` **workflowRunTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

StartWorkflowExecutionRequest workflowRunTimeout

___

### workflowTaskTimeout

• `Optional` **workflowTaskTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

StartWorkflowExecutionRequest workflowTaskTimeout

___

### workflowType

• `Optional` **workflowType**: *null* \| [*IWorkflowType*](proto.temporal.api.common.v1.iworkflowtype.md)

StartWorkflowExecutionRequest workflowType
