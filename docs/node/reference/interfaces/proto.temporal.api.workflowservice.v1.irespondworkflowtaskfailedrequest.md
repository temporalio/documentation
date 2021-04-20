# Interface: IRespondWorkflowTaskFailedRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).IRespondWorkflowTaskFailedRequest

Properties of a RespondWorkflowTaskFailedRequest.

## Implemented by

* [*RespondWorkflowTaskFailedRequest*](../classes/proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedrequest.md)

## Table of contents

### Properties

- [binaryChecksum](proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedrequest.md#binarychecksum)
- [cause](proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedrequest.md#cause)
- [failure](proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedrequest.md#failure)
- [identity](proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedrequest.md#identity)
- [namespace](proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedrequest.md#namespace)
- [taskToken](proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedrequest.md#tasktoken)

## Properties

### binaryChecksum

• `Optional` **binaryChecksum**: *null* \| *string*

RespondWorkflowTaskFailedRequest binaryChecksum

___

### cause

• `Optional` **cause**: *null* \| [*WorkflowTaskFailedCause*](../enums/proto.temporal.api.enums.v1.workflowtaskfailedcause.md)

RespondWorkflowTaskFailedRequest cause

___

### failure

• `Optional` **failure**: *null* \| [*IFailure*](proto.temporal.api.failure.v1.ifailure.md)

RespondWorkflowTaskFailedRequest failure

___

### identity

• `Optional` **identity**: *null* \| *string*

RespondWorkflowTaskFailedRequest identity

___

### namespace

• `Optional` **namespace**: *null* \| *string*

RespondWorkflowTaskFailedRequest namespace

___

### taskToken

• `Optional` **taskToken**: *null* \| *Uint8Array*

RespondWorkflowTaskFailedRequest taskToken
