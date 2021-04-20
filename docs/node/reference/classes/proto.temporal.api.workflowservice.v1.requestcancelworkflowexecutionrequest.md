# Class: RequestCancelWorkflowExecutionRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).RequestCancelWorkflowExecutionRequest

Represents a RequestCancelWorkflowExecutionRequest.

## Implements

* [*IRequestCancelWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionrequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionrequest.md#constructor)

### Properties

- [firstExecutionRunId](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionrequest.md#firstexecutionrunid)
- [identity](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionrequest.md#identity)
- [namespace](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionrequest.md#namespace)
- [requestId](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionrequest.md#requestid)
- [workflowExecution](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionrequest.md#workflowexecution)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionrequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionrequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionrequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionrequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionrequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionrequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionrequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionrequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionrequest.md#verify)

## Constructors

### constructor

\+ **new RequestCancelWorkflowExecutionRequest**(`properties?`: [*IRequestCancelWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionrequest.md)): [*RequestCancelWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionrequest.md)

Constructs a new RequestCancelWorkflowExecutionRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRequestCancelWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionrequest.md) |

**Returns:** [*RequestCancelWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionrequest.md)

## Properties

### firstExecutionRunId

• **firstExecutionRunId**: *string*

RequestCancelWorkflowExecutionRequest firstExecutionRunId.

Implementation of: [IRequestCancelWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionrequest.md).[firstExecutionRunId](../interfaces/proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionrequest.md#firstexecutionrunid)

___

### identity

• **identity**: *string*

RequestCancelWorkflowExecutionRequest identity.

Implementation of: [IRequestCancelWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionrequest.md).[identity](../interfaces/proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionrequest.md#identity)

___

### namespace

• **namespace**: *string*

RequestCancelWorkflowExecutionRequest namespace.

Implementation of: [IRequestCancelWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionrequest.md).[namespace](../interfaces/proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionrequest.md#namespace)

___

### requestId

• **requestId**: *string*

RequestCancelWorkflowExecutionRequest requestId.

Implementation of: [IRequestCancelWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionrequest.md).[requestId](../interfaces/proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionrequest.md#requestid)

___

### workflowExecution

• `Optional` **workflowExecution**: *null* \| [*IWorkflowExecution*](../interfaces/proto.temporal.api.common.v1.iworkflowexecution.md)

RequestCancelWorkflowExecutionRequest workflowExecution.

Implementation of: [IRequestCancelWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionrequest.md).[workflowExecution](../interfaces/proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionrequest.md#workflowexecution)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this RequestCancelWorkflowExecutionRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IRequestCancelWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionrequest.md)): [*RequestCancelWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionrequest.md)

Creates a new RequestCancelWorkflowExecutionRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRequestCancelWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionrequest.md) |

**Returns:** [*RequestCancelWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionrequest.md)

RequestCancelWorkflowExecutionRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*RequestCancelWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionrequest.md)

Decodes a RequestCancelWorkflowExecutionRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*RequestCancelWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionrequest.md)

RequestCancelWorkflowExecutionRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*RequestCancelWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionrequest.md)

Decodes a RequestCancelWorkflowExecutionRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*RequestCancelWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionrequest.md)

RequestCancelWorkflowExecutionRequest

___

### encode

▸ `Static`**encode**(`message`: [*IRequestCancelWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified RequestCancelWorkflowExecutionRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRequestCancelWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionrequest.md) | RequestCancelWorkflowExecutionRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IRequestCancelWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified RequestCancelWorkflowExecutionRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRequestCancelWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionrequest.md) | RequestCancelWorkflowExecutionRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*RequestCancelWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionrequest.md)

Creates a RequestCancelWorkflowExecutionRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*RequestCancelWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionrequest.md)

RequestCancelWorkflowExecutionRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*RequestCancelWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionrequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a RequestCancelWorkflowExecutionRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*RequestCancelWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionrequest.md) | RequestCancelWorkflowExecutionRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a RequestCancelWorkflowExecutionRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
