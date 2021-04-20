# Interface: IWorkflowExecutionContinuedAsNewEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).IWorkflowExecutionContinuedAsNewEventAttributes

Properties of a WorkflowExecutionContinuedAsNewEventAttributes.

## Implemented by

* [*WorkflowExecutionContinuedAsNewEventAttributes*](../classes/proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md)

## Table of contents

### Properties

- [backoffStartInterval](proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md#backoffstartinterval)
- [failure](proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md#failure)
- [header](proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md#header)
- [initiator](proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md#initiator)
- [input](proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md#input)
- [lastCompletionResult](proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md#lastcompletionresult)
- [memo](proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md#memo)
- [newExecutionRunId](proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md#newexecutionrunid)
- [searchAttributes](proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md#searchattributes)
- [taskQueue](proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md#taskqueue)
- [workflowRunTimeout](proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md#workflowruntimeout)
- [workflowTaskCompletedEventId](proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md#workflowtaskcompletedeventid)
- [workflowTaskTimeout](proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md#workflowtasktimeout)
- [workflowType](proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md#workflowtype)

## Properties

### backoffStartInterval

• `Optional` **backoffStartInterval**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

WorkflowExecutionContinuedAsNewEventAttributes backoffStartInterval

___

### failure

• `Optional` **failure**: *null* \| [*IFailure*](proto.temporal.api.failure.v1.ifailure.md)

WorkflowExecutionContinuedAsNewEventAttributes failure

___

### header

• `Optional` **header**: *null* \| [*IHeader*](proto.temporal.api.common.v1.iheader.md)

WorkflowExecutionContinuedAsNewEventAttributes header

___

### initiator

• `Optional` **initiator**: *null* \| [*ContinueAsNewInitiator*](../enums/proto.temporal.api.enums.v1.continueasnewinitiator.md)

WorkflowExecutionContinuedAsNewEventAttributes initiator

___

### input

• `Optional` **input**: *null* \| [*IPayloads*](proto.temporal.api.common.v1.ipayloads.md)

WorkflowExecutionContinuedAsNewEventAttributes input

___

### lastCompletionResult

• `Optional` **lastCompletionResult**: *null* \| [*IPayloads*](proto.temporal.api.common.v1.ipayloads.md)

WorkflowExecutionContinuedAsNewEventAttributes lastCompletionResult

___

### memo

• `Optional` **memo**: *null* \| [*IMemo*](proto.temporal.api.common.v1.imemo.md)

WorkflowExecutionContinuedAsNewEventAttributes memo

___

### newExecutionRunId

• `Optional` **newExecutionRunId**: *null* \| *string*

WorkflowExecutionContinuedAsNewEventAttributes newExecutionRunId

___

### searchAttributes

• `Optional` **searchAttributes**: *null* \| [*ISearchAttributes*](proto.temporal.api.common.v1.isearchattributes.md)

WorkflowExecutionContinuedAsNewEventAttributes searchAttributes

___

### taskQueue

• `Optional` **taskQueue**: *null* \| [*ITaskQueue*](proto.temporal.api.taskqueue.v1.itaskqueue.md)

WorkflowExecutionContinuedAsNewEventAttributes taskQueue

___

### workflowRunTimeout

• `Optional` **workflowRunTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

WorkflowExecutionContinuedAsNewEventAttributes workflowRunTimeout

___

### workflowTaskCompletedEventId

• `Optional` **workflowTaskCompletedEventId**: *null* \| Long

WorkflowExecutionContinuedAsNewEventAttributes workflowTaskCompletedEventId

___

### workflowTaskTimeout

• `Optional` **workflowTaskTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

WorkflowExecutionContinuedAsNewEventAttributes workflowTaskTimeout

___

### workflowType

• `Optional` **workflowType**: *null* \| [*IWorkflowType*](proto.temporal.api.common.v1.iworkflowtype.md)

WorkflowExecutionContinuedAsNewEventAttributes workflowType
