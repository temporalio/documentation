# Class: DeprecateNamespaceRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).DeprecateNamespaceRequest

Represents a DeprecateNamespaceRequest.

## Implements

* [*IDeprecateNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ideprecatenamespacerequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.deprecatenamespacerequest.md#constructor)

### Properties

- [namespace](proto.temporal.api.workflowservice.v1.deprecatenamespacerequest.md#namespace)
- [securityToken](proto.temporal.api.workflowservice.v1.deprecatenamespacerequest.md#securitytoken)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.deprecatenamespacerequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.deprecatenamespacerequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.deprecatenamespacerequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.deprecatenamespacerequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.deprecatenamespacerequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.deprecatenamespacerequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.deprecatenamespacerequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.deprecatenamespacerequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.deprecatenamespacerequest.md#verify)

## Constructors

### constructor

\+ **new DeprecateNamespaceRequest**(`properties?`: [*IDeprecateNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ideprecatenamespacerequest.md)): [*DeprecateNamespaceRequest*](proto.temporal.api.workflowservice.v1.deprecatenamespacerequest.md)

Constructs a new DeprecateNamespaceRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IDeprecateNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ideprecatenamespacerequest.md) |

**Returns:** [*DeprecateNamespaceRequest*](proto.temporal.api.workflowservice.v1.deprecatenamespacerequest.md)

## Properties

### namespace

• **namespace**: *string*

DeprecateNamespaceRequest namespace.

Implementation of: [IDeprecateNamespaceRequest](../interfaces/proto.temporal.api.workflowservice.v1.ideprecatenamespacerequest.md).[namespace](../interfaces/proto.temporal.api.workflowservice.v1.ideprecatenamespacerequest.md#namespace)

___

### securityToken

• **securityToken**: *string*

DeprecateNamespaceRequest securityToken.

Implementation of: [IDeprecateNamespaceRequest](../interfaces/proto.temporal.api.workflowservice.v1.ideprecatenamespacerequest.md).[securityToken](../interfaces/proto.temporal.api.workflowservice.v1.ideprecatenamespacerequest.md#securitytoken)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this DeprecateNamespaceRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IDeprecateNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ideprecatenamespacerequest.md)): [*DeprecateNamespaceRequest*](proto.temporal.api.workflowservice.v1.deprecatenamespacerequest.md)

Creates a new DeprecateNamespaceRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IDeprecateNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ideprecatenamespacerequest.md) |

**Returns:** [*DeprecateNamespaceRequest*](proto.temporal.api.workflowservice.v1.deprecatenamespacerequest.md)

DeprecateNamespaceRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*DeprecateNamespaceRequest*](proto.temporal.api.workflowservice.v1.deprecatenamespacerequest.md)

Decodes a DeprecateNamespaceRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*DeprecateNamespaceRequest*](proto.temporal.api.workflowservice.v1.deprecatenamespacerequest.md)

DeprecateNamespaceRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*DeprecateNamespaceRequest*](proto.temporal.api.workflowservice.v1.deprecatenamespacerequest.md)

Decodes a DeprecateNamespaceRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*DeprecateNamespaceRequest*](proto.temporal.api.workflowservice.v1.deprecatenamespacerequest.md)

DeprecateNamespaceRequest

___

### encode

▸ `Static`**encode**(`message`: [*IDeprecateNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ideprecatenamespacerequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified DeprecateNamespaceRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.deprecatenamespacerequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IDeprecateNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ideprecatenamespacerequest.md) | DeprecateNamespaceRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IDeprecateNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ideprecatenamespacerequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified DeprecateNamespaceRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.deprecatenamespacerequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IDeprecateNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ideprecatenamespacerequest.md) | DeprecateNamespaceRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*DeprecateNamespaceRequest*](proto.temporal.api.workflowservice.v1.deprecatenamespacerequest.md)

Creates a DeprecateNamespaceRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*DeprecateNamespaceRequest*](proto.temporal.api.workflowservice.v1.deprecatenamespacerequest.md)

DeprecateNamespaceRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*DeprecateNamespaceRequest*](proto.temporal.api.workflowservice.v1.deprecatenamespacerequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a DeprecateNamespaceRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*DeprecateNamespaceRequest*](proto.temporal.api.workflowservice.v1.deprecatenamespacerequest.md) | DeprecateNamespaceRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a DeprecateNamespaceRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
