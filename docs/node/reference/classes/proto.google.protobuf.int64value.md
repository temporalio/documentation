# Class: Int64Value

[google](../modules/proto.google.md).[protobuf](../modules/proto.google.protobuf.md).Int64Value

Represents an Int64Value.

## Implements

* [*IInt64Value*](../interfaces/proto.google.protobuf.iint64value.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.int64value.md#constructor)

### Properties

- [value](proto.google.protobuf.int64value.md#value)

### Methods

- [toJSON](proto.google.protobuf.int64value.md#tojson)
- [create](proto.google.protobuf.int64value.md#create)
- [decode](proto.google.protobuf.int64value.md#decode)
- [decodeDelimited](proto.google.protobuf.int64value.md#decodedelimited)
- [encode](proto.google.protobuf.int64value.md#encode)
- [encodeDelimited](proto.google.protobuf.int64value.md#encodedelimited)
- [fromObject](proto.google.protobuf.int64value.md#fromobject)
- [toObject](proto.google.protobuf.int64value.md#toobject)
- [verify](proto.google.protobuf.int64value.md#verify)

## Constructors

### constructor

\+ **new Int64Value**(`properties?`: [*IInt64Value*](../interfaces/proto.google.protobuf.iint64value.md)): [*Int64Value*](proto.google.protobuf.int64value.md)

Constructs a new Int64Value.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IInt64Value*](../interfaces/proto.google.protobuf.iint64value.md) |

**Returns:** [*Int64Value*](proto.google.protobuf.int64value.md)

## Properties

### value

• **value**: Long

Int64Value value.

Implementation of: [IInt64Value](../interfaces/proto.google.protobuf.iint64value.md).[value](../interfaces/proto.google.protobuf.iint64value.md#value)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this Int64Value to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IInt64Value*](../interfaces/proto.google.protobuf.iint64value.md)): [*Int64Value*](proto.google.protobuf.int64value.md)

Creates a new Int64Value instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IInt64Value*](../interfaces/proto.google.protobuf.iint64value.md) |

**Returns:** [*Int64Value*](proto.google.protobuf.int64value.md)

Int64Value instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*Int64Value*](proto.google.protobuf.int64value.md)

Decodes an Int64Value message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*Int64Value*](proto.google.protobuf.int64value.md)

Int64Value

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*Int64Value*](proto.google.protobuf.int64value.md)

Decodes an Int64Value message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*Int64Value*](proto.google.protobuf.int64value.md)

Int64Value

___

### encode

▸ `Static`**encode**(`message`: [*IInt64Value*](../interfaces/proto.google.protobuf.iint64value.md), `writer?`: *Writer*): *Writer*

Encodes the specified Int64Value message. Does not implicitly [verify](proto.google.protobuf.int64value.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IInt64Value*](../interfaces/proto.google.protobuf.iint64value.md) | Int64Value message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IInt64Value*](../interfaces/proto.google.protobuf.iint64value.md), `writer?`: *Writer*): *Writer*

Encodes the specified Int64Value message, length delimited. Does not implicitly [verify](proto.google.protobuf.int64value.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IInt64Value*](../interfaces/proto.google.protobuf.iint64value.md) | Int64Value message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*Int64Value*](proto.google.protobuf.int64value.md)

Creates an Int64Value message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*Int64Value*](proto.google.protobuf.int64value.md)

Int64Value

___

### toObject

▸ `Static`**toObject**(`message`: [*Int64Value*](proto.google.protobuf.int64value.md), `options?`: IConversionOptions): *object*

Creates a plain object from an Int64Value message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*Int64Value*](proto.google.protobuf.int64value.md) | Int64Value   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an Int64Value message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
