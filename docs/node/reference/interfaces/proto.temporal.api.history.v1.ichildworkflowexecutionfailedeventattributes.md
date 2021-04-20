# Interface: IChildWorkflowExecutionFailedEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).IChildWorkflowExecutionFailedEventAttributes

Properties of a ChildWorkflowExecutionFailedEventAttributes.

## Implemented by

* [*ChildWorkflowExecutionFailedEventAttributes*](../classes/proto.temporal.api.history.v1.childworkflowexecutionfailedeventattributes.md)

## Table of contents

### Properties

- [failure](proto.temporal.api.history.v1.ichildworkflowexecutionfailedeventattributes.md#failure)
- [initiatedEventId](proto.temporal.api.history.v1.ichildworkflowexecutionfailedeventattributes.md#initiatedeventid)
- [namespace](proto.temporal.api.history.v1.ichildworkflowexecutionfailedeventattributes.md#namespace)
- [retryState](proto.temporal.api.history.v1.ichildworkflowexecutionfailedeventattributes.md#retrystate)
- [startedEventId](proto.temporal.api.history.v1.ichildworkflowexecutionfailedeventattributes.md#startedeventid)
- [workflowExecution](proto.temporal.api.history.v1.ichildworkflowexecutionfailedeventattributes.md#workflowexecution)
- [workflowType](proto.temporal.api.history.v1.ichildworkflowexecutionfailedeventattributes.md#workflowtype)

## Properties

### failure

• `Optional` **failure**: *null* \| [*IFailure*](proto.temporal.api.failure.v1.ifailure.md)

ChildWorkflowExecutionFailedEventAttributes failure

___

### initiatedEventId

• `Optional` **initiatedEventId**: *null* \| Long

ChildWorkflowExecutionFailedEventAttributes initiatedEventId

___

### namespace

• `Optional` **namespace**: *null* \| *string*

ChildWorkflowExecutionFailedEventAttributes namespace

___

### retryState

• `Optional` **retryState**: *null* \| [*RetryState*](../enums/proto.temporal.api.enums.v1.retrystate.md)

ChildWorkflowExecutionFailedEventAttributes retryState

___

### startedEventId

• `Optional` **startedEventId**: *null* \| Long

ChildWorkflowExecutionFailedEventAttributes startedEventId

___

### workflowExecution

• `Optional` **workflowExecution**: *null* \| [*IWorkflowExecution*](proto.temporal.api.common.v1.iworkflowexecution.md)

ChildWorkflowExecutionFailedEventAttributes workflowExecution

___

### workflowType

• `Optional` **workflowType**: *null* \| [*IWorkflowType*](proto.temporal.api.common.v1.iworkflowtype.md)

ChildWorkflowExecutionFailedEventAttributes workflowType
