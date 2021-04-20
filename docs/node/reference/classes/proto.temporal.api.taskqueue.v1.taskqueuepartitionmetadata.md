# Class: TaskQueuePartitionMetadata

[taskqueue](../modules/proto.temporal.api.taskqueue.md).[v1](../modules/proto.temporal.api.taskqueue.v1.md).TaskQueuePartitionMetadata

Represents a TaskQueuePartitionMetadata.

## Implements

* [*ITaskQueuePartitionMetadata*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuepartitionmetadata.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.taskqueue.v1.taskqueuepartitionmetadata.md#constructor)

### Properties

- [key](proto.temporal.api.taskqueue.v1.taskqueuepartitionmetadata.md#key)
- [ownerHostName](proto.temporal.api.taskqueue.v1.taskqueuepartitionmetadata.md#ownerhostname)

### Methods

- [toJSON](proto.temporal.api.taskqueue.v1.taskqueuepartitionmetadata.md#tojson)
- [create](proto.temporal.api.taskqueue.v1.taskqueuepartitionmetadata.md#create)
- [decode](proto.temporal.api.taskqueue.v1.taskqueuepartitionmetadata.md#decode)
- [decodeDelimited](proto.temporal.api.taskqueue.v1.taskqueuepartitionmetadata.md#decodedelimited)
- [encode](proto.temporal.api.taskqueue.v1.taskqueuepartitionmetadata.md#encode)
- [encodeDelimited](proto.temporal.api.taskqueue.v1.taskqueuepartitionmetadata.md#encodedelimited)
- [fromObject](proto.temporal.api.taskqueue.v1.taskqueuepartitionmetadata.md#fromobject)
- [toObject](proto.temporal.api.taskqueue.v1.taskqueuepartitionmetadata.md#toobject)
- [verify](proto.temporal.api.taskqueue.v1.taskqueuepartitionmetadata.md#verify)

## Constructors

### constructor

\+ **new TaskQueuePartitionMetadata**(`properties?`: [*ITaskQueuePartitionMetadata*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuepartitionmetadata.md)): [*TaskQueuePartitionMetadata*](proto.temporal.api.taskqueue.v1.taskqueuepartitionmetadata.md)

Constructs a new TaskQueuePartitionMetadata.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ITaskQueuePartitionMetadata*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuepartitionmetadata.md) |

**Returns:** [*TaskQueuePartitionMetadata*](proto.temporal.api.taskqueue.v1.taskqueuepartitionmetadata.md)

## Properties

### key

• **key**: *string*

TaskQueuePartitionMetadata key.

Implementation of: [ITaskQueuePartitionMetadata](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuepartitionmetadata.md).[key](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuepartitionmetadata.md#key)

___

### ownerHostName

• **ownerHostName**: *string*

TaskQueuePartitionMetadata ownerHostName.

Implementation of: [ITaskQueuePartitionMetadata](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuepartitionmetadata.md).[ownerHostName](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuepartitionmetadata.md#ownerhostname)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this TaskQueuePartitionMetadata to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ITaskQueuePartitionMetadata*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuepartitionmetadata.md)): [*TaskQueuePartitionMetadata*](proto.temporal.api.taskqueue.v1.taskqueuepartitionmetadata.md)

Creates a new TaskQueuePartitionMetadata instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ITaskQueuePartitionMetadata*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuepartitionmetadata.md) |

**Returns:** [*TaskQueuePartitionMetadata*](proto.temporal.api.taskqueue.v1.taskqueuepartitionmetadata.md)

TaskQueuePartitionMetadata instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*TaskQueuePartitionMetadata*](proto.temporal.api.taskqueue.v1.taskqueuepartitionmetadata.md)

Decodes a TaskQueuePartitionMetadata message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*TaskQueuePartitionMetadata*](proto.temporal.api.taskqueue.v1.taskqueuepartitionmetadata.md)

TaskQueuePartitionMetadata

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*TaskQueuePartitionMetadata*](proto.temporal.api.taskqueue.v1.taskqueuepartitionmetadata.md)

Decodes a TaskQueuePartitionMetadata message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*TaskQueuePartitionMetadata*](proto.temporal.api.taskqueue.v1.taskqueuepartitionmetadata.md)

TaskQueuePartitionMetadata

___

### encode

▸ `Static`**encode**(`message`: [*ITaskQueuePartitionMetadata*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuepartitionmetadata.md), `writer?`: *Writer*): *Writer*

Encodes the specified TaskQueuePartitionMetadata message. Does not implicitly [verify](proto.temporal.api.taskqueue.v1.taskqueuepartitionmetadata.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ITaskQueuePartitionMetadata*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuepartitionmetadata.md) | TaskQueuePartitionMetadata message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ITaskQueuePartitionMetadata*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuepartitionmetadata.md), `writer?`: *Writer*): *Writer*

Encodes the specified TaskQueuePartitionMetadata message, length delimited. Does not implicitly [verify](proto.temporal.api.taskqueue.v1.taskqueuepartitionmetadata.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ITaskQueuePartitionMetadata*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuepartitionmetadata.md) | TaskQueuePartitionMetadata message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*TaskQueuePartitionMetadata*](proto.temporal.api.taskqueue.v1.taskqueuepartitionmetadata.md)

Creates a TaskQueuePartitionMetadata message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*TaskQueuePartitionMetadata*](proto.temporal.api.taskqueue.v1.taskqueuepartitionmetadata.md)

TaskQueuePartitionMetadata

___

### toObject

▸ `Static`**toObject**(`message`: [*TaskQueuePartitionMetadata*](proto.temporal.api.taskqueue.v1.taskqueuepartitionmetadata.md), `options?`: IConversionOptions): *object*

Creates a plain object from a TaskQueuePartitionMetadata message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*TaskQueuePartitionMetadata*](proto.temporal.api.taskqueue.v1.taskqueuepartitionmetadata.md) | TaskQueuePartitionMetadata   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a TaskQueuePartitionMetadata message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
