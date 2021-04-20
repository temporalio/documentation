# Class: ActivityTaskStartedEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).ActivityTaskStartedEventAttributes

Represents an ActivityTaskStartedEventAttributes.

## Implements

* [*IActivityTaskStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskstartedeventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.activitytaskstartedeventattributes.md#constructor)

### Properties

- [attempt](proto.temporal.api.history.v1.activitytaskstartedeventattributes.md#attempt)
- [identity](proto.temporal.api.history.v1.activitytaskstartedeventattributes.md#identity)
- [lastFailure](proto.temporal.api.history.v1.activitytaskstartedeventattributes.md#lastfailure)
- [requestId](proto.temporal.api.history.v1.activitytaskstartedeventattributes.md#requestid)
- [scheduledEventId](proto.temporal.api.history.v1.activitytaskstartedeventattributes.md#scheduledeventid)

### Methods

- [toJSON](proto.temporal.api.history.v1.activitytaskstartedeventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.activitytaskstartedeventattributes.md#create)
- [decode](proto.temporal.api.history.v1.activitytaskstartedeventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.activitytaskstartedeventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.activitytaskstartedeventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.activitytaskstartedeventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.activitytaskstartedeventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.activitytaskstartedeventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.activitytaskstartedeventattributes.md#verify)

## Constructors

### constructor

\+ **new ActivityTaskStartedEventAttributes**(`properties?`: [*IActivityTaskStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskstartedeventattributes.md)): [*ActivityTaskStartedEventAttributes*](proto.temporal.api.history.v1.activitytaskstartedeventattributes.md)

Constructs a new ActivityTaskStartedEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IActivityTaskStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskstartedeventattributes.md) |

**Returns:** [*ActivityTaskStartedEventAttributes*](proto.temporal.api.history.v1.activitytaskstartedeventattributes.md)

## Properties

### attempt

• **attempt**: *number*

ActivityTaskStartedEventAttributes attempt.

Implementation of: [IActivityTaskStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytaskstartedeventattributes.md).[attempt](../interfaces/proto.temporal.api.history.v1.iactivitytaskstartedeventattributes.md#attempt)

___

### identity

• **identity**: *string*

ActivityTaskStartedEventAttributes identity.

Implementation of: [IActivityTaskStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytaskstartedeventattributes.md).[identity](../interfaces/proto.temporal.api.history.v1.iactivitytaskstartedeventattributes.md#identity)

___

### lastFailure

• `Optional` **lastFailure**: *null* \| [*IFailure*](../interfaces/proto.temporal.api.failure.v1.ifailure.md)

ActivityTaskStartedEventAttributes lastFailure.

Implementation of: [IActivityTaskStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytaskstartedeventattributes.md).[lastFailure](../interfaces/proto.temporal.api.history.v1.iactivitytaskstartedeventattributes.md#lastfailure)

___

### requestId

• **requestId**: *string*

ActivityTaskStartedEventAttributes requestId.

Implementation of: [IActivityTaskStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytaskstartedeventattributes.md).[requestId](../interfaces/proto.temporal.api.history.v1.iactivitytaskstartedeventattributes.md#requestid)

___

### scheduledEventId

• **scheduledEventId**: Long

ActivityTaskStartedEventAttributes scheduledEventId.

Implementation of: [IActivityTaskStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytaskstartedeventattributes.md).[scheduledEventId](../interfaces/proto.temporal.api.history.v1.iactivitytaskstartedeventattributes.md#scheduledeventid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ActivityTaskStartedEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IActivityTaskStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskstartedeventattributes.md)): [*ActivityTaskStartedEventAttributes*](proto.temporal.api.history.v1.activitytaskstartedeventattributes.md)

Creates a new ActivityTaskStartedEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IActivityTaskStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskstartedeventattributes.md) |

**Returns:** [*ActivityTaskStartedEventAttributes*](proto.temporal.api.history.v1.activitytaskstartedeventattributes.md)

ActivityTaskStartedEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ActivityTaskStartedEventAttributes*](proto.temporal.api.history.v1.activitytaskstartedeventattributes.md)

Decodes an ActivityTaskStartedEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ActivityTaskStartedEventAttributes*](proto.temporal.api.history.v1.activitytaskstartedeventattributes.md)

ActivityTaskStartedEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ActivityTaskStartedEventAttributes*](proto.temporal.api.history.v1.activitytaskstartedeventattributes.md)

Decodes an ActivityTaskStartedEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ActivityTaskStartedEventAttributes*](proto.temporal.api.history.v1.activitytaskstartedeventattributes.md)

ActivityTaskStartedEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IActivityTaskStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskstartedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified ActivityTaskStartedEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.activitytaskstartedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IActivityTaskStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskstartedeventattributes.md) | ActivityTaskStartedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IActivityTaskStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskstartedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified ActivityTaskStartedEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.activitytaskstartedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IActivityTaskStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskstartedeventattributes.md) | ActivityTaskStartedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ActivityTaskStartedEventAttributes*](proto.temporal.api.history.v1.activitytaskstartedeventattributes.md)

Creates an ActivityTaskStartedEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ActivityTaskStartedEventAttributes*](proto.temporal.api.history.v1.activitytaskstartedeventattributes.md)

ActivityTaskStartedEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*ActivityTaskStartedEventAttributes*](proto.temporal.api.history.v1.activitytaskstartedeventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from an ActivityTaskStartedEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ActivityTaskStartedEventAttributes*](proto.temporal.api.history.v1.activitytaskstartedeventattributes.md) | ActivityTaskStartedEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an ActivityTaskStartedEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
