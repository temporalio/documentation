# Class: ActivityTaskScheduledEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).ActivityTaskScheduledEventAttributes

Represents an ActivityTaskScheduledEventAttributes.

## Implements

* [*IActivityTaskScheduledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md#constructor)

### Properties

- [activityId](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md#activityid)
- [activityType](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md#activitytype)
- [header](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md#header)
- [heartbeatTimeout](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md#heartbeattimeout)
- [input](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md#input)
- [namespace](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md#namespace)
- [retryPolicy](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md#retrypolicy)
- [scheduleToCloseTimeout](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md#scheduletoclosetimeout)
- [scheduleToStartTimeout](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md#scheduletostarttimeout)
- [startToCloseTimeout](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md#starttoclosetimeout)
- [taskQueue](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md#taskqueue)
- [workflowTaskCompletedEventId](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md#workflowtaskcompletedeventid)

### Methods

- [toJSON](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md#create)
- [decode](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md#verify)

## Constructors

### constructor

\+ **new ActivityTaskScheduledEventAttributes**(`properties?`: [*IActivityTaskScheduledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md)): [*ActivityTaskScheduledEventAttributes*](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md)

Constructs a new ActivityTaskScheduledEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IActivityTaskScheduledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md) |

**Returns:** [*ActivityTaskScheduledEventAttributes*](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md)

## Properties

### activityId

• **activityId**: *string*

ActivityTaskScheduledEventAttributes activityId.

Implementation of: [IActivityTaskScheduledEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md).[activityId](../interfaces/proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md#activityid)

___

### activityType

• `Optional` **activityType**: *null* \| [*IActivityType*](../interfaces/proto.temporal.api.common.v1.iactivitytype.md)

ActivityTaskScheduledEventAttributes activityType.

Implementation of: [IActivityTaskScheduledEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md).[activityType](../interfaces/proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md#activitytype)

___

### header

• `Optional` **header**: *null* \| [*IHeader*](../interfaces/proto.temporal.api.common.v1.iheader.md)

ActivityTaskScheduledEventAttributes header.

Implementation of: [IActivityTaskScheduledEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md).[header](../interfaces/proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md#header)

___

### heartbeatTimeout

• `Optional` **heartbeatTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

ActivityTaskScheduledEventAttributes heartbeatTimeout.

Implementation of: [IActivityTaskScheduledEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md).[heartbeatTimeout](../interfaces/proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md#heartbeattimeout)

___

### input

• `Optional` **input**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

ActivityTaskScheduledEventAttributes input.

Implementation of: [IActivityTaskScheduledEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md).[input](../interfaces/proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md#input)

___

### namespace

• **namespace**: *string*

ActivityTaskScheduledEventAttributes namespace.

Implementation of: [IActivityTaskScheduledEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md).[namespace](../interfaces/proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md#namespace)

___

### retryPolicy

• `Optional` **retryPolicy**: *null* \| [*IRetryPolicy*](../interfaces/proto.temporal.api.common.v1.iretrypolicy.md)

ActivityTaskScheduledEventAttributes retryPolicy.

Implementation of: [IActivityTaskScheduledEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md).[retryPolicy](../interfaces/proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md#retrypolicy)

___

### scheduleToCloseTimeout

• `Optional` **scheduleToCloseTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

ActivityTaskScheduledEventAttributes scheduleToCloseTimeout.

Implementation of: [IActivityTaskScheduledEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md).[scheduleToCloseTimeout](../interfaces/proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md#scheduletoclosetimeout)

___

### scheduleToStartTimeout

• `Optional` **scheduleToStartTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

ActivityTaskScheduledEventAttributes scheduleToStartTimeout.

Implementation of: [IActivityTaskScheduledEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md).[scheduleToStartTimeout](../interfaces/proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md#scheduletostarttimeout)

___

### startToCloseTimeout

• `Optional` **startToCloseTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

ActivityTaskScheduledEventAttributes startToCloseTimeout.

Implementation of: [IActivityTaskScheduledEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md).[startToCloseTimeout](../interfaces/proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md#starttoclosetimeout)

___

### taskQueue

• `Optional` **taskQueue**: *null* \| [*ITaskQueue*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueue.md)

ActivityTaskScheduledEventAttributes taskQueue.

Implementation of: [IActivityTaskScheduledEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md).[taskQueue](../interfaces/proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md#taskqueue)

___

### workflowTaskCompletedEventId

• **workflowTaskCompletedEventId**: Long

ActivityTaskScheduledEventAttributes workflowTaskCompletedEventId.

Implementation of: [IActivityTaskScheduledEventAttributes](../interfaces/proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md).[workflowTaskCompletedEventId](../interfaces/proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md#workflowtaskcompletedeventid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ActivityTaskScheduledEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IActivityTaskScheduledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md)): [*ActivityTaskScheduledEventAttributes*](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md)

Creates a new ActivityTaskScheduledEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IActivityTaskScheduledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md) |

**Returns:** [*ActivityTaskScheduledEventAttributes*](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md)

ActivityTaskScheduledEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ActivityTaskScheduledEventAttributes*](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md)

Decodes an ActivityTaskScheduledEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ActivityTaskScheduledEventAttributes*](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md)

ActivityTaskScheduledEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ActivityTaskScheduledEventAttributes*](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md)

Decodes an ActivityTaskScheduledEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ActivityTaskScheduledEventAttributes*](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md)

ActivityTaskScheduledEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IActivityTaskScheduledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified ActivityTaskScheduledEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IActivityTaskScheduledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md) | ActivityTaskScheduledEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IActivityTaskScheduledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified ActivityTaskScheduledEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IActivityTaskScheduledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md) | ActivityTaskScheduledEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ActivityTaskScheduledEventAttributes*](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md)

Creates an ActivityTaskScheduledEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ActivityTaskScheduledEventAttributes*](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md)

ActivityTaskScheduledEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*ActivityTaskScheduledEventAttributes*](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from an ActivityTaskScheduledEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ActivityTaskScheduledEventAttributes*](proto.temporal.api.history.v1.activitytaskscheduledeventattributes.md) | ActivityTaskScheduledEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an ActivityTaskScheduledEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
