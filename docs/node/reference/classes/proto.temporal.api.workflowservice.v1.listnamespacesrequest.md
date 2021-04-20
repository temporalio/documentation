# Class: ListNamespacesRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).ListNamespacesRequest

Represents a ListNamespacesRequest.

## Implements

* [*IListNamespacesRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistnamespacesrequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.listnamespacesrequest.md#constructor)

### Properties

- [nextPageToken](proto.temporal.api.workflowservice.v1.listnamespacesrequest.md#nextpagetoken)
- [pageSize](proto.temporal.api.workflowservice.v1.listnamespacesrequest.md#pagesize)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.listnamespacesrequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.listnamespacesrequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.listnamespacesrequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.listnamespacesrequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.listnamespacesrequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.listnamespacesrequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.listnamespacesrequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.listnamespacesrequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.listnamespacesrequest.md#verify)

## Constructors

### constructor

\+ **new ListNamespacesRequest**(`properties?`: [*IListNamespacesRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistnamespacesrequest.md)): [*ListNamespacesRequest*](proto.temporal.api.workflowservice.v1.listnamespacesrequest.md)

Constructs a new ListNamespacesRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IListNamespacesRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistnamespacesrequest.md) |

**Returns:** [*ListNamespacesRequest*](proto.temporal.api.workflowservice.v1.listnamespacesrequest.md)

## Properties

### nextPageToken

• **nextPageToken**: *Uint8Array*

ListNamespacesRequest nextPageToken.

Implementation of: [IListNamespacesRequest](../interfaces/proto.temporal.api.workflowservice.v1.ilistnamespacesrequest.md).[nextPageToken](../interfaces/proto.temporal.api.workflowservice.v1.ilistnamespacesrequest.md#nextpagetoken)

___

### pageSize

• **pageSize**: *number*

ListNamespacesRequest pageSize.

Implementation of: [IListNamespacesRequest](../interfaces/proto.temporal.api.workflowservice.v1.ilistnamespacesrequest.md).[pageSize](../interfaces/proto.temporal.api.workflowservice.v1.ilistnamespacesrequest.md#pagesize)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ListNamespacesRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IListNamespacesRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistnamespacesrequest.md)): [*ListNamespacesRequest*](proto.temporal.api.workflowservice.v1.listnamespacesrequest.md)

Creates a new ListNamespacesRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IListNamespacesRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistnamespacesrequest.md) |

**Returns:** [*ListNamespacesRequest*](proto.temporal.api.workflowservice.v1.listnamespacesrequest.md)

ListNamespacesRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ListNamespacesRequest*](proto.temporal.api.workflowservice.v1.listnamespacesrequest.md)

Decodes a ListNamespacesRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ListNamespacesRequest*](proto.temporal.api.workflowservice.v1.listnamespacesrequest.md)

ListNamespacesRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ListNamespacesRequest*](proto.temporal.api.workflowservice.v1.listnamespacesrequest.md)

Decodes a ListNamespacesRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ListNamespacesRequest*](proto.temporal.api.workflowservice.v1.listnamespacesrequest.md)

ListNamespacesRequest

___

### encode

▸ `Static`**encode**(`message`: [*IListNamespacesRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistnamespacesrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified ListNamespacesRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.listnamespacesrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IListNamespacesRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistnamespacesrequest.md) | ListNamespacesRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IListNamespacesRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistnamespacesrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified ListNamespacesRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.listnamespacesrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IListNamespacesRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistnamespacesrequest.md) | ListNamespacesRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ListNamespacesRequest*](proto.temporal.api.workflowservice.v1.listnamespacesrequest.md)

Creates a ListNamespacesRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ListNamespacesRequest*](proto.temporal.api.workflowservice.v1.listnamespacesrequest.md)

ListNamespacesRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*ListNamespacesRequest*](proto.temporal.api.workflowservice.v1.listnamespacesrequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ListNamespacesRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ListNamespacesRequest*](proto.temporal.api.workflowservice.v1.listnamespacesrequest.md) | ListNamespacesRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ListNamespacesRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
