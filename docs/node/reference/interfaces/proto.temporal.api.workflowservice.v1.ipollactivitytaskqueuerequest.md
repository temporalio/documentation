# Interface: IPollActivityTaskQueueRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).IPollActivityTaskQueueRequest

Properties of a PollActivityTaskQueueRequest.

## Implemented by

* [*PollActivityTaskQueueRequest*](../classes/proto.temporal.api.workflowservice.v1.pollactivitytaskqueuerequest.md)

## Table of contents

### Properties

- [identity](proto.temporal.api.workflowservice.v1.ipollactivitytaskqueuerequest.md#identity)
- [namespace](proto.temporal.api.workflowservice.v1.ipollactivitytaskqueuerequest.md#namespace)
- [taskQueue](proto.temporal.api.workflowservice.v1.ipollactivitytaskqueuerequest.md#taskqueue)
- [taskQueueMetadata](proto.temporal.api.workflowservice.v1.ipollactivitytaskqueuerequest.md#taskqueuemetadata)

## Properties

### identity

• `Optional` **identity**: *null* \| *string*

PollActivityTaskQueueRequest identity

___

### namespace

• `Optional` **namespace**: *null* \| *string*

PollActivityTaskQueueRequest namespace

___

### taskQueue

• `Optional` **taskQueue**: *null* \| [*ITaskQueue*](proto.temporal.api.taskqueue.v1.itaskqueue.md)

PollActivityTaskQueueRequest taskQueue

___

### taskQueueMetadata

• `Optional` **taskQueueMetadata**: *null* \| [*ITaskQueueMetadata*](proto.temporal.api.taskqueue.v1.itaskqueuemetadata.md)

PollActivityTaskQueueRequest taskQueueMetadata
