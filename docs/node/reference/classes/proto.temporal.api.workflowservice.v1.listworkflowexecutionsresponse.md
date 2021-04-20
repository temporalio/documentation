# Class: ListWorkflowExecutionsResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).ListWorkflowExecutionsResponse

Represents a ListWorkflowExecutionsResponse.

## Implements

* [*IListWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistworkflowexecutionsresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.listworkflowexecutionsresponse.md#constructor)

### Properties

- [executions](proto.temporal.api.workflowservice.v1.listworkflowexecutionsresponse.md#executions)
- [nextPageToken](proto.temporal.api.workflowservice.v1.listworkflowexecutionsresponse.md#nextpagetoken)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.listworkflowexecutionsresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.listworkflowexecutionsresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.listworkflowexecutionsresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.listworkflowexecutionsresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.listworkflowexecutionsresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.listworkflowexecutionsresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.listworkflowexecutionsresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.listworkflowexecutionsresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.listworkflowexecutionsresponse.md#verify)

## Constructors

### constructor

\+ **new ListWorkflowExecutionsResponse**(`properties?`: [*IListWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistworkflowexecutionsresponse.md)): [*ListWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listworkflowexecutionsresponse.md)

Constructs a new ListWorkflowExecutionsResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IListWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistworkflowexecutionsresponse.md) |

**Returns:** [*ListWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listworkflowexecutionsresponse.md)

## Properties

### executions

• **executions**: [*IWorkflowExecutionInfo*](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md)[]

ListWorkflowExecutionsResponse executions.

Implementation of: [IListWorkflowExecutionsResponse](../interfaces/proto.temporal.api.workflowservice.v1.ilistworkflowexecutionsresponse.md).[executions](../interfaces/proto.temporal.api.workflowservice.v1.ilistworkflowexecutionsresponse.md#executions)

___

### nextPageToken

• **nextPageToken**: *Uint8Array*

ListWorkflowExecutionsResponse nextPageToken.

Implementation of: [IListWorkflowExecutionsResponse](../interfaces/proto.temporal.api.workflowservice.v1.ilistworkflowexecutionsresponse.md).[nextPageToken](../interfaces/proto.temporal.api.workflowservice.v1.ilistworkflowexecutionsresponse.md#nextpagetoken)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ListWorkflowExecutionsResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IListWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistworkflowexecutionsresponse.md)): [*ListWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listworkflowexecutionsresponse.md)

Creates a new ListWorkflowExecutionsResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IListWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistworkflowexecutionsresponse.md) |

**Returns:** [*ListWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listworkflowexecutionsresponse.md)

ListWorkflowExecutionsResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ListWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listworkflowexecutionsresponse.md)

Decodes a ListWorkflowExecutionsResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ListWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listworkflowexecutionsresponse.md)

ListWorkflowExecutionsResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ListWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listworkflowexecutionsresponse.md)

Decodes a ListWorkflowExecutionsResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ListWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listworkflowexecutionsresponse.md)

ListWorkflowExecutionsResponse

___

### encode

▸ `Static`**encode**(`message`: [*IListWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistworkflowexecutionsresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified ListWorkflowExecutionsResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.listworkflowexecutionsresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IListWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistworkflowexecutionsresponse.md) | ListWorkflowExecutionsResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IListWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistworkflowexecutionsresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified ListWorkflowExecutionsResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.listworkflowexecutionsresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IListWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistworkflowexecutionsresponse.md) | ListWorkflowExecutionsResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ListWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listworkflowexecutionsresponse.md)

Creates a ListWorkflowExecutionsResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ListWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listworkflowexecutionsresponse.md)

ListWorkflowExecutionsResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*ListWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listworkflowexecutionsresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ListWorkflowExecutionsResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ListWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listworkflowexecutionsresponse.md) | ListWorkflowExecutionsResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ListWorkflowExecutionsResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
