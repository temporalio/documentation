# Interface: IChildWorkflowExecutionFailureInfo

[failure](../modules/proto.temporal.api.failure.md).[v1](../modules/proto.temporal.api.failure.v1.md).IChildWorkflowExecutionFailureInfo

Properties of a ChildWorkflowExecutionFailureInfo.

## Implemented by

* [*ChildWorkflowExecutionFailureInfo*](../classes/proto.temporal.api.failure.v1.childworkflowexecutionfailureinfo.md)

## Table of contents

### Properties

- [initiatedEventId](proto.temporal.api.failure.v1.ichildworkflowexecutionfailureinfo.md#initiatedeventid)
- [namespace](proto.temporal.api.failure.v1.ichildworkflowexecutionfailureinfo.md#namespace)
- [retryState](proto.temporal.api.failure.v1.ichildworkflowexecutionfailureinfo.md#retrystate)
- [startedEventId](proto.temporal.api.failure.v1.ichildworkflowexecutionfailureinfo.md#startedeventid)
- [workflowExecution](proto.temporal.api.failure.v1.ichildworkflowexecutionfailureinfo.md#workflowexecution)
- [workflowType](proto.temporal.api.failure.v1.ichildworkflowexecutionfailureinfo.md#workflowtype)

## Properties

### initiatedEventId

• `Optional` **initiatedEventId**: *null* \| Long

ChildWorkflowExecutionFailureInfo initiatedEventId

___

### namespace

• `Optional` **namespace**: *null* \| *string*

ChildWorkflowExecutionFailureInfo namespace

___

### retryState

• `Optional` **retryState**: *null* \| [*RetryState*](../enums/proto.temporal.api.enums.v1.retrystate.md)

ChildWorkflowExecutionFailureInfo retryState

___

### startedEventId

• `Optional` **startedEventId**: *null* \| Long

ChildWorkflowExecutionFailureInfo startedEventId

___

### workflowExecution

• `Optional` **workflowExecution**: *null* \| [*IWorkflowExecution*](proto.temporal.api.common.v1.iworkflowexecution.md)

ChildWorkflowExecutionFailureInfo workflowExecution

___

### workflowType

• `Optional` **workflowType**: *null* \| [*IWorkflowType*](proto.temporal.api.common.v1.iworkflowtype.md)

ChildWorkflowExecutionFailureInfo workflowType
