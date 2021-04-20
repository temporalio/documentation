# Interface: IDescribeWorkflowExecutionResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).IDescribeWorkflowExecutionResponse

Properties of a DescribeWorkflowExecutionResponse.

## Implemented by

* [*DescribeWorkflowExecutionResponse*](../classes/proto.temporal.api.workflowservice.v1.describeworkflowexecutionresponse.md)

## Table of contents

### Properties

- [executionConfig](proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionresponse.md#executionconfig)
- [pendingActivities](proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionresponse.md#pendingactivities)
- [pendingChildren](proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionresponse.md#pendingchildren)
- [workflowExecutionInfo](proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionresponse.md#workflowexecutioninfo)

## Properties

### executionConfig

• `Optional` **executionConfig**: *null* \| [*IWorkflowExecutionConfig*](proto.temporal.api.workflow.v1.iworkflowexecutionconfig.md)

DescribeWorkflowExecutionResponse executionConfig

___

### pendingActivities

• `Optional` **pendingActivities**: *null* \| [*IPendingActivityInfo*](proto.temporal.api.workflow.v1.ipendingactivityinfo.md)[]

DescribeWorkflowExecutionResponse pendingActivities

___

### pendingChildren

• `Optional` **pendingChildren**: *null* \| [*IPendingChildExecutionInfo*](proto.temporal.api.workflow.v1.ipendingchildexecutioninfo.md)[]

DescribeWorkflowExecutionResponse pendingChildren

___

### workflowExecutionInfo

• `Optional` **workflowExecutionInfo**: *null* \| [*IWorkflowExecutionInfo*](proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md)

DescribeWorkflowExecutionResponse workflowExecutionInfo
