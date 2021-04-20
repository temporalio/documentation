# Interface: IScheduleActivityTaskCommandAttributes

[command](../modules/proto.temporal.api.command.md).[v1](../modules/proto.temporal.api.command.v1.md).IScheduleActivityTaskCommandAttributes

Properties of a ScheduleActivityTaskCommandAttributes.

## Implemented by

* [*ScheduleActivityTaskCommandAttributes*](../classes/proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md)

## Table of contents

### Properties

- [activityId](proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md#activityid)
- [activityType](proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md#activitytype)
- [header](proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md#header)
- [heartbeatTimeout](proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md#heartbeattimeout)
- [input](proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md#input)
- [namespace](proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md#namespace)
- [retryPolicy](proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md#retrypolicy)
- [scheduleToCloseTimeout](proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md#scheduletoclosetimeout)
- [scheduleToStartTimeout](proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md#scheduletostarttimeout)
- [startToCloseTimeout](proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md#starttoclosetimeout)
- [taskQueue](proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md#taskqueue)

## Properties

### activityId

• `Optional` **activityId**: *null* \| *string*

ScheduleActivityTaskCommandAttributes activityId

___

### activityType

• `Optional` **activityType**: *null* \| [*IActivityType*](proto.temporal.api.common.v1.iactivitytype.md)

ScheduleActivityTaskCommandAttributes activityType

___

### header

• `Optional` **header**: *null* \| [*IHeader*](proto.temporal.api.common.v1.iheader.md)

ScheduleActivityTaskCommandAttributes header

___

### heartbeatTimeout

• `Optional` **heartbeatTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

ScheduleActivityTaskCommandAttributes heartbeatTimeout

___

### input

• `Optional` **input**: *null* \| [*IPayloads*](proto.temporal.api.common.v1.ipayloads.md)

ScheduleActivityTaskCommandAttributes input

___

### namespace

• `Optional` **namespace**: *null* \| *string*

ScheduleActivityTaskCommandAttributes namespace

___

### retryPolicy

• `Optional` **retryPolicy**: *null* \| [*IRetryPolicy*](proto.temporal.api.common.v1.iretrypolicy.md)

ScheduleActivityTaskCommandAttributes retryPolicy

___

### scheduleToCloseTimeout

• `Optional` **scheduleToCloseTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

ScheduleActivityTaskCommandAttributes scheduleToCloseTimeout

___

### scheduleToStartTimeout

• `Optional` **scheduleToStartTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

ScheduleActivityTaskCommandAttributes scheduleToStartTimeout

___

### startToCloseTimeout

• `Optional` **startToCloseTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

ScheduleActivityTaskCommandAttributes startToCloseTimeout

___

### taskQueue

• `Optional` **taskQueue**: *null* \| [*ITaskQueue*](proto.temporal.api.taskqueue.v1.itaskqueue.md)

ScheduleActivityTaskCommandAttributes taskQueue
