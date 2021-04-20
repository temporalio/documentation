# Class: PollWorkflowTaskQueueRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).PollWorkflowTaskQueueRequest

Represents a PollWorkflowTaskQueueRequest.

## Implements

* [*IPollWorkflowTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueuerequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueuerequest.md#constructor)

### Properties

- [binaryChecksum](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueuerequest.md#binarychecksum)
- [identity](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueuerequest.md#identity)
- [namespace](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueuerequest.md#namespace)
- [taskQueue](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueuerequest.md#taskqueue)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueuerequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueuerequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueuerequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueuerequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueuerequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueuerequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueuerequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueuerequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueuerequest.md#verify)

## Constructors

### constructor

\+ **new PollWorkflowTaskQueueRequest**(`properties?`: [*IPollWorkflowTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueuerequest.md)): [*PollWorkflowTaskQueueRequest*](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueuerequest.md)

Constructs a new PollWorkflowTaskQueueRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IPollWorkflowTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueuerequest.md) |

**Returns:** [*PollWorkflowTaskQueueRequest*](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueuerequest.md)

## Properties

### binaryChecksum

• **binaryChecksum**: *string*

PollWorkflowTaskQueueRequest binaryChecksum.

Implementation of: [IPollWorkflowTaskQueueRequest](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueuerequest.md).[binaryChecksum](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueuerequest.md#binarychecksum)

___

### identity

• **identity**: *string*

PollWorkflowTaskQueueRequest identity.

Implementation of: [IPollWorkflowTaskQueueRequest](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueuerequest.md).[identity](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueuerequest.md#identity)

___

### namespace

• **namespace**: *string*

PollWorkflowTaskQueueRequest namespace.

Implementation of: [IPollWorkflowTaskQueueRequest](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueuerequest.md).[namespace](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueuerequest.md#namespace)

___

### taskQueue

• `Optional` **taskQueue**: *null* \| [*ITaskQueue*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueue.md)

PollWorkflowTaskQueueRequest taskQueue.

Implementation of: [IPollWorkflowTaskQueueRequest](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueuerequest.md).[taskQueue](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueuerequest.md#taskqueue)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this PollWorkflowTaskQueueRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IPollWorkflowTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueuerequest.md)): [*PollWorkflowTaskQueueRequest*](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueuerequest.md)

Creates a new PollWorkflowTaskQueueRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IPollWorkflowTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueuerequest.md) |

**Returns:** [*PollWorkflowTaskQueueRequest*](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueuerequest.md)

PollWorkflowTaskQueueRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*PollWorkflowTaskQueueRequest*](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueuerequest.md)

Decodes a PollWorkflowTaskQueueRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*PollWorkflowTaskQueueRequest*](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueuerequest.md)

PollWorkflowTaskQueueRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*PollWorkflowTaskQueueRequest*](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueuerequest.md)

Decodes a PollWorkflowTaskQueueRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*PollWorkflowTaskQueueRequest*](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueuerequest.md)

PollWorkflowTaskQueueRequest

___

### encode

▸ `Static`**encode**(`message`: [*IPollWorkflowTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueuerequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified PollWorkflowTaskQueueRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueuerequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IPollWorkflowTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueuerequest.md) | PollWorkflowTaskQueueRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IPollWorkflowTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueuerequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified PollWorkflowTaskQueueRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueuerequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IPollWorkflowTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueuerequest.md) | PollWorkflowTaskQueueRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*PollWorkflowTaskQueueRequest*](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueuerequest.md)

Creates a PollWorkflowTaskQueueRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*PollWorkflowTaskQueueRequest*](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueuerequest.md)

PollWorkflowTaskQueueRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*PollWorkflowTaskQueueRequest*](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueuerequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a PollWorkflowTaskQueueRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*PollWorkflowTaskQueueRequest*](proto.temporal.api.workflowservice.v1.pollworkflowtaskqueuerequest.md) | PollWorkflowTaskQueueRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a PollWorkflowTaskQueueRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
