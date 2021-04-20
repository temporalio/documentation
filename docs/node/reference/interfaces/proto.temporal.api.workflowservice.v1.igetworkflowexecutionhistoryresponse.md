# Interface: IGetWorkflowExecutionHistoryResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).IGetWorkflowExecutionHistoryResponse

Properties of a GetWorkflowExecutionHistoryResponse.

## Implemented by

* [*GetWorkflowExecutionHistoryResponse*](../classes/proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryresponse.md)

## Table of contents

### Properties

- [archived](proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryresponse.md#archived)
- [history](proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryresponse.md#history)
- [nextPageToken](proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryresponse.md#nextpagetoken)
- [rawHistory](proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryresponse.md#rawhistory)

## Properties

### archived

• `Optional` **archived**: *null* \| *boolean*

GetWorkflowExecutionHistoryResponse archived

___

### history

• `Optional` **history**: *null* \| [*IHistory*](proto.temporal.api.history.v1.ihistory.md)

GetWorkflowExecutionHistoryResponse history

___

### nextPageToken

• `Optional` **nextPageToken**: *null* \| *Uint8Array*

GetWorkflowExecutionHistoryResponse nextPageToken

___

### rawHistory

• `Optional` **rawHistory**: *null* \| [*IDataBlob*](proto.temporal.api.common.v1.idatablob.md)[]

GetWorkflowExecutionHistoryResponse rawHistory
