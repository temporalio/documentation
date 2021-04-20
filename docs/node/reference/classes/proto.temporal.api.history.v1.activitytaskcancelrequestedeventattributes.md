# Class: ActivityTaskCancelRequestedEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).ActivityTaskCancelRequestedEventAttributes

Represents an ActivityTaskCancelRequestedEventAttributes.

## Implements

* [*IActivityTaskCancelRequestedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskcancelrequestedeventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.activitytaskcancelrequestedeventattributes.md#constructor)

### Properties

- [scheduledEventId](proto.temporal.api.history.v1.activitytaskcancelrequestedeventattributes.md#scheduledeventid)
- [workflowTaskCompletedEventId](proto.temporal.api.history.v1.activitytaskcancelrequestedeventattributes.md#workflowtaskcompletedeventid)

### Methods

- [toJSON](proto.temporal.api.history.v1.activitytaskcancelrequestedeventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.activitytaskcancelrequestedeventattributes.md#create)
- [decode](proto.temporal.api.history.v1.activitytaskcancelrequestedeventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.activitytaskcancelrequestedeventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.activitytaskcancelrequestedeventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.activitytaskcancelrequestedeventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.activitytaskcancelrequestedeventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.activitytaskcancelrequestedeventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.activitytaskcancelrequestedeventattributes.md#verify)

## Constructors

### constructor

\+ **new ActivityTaskCancelRequestedEventAttributes**(`properties?`: [*IActivityTaskCancelRequestedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskcancelrequestedeventattributes.md)): [*ActivityTaskCancelRequestedEventAttributes*](proto.temporal.api.history.v1.activitytaskcancelrequestedeventattributes.md)

Constructs a new ActivityTaskCancelRequestedEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IActivityTaskCancelRequestedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskcancelrequestedeventattributes.md) |

**Returns:** [*ActivityTaskCancelRequestedEventAttributes*](proto.temporal.api.history.v1.activitytaskcancelrequestedeventattributes.md)

## Properties

### scheduledEventId

• **scheduledEventId**: Long

ActivityTaskCancelRequestedEventAttributes scheduledEventId.

Implementation of: [IActivityTaskCancelRequestedEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytaskcancelrequestedeventattributes.md).[scheduledEventId](../interfaces/proto.temporal.api.history.v1.iactivitytaskcancelrequestedeventattributes.md#scheduledeventid)

___

### workflowTaskCompletedEventId

• **workflowTaskCompletedEventId**: Long

ActivityTaskCancelRequestedEventAttributes workflowTaskCompletedEventId.

Implementation of: [IActivityTaskCancelRequestedEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytaskcancelrequestedeventattributes.md).[workflowTaskCompletedEventId](../interfaces/proto.temporal.api.history.v1.iactivitytaskcancelrequestedeventattributes.md#workflowtaskcompletedeventid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ActivityTaskCancelRequestedEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IActivityTaskCancelRequestedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskcancelrequestedeventattributes.md)): [*ActivityTaskCancelRequestedEventAttributes*](proto.temporal.api.history.v1.activitytaskcancelrequestedeventattributes.md)

Creates a new ActivityTaskCancelRequestedEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IActivityTaskCancelRequestedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskcancelrequestedeventattributes.md) |

**Returns:** [*ActivityTaskCancelRequestedEventAttributes*](proto.temporal.api.history.v1.activitytaskcancelrequestedeventattributes.md)

ActivityTaskCancelRequestedEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ActivityTaskCancelRequestedEventAttributes*](proto.temporal.api.history.v1.activitytaskcancelrequestedeventattributes.md)

Decodes an ActivityTaskCancelRequestedEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ActivityTaskCancelRequestedEventAttributes*](proto.temporal.api.history.v1.activitytaskcancelrequestedeventattributes.md)

ActivityTaskCancelRequestedEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ActivityTaskCancelRequestedEventAttributes*](proto.temporal.api.history.v1.activitytaskcancelrequestedeventattributes.md)

Decodes an ActivityTaskCancelRequestedEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ActivityTaskCancelRequestedEventAttributes*](proto.temporal.api.history.v1.activitytaskcancelrequestedeventattributes.md)

ActivityTaskCancelRequestedEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IActivityTaskCancelRequestedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskcancelrequestedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified ActivityTaskCancelRequestedEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.activitytaskcancelrequestedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IActivityTaskCancelRequestedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskcancelrequestedeventattributes.md) | ActivityTaskCancelRequestedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IActivityTaskCancelRequestedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskcancelrequestedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified ActivityTaskCancelRequestedEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.activitytaskcancelrequestedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IActivityTaskCancelRequestedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskcancelrequestedeventattributes.md) | ActivityTaskCancelRequestedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ActivityTaskCancelRequestedEventAttributes*](proto.temporal.api.history.v1.activitytaskcancelrequestedeventattributes.md)

Creates an ActivityTaskCancelRequestedEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ActivityTaskCancelRequestedEventAttributes*](proto.temporal.api.history.v1.activitytaskcancelrequestedeventattributes.md)

ActivityTaskCancelRequestedEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*ActivityTaskCancelRequestedEventAttributes*](proto.temporal.api.history.v1.activitytaskcancelrequestedeventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from an ActivityTaskCancelRequestedEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ActivityTaskCancelRequestedEventAttributes*](proto.temporal.api.history.v1.activitytaskcancelrequestedeventattributes.md) | ActivityTaskCancelRequestedEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an ActivityTaskCancelRequestedEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
