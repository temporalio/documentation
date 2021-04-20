# Class: BoolValue

[google](../modules/proto.google.md).[protobuf](../modules/proto.google.protobuf.md).BoolValue

Represents a BoolValue.

## Implements

* [*IBoolValue*](../interfaces/proto.google.protobuf.iboolvalue.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.boolvalue.md#constructor)

### Properties

- [value](proto.google.protobuf.boolvalue.md#value)

### Methods

- [toJSON](proto.google.protobuf.boolvalue.md#tojson)
- [create](proto.google.protobuf.boolvalue.md#create)
- [decode](proto.google.protobuf.boolvalue.md#decode)
- [decodeDelimited](proto.google.protobuf.boolvalue.md#decodedelimited)
- [encode](proto.google.protobuf.boolvalue.md#encode)
- [encodeDelimited](proto.google.protobuf.boolvalue.md#encodedelimited)
- [fromObject](proto.google.protobuf.boolvalue.md#fromobject)
- [toObject](proto.google.protobuf.boolvalue.md#toobject)
- [verify](proto.google.protobuf.boolvalue.md#verify)

## Constructors

### constructor

\+ **new BoolValue**(`properties?`: [*IBoolValue*](../interfaces/proto.google.protobuf.iboolvalue.md)): [*BoolValue*](proto.google.protobuf.boolvalue.md)

Constructs a new BoolValue.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IBoolValue*](../interfaces/proto.google.protobuf.iboolvalue.md) |

**Returns:** [*BoolValue*](proto.google.protobuf.boolvalue.md)

## Properties

### value

• **value**: *boolean*

BoolValue value.

Implementation of: [IBoolValue](../interfaces/proto.google.protobuf.iboolvalue.md).[value](../interfaces/proto.google.protobuf.iboolvalue.md#value)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this BoolValue to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IBoolValue*](../interfaces/proto.google.protobuf.iboolvalue.md)): [*BoolValue*](proto.google.protobuf.boolvalue.md)

Creates a new BoolValue instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IBoolValue*](../interfaces/proto.google.protobuf.iboolvalue.md) |

**Returns:** [*BoolValue*](proto.google.protobuf.boolvalue.md)

BoolValue instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*BoolValue*](proto.google.protobuf.boolvalue.md)

Decodes a BoolValue message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*BoolValue*](proto.google.protobuf.boolvalue.md)

BoolValue

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*BoolValue*](proto.google.protobuf.boolvalue.md)

Decodes a BoolValue message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*BoolValue*](proto.google.protobuf.boolvalue.md)

BoolValue

___

### encode

▸ `Static`**encode**(`message`: [*IBoolValue*](../interfaces/proto.google.protobuf.iboolvalue.md), `writer?`: *Writer*): *Writer*

Encodes the specified BoolValue message. Does not implicitly [verify](proto.google.protobuf.boolvalue.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IBoolValue*](../interfaces/proto.google.protobuf.iboolvalue.md) | BoolValue message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IBoolValue*](../interfaces/proto.google.protobuf.iboolvalue.md), `writer?`: *Writer*): *Writer*

Encodes the specified BoolValue message, length delimited. Does not implicitly [verify](proto.google.protobuf.boolvalue.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IBoolValue*](../interfaces/proto.google.protobuf.iboolvalue.md) | BoolValue message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*BoolValue*](proto.google.protobuf.boolvalue.md)

Creates a BoolValue message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*BoolValue*](proto.google.protobuf.boolvalue.md)

BoolValue

___

### toObject

▸ `Static`**toObject**(`message`: [*BoolValue*](proto.google.protobuf.boolvalue.md), `options?`: IConversionOptions): *object*

Creates a plain object from a BoolValue message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*BoolValue*](proto.google.protobuf.boolvalue.md) | BoolValue   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a BoolValue message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
