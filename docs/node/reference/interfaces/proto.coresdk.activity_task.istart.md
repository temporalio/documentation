# Interface: IStart

[coresdk](../modules/proto.coresdk.md).[activity_task](../modules/proto.coresdk.activity_task.md).IStart

Properties of a Start.

## Implemented by

* [*Start*](../classes/proto.coresdk.activity_task.start.md)

## Table of contents

### Properties

- [activityType](proto.coresdk.activity_task.istart.md#activitytype)
- [attempt](proto.coresdk.activity_task.istart.md#attempt)
- [currentAttemptScheduledTime](proto.coresdk.activity_task.istart.md#currentattemptscheduledtime)
- [headerFields](proto.coresdk.activity_task.istart.md#headerfields)
- [heartbeatDetails](proto.coresdk.activity_task.istart.md#heartbeatdetails)
- [heartbeatTimeout](proto.coresdk.activity_task.istart.md#heartbeattimeout)
- [input](proto.coresdk.activity_task.istart.md#input)
- [retryPolicy](proto.coresdk.activity_task.istart.md#retrypolicy)
- [scheduleToCloseTimeout](proto.coresdk.activity_task.istart.md#scheduletoclosetimeout)
- [scheduledTime](proto.coresdk.activity_task.istart.md#scheduledtime)
- [startToCloseTimeout](proto.coresdk.activity_task.istart.md#starttoclosetimeout)
- [startedTime](proto.coresdk.activity_task.istart.md#startedtime)
- [workflowExecution](proto.coresdk.activity_task.istart.md#workflowexecution)
- [workflowNamespace](proto.coresdk.activity_task.istart.md#workflownamespace)
- [workflowType](proto.coresdk.activity_task.istart.md#workflowtype)

## Properties

### activityType

• `Optional` **activityType**: *null* \| *string*

The activity's type name or function identifier

___

### attempt

• `Optional` **attempt**: *null* \| *number*

Start attempt

___

### currentAttemptScheduledTime

• `Optional` **currentAttemptScheduledTime**: *null* \| [*ITimestamp*](proto.google.protobuf.itimestamp.md)

Start currentAttemptScheduledTime

___

### headerFields

• `Optional` **headerFields**: *null* \| { [k: string]: [*IPayload*](proto.coresdk.common.ipayload.md);  }

Start headerFields

___

### heartbeatDetails

• `Optional` **heartbeatDetails**: *null* \| [*IPayload*](proto.coresdk.common.ipayload.md)[]

Start heartbeatDetails

___

### heartbeatTimeout

• `Optional` **heartbeatTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

Start heartbeatTimeout

___

### input

• `Optional` **input**: *null* \| [*IPayload*](proto.coresdk.common.ipayload.md)[]

Arguments to the activity

___

### retryPolicy

• `Optional` **retryPolicy**: *null* \| [*IRetryPolicy*](proto.coresdk.common.iretrypolicy.md)

values are not specified or exceed configured system limits.

___

### scheduleToCloseTimeout

• `Optional` **scheduleToCloseTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

Start scheduleToCloseTimeout

___

### scheduledTime

• `Optional` **scheduledTime**: *null* \| [*ITimestamp*](proto.google.protobuf.itimestamp.md)

Start scheduledTime

___

### startToCloseTimeout

• `Optional` **startToCloseTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

Start startToCloseTimeout

___

### startedTime

• `Optional` **startedTime**: *null* \| [*ITimestamp*](proto.google.protobuf.itimestamp.md)

Start startedTime

___

### workflowExecution

• `Optional` **workflowExecution**: *null* \| [*IWorkflowExecution*](proto.coresdk.common.iworkflowexecution.md)

Start workflowExecution

___

### workflowNamespace

• `Optional` **workflowNamespace**: *null* \| *string*

Start workflowNamespace

___

### workflowType

• `Optional` **workflowType**: *null* \| *string*

The workflow's type name or function identifier
