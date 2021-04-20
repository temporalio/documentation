# Class: FloatValue

[google](../modules/proto.google.md).[protobuf](../modules/proto.google.protobuf.md).FloatValue

Represents a FloatValue.

## Implements

* [*IFloatValue*](../interfaces/proto.google.protobuf.ifloatvalue.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.floatvalue.md#constructor)

### Properties

- [value](proto.google.protobuf.floatvalue.md#value)

### Methods

- [toJSON](proto.google.protobuf.floatvalue.md#tojson)
- [create](proto.google.protobuf.floatvalue.md#create)
- [decode](proto.google.protobuf.floatvalue.md#decode)
- [decodeDelimited](proto.google.protobuf.floatvalue.md#decodedelimited)
- [encode](proto.google.protobuf.floatvalue.md#encode)
- [encodeDelimited](proto.google.protobuf.floatvalue.md#encodedelimited)
- [fromObject](proto.google.protobuf.floatvalue.md#fromobject)
- [toObject](proto.google.protobuf.floatvalue.md#toobject)
- [verify](proto.google.protobuf.floatvalue.md#verify)

## Constructors

### constructor

\+ **new FloatValue**(`properties?`: [*IFloatValue*](../interfaces/proto.google.protobuf.ifloatvalue.md)): [*FloatValue*](proto.google.protobuf.floatvalue.md)

Constructs a new FloatValue.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IFloatValue*](../interfaces/proto.google.protobuf.ifloatvalue.md) |

**Returns:** [*FloatValue*](proto.google.protobuf.floatvalue.md)

## Properties

### value

• **value**: *number*

FloatValue value.

Implementation of: [IFloatValue](../interfaces/proto.google.protobuf.ifloatvalue.md).[value](../interfaces/proto.google.protobuf.ifloatvalue.md#value)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this FloatValue to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IFloatValue*](../interfaces/proto.google.protobuf.ifloatvalue.md)): [*FloatValue*](proto.google.protobuf.floatvalue.md)

Creates a new FloatValue instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IFloatValue*](../interfaces/proto.google.protobuf.ifloatvalue.md) |

**Returns:** [*FloatValue*](proto.google.protobuf.floatvalue.md)

FloatValue instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*FloatValue*](proto.google.protobuf.floatvalue.md)

Decodes a FloatValue message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*FloatValue*](proto.google.protobuf.floatvalue.md)

FloatValue

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*FloatValue*](proto.google.protobuf.floatvalue.md)

Decodes a FloatValue message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*FloatValue*](proto.google.protobuf.floatvalue.md)

FloatValue

___

### encode

▸ `Static`**encode**(`message`: [*IFloatValue*](../interfaces/proto.google.protobuf.ifloatvalue.md), `writer?`: *Writer*): *Writer*

Encodes the specified FloatValue message. Does not implicitly [verify](proto.google.protobuf.floatvalue.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IFloatValue*](../interfaces/proto.google.protobuf.ifloatvalue.md) | FloatValue message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IFloatValue*](../interfaces/proto.google.protobuf.ifloatvalue.md), `writer?`: *Writer*): *Writer*

Encodes the specified FloatValue message, length delimited. Does not implicitly [verify](proto.google.protobuf.floatvalue.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IFloatValue*](../interfaces/proto.google.protobuf.ifloatvalue.md) | FloatValue message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*FloatValue*](proto.google.protobuf.floatvalue.md)

Creates a FloatValue message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*FloatValue*](proto.google.protobuf.floatvalue.md)

FloatValue

___

### toObject

▸ `Static`**toObject**(`message`: [*FloatValue*](proto.google.protobuf.floatvalue.md), `options?`: IConversionOptions): *object*

Creates a plain object from a FloatValue message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*FloatValue*](proto.google.protobuf.floatvalue.md) | FloatValue   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a FloatValue message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
