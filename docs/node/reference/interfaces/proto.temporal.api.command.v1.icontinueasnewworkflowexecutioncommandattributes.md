# Interface: IContinueAsNewWorkflowExecutionCommandAttributes

[command](../modules/proto.temporal.api.command.md).[v1](../modules/proto.temporal.api.command.v1.md).IContinueAsNewWorkflowExecutionCommandAttributes

Properties of a ContinueAsNewWorkflowExecutionCommandAttributes.

## Implemented by

* [*ContinueAsNewWorkflowExecutionCommandAttributes*](../classes/proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md)

## Table of contents

### Properties

- [backoffStartInterval](proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md#backoffstartinterval)
- [cronSchedule](proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md#cronschedule)
- [failure](proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md#failure)
- [header](proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md#header)
- [initiator](proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md#initiator)
- [input](proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md#input)
- [lastCompletionResult](proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md#lastcompletionresult)
- [memo](proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md#memo)
- [retryPolicy](proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md#retrypolicy)
- [searchAttributes](proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md#searchattributes)
- [taskQueue](proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md#taskqueue)
- [workflowRunTimeout](proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md#workflowruntimeout)
- [workflowTaskTimeout](proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md#workflowtasktimeout)
- [workflowType](proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md#workflowtype)

## Properties

### backoffStartInterval

• `Optional` **backoffStartInterval**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

ContinueAsNewWorkflowExecutionCommandAttributes backoffStartInterval

___

### cronSchedule

• `Optional` **cronSchedule**: *null* \| *string*

ContinueAsNewWorkflowExecutionCommandAttributes cronSchedule

___

### failure

• `Optional` **failure**: *null* \| [*IFailure*](proto.temporal.api.failure.v1.ifailure.md)

ContinueAsNewWorkflowExecutionCommandAttributes failure

___

### header

• `Optional` **header**: *null* \| [*IHeader*](proto.temporal.api.common.v1.iheader.md)

ContinueAsNewWorkflowExecutionCommandAttributes header

___

### initiator

• `Optional` **initiator**: *null* \| [*ContinueAsNewInitiator*](../enums/proto.temporal.api.enums.v1.continueasnewinitiator.md)

ContinueAsNewWorkflowExecutionCommandAttributes initiator

___

### input

• `Optional` **input**: *null* \| [*IPayloads*](proto.temporal.api.common.v1.ipayloads.md)

ContinueAsNewWorkflowExecutionCommandAttributes input

___

### lastCompletionResult

• `Optional` **lastCompletionResult**: *null* \| [*IPayloads*](proto.temporal.api.common.v1.ipayloads.md)

ContinueAsNewWorkflowExecutionCommandAttributes lastCompletionResult

___

### memo

• `Optional` **memo**: *null* \| [*IMemo*](proto.temporal.api.common.v1.imemo.md)

ContinueAsNewWorkflowExecutionCommandAttributes memo

___

### retryPolicy

• `Optional` **retryPolicy**: *null* \| [*IRetryPolicy*](proto.temporal.api.common.v1.iretrypolicy.md)

ContinueAsNewWorkflowExecutionCommandAttributes retryPolicy

___

### searchAttributes

• `Optional` **searchAttributes**: *null* \| [*ISearchAttributes*](proto.temporal.api.common.v1.isearchattributes.md)

ContinueAsNewWorkflowExecutionCommandAttributes searchAttributes

___

### taskQueue

• `Optional` **taskQueue**: *null* \| [*ITaskQueue*](proto.temporal.api.taskqueue.v1.itaskqueue.md)

ContinueAsNewWorkflowExecutionCommandAttributes taskQueue

___

### workflowRunTimeout

• `Optional` **workflowRunTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

ContinueAsNewWorkflowExecutionCommandAttributes workflowRunTimeout

___

### workflowTaskTimeout

• `Optional` **workflowTaskTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

ContinueAsNewWorkflowExecutionCommandAttributes workflowTaskTimeout

___

### workflowType

• `Optional` **workflowType**: *null* \| [*IWorkflowType*](proto.temporal.api.common.v1.iworkflowtype.md)

ContinueAsNewWorkflowExecutionCommandAttributes workflowType
