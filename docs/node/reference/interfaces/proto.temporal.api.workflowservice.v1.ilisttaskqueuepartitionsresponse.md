# Interface: IListTaskQueuePartitionsResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).IListTaskQueuePartitionsResponse

Properties of a ListTaskQueuePartitionsResponse.

## Implemented by

* [*ListTaskQueuePartitionsResponse*](../classes/proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsresponse.md)

## Table of contents

### Properties

- [activityTaskQueuePartitions](proto.temporal.api.workflowservice.v1.ilisttaskqueuepartitionsresponse.md#activitytaskqueuepartitions)
- [workflowTaskQueuePartitions](proto.temporal.api.workflowservice.v1.ilisttaskqueuepartitionsresponse.md#workflowtaskqueuepartitions)

## Properties

### activityTaskQueuePartitions

• `Optional` **activityTaskQueuePartitions**: *null* \| [*ITaskQueuePartitionMetadata*](proto.temporal.api.taskqueue.v1.itaskqueuepartitionmetadata.md)[]

ListTaskQueuePartitionsResponse activityTaskQueuePartitions

___

### workflowTaskQueuePartitions

• `Optional` **workflowTaskQueuePartitions**: *null* \| [*ITaskQueuePartitionMetadata*](proto.temporal.api.taskqueue.v1.itaskqueuepartitionmetadata.md)[]

ListTaskQueuePartitionsResponse workflowTaskQueuePartitions
