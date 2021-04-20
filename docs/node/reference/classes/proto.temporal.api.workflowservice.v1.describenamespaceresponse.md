# Class: DescribeNamespaceResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).DescribeNamespaceResponse

Represents a DescribeNamespaceResponse.

## Implements

* [*IDescribeNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespaceresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.describenamespaceresponse.md#constructor)

### Properties

- [config](proto.temporal.api.workflowservice.v1.describenamespaceresponse.md#config)
- [failoverVersion](proto.temporal.api.workflowservice.v1.describenamespaceresponse.md#failoverversion)
- [isGlobalNamespace](proto.temporal.api.workflowservice.v1.describenamespaceresponse.md#isglobalnamespace)
- [namespaceInfo](proto.temporal.api.workflowservice.v1.describenamespaceresponse.md#namespaceinfo)
- [replicationConfig](proto.temporal.api.workflowservice.v1.describenamespaceresponse.md#replicationconfig)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.describenamespaceresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.describenamespaceresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.describenamespaceresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.describenamespaceresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.describenamespaceresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.describenamespaceresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.describenamespaceresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.describenamespaceresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.describenamespaceresponse.md#verify)

## Constructors

### constructor

\+ **new DescribeNamespaceResponse**(`properties?`: [*IDescribeNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespaceresponse.md)): [*DescribeNamespaceResponse*](proto.temporal.api.workflowservice.v1.describenamespaceresponse.md)

Constructs a new DescribeNamespaceResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IDescribeNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespaceresponse.md) |

**Returns:** [*DescribeNamespaceResponse*](proto.temporal.api.workflowservice.v1.describenamespaceresponse.md)

## Properties

### config

• `Optional` **config**: *null* \| [*INamespaceConfig*](../interfaces/proto.temporal.api.namespace.v1.inamespaceconfig.md)

DescribeNamespaceResponse config.

Implementation of: [IDescribeNamespaceResponse](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespaceresponse.md).[config](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespaceresponse.md#config)

___

### failoverVersion

• **failoverVersion**: Long

DescribeNamespaceResponse failoverVersion.

Implementation of: [IDescribeNamespaceResponse](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespaceresponse.md).[failoverVersion](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespaceresponse.md#failoverversion)

___

### isGlobalNamespace

• **isGlobalNamespace**: *boolean*

DescribeNamespaceResponse isGlobalNamespace.

Implementation of: [IDescribeNamespaceResponse](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespaceresponse.md).[isGlobalNamespace](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespaceresponse.md#isglobalnamespace)

___

### namespaceInfo

• `Optional` **namespaceInfo**: *null* \| [*INamespaceInfo*](../interfaces/proto.temporal.api.namespace.v1.inamespaceinfo.md)

DescribeNamespaceResponse namespaceInfo.

Implementation of: [IDescribeNamespaceResponse](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespaceresponse.md).[namespaceInfo](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespaceresponse.md#namespaceinfo)

___

### replicationConfig

• `Optional` **replicationConfig**: *null* \| [*INamespaceReplicationConfig*](../interfaces/proto.temporal.api.replication.v1.inamespacereplicationconfig.md)

DescribeNamespaceResponse replicationConfig.

Implementation of: [IDescribeNamespaceResponse](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespaceresponse.md).[replicationConfig](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespaceresponse.md#replicationconfig)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this DescribeNamespaceResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IDescribeNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespaceresponse.md)): [*DescribeNamespaceResponse*](proto.temporal.api.workflowservice.v1.describenamespaceresponse.md)

Creates a new DescribeNamespaceResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IDescribeNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespaceresponse.md) |

**Returns:** [*DescribeNamespaceResponse*](proto.temporal.api.workflowservice.v1.describenamespaceresponse.md)

DescribeNamespaceResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*DescribeNamespaceResponse*](proto.temporal.api.workflowservice.v1.describenamespaceresponse.md)

Decodes a DescribeNamespaceResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*DescribeNamespaceResponse*](proto.temporal.api.workflowservice.v1.describenamespaceresponse.md)

DescribeNamespaceResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*DescribeNamespaceResponse*](proto.temporal.api.workflowservice.v1.describenamespaceresponse.md)

Decodes a DescribeNamespaceResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*DescribeNamespaceResponse*](proto.temporal.api.workflowservice.v1.describenamespaceresponse.md)

DescribeNamespaceResponse

___

### encode

▸ `Static`**encode**(`message`: [*IDescribeNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespaceresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified DescribeNamespaceResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.describenamespaceresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IDescribeNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespaceresponse.md) | DescribeNamespaceResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IDescribeNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespaceresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified DescribeNamespaceResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.describenamespaceresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IDescribeNamespaceResponse*](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespaceresponse.md) | DescribeNamespaceResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*DescribeNamespaceResponse*](proto.temporal.api.workflowservice.v1.describenamespaceresponse.md)

Creates a DescribeNamespaceResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*DescribeNamespaceResponse*](proto.temporal.api.workflowservice.v1.describenamespaceresponse.md)

DescribeNamespaceResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*DescribeNamespaceResponse*](proto.temporal.api.workflowservice.v1.describenamespaceresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a DescribeNamespaceResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*DescribeNamespaceResponse*](proto.temporal.api.workflowservice.v1.describenamespaceresponse.md) | DescribeNamespaceResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a DescribeNamespaceResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
