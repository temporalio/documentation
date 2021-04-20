# Interface: IRespondWorkflowTaskCompletedRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).IRespondWorkflowTaskCompletedRequest

Properties of a RespondWorkflowTaskCompletedRequest.

## Implemented by

* [*RespondWorkflowTaskCompletedRequest*](../classes/proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedrequest.md)

## Table of contents

### Properties

- [binaryChecksum](proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md#binarychecksum)
- [commands](proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md#commands)
- [forceCreateNewWorkflowTask](proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md#forcecreatenewworkflowtask)
- [identity](proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md#identity)
- [namespace](proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md#namespace)
- [queryResults](proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md#queryresults)
- [returnNewWorkflowTask](proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md#returnnewworkflowtask)
- [stickyAttributes](proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md#stickyattributes)
- [taskToken](proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md#tasktoken)

## Properties

### binaryChecksum

• `Optional` **binaryChecksum**: *null* \| *string*

RespondWorkflowTaskCompletedRequest binaryChecksum

___

### commands

• `Optional` **commands**: *null* \| [*ICommand*](proto.temporal.api.command.v1.icommand.md)[]

RespondWorkflowTaskCompletedRequest commands

___

### forceCreateNewWorkflowTask

• `Optional` **forceCreateNewWorkflowTask**: *null* \| *boolean*

RespondWorkflowTaskCompletedRequest forceCreateNewWorkflowTask

___

### identity

• `Optional` **identity**: *null* \| *string*

RespondWorkflowTaskCompletedRequest identity

___

### namespace

• `Optional` **namespace**: *null* \| *string*

RespondWorkflowTaskCompletedRequest namespace

___

### queryResults

• `Optional` **queryResults**: *null* \| { [k: string]: [*IWorkflowQueryResult*](proto.temporal.api.query.v1.iworkflowqueryresult.md);  }

RespondWorkflowTaskCompletedRequest queryResults

___

### returnNewWorkflowTask

• `Optional` **returnNewWorkflowTask**: *null* \| *boolean*

RespondWorkflowTaskCompletedRequest returnNewWorkflowTask

___

### stickyAttributes

• `Optional` **stickyAttributes**: *null* \| [*IStickyExecutionAttributes*](proto.temporal.api.taskqueue.v1.istickyexecutionattributes.md)

RespondWorkflowTaskCompletedRequest stickyAttributes

___

### taskToken

• `Optional` **taskToken**: *null* \| *Uint8Array*

RespondWorkflowTaskCompletedRequest taskToken
