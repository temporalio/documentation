# Class: ActivityTaskTimedOutEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).ActivityTaskTimedOutEventAttributes

Represents an ActivityTaskTimedOutEventAttributes.

## Implements

* [*IActivityTaskTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytasktimedouteventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.activitytasktimedouteventattributes.md#constructor)

### Properties

- [failure](proto.temporal.api.history.v1.activitytasktimedouteventattributes.md#failure)
- [retryState](proto.temporal.api.history.v1.activitytasktimedouteventattributes.md#retrystate)
- [scheduledEventId](proto.temporal.api.history.v1.activitytasktimedouteventattributes.md#scheduledeventid)
- [startedEventId](proto.temporal.api.history.v1.activitytasktimedouteventattributes.md#startedeventid)

### Methods

- [toJSON](proto.temporal.api.history.v1.activitytasktimedouteventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.activitytasktimedouteventattributes.md#create)
- [decode](proto.temporal.api.history.v1.activitytasktimedouteventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.activitytasktimedouteventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.activitytasktimedouteventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.activitytasktimedouteventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.activitytasktimedouteventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.activitytasktimedouteventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.activitytasktimedouteventattributes.md#verify)

## Constructors

### constructor

\+ **new ActivityTaskTimedOutEventAttributes**(`properties?`: [*IActivityTaskTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytasktimedouteventattributes.md)): [*ActivityTaskTimedOutEventAttributes*](proto.temporal.api.history.v1.activitytasktimedouteventattributes.md)

Constructs a new ActivityTaskTimedOutEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IActivityTaskTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytasktimedouteventattributes.md) |

**Returns:** [*ActivityTaskTimedOutEventAttributes*](proto.temporal.api.history.v1.activitytasktimedouteventattributes.md)

## Properties

### failure

• `Optional` **failure**: *null* \| [*IFailure*](../interfaces/proto.temporal.api.failure.v1.ifailure.md)

ActivityTaskTimedOutEventAttributes failure.

Implementation of: [IActivityTaskTimedOutEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytasktimedouteventattributes.md).[failure](../interfaces/proto.temporal.api.history.v1.iactivitytasktimedouteventattributes.md#failure)

___

### retryState

• **retryState**: [*RetryState*](../enums/proto.temporal.api.enums.v1.retrystate.md)

ActivityTaskTimedOutEventAttributes retryState.

Implementation of: [IActivityTaskTimedOutEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytasktimedouteventattributes.md).[retryState](../interfaces/proto.temporal.api.history.v1.iactivitytasktimedouteventattributes.md#retrystate)

___

### scheduledEventId

• **scheduledEventId**: Long

ActivityTaskTimedOutEventAttributes scheduledEventId.

Implementation of: [IActivityTaskTimedOutEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytasktimedouteventattributes.md).[scheduledEventId](../interfaces/proto.temporal.api.history.v1.iactivitytasktimedouteventattributes.md#scheduledeventid)

___

### startedEventId

• **startedEventId**: Long

ActivityTaskTimedOutEventAttributes startedEventId.

Implementation of: [IActivityTaskTimedOutEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytasktimedouteventattributes.md).[startedEventId](../interfaces/proto.temporal.api.history.v1.iactivitytasktimedouteventattributes.md#startedeventid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ActivityTaskTimedOutEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IActivityTaskTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytasktimedouteventattributes.md)): [*ActivityTaskTimedOutEventAttributes*](proto.temporal.api.history.v1.activitytasktimedouteventattributes.md)

Creates a new ActivityTaskTimedOutEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IActivityTaskTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytasktimedouteventattributes.md) |

**Returns:** [*ActivityTaskTimedOutEventAttributes*](proto.temporal.api.history.v1.activitytasktimedouteventattributes.md)

ActivityTaskTimedOutEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ActivityTaskTimedOutEventAttributes*](proto.temporal.api.history.v1.activitytasktimedouteventattributes.md)

Decodes an ActivityTaskTimedOutEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ActivityTaskTimedOutEventAttributes*](proto.temporal.api.history.v1.activitytasktimedouteventattributes.md)

ActivityTaskTimedOutEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ActivityTaskTimedOutEventAttributes*](proto.temporal.api.history.v1.activitytasktimedouteventattributes.md)

Decodes an ActivityTaskTimedOutEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ActivityTaskTimedOutEventAttributes*](proto.temporal.api.history.v1.activitytasktimedouteventattributes.md)

ActivityTaskTimedOutEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IActivityTaskTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytasktimedouteventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified ActivityTaskTimedOutEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.activitytasktimedouteventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IActivityTaskTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytasktimedouteventattributes.md) | ActivityTaskTimedOutEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IActivityTaskTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytasktimedouteventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified ActivityTaskTimedOutEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.activitytasktimedouteventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IActivityTaskTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytasktimedouteventattributes.md) | ActivityTaskTimedOutEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ActivityTaskTimedOutEventAttributes*](proto.temporal.api.history.v1.activitytasktimedouteventattributes.md)

Creates an ActivityTaskTimedOutEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ActivityTaskTimedOutEventAttributes*](proto.temporal.api.history.v1.activitytasktimedouteventattributes.md)

ActivityTaskTimedOutEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*ActivityTaskTimedOutEventAttributes*](proto.temporal.api.history.v1.activitytasktimedouteventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from an ActivityTaskTimedOutEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ActivityTaskTimedOutEventAttributes*](proto.temporal.api.history.v1.activitytasktimedouteventattributes.md) | ActivityTaskTimedOutEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an ActivityTaskTimedOutEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
