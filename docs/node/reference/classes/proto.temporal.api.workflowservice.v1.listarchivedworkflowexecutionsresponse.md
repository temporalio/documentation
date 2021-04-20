# Class: ListArchivedWorkflowExecutionsResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).ListArchivedWorkflowExecutionsResponse

Represents a ListArchivedWorkflowExecutionsResponse.

## Implements

* [*IListArchivedWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistarchivedworkflowexecutionsresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsresponse.md#constructor)

### Properties

- [executions](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsresponse.md#executions)
- [nextPageToken](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsresponse.md#nextpagetoken)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsresponse.md#verify)

## Constructors

### constructor

\+ **new ListArchivedWorkflowExecutionsResponse**(`properties?`: [*IListArchivedWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistarchivedworkflowexecutionsresponse.md)): [*ListArchivedWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsresponse.md)

Constructs a new ListArchivedWorkflowExecutionsResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IListArchivedWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistarchivedworkflowexecutionsresponse.md) |

**Returns:** [*ListArchivedWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsresponse.md)

## Properties

### executions

• **executions**: [*IWorkflowExecutionInfo*](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md)[]

ListArchivedWorkflowExecutionsResponse executions.

Implementation of: [IListArchivedWorkflowExecutionsResponse](../interfaces/proto.temporal.api.workflowservice.v1.ilistarchivedworkflowexecutionsresponse.md).[executions](../interfaces/proto.temporal.api.workflowservice.v1.ilistarchivedworkflowexecutionsresponse.md#executions)

___

### nextPageToken

• **nextPageToken**: *Uint8Array*

ListArchivedWorkflowExecutionsResponse nextPageToken.

Implementation of: [IListArchivedWorkflowExecutionsResponse](../interfaces/proto.temporal.api.workflowservice.v1.ilistarchivedworkflowexecutionsresponse.md).[nextPageToken](../interfaces/proto.temporal.api.workflowservice.v1.ilistarchivedworkflowexecutionsresponse.md#nextpagetoken)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ListArchivedWorkflowExecutionsResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IListArchivedWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistarchivedworkflowexecutionsresponse.md)): [*ListArchivedWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsresponse.md)

Creates a new ListArchivedWorkflowExecutionsResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IListArchivedWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistarchivedworkflowexecutionsresponse.md) |

**Returns:** [*ListArchivedWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsresponse.md)

ListArchivedWorkflowExecutionsResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ListArchivedWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsresponse.md)

Decodes a ListArchivedWorkflowExecutionsResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ListArchivedWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsresponse.md)

ListArchivedWorkflowExecutionsResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ListArchivedWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsresponse.md)

Decodes a ListArchivedWorkflowExecutionsResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ListArchivedWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsresponse.md)

ListArchivedWorkflowExecutionsResponse

___

### encode

▸ `Static`**encode**(`message`: [*IListArchivedWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistarchivedworkflowexecutionsresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified ListArchivedWorkflowExecutionsResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IListArchivedWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistarchivedworkflowexecutionsresponse.md) | ListArchivedWorkflowExecutionsResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IListArchivedWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistarchivedworkflowexecutionsresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified ListArchivedWorkflowExecutionsResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IListArchivedWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistarchivedworkflowexecutionsresponse.md) | ListArchivedWorkflowExecutionsResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ListArchivedWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsresponse.md)

Creates a ListArchivedWorkflowExecutionsResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ListArchivedWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsresponse.md)

ListArchivedWorkflowExecutionsResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*ListArchivedWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ListArchivedWorkflowExecutionsResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ListArchivedWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsresponse.md) | ListArchivedWorkflowExecutionsResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ListArchivedWorkflowExecutionsResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
