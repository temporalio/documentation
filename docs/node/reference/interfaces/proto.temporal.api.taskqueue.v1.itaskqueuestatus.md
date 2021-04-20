# Interface: ITaskQueueStatus

[taskqueue](../modules/proto.temporal.api.taskqueue.md).[v1](../modules/proto.temporal.api.taskqueue.v1.md).ITaskQueueStatus

Properties of a TaskQueueStatus.

## Implemented by

* [*TaskQueueStatus*](../classes/proto.temporal.api.taskqueue.v1.taskqueuestatus.md)

## Table of contents

### Properties

- [ackLevel](proto.temporal.api.taskqueue.v1.itaskqueuestatus.md#acklevel)
- [backlogCountHint](proto.temporal.api.taskqueue.v1.itaskqueuestatus.md#backlogcounthint)
- [ratePerSecond](proto.temporal.api.taskqueue.v1.itaskqueuestatus.md#ratepersecond)
- [readLevel](proto.temporal.api.taskqueue.v1.itaskqueuestatus.md#readlevel)
- [taskIdBlock](proto.temporal.api.taskqueue.v1.itaskqueuestatus.md#taskidblock)

## Properties

### ackLevel

• `Optional` **ackLevel**: *null* \| Long

TaskQueueStatus ackLevel

___

### backlogCountHint

• `Optional` **backlogCountHint**: *null* \| Long

TaskQueueStatus backlogCountHint

___

### ratePerSecond

• `Optional` **ratePerSecond**: *null* \| *number*

TaskQueueStatus ratePerSecond

___

### readLevel

• `Optional` **readLevel**: *null* \| Long

TaskQueueStatus readLevel

___

### taskIdBlock

• `Optional` **taskIdBlock**: *null* \| [*ITaskIdBlock*](proto.temporal.api.taskqueue.v1.itaskidblock.md)

TaskQueueStatus taskIdBlock
