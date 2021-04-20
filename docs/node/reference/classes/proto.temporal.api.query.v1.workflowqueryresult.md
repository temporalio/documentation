# Class: WorkflowQueryResult

[query](../modules/proto.temporal.api.query.md).[v1](../modules/proto.temporal.api.query.v1.md).WorkflowQueryResult

Represents a WorkflowQueryResult.

## Implements

* [*IWorkflowQueryResult*](../interfaces/proto.temporal.api.query.v1.iworkflowqueryresult.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.query.v1.workflowqueryresult.md#constructor)

### Properties

- [answer](proto.temporal.api.query.v1.workflowqueryresult.md#answer)
- [errorMessage](proto.temporal.api.query.v1.workflowqueryresult.md#errormessage)
- [resultType](proto.temporal.api.query.v1.workflowqueryresult.md#resulttype)

### Methods

- [toJSON](proto.temporal.api.query.v1.workflowqueryresult.md#tojson)
- [create](proto.temporal.api.query.v1.workflowqueryresult.md#create)
- [decode](proto.temporal.api.query.v1.workflowqueryresult.md#decode)
- [decodeDelimited](proto.temporal.api.query.v1.workflowqueryresult.md#decodedelimited)
- [encode](proto.temporal.api.query.v1.workflowqueryresult.md#encode)
- [encodeDelimited](proto.temporal.api.query.v1.workflowqueryresult.md#encodedelimited)
- [fromObject](proto.temporal.api.query.v1.workflowqueryresult.md#fromobject)
- [toObject](proto.temporal.api.query.v1.workflowqueryresult.md#toobject)
- [verify](proto.temporal.api.query.v1.workflowqueryresult.md#verify)

## Constructors

### constructor

\+ **new WorkflowQueryResult**(`properties?`: [*IWorkflowQueryResult*](../interfaces/proto.temporal.api.query.v1.iworkflowqueryresult.md)): [*WorkflowQueryResult*](proto.temporal.api.query.v1.workflowqueryresult.md)

Constructs a new WorkflowQueryResult.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowQueryResult*](../interfaces/proto.temporal.api.query.v1.iworkflowqueryresult.md) |

**Returns:** [*WorkflowQueryResult*](proto.temporal.api.query.v1.workflowqueryresult.md)

## Properties

### answer

• `Optional` **answer**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

WorkflowQueryResult answer.

Implementation of: [IWorkflowQueryResult](../interfaces/proto.temporal.api.query.v1.iworkflowqueryresult.md).[answer](../interfaces/proto.temporal.api.query.v1.iworkflowqueryresult.md#answer)

___

### errorMessage

• **errorMessage**: *string*

WorkflowQueryResult errorMessage.

Implementation of: [IWorkflowQueryResult](../interfaces/proto.temporal.api.query.v1.iworkflowqueryresult.md).[errorMessage](../interfaces/proto.temporal.api.query.v1.iworkflowqueryresult.md#errormessage)

___

### resultType

• **resultType**: [*QueryResultType*](../enums/proto.temporal.api.enums.v1.queryresulttype.md)

WorkflowQueryResult resultType.

Implementation of: [IWorkflowQueryResult](../interfaces/proto.temporal.api.query.v1.iworkflowqueryresult.md).[resultType](../interfaces/proto.temporal.api.query.v1.iworkflowqueryresult.md#resulttype)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this WorkflowQueryResult to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IWorkflowQueryResult*](../interfaces/proto.temporal.api.query.v1.iworkflowqueryresult.md)): [*WorkflowQueryResult*](proto.temporal.api.query.v1.workflowqueryresult.md)

Creates a new WorkflowQueryResult instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowQueryResult*](../interfaces/proto.temporal.api.query.v1.iworkflowqueryresult.md) |

**Returns:** [*WorkflowQueryResult*](proto.temporal.api.query.v1.workflowqueryresult.md)

WorkflowQueryResult instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*WorkflowQueryResult*](proto.temporal.api.query.v1.workflowqueryresult.md)

Decodes a WorkflowQueryResult message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*WorkflowQueryResult*](proto.temporal.api.query.v1.workflowqueryresult.md)

WorkflowQueryResult

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*WorkflowQueryResult*](proto.temporal.api.query.v1.workflowqueryresult.md)

Decodes a WorkflowQueryResult message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*WorkflowQueryResult*](proto.temporal.api.query.v1.workflowqueryresult.md)

WorkflowQueryResult

___

### encode

▸ `Static`**encode**(`message`: [*IWorkflowQueryResult*](../interfaces/proto.temporal.api.query.v1.iworkflowqueryresult.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowQueryResult message. Does not implicitly [verify](proto.temporal.api.query.v1.workflowqueryresult.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowQueryResult*](../interfaces/proto.temporal.api.query.v1.iworkflowqueryresult.md) | WorkflowQueryResult message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IWorkflowQueryResult*](../interfaces/proto.temporal.api.query.v1.iworkflowqueryresult.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowQueryResult message, length delimited. Does not implicitly [verify](proto.temporal.api.query.v1.workflowqueryresult.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowQueryResult*](../interfaces/proto.temporal.api.query.v1.iworkflowqueryresult.md) | WorkflowQueryResult message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*WorkflowQueryResult*](proto.temporal.api.query.v1.workflowqueryresult.md)

Creates a WorkflowQueryResult message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*WorkflowQueryResult*](proto.temporal.api.query.v1.workflowqueryresult.md)

WorkflowQueryResult

___

### toObject

▸ `Static`**toObject**(`message`: [*WorkflowQueryResult*](proto.temporal.api.query.v1.workflowqueryresult.md), `options?`: IConversionOptions): *object*

Creates a plain object from a WorkflowQueryResult message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*WorkflowQueryResult*](proto.temporal.api.query.v1.workflowqueryresult.md) | WorkflowQueryResult   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a WorkflowQueryResult message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
