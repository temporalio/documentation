# Interface: IPollWorkflowTaskQueueResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).IPollWorkflowTaskQueueResponse

Properties of a PollWorkflowTaskQueueResponse.

## Implemented by

* [*PollWorkflowTaskQueueResponse*](../classes/proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md)

## Table of contents

### Properties

- [attempt](proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md#attempt)
- [backlogCountHint](proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md#backlogcounthint)
- [history](proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md#history)
- [nextPageToken](proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md#nextpagetoken)
- [previousStartedEventId](proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md#previousstartedeventid)
- [queries](proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md#queries)
- [query](proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md#query)
- [scheduledTime](proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md#scheduledtime)
- [startedEventId](proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md#startedeventid)
- [startedTime](proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md#startedtime)
- [taskToken](proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md#tasktoken)
- [workflowExecution](proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md#workflowexecution)
- [workflowExecutionTaskQueue](proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md#workflowexecutiontaskqueue)
- [workflowType](proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md#workflowtype)

## Properties

### attempt

• `Optional` **attempt**: *null* \| *number*

PollWorkflowTaskQueueResponse attempt

___

### backlogCountHint

• `Optional` **backlogCountHint**: *null* \| Long

PollWorkflowTaskQueueResponse backlogCountHint

___

### history

• `Optional` **history**: *null* \| [*IHistory*](proto.temporal.api.history.v1.ihistory.md)

PollWorkflowTaskQueueResponse history

___

### nextPageToken

• `Optional` **nextPageToken**: *null* \| *Uint8Array*

PollWorkflowTaskQueueResponse nextPageToken

___

### previousStartedEventId

• `Optional` **previousStartedEventId**: *null* \| Long

PollWorkflowTaskQueueResponse previousStartedEventId

___

### queries

• `Optional` **queries**: *null* \| { [k: string]: [*IWorkflowQuery*](proto.temporal.api.query.v1.iworkflowquery.md);  }

PollWorkflowTaskQueueResponse queries

___

### query

• `Optional` **query**: *null* \| [*IWorkflowQuery*](proto.temporal.api.query.v1.iworkflowquery.md)

PollWorkflowTaskQueueResponse query

___

### scheduledTime

• `Optional` **scheduledTime**: *null* \| [*ITimestamp*](proto.google.protobuf.itimestamp.md)

PollWorkflowTaskQueueResponse scheduledTime

___

### startedEventId

• `Optional` **startedEventId**: *null* \| Long

PollWorkflowTaskQueueResponse startedEventId

___

### startedTime

• `Optional` **startedTime**: *null* \| [*ITimestamp*](proto.google.protobuf.itimestamp.md)

PollWorkflowTaskQueueResponse startedTime

___

### taskToken

• `Optional` **taskToken**: *null* \| *Uint8Array*

PollWorkflowTaskQueueResponse taskToken

___

### workflowExecution

• `Optional` **workflowExecution**: *null* \| [*IWorkflowExecution*](proto.temporal.api.common.v1.iworkflowexecution.md)

PollWorkflowTaskQueueResponse workflowExecution

___

### workflowExecutionTaskQueue

• `Optional` **workflowExecutionTaskQueue**: *null* \| [*ITaskQueue*](proto.temporal.api.taskqueue.v1.itaskqueue.md)

PollWorkflowTaskQueueResponse workflowExecutionTaskQueue

___

### workflowType

• `Optional` **workflowType**: *null* \| [*IWorkflowType*](proto.temporal.api.common.v1.iworkflowtype.md)

PollWorkflowTaskQueueResponse workflowType
