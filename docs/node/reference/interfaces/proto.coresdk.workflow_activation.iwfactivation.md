# Interface: IWFActivation

[coresdk](../modules/proto.coresdk.md).[workflow_activation](../modules/proto.coresdk.workflow_activation.md).IWFActivation

Properties of a WFActivation.

## Implemented by

* [*WFActivation*](../classes/proto.coresdk.workflow_activation.wfactivation.md)

## Table of contents

### Properties

- [jobs](proto.coresdk.workflow_activation.iwfactivation.md#jobs)
- [runId](proto.coresdk.workflow_activation.iwfactivation.md#runid)
- [taskToken](proto.coresdk.workflow_activation.iwfactivation.md#tasktoken)
- [timestamp](proto.coresdk.workflow_activation.iwfactivation.md#timestamp)

## Properties

### jobs

• `Optional` **jobs**: *null* \| [*IWFActivationJob*](proto.coresdk.workflow_activation.iwfactivationjob.md)[]

The things to do upon activating the workflow

___

### runId

• `Optional` **runId**: *null* \| *string*

The id of the currently active run of the workflow

___

### taskToken

• `Optional` **taskToken**: *null* \| *Uint8Array*

WFActivation taskToken

___

### timestamp

• `Optional` **timestamp**: *null* \| [*ITimestamp*](proto.google.protobuf.itimestamp.md)

The current time as understood by the workflow, which is set by workflow task started events
