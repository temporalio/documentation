# Class: ListNamespacesResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).ListNamespacesResponse

Represents a ListNamespacesResponse.

## Implements

* [*IListNamespacesResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistnamespacesresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.listnamespacesresponse.md#constructor)

### Properties

- [namespaces](proto.temporal.api.workflowservice.v1.listnamespacesresponse.md#namespaces)
- [nextPageToken](proto.temporal.api.workflowservice.v1.listnamespacesresponse.md#nextpagetoken)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.listnamespacesresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.listnamespacesresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.listnamespacesresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.listnamespacesresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.listnamespacesresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.listnamespacesresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.listnamespacesresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.listnamespacesresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.listnamespacesresponse.md#verify)

## Constructors

### constructor

\+ **new ListNamespacesResponse**(`properties?`: [*IListNamespacesResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistnamespacesresponse.md)): [*ListNamespacesResponse*](proto.temporal.api.workflowservice.v1.listnamespacesresponse.md)

Constructs a new ListNamespacesResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IListNamespacesResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistnamespacesresponse.md) |

**Returns:** [*ListNamespacesResponse*](proto.temporal.api.workflowservice.v1.listnamespacesresponse.md)

## Properties

### namespaces

• **namespaces**: [*IDescribeNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespaceresponse.md)[]

ListNamespacesResponse namespaces.

Implementation of: [IListNamespacesResponse](../interfaces/proto.temporal.api.workflowservice.v1.ilistnamespacesresponse.md).[namespaces](../interfaces/proto.temporal.api.workflowservice.v1.ilistnamespacesresponse.md#namespaces)

___

### nextPageToken

• **nextPageToken**: *Uint8Array*

ListNamespacesResponse nextPageToken.

Implementation of: [IListNamespacesResponse](../interfaces/proto.temporal.api.workflowservice.v1.ilistnamespacesresponse.md).[nextPageToken](../interfaces/proto.temporal.api.workflowservice.v1.ilistnamespacesresponse.md#nextpagetoken)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ListNamespacesResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IListNamespacesResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistnamespacesresponse.md)): [*ListNamespacesResponse*](proto.temporal.api.workflowservice.v1.listnamespacesresponse.md)

Creates a new ListNamespacesResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IListNamespacesResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistnamespacesresponse.md) |

**Returns:** [*ListNamespacesResponse*](proto.temporal.api.workflowservice.v1.listnamespacesresponse.md)

ListNamespacesResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ListNamespacesResponse*](proto.temporal.api.workflowservice.v1.listnamespacesresponse.md)

Decodes a ListNamespacesResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ListNamespacesResponse*](proto.temporal.api.workflowservice.v1.listnamespacesresponse.md)

ListNamespacesResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ListNamespacesResponse*](proto.temporal.api.workflowservice.v1.listnamespacesresponse.md)

Decodes a ListNamespacesResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ListNamespacesResponse*](proto.temporal.api.workflowservice.v1.listnamespacesresponse.md)

ListNamespacesResponse

___

### encode

▸ `Static`**encode**(`message`: [*IListNamespacesResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistnamespacesresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified ListNamespacesResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.listnamespacesresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IListNamespacesResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistnamespacesresponse.md) | ListNamespacesResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IListNamespacesResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistnamespacesresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified ListNamespacesResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.listnamespacesresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IListNamespacesResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ilistnamespacesresponse.md) | ListNamespacesResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ListNamespacesResponse*](proto.temporal.api.workflowservice.v1.listnamespacesresponse.md)

Creates a ListNamespacesResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ListNamespacesResponse*](proto.temporal.api.workflowservice.v1.listnamespacesresponse.md)

ListNamespacesResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*ListNamespacesResponse*](proto.temporal.api.workflowservice.v1.listnamespacesresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ListNamespacesResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ListNamespacesResponse*](proto.temporal.api.workflowservice.v1.listnamespacesresponse.md) | ListNamespacesResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ListNamespacesResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
