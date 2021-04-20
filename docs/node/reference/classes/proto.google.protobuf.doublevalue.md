# Class: DoubleValue

[google](../modules/proto.google.md).[protobuf](../modules/proto.google.protobuf.md).DoubleValue

Represents a DoubleValue.

## Implements

* [*IDoubleValue*](../interfaces/proto.google.protobuf.idoublevalue.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.doublevalue.md#constructor)

### Properties

- [value](proto.google.protobuf.doublevalue.md#value)

### Methods

- [toJSON](proto.google.protobuf.doublevalue.md#tojson)
- [create](proto.google.protobuf.doublevalue.md#create)
- [decode](proto.google.protobuf.doublevalue.md#decode)
- [decodeDelimited](proto.google.protobuf.doublevalue.md#decodedelimited)
- [encode](proto.google.protobuf.doublevalue.md#encode)
- [encodeDelimited](proto.google.protobuf.doublevalue.md#encodedelimited)
- [fromObject](proto.google.protobuf.doublevalue.md#fromobject)
- [toObject](proto.google.protobuf.doublevalue.md#toobject)
- [verify](proto.google.protobuf.doublevalue.md#verify)

## Constructors

### constructor

\+ **new DoubleValue**(`properties?`: [*IDoubleValue*](../interfaces/proto.google.protobuf.idoublevalue.md)): [*DoubleValue*](proto.google.protobuf.doublevalue.md)

Constructs a new DoubleValue.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IDoubleValue*](../interfaces/proto.google.protobuf.idoublevalue.md) |

**Returns:** [*DoubleValue*](proto.google.protobuf.doublevalue.md)

## Properties

### value

• **value**: *number*

DoubleValue value.

Implementation of: [IDoubleValue](../interfaces/proto.google.protobuf.idoublevalue.md).[value](../interfaces/proto.google.protobuf.idoublevalue.md#value)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this DoubleValue to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IDoubleValue*](../interfaces/proto.google.protobuf.idoublevalue.md)): [*DoubleValue*](proto.google.protobuf.doublevalue.md)

Creates a new DoubleValue instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IDoubleValue*](../interfaces/proto.google.protobuf.idoublevalue.md) |

**Returns:** [*DoubleValue*](proto.google.protobuf.doublevalue.md)

DoubleValue instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*DoubleValue*](proto.google.protobuf.doublevalue.md)

Decodes a DoubleValue message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*DoubleValue*](proto.google.protobuf.doublevalue.md)

DoubleValue

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*DoubleValue*](proto.google.protobuf.doublevalue.md)

Decodes a DoubleValue message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*DoubleValue*](proto.google.protobuf.doublevalue.md)

DoubleValue

___

### encode

▸ `Static`**encode**(`message`: [*IDoubleValue*](../interfaces/proto.google.protobuf.idoublevalue.md), `writer?`: *Writer*): *Writer*

Encodes the specified DoubleValue message. Does not implicitly [verify](proto.google.protobuf.doublevalue.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IDoubleValue*](../interfaces/proto.google.protobuf.idoublevalue.md) | DoubleValue message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IDoubleValue*](../interfaces/proto.google.protobuf.idoublevalue.md), `writer?`: *Writer*): *Writer*

Encodes the specified DoubleValue message, length delimited. Does not implicitly [verify](proto.google.protobuf.doublevalue.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IDoubleValue*](../interfaces/proto.google.protobuf.idoublevalue.md) | DoubleValue message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*DoubleValue*](proto.google.protobuf.doublevalue.md)

Creates a DoubleValue message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*DoubleValue*](proto.google.protobuf.doublevalue.md)

DoubleValue

___

### toObject

▸ `Static`**toObject**(`message`: [*DoubleValue*](proto.google.protobuf.doublevalue.md), `options?`: IConversionOptions): *object*

Creates a plain object from a DoubleValue message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*DoubleValue*](proto.google.protobuf.doublevalue.md) | DoubleValue   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a DoubleValue message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
