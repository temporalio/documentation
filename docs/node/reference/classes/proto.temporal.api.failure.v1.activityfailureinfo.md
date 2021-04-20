# Class: ActivityFailureInfo

[failure](../modules/proto.temporal.api.failure.md).[v1](../modules/proto.temporal.api.failure.v1.md).ActivityFailureInfo

Represents an ActivityFailureInfo.

## Implements

* [*IActivityFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iactivityfailureinfo.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.failure.v1.activityfailureinfo.md#constructor)

### Properties

- [activityId](proto.temporal.api.failure.v1.activityfailureinfo.md#activityid)
- [activityType](proto.temporal.api.failure.v1.activityfailureinfo.md#activitytype)
- [identity](proto.temporal.api.failure.v1.activityfailureinfo.md#identity)
- [retryState](proto.temporal.api.failure.v1.activityfailureinfo.md#retrystate)
- [scheduledEventId](proto.temporal.api.failure.v1.activityfailureinfo.md#scheduledeventid)
- [startedEventId](proto.temporal.api.failure.v1.activityfailureinfo.md#startedeventid)

### Methods

- [toJSON](proto.temporal.api.failure.v1.activityfailureinfo.md#tojson)
- [create](proto.temporal.api.failure.v1.activityfailureinfo.md#create)
- [decode](proto.temporal.api.failure.v1.activityfailureinfo.md#decode)
- [decodeDelimited](proto.temporal.api.failure.v1.activityfailureinfo.md#decodedelimited)
- [encode](proto.temporal.api.failure.v1.activityfailureinfo.md#encode)
- [encodeDelimited](proto.temporal.api.failure.v1.activityfailureinfo.md#encodedelimited)
- [fromObject](proto.temporal.api.failure.v1.activityfailureinfo.md#fromobject)
- [toObject](proto.temporal.api.failure.v1.activityfailureinfo.md#toobject)
- [verify](proto.temporal.api.failure.v1.activityfailureinfo.md#verify)

## Constructors

### constructor

\+ **new ActivityFailureInfo**(`properties?`: [*IActivityFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iactivityfailureinfo.md)): [*ActivityFailureInfo*](proto.temporal.api.failure.v1.activityfailureinfo.md)

Constructs a new ActivityFailureInfo.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IActivityFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iactivityfailureinfo.md) |

**Returns:** [*ActivityFailureInfo*](proto.temporal.api.failure.v1.activityfailureinfo.md)

## Properties

### activityId

• **activityId**: *string*

ActivityFailureInfo activityId.

Implementation of: [IActivityFailureInfo](../interfaces/proto.temporal.api.failure.v1.iactivityfailureinfo.md).[activityId](../interfaces/proto.temporal.api.failure.v1.iactivityfailureinfo.md#activityid)

___

### activityType

• `Optional` **activityType**: *null* \| [*IActivityType*](../interfaces/proto.temporal.api.common.v1.iactivitytype.md)

ActivityFailureInfo activityType.

Implementation of: [IActivityFailureInfo](../interfaces/proto.temporal.api.failure.v1.iactivityfailureinfo.md).[activityType](../interfaces/proto.temporal.api.failure.v1.iactivityfailureinfo.md#activitytype)

___

### identity

• **identity**: *string*

ActivityFailureInfo identity.

Implementation of: [IActivityFailureInfo](../interfaces/proto.temporal.api.failure.v1.iactivityfailureinfo.md).[identity](../interfaces/proto.temporal.api.failure.v1.iactivityfailureinfo.md#identity)

___

### retryState

• **retryState**: [*RetryState*](../enums/proto.temporal.api.enums.v1.retrystate.md)

ActivityFailureInfo retryState.

Implementation of: [IActivityFailureInfo](../interfaces/proto.temporal.api.failure.v1.iactivityfailureinfo.md).[retryState](../interfaces/proto.temporal.api.failure.v1.iactivityfailureinfo.md#retrystate)

___

### scheduledEventId

• **scheduledEventId**: Long

ActivityFailureInfo scheduledEventId.

Implementation of: [IActivityFailureInfo](../interfaces/proto.temporal.api.failure.v1.iactivityfailureinfo.md).[scheduledEventId](../interfaces/proto.temporal.api.failure.v1.iactivityfailureinfo.md#scheduledeventid)

___

### startedEventId

• **startedEventId**: Long

ActivityFailureInfo startedEventId.

Implementation of: [IActivityFailureInfo](../interfaces/proto.temporal.api.failure.v1.iactivityfailureinfo.md).[startedEventId](../interfaces/proto.temporal.api.failure.v1.iactivityfailureinfo.md#startedeventid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ActivityFailureInfo to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IActivityFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iactivityfailureinfo.md)): [*ActivityFailureInfo*](proto.temporal.api.failure.v1.activityfailureinfo.md)

Creates a new ActivityFailureInfo instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IActivityFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iactivityfailureinfo.md) |

**Returns:** [*ActivityFailureInfo*](proto.temporal.api.failure.v1.activityfailureinfo.md)

ActivityFailureInfo instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ActivityFailureInfo*](proto.temporal.api.failure.v1.activityfailureinfo.md)

Decodes an ActivityFailureInfo message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ActivityFailureInfo*](proto.temporal.api.failure.v1.activityfailureinfo.md)

ActivityFailureInfo

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ActivityFailureInfo*](proto.temporal.api.failure.v1.activityfailureinfo.md)

Decodes an ActivityFailureInfo message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ActivityFailureInfo*](proto.temporal.api.failure.v1.activityfailureinfo.md)

ActivityFailureInfo

___

### encode

▸ `Static`**encode**(`message`: [*IActivityFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iactivityfailureinfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified ActivityFailureInfo message. Does not implicitly [verify](proto.temporal.api.failure.v1.activityfailureinfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IActivityFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iactivityfailureinfo.md) | ActivityFailureInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IActivityFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iactivityfailureinfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified ActivityFailureInfo message, length delimited. Does not implicitly [verify](proto.temporal.api.failure.v1.activityfailureinfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IActivityFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iactivityfailureinfo.md) | ActivityFailureInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ActivityFailureInfo*](proto.temporal.api.failure.v1.activityfailureinfo.md)

Creates an ActivityFailureInfo message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ActivityFailureInfo*](proto.temporal.api.failure.v1.activityfailureinfo.md)

ActivityFailureInfo

___

### toObject

▸ `Static`**toObject**(`message`: [*ActivityFailureInfo*](proto.temporal.api.failure.v1.activityfailureinfo.md), `options?`: IConversionOptions): *object*

Creates a plain object from an ActivityFailureInfo message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ActivityFailureInfo*](proto.temporal.api.failure.v1.activityfailureinfo.md) | ActivityFailureInfo   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an ActivityFailureInfo message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
