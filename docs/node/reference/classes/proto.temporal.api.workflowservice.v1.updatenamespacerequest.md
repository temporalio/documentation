# Class: UpdateNamespaceRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).UpdateNamespaceRequest

Represents an UpdateNamespaceRequest.

## Implements

* [*IUpdateNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespacerequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.updatenamespacerequest.md#constructor)

### Properties

- [config](proto.temporal.api.workflowservice.v1.updatenamespacerequest.md#config)
- [deleteBadBinary](proto.temporal.api.workflowservice.v1.updatenamespacerequest.md#deletebadbinary)
- [namespace](proto.temporal.api.workflowservice.v1.updatenamespacerequest.md#namespace)
- [replicationConfig](proto.temporal.api.workflowservice.v1.updatenamespacerequest.md#replicationconfig)
- [securityToken](proto.temporal.api.workflowservice.v1.updatenamespacerequest.md#securitytoken)
- [updateInfo](proto.temporal.api.workflowservice.v1.updatenamespacerequest.md#updateinfo)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.updatenamespacerequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.updatenamespacerequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.updatenamespacerequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.updatenamespacerequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.updatenamespacerequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.updatenamespacerequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.updatenamespacerequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.updatenamespacerequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.updatenamespacerequest.md#verify)

## Constructors

### constructor

\+ **new UpdateNamespaceRequest**(`properties?`: [*IUpdateNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespacerequest.md)): [*UpdateNamespaceRequest*](proto.temporal.api.workflowservice.v1.updatenamespacerequest.md)

Constructs a new UpdateNamespaceRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IUpdateNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespacerequest.md) |

**Returns:** [*UpdateNamespaceRequest*](proto.temporal.api.workflowservice.v1.updatenamespacerequest.md)

## Properties

### config

• `Optional` **config**: *null* \| [*INamespaceConfig*](../interfaces/proto.temporal.api.namespace.v1.inamespaceconfig.md)

UpdateNamespaceRequest config.

Implementation of: [IUpdateNamespaceRequest](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespacerequest.md).[config](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespacerequest.md#config)

___

### deleteBadBinary

• **deleteBadBinary**: *string*

UpdateNamespaceRequest deleteBadBinary.

Implementation of: [IUpdateNamespaceRequest](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespacerequest.md).[deleteBadBinary](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespacerequest.md#deletebadbinary)

___

### namespace

• **namespace**: *string*

UpdateNamespaceRequest namespace.

Implementation of: [IUpdateNamespaceRequest](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespacerequest.md).[namespace](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespacerequest.md#namespace)

___

### replicationConfig

• `Optional` **replicationConfig**: *null* \| [*INamespaceReplicationConfig*](../interfaces/proto.temporal.api.replication.v1.inamespacereplicationconfig.md)

UpdateNamespaceRequest replicationConfig.

Implementation of: [IUpdateNamespaceRequest](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespacerequest.md).[replicationConfig](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespacerequest.md#replicationconfig)

___

### securityToken

• **securityToken**: *string*

UpdateNamespaceRequest securityToken.

Implementation of: [IUpdateNamespaceRequest](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespacerequest.md).[securityToken](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespacerequest.md#securitytoken)

___

### updateInfo

• `Optional` **updateInfo**: *null* \| [*IUpdateNamespaceInfo*](../interfaces/proto.temporal.api.namespace.v1.iupdatenamespaceinfo.md)

UpdateNamespaceRequest updateInfo.

Implementation of: [IUpdateNamespaceRequest](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespacerequest.md).[updateInfo](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespacerequest.md#updateinfo)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this UpdateNamespaceRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IUpdateNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespacerequest.md)): [*UpdateNamespaceRequest*](proto.temporal.api.workflowservice.v1.updatenamespacerequest.md)

Creates a new UpdateNamespaceRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IUpdateNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespacerequest.md) |

**Returns:** [*UpdateNamespaceRequest*](proto.temporal.api.workflowservice.v1.updatenamespacerequest.md)

UpdateNamespaceRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*UpdateNamespaceRequest*](proto.temporal.api.workflowservice.v1.updatenamespacerequest.md)

Decodes an UpdateNamespaceRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*UpdateNamespaceRequest*](proto.temporal.api.workflowservice.v1.updatenamespacerequest.md)

UpdateNamespaceRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*UpdateNamespaceRequest*](proto.temporal.api.workflowservice.v1.updatenamespacerequest.md)

Decodes an UpdateNamespaceRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*UpdateNamespaceRequest*](proto.temporal.api.workflowservice.v1.updatenamespacerequest.md)

UpdateNamespaceRequest

___

### encode

▸ `Static`**encode**(`message`: [*IUpdateNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespacerequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified UpdateNamespaceRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.updatenamespacerequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IUpdateNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespacerequest.md) | UpdateNamespaceRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IUpdateNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespacerequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified UpdateNamespaceRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.updatenamespacerequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IUpdateNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespacerequest.md) | UpdateNamespaceRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*UpdateNamespaceRequest*](proto.temporal.api.workflowservice.v1.updatenamespacerequest.md)

Creates an UpdateNamespaceRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*UpdateNamespaceRequest*](proto.temporal.api.workflowservice.v1.updatenamespacerequest.md)

UpdateNamespaceRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*UpdateNamespaceRequest*](proto.temporal.api.workflowservice.v1.updatenamespacerequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from an UpdateNamespaceRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*UpdateNamespaceRequest*](proto.temporal.api.workflowservice.v1.updatenamespacerequest.md) | UpdateNamespaceRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an UpdateNamespaceRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
