# Interface: IListOpenWorkflowExecutionsRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).IListOpenWorkflowExecutionsRequest

Properties of a ListOpenWorkflowExecutionsRequest.

## Implemented by

* [*ListOpenWorkflowExecutionsRequest*](../classes/proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsrequest.md)

## Table of contents

### Properties

- [executionFilter](proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsrequest.md#executionfilter)
- [maximumPageSize](proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsrequest.md#maximumpagesize)
- [namespace](proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsrequest.md#namespace)
- [nextPageToken](proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsrequest.md#nextpagetoken)
- [startTimeFilter](proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsrequest.md#starttimefilter)
- [typeFilter](proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsrequest.md#typefilter)

## Properties

### executionFilter

• `Optional` **executionFilter**: *null* \| [*IWorkflowExecutionFilter*](proto.temporal.api.filter.v1.iworkflowexecutionfilter.md)

ListOpenWorkflowExecutionsRequest executionFilter

___

### maximumPageSize

• `Optional` **maximumPageSize**: *null* \| *number*

ListOpenWorkflowExecutionsRequest maximumPageSize

___

### namespace

• `Optional` **namespace**: *null* \| *string*

ListOpenWorkflowExecutionsRequest namespace

___

### nextPageToken

• `Optional` **nextPageToken**: *null* \| *Uint8Array*

ListOpenWorkflowExecutionsRequest nextPageToken

___

### startTimeFilter

• `Optional` **startTimeFilter**: *null* \| [*IStartTimeFilter*](proto.temporal.api.filter.v1.istarttimefilter.md)

ListOpenWorkflowExecutionsRequest startTimeFilter

___

### typeFilter

• `Optional` **typeFilter**: *null* \| [*IWorkflowTypeFilter*](proto.temporal.api.filter.v1.iworkflowtypefilter.md)

ListOpenWorkflowExecutionsRequest typeFilter
