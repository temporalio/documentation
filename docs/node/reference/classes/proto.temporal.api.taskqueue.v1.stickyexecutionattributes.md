# Class: StickyExecutionAttributes

[taskqueue](../modules/proto.temporal.api.taskqueue.md).[v1](../modules/proto.temporal.api.taskqueue.v1.md).StickyExecutionAttributes

Represents a StickyExecutionAttributes.

## Implements

* [*IStickyExecutionAttributes*](../interfaces/proto.temporal.api.taskqueue.v1.istickyexecutionattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.taskqueue.v1.stickyexecutionattributes.md#constructor)

### Properties

- [scheduleToStartTimeout](proto.temporal.api.taskqueue.v1.stickyexecutionattributes.md#scheduletostarttimeout)
- [workerTaskQueue](proto.temporal.api.taskqueue.v1.stickyexecutionattributes.md#workertaskqueue)

### Methods

- [toJSON](proto.temporal.api.taskqueue.v1.stickyexecutionattributes.md#tojson)
- [create](proto.temporal.api.taskqueue.v1.stickyexecutionattributes.md#create)
- [decode](proto.temporal.api.taskqueue.v1.stickyexecutionattributes.md#decode)
- [decodeDelimited](proto.temporal.api.taskqueue.v1.stickyexecutionattributes.md#decodedelimited)
- [encode](proto.temporal.api.taskqueue.v1.stickyexecutionattributes.md#encode)
- [encodeDelimited](proto.temporal.api.taskqueue.v1.stickyexecutionattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.taskqueue.v1.stickyexecutionattributes.md#fromobject)
- [toObject](proto.temporal.api.taskqueue.v1.stickyexecutionattributes.md#toobject)
- [verify](proto.temporal.api.taskqueue.v1.stickyexecutionattributes.md#verify)

## Constructors

### constructor

\+ **new StickyExecutionAttributes**(`properties?`: [*IStickyExecutionAttributes*](../interfaces/proto.temporal.api.taskqueue.v1.istickyexecutionattributes.md)): [*StickyExecutionAttributes*](proto.temporal.api.taskqueue.v1.stickyexecutionattributes.md)

Constructs a new StickyExecutionAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IStickyExecutionAttributes*](../interfaces/proto.temporal.api.taskqueue.v1.istickyexecutionattributes.md) |

**Returns:** [*StickyExecutionAttributes*](proto.temporal.api.taskqueue.v1.stickyexecutionattributes.md)

## Properties

### scheduleToStartTimeout

• `Optional` **scheduleToStartTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

StickyExecutionAttributes scheduleToStartTimeout.

Implementation of: [IStickyExecutionAttributes](../interfaces/proto.temporal.api.taskqueue.v1.istickyexecutionattributes.md).[scheduleToStartTimeout](../interfaces/proto.temporal.api.taskqueue.v1.istickyexecutionattributes.md#scheduletostarttimeout)

___

### workerTaskQueue

• `Optional` **workerTaskQueue**: *null* \| [*ITaskQueue*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueue.md)

StickyExecutionAttributes workerTaskQueue.

Implementation of: [IStickyExecutionAttributes](../interfaces/proto.temporal.api.taskqueue.v1.istickyexecutionattributes.md).[workerTaskQueue](../interfaces/proto.temporal.api.taskqueue.v1.istickyexecutionattributes.md#workertaskqueue)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this StickyExecutionAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IStickyExecutionAttributes*](../interfaces/proto.temporal.api.taskqueue.v1.istickyexecutionattributes.md)): [*StickyExecutionAttributes*](proto.temporal.api.taskqueue.v1.stickyexecutionattributes.md)

Creates a new StickyExecutionAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IStickyExecutionAttributes*](../interfaces/proto.temporal.api.taskqueue.v1.istickyexecutionattributes.md) |

**Returns:** [*StickyExecutionAttributes*](proto.temporal.api.taskqueue.v1.stickyexecutionattributes.md)

StickyExecutionAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*StickyExecutionAttributes*](proto.temporal.api.taskqueue.v1.stickyexecutionattributes.md)

Decodes a StickyExecutionAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*StickyExecutionAttributes*](proto.temporal.api.taskqueue.v1.stickyexecutionattributes.md)

StickyExecutionAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*StickyExecutionAttributes*](proto.temporal.api.taskqueue.v1.stickyexecutionattributes.md)

Decodes a StickyExecutionAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*StickyExecutionAttributes*](proto.temporal.api.taskqueue.v1.stickyexecutionattributes.md)

StickyExecutionAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IStickyExecutionAttributes*](../interfaces/proto.temporal.api.taskqueue.v1.istickyexecutionattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified StickyExecutionAttributes message. Does not implicitly [verify](proto.temporal.api.taskqueue.v1.stickyexecutionattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IStickyExecutionAttributes*](../interfaces/proto.temporal.api.taskqueue.v1.istickyexecutionattributes.md) | StickyExecutionAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IStickyExecutionAttributes*](../interfaces/proto.temporal.api.taskqueue.v1.istickyexecutionattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified StickyExecutionAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.taskqueue.v1.stickyexecutionattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IStickyExecutionAttributes*](../interfaces/proto.temporal.api.taskqueue.v1.istickyexecutionattributes.md) | StickyExecutionAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*StickyExecutionAttributes*](proto.temporal.api.taskqueue.v1.stickyexecutionattributes.md)

Creates a StickyExecutionAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*StickyExecutionAttributes*](proto.temporal.api.taskqueue.v1.stickyexecutionattributes.md)

StickyExecutionAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*StickyExecutionAttributes*](proto.temporal.api.taskqueue.v1.stickyexecutionattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a StickyExecutionAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*StickyExecutionAttributes*](proto.temporal.api.taskqueue.v1.stickyexecutionattributes.md) | StickyExecutionAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a StickyExecutionAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
