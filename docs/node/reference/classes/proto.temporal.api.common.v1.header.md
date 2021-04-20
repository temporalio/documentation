# Class: Header

[common](../modules/proto.temporal.api.common.md).[v1](../modules/proto.temporal.api.common.v1.md).Header

Represents a Header.

## Implements

* [*IHeader*](../interfaces/proto.temporal.api.common.v1.iheader.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.common.v1.header.md#constructor)

### Properties

- [fields](proto.temporal.api.common.v1.header.md#fields)

### Methods

- [toJSON](proto.temporal.api.common.v1.header.md#tojson)
- [create](proto.temporal.api.common.v1.header.md#create)
- [decode](proto.temporal.api.common.v1.header.md#decode)
- [decodeDelimited](proto.temporal.api.common.v1.header.md#decodedelimited)
- [encode](proto.temporal.api.common.v1.header.md#encode)
- [encodeDelimited](proto.temporal.api.common.v1.header.md#encodedelimited)
- [fromObject](proto.temporal.api.common.v1.header.md#fromobject)
- [toObject](proto.temporal.api.common.v1.header.md#toobject)
- [verify](proto.temporal.api.common.v1.header.md#verify)

## Constructors

### constructor

\+ **new Header**(`properties?`: [*IHeader*](../interfaces/proto.temporal.api.common.v1.iheader.md)): [*Header*](proto.temporal.api.common.v1.header.md)

Constructs a new Header.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IHeader*](../interfaces/proto.temporal.api.common.v1.iheader.md) |

**Returns:** [*Header*](proto.temporal.api.common.v1.header.md)

## Properties

### fields

• **fields**: *object*

Header fields.

#### Type declaration:

Implementation of: [IHeader](../interfaces/proto.temporal.api.common.v1.iheader.md).[fields](../interfaces/proto.temporal.api.common.v1.iheader.md#fields)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this Header to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IHeader*](../interfaces/proto.temporal.api.common.v1.iheader.md)): [*Header*](proto.temporal.api.common.v1.header.md)

Creates a new Header instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IHeader*](../interfaces/proto.temporal.api.common.v1.iheader.md) |

**Returns:** [*Header*](proto.temporal.api.common.v1.header.md)

Header instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*Header*](proto.temporal.api.common.v1.header.md)

Decodes a Header message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*Header*](proto.temporal.api.common.v1.header.md)

Header

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*Header*](proto.temporal.api.common.v1.header.md)

Decodes a Header message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*Header*](proto.temporal.api.common.v1.header.md)

Header

___

### encode

▸ `Static`**encode**(`message`: [*IHeader*](../interfaces/proto.temporal.api.common.v1.iheader.md), `writer?`: *Writer*): *Writer*

Encodes the specified Header message. Does not implicitly [verify](proto.temporal.api.common.v1.header.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IHeader*](../interfaces/proto.temporal.api.common.v1.iheader.md) | Header message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IHeader*](../interfaces/proto.temporal.api.common.v1.iheader.md), `writer?`: *Writer*): *Writer*

Encodes the specified Header message, length delimited. Does not implicitly [verify](proto.temporal.api.common.v1.header.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IHeader*](../interfaces/proto.temporal.api.common.v1.iheader.md) | Header message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*Header*](proto.temporal.api.common.v1.header.md)

Creates a Header message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*Header*](proto.temporal.api.common.v1.header.md)

Header

___

### toObject

▸ `Static`**toObject**(`message`: [*Header*](proto.temporal.api.common.v1.header.md), `options?`: IConversionOptions): *object*

Creates a plain object from a Header message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*Header*](proto.temporal.api.common.v1.header.md) | Header   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a Header message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
