# Interface: ISignalWithStartWorkflowExecutionRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).ISignalWithStartWorkflowExecutionRequest

Properties of a SignalWithStartWorkflowExecutionRequest.

## Implemented by

* [*SignalWithStartWorkflowExecutionRequest*](../classes/proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md)

## Table of contents

### Properties

- [control](proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#control)
- [cronSchedule](proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#cronschedule)
- [header](proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#header)
- [identity](proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#identity)
- [input](proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#input)
- [memo](proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#memo)
- [namespace](proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#namespace)
- [requestId](proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#requestid)
- [retryPolicy](proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#retrypolicy)
- [searchAttributes](proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#searchattributes)
- [signalInput](proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#signalinput)
- [signalName](proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#signalname)
- [taskQueue](proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#taskqueue)
- [workflowExecutionTimeout](proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#workflowexecutiontimeout)
- [workflowId](proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#workflowid)
- [workflowIdReusePolicy](proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#workflowidreusepolicy)
- [workflowRunTimeout](proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#workflowruntimeout)
- [workflowTaskTimeout](proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#workflowtasktimeout)
- [workflowType](proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#workflowtype)

## Properties

### control

• `Optional` **control**: *null* \| *string*

SignalWithStartWorkflowExecutionRequest control

___

### cronSchedule

• `Optional` **cronSchedule**: *null* \| *string*

SignalWithStartWorkflowExecutionRequest cronSchedule

___

### header

• `Optional` **header**: *null* \| [*IHeader*](proto.temporal.api.common.v1.iheader.md)

SignalWithStartWorkflowExecutionRequest header

___

### identity

• `Optional` **identity**: *null* \| *string*

SignalWithStartWorkflowExecutionRequest identity

___

### input

• `Optional` **input**: *null* \| [*IPayloads*](proto.temporal.api.common.v1.ipayloads.md)

SignalWithStartWorkflowExecutionRequest input

___

### memo

• `Optional` **memo**: *null* \| [*IMemo*](proto.temporal.api.common.v1.imemo.md)

SignalWithStartWorkflowExecutionRequest memo

___

### namespace

• `Optional` **namespace**: *null* \| *string*

SignalWithStartWorkflowExecutionRequest namespace

___

### requestId

• `Optional` **requestId**: *null* \| *string*

SignalWithStartWorkflowExecutionRequest requestId

___

### retryPolicy

• `Optional` **retryPolicy**: *null* \| [*IRetryPolicy*](proto.temporal.api.common.v1.iretrypolicy.md)

SignalWithStartWorkflowExecutionRequest retryPolicy

___

### searchAttributes

• `Optional` **searchAttributes**: *null* \| [*ISearchAttributes*](proto.temporal.api.common.v1.isearchattributes.md)

SignalWithStartWorkflowExecutionRequest searchAttributes

___

### signalInput

• `Optional` **signalInput**: *null* \| [*IPayloads*](proto.temporal.api.common.v1.ipayloads.md)

SignalWithStartWorkflowExecutionRequest signalInput

___

### signalName

• `Optional` **signalName**: *null* \| *string*

SignalWithStartWorkflowExecutionRequest signalName

___

### taskQueue

• `Optional` **taskQueue**: *null* \| [*ITaskQueue*](proto.temporal.api.taskqueue.v1.itaskqueue.md)

SignalWithStartWorkflowExecutionRequest taskQueue

___

### workflowExecutionTimeout

• `Optional` **workflowExecutionTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

SignalWithStartWorkflowExecutionRequest workflowExecutionTimeout

___

### workflowId

• `Optional` **workflowId**: *null* \| *string*

SignalWithStartWorkflowExecutionRequest workflowId

___

### workflowIdReusePolicy

• `Optional` **workflowIdReusePolicy**: *null* \| [*WorkflowIdReusePolicy*](../enums/proto.temporal.api.enums.v1.workflowidreusepolicy.md)

SignalWithStartWorkflowExecutionRequest workflowIdReusePolicy

___

### workflowRunTimeout

• `Optional` **workflowRunTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

SignalWithStartWorkflowExecutionRequest workflowRunTimeout

___

### workflowTaskTimeout

• `Optional` **workflowTaskTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

SignalWithStartWorkflowExecutionRequest workflowTaskTimeout

___

### workflowType

• `Optional` **workflowType**: *null* \| [*IWorkflowType*](proto.temporal.api.common.v1.iworkflowtype.md)

SignalWithStartWorkflowExecutionRequest workflowType
