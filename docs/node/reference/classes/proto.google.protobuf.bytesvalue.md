# Class: BytesValue

[google](../modules/proto.google.md).[protobuf](../modules/proto.google.protobuf.md).BytesValue

Represents a BytesValue.

## Implements

* [*IBytesValue*](../interfaces/proto.google.protobuf.ibytesvalue.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.bytesvalue.md#constructor)

### Properties

- [value](proto.google.protobuf.bytesvalue.md#value)

### Methods

- [toJSON](proto.google.protobuf.bytesvalue.md#tojson)
- [create](proto.google.protobuf.bytesvalue.md#create)
- [decode](proto.google.protobuf.bytesvalue.md#decode)
- [decodeDelimited](proto.google.protobuf.bytesvalue.md#decodedelimited)
- [encode](proto.google.protobuf.bytesvalue.md#encode)
- [encodeDelimited](proto.google.protobuf.bytesvalue.md#encodedelimited)
- [fromObject](proto.google.protobuf.bytesvalue.md#fromobject)
- [toObject](proto.google.protobuf.bytesvalue.md#toobject)
- [verify](proto.google.protobuf.bytesvalue.md#verify)

## Constructors

### constructor

\+ **new BytesValue**(`properties?`: [*IBytesValue*](../interfaces/proto.google.protobuf.ibytesvalue.md)): [*BytesValue*](proto.google.protobuf.bytesvalue.md)

Constructs a new BytesValue.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IBytesValue*](../interfaces/proto.google.protobuf.ibytesvalue.md) |

**Returns:** [*BytesValue*](proto.google.protobuf.bytesvalue.md)

## Properties

### value

• **value**: *Uint8Array*

BytesValue value.

Implementation of: [IBytesValue](../interfaces/proto.google.protobuf.ibytesvalue.md).[value](../interfaces/proto.google.protobuf.ibytesvalue.md#value)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this BytesValue to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IBytesValue*](../interfaces/proto.google.protobuf.ibytesvalue.md)): [*BytesValue*](proto.google.protobuf.bytesvalue.md)

Creates a new BytesValue instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IBytesValue*](../interfaces/proto.google.protobuf.ibytesvalue.md) |

**Returns:** [*BytesValue*](proto.google.protobuf.bytesvalue.md)

BytesValue instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*BytesValue*](proto.google.protobuf.bytesvalue.md)

Decodes a BytesValue message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*BytesValue*](proto.google.protobuf.bytesvalue.md)

BytesValue

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*BytesValue*](proto.google.protobuf.bytesvalue.md)

Decodes a BytesValue message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*BytesValue*](proto.google.protobuf.bytesvalue.md)

BytesValue

___

### encode

▸ `Static`**encode**(`message`: [*IBytesValue*](../interfaces/proto.google.protobuf.ibytesvalue.md), `writer?`: *Writer*): *Writer*

Encodes the specified BytesValue message. Does not implicitly [verify](proto.google.protobuf.bytesvalue.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IBytesValue*](../interfaces/proto.google.protobuf.ibytesvalue.md) | BytesValue message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IBytesValue*](../interfaces/proto.google.protobuf.ibytesvalue.md), `writer?`: *Writer*): *Writer*

Encodes the specified BytesValue message, length delimited. Does not implicitly [verify](proto.google.protobuf.bytesvalue.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IBytesValue*](../interfaces/proto.google.protobuf.ibytesvalue.md) | BytesValue message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*BytesValue*](proto.google.protobuf.bytesvalue.md)

Creates a BytesValue message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*BytesValue*](proto.google.protobuf.bytesvalue.md)

BytesValue

___

### toObject

▸ `Static`**toObject**(`message`: [*BytesValue*](proto.google.protobuf.bytesvalue.md), `options?`: IConversionOptions): *object*

Creates a plain object from a BytesValue message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*BytesValue*](proto.google.protobuf.bytesvalue.md) | BytesValue   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a BytesValue message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
