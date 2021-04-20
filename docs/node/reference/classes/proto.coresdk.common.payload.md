# Class: Payload

[coresdk](../modules/proto.coresdk.md).[common](../modules/proto.coresdk.common.md).Payload

Represents a Payload.

## Implements

* [*IPayload*](../interfaces/proto.coresdk.common.ipayload.md)

## Table of contents

### Constructors

- [constructor](proto.coresdk.common.payload.md#constructor)

### Properties

- [data](proto.coresdk.common.payload.md#data)
- [metadata](proto.coresdk.common.payload.md#metadata)

### Methods

- [toJSON](proto.coresdk.common.payload.md#tojson)
- [create](proto.coresdk.common.payload.md#create)
- [decode](proto.coresdk.common.payload.md#decode)
- [decodeDelimited](proto.coresdk.common.payload.md#decodedelimited)
- [encode](proto.coresdk.common.payload.md#encode)
- [encodeDelimited](proto.coresdk.common.payload.md#encodedelimited)
- [fromObject](proto.coresdk.common.payload.md#fromobject)
- [toObject](proto.coresdk.common.payload.md#toobject)
- [verify](proto.coresdk.common.payload.md#verify)

## Constructors

### constructor

\+ **new Payload**(`properties?`: [*IPayload*](../interfaces/proto.coresdk.common.ipayload.md)): [*Payload*](proto.coresdk.common.payload.md)

Constructs a new Payload.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IPayload*](../interfaces/proto.coresdk.common.ipayload.md) |

**Returns:** [*Payload*](proto.coresdk.common.payload.md)

## Properties

### data

• **data**: *Uint8Array*

Payload data.

Implementation of: [IPayload](../interfaces/proto.coresdk.common.ipayload.md).[data](../interfaces/proto.coresdk.common.ipayload.md#data)

___

### metadata

• **metadata**: *object*

Payload metadata.

#### Type declaration:

Implementation of: [IPayload](../interfaces/proto.coresdk.common.ipayload.md).[metadata](../interfaces/proto.coresdk.common.ipayload.md#metadata)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this Payload to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IPayload*](../interfaces/proto.coresdk.common.ipayload.md)): [*Payload*](proto.coresdk.common.payload.md)

Creates a new Payload instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IPayload*](../interfaces/proto.coresdk.common.ipayload.md) |

**Returns:** [*Payload*](proto.coresdk.common.payload.md)

Payload instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*Payload*](proto.coresdk.common.payload.md)

Decodes a Payload message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*Payload*](proto.coresdk.common.payload.md)

Payload

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*Payload*](proto.coresdk.common.payload.md)

Decodes a Payload message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*Payload*](proto.coresdk.common.payload.md)

Payload

___

### encode

▸ `Static`**encode**(`message`: [*IPayload*](../interfaces/proto.coresdk.common.ipayload.md), `writer?`: *Writer*): *Writer*

Encodes the specified Payload message. Does not implicitly [verify](proto.coresdk.common.payload.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IPayload*](../interfaces/proto.coresdk.common.ipayload.md) | Payload message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IPayload*](../interfaces/proto.coresdk.common.ipayload.md), `writer?`: *Writer*): *Writer*

Encodes the specified Payload message, length delimited. Does not implicitly [verify](proto.coresdk.common.payload.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IPayload*](../interfaces/proto.coresdk.common.ipayload.md) | Payload message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*Payload*](proto.coresdk.common.payload.md)

Creates a Payload message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*Payload*](proto.coresdk.common.payload.md)

Payload

___

### toObject

▸ `Static`**toObject**(`message`: [*Payload*](proto.coresdk.common.payload.md), `options?`: IConversionOptions): *object*

Creates a plain object from a Payload message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*Payload*](proto.coresdk.common.payload.md) | Payload   |
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
