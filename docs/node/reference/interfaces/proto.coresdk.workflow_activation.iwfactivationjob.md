# Interface: IWFActivationJob

[coresdk](../modules/proto.coresdk.md).[workflow_activation](../modules/proto.coresdk.workflow_activation.md).IWFActivationJob

Properties of a WFActivationJob.

## Implemented by

* [*WFActivationJob*](../classes/proto.coresdk.workflow_activation.wfactivationjob.md)

## Table of contents

### Properties

- [cancelWorkflow](proto.coresdk.workflow_activation.iwfactivationjob.md#cancelworkflow)
- [fireTimer](proto.coresdk.workflow_activation.iwfactivationjob.md#firetimer)
- [queryWorkflow](proto.coresdk.workflow_activation.iwfactivationjob.md#queryworkflow)
- [resolveActivity](proto.coresdk.workflow_activation.iwfactivationjob.md#resolveactivity)
- [signalWorkflow](proto.coresdk.workflow_activation.iwfactivationjob.md#signalworkflow)
- [startWorkflow](proto.coresdk.workflow_activation.iwfactivationjob.md#startworkflow)
- [updateRandomSeed](proto.coresdk.workflow_activation.iwfactivationjob.md#updaterandomseed)

## Properties

### cancelWorkflow

• `Optional` **cancelWorkflow**: *null* \| [*ICancelWorkflow*](proto.coresdk.workflow_activation.icancelworkflow.md)

A request to cancel the workflow was received.

___

### fireTimer

• `Optional` **fireTimer**: *null* \| [*IFireTimer*](proto.coresdk.workflow_activation.ifiretimer.md)

A timer has fired, allowing whatever was waiting on it (if anything) to proceed

___

### queryWorkflow

• `Optional` **queryWorkflow**: *null* \| [*IQueryWorkflow*](proto.coresdk.workflow_activation.iqueryworkflow.md)

A request to query the workflow was received.

___

### resolveActivity

• `Optional` **resolveActivity**: *null* \| [*IResolveActivity*](proto.coresdk.workflow_activation.iresolveactivity.md)

An activity was resolved with, result could be completed, failed or cancelled

___

### signalWorkflow

• `Optional` **signalWorkflow**: *null* \| [*ISignalWorkflow*](proto.coresdk.workflow_activation.isignalworkflow.md)

A request to signal the workflow was received.

___

### startWorkflow

• `Optional` **startWorkflow**: *null* \| [*IStartWorkflow*](proto.coresdk.workflow_activation.istartworkflow.md)

Begin a workflow for the first time

___

### updateRandomSeed

• `Optional` **updateRandomSeed**: *null* \| [*IUpdateRandomSeed*](proto.coresdk.workflow_activation.iupdaterandomseed.md)

Workflow was reset. The randomness seed must be updated.
