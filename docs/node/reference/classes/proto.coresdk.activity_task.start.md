# Class: Start

[coresdk](../modules/proto.coresdk.md).[activity_task](../modules/proto.coresdk.activity_task.md).Start

Begin executing an activity

## Implements

* [*IStart*](../interfaces/proto.coresdk.activity_task.istart.md)

## Table of contents

### Constructors

- [constructor](proto.coresdk.activity_task.start.md#constructor)

### Properties

- [activityType](proto.coresdk.activity_task.start.md#activitytype)
- [attempt](proto.coresdk.activity_task.start.md#attempt)
- [currentAttemptScheduledTime](proto.coresdk.activity_task.start.md#currentattemptscheduledtime)
- [headerFields](proto.coresdk.activity_task.start.md#headerfields)
- [heartbeatDetails](proto.coresdk.activity_task.start.md#heartbeatdetails)
- [heartbeatTimeout](proto.coresdk.activity_task.start.md#heartbeattimeout)
- [input](proto.coresdk.activity_task.start.md#input)
- [retryPolicy](proto.coresdk.activity_task.start.md#retrypolicy)
- [scheduleToCloseTimeout](proto.coresdk.activity_task.start.md#scheduletoclosetimeout)
- [scheduledTime](proto.coresdk.activity_task.start.md#scheduledtime)
- [startToCloseTimeout](proto.coresdk.activity_task.start.md#starttoclosetimeout)
- [startedTime](proto.coresdk.activity_task.start.md#startedtime)
- [workflowExecution](proto.coresdk.activity_task.start.md#workflowexecution)
- [workflowNamespace](proto.coresdk.activity_task.start.md#workflownamespace)
- [workflowType](proto.coresdk.activity_task.start.md#workflowtype)

### Methods

- [toJSON](proto.coresdk.activity_task.start.md#tojson)
- [create](proto.coresdk.activity_task.start.md#create)
- [decode](proto.coresdk.activity_task.start.md#decode)
- [decodeDelimited](proto.coresdk.activity_task.start.md#decodedelimited)
- [encode](proto.coresdk.activity_task.start.md#encode)
- [encodeDelimited](proto.coresdk.activity_task.start.md#encodedelimited)
- [fromObject](proto.coresdk.activity_task.start.md#fromobject)
- [toObject](proto.coresdk.activity_task.start.md#toobject)
- [verify](proto.coresdk.activity_task.start.md#verify)

## Constructors

### constructor

\+ **new Start**(`properties?`: [*IStart*](../interfaces/proto.coresdk.activity_task.istart.md)): [*Start*](proto.coresdk.activity_task.start.md)

Constructs a new Start.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IStart*](../interfaces/proto.coresdk.activity_task.istart.md) |

**Returns:** [*Start*](proto.coresdk.activity_task.start.md)

## Properties

### activityType

• **activityType**: *string*

The activity's type name or function identifier

Implementation of: [IStart](../interfaces/proto.coresdk.activity_task.istart.md).[activityType](../interfaces/proto.coresdk.activity_task.istart.md#activitytype)

___

### attempt

• **attempt**: *number*

Start attempt.

Implementation of: [IStart](../interfaces/proto.coresdk.activity_task.istart.md).[attempt](../interfaces/proto.coresdk.activity_task.istart.md#attempt)

___

### currentAttemptScheduledTime

• `Optional` **currentAttemptScheduledTime**: *null* \| [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md)

Start currentAttemptScheduledTime.

Implementation of: [IStart](../interfaces/proto.coresdk.activity_task.istart.md).[currentAttemptScheduledTime](../interfaces/proto.coresdk.activity_task.istart.md#currentattemptscheduledtime)

___

### headerFields

• **headerFields**: *object*

Start headerFields.

#### Type declaration:

Implementation of: [IStart](../interfaces/proto.coresdk.activity_task.istart.md).[headerFields](../interfaces/proto.coresdk.activity_task.istart.md#headerfields)

___

### heartbeatDetails

• **heartbeatDetails**: [*IPayload*](../interfaces/proto.coresdk.common.ipayload.md)[]

Start heartbeatDetails.

Implementation of: [IStart](../interfaces/proto.coresdk.activity_task.istart.md).[heartbeatDetails](../interfaces/proto.coresdk.activity_task.istart.md#heartbeatdetails)

___

### heartbeatTimeout

• `Optional` **heartbeatTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

Start heartbeatTimeout.

Implementation of: [IStart](../interfaces/proto.coresdk.activity_task.istart.md).[heartbeatTimeout](../interfaces/proto.coresdk.activity_task.istart.md#heartbeattimeout)

___

### input

• **input**: [*IPayload*](../interfaces/proto.coresdk.common.ipayload.md)[]

Arguments to the activity

Implementation of: [IStart](../interfaces/proto.coresdk.activity_task.istart.md).[input](../interfaces/proto.coresdk.activity_task.istart.md#input)

___

### retryPolicy

• `Optional` **retryPolicy**: *null* \| [*IRetryPolicy*](../interfaces/proto.coresdk.common.iretrypolicy.md)

values are not specified or exceed configured system limits.

Implementation of: [IStart](../interfaces/proto.coresdk.activity_task.istart.md).[retryPolicy](../interfaces/proto.coresdk.activity_task.istart.md#retrypolicy)

___

### scheduleToCloseTimeout

• `Optional` **scheduleToCloseTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

Start scheduleToCloseTimeout.

Implementation of: [IStart](../interfaces/proto.coresdk.activity_task.istart.md).[scheduleToCloseTimeout](../interfaces/proto.coresdk.activity_task.istart.md#scheduletoclosetimeout)

___

### scheduledTime

• `Optional` **scheduledTime**: *null* \| [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md)

Start scheduledTime.

Implementation of: [IStart](../interfaces/proto.coresdk.activity_task.istart.md).[scheduledTime](../interfaces/proto.coresdk.activity_task.istart.md#scheduledtime)

___

### startToCloseTimeout

• `Optional` **startToCloseTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

Start startToCloseTimeout.

Implementation of: [IStart](../interfaces/proto.coresdk.activity_task.istart.md).[startToCloseTimeout](../interfaces/proto.coresdk.activity_task.istart.md#starttoclosetimeout)

___

### startedTime

• `Optional` **startedTime**: *null* \| [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md)

Start startedTime.

Implementation of: [IStart](../interfaces/proto.coresdk.activity_task.istart.md).[startedTime](../interfaces/proto.coresdk.activity_task.istart.md#startedtime)

___

### workflowExecution

• `Optional` **workflowExecution**: *null* \| [*IWorkflowExecution*](../interfaces/proto.coresdk.common.iworkflowexecution.md)

Start workflowExecution.

Implementation of: [IStart](../interfaces/proto.coresdk.activity_task.istart.md).[workflowExecution](../interfaces/proto.coresdk.activity_task.istart.md#workflowexecution)

___

### workflowNamespace

• **workflowNamespace**: *string*

Start workflowNamespace.

Implementation of: [IStart](../interfaces/proto.coresdk.activity_task.istart.md).[workflowNamespace](../interfaces/proto.coresdk.activity_task.istart.md#workflownamespace)

___

### workflowType

• **workflowType**: *string*

The workflow's type name or function identifier

Implementation of: [IStart](../interfaces/proto.coresdk.activity_task.istart.md).[workflowType](../interfaces/proto.coresdk.activity_task.istart.md#workflowtype)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this Start to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IStart*](../interfaces/proto.coresdk.activity_task.istart.md)): [*Start*](proto.coresdk.activity_task.start.md)

Creates a new Start instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IStart*](../interfaces/proto.coresdk.activity_task.istart.md) |

**Returns:** [*Start*](proto.coresdk.activity_task.start.md)

Start instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*Start*](proto.coresdk.activity_task.start.md)

Decodes a Start message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*Start*](proto.coresdk.activity_task.start.md)

Start

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*Start*](proto.coresdk.activity_task.start.md)

Decodes a Start message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*Start*](proto.coresdk.activity_task.start.md)

Start

___

### encode

▸ `Static`**encode**(`message`: [*IStart*](../interfaces/proto.coresdk.activity_task.istart.md), `writer?`: *Writer*): *Writer*

Encodes the specified Start message. Does not implicitly [verify](proto.coresdk.activity_task.start.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IStart*](../interfaces/proto.coresdk.activity_task.istart.md) | Start message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IStart*](../interfaces/proto.coresdk.activity_task.istart.md), `writer?`: *Writer*): *Writer*

Encodes the specified Start message, length delimited. Does not implicitly [verify](proto.coresdk.activity_task.start.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IStart*](../interfaces/proto.coresdk.activity_task.istart.md) | Start message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*Start*](proto.coresdk.activity_task.start.md)

Creates a Start message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*Start*](proto.coresdk.activity_task.start.md)

Start

___

### toObject

▸ `Static`**toObject**(`message`: [*Start*](proto.coresdk.activity_task.start.md), `options?`: IConversionOptions): *object*

Creates a plain object from a Start message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*Start*](proto.coresdk.activity_task.start.md) | Start   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a Start message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
