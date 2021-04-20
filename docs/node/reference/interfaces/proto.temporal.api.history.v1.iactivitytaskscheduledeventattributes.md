# Interface: IActivityTaskScheduledEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).IActivityTaskScheduledEventAttributes

Properties of an ActivityTaskScheduledEventAttributes.

## Implemented by

* [*ActivityTaskScheduledEventAttributes*](../classes/proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md)

## Table of contents

### Properties

- [activityId](proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md#activityid)
- [activityType](proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md#activitytype)
- [header](proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md#header)
- [heartbeatTimeout](proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md#heartbeattimeout)
- [input](proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md#input)
- [namespace](proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md#namespace)
- [retryPolicy](proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md#retrypolicy)
- [scheduleToCloseTimeout](proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md#scheduletoclosetimeout)
- [scheduleToStartTimeout](proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md#scheduletostarttimeout)
- [startToCloseTimeout](proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md#starttoclosetimeout)
- [taskQueue](proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md#taskqueue)
- [workflowTaskCompletedEventId](proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md#workflowtaskcompletedeventid)

## Properties

### activityId

• `Optional` **activityId**: *null* \| *string*

ActivityTaskScheduledEventAttributes activityId

___

### activityType

• `Optional` **activityType**: *null* \| [*IActivityType*](proto.temporal.api.common.v1.iactivitytype.md)

ActivityTaskScheduledEventAttributes activityType

___

### header

• `Optional` **header**: *null* \| [*IHeader*](proto.temporal.api.common.v1.iheader.md)

ActivityTaskScheduledEventAttributes header

___

### heartbeatTimeout

• `Optional` **heartbeatTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

ActivityTaskScheduledEventAttributes heartbeatTimeout

___

### input

• `Optional` **input**: *null* \| [*IPayloads*](proto.temporal.api.common.v1.ipayloads.md)

ActivityTaskScheduledEventAttributes input

___

### namespace

• `Optional` **namespace**: *null* \| *string*

ActivityTaskScheduledEventAttributes namespace

___

### retryPolicy

• `Optional` **retryPolicy**: *null* \| [*IRetryPolicy*](proto.temporal.api.common.v1.iretrypolicy.md)

ActivityTaskScheduledEventAttributes retryPolicy

___

### scheduleToCloseTimeout

• `Optional` **scheduleToCloseTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

ActivityTaskScheduledEventAttributes scheduleToCloseTimeout

___

### scheduleToStartTimeout

• `Optional` **scheduleToStartTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

ActivityTaskScheduledEventAttributes scheduleToStartTimeout

___

### startToCloseTimeout

• `Optional` **startToCloseTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

ActivityTaskScheduledEventAttributes startToCloseTimeout

___

### taskQueue

• `Optional` **taskQueue**: *null* \| [*ITaskQueue*](proto.temporal.api.taskqueue.v1.itaskqueue.md)

ActivityTaskScheduledEventAttributes taskQueue

___

### workflowTaskCompletedEventId

• `Optional` **workflowTaskCompletedEventId**: *null* \| Long

ActivityTaskScheduledEventAttributes workflowTaskCompletedEventId
