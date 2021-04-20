# Class: DescribeWorkflowExecutionRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).DescribeWorkflowExecutionRequest

Represents a DescribeWorkflowExecutionRequest.

## Implements

* [*IDescribeWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionrequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.describeworkflowexecutionrequest.md#constructor)

### Properties

- [execution](proto.temporal.api.workflowservice.v1.describeworkflowexecutionrequest.md#execution)
- [namespace](proto.temporal.api.workflowservice.v1.describeworkflowexecutionrequest.md#namespace)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.describeworkflowexecutionrequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.describeworkflowexecutionrequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.describeworkflowexecutionrequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.describeworkflowexecutionrequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.describeworkflowexecutionrequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.describeworkflowexecutionrequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.describeworkflowexecutionrequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.describeworkflowexecutionrequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.describeworkflowexecutionrequest.md#verify)

## Constructors

### constructor

\+ **new DescribeWorkflowExecutionRequest**(`properties?`: [*IDescribeWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionrequest.md)): [*DescribeWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.describeworkflowexecutionrequest.md)

Constructs a new DescribeWorkflowExecutionRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IDescribeWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionrequest.md) |

**Returns:** [*DescribeWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.describeworkflowexecutionrequest.md)

## Properties

### execution

• `Optional` **execution**: *null* \| [*IWorkflowExecution*](../interfaces/proto.temporal.api.common.v1.iworkflowexecution.md)

DescribeWorkflowExecutionRequest execution.

Implementation of: [IDescribeWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionrequest.md).[execution](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionrequest.md#execution)

___

### namespace

• **namespace**: *string*

DescribeWorkflowExecutionRequest namespace.

Implementation of: [IDescribeWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionrequest.md).[namespace](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionrequest.md#namespace)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this DescribeWorkflowExecutionRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IDescribeWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionrequest.md)): [*DescribeWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.describeworkflowexecutionrequest.md)

Creates a new DescribeWorkflowExecutionRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IDescribeWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionrequest.md) |

**Returns:** [*DescribeWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.describeworkflowexecutionrequest.md)

DescribeWorkflowExecutionRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*DescribeWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.describeworkflowexecutionrequest.md)

Decodes a DescribeWorkflowExecutionRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*DescribeWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.describeworkflowexecutionrequest.md)

DescribeWorkflowExecutionRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*DescribeWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.describeworkflowexecutionrequest.md)

Decodes a DescribeWorkflowExecutionRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*DescribeWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.describeworkflowexecutionrequest.md)

DescribeWorkflowExecutionRequest

___

### encode

▸ `Static`**encode**(`message`: [*IDescribeWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified DescribeWorkflowExecutionRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.describeworkflowexecutionrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IDescribeWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionrequest.md) | DescribeWorkflowExecutionRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IDescribeWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified DescribeWorkflowExecutionRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.describeworkflowexecutionrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IDescribeWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionrequest.md) | DescribeWorkflowExecutionRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*DescribeWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.describeworkflowexecutionrequest.md)

Creates a DescribeWorkflowExecutionRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*DescribeWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.describeworkflowexecutionrequest.md)

DescribeWorkflowExecutionRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*DescribeWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.describeworkflowexecutionrequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a DescribeWorkflowExecutionRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*DescribeWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.describeworkflowexecutionrequest.md) | DescribeWorkflowExecutionRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a DescribeWorkflowExecutionRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
