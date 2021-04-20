# Class: ResetWorkflowExecutionRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).ResetWorkflowExecutionRequest

Represents a ResetWorkflowExecutionRequest.

## Implements

* [*IResetWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iresetworkflowexecutionrequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.resetworkflowexecutionrequest.md#constructor)

### Properties

- [namespace](proto.temporal.api.workflowservice.v1.resetworkflowexecutionrequest.md#namespace)
- [reason](proto.temporal.api.workflowservice.v1.resetworkflowexecutionrequest.md#reason)
- [requestId](proto.temporal.api.workflowservice.v1.resetworkflowexecutionrequest.md#requestid)
- [workflowExecution](proto.temporal.api.workflowservice.v1.resetworkflowexecutionrequest.md#workflowexecution)
- [workflowTaskFinishEventId](proto.temporal.api.workflowservice.v1.resetworkflowexecutionrequest.md#workflowtaskfinisheventid)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.resetworkflowexecutionrequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.resetworkflowexecutionrequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.resetworkflowexecutionrequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.resetworkflowexecutionrequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.resetworkflowexecutionrequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.resetworkflowexecutionrequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.resetworkflowexecutionrequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.resetworkflowexecutionrequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.resetworkflowexecutionrequest.md#verify)

## Constructors

### constructor

\+ **new ResetWorkflowExecutionRequest**(`properties?`: [*IResetWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iresetworkflowexecutionrequest.md)): [*ResetWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.resetworkflowexecutionrequest.md)

Constructs a new ResetWorkflowExecutionRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IResetWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iresetworkflowexecutionrequest.md) |

**Returns:** [*ResetWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.resetworkflowexecutionrequest.md)

## Properties

### namespace

• **namespace**: *string*

ResetWorkflowExecutionRequest namespace.

Implementation of: [IResetWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.iresetworkflowexecutionrequest.md).[namespace](../interfaces/proto.temporal.api.workflowservice.v1.iresetworkflowexecutionrequest.md#namespace)

___

### reason

• **reason**: *string*

ResetWorkflowExecutionRequest reason.

Implementation of: [IResetWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.iresetworkflowexecutionrequest.md).[reason](../interfaces/proto.temporal.api.workflowservice.v1.iresetworkflowexecutionrequest.md#reason)

___

### requestId

• **requestId**: *string*

ResetWorkflowExecutionRequest requestId.

Implementation of: [IResetWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.iresetworkflowexecutionrequest.md).[requestId](../interfaces/proto.temporal.api.workflowservice.v1.iresetworkflowexecutionrequest.md#requestid)

___

### workflowExecution

• `Optional` **workflowExecution**: *null* \| [*IWorkflowExecution*](../interfaces/proto.temporal.api.common.v1.iworkflowexecution.md)

ResetWorkflowExecutionRequest workflowExecution.

Implementation of: [IResetWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.iresetworkflowexecutionrequest.md).[workflowExecution](../interfaces/proto.temporal.api.workflowservice.v1.iresetworkflowexecutionrequest.md#workflowexecution)

___

### workflowTaskFinishEventId

• **workflowTaskFinishEventId**: Long

ResetWorkflowExecutionRequest workflowTaskFinishEventId.

Implementation of: [IResetWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.iresetworkflowexecutionrequest.md).[workflowTaskFinishEventId](../interfaces/proto.temporal.api.workflowservice.v1.iresetworkflowexecutionrequest.md#workflowtaskfinisheventid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ResetWorkflowExecutionRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IResetWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iresetworkflowexecutionrequest.md)): [*ResetWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.resetworkflowexecutionrequest.md)

Creates a new ResetWorkflowExecutionRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IResetWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iresetworkflowexecutionrequest.md) |

**Returns:** [*ResetWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.resetworkflowexecutionrequest.md)

ResetWorkflowExecutionRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ResetWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.resetworkflowexecutionrequest.md)

Decodes a ResetWorkflowExecutionRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ResetWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.resetworkflowexecutionrequest.md)

ResetWorkflowExecutionRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ResetWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.resetworkflowexecutionrequest.md)

Decodes a ResetWorkflowExecutionRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ResetWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.resetworkflowexecutionrequest.md)

ResetWorkflowExecutionRequest

___

### encode

▸ `Static`**encode**(`message`: [*IResetWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iresetworkflowexecutionrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified ResetWorkflowExecutionRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.resetworkflowexecutionrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IResetWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iresetworkflowexecutionrequest.md) | ResetWorkflowExecutionRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IResetWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iresetworkflowexecutionrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified ResetWorkflowExecutionRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.resetworkflowexecutionrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IResetWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iresetworkflowexecutionrequest.md) | ResetWorkflowExecutionRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ResetWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.resetworkflowexecutionrequest.md)

Creates a ResetWorkflowExecutionRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ResetWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.resetworkflowexecutionrequest.md)

ResetWorkflowExecutionRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*ResetWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.resetworkflowexecutionrequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ResetWorkflowExecutionRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ResetWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.resetworkflowexecutionrequest.md) | ResetWorkflowExecutionRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ResetWorkflowExecutionRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
