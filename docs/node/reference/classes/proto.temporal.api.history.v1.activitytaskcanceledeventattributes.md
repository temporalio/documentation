# Class: ActivityTaskCanceledEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).ActivityTaskCanceledEventAttributes

Represents an ActivityTaskCanceledEventAttributes.

## Implements

* [*IActivityTaskCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskcanceledeventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.activitytaskcanceledeventattributes.md#constructor)

### Properties

- [details](proto.temporal.api.history.v1.activitytaskcanceledeventattributes.md#details)
- [identity](proto.temporal.api.history.v1.activitytaskcanceledeventattributes.md#identity)
- [latestCancelRequestedEventId](proto.temporal.api.history.v1.activitytaskcanceledeventattributes.md#latestcancelrequestedeventid)
- [scheduledEventId](proto.temporal.api.history.v1.activitytaskcanceledeventattributes.md#scheduledeventid)
- [startedEventId](proto.temporal.api.history.v1.activitytaskcanceledeventattributes.md#startedeventid)

### Methods

- [toJSON](proto.temporal.api.history.v1.activitytaskcanceledeventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.activitytaskcanceledeventattributes.md#create)
- [decode](proto.temporal.api.history.v1.activitytaskcanceledeventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.activitytaskcanceledeventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.activitytaskcanceledeventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.activitytaskcanceledeventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.activitytaskcanceledeventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.activitytaskcanceledeventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.activitytaskcanceledeventattributes.md#verify)

## Constructors

### constructor

\+ **new ActivityTaskCanceledEventAttributes**(`properties?`: [*IActivityTaskCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskcanceledeventattributes.md)): [*ActivityTaskCanceledEventAttributes*](proto.temporal.api.history.v1.activitytaskcanceledeventattributes.md)

Constructs a new ActivityTaskCanceledEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IActivityTaskCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskcanceledeventattributes.md) |

**Returns:** [*ActivityTaskCanceledEventAttributes*](proto.temporal.api.history.v1.activitytaskcanceledeventattributes.md)

## Properties

### details

• `Optional` **details**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

ActivityTaskCanceledEventAttributes details.

Implementation of: [IActivityTaskCanceledEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytaskcanceledeventattributes.md).[details](../interfaces/proto.temporal.api.history.v1.iactivitytaskcanceledeventattributes.md#details)

___

### identity

• **identity**: *string*

ActivityTaskCanceledEventAttributes identity.

Implementation of: [IActivityTaskCanceledEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytaskcanceledeventattributes.md).[identity](../interfaces/proto.temporal.api.history.v1.iactivitytaskcanceledeventattributes.md#identity)

___

### latestCancelRequestedEventId

• **latestCancelRequestedEventId**: Long

ActivityTaskCanceledEventAttributes latestCancelRequestedEventId.

Implementation of: [IActivityTaskCanceledEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytaskcanceledeventattributes.md).[latestCancelRequestedEventId](../interfaces/proto.temporal.api.history.v1.iactivitytaskcanceledeventattributes.md#latestcancelrequestedeventid)

___

### scheduledEventId

• **scheduledEventId**: Long

ActivityTaskCanceledEventAttributes scheduledEventId.

Implementation of: [IActivityTaskCanceledEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytaskcanceledeventattributes.md).[scheduledEventId](../interfaces/proto.temporal.api.history.v1.iactivitytaskcanceledeventattributes.md#scheduledeventid)

___

### startedEventId

• **startedEventId**: Long

ActivityTaskCanceledEventAttributes startedEventId.

Implementation of: [IActivityTaskCanceledEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytaskcanceledeventattributes.md).[startedEventId](../interfaces/proto.temporal.api.history.v1.iactivitytaskcanceledeventattributes.md#startedeventid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ActivityTaskCanceledEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IActivityTaskCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskcanceledeventattributes.md)): [*ActivityTaskCanceledEventAttributes*](proto.temporal.api.history.v1.activitytaskcanceledeventattributes.md)

Creates a new ActivityTaskCanceledEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IActivityTaskCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskcanceledeventattributes.md) |

**Returns:** [*ActivityTaskCanceledEventAttributes*](proto.temporal.api.history.v1.activitytaskcanceledeventattributes.md)

ActivityTaskCanceledEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ActivityTaskCanceledEventAttributes*](proto.temporal.api.history.v1.activitytaskcanceledeventattributes.md)

Decodes an ActivityTaskCanceledEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ActivityTaskCanceledEventAttributes*](proto.temporal.api.history.v1.activitytaskcanceledeventattributes.md)

ActivityTaskCanceledEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ActivityTaskCanceledEventAttributes*](proto.temporal.api.history.v1.activitytaskcanceledeventattributes.md)

Decodes an ActivityTaskCanceledEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ActivityTaskCanceledEventAttributes*](proto.temporal.api.history.v1.activitytaskcanceledeventattributes.md)

ActivityTaskCanceledEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IActivityTaskCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskcanceledeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified ActivityTaskCanceledEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.activitytaskcanceledeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IActivityTaskCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskcanceledeventattributes.md) | ActivityTaskCanceledEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IActivityTaskCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskcanceledeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified ActivityTaskCanceledEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.activitytaskcanceledeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IActivityTaskCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskcanceledeventattributes.md) | ActivityTaskCanceledEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ActivityTaskCanceledEventAttributes*](proto.temporal.api.history.v1.activitytaskcanceledeventattributes.md)

Creates an ActivityTaskCanceledEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ActivityTaskCanceledEventAttributes*](proto.temporal.api.history.v1.activitytaskcanceledeventattributes.md)

ActivityTaskCanceledEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*ActivityTaskCanceledEventAttributes*](proto.temporal.api.history.v1.activitytaskcanceledeventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from an ActivityTaskCanceledEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ActivityTaskCanceledEventAttributes*](proto.temporal.api.history.v1.activitytaskcanceledeventattributes.md) | ActivityTaskCanceledEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an ActivityTaskCanceledEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
