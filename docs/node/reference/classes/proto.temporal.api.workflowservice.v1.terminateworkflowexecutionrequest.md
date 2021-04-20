# Class: TerminateWorkflowExecutionRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).TerminateWorkflowExecutionRequest

Represents a TerminateWorkflowExecutionRequest.

## Implements

* [*ITerminateWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionrequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionrequest.md#constructor)

### Properties

- [details](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionrequest.md#details)
- [firstExecutionRunId](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionrequest.md#firstexecutionrunid)
- [identity](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionrequest.md#identity)
- [namespace](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionrequest.md#namespace)
- [reason](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionrequest.md#reason)
- [workflowExecution](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionrequest.md#workflowexecution)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionrequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionrequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionrequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionrequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionrequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionrequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionrequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionrequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionrequest.md#verify)

## Constructors

### constructor

\+ **new TerminateWorkflowExecutionRequest**(`properties?`: [*ITerminateWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionrequest.md)): [*TerminateWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionrequest.md)

Constructs a new TerminateWorkflowExecutionRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ITerminateWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionrequest.md) |

**Returns:** [*TerminateWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionrequest.md)

## Properties

### details

• `Optional` **details**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

TerminateWorkflowExecutionRequest details.

Implementation of: [ITerminateWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionrequest.md).[details](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionrequest.md#details)

___

### firstExecutionRunId

• **firstExecutionRunId**: *string*

TerminateWorkflowExecutionRequest firstExecutionRunId.

Implementation of: [ITerminateWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionrequest.md).[firstExecutionRunId](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionrequest.md#firstexecutionrunid)

___

### identity

• **identity**: *string*

TerminateWorkflowExecutionRequest identity.

Implementation of: [ITerminateWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionrequest.md).[identity](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionrequest.md#identity)

___

### namespace

• **namespace**: *string*

TerminateWorkflowExecutionRequest namespace.

Implementation of: [ITerminateWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionrequest.md).[namespace](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionrequest.md#namespace)

___

### reason

• **reason**: *string*

TerminateWorkflowExecutionRequest reason.

Implementation of: [ITerminateWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionrequest.md).[reason](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionrequest.md#reason)

___

### workflowExecution

• `Optional` **workflowExecution**: *null* \| [*IWorkflowExecution*](../interfaces/proto.temporal.api.common.v1.iworkflowexecution.md)

TerminateWorkflowExecutionRequest workflowExecution.

Implementation of: [ITerminateWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionrequest.md).[workflowExecution](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionrequest.md#workflowexecution)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this TerminateWorkflowExecutionRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ITerminateWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionrequest.md)): [*TerminateWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionrequest.md)

Creates a new TerminateWorkflowExecutionRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ITerminateWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionrequest.md) |

**Returns:** [*TerminateWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionrequest.md)

TerminateWorkflowExecutionRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*TerminateWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionrequest.md)

Decodes a TerminateWorkflowExecutionRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*TerminateWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionrequest.md)

TerminateWorkflowExecutionRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*TerminateWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionrequest.md)

Decodes a TerminateWorkflowExecutionRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*TerminateWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionrequest.md)

TerminateWorkflowExecutionRequest

___

### encode

▸ `Static`**encode**(`message`: [*ITerminateWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified TerminateWorkflowExecutionRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ITerminateWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionrequest.md) | TerminateWorkflowExecutionRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ITerminateWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified TerminateWorkflowExecutionRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ITerminateWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionrequest.md) | TerminateWorkflowExecutionRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*TerminateWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionrequest.md)

Creates a TerminateWorkflowExecutionRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*TerminateWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionrequest.md)

TerminateWorkflowExecutionRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*TerminateWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionrequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a TerminateWorkflowExecutionRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*TerminateWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionrequest.md) | TerminateWorkflowExecutionRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a TerminateWorkflowExecutionRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
