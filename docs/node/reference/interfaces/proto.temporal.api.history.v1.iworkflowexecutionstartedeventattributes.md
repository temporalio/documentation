# Interface: IWorkflowExecutionStartedEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).IWorkflowExecutionStartedEventAttributes

Properties of a WorkflowExecutionStartedEventAttributes.

## Implemented by

* [*WorkflowExecutionStartedEventAttributes*](../classes/proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md)

## Table of contents

### Properties

- [attempt](proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#attempt)
- [continuedExecutionRunId](proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#continuedexecutionrunid)
- [continuedFailure](proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#continuedfailure)
- [cronSchedule](proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#cronschedule)
- [firstExecutionRunId](proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#firstexecutionrunid)
- [firstWorkflowTaskBackoff](proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#firstworkflowtaskbackoff)
- [header](proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#header)
- [identity](proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#identity)
- [initiator](proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#initiator)
- [input](proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#input)
- [lastCompletionResult](proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#lastcompletionresult)
- [memo](proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#memo)
- [originalExecutionRunId](proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#originalexecutionrunid)
- [parentInitiatedEventId](proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#parentinitiatedeventid)
- [parentWorkflowExecution](proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#parentworkflowexecution)
- [parentWorkflowNamespace](proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#parentworkflownamespace)
- [prevAutoResetPoints](proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#prevautoresetpoints)
- [retryPolicy](proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#retrypolicy)
- [searchAttributes](proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#searchattributes)
- [taskQueue](proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#taskqueue)
- [workflowExecutionExpirationTime](proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#workflowexecutionexpirationtime)
- [workflowExecutionTimeout](proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#workflowexecutiontimeout)
- [workflowRunTimeout](proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#workflowruntimeout)
- [workflowTaskTimeout](proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#workflowtasktimeout)
- [workflowType](proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#workflowtype)

## Properties

### attempt

• `Optional` **attempt**: *null* \| *number*

WorkflowExecutionStartedEventAttributes attempt

___

### continuedExecutionRunId

• `Optional` **continuedExecutionRunId**: *null* \| *string*

WorkflowExecutionStartedEventAttributes continuedExecutionRunId

___

### continuedFailure

• `Optional` **continuedFailure**: *null* \| [*IFailure*](proto.temporal.api.failure.v1.ifailure.md)

WorkflowExecutionStartedEventAttributes continuedFailure

___

### cronSchedule

• `Optional` **cronSchedule**: *null* \| *string*

WorkflowExecutionStartedEventAttributes cronSchedule

___

### firstExecutionRunId

• `Optional` **firstExecutionRunId**: *null* \| *string*

WorkflowExecutionStartedEventAttributes firstExecutionRunId

___

### firstWorkflowTaskBackoff

• `Optional` **firstWorkflowTaskBackoff**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

WorkflowExecutionStartedEventAttributes firstWorkflowTaskBackoff

___

### header

• `Optional` **header**: *null* \| [*IHeader*](proto.temporal.api.common.v1.iheader.md)

WorkflowExecutionStartedEventAttributes header

___

### identity

• `Optional` **identity**: *null* \| *string*

WorkflowExecutionStartedEventAttributes identity

___

### initiator

• `Optional` **initiator**: *null* \| [*ContinueAsNewInitiator*](../enums/proto.temporal.api.enums.v1.continueasnewinitiator.md)

WorkflowExecutionStartedEventAttributes initiator

___

### input

• `Optional` **input**: *null* \| [*IPayloads*](proto.temporal.api.common.v1.ipayloads.md)

WorkflowExecutionStartedEventAttributes input

___

### lastCompletionResult

• `Optional` **lastCompletionResult**: *null* \| [*IPayloads*](proto.temporal.api.common.v1.ipayloads.md)

WorkflowExecutionStartedEventAttributes lastCompletionResult

___

### memo

• `Optional` **memo**: *null* \| [*IMemo*](proto.temporal.api.common.v1.imemo.md)

WorkflowExecutionStartedEventAttributes memo

___

### originalExecutionRunId

• `Optional` **originalExecutionRunId**: *null* \| *string*

WorkflowExecutionStartedEventAttributes originalExecutionRunId

___

### parentInitiatedEventId

• `Optional` **parentInitiatedEventId**: *null* \| Long

WorkflowExecutionStartedEventAttributes parentInitiatedEventId

___

### parentWorkflowExecution

• `Optional` **parentWorkflowExecution**: *null* \| [*IWorkflowExecution*](proto.temporal.api.common.v1.iworkflowexecution.md)

WorkflowExecutionStartedEventAttributes parentWorkflowExecution

___

### parentWorkflowNamespace

• `Optional` **parentWorkflowNamespace**: *null* \| *string*

WorkflowExecutionStartedEventAttributes parentWorkflowNamespace

___

### prevAutoResetPoints

• `Optional` **prevAutoResetPoints**: *null* \| [*IResetPoints*](proto.temporal.api.workflow.v1.iresetpoints.md)

WorkflowExecutionStartedEventAttributes prevAutoResetPoints

___

### retryPolicy

• `Optional` **retryPolicy**: *null* \| [*IRetryPolicy*](proto.temporal.api.common.v1.iretrypolicy.md)

WorkflowExecutionStartedEventAttributes retryPolicy

___

### searchAttributes

• `Optional` **searchAttributes**: *null* \| [*ISearchAttributes*](proto.temporal.api.common.v1.isearchattributes.md)

WorkflowExecutionStartedEventAttributes searchAttributes

___

### taskQueue

• `Optional` **taskQueue**: *null* \| [*ITaskQueue*](proto.temporal.api.taskqueue.v1.itaskqueue.md)

WorkflowExecutionStartedEventAttributes taskQueue

___

### workflowExecutionExpirationTime

• `Optional` **workflowExecutionExpirationTime**: *null* \| [*ITimestamp*](proto.google.protobuf.itimestamp.md)

WorkflowExecutionStartedEventAttributes workflowExecutionExpirationTime

___

### workflowExecutionTimeout

• `Optional` **workflowExecutionTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

WorkflowExecutionStartedEventAttributes workflowExecutionTimeout

___

### workflowRunTimeout

• `Optional` **workflowRunTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

WorkflowExecutionStartedEventAttributes workflowRunTimeout

___

### workflowTaskTimeout

• `Optional` **workflowTaskTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

WorkflowExecutionStartedEventAttributes workflowTaskTimeout

___

### workflowType

• `Optional` **workflowType**: *null* \| [*IWorkflowType*](proto.temporal.api.common.v1.iworkflowtype.md)

WorkflowExecutionStartedEventAttributes workflowType
