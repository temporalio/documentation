# Class: Memo

[common](../modules/proto.temporal.api.common.md).[v1](../modules/proto.temporal.api.common.v1.md).Memo

Represents a Memo.

## Implements

* [*IMemo*](../interfaces/proto.temporal.api.common.v1.imemo.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.common.v1.memo.md#constructor)

### Properties

- [fields](proto.temporal.api.common.v1.memo.md#fields)

### Methods

- [toJSON](proto.temporal.api.common.v1.memo.md#tojson)
- [create](proto.temporal.api.common.v1.memo.md#create)
- [decode](proto.temporal.api.common.v1.memo.md#decode)
- [decodeDelimited](proto.temporal.api.common.v1.memo.md#decodedelimited)
- [encode](proto.temporal.api.common.v1.memo.md#encode)
- [encodeDelimited](proto.temporal.api.common.v1.memo.md#encodedelimited)
- [fromObject](proto.temporal.api.common.v1.memo.md#fromobject)
- [toObject](proto.temporal.api.common.v1.memo.md#toobject)
- [verify](proto.temporal.api.common.v1.memo.md#verify)

## Constructors

### constructor

\+ **new Memo**(`properties?`: [*IMemo*](../interfaces/proto.temporal.api.common.v1.imemo.md)): [*Memo*](proto.temporal.api.common.v1.memo.md)

Constructs a new Memo.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IMemo*](../interfaces/proto.temporal.api.common.v1.imemo.md) |

**Returns:** [*Memo*](proto.temporal.api.common.v1.memo.md)

## Properties

### fields

• **fields**: *object*

Memo fields.

#### Type declaration:

Implementation of: [IMemo](../interfaces/proto.temporal.api.common.v1.imemo.md).[fields](../interfaces/proto.temporal.api.common.v1.imemo.md#fields)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this Memo to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IMemo*](../interfaces/proto.temporal.api.common.v1.imemo.md)): [*Memo*](proto.temporal.api.common.v1.memo.md)

Creates a new Memo instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IMemo*](../interfaces/proto.temporal.api.common.v1.imemo.md) |

**Returns:** [*Memo*](proto.temporal.api.common.v1.memo.md)

Memo instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*Memo*](proto.temporal.api.common.v1.memo.md)

Decodes a Memo message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*Memo*](proto.temporal.api.common.v1.memo.md)

Memo

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*Memo*](proto.temporal.api.common.v1.memo.md)

Decodes a Memo message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*Memo*](proto.temporal.api.common.v1.memo.md)

Memo

___

### encode

▸ `Static`**encode**(`message`: [*IMemo*](../interfaces/proto.temporal.api.common.v1.imemo.md), `writer?`: *Writer*): *Writer*

Encodes the specified Memo message. Does not implicitly [verify](proto.temporal.api.common.v1.memo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IMemo*](../interfaces/proto.temporal.api.common.v1.imemo.md) | Memo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IMemo*](../interfaces/proto.temporal.api.common.v1.imemo.md), `writer?`: *Writer*): *Writer*

Encodes the specified Memo message, length delimited. Does not implicitly [verify](proto.temporal.api.common.v1.memo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IMemo*](../interfaces/proto.temporal.api.common.v1.imemo.md) | Memo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*Memo*](proto.temporal.api.common.v1.memo.md)

Creates a Memo message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*Memo*](proto.temporal.api.common.v1.memo.md)

Memo

___

### toObject

▸ `Static`**toObject**(`message`: [*Memo*](proto.temporal.api.common.v1.memo.md), `options?`: IConversionOptions): *object*

Creates a plain object from a Memo message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*Memo*](proto.temporal.api.common.v1.memo.md) | Memo   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a Memo message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
