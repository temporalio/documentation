# Interface: IScheduleActivity

[coresdk](../modules/proto.coresdk.md).[workflow_commands](../modules/proto.coresdk.workflow_commands.md).IScheduleActivity

Properties of a ScheduleActivity.

## Implemented by

* [*ScheduleActivity*](../classes/proto.coresdk.workflow_commands.scheduleactivity.md)

## Table of contents

### Properties

- [activityId](proto.coresdk.workflow_commands.ischeduleactivity.md#activityid)
- [activityType](proto.coresdk.workflow_commands.ischeduleactivity.md#activitytype)
- [arguments](proto.coresdk.workflow_commands.ischeduleactivity.md#arguments)
- [headerFields](proto.coresdk.workflow_commands.ischeduleactivity.md#headerfields)
- [heartbeatTimeout](proto.coresdk.workflow_commands.ischeduleactivity.md#heartbeattimeout)
- [namespace](proto.coresdk.workflow_commands.ischeduleactivity.md#namespace)
- [retryPolicy](proto.coresdk.workflow_commands.ischeduleactivity.md#retrypolicy)
- [scheduleToCloseTimeout](proto.coresdk.workflow_commands.ischeduleactivity.md#scheduletoclosetimeout)
- [scheduleToStartTimeout](proto.coresdk.workflow_commands.ischeduleactivity.md#scheduletostarttimeout)
- [startToCloseTimeout](proto.coresdk.workflow_commands.ischeduleactivity.md#starttoclosetimeout)
- [taskQueue](proto.coresdk.workflow_commands.ischeduleactivity.md#taskqueue)

## Properties

### activityId

• `Optional` **activityId**: *null* \| *string*

ScheduleActivity activityId

___

### activityType

• `Optional` **activityType**: *null* \| *string*

ScheduleActivity activityType

___

### arguments

• `Optional` **arguments**: *null* \| [*IPayload*](proto.coresdk.common.ipayload.md)[]

Arguments/input to the activity. Called "input" upstream.

___

### headerFields

• `Optional` **headerFields**: *null* \| { [k: string]: [*IPayload*](proto.coresdk.common.ipayload.md);  }

ScheduleActivity headerFields

___

### heartbeatTimeout

• `Optional` **heartbeatTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

Maximum time allowed between successful worker heartbeats.

___

### namespace

• `Optional` **namespace**: *null* \| *string*

ScheduleActivity namespace

___

### retryPolicy

• `Optional` **retryPolicy**: *null* \| [*IRetryPolicy*](proto.coresdk.common.iretrypolicy.md)

retry_policy.maximum_attempts to 1.

___

### scheduleToCloseTimeout

• `Optional` **scheduleToCloseTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

When not specified defaults to the workflow execution timeout.

___

### scheduleToStartTimeout

• `Optional` **scheduleToStartTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

queue. Defaults to schedule_to_close_timeout or workflow execution timeout if not specified.

___

### startToCloseTimeout

• `Optional` **startToCloseTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

TODO: Is this really either or can you do both? Make oneof if mutually exclusive

___

### taskQueue

• `Optional` **taskQueue**: *null* \| *string*

ScheduleActivity taskQueue
