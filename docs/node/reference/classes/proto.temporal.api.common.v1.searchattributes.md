# Class: SearchAttributes

[common](../modules/proto.temporal.api.common.md).[v1](../modules/proto.temporal.api.common.v1.md).SearchAttributes

Represents a SearchAttributes.

## Implements

* [*ISearchAttributes*](../interfaces/proto.temporal.api.common.v1.isearchattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.common.v1.searchattributes.md#constructor)

### Properties

- [indexedFields](proto.temporal.api.common.v1.searchattributes.md#indexedfields)

### Methods

- [toJSON](proto.temporal.api.common.v1.searchattributes.md#tojson)
- [create](proto.temporal.api.common.v1.searchattributes.md#create)
- [decode](proto.temporal.api.common.v1.searchattributes.md#decode)
- [decodeDelimited](proto.temporal.api.common.v1.searchattributes.md#decodedelimited)
- [encode](proto.temporal.api.common.v1.searchattributes.md#encode)
- [encodeDelimited](proto.temporal.api.common.v1.searchattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.common.v1.searchattributes.md#fromobject)
- [toObject](proto.temporal.api.common.v1.searchattributes.md#toobject)
- [verify](proto.temporal.api.common.v1.searchattributes.md#verify)

## Constructors

### constructor

\+ **new SearchAttributes**(`properties?`: [*ISearchAttributes*](../interfaces/proto.temporal.api.common.v1.isearchattributes.md)): [*SearchAttributes*](proto.temporal.api.common.v1.searchattributes.md)

Constructs a new SearchAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ISearchAttributes*](../interfaces/proto.temporal.api.common.v1.isearchattributes.md) |

**Returns:** [*SearchAttributes*](proto.temporal.api.common.v1.searchattributes.md)

## Properties

### indexedFields

• **indexedFields**: *object*

SearchAttributes indexedFields.

#### Type declaration:

Implementation of: [ISearchAttributes](../interfaces/proto.temporal.api.common.v1.isearchattributes.md).[indexedFields](../interfaces/proto.temporal.api.common.v1.isearchattributes.md#indexedfields)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this SearchAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ISearchAttributes*](../interfaces/proto.temporal.api.common.v1.isearchattributes.md)): [*SearchAttributes*](proto.temporal.api.common.v1.searchattributes.md)

Creates a new SearchAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ISearchAttributes*](../interfaces/proto.temporal.api.common.v1.isearchattributes.md) |

**Returns:** [*SearchAttributes*](proto.temporal.api.common.v1.searchattributes.md)

SearchAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*SearchAttributes*](proto.temporal.api.common.v1.searchattributes.md)

Decodes a SearchAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*SearchAttributes*](proto.temporal.api.common.v1.searchattributes.md)

SearchAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*SearchAttributes*](proto.temporal.api.common.v1.searchattributes.md)

Decodes a SearchAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*SearchAttributes*](proto.temporal.api.common.v1.searchattributes.md)

SearchAttributes

___

### encode

▸ `Static`**encode**(`message`: [*ISearchAttributes*](../interfaces/proto.temporal.api.common.v1.isearchattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified SearchAttributes message. Does not implicitly [verify](proto.temporal.api.common.v1.searchattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ISearchAttributes*](../interfaces/proto.temporal.api.common.v1.isearchattributes.md) | SearchAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ISearchAttributes*](../interfaces/proto.temporal.api.common.v1.isearchattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified SearchAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.common.v1.searchattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ISearchAttributes*](../interfaces/proto.temporal.api.common.v1.isearchattributes.md) | SearchAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*SearchAttributes*](proto.temporal.api.common.v1.searchattributes.md)

Creates a SearchAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*SearchAttributes*](proto.temporal.api.common.v1.searchattributes.md)

SearchAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*SearchAttributes*](proto.temporal.api.common.v1.searchattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a SearchAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*SearchAttributes*](proto.temporal.api.common.v1.searchattributes.md) | SearchAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a SearchAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
