# Class: ListArchivedWorkflowExecutionsRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).ListArchivedWorkflowExecutionsRequest

Represents a ListArchivedWorkflowExecutionsRequest.

## Implements

* [*IListArchivedWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistarchivedworkflowexecutionsrequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsrequest.md#constructor)

### Properties

- [namespace](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsrequest.md#namespace)
- [nextPageToken](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsrequest.md#nextpagetoken)
- [pageSize](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsrequest.md#pagesize)
- [query](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsrequest.md#query)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsrequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsrequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsrequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsrequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsrequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsrequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsrequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsrequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsrequest.md#verify)

## Constructors

### constructor

\+ **new ListArchivedWorkflowExecutionsRequest**(`properties?`: [*IListArchivedWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistarchivedworkflowexecutionsrequest.md)): [*ListArchivedWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsrequest.md)

Constructs a new ListArchivedWorkflowExecutionsRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IListArchivedWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistarchivedworkflowexecutionsrequest.md) |

**Returns:** [*ListArchivedWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsrequest.md)

## Properties

### namespace

• **namespace**: *string*

ListArchivedWorkflowExecutionsRequest namespace.

Implementation of: [IListArchivedWorkflowExecutionsRequest](../interfaces/proto.temporal.api.workflowservice.v1.ilistarchivedworkflowexecutionsrequest.md).[namespace](../interfaces/proto.temporal.api.workflowservice.v1.ilistarchivedworkflowexecutionsrequest.md#namespace)

___

### nextPageToken

• **nextPageToken**: *Uint8Array*

ListArchivedWorkflowExecutionsRequest nextPageToken.

Implementation of: [IListArchivedWorkflowExecutionsRequest](../interfaces/proto.temporal.api.workflowservice.v1.ilistarchivedworkflowexecutionsrequest.md).[nextPageToken](../interfaces/proto.temporal.api.workflowservice.v1.ilistarchivedworkflowexecutionsrequest.md#nextpagetoken)

___

### pageSize

• **pageSize**: *number*

ListArchivedWorkflowExecutionsRequest pageSize.

Implementation of: [IListArchivedWorkflowExecutionsRequest](../interfaces/proto.temporal.api.workflowservice.v1.ilistarchivedworkflowexecutionsrequest.md).[pageSize](../interfaces/proto.temporal.api.workflowservice.v1.ilistarchivedworkflowexecutionsrequest.md#pagesize)

___

### query

• **query**: *string*

ListArchivedWorkflowExecutionsRequest query.

Implementation of: [IListArchivedWorkflowExecutionsRequest](../interfaces/proto.temporal.api.workflowservice.v1.ilistarchivedworkflowexecutionsrequest.md).[query](../interfaces/proto.temporal.api.workflowservice.v1.ilistarchivedworkflowexecutionsrequest.md#query)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ListArchivedWorkflowExecutionsRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IListArchivedWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistarchivedworkflowexecutionsrequest.md)): [*ListArchivedWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsrequest.md)

Creates a new ListArchivedWorkflowExecutionsRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IListArchivedWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistarchivedworkflowexecutionsrequest.md) |

**Returns:** [*ListArchivedWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsrequest.md)

ListArchivedWorkflowExecutionsRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ListArchivedWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsrequest.md)

Decodes a ListArchivedWorkflowExecutionsRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ListArchivedWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsrequest.md)

ListArchivedWorkflowExecutionsRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ListArchivedWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsrequest.md)

Decodes a ListArchivedWorkflowExecutionsRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ListArchivedWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsrequest.md)

ListArchivedWorkflowExecutionsRequest

___

### encode

▸ `Static`**encode**(`message`: [*IListArchivedWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistarchivedworkflowexecutionsrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified ListArchivedWorkflowExecutionsRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IListArchivedWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistarchivedworkflowexecutionsrequest.md) | ListArchivedWorkflowExecutionsRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IListArchivedWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistarchivedworkflowexecutionsrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified ListArchivedWorkflowExecutionsRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IListArchivedWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistarchivedworkflowexecutionsrequest.md) | ListArchivedWorkflowExecutionsRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ListArchivedWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsrequest.md)

Creates a ListArchivedWorkflowExecutionsRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ListArchivedWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsrequest.md)

ListArchivedWorkflowExecutionsRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*ListArchivedWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsrequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ListArchivedWorkflowExecutionsRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ListArchivedWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listarchivedworkflowexecutionsrequest.md) | ListArchivedWorkflowExecutionsRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ListArchivedWorkflowExecutionsRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
