# Class: StringValue

[google](../modules/proto.google.md).[protobuf](../modules/proto.google.protobuf.md).StringValue

Represents a StringValue.

## Implements

* [*IStringValue*](../interfaces/proto.google.protobuf.istringvalue.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.stringvalue.md#constructor)

### Properties

- [value](proto.google.protobuf.stringvalue.md#value)

### Methods

- [toJSON](proto.google.protobuf.stringvalue.md#tojson)
- [create](proto.google.protobuf.stringvalue.md#create)
- [decode](proto.google.protobuf.stringvalue.md#decode)
- [decodeDelimited](proto.google.protobuf.stringvalue.md#decodedelimited)
- [encode](proto.google.protobuf.stringvalue.md#encode)
- [encodeDelimited](proto.google.protobuf.stringvalue.md#encodedelimited)
- [fromObject](proto.google.protobuf.stringvalue.md#fromobject)
- [toObject](proto.google.protobuf.stringvalue.md#toobject)
- [verify](proto.google.protobuf.stringvalue.md#verify)

## Constructors

### constructor

\+ **new StringValue**(`properties?`: [*IStringValue*](../interfaces/proto.google.protobuf.istringvalue.md)): [*StringValue*](proto.google.protobuf.stringvalue.md)

Constructs a new StringValue.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IStringValue*](../interfaces/proto.google.protobuf.istringvalue.md) |

**Returns:** [*StringValue*](proto.google.protobuf.stringvalue.md)

## Properties

### value

• **value**: *string*

StringValue value.

Implementation of: [IStringValue](../interfaces/proto.google.protobuf.istringvalue.md).[value](../interfaces/proto.google.protobuf.istringvalue.md#value)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this StringValue to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IStringValue*](../interfaces/proto.google.protobuf.istringvalue.md)): [*StringValue*](proto.google.protobuf.stringvalue.md)

Creates a new StringValue instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IStringValue*](../interfaces/proto.google.protobuf.istringvalue.md) |

**Returns:** [*StringValue*](proto.google.protobuf.stringvalue.md)

StringValue instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*StringValue*](proto.google.protobuf.stringvalue.md)

Decodes a StringValue message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*StringValue*](proto.google.protobuf.stringvalue.md)

StringValue

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*StringValue*](proto.google.protobuf.stringvalue.md)

Decodes a StringValue message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*StringValue*](proto.google.protobuf.stringvalue.md)

StringValue

___

### encode

▸ `Static`**encode**(`message`: [*IStringValue*](../interfaces/proto.google.protobuf.istringvalue.md), `writer?`: *Writer*): *Writer*

Encodes the specified StringValue message. Does not implicitly [verify](proto.google.protobuf.stringvalue.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IStringValue*](../interfaces/proto.google.protobuf.istringvalue.md) | StringValue message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IStringValue*](../interfaces/proto.google.protobuf.istringvalue.md), `writer?`: *Writer*): *Writer*

Encodes the specified StringValue message, length delimited. Does not implicitly [verify](proto.google.protobuf.stringvalue.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IStringValue*](../interfaces/proto.google.protobuf.istringvalue.md) | StringValue message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*StringValue*](proto.google.protobuf.stringvalue.md)

Creates a StringValue message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*StringValue*](proto.google.protobuf.stringvalue.md)

StringValue

___

### toObject

▸ `Static`**toObject**(`message`: [*StringValue*](proto.google.protobuf.stringvalue.md), `options?`: IConversionOptions): *object*

Creates a plain object from a StringValue message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*StringValue*](proto.google.protobuf.stringvalue.md) | StringValue   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a StringValue message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
