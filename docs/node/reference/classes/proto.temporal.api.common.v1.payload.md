# Class: Payload

[common](../modules/proto.temporal.api.common.md).[v1](../modules/proto.temporal.api.common.v1.md).Payload

Represents a Payload.

## Implements

* [*IPayload*](../interfaces/proto.temporal.api.common.v1.ipayload.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.common.v1.payload.md#constructor)

### Properties

- [data](proto.temporal.api.common.v1.payload.md#data)
- [metadata](proto.temporal.api.common.v1.payload.md#metadata)

### Methods

- [toJSON](proto.temporal.api.common.v1.payload.md#tojson)
- [create](proto.temporal.api.common.v1.payload.md#create)
- [decode](proto.temporal.api.common.v1.payload.md#decode)
- [decodeDelimited](proto.temporal.api.common.v1.payload.md#decodedelimited)
- [encode](proto.temporal.api.common.v1.payload.md#encode)
- [encodeDelimited](proto.temporal.api.common.v1.payload.md#encodedelimited)
- [fromObject](proto.temporal.api.common.v1.payload.md#fromobject)
- [toObject](proto.temporal.api.common.v1.payload.md#toobject)
- [verify](proto.temporal.api.common.v1.payload.md#verify)

## Constructors

### constructor

\+ **new Payload**(`properties?`: [*IPayload*](../interfaces/proto.temporal.api.common.v1.ipayload.md)): [*Payload*](proto.temporal.api.common.v1.payload.md)

Constructs a new Payload.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IPayload*](../interfaces/proto.temporal.api.common.v1.ipayload.md) |

**Returns:** [*Payload*](proto.temporal.api.common.v1.payload.md)

## Properties

### data

• **data**: *Uint8Array*

Payload data.

Implementation of: [IPayload](../interfaces/proto.temporal.api.common.v1.ipayload.md).[data](../interfaces/proto.temporal.api.common.v1.ipayload.md#data)

___

### metadata

• **metadata**: *object*

Payload metadata.

#### Type declaration:

Implementation of: [IPayload](../interfaces/proto.temporal.api.common.v1.ipayload.md).[metadata](../interfaces/proto.temporal.api.common.v1.ipayload.md#metadata)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this Payload to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IPayload*](../interfaces/proto.temporal.api.common.v1.ipayload.md)): [*Payload*](proto.temporal.api.common.v1.payload.md)

Creates a new Payload instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IPayload*](../interfaces/proto.temporal.api.common.v1.ipayload.md) |

**Returns:** [*Payload*](proto.temporal.api.common.v1.payload.md)

Payload instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*Payload*](proto.temporal.api.common.v1.payload.md)

Decodes a Payload message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*Payload*](proto.temporal.api.common.v1.payload.md)

Payload

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*Payload*](proto.temporal.api.common.v1.payload.md)

Decodes a Payload message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*Payload*](proto.temporal.api.common.v1.payload.md)

Payload

___

### encode

▸ `Static`**encode**(`message`: [*IPayload*](../interfaces/proto.temporal.api.common.v1.ipayload.md), `writer?`: *Writer*): *Writer*

Encodes the specified Payload message. Does not implicitly [verify](proto.temporal.api.common.v1.payload.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IPayload*](../interfaces/proto.temporal.api.common.v1.ipayload.md) | Payload message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IPayload*](../interfaces/proto.temporal.api.common.v1.ipayload.md), `writer?`: *Writer*): *Writer*

Encodes the specified Payload message, length delimited. Does not implicitly [verify](proto.temporal.api.common.v1.payload.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IPayload*](../interfaces/proto.temporal.api.common.v1.ipayload.md) | Payload message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*Payload*](proto.temporal.api.common.v1.payload.md)

Creates a Payload message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*Payload*](proto.temporal.api.common.v1.payload.md)

Payload

___

### toObject

▸ `Static`**toObject**(`message`: [*Payload*](proto.temporal.api.common.v1.payload.md), `options?`: IConversionOptions): *object*

Creates a plain object from a Payload message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*Payload*](proto.temporal.api.common.v1.payload.md) | Payload   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a Payload message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
