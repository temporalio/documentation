# Interface: IListClosedWorkflowExecutionsRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).IListClosedWorkflowExecutionsRequest

Properties of a ListClosedWorkflowExecutionsRequest.

## Implemented by

* [*ListClosedWorkflowExecutionsRequest*](../classes/proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsrequest.md)

## Table of contents

### Properties

- [executionFilter](proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsrequest.md#executionfilter)
- [maximumPageSize](proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsrequest.md#maximumpagesize)
- [namespace](proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsrequest.md#namespace)
- [nextPageToken](proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsrequest.md#nextpagetoken)
- [startTimeFilter](proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsrequest.md#starttimefilter)
- [statusFilter](proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsrequest.md#statusfilter)
- [typeFilter](proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsrequest.md#typefilter)

## Properties

### executionFilter

• `Optional` **executionFilter**: *null* \| [*IWorkflowExecutionFilter*](proto.temporal.api.filter.v1.iworkflowexecutionfilter.md)

ListClosedWorkflowExecutionsRequest executionFilter

___

### maximumPageSize

• `Optional` **maximumPageSize**: *null* \| *number*

ListClosedWorkflowExecutionsRequest maximumPageSize

___

### namespace

• `Optional` **namespace**: *null* \| *string*

ListClosedWorkflowExecutionsRequest namespace

___

### nextPageToken

• `Optional` **nextPageToken**: *null* \| *Uint8Array*

ListClosedWorkflowExecutionsRequest nextPageToken

___

### startTimeFilter

• `Optional` **startTimeFilter**: *null* \| [*IStartTimeFilter*](proto.temporal.api.filter.v1.istarttimefilter.md)

ListClosedWorkflowExecutionsRequest startTimeFilter

___

### statusFilter

• `Optional` **statusFilter**: *null* \| [*IStatusFilter*](proto.temporal.api.filter.v1.istatusfilter.md)

ListClosedWorkflowExecutionsRequest statusFilter

___

### typeFilter

• `Optional` **typeFilter**: *null* \| [*IWorkflowTypeFilter*](proto.temporal.api.filter.v1.iworkflowtypefilter.md)

ListClosedWorkflowExecutionsRequest typeFilter
