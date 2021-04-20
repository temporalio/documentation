# Class: PollActivityTaskQueueRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).PollActivityTaskQueueRequest

Represents a PollActivityTaskQueueRequest.

## Implements

* [*IPollActivityTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueuerequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.pollactivitytaskqueuerequest.md#constructor)

### Properties

- [identity](proto.temporal.api.workflowservice.v1.pollactivitytaskqueuerequest.md#identity)
- [namespace](proto.temporal.api.workflowservice.v1.pollactivitytaskqueuerequest.md#namespace)
- [taskQueue](proto.temporal.api.workflowservice.v1.pollactivitytaskqueuerequest.md#taskqueue)
- [taskQueueMetadata](proto.temporal.api.workflowservice.v1.pollactivitytaskqueuerequest.md#taskqueuemetadata)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.pollactivitytaskqueuerequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.pollactivitytaskqueuerequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.pollactivitytaskqueuerequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.pollactivitytaskqueuerequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.pollactivitytaskqueuerequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.pollactivitytaskqueuerequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.pollactivitytaskqueuerequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.pollactivitytaskqueuerequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.pollactivitytaskqueuerequest.md#verify)

## Constructors

### constructor

\+ **new PollActivityTaskQueueRequest**(`properties?`: [*IPollActivityTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueuerequest.md)): [*PollActivityTaskQueueRequest*](proto.temporal.api.workflowservice.v1.pollactivitytaskqueuerequest.md)

Constructs a new PollActivityTaskQueueRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IPollActivityTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueuerequest.md) |

**Returns:** [*PollActivityTaskQueueRequest*](proto.temporal.api.workflowservice.v1.pollactivitytaskqueuerequest.md)

## Properties

### identity

• **identity**: *string*

PollActivityTaskQueueRequest identity.

Implementation of: [IPollActivityTaskQueueRequest](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueuerequest.md).[identity](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueuerequest.md#identity)

___

### namespace

• **namespace**: *string*

PollActivityTaskQueueRequest namespace.

Implementation of: [IPollActivityTaskQueueRequest](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueuerequest.md).[namespace](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueuerequest.md#namespace)

___

### taskQueue

• `Optional` **taskQueue**: *null* \| [*ITaskQueue*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueue.md)

PollActivityTaskQueueRequest taskQueue.

Implementation of: [IPollActivityTaskQueueRequest](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueuerequest.md).[taskQueue](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueuerequest.md#taskqueue)

___

### taskQueueMetadata

• `Optional` **taskQueueMetadata**: *null* \| [*ITaskQueueMetadata*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuemetadata.md)

PollActivityTaskQueueRequest taskQueueMetadata.

Implementation of: [IPollActivityTaskQueueRequest](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueuerequest.md).[taskQueueMetadata](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueuerequest.md#taskqueuemetadata)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this PollActivityTaskQueueRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IPollActivityTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueuerequest.md)): [*PollActivityTaskQueueRequest*](proto.temporal.api.workflowservice.v1.pollactivitytaskqueuerequest.md)

Creates a new PollActivityTaskQueueRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IPollActivityTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueuerequest.md) |

**Returns:** [*PollActivityTaskQueueRequest*](proto.temporal.api.workflowservice.v1.pollactivitytaskqueuerequest.md)

PollActivityTaskQueueRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*PollActivityTaskQueueRequest*](proto.temporal.api.workflowservice.v1.pollactivitytaskqueuerequest.md)

Decodes a PollActivityTaskQueueRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*PollActivityTaskQueueRequest*](proto.temporal.api.workflowservice.v1.pollactivitytaskqueuerequest.md)

PollActivityTaskQueueRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*PollActivityTaskQueueRequest*](proto.temporal.api.workflowservice.v1.pollactivitytaskqueuerequest.md)

Decodes a PollActivityTaskQueueRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*PollActivityTaskQueueRequest*](proto.temporal.api.workflowservice.v1.pollactivitytaskqueuerequest.md)

PollActivityTaskQueueRequest

___

### encode

▸ `Static`**encode**(`message`: [*IPollActivityTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueuerequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified PollActivityTaskQueueRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.pollactivitytaskqueuerequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IPollActivityTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueuerequest.md) | PollActivityTaskQueueRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IPollActivityTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueuerequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified PollActivityTaskQueueRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.pollactivitytaskqueuerequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IPollActivityTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ipollactivitytaskqueuerequest.md) | PollActivityTaskQueueRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*PollActivityTaskQueueRequest*](proto.temporal.api.workflowservice.v1.pollactivitytaskqueuerequest.md)

Creates a PollActivityTaskQueueRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*PollActivityTaskQueueRequest*](proto.temporal.api.workflowservice.v1.pollactivitytaskqueuerequest.md)

PollActivityTaskQueueRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*PollActivityTaskQueueRequest*](proto.temporal.api.workflowservice.v1.pollactivitytaskqueuerequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a PollActivityTaskQueueRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*PollActivityTaskQueueRequest*](proto.temporal.api.workflowservice.v1.pollactivitytaskqueuerequest.md) | PollActivityTaskQueueRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a PollActivityTaskQueueRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
