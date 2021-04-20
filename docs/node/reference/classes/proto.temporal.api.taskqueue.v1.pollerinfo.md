# Class: PollerInfo

[taskqueue](../modules/proto.temporal.api.taskqueue.md).[v1](../modules/proto.temporal.api.taskqueue.v1.md).PollerInfo

Represents a PollerInfo.

## Implements

* [*IPollerInfo*](../interfaces/proto.temporal.api.taskqueue.v1.ipollerinfo.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.taskqueue.v1.pollerinfo.md#constructor)

### Properties

- [identity](proto.temporal.api.taskqueue.v1.pollerinfo.md#identity)
- [lastAccessTime](proto.temporal.api.taskqueue.v1.pollerinfo.md#lastaccesstime)
- [ratePerSecond](proto.temporal.api.taskqueue.v1.pollerinfo.md#ratepersecond)

### Methods

- [toJSON](proto.temporal.api.taskqueue.v1.pollerinfo.md#tojson)
- [create](proto.temporal.api.taskqueue.v1.pollerinfo.md#create)
- [decode](proto.temporal.api.taskqueue.v1.pollerinfo.md#decode)
- [decodeDelimited](proto.temporal.api.taskqueue.v1.pollerinfo.md#decodedelimited)
- [encode](proto.temporal.api.taskqueue.v1.pollerinfo.md#encode)
- [encodeDelimited](proto.temporal.api.taskqueue.v1.pollerinfo.md#encodedelimited)
- [fromObject](proto.temporal.api.taskqueue.v1.pollerinfo.md#fromobject)
- [toObject](proto.temporal.api.taskqueue.v1.pollerinfo.md#toobject)
- [verify](proto.temporal.api.taskqueue.v1.pollerinfo.md#verify)

## Constructors

### constructor

\+ **new PollerInfo**(`properties?`: [*IPollerInfo*](../interfaces/proto.temporal.api.taskqueue.v1.ipollerinfo.md)): [*PollerInfo*](proto.temporal.api.taskqueue.v1.pollerinfo.md)

Constructs a new PollerInfo.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IPollerInfo*](../interfaces/proto.temporal.api.taskqueue.v1.ipollerinfo.md) |

**Returns:** [*PollerInfo*](proto.temporal.api.taskqueue.v1.pollerinfo.md)

## Properties

### identity

• **identity**: *string*

PollerInfo identity.

Implementation of: [IPollerInfo](../interfaces/proto.temporal.api.taskqueue.v1.ipollerinfo.md).[identity](../interfaces/proto.temporal.api.taskqueue.v1.ipollerinfo.md#identity)

___

### lastAccessTime

• `Optional` **lastAccessTime**: *null* \| [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md)

PollerInfo lastAccessTime.

Implementation of: [IPollerInfo](../interfaces/proto.temporal.api.taskqueue.v1.ipollerinfo.md).[lastAccessTime](../interfaces/proto.temporal.api.taskqueue.v1.ipollerinfo.md#lastaccesstime)

___

### ratePerSecond

• **ratePerSecond**: *number*

PollerInfo ratePerSecond.

Implementation of: [IPollerInfo](../interfaces/proto.temporal.api.taskqueue.v1.ipollerinfo.md).[ratePerSecond](../interfaces/proto.temporal.api.taskqueue.v1.ipollerinfo.md#ratepersecond)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this PollerInfo to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IPollerInfo*](../interfaces/proto.temporal.api.taskqueue.v1.ipollerinfo.md)): [*PollerInfo*](proto.temporal.api.taskqueue.v1.pollerinfo.md)

Creates a new PollerInfo instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IPollerInfo*](../interfaces/proto.temporal.api.taskqueue.v1.ipollerinfo.md) |

**Returns:** [*PollerInfo*](proto.temporal.api.taskqueue.v1.pollerinfo.md)

PollerInfo instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*PollerInfo*](proto.temporal.api.taskqueue.v1.pollerinfo.md)

Decodes a PollerInfo message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*PollerInfo*](proto.temporal.api.taskqueue.v1.pollerinfo.md)

PollerInfo

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*PollerInfo*](proto.temporal.api.taskqueue.v1.pollerinfo.md)

Decodes a PollerInfo message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*PollerInfo*](proto.temporal.api.taskqueue.v1.pollerinfo.md)

PollerInfo

___

### encode

▸ `Static`**encode**(`message`: [*IPollerInfo*](../interfaces/proto.temporal.api.taskqueue.v1.ipollerinfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified PollerInfo message. Does not implicitly [verify](proto.temporal.api.taskqueue.v1.pollerinfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IPollerInfo*](../interfaces/proto.temporal.api.taskqueue.v1.ipollerinfo.md) | PollerInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IPollerInfo*](../interfaces/proto.temporal.api.taskqueue.v1.ipollerinfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified PollerInfo message, length delimited. Does not implicitly [verify](proto.temporal.api.taskqueue.v1.pollerinfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IPollerInfo*](../interfaces/proto.temporal.api.taskqueue.v1.ipollerinfo.md) | PollerInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*PollerInfo*](proto.temporal.api.taskqueue.v1.pollerinfo.md)

Creates a PollerInfo message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*PollerInfo*](proto.temporal.api.taskqueue.v1.pollerinfo.md)

PollerInfo

___

### toObject

▸ `Static`**toObject**(`message`: [*PollerInfo*](proto.temporal.api.taskqueue.v1.pollerinfo.md), `options?`: IConversionOptions): *object*

Creates a plain object from a PollerInfo message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*PollerInfo*](proto.temporal.api.taskqueue.v1.pollerinfo.md) | PollerInfo   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a PollerInfo message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
