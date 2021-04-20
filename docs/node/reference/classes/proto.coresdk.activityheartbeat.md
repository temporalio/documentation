# Class: ActivityHeartbeat

[proto](../modules/proto.md).[coresdk](../modules/proto.coresdk.md).ActivityHeartbeat

Represents an ActivityHeartbeat.

## Implements

* [*IActivityHeartbeat*](../interfaces/proto.coresdk.iactivityheartbeat.md)

## Table of contents

### Constructors

- [constructor](proto.coresdk.activityheartbeat.md#constructor)

### Properties

- [activityId](proto.coresdk.activityheartbeat.md#activityid)
- [details](proto.coresdk.activityheartbeat.md#details)

### Methods

- [toJSON](proto.coresdk.activityheartbeat.md#tojson)
- [create](proto.coresdk.activityheartbeat.md#create)
- [decode](proto.coresdk.activityheartbeat.md#decode)
- [decodeDelimited](proto.coresdk.activityheartbeat.md#decodedelimited)
- [encode](proto.coresdk.activityheartbeat.md#encode)
- [encodeDelimited](proto.coresdk.activityheartbeat.md#encodedelimited)
- [fromObject](proto.coresdk.activityheartbeat.md#fromobject)
- [toObject](proto.coresdk.activityheartbeat.md#toobject)
- [verify](proto.coresdk.activityheartbeat.md#verify)

## Constructors

### constructor

\+ **new ActivityHeartbeat**(`properties?`: [*IActivityHeartbeat*](../interfaces/proto.coresdk.iactivityheartbeat.md)): [*ActivityHeartbeat*](proto.coresdk.activityheartbeat.md)

Constructs a new ActivityHeartbeat.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IActivityHeartbeat*](../interfaces/proto.coresdk.iactivityheartbeat.md) |

**Returns:** [*ActivityHeartbeat*](proto.coresdk.activityheartbeat.md)

## Properties

### activityId

• **activityId**: *string*

ActivityHeartbeat activityId.

Implementation of: [IActivityHeartbeat](../interfaces/proto.coresdk.iactivityheartbeat.md).[activityId](../interfaces/proto.coresdk.iactivityheartbeat.md#activityid)

___

### details

• **details**: [*IPayload*](../interfaces/proto.coresdk.common.ipayload.md)[]

ActivityHeartbeat details.

Implementation of: [IActivityHeartbeat](../interfaces/proto.coresdk.iactivityheartbeat.md).[details](../interfaces/proto.coresdk.iactivityheartbeat.md#details)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ActivityHeartbeat to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IActivityHeartbeat*](../interfaces/proto.coresdk.iactivityheartbeat.md)): [*ActivityHeartbeat*](proto.coresdk.activityheartbeat.md)

Creates a new ActivityHeartbeat instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IActivityHeartbeat*](../interfaces/proto.coresdk.iactivityheartbeat.md) |

**Returns:** [*ActivityHeartbeat*](proto.coresdk.activityheartbeat.md)

ActivityHeartbeat instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ActivityHeartbeat*](proto.coresdk.activityheartbeat.md)

Decodes an ActivityHeartbeat message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ActivityHeartbeat*](proto.coresdk.activityheartbeat.md)

ActivityHeartbeat

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ActivityHeartbeat*](proto.coresdk.activityheartbeat.md)

Decodes an ActivityHeartbeat message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ActivityHeartbeat*](proto.coresdk.activityheartbeat.md)

ActivityHeartbeat

___

### encode

▸ `Static`**encode**(`message`: [*IActivityHeartbeat*](../interfaces/proto.coresdk.iactivityheartbeat.md), `writer?`: *Writer*): *Writer*

Encodes the specified ActivityHeartbeat message. Does not implicitly [verify](proto.coresdk.activityheartbeat.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IActivityHeartbeat*](../interfaces/proto.coresdk.iactivityheartbeat.md) | ActivityHeartbeat message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IActivityHeartbeat*](../interfaces/proto.coresdk.iactivityheartbeat.md), `writer?`: *Writer*): *Writer*

Encodes the specified ActivityHeartbeat message, length delimited. Does not implicitly [verify](proto.coresdk.activityheartbeat.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IActivityHeartbeat*](../interfaces/proto.coresdk.iactivityheartbeat.md) | ActivityHeartbeat message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ActivityHeartbeat*](proto.coresdk.activityheartbeat.md)

Creates an ActivityHeartbeat message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ActivityHeartbeat*](proto.coresdk.activityheartbeat.md)

ActivityHeartbeat

___

### toObject

▸ `Static`**toObject**(`message`: [*ActivityHeartbeat*](proto.coresdk.activityheartbeat.md), `options?`: IConversionOptions): *object*

Creates a plain object from an ActivityHeartbeat message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ActivityHeartbeat*](proto.coresdk.activityheartbeat.md) | ActivityHeartbeat   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an ActivityHeartbeat message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
