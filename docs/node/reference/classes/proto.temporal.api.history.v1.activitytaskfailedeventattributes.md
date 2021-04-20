# Class: ActivityTaskFailedEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).ActivityTaskFailedEventAttributes

Represents an ActivityTaskFailedEventAttributes.

## Implements

* [*IActivityTaskFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskfailedeventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.activitytaskfailedeventattributes.md#constructor)

### Properties

- [failure](proto.temporal.api.history.v1.activitytaskfailedeventattributes.md#failure)
- [identity](proto.temporal.api.history.v1.activitytaskfailedeventattributes.md#identity)
- [retryState](proto.temporal.api.history.v1.activitytaskfailedeventattributes.md#retrystate)
- [scheduledEventId](proto.temporal.api.history.v1.activitytaskfailedeventattributes.md#scheduledeventid)
- [startedEventId](proto.temporal.api.history.v1.activitytaskfailedeventattributes.md#startedeventid)

### Methods

- [toJSON](proto.temporal.api.history.v1.activitytaskfailedeventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.activitytaskfailedeventattributes.md#create)
- [decode](proto.temporal.api.history.v1.activitytaskfailedeventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.activitytaskfailedeventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.activitytaskfailedeventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.activitytaskfailedeventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.activitytaskfailedeventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.activitytaskfailedeventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.activitytaskfailedeventattributes.md#verify)

## Constructors

### constructor

\+ **new ActivityTaskFailedEventAttributes**(`properties?`: [*IActivityTaskFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskfailedeventattributes.md)): [*ActivityTaskFailedEventAttributes*](proto.temporal.api.history.v1.activitytaskfailedeventattributes.md)

Constructs a new ActivityTaskFailedEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IActivityTaskFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskfailedeventattributes.md) |

**Returns:** [*ActivityTaskFailedEventAttributes*](proto.temporal.api.history.v1.activitytaskfailedeventattributes.md)

## Properties

### failure

• `Optional` **failure**: *null* \| [*IFailure*](../interfaces/proto.temporal.api.failure.v1.ifailure.md)

ActivityTaskFailedEventAttributes failure.

Implementation of: [IActivityTaskFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytaskfailedeventattributes.md).[failure](../interfaces/proto.temporal.api.history.v1.iactivitytaskfailedeventattributes.md#failure)

___

### identity

• **identity**: *string*

ActivityTaskFailedEventAttributes identity.

Implementation of: [IActivityTaskFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytaskfailedeventattributes.md).[identity](../interfaces/proto.temporal.api.history.v1.iactivitytaskfailedeventattributes.md#identity)

___

### retryState

• **retryState**: [*RetryState*](../enums/proto.temporal.api.enums.v1.retrystate.md)

ActivityTaskFailedEventAttributes retryState.

Implementation of: [IActivityTaskFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytaskfailedeventattributes.md).[retryState](../interfaces/proto.temporal.api.history.v1.iactivitytaskfailedeventattributes.md#retrystate)

___

### scheduledEventId

• **scheduledEventId**: Long

ActivityTaskFailedEventAttributes scheduledEventId.

Implementation of: [IActivityTaskFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytaskfailedeventattributes.md).[scheduledEventId](../interfaces/proto.temporal.api.history.v1.iactivitytaskfailedeventattributes.md#scheduledeventid)

___

### startedEventId

• **startedEventId**: Long

ActivityTaskFailedEventAttributes startedEventId.

Implementation of: [IActivityTaskFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytaskfailedeventattributes.md).[startedEventId](../interfaces/proto.temporal.api.history.v1.iactivitytaskfailedeventattributes.md#startedeventid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ActivityTaskFailedEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IActivityTaskFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskfailedeventattributes.md)): [*ActivityTaskFailedEventAttributes*](proto.temporal.api.history.v1.activitytaskfailedeventattributes.md)

Creates a new ActivityTaskFailedEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IActivityTaskFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskfailedeventattributes.md) |

**Returns:** [*ActivityTaskFailedEventAttributes*](proto.temporal.api.history.v1.activitytaskfailedeventattributes.md)

ActivityTaskFailedEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ActivityTaskFailedEventAttributes*](proto.temporal.api.history.v1.activitytaskfailedeventattributes.md)

Decodes an ActivityTaskFailedEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ActivityTaskFailedEventAttributes*](proto.temporal.api.history.v1.activitytaskfailedeventattributes.md)

ActivityTaskFailedEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ActivityTaskFailedEventAttributes*](proto.temporal.api.history.v1.activitytaskfailedeventattributes.md)

Decodes an ActivityTaskFailedEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ActivityTaskFailedEventAttributes*](proto.temporal.api.history.v1.activitytaskfailedeventattributes.md)

ActivityTaskFailedEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IActivityTaskFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskfailedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified ActivityTaskFailedEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.activitytaskfailedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IActivityTaskFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskfailedeventattributes.md) | ActivityTaskFailedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IActivityTaskFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskfailedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified ActivityTaskFailedEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.activitytaskfailedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IActivityTaskFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskfailedeventattributes.md) | ActivityTaskFailedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ActivityTaskFailedEventAttributes*](proto.temporal.api.history.v1.activitytaskfailedeventattributes.md)

Creates an ActivityTaskFailedEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ActivityTaskFailedEventAttributes*](proto.temporal.api.history.v1.activitytaskfailedeventattributes.md)

ActivityTaskFailedEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*ActivityTaskFailedEventAttributes*](proto.temporal.api.history.v1.activitytaskfailedeventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from an ActivityTaskFailedEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ActivityTaskFailedEventAttributes*](proto.temporal.api.history.v1.activitytaskfailedeventattributes.md) | ActivityTaskFailedEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an ActivityTaskFailedEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
