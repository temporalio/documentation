# Class: Int32Value

[google](../modules/proto.google.md).[protobuf](../modules/proto.google.protobuf.md).Int32Value

Represents an Int32Value.

## Implements

* [*IInt32Value*](../interfaces/proto.google.protobuf.iint32value.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.int32value.md#constructor)

### Properties

- [value](proto.google.protobuf.int32value.md#value)

### Methods

- [toJSON](proto.google.protobuf.int32value.md#tojson)
- [create](proto.google.protobuf.int32value.md#create)
- [decode](proto.google.protobuf.int32value.md#decode)
- [decodeDelimited](proto.google.protobuf.int32value.md#decodedelimited)
- [encode](proto.google.protobuf.int32value.md#encode)
- [encodeDelimited](proto.google.protobuf.int32value.md#encodedelimited)
- [fromObject](proto.google.protobuf.int32value.md#fromobject)
- [toObject](proto.google.protobuf.int32value.md#toobject)
- [verify](proto.google.protobuf.int32value.md#verify)

## Constructors

### constructor

\+ **new Int32Value**(`properties?`: [*IInt32Value*](../interfaces/proto.google.protobuf.iint32value.md)): [*Int32Value*](proto.google.protobuf.int32value.md)

Constructs a new Int32Value.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IInt32Value*](../interfaces/proto.google.protobuf.iint32value.md) |

**Returns:** [*Int32Value*](proto.google.protobuf.int32value.md)

## Properties

### value

• **value**: *number*

Int32Value value.

Implementation of: [IInt32Value](../interfaces/proto.google.protobuf.iint32value.md).[value](../interfaces/proto.google.protobuf.iint32value.md#value)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this Int32Value to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IInt32Value*](../interfaces/proto.google.protobuf.iint32value.md)): [*Int32Value*](proto.google.protobuf.int32value.md)

Creates a new Int32Value instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IInt32Value*](../interfaces/proto.google.protobuf.iint32value.md) |

**Returns:** [*Int32Value*](proto.google.protobuf.int32value.md)

Int32Value instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*Int32Value*](proto.google.protobuf.int32value.md)

Decodes an Int32Value message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*Int32Value*](proto.google.protobuf.int32value.md)

Int32Value

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*Int32Value*](proto.google.protobuf.int32value.md)

Decodes an Int32Value message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*Int32Value*](proto.google.protobuf.int32value.md)

Int32Value

___

### encode

▸ `Static`**encode**(`message`: [*IInt32Value*](../interfaces/proto.google.protobuf.iint32value.md), `writer?`: *Writer*): *Writer*

Encodes the specified Int32Value message. Does not implicitly [verify](proto.google.protobuf.int32value.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IInt32Value*](../interfaces/proto.google.protobuf.iint32value.md) | Int32Value message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IInt32Value*](../interfaces/proto.google.protobuf.iint32value.md), `writer?`: *Writer*): *Writer*

Encodes the specified Int32Value message, length delimited. Does not implicitly [verify](proto.google.protobuf.int32value.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IInt32Value*](../interfaces/proto.google.protobuf.iint32value.md) | Int32Value message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*Int32Value*](proto.google.protobuf.int32value.md)

Creates an Int32Value message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*Int32Value*](proto.google.protobuf.int32value.md)

Int32Value

___

### toObject

▸ `Static`**toObject**(`message`: [*Int32Value*](proto.google.protobuf.int32value.md), `options?`: IConversionOptions): *object*

Creates a plain object from an Int32Value message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*Int32Value*](proto.google.protobuf.int32value.md) | Int32Value   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an Int32Value message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
