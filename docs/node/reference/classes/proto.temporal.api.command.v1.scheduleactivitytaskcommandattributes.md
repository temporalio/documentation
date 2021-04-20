# Class: ScheduleActivityTaskCommandAttributes

[command](../modules/proto.temporal.api.command.md).[v1](../modules/proto.temporal.api.command.v1.md).ScheduleActivityTaskCommandAttributes

Represents a ScheduleActivityTaskCommandAttributes.

## Implements

* [*IScheduleActivityTaskCommandAttributes*](../interfaces/proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md#constructor)

### Properties

- [activityId](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md#activityid)
- [activityType](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md#activitytype)
- [header](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md#header)
- [heartbeatTimeout](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md#heartbeattimeout)
- [input](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md#input)
- [namespace](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md#namespace)
- [retryPolicy](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md#retrypolicy)
- [scheduleToCloseTimeout](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md#scheduletoclosetimeout)
- [scheduleToStartTimeout](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md#scheduletostarttimeout)
- [startToCloseTimeout](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md#starttoclosetimeout)
- [taskQueue](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md#taskqueue)

### Methods

- [toJSON](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md#tojson)
- [create](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md#create)
- [decode](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md#decode)
- [decodeDelimited](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md#decodedelimited)
- [encode](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md#encode)
- [encodeDelimited](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md#fromobject)
- [toObject](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md#toobject)
- [verify](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md#verify)

## Constructors

### constructor

\+ **new ScheduleActivityTaskCommandAttributes**(`properties?`: [*IScheduleActivityTaskCommandAttributes*](../interfaces/proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md)): [*ScheduleActivityTaskCommandAttributes*](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md)

Constructs a new ScheduleActivityTaskCommandAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IScheduleActivityTaskCommandAttributes*](../interfaces/proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md) |

**Returns:** [*ScheduleActivityTaskCommandAttributes*](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md)

## Properties

### activityId

• **activityId**: *string*

ScheduleActivityTaskCommandAttributes activityId.

Implementation of: [IScheduleActivityTaskCommandAttributes](../interfaces/proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md).[activityId](../interfaces/proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md#activityid)

___

### activityType

• `Optional` **activityType**: *null* \| [*IActivityType*](../interfaces/proto.temporal.api.common.v1.iactivitytype.md)

ScheduleActivityTaskCommandAttributes activityType.

Implementation of: [IScheduleActivityTaskCommandAttributes](../interfaces/proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md).[activityType](../interfaces/proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md#activitytype)

___

### header

• `Optional` **header**: *null* \| [*IHeader*](../interfaces/proto.temporal.api.common.v1.iheader.md)

ScheduleActivityTaskCommandAttributes header.

Implementation of: [IScheduleActivityTaskCommandAttributes](../interfaces/proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md).[header](../interfaces/proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md#header)

___

### heartbeatTimeout

• `Optional` **heartbeatTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

ScheduleActivityTaskCommandAttributes heartbeatTimeout.

Implementation of: [IScheduleActivityTaskCommandAttributes](../interfaces/proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md).[heartbeatTimeout](../interfaces/proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md#heartbeattimeout)

___

### input

• `Optional` **input**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

ScheduleActivityTaskCommandAttributes input.

Implementation of: [IScheduleActivityTaskCommandAttributes](../interfaces/proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md).[input](../interfaces/proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md#input)

___

### namespace

• **namespace**: *string*

ScheduleActivityTaskCommandAttributes namespace.

Implementation of: [IScheduleActivityTaskCommandAttributes](../interfaces/proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md).[namespace](../interfaces/proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md#namespace)

___

### retryPolicy

• `Optional` **retryPolicy**: *null* \| [*IRetryPolicy*](../interfaces/proto.temporal.api.common.v1.iretrypolicy.md)

ScheduleActivityTaskCommandAttributes retryPolicy.

Implementation of: [IScheduleActivityTaskCommandAttributes](../interfaces/proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md).[retryPolicy](../interfaces/proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md#retrypolicy)

___

### scheduleToCloseTimeout

• `Optional` **scheduleToCloseTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

ScheduleActivityTaskCommandAttributes scheduleToCloseTimeout.

Implementation of: [IScheduleActivityTaskCommandAttributes](../interfaces/proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md).[scheduleToCloseTimeout](../interfaces/proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md#scheduletoclosetimeout)

___

### scheduleToStartTimeout

• `Optional` **scheduleToStartTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

ScheduleActivityTaskCommandAttributes scheduleToStartTimeout.

Implementation of: [IScheduleActivityTaskCommandAttributes](../interfaces/proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md).[scheduleToStartTimeout](../interfaces/proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md#scheduletostarttimeout)

___

### startToCloseTimeout

• `Optional` **startToCloseTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

ScheduleActivityTaskCommandAttributes startToCloseTimeout.

Implementation of: [IScheduleActivityTaskCommandAttributes](../interfaces/proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md).[startToCloseTimeout](../interfaces/proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md#starttoclosetimeout)

___

### taskQueue

• `Optional` **taskQueue**: *null* \| [*ITaskQueue*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueue.md)

ScheduleActivityTaskCommandAttributes taskQueue.

Implementation of: [IScheduleActivityTaskCommandAttributes](../interfaces/proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md).[taskQueue](../interfaces/proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md#taskqueue)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ScheduleActivityTaskCommandAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IScheduleActivityTaskCommandAttributes*](../interfaces/proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md)): [*ScheduleActivityTaskCommandAttributes*](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md)

Creates a new ScheduleActivityTaskCommandAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IScheduleActivityTaskCommandAttributes*](../interfaces/proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md) |

**Returns:** [*ScheduleActivityTaskCommandAttributes*](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md)

ScheduleActivityTaskCommandAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ScheduleActivityTaskCommandAttributes*](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md)

Decodes a ScheduleActivityTaskCommandAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ScheduleActivityTaskCommandAttributes*](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md)

ScheduleActivityTaskCommandAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ScheduleActivityTaskCommandAttributes*](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md)

Decodes a ScheduleActivityTaskCommandAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ScheduleActivityTaskCommandAttributes*](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md)

ScheduleActivityTaskCommandAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IScheduleActivityTaskCommandAttributes*](../interfaces/proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified ScheduleActivityTaskCommandAttributes message. Does not implicitly [verify](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IScheduleActivityTaskCommandAttributes*](../interfaces/proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md) | ScheduleActivityTaskCommandAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IScheduleActivityTaskCommandAttributes*](../interfaces/proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified ScheduleActivityTaskCommandAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IScheduleActivityTaskCommandAttributes*](../interfaces/proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md) | ScheduleActivityTaskCommandAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ScheduleActivityTaskCommandAttributes*](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md)

Creates a ScheduleActivityTaskCommandAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ScheduleActivityTaskCommandAttributes*](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md)

ScheduleActivityTaskCommandAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*ScheduleActivityTaskCommandAttributes*](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ScheduleActivityTaskCommandAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ScheduleActivityTaskCommandAttributes*](proto.temporal.api.command.v1.scheduleactivitytaskcommandattributes.md) | ScheduleActivityTaskCommandAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ScheduleActivityTaskCommandAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
