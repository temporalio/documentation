# Class: ListTaskQueuePartitionsRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).ListTaskQueuePartitionsRequest

Represents a ListTaskQueuePartitionsRequest.

## Implements

* [*IListTaskQueuePartitionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilisttaskqueuepartitionsrequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsrequest.md#constructor)

### Properties

- [namespace](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsrequest.md#namespace)
- [taskQueue](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsrequest.md#taskqueue)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsrequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsrequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsrequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsrequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsrequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsrequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsrequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsrequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsrequest.md#verify)

## Constructors

### constructor

\+ **new ListTaskQueuePartitionsRequest**(`properties?`: [*IListTaskQueuePartitionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilisttaskqueuepartitionsrequest.md)): [*ListTaskQueuePartitionsRequest*](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsrequest.md)

Constructs a new ListTaskQueuePartitionsRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IListTaskQueuePartitionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilisttaskqueuepartitionsrequest.md) |

**Returns:** [*ListTaskQueuePartitionsRequest*](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsrequest.md)

## Properties

### namespace

• **namespace**: *string*

ListTaskQueuePartitionsRequest namespace.

Implementation of: [IListTaskQueuePartitionsRequest](../interfaces/proto.temporal.api.workflowservice.v1.ilisttaskqueuepartitionsrequest.md).[namespace](../interfaces/proto.temporal.api.workflowservice.v1.ilisttaskqueuepartitionsrequest.md#namespace)

___

### taskQueue

• `Optional` **taskQueue**: *null* \| [*ITaskQueue*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueue.md)

ListTaskQueuePartitionsRequest taskQueue.

Implementation of: [IListTaskQueuePartitionsRequest](../interfaces/proto.temporal.api.workflowservice.v1.ilisttaskqueuepartitionsrequest.md).[taskQueue](../interfaces/proto.temporal.api.workflowservice.v1.ilisttaskqueuepartitionsrequest.md#taskqueue)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ListTaskQueuePartitionsRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IListTaskQueuePartitionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilisttaskqueuepartitionsrequest.md)): [*ListTaskQueuePartitionsRequest*](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsrequest.md)

Creates a new ListTaskQueuePartitionsRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IListTaskQueuePartitionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilisttaskqueuepartitionsrequest.md) |

**Returns:** [*ListTaskQueuePartitionsRequest*](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsrequest.md)

ListTaskQueuePartitionsRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ListTaskQueuePartitionsRequest*](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsrequest.md)

Decodes a ListTaskQueuePartitionsRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ListTaskQueuePartitionsRequest*](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsrequest.md)

ListTaskQueuePartitionsRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ListTaskQueuePartitionsRequest*](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsrequest.md)

Decodes a ListTaskQueuePartitionsRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ListTaskQueuePartitionsRequest*](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsrequest.md)

ListTaskQueuePartitionsRequest

___

### encode

▸ `Static`**encode**(`message`: [*IListTaskQueuePartitionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilisttaskqueuepartitionsrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified ListTaskQueuePartitionsRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IListTaskQueuePartitionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilisttaskqueuepartitionsrequest.md) | ListTaskQueuePartitionsRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IListTaskQueuePartitionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilisttaskqueuepartitionsrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified ListTaskQueuePartitionsRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IListTaskQueuePartitionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilisttaskqueuepartitionsrequest.md) | ListTaskQueuePartitionsRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ListTaskQueuePartitionsRequest*](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsrequest.md)

Creates a ListTaskQueuePartitionsRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ListTaskQueuePartitionsRequest*](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsrequest.md)

ListTaskQueuePartitionsRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*ListTaskQueuePartitionsRequest*](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsrequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ListTaskQueuePartitionsRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ListTaskQueuePartitionsRequest*](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsrequest.md) | ListTaskQueuePartitionsRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ListTaskQueuePartitionsRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
