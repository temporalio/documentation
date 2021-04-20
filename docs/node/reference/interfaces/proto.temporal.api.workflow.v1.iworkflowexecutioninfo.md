# Interface: IWorkflowExecutionInfo

[workflow](../modules/proto.temporal.api.workflow.md).[v1](../modules/proto.temporal.api.workflow.v1.md).IWorkflowExecutionInfo

Properties of a WorkflowExecutionInfo.

## Implemented by

* [*WorkflowExecutionInfo*](../classes/proto.temporal.api.workflow.v1.workflowexecutioninfo.md)

## Table of contents

### Properties

- [autoResetPoints](proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md#autoresetpoints)
- [closeTime](proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md#closetime)
- [execution](proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md#execution)
- [executionTime](proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md#executiontime)
- [historyLength](proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md#historylength)
- [memo](proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md#memo)
- [parentExecution](proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md#parentexecution)
- [parentNamespaceId](proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md#parentnamespaceid)
- [searchAttributes](proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md#searchattributes)
- [startTime](proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md#starttime)
- [status](proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md#status)
- [taskQueue](proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md#taskqueue)
- [type](proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md#type)

## Properties

### autoResetPoints

• `Optional` **autoResetPoints**: *null* \| [*IResetPoints*](proto.temporal.api.workflow.v1.iresetpoints.md)

WorkflowExecutionInfo autoResetPoints

___

### closeTime

• `Optional` **closeTime**: *null* \| [*ITimestamp*](proto.google.protobuf.itimestamp.md)

WorkflowExecutionInfo closeTime

___

### execution

• `Optional` **execution**: *null* \| [*IWorkflowExecution*](proto.temporal.api.common.v1.iworkflowexecution.md)

WorkflowExecutionInfo execution

___

### executionTime

• `Optional` **executionTime**: *null* \| [*ITimestamp*](proto.google.protobuf.itimestamp.md)

WorkflowExecutionInfo executionTime

___

### historyLength

• `Optional` **historyLength**: *null* \| Long

WorkflowExecutionInfo historyLength

___

### memo

• `Optional` **memo**: *null* \| [*IMemo*](proto.temporal.api.common.v1.imemo.md)

WorkflowExecutionInfo memo

___

### parentExecution

• `Optional` **parentExecution**: *null* \| [*IWorkflowExecution*](proto.temporal.api.common.v1.iworkflowexecution.md)

WorkflowExecutionInfo parentExecution

___

### parentNamespaceId

• `Optional` **parentNamespaceId**: *null* \| *string*

WorkflowExecutionInfo parentNamespaceId

___

### searchAttributes

• `Optional` **searchAttributes**: *null* \| [*ISearchAttributes*](proto.temporal.api.common.v1.isearchattributes.md)

WorkflowExecutionInfo searchAttributes

___

### startTime

• `Optional` **startTime**: *null* \| [*ITimestamp*](proto.google.protobuf.itimestamp.md)

WorkflowExecutionInfo startTime

___

### status

• `Optional` **status**: *null* \| [*WorkflowExecutionStatus*](../enums/proto.temporal.api.enums.v1.workflowexecutionstatus.md)

WorkflowExecutionInfo status

___

### taskQueue

• `Optional` **taskQueue**: *null* \| *string*

WorkflowExecutionInfo taskQueue

___

### type

• `Optional` **type**: *null* \| [*IWorkflowType*](proto.temporal.api.common.v1.iworkflowtype.md)

WorkflowExecutionInfo type
