# Class: TaskQueue

[taskqueue](../modules/proto.temporal.api.taskqueue.md).[v1](../modules/proto.temporal.api.taskqueue.v1.md).TaskQueue

Represents a TaskQueue.

## Implements

* [*ITaskQueue*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueue.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.taskqueue.v1.taskqueue.md#constructor)

### Properties

- [kind](proto.temporal.api.taskqueue.v1.taskqueue.md#kind)
- [name](proto.temporal.api.taskqueue.v1.taskqueue.md#name)

### Methods

- [toJSON](proto.temporal.api.taskqueue.v1.taskqueue.md#tojson)
- [create](proto.temporal.api.taskqueue.v1.taskqueue.md#create)
- [decode](proto.temporal.api.taskqueue.v1.taskqueue.md#decode)
- [decodeDelimited](proto.temporal.api.taskqueue.v1.taskqueue.md#decodedelimited)
- [encode](proto.temporal.api.taskqueue.v1.taskqueue.md#encode)
- [encodeDelimited](proto.temporal.api.taskqueue.v1.taskqueue.md#encodedelimited)
- [fromObject](proto.temporal.api.taskqueue.v1.taskqueue.md#fromobject)
- [toObject](proto.temporal.api.taskqueue.v1.taskqueue.md#toobject)
- [verify](proto.temporal.api.taskqueue.v1.taskqueue.md#verify)

## Constructors

### constructor

\+ **new TaskQueue**(`properties?`: [*ITaskQueue*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueue.md)): [*TaskQueue*](proto.temporal.api.taskqueue.v1.taskqueue.md)

Constructs a new TaskQueue.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ITaskQueue*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueue.md) |

**Returns:** [*TaskQueue*](proto.temporal.api.taskqueue.v1.taskqueue.md)

## Properties

### kind

• **kind**: [*TaskQueueKind*](../enums/proto.temporal.api.enums.v1.taskqueuekind.md)

TaskQueue kind.

Implementation of: [ITaskQueue](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueue.md).[kind](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueue.md#kind)

___

### name

• **name**: *string*

TaskQueue name.

Implementation of: [ITaskQueue](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueue.md).[name](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueue.md#name)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this TaskQueue to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ITaskQueue*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueue.md)): [*TaskQueue*](proto.temporal.api.taskqueue.v1.taskqueue.md)

Creates a new TaskQueue instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ITaskQueue*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueue.md) |

**Returns:** [*TaskQueue*](proto.temporal.api.taskqueue.v1.taskqueue.md)

TaskQueue instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*TaskQueue*](proto.temporal.api.taskqueue.v1.taskqueue.md)

Decodes a TaskQueue message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*TaskQueue*](proto.temporal.api.taskqueue.v1.taskqueue.md)

TaskQueue

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*TaskQueue*](proto.temporal.api.taskqueue.v1.taskqueue.md)

Decodes a TaskQueue message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*TaskQueue*](proto.temporal.api.taskqueue.v1.taskqueue.md)

TaskQueue

___

### encode

▸ `Static`**encode**(`message`: [*ITaskQueue*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueue.md), `writer?`: *Writer*): *Writer*

Encodes the specified TaskQueue message. Does not implicitly [verify](proto.temporal.api.taskqueue.v1.taskqueue.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ITaskQueue*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueue.md) | TaskQueue message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ITaskQueue*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueue.md), `writer?`: *Writer*): *Writer*

Encodes the specified TaskQueue message, length delimited. Does not implicitly [verify](proto.temporal.api.taskqueue.v1.taskqueue.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ITaskQueue*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueue.md) | TaskQueue message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*TaskQueue*](proto.temporal.api.taskqueue.v1.taskqueue.md)

Creates a TaskQueue message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*TaskQueue*](proto.temporal.api.taskqueue.v1.taskqueue.md)

TaskQueue

___

### toObject

▸ `Static`**toObject**(`message`: [*TaskQueue*](proto.temporal.api.taskqueue.v1.taskqueue.md), `options?`: IConversionOptions): *object*

Creates a plain object from a TaskQueue message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*TaskQueue*](proto.temporal.api.taskqueue.v1.taskqueue.md) | TaskQueue   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a TaskQueue message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
