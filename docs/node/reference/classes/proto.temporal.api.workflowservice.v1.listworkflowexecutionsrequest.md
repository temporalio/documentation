# Class: ListWorkflowExecutionsRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).ListWorkflowExecutionsRequest

Represents a ListWorkflowExecutionsRequest.

## Implements

* [*IListWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistworkflowexecutionsrequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.listworkflowexecutionsrequest.md#constructor)

### Properties

- [namespace](proto.temporal.api.workflowservice.v1.listworkflowexecutionsrequest.md#namespace)
- [nextPageToken](proto.temporal.api.workflowservice.v1.listworkflowexecutionsrequest.md#nextpagetoken)
- [pageSize](proto.temporal.api.workflowservice.v1.listworkflowexecutionsrequest.md#pagesize)
- [query](proto.temporal.api.workflowservice.v1.listworkflowexecutionsrequest.md#query)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.listworkflowexecutionsrequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.listworkflowexecutionsrequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.listworkflowexecutionsrequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.listworkflowexecutionsrequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.listworkflowexecutionsrequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.listworkflowexecutionsrequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.listworkflowexecutionsrequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.listworkflowexecutionsrequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.listworkflowexecutionsrequest.md#verify)

## Constructors

### constructor

\+ **new ListWorkflowExecutionsRequest**(`properties?`: [*IListWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistworkflowexecutionsrequest.md)): [*ListWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listworkflowexecutionsrequest.md)

Constructs a new ListWorkflowExecutionsRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IListWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistworkflowexecutionsrequest.md) |

**Returns:** [*ListWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listworkflowexecutionsrequest.md)

## Properties

### namespace

• **namespace**: *string*

ListWorkflowExecutionsRequest namespace.

Implementation of: [IListWorkflowExecutionsRequest](../interfaces/proto.temporal.api.workflowservice.v1.ilistworkflowexecutionsrequest.md).[namespace](../interfaces/proto.temporal.api.workflowservice.v1.ilistworkflowexecutionsrequest.md#namespace)

___

### nextPageToken

• **nextPageToken**: *Uint8Array*

ListWorkflowExecutionsRequest nextPageToken.

Implementation of: [IListWorkflowExecutionsRequest](../interfaces/proto.temporal.api.workflowservice.v1.ilistworkflowexecutionsrequest.md).[nextPageToken](../interfaces/proto.temporal.api.workflowservice.v1.ilistworkflowexecutionsrequest.md#nextpagetoken)

___

### pageSize

• **pageSize**: *number*

ListWorkflowExecutionsRequest pageSize.

Implementation of: [IListWorkflowExecutionsRequest](../interfaces/proto.temporal.api.workflowservice.v1.ilistworkflowexecutionsrequest.md).[pageSize](../interfaces/proto.temporal.api.workflowservice.v1.ilistworkflowexecutionsrequest.md#pagesize)

___

### query

• **query**: *string*

ListWorkflowExecutionsRequest query.

Implementation of: [IListWorkflowExecutionsRequest](../interfaces/proto.temporal.api.workflowservice.v1.ilistworkflowexecutionsrequest.md).[query](../interfaces/proto.temporal.api.workflowservice.v1.ilistworkflowexecutionsrequest.md#query)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ListWorkflowExecutionsRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IListWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistworkflowexecutionsrequest.md)): [*ListWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listworkflowexecutionsrequest.md)

Creates a new ListWorkflowExecutionsRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IListWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistworkflowexecutionsrequest.md) |

**Returns:** [*ListWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listworkflowexecutionsrequest.md)

ListWorkflowExecutionsRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ListWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listworkflowexecutionsrequest.md)

Decodes a ListWorkflowExecutionsRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ListWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listworkflowexecutionsrequest.md)

ListWorkflowExecutionsRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ListWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listworkflowexecutionsrequest.md)

Decodes a ListWorkflowExecutionsRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ListWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listworkflowexecutionsrequest.md)

ListWorkflowExecutionsRequest

___

### encode

▸ `Static`**encode**(`message`: [*IListWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistworkflowexecutionsrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified ListWorkflowExecutionsRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.listworkflowexecutionsrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IListWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistworkflowexecutionsrequest.md) | ListWorkflowExecutionsRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IListWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistworkflowexecutionsrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified ListWorkflowExecutionsRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.listworkflowexecutionsrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IListWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistworkflowexecutionsrequest.md) | ListWorkflowExecutionsRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ListWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listworkflowexecutionsrequest.md)

Creates a ListWorkflowExecutionsRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ListWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listworkflowexecutionsrequest.md)

ListWorkflowExecutionsRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*ListWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listworkflowexecutionsrequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ListWorkflowExecutionsRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ListWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listworkflowexecutionsrequest.md) | ListWorkflowExecutionsRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ListWorkflowExecutionsRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
