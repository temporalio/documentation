# Interface: IPollActivityTaskQueueResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).IPollActivityTaskQueueResponse

Properties of a PollActivityTaskQueueResponse.

## Implemented by

* [*PollActivityTaskQueueResponse*](../classes/proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md)

## Table of contents

### Properties

- [activityId](proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md#activityid)
- [activityType](proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md#activitytype)
- [attempt](proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md#attempt)
- [currentAttemptScheduledTime](proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md#currentattemptscheduledtime)
- [header](proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md#header)
- [heartbeatDetails](proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md#heartbeatdetails)
- [heartbeatTimeout](proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md#heartbeattimeout)
- [input](proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md#input)
- [retryPolicy](proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md#retrypolicy)
- [scheduleToCloseTimeout](proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md#scheduletoclosetimeout)
- [scheduledTime](proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md#scheduledtime)
- [startToCloseTimeout](proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md#starttoclosetimeout)
- [startedTime](proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md#startedtime)
- [taskToken](proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md#tasktoken)
- [workflowExecution](proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md#workflowexecution)
- [workflowNamespace](proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md#workflownamespace)
- [workflowType](proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md#workflowtype)

## Properties

### activityId

• `Optional` **activityId**: *null* \| *string*

PollActivityTaskQueueResponse activityId

___

### activityType

• `Optional` **activityType**: *null* \| [*IActivityType*](proto.temporal.api.common.v1.iactivitytype.md)

PollActivityTaskQueueResponse activityType

___

### attempt

• `Optional` **attempt**: *null* \| *number*

PollActivityTaskQueueResponse attempt

___

### currentAttemptScheduledTime

• `Optional` **currentAttemptScheduledTime**: *null* \| [*ITimestamp*](proto.google.protobuf.itimestamp.md)

PollActivityTaskQueueResponse currentAttemptScheduledTime

___

### header

• `Optional` **header**: *null* \| [*IHeader*](proto.temporal.api.common.v1.iheader.md)

PollActivityTaskQueueResponse header

___

### heartbeatDetails

• `Optional` **heartbeatDetails**: *null* \| [*IPayloads*](proto.temporal.api.common.v1.ipayloads.md)

PollActivityTaskQueueResponse heartbeatDetails

___

### heartbeatTimeout

• `Optional` **heartbeatTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

PollActivityTaskQueueResponse heartbeatTimeout

___

### input

• `Optional` **input**: *null* \| [*IPayloads*](proto.temporal.api.common.v1.ipayloads.md)

PollActivityTaskQueueResponse input

___

### retryPolicy

• `Optional` **retryPolicy**: *null* \| [*IRetryPolicy*](proto.temporal.api.common.v1.iretrypolicy.md)

PollActivityTaskQueueResponse retryPolicy

___

### scheduleToCloseTimeout

• `Optional` **scheduleToCloseTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

PollActivityTaskQueueResponse scheduleToCloseTimeout

___

### scheduledTime

• `Optional` **scheduledTime**: *null* \| [*ITimestamp*](proto.google.protobuf.itimestamp.md)

PollActivityTaskQueueResponse scheduledTime

___

### startToCloseTimeout

• `Optional` **startToCloseTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

PollActivityTaskQueueResponse startToCloseTimeout

___

### startedTime

• `Optional` **startedTime**: *null* \| [*ITimestamp*](proto.google.protobuf.itimestamp.md)

PollActivityTaskQueueResponse startedTime

___

### taskToken

• `Optional` **taskToken**: *null* \| *Uint8Array*

PollActivityTaskQueueResponse taskToken

___

### workflowExecution

• `Optional` **workflowExecution**: *null* \| [*IWorkflowExecution*](proto.temporal.api.common.v1.iworkflowexecution.md)

PollActivityTaskQueueResponse workflowExecution

___

### workflowNamespace

• `Optional` **workflowNamespace**: *null* \| *string*

PollActivityTaskQueueResponse workflowNamespace

___

### workflowType

• `Optional` **workflowType**: *null* \| [*IWorkflowType*](proto.temporal.api.common.v1.iworkflowtype.md)

PollActivityTaskQueueResponse workflowType
