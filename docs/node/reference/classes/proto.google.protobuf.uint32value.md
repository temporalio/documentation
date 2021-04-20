# Class: UInt32Value

[google](../modules/proto.google.md).[protobuf](../modules/proto.google.protobuf.md).UInt32Value

Represents a UInt32Value.

## Implements

* [*IUInt32Value*](../interfaces/proto.google.protobuf.iuint32value.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.uint32value.md#constructor)

### Properties

- [value](proto.google.protobuf.uint32value.md#value)

### Methods

- [toJSON](proto.google.protobuf.uint32value.md#tojson)
- [create](proto.google.protobuf.uint32value.md#create)
- [decode](proto.google.protobuf.uint32value.md#decode)
- [decodeDelimited](proto.google.protobuf.uint32value.md#decodedelimited)
- [encode](proto.google.protobuf.uint32value.md#encode)
- [encodeDelimited](proto.google.protobuf.uint32value.md#encodedelimited)
- [fromObject](proto.google.protobuf.uint32value.md#fromobject)
- [toObject](proto.google.protobuf.uint32value.md#toobject)
- [verify](proto.google.protobuf.uint32value.md#verify)

## Constructors

### constructor

\+ **new UInt32Value**(`properties?`: [*IUInt32Value*](../interfaces/proto.google.protobuf.iuint32value.md)): [*UInt32Value*](proto.google.protobuf.uint32value.md)

Constructs a new UInt32Value.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IUInt32Value*](../interfaces/proto.google.protobuf.iuint32value.md) |

**Returns:** [*UInt32Value*](proto.google.protobuf.uint32value.md)

## Properties

### value

• **value**: *number*

UInt32Value value.

Implementation of: [IUInt32Value](../interfaces/proto.google.protobuf.iuint32value.md).[value](../interfaces/proto.google.protobuf.iuint32value.md#value)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this UInt32Value to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IUInt32Value*](../interfaces/proto.google.protobuf.iuint32value.md)): [*UInt32Value*](proto.google.protobuf.uint32value.md)

Creates a new UInt32Value instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IUInt32Value*](../interfaces/proto.google.protobuf.iuint32value.md) |

**Returns:** [*UInt32Value*](proto.google.protobuf.uint32value.md)

UInt32Value instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*UInt32Value*](proto.google.protobuf.uint32value.md)

Decodes a UInt32Value message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*UInt32Value*](proto.google.protobuf.uint32value.md)

UInt32Value

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*UInt32Value*](proto.google.protobuf.uint32value.md)

Decodes a UInt32Value message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*UInt32Value*](proto.google.protobuf.uint32value.md)

UInt32Value

___

### encode

▸ `Static`**encode**(`message`: [*IUInt32Value*](../interfaces/proto.google.protobuf.iuint32value.md), `writer?`: *Writer*): *Writer*

Encodes the specified UInt32Value message. Does not implicitly [verify](proto.google.protobuf.uint32value.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IUInt32Value*](../interfaces/proto.google.protobuf.iuint32value.md) | UInt32Value message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IUInt32Value*](../interfaces/proto.google.protobuf.iuint32value.md), `writer?`: *Writer*): *Writer*

Encodes the specified UInt32Value message, length delimited. Does not implicitly [verify](proto.google.protobuf.uint32value.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IUInt32Value*](../interfaces/proto.google.protobuf.iuint32value.md) | UInt32Value message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*UInt32Value*](proto.google.protobuf.uint32value.md)

Creates a UInt32Value message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*UInt32Value*](proto.google.protobuf.uint32value.md)

UInt32Value

___

### toObject

▸ `Static`**toObject**(`message`: [*UInt32Value*](proto.google.protobuf.uint32value.md), `options?`: IConversionOptions): *object*

Creates a plain object from a UInt32Value message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*UInt32Value*](proto.google.protobuf.uint32value.md) | UInt32Value   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a UInt32Value message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
