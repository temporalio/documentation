# Interface: IStartWorkflow

[coresdk](../modules/proto.coresdk.md).[workflow_activation](../modules/proto.coresdk.workflow_activation.md).IStartWorkflow

Properties of a StartWorkflow.

## Implemented by

* [*StartWorkflow*](../classes/proto.coresdk.workflow_activation.startworkflow.md)

## Table of contents

### Properties

- [arguments](proto.coresdk.workflow_activation.istartworkflow.md#arguments)
- [randomnessSeed](proto.coresdk.workflow_activation.istartworkflow.md#randomnessseed)
- [workflowId](proto.coresdk.workflow_activation.istartworkflow.md#workflowid)
- [workflowType](proto.coresdk.workflow_activation.istartworkflow.md#workflowtype)

## Properties

### arguments

• `Optional` **arguments**: *null* \| [*IPayload*](proto.coresdk.common.ipayload.md)[]

Inputs to the workflow code

___

### randomnessSeed

• `Optional` **randomnessSeed**: *null* \| Long

RandomSeedUpdatedAttributes are used to deliver seed updates.

___

### workflowId

• `Optional` **workflowId**: *null* \| *string*

The workflow id used on the temporal server

___

### workflowType

• `Optional` **workflowType**: *null* \| *string*

The identifier the lang-specific sdk uses to execute workflow code
