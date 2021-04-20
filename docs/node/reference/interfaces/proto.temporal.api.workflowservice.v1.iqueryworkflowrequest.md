# Interface: IQueryWorkflowRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).IQueryWorkflowRequest

Properties of a QueryWorkflowRequest.

## Implemented by

* [*QueryWorkflowRequest*](../classes/proto.temporal.api.workflowservice.v1.queryworkflowrequest.md)

## Table of contents

### Properties

- [execution](proto.temporal.api.workflowservice.v1.iqueryworkflowrequest.md#execution)
- [namespace](proto.temporal.api.workflowservice.v1.iqueryworkflowrequest.md#namespace)
- [query](proto.temporal.api.workflowservice.v1.iqueryworkflowrequest.md#query)
- [queryRejectCondition](proto.temporal.api.workflowservice.v1.iqueryworkflowrequest.md#queryrejectcondition)

## Properties

### execution

• `Optional` **execution**: *null* \| [*IWorkflowExecution*](proto.temporal.api.common.v1.iworkflowexecution.md)

QueryWorkflowRequest execution

___

### namespace

• `Optional` **namespace**: *null* \| *string*

QueryWorkflowRequest namespace

___

### query

• `Optional` **query**: *null* \| [*IWorkflowQuery*](proto.temporal.api.query.v1.iworkflowquery.md)

QueryWorkflowRequest query

___

### queryRejectCondition

• `Optional` **queryRejectCondition**: *null* \| [*QueryRejectCondition*](../enums/proto.temporal.api.enums.v1.queryrejectcondition.md)

QueryWorkflowRequest queryRejectCondition
