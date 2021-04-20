# Class: UInt64Value

[google](../modules/proto.google.md).[protobuf](../modules/proto.google.protobuf.md).UInt64Value

Represents a UInt64Value.

## Implements

* [*IUInt64Value*](../interfaces/proto.google.protobuf.iuint64value.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.uint64value.md#constructor)

### Properties

- [value](proto.google.protobuf.uint64value.md#value)

### Methods

- [toJSON](proto.google.protobuf.uint64value.md#tojson)
- [create](proto.google.protobuf.uint64value.md#create)
- [decode](proto.google.protobuf.uint64value.md#decode)
- [decodeDelimited](proto.google.protobuf.uint64value.md#decodedelimited)
- [encode](proto.google.protobuf.uint64value.md#encode)
- [encodeDelimited](proto.google.protobuf.uint64value.md#encodedelimited)
- [fromObject](proto.google.protobuf.uint64value.md#fromobject)
- [toObject](proto.google.protobuf.uint64value.md#toobject)
- [verify](proto.google.protobuf.uint64value.md#verify)

## Constructors

### constructor

\+ **new UInt64Value**(`properties?`: [*IUInt64Value*](../interfaces/proto.google.protobuf.iuint64value.md)): [*UInt64Value*](proto.google.protobuf.uint64value.md)

Constructs a new UInt64Value.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IUInt64Value*](../interfaces/proto.google.protobuf.iuint64value.md) |

**Returns:** [*UInt64Value*](proto.google.protobuf.uint64value.md)

## Properties

### value

• **value**: Long

UInt64Value value.

Implementation of: [IUInt64Value](../interfaces/proto.google.protobuf.iuint64value.md).[value](../interfaces/proto.google.protobuf.iuint64value.md#value)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this UInt64Value to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IUInt64Value*](../interfaces/proto.google.protobuf.iuint64value.md)): [*UInt64Value*](proto.google.protobuf.uint64value.md)

Creates a new UInt64Value instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IUInt64Value*](../interfaces/proto.google.protobuf.iuint64value.md) |

**Returns:** [*UInt64Value*](proto.google.protobuf.uint64value.md)

UInt64Value instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*UInt64Value*](proto.google.protobuf.uint64value.md)

Decodes a UInt64Value message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*UInt64Value*](proto.google.protobuf.uint64value.md)

UInt64Value

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*UInt64Value*](proto.google.protobuf.uint64value.md)

Decodes a UInt64Value message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*UInt64Value*](proto.google.protobuf.uint64value.md)

UInt64Value

___

### encode

▸ `Static`**encode**(`message`: [*IUInt64Value*](../interfaces/proto.google.protobuf.iuint64value.md), `writer?`: *Writer*): *Writer*

Encodes the specified UInt64Value message. Does not implicitly [verify](proto.google.protobuf.uint64value.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IUInt64Value*](../interfaces/proto.google.protobuf.iuint64value.md) | UInt64Value message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IUInt64Value*](../interfaces/proto.google.protobuf.iuint64value.md), `writer?`: *Writer*): *Writer*

Encodes the specified UInt64Value message, length delimited. Does not implicitly [verify](proto.google.protobuf.uint64value.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IUInt64Value*](../interfaces/proto.google.protobuf.iuint64value.md) | UInt64Value message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*UInt64Value*](proto.google.protobuf.uint64value.md)

Creates a UInt64Value message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*UInt64Value*](proto.google.protobuf.uint64value.md)

UInt64Value

___

### toObject

▸ `Static`**toObject**(`message`: [*UInt64Value*](proto.google.protobuf.uint64value.md), `options?`: IConversionOptions): *object*

Creates a plain object from a UInt64Value message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*UInt64Value*](proto.google.protobuf.uint64value.md) | UInt64Value   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a UInt64Value message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
