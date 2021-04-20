# Interface: IPendingActivityInfo

[workflow](../modules/proto.temporal.api.workflow.md).[v1](../modules/proto.temporal.api.workflow.v1.md).IPendingActivityInfo

Properties of a PendingActivityInfo.

## Implemented by

* [*PendingActivityInfo*](../classes/proto.temporal.api.workflow.v1.pendingactivityinfo.md)

## Table of contents

### Properties

- [activityId](proto.temporal.api.workflow.v1.ipendingactivityinfo.md#activityid)
- [activityType](proto.temporal.api.workflow.v1.ipendingactivityinfo.md#activitytype)
- [attempt](proto.temporal.api.workflow.v1.ipendingactivityinfo.md#attempt)
- [expirationTime](proto.temporal.api.workflow.v1.ipendingactivityinfo.md#expirationtime)
- [heartbeatDetails](proto.temporal.api.workflow.v1.ipendingactivityinfo.md#heartbeatdetails)
- [lastFailure](proto.temporal.api.workflow.v1.ipendingactivityinfo.md#lastfailure)
- [lastHeartbeatTime](proto.temporal.api.workflow.v1.ipendingactivityinfo.md#lastheartbeattime)
- [lastStartedTime](proto.temporal.api.workflow.v1.ipendingactivityinfo.md#laststartedtime)
- [lastWorkerIdentity](proto.temporal.api.workflow.v1.ipendingactivityinfo.md#lastworkeridentity)
- [maximumAttempts](proto.temporal.api.workflow.v1.ipendingactivityinfo.md#maximumattempts)
- [scheduledTime](proto.temporal.api.workflow.v1.ipendingactivityinfo.md#scheduledtime)
- [state](proto.temporal.api.workflow.v1.ipendingactivityinfo.md#state)

## Properties

### activityId

• `Optional` **activityId**: *null* \| *string*

PendingActivityInfo activityId

___

### activityType

• `Optional` **activityType**: *null* \| [*IActivityType*](proto.temporal.api.common.v1.iactivitytype.md)

PendingActivityInfo activityType

___

### attempt

• `Optional` **attempt**: *null* \| *number*

PendingActivityInfo attempt

___

### expirationTime

• `Optional` **expirationTime**: *null* \| [*ITimestamp*](proto.google.protobuf.itimestamp.md)

PendingActivityInfo expirationTime

___

### heartbeatDetails

• `Optional` **heartbeatDetails**: *null* \| [*IPayloads*](proto.temporal.api.common.v1.ipayloads.md)

PendingActivityInfo heartbeatDetails

___

### lastFailure

• `Optional` **lastFailure**: *null* \| [*IFailure*](proto.temporal.api.failure.v1.ifailure.md)

PendingActivityInfo lastFailure

___

### lastHeartbeatTime

• `Optional` **lastHeartbeatTime**: *null* \| [*ITimestamp*](proto.google.protobuf.itimestamp.md)

PendingActivityInfo lastHeartbeatTime

___

### lastStartedTime

• `Optional` **lastStartedTime**: *null* \| [*ITimestamp*](proto.google.protobuf.itimestamp.md)

PendingActivityInfo lastStartedTime

___

### lastWorkerIdentity

• `Optional` **lastWorkerIdentity**: *null* \| *string*

PendingActivityInfo lastWorkerIdentity

___

### maximumAttempts

• `Optional` **maximumAttempts**: *null* \| *number*

PendingActivityInfo maximumAttempts

___

### scheduledTime

• `Optional` **scheduledTime**: *null* \| [*ITimestamp*](proto.google.protobuf.itimestamp.md)

PendingActivityInfo scheduledTime

___

### state

• `Optional` **state**: *null* \| [*PendingActivityState*](../enums/proto.temporal.api.enums.v1.pendingactivitystate.md)

PendingActivityInfo state
