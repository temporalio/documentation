# Class: WorkflowQuery

[query](../modules/proto.temporal.api.query.md).[v1](../modules/proto.temporal.api.query.v1.md).WorkflowQuery

Represents a WorkflowQuery.

## Implements

* [*IWorkflowQuery*](../interfaces/proto.temporal.api.query.v1.iworkflowquery.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.query.v1.workflowquery.md#constructor)

### Properties

- [queryArgs](proto.temporal.api.query.v1.workflowquery.md#queryargs)
- [queryType](proto.temporal.api.query.v1.workflowquery.md#querytype)

### Methods

- [toJSON](proto.temporal.api.query.v1.workflowquery.md#tojson)
- [create](proto.temporal.api.query.v1.workflowquery.md#create)
- [decode](proto.temporal.api.query.v1.workflowquery.md#decode)
- [decodeDelimited](proto.temporal.api.query.v1.workflowquery.md#decodedelimited)
- [encode](proto.temporal.api.query.v1.workflowquery.md#encode)
- [encodeDelimited](proto.temporal.api.query.v1.workflowquery.md#encodedelimited)
- [fromObject](proto.temporal.api.query.v1.workflowquery.md#fromobject)
- [toObject](proto.temporal.api.query.v1.workflowquery.md#toobject)
- [verify](proto.temporal.api.query.v1.workflowquery.md#verify)

## Constructors

### constructor

\+ **new WorkflowQuery**(`properties?`: [*IWorkflowQuery*](../interfaces/proto.temporal.api.query.v1.iworkflowquery.md)): [*WorkflowQuery*](proto.temporal.api.query.v1.workflowquery.md)

Constructs a new WorkflowQuery.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowQuery*](../interfaces/proto.temporal.api.query.v1.iworkflowquery.md) |

**Returns:** [*WorkflowQuery*](proto.temporal.api.query.v1.workflowquery.md)

## Properties

### queryArgs

• `Optional` **queryArgs**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

WorkflowQuery queryArgs.

Implementation of: [IWorkflowQuery](../interfaces/proto.temporal.api.query.v1.iworkflowquery.md).[queryArgs](../interfaces/proto.temporal.api.query.v1.iworkflowquery.md#queryargs)

___

### queryType

• **queryType**: *string*

WorkflowQuery queryType.

Implementation of: [IWorkflowQuery](../interfaces/proto.temporal.api.query.v1.iworkflowquery.md).[queryType](../interfaces/proto.temporal.api.query.v1.iworkflowquery.md#querytype)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this WorkflowQuery to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IWorkflowQuery*](../interfaces/proto.temporal.api.query.v1.iworkflowquery.md)): [*WorkflowQuery*](proto.temporal.api.query.v1.workflowquery.md)

Creates a new WorkflowQuery instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowQuery*](../interfaces/proto.temporal.api.query.v1.iworkflowquery.md) |

**Returns:** [*WorkflowQuery*](proto.temporal.api.query.v1.workflowquery.md)

WorkflowQuery instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*WorkflowQuery*](proto.temporal.api.query.v1.workflowquery.md)

Decodes a WorkflowQuery message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*WorkflowQuery*](proto.temporal.api.query.v1.workflowquery.md)

WorkflowQuery

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*WorkflowQuery*](proto.temporal.api.query.v1.workflowquery.md)

Decodes a WorkflowQuery message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*WorkflowQuery*](proto.temporal.api.query.v1.workflowquery.md)

WorkflowQuery

___

### encode

▸ `Static`**encode**(`message`: [*IWorkflowQuery*](../interfaces/proto.temporal.api.query.v1.iworkflowquery.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowQuery message. Does not implicitly [verify](proto.temporal.api.query.v1.workflowquery.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowQuery*](../interfaces/proto.temporal.api.query.v1.iworkflowquery.md) | WorkflowQuery message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IWorkflowQuery*](../interfaces/proto.temporal.api.query.v1.iworkflowquery.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowQuery message, length delimited. Does not implicitly [verify](proto.temporal.api.query.v1.workflowquery.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowQuery*](../interfaces/proto.temporal.api.query.v1.iworkflowquery.md) | WorkflowQuery message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*WorkflowQuery*](proto.temporal.api.query.v1.workflowquery.md)

Creates a WorkflowQuery message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*WorkflowQuery*](proto.temporal.api.query.v1.workflowquery.md)

WorkflowQuery

___

### toObject

▸ `Static`**toObject**(`message`: [*WorkflowQuery*](proto.temporal.api.query.v1.workflowquery.md), `options?`: IConversionOptions): *object*

Creates a plain object from a WorkflowQuery message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*WorkflowQuery*](proto.temporal.api.query.v1.workflowquery.md) | WorkflowQuery   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a WorkflowQuery message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
