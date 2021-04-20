# Class: ResetStickyTaskQueueRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).ResetStickyTaskQueueRequest

Represents a ResetStickyTaskQueueRequest.

## Implements

* [*IResetStickyTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iresetstickytaskqueuerequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.resetstickytaskqueuerequest.md#constructor)

### Properties

- [execution](proto.temporal.api.workflowservice.v1.resetstickytaskqueuerequest.md#execution)
- [namespace](proto.temporal.api.workflowservice.v1.resetstickytaskqueuerequest.md#namespace)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.resetstickytaskqueuerequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.resetstickytaskqueuerequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.resetstickytaskqueuerequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.resetstickytaskqueuerequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.resetstickytaskqueuerequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.resetstickytaskqueuerequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.resetstickytaskqueuerequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.resetstickytaskqueuerequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.resetstickytaskqueuerequest.md#verify)

## Constructors

### constructor

\+ **new ResetStickyTaskQueueRequest**(`properties?`: [*IResetStickyTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iresetstickytaskqueuerequest.md)): [*ResetStickyTaskQueueRequest*](proto.temporal.api.workflowservice.v1.resetstickytaskqueuerequest.md)

Constructs a new ResetStickyTaskQueueRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IResetStickyTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iresetstickytaskqueuerequest.md) |

**Returns:** [*ResetStickyTaskQueueRequest*](proto.temporal.api.workflowservice.v1.resetstickytaskqueuerequest.md)

## Properties

### execution

• `Optional` **execution**: *null* \| [*IWorkflowExecution*](../interfaces/proto.temporal.api.common.v1.iworkflowexecution.md)

ResetStickyTaskQueueRequest execution.

Implementation of: [IResetStickyTaskQueueRequest](../interfaces/proto.temporal.api.workflowservice.v1.iresetstickytaskqueuerequest.md).[execution](../interfaces/proto.temporal.api.workflowservice.v1.iresetstickytaskqueuerequest.md#execution)

___

### namespace

• **namespace**: *string*

ResetStickyTaskQueueRequest namespace.

Implementation of: [IResetStickyTaskQueueRequest](../interfaces/proto.temporal.api.workflowservice.v1.iresetstickytaskqueuerequest.md).[namespace](../interfaces/proto.temporal.api.workflowservice.v1.iresetstickytaskqueuerequest.md#namespace)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ResetStickyTaskQueueRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IResetStickyTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iresetstickytaskqueuerequest.md)): [*ResetStickyTaskQueueRequest*](proto.temporal.api.workflowservice.v1.resetstickytaskqueuerequest.md)

Creates a new ResetStickyTaskQueueRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IResetStickyTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iresetstickytaskqueuerequest.md) |

**Returns:** [*ResetStickyTaskQueueRequest*](proto.temporal.api.workflowservice.v1.resetstickytaskqueuerequest.md)

ResetStickyTaskQueueRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ResetStickyTaskQueueRequest*](proto.temporal.api.workflowservice.v1.resetstickytaskqueuerequest.md)

Decodes a ResetStickyTaskQueueRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ResetStickyTaskQueueRequest*](proto.temporal.api.workflowservice.v1.resetstickytaskqueuerequest.md)

ResetStickyTaskQueueRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ResetStickyTaskQueueRequest*](proto.temporal.api.workflowservice.v1.resetstickytaskqueuerequest.md)

Decodes a ResetStickyTaskQueueRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ResetStickyTaskQueueRequest*](proto.temporal.api.workflowservice.v1.resetstickytaskqueuerequest.md)

ResetStickyTaskQueueRequest

___

### encode

▸ `Static`**encode**(`message`: [*IResetStickyTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iresetstickytaskqueuerequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified ResetStickyTaskQueueRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.resetstickytaskqueuerequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IResetStickyTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iresetstickytaskqueuerequest.md) | ResetStickyTaskQueueRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IResetStickyTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iresetstickytaskqueuerequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified ResetStickyTaskQueueRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.resetstickytaskqueuerequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IResetStickyTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iresetstickytaskqueuerequest.md) | ResetStickyTaskQueueRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ResetStickyTaskQueueRequest*](proto.temporal.api.workflowservice.v1.resetstickytaskqueuerequest.md)

Creates a ResetStickyTaskQueueRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ResetStickyTaskQueueRequest*](proto.temporal.api.workflowservice.v1.resetstickytaskqueuerequest.md)

ResetStickyTaskQueueRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*ResetStickyTaskQueueRequest*](proto.temporal.api.workflowservice.v1.resetstickytaskqueuerequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ResetStickyTaskQueueRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ResetStickyTaskQueueRequest*](proto.temporal.api.workflowservice.v1.resetstickytaskqueuerequest.md) | ResetStickyTaskQueueRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ResetStickyTaskQueueRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
