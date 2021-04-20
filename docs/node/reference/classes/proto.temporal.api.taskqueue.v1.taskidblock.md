# Class: TaskIdBlock

[taskqueue](../modules/proto.temporal.api.taskqueue.md).[v1](../modules/proto.temporal.api.taskqueue.v1.md).TaskIdBlock

Represents a TaskIdBlock.

## Implements

* [*ITaskIdBlock*](../interfaces/proto.temporal.api.taskqueue.v1.itaskidblock.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.taskqueue.v1.taskidblock.md#constructor)

### Properties

- [endId](proto.temporal.api.taskqueue.v1.taskidblock.md#endid)
- [startId](proto.temporal.api.taskqueue.v1.taskidblock.md#startid)

### Methods

- [toJSON](proto.temporal.api.taskqueue.v1.taskidblock.md#tojson)
- [create](proto.temporal.api.taskqueue.v1.taskidblock.md#create)
- [decode](proto.temporal.api.taskqueue.v1.taskidblock.md#decode)
- [decodeDelimited](proto.temporal.api.taskqueue.v1.taskidblock.md#decodedelimited)
- [encode](proto.temporal.api.taskqueue.v1.taskidblock.md#encode)
- [encodeDelimited](proto.temporal.api.taskqueue.v1.taskidblock.md#encodedelimited)
- [fromObject](proto.temporal.api.taskqueue.v1.taskidblock.md#fromobject)
- [toObject](proto.temporal.api.taskqueue.v1.taskidblock.md#toobject)
- [verify](proto.temporal.api.taskqueue.v1.taskidblock.md#verify)

## Constructors

### constructor

\+ **new TaskIdBlock**(`properties?`: [*ITaskIdBlock*](../interfaces/proto.temporal.api.taskqueue.v1.itaskidblock.md)): [*TaskIdBlock*](proto.temporal.api.taskqueue.v1.taskidblock.md)

Constructs a new TaskIdBlock.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ITaskIdBlock*](../interfaces/proto.temporal.api.taskqueue.v1.itaskidblock.md) |

**Returns:** [*TaskIdBlock*](proto.temporal.api.taskqueue.v1.taskidblock.md)

## Properties

### endId

• **endId**: Long

TaskIdBlock endId.

Implementation of: [ITaskIdBlock](../interfaces/proto.temporal.api.taskqueue.v1.itaskidblock.md).[endId](../interfaces/proto.temporal.api.taskqueue.v1.itaskidblock.md#endid)

___

### startId

• **startId**: Long

TaskIdBlock startId.

Implementation of: [ITaskIdBlock](../interfaces/proto.temporal.api.taskqueue.v1.itaskidblock.md).[startId](../interfaces/proto.temporal.api.taskqueue.v1.itaskidblock.md#startid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this TaskIdBlock to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ITaskIdBlock*](../interfaces/proto.temporal.api.taskqueue.v1.itaskidblock.md)): [*TaskIdBlock*](proto.temporal.api.taskqueue.v1.taskidblock.md)

Creates a new TaskIdBlock instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ITaskIdBlock*](../interfaces/proto.temporal.api.taskqueue.v1.itaskidblock.md) |

**Returns:** [*TaskIdBlock*](proto.temporal.api.taskqueue.v1.taskidblock.md)

TaskIdBlock instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*TaskIdBlock*](proto.temporal.api.taskqueue.v1.taskidblock.md)

Decodes a TaskIdBlock message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*TaskIdBlock*](proto.temporal.api.taskqueue.v1.taskidblock.md)

TaskIdBlock

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*TaskIdBlock*](proto.temporal.api.taskqueue.v1.taskidblock.md)

Decodes a TaskIdBlock message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*TaskIdBlock*](proto.temporal.api.taskqueue.v1.taskidblock.md)

TaskIdBlock

___

### encode

▸ `Static`**encode**(`message`: [*ITaskIdBlock*](../interfaces/proto.temporal.api.taskqueue.v1.itaskidblock.md), `writer?`: *Writer*): *Writer*

Encodes the specified TaskIdBlock message. Does not implicitly [verify](proto.temporal.api.taskqueue.v1.taskidblock.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ITaskIdBlock*](../interfaces/proto.temporal.api.taskqueue.v1.itaskidblock.md) | TaskIdBlock message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ITaskIdBlock*](../interfaces/proto.temporal.api.taskqueue.v1.itaskidblock.md), `writer?`: *Writer*): *Writer*

Encodes the specified TaskIdBlock message, length delimited. Does not implicitly [verify](proto.temporal.api.taskqueue.v1.taskidblock.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ITaskIdBlock*](../interfaces/proto.temporal.api.taskqueue.v1.itaskidblock.md) | TaskIdBlock message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*TaskIdBlock*](proto.temporal.api.taskqueue.v1.taskidblock.md)

Creates a TaskIdBlock message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*TaskIdBlock*](proto.temporal.api.taskqueue.v1.taskidblock.md)

TaskIdBlock

___

### toObject

▸ `Static`**toObject**(`message`: [*TaskIdBlock*](proto.temporal.api.taskqueue.v1.taskidblock.md), `options?`: IConversionOptions): *object*

Creates a plain object from a TaskIdBlock message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*TaskIdBlock*](proto.temporal.api.taskqueue.v1.taskidblock.md) | TaskIdBlock   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a TaskIdBlock message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
