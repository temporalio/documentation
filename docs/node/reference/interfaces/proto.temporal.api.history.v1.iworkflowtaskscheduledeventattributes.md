# Interface: IWorkflowTaskScheduledEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).IWorkflowTaskScheduledEventAttributes

Properties of a WorkflowTaskScheduledEventAttributes.

## Implemented by

* [*WorkflowTaskScheduledEventAttributes*](../classes/proto.temporal.api.history.v1.workflowtaskscheduledeventattributes.md)

## Table of contents

### Properties

- [attempt](proto.temporal.api.history.v1.iworkflowtaskscheduledeventattributes.md#attempt)
- [startToCloseTimeout](proto.temporal.api.history.v1.iworkflowtaskscheduledeventattributes.md#starttoclosetimeout)
- [taskQueue](proto.temporal.api.history.v1.iworkflowtaskscheduledeventattributes.md#taskqueue)

## Properties

### attempt

• `Optional` **attempt**: *null* \| *number*

WorkflowTaskScheduledEventAttributes attempt

___

### startToCloseTimeout

• `Optional` **startToCloseTimeout**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

WorkflowTaskScheduledEventAttributes startToCloseTimeout

___

### taskQueue

• `Optional` **taskQueue**: *null* \| [*ITaskQueue*](proto.temporal.api.taskqueue.v1.itaskqueue.md)

WorkflowTaskScheduledEventAttributes taskQueue
