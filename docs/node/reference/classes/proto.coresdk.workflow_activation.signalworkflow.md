# Class: SignalWorkflow

[coresdk](../modules/proto.coresdk.md).[workflow_activation](../modules/proto.coresdk.workflow_activation.md).SignalWorkflow

Send a signal to a workflow

## Implements

* [*ISignalWorkflow*](../interfaces/proto.coresdk.workflow_activation.isignalworkflow.md)

## Table of contents

### Constructors

- [constructor](proto.coresdk.workflow_activation.signalworkflow.md#constructor)

### Properties

- [identity](proto.coresdk.workflow_activation.signalworkflow.md#identity)
- [input](proto.coresdk.workflow_activation.signalworkflow.md#input)
- [signalName](proto.coresdk.workflow_activation.signalworkflow.md#signalname)

### Methods

- [toJSON](proto.coresdk.workflow_activation.signalworkflow.md#tojson)
- [create](proto.coresdk.workflow_activation.signalworkflow.md#create)
- [decode](proto.coresdk.workflow_activation.signalworkflow.md#decode)
- [decodeDelimited](proto.coresdk.workflow_activation.signalworkflow.md#decodedelimited)
- [encode](proto.coresdk.workflow_activation.signalworkflow.md#encode)
- [encodeDelimited](proto.coresdk.workflow_activation.signalworkflow.md#encodedelimited)
- [fromObject](proto.coresdk.workflow_activation.signalworkflow.md#fromobject)
- [toObject](proto.coresdk.workflow_activation.signalworkflow.md#toobject)
- [verify](proto.coresdk.workflow_activation.signalworkflow.md#verify)

## Constructors

### constructor

\+ **new SignalWorkflow**(`properties?`: [*ISignalWorkflow*](../interfaces/proto.coresdk.workflow_activation.isignalworkflow.md)): [*SignalWorkflow*](proto.coresdk.workflow_activation.signalworkflow.md)

Constructs a new SignalWorkflow.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ISignalWorkflow*](../interfaces/proto.coresdk.workflow_activation.isignalworkflow.md) |

**Returns:** [*SignalWorkflow*](proto.coresdk.workflow_activation.signalworkflow.md)

## Properties

### identity

• **identity**: *string*

SignalWorkflow identity.

Implementation of: [ISignalWorkflow](../interfaces/proto.coresdk.workflow_activation.isignalworkflow.md).[identity](../interfaces/proto.coresdk.workflow_activation.isignalworkflow.md#identity)

___

### input

• **input**: [*IPayload*](../interfaces/proto.coresdk.common.ipayload.md)[]

SignalWorkflow input.

Implementation of: [ISignalWorkflow](../interfaces/proto.coresdk.workflow_activation.isignalworkflow.md).[input](../interfaces/proto.coresdk.workflow_activation.isignalworkflow.md#input)

___

### signalName

• **signalName**: *string*

SignalWorkflow signalName.

Implementation of: [ISignalWorkflow](../interfaces/proto.coresdk.workflow_activation.isignalworkflow.md).[signalName](../interfaces/proto.coresdk.workflow_activation.isignalworkflow.md#signalname)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this SignalWorkflow to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ISignalWorkflow*](../interfaces/proto.coresdk.workflow_activation.isignalworkflow.md)): [*SignalWorkflow*](proto.coresdk.workflow_activation.signalworkflow.md)

Creates a new SignalWorkflow instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ISignalWorkflow*](../interfaces/proto.coresdk.workflow_activation.isignalworkflow.md) |

**Returns:** [*SignalWorkflow*](proto.coresdk.workflow_activation.signalworkflow.md)

SignalWorkflow instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*SignalWorkflow*](proto.coresdk.workflow_activation.signalworkflow.md)

Decodes a SignalWorkflow message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*SignalWorkflow*](proto.coresdk.workflow_activation.signalworkflow.md)

SignalWorkflow

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*SignalWorkflow*](proto.coresdk.workflow_activation.signalworkflow.md)

Decodes a SignalWorkflow message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*SignalWorkflow*](proto.coresdk.workflow_activation.signalworkflow.md)

SignalWorkflow

___

### encode

▸ `Static`**encode**(`message`: [*ISignalWorkflow*](../interfaces/proto.coresdk.workflow_activation.isignalworkflow.md), `writer?`: *Writer*): *Writer*

Encodes the specified SignalWorkflow message. Does not implicitly [verify](proto.coresdk.workflow_activation.signalworkflow.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ISignalWorkflow*](../interfaces/proto.coresdk.workflow_activation.isignalworkflow.md) | SignalWorkflow message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ISignalWorkflow*](../interfaces/proto.coresdk.workflow_activation.isignalworkflow.md), `writer?`: *Writer*): *Writer*

Encodes the specified SignalWorkflow message, length delimited. Does not implicitly [verify](proto.coresdk.workflow_activation.signalworkflow.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ISignalWorkflow*](../interfaces/proto.coresdk.workflow_activation.isignalworkflow.md) | SignalWorkflow message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*SignalWorkflow*](proto.coresdk.workflow_activation.signalworkflow.md)

Creates a SignalWorkflow message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*SignalWorkflow*](proto.coresdk.workflow_activation.signalworkflow.md)

SignalWorkflow

___

### toObject

▸ `Static`**toObject**(`message`: [*SignalWorkflow*](proto.coresdk.workflow_activation.signalworkflow.md), `options?`: IConversionOptions): *object*

Creates a plain object from a SignalWorkflow message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*SignalWorkflow*](proto.coresdk.workflow_activation.signalworkflow.md) | SignalWorkflow   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a SignalWorkflow message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
