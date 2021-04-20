# Interface: ISignalExternalWorkflowExecutionFailedEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).ISignalExternalWorkflowExecutionFailedEventAttributes

Properties of a SignalExternalWorkflowExecutionFailedEventAttributes.

## Implemented by

* [*SignalExternalWorkflowExecutionFailedEventAttributes*](../classes/proto.temporal.api.history.v1.signalexternalworkflowexecutionfailedeventattributes.md)

## Table of contents

### Properties

- [cause](proto.temporal.api.history.v1.isignalexternalworkflowexecutionfailedeventattributes.md#cause)
- [control](proto.temporal.api.history.v1.isignalexternalworkflowexecutionfailedeventattributes.md#control)
- [initiatedEventId](proto.temporal.api.history.v1.isignalexternalworkflowexecutionfailedeventattributes.md#initiatedeventid)
- [namespace](proto.temporal.api.history.v1.isignalexternalworkflowexecutionfailedeventattributes.md#namespace)
- [workflowExecution](proto.temporal.api.history.v1.isignalexternalworkflowexecutionfailedeventattributes.md#workflowexecution)
- [workflowTaskCompletedEventId](proto.temporal.api.history.v1.isignalexternalworkflowexecutionfailedeventattributes.md#workflowtaskcompletedeventid)

## Properties

### cause

• `Optional` **cause**: *null* \| [*SignalExternalWorkflowExecutionFailedCause*](../enums/proto.temporal.api.enums.v1.signalexternalworkflowexecutionfailedcause.md)

SignalExternalWorkflowExecutionFailedEventAttributes cause

___

### control

• `Optional` **control**: *null* \| *string*

SignalExternalWorkflowExecutionFailedEventAttributes control

___

### initiatedEventId

• `Optional` **initiatedEventId**: *null* \| Long

SignalExternalWorkflowExecutionFailedEventAttributes initiatedEventId

___

### namespace

• `Optional` **namespace**: *null* \| *string*

SignalExternalWorkflowExecutionFailedEventAttributes namespace

___

### workflowExecution

• `Optional` **workflowExecution**: *null* \| [*IWorkflowExecution*](proto.temporal.api.common.v1.iworkflowexecution.md)

SignalExternalWorkflowExecutionFailedEventAttributes workflowExecution

___

### workflowTaskCompletedEventId

• `Optional` **workflowTaskCompletedEventId**: *null* \| Long

SignalExternalWorkflowExecutionFailedEventAttributes workflowTaskCompletedEventId
