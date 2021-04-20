# Class: ListTaskQueuePartitionsResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).ListTaskQueuePartitionsResponse

Represents a ListTaskQueuePartitionsResponse.

## Implements

* [*IListTaskQueuePartitionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilisttaskqueuepartitionsresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsresponse.md#constructor)

### Properties

- [activityTaskQueuePartitions](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsresponse.md#activitytaskqueuepartitions)
- [workflowTaskQueuePartitions](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsresponse.md#workflowtaskqueuepartitions)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsresponse.md#verify)

## Constructors

### constructor

\+ **new ListTaskQueuePartitionsResponse**(`properties?`: [*IListTaskQueuePartitionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilisttaskqueuepartitionsresponse.md)): [*ListTaskQueuePartitionsResponse*](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsresponse.md)

Constructs a new ListTaskQueuePartitionsResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IListTaskQueuePartitionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilisttaskqueuepartitionsresponse.md) |

**Returns:** [*ListTaskQueuePartitionsResponse*](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsresponse.md)

## Properties

### activityTaskQueuePartitions

• **activityTaskQueuePartitions**: [*ITaskQueuePartitionMetadata*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuepartitionmetadata.md)[]

ListTaskQueuePartitionsResponse activityTaskQueuePartitions.

Implementation of: [IListTaskQueuePartitionsResponse](../interfaces/proto.temporal.api.workflowservice.v1.ilisttaskqueuepartitionsresponse.md).[activityTaskQueuePartitions](../interfaces/proto.temporal.api.workflowservice.v1.ilisttaskqueuepartitionsresponse.md#activitytaskqueuepartitions)

___

### workflowTaskQueuePartitions

• **workflowTaskQueuePartitions**: [*ITaskQueuePartitionMetadata*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuepartitionmetadata.md)[]

ListTaskQueuePartitionsResponse workflowTaskQueuePartitions.

Implementation of: [IListTaskQueuePartitionsResponse](../interfaces/proto.temporal.api.workflowservice.v1.ilisttaskqueuepartitionsresponse.md).[workflowTaskQueuePartitions](../interfaces/proto.temporal.api.workflowservice.v1.ilisttaskqueuepartitionsresponse.md#workflowtaskqueuepartitions)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ListTaskQueuePartitionsResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IListTaskQueuePartitionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilisttaskqueuepartitionsresponse.md)): [*ListTaskQueuePartitionsResponse*](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsresponse.md)

Creates a new ListTaskQueuePartitionsResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IListTaskQueuePartitionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilisttaskqueuepartitionsresponse.md) |

**Returns:** [*ListTaskQueuePartitionsResponse*](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsresponse.md)

ListTaskQueuePartitionsResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ListTaskQueuePartitionsResponse*](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsresponse.md)

Decodes a ListTaskQueuePartitionsResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ListTaskQueuePartitionsResponse*](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsresponse.md)

ListTaskQueuePartitionsResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ListTaskQueuePartitionsResponse*](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsresponse.md)

Decodes a ListTaskQueuePartitionsResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ListTaskQueuePartitionsResponse*](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsresponse.md)

ListTaskQueuePartitionsResponse

___

### encode

▸ `Static`**encode**(`message`: [*IListTaskQueuePartitionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilisttaskqueuepartitionsresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified ListTaskQueuePartitionsResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IListTaskQueuePartitionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilisttaskqueuepartitionsresponse.md) | ListTaskQueuePartitionsResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IListTaskQueuePartitionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilisttaskqueuepartitionsresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified ListTaskQueuePartitionsResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IListTaskQueuePartitionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilisttaskqueuepartitionsresponse.md) | ListTaskQueuePartitionsResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ListTaskQueuePartitionsResponse*](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsresponse.md)

Creates a ListTaskQueuePartitionsResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ListTaskQueuePartitionsResponse*](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsresponse.md)

ListTaskQueuePartitionsResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*ListTaskQueuePartitionsResponse*](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ListTaskQueuePartitionsResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ListTaskQueuePartitionsResponse*](proto.temporal.api.workflowservice.v1.listtaskqueuepartitionsresponse.md) | ListTaskQueuePartitionsResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ListTaskQueuePartitionsResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
