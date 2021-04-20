# Class: TaskQueueMetadata

[taskqueue](../modules/proto.temporal.api.taskqueue.md).[v1](../modules/proto.temporal.api.taskqueue.v1.md).TaskQueueMetadata

Represents a TaskQueueMetadata.

## Implements

* [*ITaskQueueMetadata*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuemetadata.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.taskqueue.v1.taskqueuemetadata.md#constructor)

### Properties

- [maxTasksPerSecond](proto.temporal.api.taskqueue.v1.taskqueuemetadata.md#maxtaskspersecond)

### Methods

- [toJSON](proto.temporal.api.taskqueue.v1.taskqueuemetadata.md#tojson)
- [create](proto.temporal.api.taskqueue.v1.taskqueuemetadata.md#create)
- [decode](proto.temporal.api.taskqueue.v1.taskqueuemetadata.md#decode)
- [decodeDelimited](proto.temporal.api.taskqueue.v1.taskqueuemetadata.md#decodedelimited)
- [encode](proto.temporal.api.taskqueue.v1.taskqueuemetadata.md#encode)
- [encodeDelimited](proto.temporal.api.taskqueue.v1.taskqueuemetadata.md#encodedelimited)
- [fromObject](proto.temporal.api.taskqueue.v1.taskqueuemetadata.md#fromobject)
- [toObject](proto.temporal.api.taskqueue.v1.taskqueuemetadata.md#toobject)
- [verify](proto.temporal.api.taskqueue.v1.taskqueuemetadata.md#verify)

## Constructors

### constructor

\+ **new TaskQueueMetadata**(`properties?`: [*ITaskQueueMetadata*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuemetadata.md)): [*TaskQueueMetadata*](proto.temporal.api.taskqueue.v1.taskqueuemetadata.md)

Constructs a new TaskQueueMetadata.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ITaskQueueMetadata*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuemetadata.md) |

**Returns:** [*TaskQueueMetadata*](proto.temporal.api.taskqueue.v1.taskqueuemetadata.md)

## Properties

### maxTasksPerSecond

• `Optional` **maxTasksPerSecond**: *null* \| [*IDoubleValue*](../interfaces/proto.google.protobuf.idoublevalue.md)

TaskQueueMetadata maxTasksPerSecond.

Implementation of: [ITaskQueueMetadata](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuemetadata.md).[maxTasksPerSecond](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuemetadata.md#maxtaskspersecond)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this TaskQueueMetadata to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ITaskQueueMetadata*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuemetadata.md)): [*TaskQueueMetadata*](proto.temporal.api.taskqueue.v1.taskqueuemetadata.md)

Creates a new TaskQueueMetadata instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ITaskQueueMetadata*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuemetadata.md) |

**Returns:** [*TaskQueueMetadata*](proto.temporal.api.taskqueue.v1.taskqueuemetadata.md)

TaskQueueMetadata instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*TaskQueueMetadata*](proto.temporal.api.taskqueue.v1.taskqueuemetadata.md)

Decodes a TaskQueueMetadata message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*TaskQueueMetadata*](proto.temporal.api.taskqueue.v1.taskqueuemetadata.md)

TaskQueueMetadata

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*TaskQueueMetadata*](proto.temporal.api.taskqueue.v1.taskqueuemetadata.md)

Decodes a TaskQueueMetadata message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*TaskQueueMetadata*](proto.temporal.api.taskqueue.v1.taskqueuemetadata.md)

TaskQueueMetadata

___

### encode

▸ `Static`**encode**(`message`: [*ITaskQueueMetadata*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuemetadata.md), `writer?`: *Writer*): *Writer*

Encodes the specified TaskQueueMetadata message. Does not implicitly [verify](proto.temporal.api.taskqueue.v1.taskqueuemetadata.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ITaskQueueMetadata*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuemetadata.md) | TaskQueueMetadata message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ITaskQueueMetadata*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuemetadata.md), `writer?`: *Writer*): *Writer*

Encodes the specified TaskQueueMetadata message, length delimited. Does not implicitly [verify](proto.temporal.api.taskqueue.v1.taskqueuemetadata.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ITaskQueueMetadata*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuemetadata.md) | TaskQueueMetadata message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*TaskQueueMetadata*](proto.temporal.api.taskqueue.v1.taskqueuemetadata.md)

Creates a TaskQueueMetadata message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*TaskQueueMetadata*](proto.temporal.api.taskqueue.v1.taskqueuemetadata.md)

TaskQueueMetadata

___

### toObject

▸ `Static`**toObject**(`message`: [*TaskQueueMetadata*](proto.temporal.api.taskqueue.v1.taskqueuemetadata.md), `options?`: IConversionOptions): *object*

Creates a plain object from a TaskQueueMetadata message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*TaskQueueMetadata*](proto.temporal.api.taskqueue.v1.taskqueuemetadata.md) | TaskQueueMetadata   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a TaskQueueMetadata message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
