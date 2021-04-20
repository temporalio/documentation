# Class: Payloads

[common](../modules/proto.temporal.api.common.md).[v1](../modules/proto.temporal.api.common.v1.md).Payloads

Represents a Payloads.

## Implements

* [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.common.v1.payloads.md#constructor)

### Properties

- [payloads](proto.temporal.api.common.v1.payloads.md#payloads)

### Methods

- [toJSON](proto.temporal.api.common.v1.payloads.md#tojson)
- [create](proto.temporal.api.common.v1.payloads.md#create)
- [decode](proto.temporal.api.common.v1.payloads.md#decode)
- [decodeDelimited](proto.temporal.api.common.v1.payloads.md#decodedelimited)
- [encode](proto.temporal.api.common.v1.payloads.md#encode)
- [encodeDelimited](proto.temporal.api.common.v1.payloads.md#encodedelimited)
- [fromObject](proto.temporal.api.common.v1.payloads.md#fromobject)
- [toObject](proto.temporal.api.common.v1.payloads.md#toobject)
- [verify](proto.temporal.api.common.v1.payloads.md#verify)

## Constructors

### constructor

\+ **new Payloads**(`properties?`: [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)): [*Payloads*](proto.temporal.api.common.v1.payloads.md)

Constructs a new Payloads.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md) |

**Returns:** [*Payloads*](proto.temporal.api.common.v1.payloads.md)

## Properties

### payloads

• **payloads**: [*IPayload*](../interfaces/proto.temporal.api.common.v1.ipayload.md)[]

Payloads payloads.

Implementation of: [IPayloads](../interfaces/proto.temporal.api.common.v1.ipayloads.md).[payloads](../interfaces/proto.temporal.api.common.v1.ipayloads.md#payloads)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this Payloads to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)): [*Payloads*](proto.temporal.api.common.v1.payloads.md)

Creates a new Payloads instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md) |

**Returns:** [*Payloads*](proto.temporal.api.common.v1.payloads.md)

Payloads instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*Payloads*](proto.temporal.api.common.v1.payloads.md)

Decodes a Payloads message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*Payloads*](proto.temporal.api.common.v1.payloads.md)

Payloads

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*Payloads*](proto.temporal.api.common.v1.payloads.md)

Decodes a Payloads message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*Payloads*](proto.temporal.api.common.v1.payloads.md)

Payloads

___

### encode

▸ `Static`**encode**(`message`: [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md), `writer?`: *Writer*): *Writer*

Encodes the specified Payloads message. Does not implicitly [verify](proto.temporal.api.common.v1.payloads.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md) | Payloads message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md), `writer?`: *Writer*): *Writer*

Encodes the specified Payloads message, length delimited. Does not implicitly [verify](proto.temporal.api.common.v1.payloads.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md) | Payloads message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*Payloads*](proto.temporal.api.common.v1.payloads.md)

Creates a Payloads message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*Payloads*](proto.temporal.api.common.v1.payloads.md)

Payloads

___

### toObject

▸ `Static`**toObject**(`message`: [*Payloads*](proto.temporal.api.common.v1.payloads.md), `options?`: IConversionOptions): *object*

Creates a plain object from a Payloads message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*Payloads*](proto.temporal.api.common.v1.payloads.md) | Payloads   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a Payloads message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
