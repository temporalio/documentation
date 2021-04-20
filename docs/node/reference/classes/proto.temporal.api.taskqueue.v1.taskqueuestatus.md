# Class: TaskQueueStatus

[taskqueue](../modules/proto.temporal.api.taskqueue.md).[v1](../modules/proto.temporal.api.taskqueue.v1.md).TaskQueueStatus

Represents a TaskQueueStatus.

## Implements

* [*ITaskQueueStatus*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuestatus.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.taskqueue.v1.taskqueuestatus.md#constructor)

### Properties

- [ackLevel](proto.temporal.api.taskqueue.v1.taskqueuestatus.md#acklevel)
- [backlogCountHint](proto.temporal.api.taskqueue.v1.taskqueuestatus.md#backlogcounthint)
- [ratePerSecond](proto.temporal.api.taskqueue.v1.taskqueuestatus.md#ratepersecond)
- [readLevel](proto.temporal.api.taskqueue.v1.taskqueuestatus.md#readlevel)
- [taskIdBlock](proto.temporal.api.taskqueue.v1.taskqueuestatus.md#taskidblock)

### Methods

- [toJSON](proto.temporal.api.taskqueue.v1.taskqueuestatus.md#tojson)
- [create](proto.temporal.api.taskqueue.v1.taskqueuestatus.md#create)
- [decode](proto.temporal.api.taskqueue.v1.taskqueuestatus.md#decode)
- [decodeDelimited](proto.temporal.api.taskqueue.v1.taskqueuestatus.md#decodedelimited)
- [encode](proto.temporal.api.taskqueue.v1.taskqueuestatus.md#encode)
- [encodeDelimited](proto.temporal.api.taskqueue.v1.taskqueuestatus.md#encodedelimited)
- [fromObject](proto.temporal.api.taskqueue.v1.taskqueuestatus.md#fromobject)
- [toObject](proto.temporal.api.taskqueue.v1.taskqueuestatus.md#toobject)
- [verify](proto.temporal.api.taskqueue.v1.taskqueuestatus.md#verify)

## Constructors

### constructor

\+ **new TaskQueueStatus**(`properties?`: [*ITaskQueueStatus*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuestatus.md)): [*TaskQueueStatus*](proto.temporal.api.taskqueue.v1.taskqueuestatus.md)

Constructs a new TaskQueueStatus.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ITaskQueueStatus*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuestatus.md) |

**Returns:** [*TaskQueueStatus*](proto.temporal.api.taskqueue.v1.taskqueuestatus.md)

## Properties

### ackLevel

• **ackLevel**: Long

TaskQueueStatus ackLevel.

Implementation of: [ITaskQueueStatus](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuestatus.md).[ackLevel](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuestatus.md#acklevel)

___

### backlogCountHint

• **backlogCountHint**: Long

TaskQueueStatus backlogCountHint.

Implementation of: [ITaskQueueStatus](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuestatus.md).[backlogCountHint](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuestatus.md#backlogcounthint)

___

### ratePerSecond

• **ratePerSecond**: *number*

TaskQueueStatus ratePerSecond.

Implementation of: [ITaskQueueStatus](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuestatus.md).[ratePerSecond](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuestatus.md#ratepersecond)

___

### readLevel

• **readLevel**: Long

TaskQueueStatus readLevel.

Implementation of: [ITaskQueueStatus](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuestatus.md).[readLevel](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuestatus.md#readlevel)

___

### taskIdBlock

• `Optional` **taskIdBlock**: *null* \| [*ITaskIdBlock*](../interfaces/proto.temporal.api.taskqueue.v1.itaskidblock.md)

TaskQueueStatus taskIdBlock.

Implementation of: [ITaskQueueStatus](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuestatus.md).[taskIdBlock](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuestatus.md#taskidblock)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this TaskQueueStatus to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ITaskQueueStatus*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuestatus.md)): [*TaskQueueStatus*](proto.temporal.api.taskqueue.v1.taskqueuestatus.md)

Creates a new TaskQueueStatus instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ITaskQueueStatus*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuestatus.md) |

**Returns:** [*TaskQueueStatus*](proto.temporal.api.taskqueue.v1.taskqueuestatus.md)

TaskQueueStatus instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*TaskQueueStatus*](proto.temporal.api.taskqueue.v1.taskqueuestatus.md)

Decodes a TaskQueueStatus message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*TaskQueueStatus*](proto.temporal.api.taskqueue.v1.taskqueuestatus.md)

TaskQueueStatus

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*TaskQueueStatus*](proto.temporal.api.taskqueue.v1.taskqueuestatus.md)

Decodes a TaskQueueStatus message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*TaskQueueStatus*](proto.temporal.api.taskqueue.v1.taskqueuestatus.md)

TaskQueueStatus

___

### encode

▸ `Static`**encode**(`message`: [*ITaskQueueStatus*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuestatus.md), `writer?`: *Writer*): *Writer*

Encodes the specified TaskQueueStatus message. Does not implicitly [verify](proto.temporal.api.taskqueue.v1.taskqueuestatus.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ITaskQueueStatus*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuestatus.md) | TaskQueueStatus message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ITaskQueueStatus*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuestatus.md), `writer?`: *Writer*): *Writer*

Encodes the specified TaskQueueStatus message, length delimited. Does not implicitly [verify](proto.temporal.api.taskqueue.v1.taskqueuestatus.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ITaskQueueStatus*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuestatus.md) | TaskQueueStatus message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*TaskQueueStatus*](proto.temporal.api.taskqueue.v1.taskqueuestatus.md)

Creates a TaskQueueStatus message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*TaskQueueStatus*](proto.temporal.api.taskqueue.v1.taskqueuestatus.md)

TaskQueueStatus

___

### toObject

▸ `Static`**toObject**(`message`: [*TaskQueueStatus*](proto.temporal.api.taskqueue.v1.taskqueuestatus.md), `options?`: IConversionOptions): *object*

Creates a plain object from a TaskQueueStatus message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*TaskQueueStatus*](proto.temporal.api.taskqueue.v1.taskqueuestatus.md) | TaskQueueStatus   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a TaskQueueStatus message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
