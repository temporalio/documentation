# Class: ServerFailureInfo

[failure](../modules/proto.temporal.api.failure.md).[v1](../modules/proto.temporal.api.failure.v1.md).ServerFailureInfo

Represents a ServerFailureInfo.

## Implements

* [*IServerFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iserverfailureinfo.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.failure.v1.serverfailureinfo.md#constructor)

### Properties

- [nonRetryable](proto.temporal.api.failure.v1.serverfailureinfo.md#nonretryable)

### Methods

- [toJSON](proto.temporal.api.failure.v1.serverfailureinfo.md#tojson)
- [create](proto.temporal.api.failure.v1.serverfailureinfo.md#create)
- [decode](proto.temporal.api.failure.v1.serverfailureinfo.md#decode)
- [decodeDelimited](proto.temporal.api.failure.v1.serverfailureinfo.md#decodedelimited)
- [encode](proto.temporal.api.failure.v1.serverfailureinfo.md#encode)
- [encodeDelimited](proto.temporal.api.failure.v1.serverfailureinfo.md#encodedelimited)
- [fromObject](proto.temporal.api.failure.v1.serverfailureinfo.md#fromobject)
- [toObject](proto.temporal.api.failure.v1.serverfailureinfo.md#toobject)
- [verify](proto.temporal.api.failure.v1.serverfailureinfo.md#verify)

## Constructors

### constructor

\+ **new ServerFailureInfo**(`properties?`: [*IServerFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iserverfailureinfo.md)): [*ServerFailureInfo*](proto.temporal.api.failure.v1.serverfailureinfo.md)

Constructs a new ServerFailureInfo.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IServerFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iserverfailureinfo.md) |

**Returns:** [*ServerFailureInfo*](proto.temporal.api.failure.v1.serverfailureinfo.md)

## Properties

### nonRetryable

• **nonRetryable**: *boolean*

ServerFailureInfo nonRetryable.

Implementation of: [IServerFailureInfo](../interfaces/proto.temporal.api.failure.v1.iserverfailureinfo.md).[nonRetryable](../interfaces/proto.temporal.api.failure.v1.iserverfailureinfo.md#nonretryable)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ServerFailureInfo to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IServerFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iserverfailureinfo.md)): [*ServerFailureInfo*](proto.temporal.api.failure.v1.serverfailureinfo.md)

Creates a new ServerFailureInfo instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IServerFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iserverfailureinfo.md) |

**Returns:** [*ServerFailureInfo*](proto.temporal.api.failure.v1.serverfailureinfo.md)

ServerFailureInfo instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ServerFailureInfo*](proto.temporal.api.failure.v1.serverfailureinfo.md)

Decodes a ServerFailureInfo message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ServerFailureInfo*](proto.temporal.api.failure.v1.serverfailureinfo.md)

ServerFailureInfo

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ServerFailureInfo*](proto.temporal.api.failure.v1.serverfailureinfo.md)

Decodes a ServerFailureInfo message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ServerFailureInfo*](proto.temporal.api.failure.v1.serverfailureinfo.md)

ServerFailureInfo

___

### encode

▸ `Static`**encode**(`message`: [*IServerFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iserverfailureinfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified ServerFailureInfo message. Does not implicitly [verify](proto.temporal.api.failure.v1.serverfailureinfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IServerFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iserverfailureinfo.md) | ServerFailureInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IServerFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iserverfailureinfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified ServerFailureInfo message, length delimited. Does not implicitly [verify](proto.temporal.api.failure.v1.serverfailureinfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IServerFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iserverfailureinfo.md) | ServerFailureInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ServerFailureInfo*](proto.temporal.api.failure.v1.serverfailureinfo.md)

Creates a ServerFailureInfo message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ServerFailureInfo*](proto.temporal.api.failure.v1.serverfailureinfo.md)

ServerFailureInfo

___

### toObject

▸ `Static`**toObject**(`message`: [*ServerFailureInfo*](proto.temporal.api.failure.v1.serverfailureinfo.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ServerFailureInfo message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ServerFailureInfo*](proto.temporal.api.failure.v1.serverfailureinfo.md) | ServerFailureInfo   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ServerFailureInfo message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
