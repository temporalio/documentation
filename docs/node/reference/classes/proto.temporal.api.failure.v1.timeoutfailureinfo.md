# Class: TimeoutFailureInfo

[failure](../modules/proto.temporal.api.failure.md).[v1](../modules/proto.temporal.api.failure.v1.md).TimeoutFailureInfo

Represents a TimeoutFailureInfo.

## Implements

* [*ITimeoutFailureInfo*](../interfaces/proto.temporal.api.failure.v1.itimeoutfailureinfo.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.failure.v1.timeoutfailureinfo.md#constructor)

### Properties

- [lastHeartbeatDetails](proto.temporal.api.failure.v1.timeoutfailureinfo.md#lastheartbeatdetails)
- [timeoutType](proto.temporal.api.failure.v1.timeoutfailureinfo.md#timeouttype)

### Methods

- [toJSON](proto.temporal.api.failure.v1.timeoutfailureinfo.md#tojson)
- [create](proto.temporal.api.failure.v1.timeoutfailureinfo.md#create)
- [decode](proto.temporal.api.failure.v1.timeoutfailureinfo.md#decode)
- [decodeDelimited](proto.temporal.api.failure.v1.timeoutfailureinfo.md#decodedelimited)
- [encode](proto.temporal.api.failure.v1.timeoutfailureinfo.md#encode)
- [encodeDelimited](proto.temporal.api.failure.v1.timeoutfailureinfo.md#encodedelimited)
- [fromObject](proto.temporal.api.failure.v1.timeoutfailureinfo.md#fromobject)
- [toObject](proto.temporal.api.failure.v1.timeoutfailureinfo.md#toobject)
- [verify](proto.temporal.api.failure.v1.timeoutfailureinfo.md#verify)

## Constructors

### constructor

\+ **new TimeoutFailureInfo**(`properties?`: [*ITimeoutFailureInfo*](../interfaces/proto.temporal.api.failure.v1.itimeoutfailureinfo.md)): [*TimeoutFailureInfo*](proto.temporal.api.failure.v1.timeoutfailureinfo.md)

Constructs a new TimeoutFailureInfo.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ITimeoutFailureInfo*](../interfaces/proto.temporal.api.failure.v1.itimeoutfailureinfo.md) |

**Returns:** [*TimeoutFailureInfo*](proto.temporal.api.failure.v1.timeoutfailureinfo.md)

## Properties

### lastHeartbeatDetails

• `Optional` **lastHeartbeatDetails**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

TimeoutFailureInfo lastHeartbeatDetails.

Implementation of: [ITimeoutFailureInfo](../interfaces/proto.temporal.api.failure.v1.itimeoutfailureinfo.md).[lastHeartbeatDetails](../interfaces/proto.temporal.api.failure.v1.itimeoutfailureinfo.md#lastheartbeatdetails)

___

### timeoutType

• **timeoutType**: [*TimeoutType*](../enums/proto.temporal.api.enums.v1.timeouttype.md)

TimeoutFailureInfo timeoutType.

Implementation of: [ITimeoutFailureInfo](../interfaces/proto.temporal.api.failure.v1.itimeoutfailureinfo.md).[timeoutType](../interfaces/proto.temporal.api.failure.v1.itimeoutfailureinfo.md#timeouttype)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this TimeoutFailureInfo to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ITimeoutFailureInfo*](../interfaces/proto.temporal.api.failure.v1.itimeoutfailureinfo.md)): [*TimeoutFailureInfo*](proto.temporal.api.failure.v1.timeoutfailureinfo.md)

Creates a new TimeoutFailureInfo instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ITimeoutFailureInfo*](../interfaces/proto.temporal.api.failure.v1.itimeoutfailureinfo.md) |

**Returns:** [*TimeoutFailureInfo*](proto.temporal.api.failure.v1.timeoutfailureinfo.md)

TimeoutFailureInfo instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*TimeoutFailureInfo*](proto.temporal.api.failure.v1.timeoutfailureinfo.md)

Decodes a TimeoutFailureInfo message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*TimeoutFailureInfo*](proto.temporal.api.failure.v1.timeoutfailureinfo.md)

TimeoutFailureInfo

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*TimeoutFailureInfo*](proto.temporal.api.failure.v1.timeoutfailureinfo.md)

Decodes a TimeoutFailureInfo message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*TimeoutFailureInfo*](proto.temporal.api.failure.v1.timeoutfailureinfo.md)

TimeoutFailureInfo

___

### encode

▸ `Static`**encode**(`message`: [*ITimeoutFailureInfo*](../interfaces/proto.temporal.api.failure.v1.itimeoutfailureinfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified TimeoutFailureInfo message. Does not implicitly [verify](proto.temporal.api.failure.v1.timeoutfailureinfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ITimeoutFailureInfo*](../interfaces/proto.temporal.api.failure.v1.itimeoutfailureinfo.md) | TimeoutFailureInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ITimeoutFailureInfo*](../interfaces/proto.temporal.api.failure.v1.itimeoutfailureinfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified TimeoutFailureInfo message, length delimited. Does not implicitly [verify](proto.temporal.api.failure.v1.timeoutfailureinfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ITimeoutFailureInfo*](../interfaces/proto.temporal.api.failure.v1.itimeoutfailureinfo.md) | TimeoutFailureInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*TimeoutFailureInfo*](proto.temporal.api.failure.v1.timeoutfailureinfo.md)

Creates a TimeoutFailureInfo message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*TimeoutFailureInfo*](proto.temporal.api.failure.v1.timeoutfailureinfo.md)

TimeoutFailureInfo

___

### toObject

▸ `Static`**toObject**(`message`: [*TimeoutFailureInfo*](proto.temporal.api.failure.v1.timeoutfailureinfo.md), `options?`: IConversionOptions): *object*

Creates a plain object from a TimeoutFailureInfo message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*TimeoutFailureInfo*](proto.temporal.api.failure.v1.timeoutfailureinfo.md) | TimeoutFailureInfo   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a TimeoutFailureInfo message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
