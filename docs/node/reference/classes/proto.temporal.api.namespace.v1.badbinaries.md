# Class: BadBinaries

[namespace](../modules/proto.temporal.api.namespace.md).[v1](../modules/proto.temporal.api.namespace.v1.md).BadBinaries

Represents a BadBinaries.

## Implements

* [*IBadBinaries*](../interfaces/proto.temporal.api.namespace.v1.ibadbinaries.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.namespace.v1.badbinaries.md#constructor)

### Properties

- [binaries](proto.temporal.api.namespace.v1.badbinaries.md#binaries)

### Methods

- [toJSON](proto.temporal.api.namespace.v1.badbinaries.md#tojson)
- [create](proto.temporal.api.namespace.v1.badbinaries.md#create)
- [decode](proto.temporal.api.namespace.v1.badbinaries.md#decode)
- [decodeDelimited](proto.temporal.api.namespace.v1.badbinaries.md#decodedelimited)
- [encode](proto.temporal.api.namespace.v1.badbinaries.md#encode)
- [encodeDelimited](proto.temporal.api.namespace.v1.badbinaries.md#encodedelimited)
- [fromObject](proto.temporal.api.namespace.v1.badbinaries.md#fromobject)
- [toObject](proto.temporal.api.namespace.v1.badbinaries.md#toobject)
- [verify](proto.temporal.api.namespace.v1.badbinaries.md#verify)

## Constructors

### constructor

\+ **new BadBinaries**(`properties?`: [*IBadBinaries*](../interfaces/proto.temporal.api.namespace.v1.ibadbinaries.md)): [*BadBinaries*](proto.temporal.api.namespace.v1.badbinaries.md)

Constructs a new BadBinaries.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IBadBinaries*](../interfaces/proto.temporal.api.namespace.v1.ibadbinaries.md) |

**Returns:** [*BadBinaries*](proto.temporal.api.namespace.v1.badbinaries.md)

## Properties

### binaries

• **binaries**: *object*

BadBinaries binaries.

#### Type declaration:

Implementation of: [IBadBinaries](../interfaces/proto.temporal.api.namespace.v1.ibadbinaries.md).[binaries](../interfaces/proto.temporal.api.namespace.v1.ibadbinaries.md#binaries)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this BadBinaries to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IBadBinaries*](../interfaces/proto.temporal.api.namespace.v1.ibadbinaries.md)): [*BadBinaries*](proto.temporal.api.namespace.v1.badbinaries.md)

Creates a new BadBinaries instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IBadBinaries*](../interfaces/proto.temporal.api.namespace.v1.ibadbinaries.md) |

**Returns:** [*BadBinaries*](proto.temporal.api.namespace.v1.badbinaries.md)

BadBinaries instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*BadBinaries*](proto.temporal.api.namespace.v1.badbinaries.md)

Decodes a BadBinaries message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*BadBinaries*](proto.temporal.api.namespace.v1.badbinaries.md)

BadBinaries

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*BadBinaries*](proto.temporal.api.namespace.v1.badbinaries.md)

Decodes a BadBinaries message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*BadBinaries*](proto.temporal.api.namespace.v1.badbinaries.md)

BadBinaries

___

### encode

▸ `Static`**encode**(`message`: [*IBadBinaries*](../interfaces/proto.temporal.api.namespace.v1.ibadbinaries.md), `writer?`: *Writer*): *Writer*

Encodes the specified BadBinaries message. Does not implicitly [verify](proto.temporal.api.namespace.v1.badbinaries.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IBadBinaries*](../interfaces/proto.temporal.api.namespace.v1.ibadbinaries.md) | BadBinaries message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IBadBinaries*](../interfaces/proto.temporal.api.namespace.v1.ibadbinaries.md), `writer?`: *Writer*): *Writer*

Encodes the specified BadBinaries message, length delimited. Does not implicitly [verify](proto.temporal.api.namespace.v1.badbinaries.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IBadBinaries*](../interfaces/proto.temporal.api.namespace.v1.ibadbinaries.md) | BadBinaries message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*BadBinaries*](proto.temporal.api.namespace.v1.badbinaries.md)

Creates a BadBinaries message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*BadBinaries*](proto.temporal.api.namespace.v1.badbinaries.md)

BadBinaries

___

### toObject

▸ `Static`**toObject**(`message`: [*BadBinaries*](proto.temporal.api.namespace.v1.badbinaries.md), `options?`: IConversionOptions): *object*

Creates a plain object from a BadBinaries message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*BadBinaries*](proto.temporal.api.namespace.v1.badbinaries.md) | BadBinaries   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a BadBinaries message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
