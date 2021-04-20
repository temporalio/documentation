# Class: ListOpenWorkflowExecutionsResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).ListOpenWorkflowExecutionsResponse

Represents a ListOpenWorkflowExecutionsResponse.

## Implements

* [*IListOpenWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsresponse.md#constructor)

### Properties

- [executions](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsresponse.md#executions)
- [nextPageToken](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsresponse.md#nextpagetoken)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsresponse.md#verify)

## Constructors

### constructor

\+ **new ListOpenWorkflowExecutionsResponse**(`properties?`: [*IListOpenWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsresponse.md)): [*ListOpenWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsresponse.md)

Constructs a new ListOpenWorkflowExecutionsResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IListOpenWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsresponse.md) |

**Returns:** [*ListOpenWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsresponse.md)

## Properties

### executions

• **executions**: [*IWorkflowExecutionInfo*](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md)[]

ListOpenWorkflowExecutionsResponse executions.

Implementation of: [IListOpenWorkflowExecutionsResponse](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsresponse.md).[executions](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsresponse.md#executions)

___

### nextPageToken

• **nextPageToken**: *Uint8Array*

ListOpenWorkflowExecutionsResponse nextPageToken.

Implementation of: [IListOpenWorkflowExecutionsResponse](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsresponse.md).[nextPageToken](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsresponse.md#nextpagetoken)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ListOpenWorkflowExecutionsResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IListOpenWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsresponse.md)): [*ListOpenWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsresponse.md)

Creates a new ListOpenWorkflowExecutionsResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IListOpenWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsresponse.md) |

**Returns:** [*ListOpenWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsresponse.md)

ListOpenWorkflowExecutionsResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ListOpenWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsresponse.md)

Decodes a ListOpenWorkflowExecutionsResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ListOpenWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsresponse.md)

ListOpenWorkflowExecutionsResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ListOpenWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsresponse.md)

Decodes a ListOpenWorkflowExecutionsResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ListOpenWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsresponse.md)

ListOpenWorkflowExecutionsResponse

___

### encode

▸ `Static`**encode**(`message`: [*IListOpenWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified ListOpenWorkflowExecutionsResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IListOpenWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsresponse.md) | ListOpenWorkflowExecutionsResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IListOpenWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified ListOpenWorkflowExecutionsResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IListOpenWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsresponse.md) | ListOpenWorkflowExecutionsResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ListOpenWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsresponse.md)

Creates a ListOpenWorkflowExecutionsResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ListOpenWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsresponse.md)

ListOpenWorkflowExecutionsResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*ListOpenWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ListOpenWorkflowExecutionsResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ListOpenWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsresponse.md) | ListOpenWorkflowExecutionsResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ListOpenWorkflowExecutionsResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
