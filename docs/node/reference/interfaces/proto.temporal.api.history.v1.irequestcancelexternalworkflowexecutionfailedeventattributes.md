# Interface: IRequestCancelExternalWorkflowExecutionFailedEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).IRequestCancelExternalWorkflowExecutionFailedEventAttributes

Properties of a RequestCancelExternalWorkflowExecutionFailedEventAttributes.

## Implemented by

* [*RequestCancelExternalWorkflowExecutionFailedEventAttributes*](../classes/proto.temporal.api.history.v1.requestcancelexternalworkflowexecutionfailedeventattributes.md)

## Table of contents

### Properties

- [cause](proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutionfailedeventattributes.md#cause)
- [control](proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutionfailedeventattributes.md#control)
- [initiatedEventId](proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutionfailedeventattributes.md#initiatedeventid)
- [namespace](proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutionfailedeventattributes.md#namespace)
- [workflowExecution](proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutionfailedeventattributes.md#workflowexecution)
- [workflowTaskCompletedEventId](proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutionfailedeventattributes.md#workflowtaskcompletedeventid)

## Properties

### cause

• `Optional` **cause**: *null* \| [*CancelExternalWorkflowExecutionFailedCause*](../enums/proto.temporal.api.enums.v1.cancelexternalworkflowexecutionfailedcause.md)

RequestCancelExternalWorkflowExecutionFailedEventAttributes cause

___

### control

• `Optional` **control**: *null* \| *string*

RequestCancelExternalWorkflowExecutionFailedEventAttributes control

___

### initiatedEventId

• `Optional` **initiatedEventId**: *null* \| Long

RequestCancelExternalWorkflowExecutionFailedEventAttributes initiatedEventId

___

### namespace

• `Optional` **namespace**: *null* \| *string*

RequestCancelExternalWorkflowExecutionFailedEventAttributes namespace

___

### workflowExecution

• `Optional` **workflowExecution**: *null* \| [*IWorkflowExecution*](proto.temporal.api.common.v1.iworkflowexecution.md)

RequestCancelExternalWorkflowExecutionFailedEventAttributes workflowExecution

___

### workflowTaskCompletedEventId

• `Optional` **workflowTaskCompletedEventId**: *null* \| Long

RequestCancelExternalWorkflowExecutionFailedEventAttributes workflowTaskCompletedEventId
