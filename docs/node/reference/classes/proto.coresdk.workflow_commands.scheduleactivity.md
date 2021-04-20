# Class: ScheduleActivity

[coresdk](../modules/proto.coresdk.md).[workflow_commands](../modules/proto.coresdk.workflow_commands.md).ScheduleActivity

Represents a ScheduleActivity.

## Implements

* [*IScheduleActivity*](../interfaces/proto.coresdk.workflow_commands.ischeduleactivity.md)

## Table of contents

### Constructors

- [constructor](proto.coresdk.workflow_commands.scheduleactivity.md#constructor)

### Properties

- [activityId](proto.coresdk.workflow_commands.scheduleactivity.md#activityid)
- [activityType](proto.coresdk.workflow_commands.scheduleactivity.md#activitytype)
- [arguments](proto.coresdk.workflow_commands.scheduleactivity.md#arguments)
- [headerFields](proto.coresdk.workflow_commands.scheduleactivity.md#headerfields)
- [heartbeatTimeout](proto.coresdk.workflow_commands.scheduleactivity.md#heartbeattimeout)
- [namespace](proto.coresdk.workflow_commands.scheduleactivity.md#namespace)
- [retryPolicy](proto.coresdk.workflow_commands.scheduleactivity.md#retrypolicy)
- [scheduleToCloseTimeout](proto.coresdk.workflow_commands.scheduleactivity.md#scheduletoclosetimeout)
- [scheduleToStartTimeout](proto.coresdk.workflow_commands.scheduleactivity.md#scheduletostarttimeout)
- [startToCloseTimeout](proto.coresdk.workflow_commands.scheduleactivity.md#starttoclosetimeout)
- [taskQueue](proto.coresdk.workflow_commands.scheduleactivity.md#taskqueue)

### Methods

- [toJSON](proto.coresdk.workflow_commands.scheduleactivity.md#tojson)
- [create](proto.coresdk.workflow_commands.scheduleactivity.md#create)
- [decode](proto.coresdk.workflow_commands.scheduleactivity.md#decode)
- [decodeDelimited](proto.coresdk.workflow_commands.scheduleactivity.md#decodedelimited)
- [encode](proto.coresdk.workflow_commands.scheduleactivity.md#encode)
- [encodeDelimited](proto.coresdk.workflow_commands.scheduleactivity.md#encodedelimited)
- [fromObject](proto.coresdk.workflow_commands.scheduleactivity.md#fromobject)
- [toObject](proto.coresdk.workflow_commands.scheduleactivity.md#toobject)
- [verify](proto.coresdk.workflow_commands.scheduleactivity.md#verify)

## Constructors

### constructor

\+ **new ScheduleActivity**(`properties?`: [*IScheduleActivity*](../interfaces/proto.coresdk.workflow_commands.ischeduleactivity.md)): [*ScheduleActivity*](proto.coresdk.workflow_commands.scheduleactivity.md)

Constructs a new ScheduleActivity.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IScheduleActivity*](../interfaces/proto.coresdk.workflow_commands.ischeduleactivity.md) |

**Returns:** [*ScheduleActivity*](proto.coresdk.workflow_commands.scheduleactivity.md)

## Properties

### activityId

• **activityId**: *string*

ScheduleActivity activityId.

Implementation of: [IScheduleActivity](../interfaces/proto.coresdk.workflow_commands.ischeduleactivity.md).[activityId](../interfaces/proto.coresdk.workflow_commands.ischeduleactivity.md#activityid)

___

### activityType

• **activityType**: *string*

ScheduleActivity activityType.

Implementation of: [IScheduleActivity](../interfaces/proto.coresdk.workflow_commands.ischeduleactivity.md).[activityType](../interfaces/proto.coresdk.workflow_commands.ischeduleactivity.md#activitytype)

___

### arguments

• **arguments**: [*IPayload*](../interfaces/proto.coresdk.common.ipayload.md)[]

Arguments/input to the activity. Called "input" upstream.

Implementation of: [IScheduleActivity](../interfaces/proto.coresdk.workflow_commands.ischeduleactivity.md).[arguments](../interfaces/proto.coresdk.workflow_commands.ischeduleactivity.md#arguments)

___

### headerFields

• **headerFields**: *object*

ScheduleActivity headerFields.

#### Type declaration:

Implementation of: [IScheduleActivity](../interfaces/proto.coresdk.workflow_commands.ischeduleactivity.md).[headerFields](../interfaces/proto.coresdk.workflow_commands.ischeduleactivity.md#headerfields)

___

### heartbeatTimeout

• `Optional` **heartbeatTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

Maximum time allowed between successful worker heartbeats.

Implementation of: [IScheduleActivity](../interfaces/proto.coresdk.workflow_commands.ischeduleactivity.md).[heartbeatTimeout](../interfaces/proto.coresdk.workflow_commands.ischeduleactivity.md#heartbeattimeout)

___

### namespace

• **namespace**: *string*

ScheduleActivity namespace.

Implementation of: [IScheduleActivity](../interfaces/proto.coresdk.workflow_commands.ischeduleactivity.md).[namespace](../interfaces/proto.coresdk.workflow_commands.ischeduleactivity.md#namespace)

___

### retryPolicy

• `Optional` **retryPolicy**: *null* \| [*IRetryPolicy*](../interfaces/proto.coresdk.common.iretrypolicy.md)

retry_policy.maximum_attempts to 1.

Implementation of: [IScheduleActivity](../interfaces/proto.coresdk.workflow_commands.ischeduleactivity.md).[retryPolicy](../interfaces/proto.coresdk.workflow_commands.ischeduleactivity.md#retrypolicy)

___

### scheduleToCloseTimeout

• `Optional` **scheduleToCloseTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

When not specified defaults to the workflow execution timeout.

Implementation of: [IScheduleActivity](../interfaces/proto.coresdk.workflow_commands.ischeduleactivity.md).[scheduleToCloseTimeout](../interfaces/proto.coresdk.workflow_commands.ischeduleactivity.md#scheduletoclosetimeout)

___

### scheduleToStartTimeout

• `Optional` **scheduleToStartTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

queue. Defaults to schedule_to_close_timeout or workflow execution timeout if not specified.

Implementation of: [IScheduleActivity](../interfaces/proto.coresdk.workflow_commands.ischeduleactivity.md).[scheduleToStartTimeout](../interfaces/proto.coresdk.workflow_commands.ischeduleactivity.md#scheduletostarttimeout)

___

### startToCloseTimeout

• `Optional` **startToCloseTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

TODO: Is this really either or can you do both? Make oneof if mutually exclusive

Implementation of: [IScheduleActivity](../interfaces/proto.coresdk.workflow_commands.ischeduleactivity.md).[startToCloseTimeout](../interfaces/proto.coresdk.workflow_commands.ischeduleactivity.md#starttoclosetimeout)

___

### taskQueue

• **taskQueue**: *string*

ScheduleActivity taskQueue.

Implementation of: [IScheduleActivity](../interfaces/proto.coresdk.workflow_commands.ischeduleactivity.md).[taskQueue](../interfaces/proto.coresdk.workflow_commands.ischeduleactivity.md#taskqueue)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ScheduleActivity to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IScheduleActivity*](../interfaces/proto.coresdk.workflow_commands.ischeduleactivity.md)): [*ScheduleActivity*](proto.coresdk.workflow_commands.scheduleactivity.md)

Creates a new ScheduleActivity instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IScheduleActivity*](../interfaces/proto.coresdk.workflow_commands.ischeduleactivity.md) |

**Returns:** [*ScheduleActivity*](proto.coresdk.workflow_commands.scheduleactivity.md)

ScheduleActivity instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ScheduleActivity*](proto.coresdk.workflow_commands.scheduleactivity.md)

Decodes a ScheduleActivity message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ScheduleActivity*](proto.coresdk.workflow_commands.scheduleactivity.md)

ScheduleActivity

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ScheduleActivity*](proto.coresdk.workflow_commands.scheduleactivity.md)

Decodes a ScheduleActivity message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ScheduleActivity*](proto.coresdk.workflow_commands.scheduleactivity.md)

ScheduleActivity

___

### encode

▸ `Static`**encode**(`message`: [*IScheduleActivity*](../interfaces/proto.coresdk.workflow_commands.ischeduleactivity.md), `writer?`: *Writer*): *Writer*

Encodes the specified ScheduleActivity message. Does not implicitly [verify](proto.coresdk.workflow_commands.scheduleactivity.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IScheduleActivity*](../interfaces/proto.coresdk.workflow_commands.ischeduleactivity.md) | ScheduleActivity message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IScheduleActivity*](../interfaces/proto.coresdk.workflow_commands.ischeduleactivity.md), `writer?`: *Writer*): *Writer*

Encodes the specified ScheduleActivity message, length delimited. Does not implicitly [verify](proto.coresdk.workflow_commands.scheduleactivity.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IScheduleActivity*](../interfaces/proto.coresdk.workflow_commands.ischeduleactivity.md) | ScheduleActivity message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ScheduleActivity*](proto.coresdk.workflow_commands.scheduleactivity.md)

Creates a ScheduleActivity message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ScheduleActivity*](proto.coresdk.workflow_commands.scheduleactivity.md)

ScheduleActivity

___

### toObject

▸ `Static`**toObject**(`message`: [*ScheduleActivity*](proto.coresdk.workflow_commands.scheduleactivity.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ScheduleActivity message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ScheduleActivity*](proto.coresdk.workflow_commands.scheduleactivity.md) | ScheduleActivity   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ScheduleActivity message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
