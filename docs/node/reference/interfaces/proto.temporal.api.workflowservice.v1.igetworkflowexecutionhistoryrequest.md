# Interface: IGetWorkflowExecutionHistoryRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).IGetWorkflowExecutionHistoryRequest

Properties of a GetWorkflowExecutionHistoryRequest.

## Implemented by

* [*GetWorkflowExecutionHistoryRequest*](../classes/proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryrequest.md)

## Table of contents

### Properties

- [execution](proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryrequest.md#execution)
- [historyEventFilterType](proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryrequest.md#historyeventfiltertype)
- [maximumPageSize](proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryrequest.md#maximumpagesize)
- [namespace](proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryrequest.md#namespace)
- [nextPageToken](proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryrequest.md#nextpagetoken)
- [skipArchival](proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryrequest.md#skiparchival)
- [waitNewEvent](proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryrequest.md#waitnewevent)

## Properties

### execution

• `Optional` **execution**: *null* \| [*IWorkflowExecution*](proto.temporal.api.common.v1.iworkflowexecution.md)

GetWorkflowExecutionHistoryRequest execution

___

### historyEventFilterType

• `Optional` **historyEventFilterType**: *null* \| [*HistoryEventFilterType*](../enums/proto.temporal.api.enums.v1.historyeventfiltertype.md)

GetWorkflowExecutionHistoryRequest historyEventFilterType

___

### maximumPageSize

• `Optional` **maximumPageSize**: *null* \| *number*

GetWorkflowExecutionHistoryRequest maximumPageSize

___

### namespace

• `Optional` **namespace**: *null* \| *string*

GetWorkflowExecutionHistoryRequest namespace

___

### nextPageToken

• `Optional` **nextPageToken**: *null* \| *Uint8Array*

GetWorkflowExecutionHistoryRequest nextPageToken

___

### skipArchival

• `Optional` **skipArchival**: *null* \| *boolean*

GetWorkflowExecutionHistoryRequest skipArchival

___

### waitNewEvent

• `Optional` **waitNewEvent**: *null* \| *boolean*

GetWorkflowExecutionHistoryRequest waitNewEvent
