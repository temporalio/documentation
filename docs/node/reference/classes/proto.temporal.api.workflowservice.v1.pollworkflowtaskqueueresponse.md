# Class: PollWorkflowTaskQueueResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).PollWorkflowTaskQueueResponse

Represents a PollWorkflowTaskQueueResponse.

## Implements

* [*IPollWorkflowTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md#constructor)

### Properties

- [attempt](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md#attempt)
- [backlogCountHint](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md#backlogcounthint)
- [history](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md#history)
- [nextPageToken](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md#nextpagetoken)
- [previousStartedEventId](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md#previousstartedeventid)
- [queries](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md#queries)
- [query](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md#query)
- [scheduledTime](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md#scheduledtime)
- [startedEventId](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md#startedeventid)
- [startedTime](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md#startedtime)
- [taskToken](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md#tasktoken)
- [workflowExecution](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md#workflowexecution)
- [workflowExecutionTaskQueue](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md#workflowexecutiontaskqueue)
- [workflowType](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md#workflowtype)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md#verify)

## Constructors

### constructor

\+ **new PollWorkflowTaskQueueResponse**(`properties?`: [*IPollWorkflowTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md)): [*PollWorkflowTaskQueueResponse*](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md)

Constructs a new PollWorkflowTaskQueueResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IPollWorkflowTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md) |

**Returns:** [*PollWorkflowTaskQueueResponse*](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md)

## Properties

### attempt

• **attempt**: *number*

PollWorkflowTaskQueueResponse attempt.

Implementation of: [IPollWorkflowTaskQueueResponse](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md).[attempt](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md#attempt)

___

### backlogCountHint

• **backlogCountHint**: Long

PollWorkflowTaskQueueResponse backlogCountHint.

Implementation of: [IPollWorkflowTaskQueueResponse](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md).[backlogCountHint](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md#backlogcounthint)

___

### history

• `Optional` **history**: *null* \| [*IHistory*](../interfaces/proto.temporal.api.history.v1.ihistory.md)

PollWorkflowTaskQueueResponse history.

Implementation of: [IPollWorkflowTaskQueueResponse](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md).[history](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md#history)

___

### nextPageToken

• **nextPageToken**: *Uint8Array*

PollWorkflowTaskQueueResponse nextPageToken.

Implementation of: [IPollWorkflowTaskQueueResponse](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md).[nextPageToken](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md#nextpagetoken)

___

### previousStartedEventId

• **previousStartedEventId**: Long

PollWorkflowTaskQueueResponse previousStartedEventId.

Implementation of: [IPollWorkflowTaskQueueResponse](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md).[previousStartedEventId](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md#previousstartedeventid)

___

### queries

• **queries**: *object*

PollWorkflowTaskQueueResponse queries.

#### Type declaration:

Implementation of: [IPollWorkflowTaskQueueResponse](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md).[queries](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md#queries)

___

### query

• `Optional` **query**: *null* \| [*IWorkflowQuery*](../interfaces/proto.temporal.api.query.v1.iworkflowquery.md)

PollWorkflowTaskQueueResponse query.

Implementation of: [IPollWorkflowTaskQueueResponse](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md).[query](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md#query)

___

### scheduledTime

• `Optional` **scheduledTime**: *null* \| [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md)

PollWorkflowTaskQueueResponse scheduledTime.

Implementation of: [IPollWorkflowTaskQueueResponse](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md).[scheduledTime](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md#scheduledtime)

___

### startedEventId

• **startedEventId**: Long

PollWorkflowTaskQueueResponse startedEventId.

Implementation of: [IPollWorkflowTaskQueueResponse](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md).[startedEventId](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md#startedeventid)

___

### startedTime

• `Optional` **startedTime**: *null* \| [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md)

PollWorkflowTaskQueueResponse startedTime.

Implementation of: [IPollWorkflowTaskQueueResponse](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md).[startedTime](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md#startedtime)

___

### taskToken

• **taskToken**: *Uint8Array*

PollWorkflowTaskQueueResponse taskToken.

Implementation of: [IPollWorkflowTaskQueueResponse](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md).[taskToken](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md#tasktoken)

___

### workflowExecution

• `Optional` **workflowExecution**: *null* \| [*IWorkflowExecution*](../interfaces/proto.temporal.api.common.v1.iworkflowexecution.md)

PollWorkflowTaskQueueResponse workflowExecution.

Implementation of: [IPollWorkflowTaskQueueResponse](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md).[workflowExecution](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md#workflowexecution)

___

### workflowExecutionTaskQueue

• `Optional` **workflowExecutionTaskQueue**: *null* \| [*ITaskQueue*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueue.md)

PollWorkflowTaskQueueResponse workflowExecutionTaskQueue.

Implementation of: [IPollWorkflowTaskQueueResponse](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md).[workflowExecutionTaskQueue](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md#workflowexecutiontaskqueue)

___

### workflowType

• `Optional` **workflowType**: *null* \| [*IWorkflowType*](../interfaces/proto.temporal.api.common.v1.iworkflowtype.md)

PollWorkflowTaskQueueResponse workflowType.

Implementation of: [IPollWorkflowTaskQueueResponse](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md).[workflowType](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md#workflowtype)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this PollWorkflowTaskQueueResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IPollWorkflowTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md)): [*PollWorkflowTaskQueueResponse*](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md)

Creates a new PollWorkflowTaskQueueResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IPollWorkflowTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md) |

**Returns:** [*PollWorkflowTaskQueueResponse*](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md)

PollWorkflowTaskQueueResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*PollWorkflowTaskQueueResponse*](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md)

Decodes a PollWorkflowTaskQueueResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*PollWorkflowTaskQueueResponse*](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md)

PollWorkflowTaskQueueResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*PollWorkflowTaskQueueResponse*](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md)

Decodes a PollWorkflowTaskQueueResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*PollWorkflowTaskQueueResponse*](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md)

PollWorkflowTaskQueueResponse

___

### encode

▸ `Static`**encode**(`message`: [*IPollWorkflowTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified PollWorkflowTaskQueueResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IPollWorkflowTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md) | PollWorkflowTaskQueueResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IPollWorkflowTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified PollWorkflowTaskQueueResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IPollWorkflowTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md) | PollWorkflowTaskQueueResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*PollWorkflowTaskQueueResponse*](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md)

Creates a PollWorkflowTaskQueueResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*PollWorkflowTaskQueueResponse*](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md)

PollWorkflowTaskQueueResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*PollWorkflowTaskQueueResponse*](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a PollWorkflowTaskQueueResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*PollWorkflowTaskQueueResponse*](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueueresponse.md) | PollWorkflowTaskQueueResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a PollWorkflowTaskQueueResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
