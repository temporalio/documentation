# Class: ListClosedWorkflowExecutionsResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).ListClosedWorkflowExecutionsResponse

Represents a ListClosedWorkflowExecutionsResponse.

## Implements

* [*IListClosedWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsresponse.md#constructor)

### Properties

- [executions](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsresponse.md#executions)
- [nextPageToken](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsresponse.md#nextpagetoken)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsresponse.md#verify)

## Constructors

### constructor

\+ **new ListClosedWorkflowExecutionsResponse**(`properties?`: [*IListClosedWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsresponse.md)): [*ListClosedWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsresponse.md)

Constructs a new ListClosedWorkflowExecutionsResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IListClosedWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsresponse.md) |

**Returns:** [*ListClosedWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsresponse.md)

## Properties

### executions

• **executions**: [*IWorkflowExecutionInfo*](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md)[]

ListClosedWorkflowExecutionsResponse executions.

Implementation of: [IListClosedWorkflowExecutionsResponse](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsresponse.md).[executions](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsresponse.md#executions)

___

### nextPageToken

• **nextPageToken**: *Uint8Array*

ListClosedWorkflowExecutionsResponse nextPageToken.

Implementation of: [IListClosedWorkflowExecutionsResponse](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsresponse.md).[nextPageToken](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsresponse.md#nextpagetoken)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ListClosedWorkflowExecutionsResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IListClosedWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsresponse.md)): [*ListClosedWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsresponse.md)

Creates a new ListClosedWorkflowExecutionsResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IListClosedWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsresponse.md) |

**Returns:** [*ListClosedWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsresponse.md)

ListClosedWorkflowExecutionsResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ListClosedWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsresponse.md)

Decodes a ListClosedWorkflowExecutionsResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ListClosedWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsresponse.md)

ListClosedWorkflowExecutionsResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ListClosedWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsresponse.md)

Decodes a ListClosedWorkflowExecutionsResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ListClosedWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsresponse.md)

ListClosedWorkflowExecutionsResponse

___

### encode

▸ `Static`**encode**(`message`: [*IListClosedWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified ListClosedWorkflowExecutionsResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IListClosedWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsresponse.md) | ListClosedWorkflowExecutionsResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IListClosedWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified ListClosedWorkflowExecutionsResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IListClosedWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsresponse.md) | ListClosedWorkflowExecutionsResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ListClosedWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsresponse.md)

Creates a ListClosedWorkflowExecutionsResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ListClosedWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsresponse.md)

ListClosedWorkflowExecutionsResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*ListClosedWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ListClosedWorkflowExecutionsResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ListClosedWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsresponse.md) | ListClosedWorkflowExecutionsResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ListClosedWorkflowExecutionsResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
