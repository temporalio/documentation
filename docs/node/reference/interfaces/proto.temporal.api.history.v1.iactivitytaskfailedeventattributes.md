# Interface: IActivityTaskFailedEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).IActivityTaskFailedEventAttributes

Properties of an ActivityTaskFailedEventAttributes.

## Implemented by

* [*ActivityTaskFailedEventAttributes*](../classes/proto.temporal.api.history.v1.activitytaskfailedeventattributes.md)

## Table of contents

### Properties

- [failure](proto.temporal.api.history.v1.iactivitytaskfailedeventattributes.md#failure)
- [identity](proto.temporal.api.history.v1.iactivitytaskfailedeventattributes.md#identity)
- [retryState](proto.temporal.api.history.v1.iactivitytaskfailedeventattributes.md#retrystate)
- [scheduledEventId](proto.temporal.api.history.v1.iactivitytaskfailedeventattributes.md#scheduledeventid)
- [startedEventId](proto.temporal.api.history.v1.iactivitytaskfailedeventattributes.md#startedeventid)

## Properties

### failure

• `Optional` **failure**: *null* \| [*IFailure*](proto.temporal.api.failure.v1.ifailure.md)

ActivityTaskFailedEventAttributes failure

___

### identity

• `Optional` **identity**: *null* \| *string*

ActivityTaskFailedEventAttributes identity

___

### retryState

• `Optional` **retryState**: *null* \| [*RetryState*](../enums/proto.temporal.api.enums.v1.retrystate.md)

ActivityTaskFailedEventAttributes retryState

___

### scheduledEventId

• `Optional` **scheduledEventId**: *null* \| Long

ActivityTaskFailedEventAttributes scheduledEventId

___

### startedEventId

• `Optional` **startedEventId**: *null* \| Long

ActivityTaskFailedEventAttributes startedEventId
