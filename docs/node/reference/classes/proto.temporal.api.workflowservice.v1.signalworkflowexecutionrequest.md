# Class: SignalWorkflowExecutionRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).SignalWorkflowExecutionRequest

Represents a SignalWorkflowExecutionRequest.

## Implements

* [*ISignalWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionrequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.signalworkflowexecutionrequest.md#constructor)

### Properties

- [control](proto.temporal.api.workflowservice.v1.signalworkflowexecutionrequest.md#control)
- [identity](proto.temporal.api.workflowservice.v1.signalworkflowexecutionrequest.md#identity)
- [input](proto.temporal.api.workflowservice.v1.signalworkflowexecutionrequest.md#input)
- [namespace](proto.temporal.api.workflowservice.v1.signalworkflowexecutionrequest.md#namespace)
- [requestId](proto.temporal.api.workflowservice.v1.signalworkflowexecutionrequest.md#requestid)
- [signalName](proto.temporal.api.workflowservice.v1.signalworkflowexecutionrequest.md#signalname)
- [workflowExecution](proto.temporal.api.workflowservice.v1.signalworkflowexecutionrequest.md#workflowexecution)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.signalworkflowexecutionrequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.signalworkflowexecutionrequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.signalworkflowexecutionrequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.signalworkflowexecutionrequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.signalworkflowexecutionrequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.signalworkflowexecutionrequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.signalworkflowexecutionrequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.signalworkflowexecutionrequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.signalworkflowexecutionrequest.md#verify)

## Constructors

### constructor

\+ **new SignalWorkflowExecutionRequest**(`properties?`: [*ISignalWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionrequest.md)): [*SignalWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.signalworkflowexecutionrequest.md)

Constructs a new SignalWorkflowExecutionRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ISignalWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionrequest.md) |

**Returns:** [*SignalWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.signalworkflowexecutionrequest.md)

## Properties

### control

• **control**: *string*

SignalWorkflowExecutionRequest control.

Implementation of: [ISignalWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionrequest.md).[control](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionrequest.md#control)

___

### identity

• **identity**: *string*

SignalWorkflowExecutionRequest identity.

Implementation of: [ISignalWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionrequest.md).[identity](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionrequest.md#identity)

___

### input

• `Optional` **input**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

SignalWorkflowExecutionRequest input.

Implementation of: [ISignalWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionrequest.md).[input](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionrequest.md#input)

___

### namespace

• **namespace**: *string*

SignalWorkflowExecutionRequest namespace.

Implementation of: [ISignalWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionrequest.md).[namespace](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionrequest.md#namespace)

___

### requestId

• **requestId**: *string*

SignalWorkflowExecutionRequest requestId.

Implementation of: [ISignalWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionrequest.md).[requestId](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionrequest.md#requestid)

___

### signalName

• **signalName**: *string*

SignalWorkflowExecutionRequest signalName.

Implementation of: [ISignalWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionrequest.md).[signalName](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionrequest.md#signalname)

___

### workflowExecution

• `Optional` **workflowExecution**: *null* \| [*IWorkflowExecution*](../interfaces/proto.temporal.api.common.v1.iworkflowexecution.md)

SignalWorkflowExecutionRequest workflowExecution.

Implementation of: [ISignalWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionrequest.md).[workflowExecution](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionrequest.md#workflowexecution)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this SignalWorkflowExecutionRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ISignalWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionrequest.md)): [*SignalWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.signalworkflowexecutionrequest.md)

Creates a new SignalWorkflowExecutionRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ISignalWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionrequest.md) |

**Returns:** [*SignalWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.signalworkflowexecutionrequest.md)

SignalWorkflowExecutionRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*SignalWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.signalworkflowexecutionrequest.md)

Decodes a SignalWorkflowExecutionRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*SignalWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.signalworkflowexecutionrequest.md)

SignalWorkflowExecutionRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*SignalWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.signalworkflowexecutionrequest.md)

Decodes a SignalWorkflowExecutionRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*SignalWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.signalworkflowexecutionrequest.md)

SignalWorkflowExecutionRequest

___

### encode

▸ `Static`**encode**(`message`: [*ISignalWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified SignalWorkflowExecutionRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.signalworkflowexecutionrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ISignalWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionrequest.md) | SignalWorkflowExecutionRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ISignalWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified SignalWorkflowExecutionRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.signalworkflowexecutionrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ISignalWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionrequest.md) | SignalWorkflowExecutionRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*SignalWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.signalworkflowexecutionrequest.md)

Creates a SignalWorkflowExecutionRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*SignalWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.signalworkflowexecutionrequest.md)

SignalWorkflowExecutionRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*SignalWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.signalworkflowexecutionrequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a SignalWorkflowExecutionRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*SignalWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.signalworkflowexecutionrequest.md) | SignalWorkflowExecutionRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a SignalWorkflowExecutionRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
