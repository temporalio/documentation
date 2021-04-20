# Class: UpdateNamespaceResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).UpdateNamespaceResponse

Represents an UpdateNamespaceResponse.

## Implements

* [*IUpdateNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespaceresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.updatenamespaceresponse.md#constructor)

### Properties

- [config](proto.temporal.api.workflowservice.v1.updatenamespaceresponse.md#config)
- [failoverVersion](proto.temporal.api.workflowservice.v1.updatenamespaceresponse.md#failoverversion)
- [isGlobalNamespace](proto.temporal.api.workflowservice.v1.updatenamespaceresponse.md#isglobalnamespace)
- [namespaceInfo](proto.temporal.api.workflowservice.v1.updatenamespaceresponse.md#namespaceinfo)
- [replicationConfig](proto.temporal.api.workflowservice.v1.updatenamespaceresponse.md#replicationconfig)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.updatenamespaceresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.updatenamespaceresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.updatenamespaceresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.updatenamespaceresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.updatenamespaceresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.updatenamespaceresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.updatenamespaceresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.updatenamespaceresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.updatenamespaceresponse.md#verify)

## Constructors

### constructor

\+ **new UpdateNamespaceResponse**(`properties?`: [*IUpdateNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespaceresponse.md)): [*UpdateNamespaceResponse*](proto.temporal.api.workflowservice.v1.updatenamespaceresponse.md)

Constructs a new UpdateNamespaceResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IUpdateNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespaceresponse.md) |

**Returns:** [*UpdateNamespaceResponse*](proto.temporal.api.workflowservice.v1.updatenamespaceresponse.md)

## Properties

### config

• `Optional` **config**: *null* \| [*INamespaceConfig*](../interfaces/proto.temporal.api.namespace.v1.inamespaceconfig.md)

UpdateNamespaceResponse config.

Implementation of: [IUpdateNamespaceResponse](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespaceresponse.md).[config](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespaceresponse.md#config)

___

### failoverVersion

• **failoverVersion**: Long

UpdateNamespaceResponse failoverVersion.

Implementation of: [IUpdateNamespaceResponse](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespaceresponse.md).[failoverVersion](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespaceresponse.md#failoverversion)

___

### isGlobalNamespace

• **isGlobalNamespace**: *boolean*

UpdateNamespaceResponse isGlobalNamespace.

Implementation of: [IUpdateNamespaceResponse](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespaceresponse.md).[isGlobalNamespace](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespaceresponse.md#isglobalnamespace)

___

### namespaceInfo

• `Optional` **namespaceInfo**: *null* \| [*INamespaceInfo*](../interfaces/proto.temporal.api.namespace.v1.inamespaceinfo.md)

UpdateNamespaceResponse namespaceInfo.

Implementation of: [IUpdateNamespaceResponse](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespaceresponse.md).[namespaceInfo](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespaceresponse.md#namespaceinfo)

___

### replicationConfig

• `Optional` **replicationConfig**: *null* \| [*INamespaceReplicationConfig*](../interfaces/proto.temporal.api.replication.v1.inamespacereplicationconfig.md)

UpdateNamespaceResponse replicationConfig.

Implementation of: [IUpdateNamespaceResponse](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespaceresponse.md).[replicationConfig](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespaceresponse.md#replicationconfig)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this UpdateNamespaceResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IUpdateNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespaceresponse.md)): [*UpdateNamespaceResponse*](proto.temporal.api.workflowservice.v1.updatenamespaceresponse.md)

Creates a new UpdateNamespaceResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IUpdateNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespaceresponse.md) |

**Returns:** [*UpdateNamespaceResponse*](proto.temporal.api.workflowservice.v1.updatenamespaceresponse.md)

UpdateNamespaceResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*UpdateNamespaceResponse*](proto.temporal.api.workflowservice.v1.updatenamespaceresponse.md)

Decodes an UpdateNamespaceResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*UpdateNamespaceResponse*](proto.temporal.api.workflowservice.v1.updatenamespaceresponse.md)

UpdateNamespaceResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*UpdateNamespaceResponse*](proto.temporal.api.workflowservice.v1.updatenamespaceresponse.md)

Decodes an UpdateNamespaceResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*UpdateNamespaceResponse*](proto.temporal.api.workflowservice.v1.updatenamespaceresponse.md)

UpdateNamespaceResponse

___

### encode

▸ `Static`**encode**(`message`: [*IUpdateNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespaceresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified UpdateNamespaceResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.updatenamespaceresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IUpdateNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespaceresponse.md) | UpdateNamespaceResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IUpdateNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespaceresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified UpdateNamespaceResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.updatenamespaceresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IUpdateNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iupdatenamespaceresponse.md) | UpdateNamespaceResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*UpdateNamespaceResponse*](proto.temporal.api.workflowservice.v1.updatenamespaceresponse.md)

Creates an UpdateNamespaceResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*UpdateNamespaceResponse*](proto.temporal.api.workflowservice.v1.updatenamespaceresponse.md)

UpdateNamespaceResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*UpdateNamespaceResponse*](proto.temporal.api.workflowservice.v1.updatenamespaceresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from an UpdateNamespaceResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*UpdateNamespaceResponse*](proto.temporal.api.workflowservice.v1.updatenamespaceresponse.md) | UpdateNamespaceResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an UpdateNamespaceResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
