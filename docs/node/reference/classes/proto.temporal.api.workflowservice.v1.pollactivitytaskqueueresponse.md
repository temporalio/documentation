# Class: PollActivityTaskQueueResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).PollActivityTaskQueueResponse

Represents a PollActivityTaskQueueResponse.

## Implements

* [*IPollActivityTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md#constructor)

### Properties

- [activityId](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md#activityid)
- [activityType](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md#activitytype)
- [attempt](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md#attempt)
- [currentAttemptScheduledTime](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md#currentattemptscheduledtime)
- [header](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md#header)
- [heartbeatDetails](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md#heartbeatdetails)
- [heartbeatTimeout](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md#heartbeattimeout)
- [input](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md#input)
- [retryPolicy](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md#retrypolicy)
- [scheduleToCloseTimeout](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md#scheduletoclosetimeout)
- [scheduledTime](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md#scheduledtime)
- [startToCloseTimeout](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md#starttoclosetimeout)
- [startedTime](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md#startedtime)
- [taskToken](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md#tasktoken)
- [workflowExecution](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md#workflowexecution)
- [workflowNamespace](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md#workflownamespace)
- [workflowType](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md#workflowtype)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md#verify)

## Constructors

### constructor

\+ **new PollActivityTaskQueueResponse**(`properties?`: [*IPollActivityTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md)): [*PollActivityTaskQueueResponse*](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md)

Constructs a new PollActivityTaskQueueResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IPollActivityTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md) |

**Returns:** [*PollActivityTaskQueueResponse*](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md)

## Properties

### activityId

• **activityId**: *string*

PollActivityTaskQueueResponse activityId.

Implementation of: [IPollActivityTaskQueueResponse](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md).[activityId](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md#activityid)

___

### activityType

• `Optional` **activityType**: *null* \| [*IActivityType*](../interfaces/proto.temporal.api.common.v1.iactivitytype.md)

PollActivityTaskQueueResponse activityType.

Implementation of: [IPollActivityTaskQueueResponse](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md).[activityType](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md#activitytype)

___

### attempt

• **attempt**: *number*

PollActivityTaskQueueResponse attempt.

Implementation of: [IPollActivityTaskQueueResponse](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md).[attempt](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md#attempt)

___

### currentAttemptScheduledTime

• `Optional` **currentAttemptScheduledTime**: *null* \| [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md)

PollActivityTaskQueueResponse currentAttemptScheduledTime.

Implementation of: [IPollActivityTaskQueueResponse](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md).[currentAttemptScheduledTime](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md#currentattemptscheduledtime)

___

### header

• `Optional` **header**: *null* \| [*IHeader*](../interfaces/proto.temporal.api.common.v1.iheader.md)

PollActivityTaskQueueResponse header.

Implementation of: [IPollActivityTaskQueueResponse](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md).[header](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md#header)

___

### heartbeatDetails

• `Optional` **heartbeatDetails**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

PollActivityTaskQueueResponse heartbeatDetails.

Implementation of: [IPollActivityTaskQueueResponse](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md).[heartbeatDetails](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md#heartbeatdetails)

___

### heartbeatTimeout

• `Optional` **heartbeatTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

PollActivityTaskQueueResponse heartbeatTimeout.

Implementation of: [IPollActivityTaskQueueResponse](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md).[heartbeatTimeout](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md#heartbeattimeout)

___

### input

• `Optional` **input**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

PollActivityTaskQueueResponse input.

Implementation of: [IPollActivityTaskQueueResponse](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md).[input](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md#input)

___

### retryPolicy

• `Optional` **retryPolicy**: *null* \| [*IRetryPolicy*](../interfaces/proto.temporal.api.common.v1.iretrypolicy.md)

PollActivityTaskQueueResponse retryPolicy.

Implementation of: [IPollActivityTaskQueueResponse](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md).[retryPolicy](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md#retrypolicy)

___

### scheduleToCloseTimeout

• `Optional` **scheduleToCloseTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

PollActivityTaskQueueResponse scheduleToCloseTimeout.

Implementation of: [IPollActivityTaskQueueResponse](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md).[scheduleToCloseTimeout](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md#scheduletoclosetimeout)

___

### scheduledTime

• `Optional` **scheduledTime**: *null* \| [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md)

PollActivityTaskQueueResponse scheduledTime.

Implementation of: [IPollActivityTaskQueueResponse](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md).[scheduledTime](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md#scheduledtime)

___

### startToCloseTimeout

• `Optional` **startToCloseTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

PollActivityTaskQueueResponse startToCloseTimeout.

Implementation of: [IPollActivityTaskQueueResponse](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md).[startToCloseTimeout](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md#starttoclosetimeout)

___

### startedTime

• `Optional` **startedTime**: *null* \| [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md)

PollActivityTaskQueueResponse startedTime.

Implementation of: [IPollActivityTaskQueueResponse](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md).[startedTime](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md#startedtime)

___

### taskToken

• **taskToken**: *Uint8Array*

PollActivityTaskQueueResponse taskToken.

Implementation of: [IPollActivityTaskQueueResponse](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md).[taskToken](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md#tasktoken)

___

### workflowExecution

• `Optional` **workflowExecution**: *null* \| [*IWorkflowExecution*](../interfaces/proto.temporal.api.common.v1.iworkflowexecution.md)

PollActivityTaskQueueResponse workflowExecution.

Implementation of: [IPollActivityTaskQueueResponse](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md).[workflowExecution](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md#workflowexecution)

___

### workflowNamespace

• **workflowNamespace**: *string*

PollActivityTaskQueueResponse workflowNamespace.

Implementation of: [IPollActivityTaskQueueResponse](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md).[workflowNamespace](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md#workflownamespace)

___

### workflowType

• `Optional` **workflowType**: *null* \| [*IWorkflowType*](../interfaces/proto.temporal.api.common.v1.iworkflowtype.md)

PollActivityTaskQueueResponse workflowType.

Implementation of: [IPollActivityTaskQueueResponse](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md).[workflowType](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md#workflowtype)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this PollActivityTaskQueueResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IPollActivityTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md)): [*PollActivityTaskQueueResponse*](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md)

Creates a new PollActivityTaskQueueResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IPollActivityTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md) |

**Returns:** [*PollActivityTaskQueueResponse*](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md)

PollActivityTaskQueueResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*PollActivityTaskQueueResponse*](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md)

Decodes a PollActivityTaskQueueResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*PollActivityTaskQueueResponse*](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md)

PollActivityTaskQueueResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*PollActivityTaskQueueResponse*](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md)

Decodes a PollActivityTaskQueueResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*PollActivityTaskQueueResponse*](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md)

PollActivityTaskQueueResponse

___

### encode

▸ `Static`**encode**(`message`: [*IPollActivityTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified PollActivityTaskQueueResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IPollActivityTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md) | PollActivityTaskQueueResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IPollActivityTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified PollActivityTaskQueueResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IPollActivityTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueueresponse.md) | PollActivityTaskQueueResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*PollActivityTaskQueueResponse*](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md)

Creates a PollActivityTaskQueueResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*PollActivityTaskQueueResponse*](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md)

PollActivityTaskQueueResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*PollActivityTaskQueueResponse*](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a PollActivityTaskQueueResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*PollActivityTaskQueueResponse*](proto.temporal.api.workflowservice.v1.pollactivitytaskqueueresponse.md) | PollActivityTaskQueueResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a PollActivityTaskQueueResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
