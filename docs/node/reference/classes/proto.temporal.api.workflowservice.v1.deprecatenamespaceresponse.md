# Class: DeprecateNamespaceResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).DeprecateNamespaceResponse

Represents a DeprecateNamespaceResponse.

## Implements

* [*IDeprecateNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ideprecatenamespaceresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.deprecatenamespaceresponse.md#constructor)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.deprecatenamespaceresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.deprecatenamespaceresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.deprecatenamespaceresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.deprecatenamespaceresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.deprecatenamespaceresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.deprecatenamespaceresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.deprecatenamespaceresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.deprecatenamespaceresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.deprecatenamespaceresponse.md#verify)

## Constructors

### constructor

\+ **new DeprecateNamespaceResponse**(`properties?`: [*IDeprecateNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ideprecatenamespaceresponse.md)): [*DeprecateNamespaceResponse*](proto.temporal.api.workflowservice.v1.deprecatenamespaceresponse.md)

Constructs a new DeprecateNamespaceResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IDeprecateNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ideprecatenamespaceresponse.md) |

**Returns:** [*DeprecateNamespaceResponse*](proto.temporal.api.workflowservice.v1.deprecatenamespaceresponse.md)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this DeprecateNamespaceResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IDeprecateNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ideprecatenamespaceresponse.md)): [*DeprecateNamespaceResponse*](proto.temporal.api.workflowservice.v1.deprecatenamespaceresponse.md)

Creates a new DeprecateNamespaceResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IDeprecateNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ideprecatenamespaceresponse.md) |

**Returns:** [*DeprecateNamespaceResponse*](proto.temporal.api.workflowservice.v1.deprecatenamespaceresponse.md)

DeprecateNamespaceResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*DeprecateNamespaceResponse*](proto.temporal.api.workflowservice.v1.deprecatenamespaceresponse.md)

Decodes a DeprecateNamespaceResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*DeprecateNamespaceResponse*](proto.temporal.api.workflowservice.v1.deprecatenamespaceresponse.md)

DeprecateNamespaceResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*DeprecateNamespaceResponse*](proto.temporal.api.workflowservice.v1.deprecatenamespaceresponse.md)

Decodes a DeprecateNamespaceResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*DeprecateNamespaceResponse*](proto.temporal.api.workflowservice.v1.deprecatenamespaceresponse.md)

DeprecateNamespaceResponse

___

### encode

▸ `Static`**encode**(`message`: [*IDeprecateNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ideprecatenamespaceresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified DeprecateNamespaceResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.deprecatenamespaceresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IDeprecateNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ideprecatenamespaceresponse.md) | DeprecateNamespaceResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IDeprecateNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ideprecatenamespaceresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified DeprecateNamespaceResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.deprecatenamespaceresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IDeprecateNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ideprecatenamespaceresponse.md) | DeprecateNamespaceResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*DeprecateNamespaceResponse*](proto.temporal.api.workflowservice.v1.deprecatenamespaceresponse.md)

Creates a DeprecateNamespaceResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*DeprecateNamespaceResponse*](proto.temporal.api.workflowservice.v1.deprecatenamespaceresponse.md)

DeprecateNamespaceResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*DeprecateNamespaceResponse*](proto.temporal.api.workflowservice.v1.deprecatenamespaceresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a DeprecateNamespaceResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*DeprecateNamespaceResponse*](proto.temporal.api.workflowservice.v1.deprecatenamespaceresponse.md) | DeprecateNamespaceResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a DeprecateNamespaceResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
