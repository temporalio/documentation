# Class: QueryWorkflowRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).QueryWorkflowRequest

Represents a QueryWorkflowRequest.

## Implements

* [*IQueryWorkflowRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iqueryworkflowrequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.queryworkflowrequest.md#constructor)

### Properties

- [execution](proto.temporal.api.workflowservice.v1.queryworkflowrequest.md#execution)
- [namespace](proto.temporal.api.workflowservice.v1.queryworkflowrequest.md#namespace)
- [query](proto.temporal.api.workflowservice.v1.queryworkflowrequest.md#query)
- [queryRejectCondition](proto.temporal.api.workflowservice.v1.queryworkflowrequest.md#queryrejectcondition)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.queryworkflowrequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.queryworkflowrequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.queryworkflowrequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.queryworkflowrequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.queryworkflowrequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.queryworkflowrequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.queryworkflowrequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.queryworkflowrequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.queryworkflowrequest.md#verify)

## Constructors

### constructor

\+ **new QueryWorkflowRequest**(`properties?`: [*IQueryWorkflowRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iqueryworkflowrequest.md)): [*QueryWorkflowRequest*](proto.temporal.api.workflowservice.v1.queryworkflowrequest.md)

Constructs a new QueryWorkflowRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IQueryWorkflowRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iqueryworkflowrequest.md) |

**Returns:** [*QueryWorkflowRequest*](proto.temporal.api.workflowservice.v1.queryworkflowrequest.md)

## Properties

### execution

• `Optional` **execution**: *null* \| [*IWorkflowExecution*](../interfaces/proto.temporal.api.common.v1.iworkflowexecution.md)

QueryWorkflowRequest execution.

Implementation of: [IQueryWorkflowRequest](../interfaces/proto.temporal.api.workflowservice.v1.iqueryworkflowrequest.md).[execution](../interfaces/proto.temporal.api.workflowservice.v1.iqueryworkflowrequest.md#execution)

___

### namespace

• **namespace**: *string*

QueryWorkflowRequest namespace.

Implementation of: [IQueryWorkflowRequest](../interfaces/proto.temporal.api.workflowservice.v1.iqueryworkflowrequest.md).[namespace](../interfaces/proto.temporal.api.workflowservice.v1.iqueryworkflowrequest.md#namespace)

___

### query

• `Optional` **query**: *null* \| [*IWorkflowQuery*](../interfaces/proto.temporal.api.query.v1.iworkflowquery.md)

QueryWorkflowRequest query.

Implementation of: [IQueryWorkflowRequest](../interfaces/proto.temporal.api.workflowservice.v1.iqueryworkflowrequest.md).[query](../interfaces/proto.temporal.api.workflowservice.v1.iqueryworkflowrequest.md#query)

___

### queryRejectCondition

• **queryRejectCondition**: [*QueryRejectCondition*](../enums/proto.temporal.api.enums.v1.queryrejectcondition.md)

QueryWorkflowRequest queryRejectCondition.

Implementation of: [IQueryWorkflowRequest](../interfaces/proto.temporal.api.workflowservice.v1.iqueryworkflowrequest.md).[queryRejectCondition](../interfaces/proto.temporal.api.workflowservice.v1.iqueryworkflowrequest.md#queryrejectcondition)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this QueryWorkflowRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IQueryWorkflowRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iqueryworkflowrequest.md)): [*QueryWorkflowRequest*](proto.temporal.api.workflowservice.v1.queryworkflowrequest.md)

Creates a new QueryWorkflowRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IQueryWorkflowRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iqueryworkflowrequest.md) |

**Returns:** [*QueryWorkflowRequest*](proto.temporal.api.workflowservice.v1.queryworkflowrequest.md)

QueryWorkflowRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*QueryWorkflowRequest*](proto.temporal.api.workflowservice.v1.queryworkflowrequest.md)

Decodes a QueryWorkflowRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*QueryWorkflowRequest*](proto.temporal.api.workflowservice.v1.queryworkflowrequest.md)

QueryWorkflowRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*QueryWorkflowRequest*](proto.temporal.api.workflowservice.v1.queryworkflowrequest.md)

Decodes a QueryWorkflowRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*QueryWorkflowRequest*](proto.temporal.api.workflowservice.v1.queryworkflowrequest.md)

QueryWorkflowRequest

___

### encode

▸ `Static`**encode**(`message`: [*IQueryWorkflowRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iqueryworkflowrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified QueryWorkflowRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.queryworkflowrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IQueryWorkflowRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iqueryworkflowrequest.md) | QueryWorkflowRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IQueryWorkflowRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iqueryworkflowrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified QueryWorkflowRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.queryworkflowrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IQueryWorkflowRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iqueryworkflowrequest.md) | QueryWorkflowRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*QueryWorkflowRequest*](proto.temporal.api.workflowservice.v1.queryworkflowrequest.md)

Creates a QueryWorkflowRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*QueryWorkflowRequest*](proto.temporal.api.workflowservice.v1.queryworkflowrequest.md)

QueryWorkflowRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*QueryWorkflowRequest*](proto.temporal.api.workflowservice.v1.queryworkflowrequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a QueryWorkflowRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*QueryWorkflowRequest*](proto.temporal.api.workflowservice.v1.queryworkflowrequest.md) | QueryWorkflowRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a QueryWorkflowRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
