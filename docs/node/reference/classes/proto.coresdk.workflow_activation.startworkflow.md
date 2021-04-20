# Class: StartWorkflow

[coresdk](../modules/proto.coresdk.md).[workflow_activation](../modules/proto.coresdk.workflow_activation.md).StartWorkflow

Start a new workflow

## Implements

* [*IStartWorkflow*](../interfaces/proto.coresdk.workflow_activation.istartworkflow.md)

## Table of contents

### Constructors

- [constructor](proto.coresdk.workflow_activation.startworkflow.md#constructor)

### Properties

- [arguments](proto.coresdk.workflow_activation.startworkflow.md#arguments)
- [randomnessSeed](proto.coresdk.workflow_activation.startworkflow.md#randomnessseed)
- [workflowId](proto.coresdk.workflow_activation.startworkflow.md#workflowid)
- [workflowType](proto.coresdk.workflow_activation.startworkflow.md#workflowtype)

### Methods

- [toJSON](proto.coresdk.workflow_activation.startworkflow.md#tojson)
- [create](proto.coresdk.workflow_activation.startworkflow.md#create)
- [decode](proto.coresdk.workflow_activation.startworkflow.md#decode)
- [decodeDelimited](proto.coresdk.workflow_activation.startworkflow.md#decodedelimited)
- [encode](proto.coresdk.workflow_activation.startworkflow.md#encode)
- [encodeDelimited](proto.coresdk.workflow_activation.startworkflow.md#encodedelimited)
- [fromObject](proto.coresdk.workflow_activation.startworkflow.md#fromobject)
- [toObject](proto.coresdk.workflow_activation.startworkflow.md#toobject)
- [verify](proto.coresdk.workflow_activation.startworkflow.md#verify)

## Constructors

### constructor

\+ **new StartWorkflow**(`properties?`: [*IStartWorkflow*](../interfaces/proto.coresdk.workflow_activation.istartworkflow.md)): [*StartWorkflow*](proto.coresdk.workflow_activation.startworkflow.md)

Constructs a new StartWorkflow.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IStartWorkflow*](../interfaces/proto.coresdk.workflow_activation.istartworkflow.md) |

**Returns:** [*StartWorkflow*](proto.coresdk.workflow_activation.startworkflow.md)

## Properties

### arguments

• **arguments**: [*IPayload*](../interfaces/proto.coresdk.common.ipayload.md)[]

Inputs to the workflow code

Implementation of: [IStartWorkflow](../interfaces/proto.coresdk.workflow_activation.istartworkflow.md).[arguments](../interfaces/proto.coresdk.workflow_activation.istartworkflow.md#arguments)

___

### randomnessSeed

• **randomnessSeed**: Long

RandomSeedUpdatedAttributes are used to deliver seed updates.

Implementation of: [IStartWorkflow](../interfaces/proto.coresdk.workflow_activation.istartworkflow.md).[randomnessSeed](../interfaces/proto.coresdk.workflow_activation.istartworkflow.md#randomnessseed)

___

### workflowId

• **workflowId**: *string*

The workflow id used on the temporal server

Implementation of: [IStartWorkflow](../interfaces/proto.coresdk.workflow_activation.istartworkflow.md).[workflowId](../interfaces/proto.coresdk.workflow_activation.istartworkflow.md#workflowid)

___

### workflowType

• **workflowType**: *string*

The identifier the lang-specific sdk uses to execute workflow code

Implementation of: [IStartWorkflow](../interfaces/proto.coresdk.workflow_activation.istartworkflow.md).[workflowType](../interfaces/proto.coresdk.workflow_activation.istartworkflow.md#workflowtype)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this StartWorkflow to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IStartWorkflow*](../interfaces/proto.coresdk.workflow_activation.istartworkflow.md)): [*StartWorkflow*](proto.coresdk.workflow_activation.startworkflow.md)

Creates a new StartWorkflow instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IStartWorkflow*](../interfaces/proto.coresdk.workflow_activation.istartworkflow.md) |

**Returns:** [*StartWorkflow*](proto.coresdk.workflow_activation.startworkflow.md)

StartWorkflow instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*StartWorkflow*](proto.coresdk.workflow_activation.startworkflow.md)

Decodes a StartWorkflow message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*StartWorkflow*](proto.coresdk.workflow_activation.startworkflow.md)

StartWorkflow

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*StartWorkflow*](proto.coresdk.workflow_activation.startworkflow.md)

Decodes a StartWorkflow message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*StartWorkflow*](proto.coresdk.workflow_activation.startworkflow.md)

StartWorkflow

___

### encode

▸ `Static`**encode**(`message`: [*IStartWorkflow*](../interfaces/proto.coresdk.workflow_activation.istartworkflow.md), `writer?`: *Writer*): *Writer*

Encodes the specified StartWorkflow message. Does not implicitly [verify](proto.coresdk.workflow_activation.startworkflow.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IStartWorkflow*](../interfaces/proto.coresdk.workflow_activation.istartworkflow.md) | StartWorkflow message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IStartWorkflow*](../interfaces/proto.coresdk.workflow_activation.istartworkflow.md), `writer?`: *Writer*): *Writer*

Encodes the specified StartWorkflow message, length delimited. Does not implicitly [verify](proto.coresdk.workflow_activation.startworkflow.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IStartWorkflow*](../interfaces/proto.coresdk.workflow_activation.istartworkflow.md) | StartWorkflow message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*StartWorkflow*](proto.coresdk.workflow_activation.startworkflow.md)

Creates a StartWorkflow message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*StartWorkflow*](proto.coresdk.workflow_activation.startworkflow.md)

StartWorkflow

___

### toObject

▸ `Static`**toObject**(`message`: [*StartWorkflow*](proto.coresdk.workflow_activation.startworkflow.md), `options?`: IConversionOptions): *object*

Creates a plain object from a StartWorkflow message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*StartWorkflow*](proto.coresdk.workflow_activation.startworkflow.md) | StartWorkflow   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a StartWorkflow message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
