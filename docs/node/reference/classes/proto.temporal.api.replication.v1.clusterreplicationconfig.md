# Class: ClusterReplicationConfig

[replication](../modules/proto.temporal.api.replication.md).[v1](../modules/proto.temporal.api.replication.v1.md).ClusterReplicationConfig

Represents a ClusterReplicationConfig.

## Implements

* [*IClusterReplicationConfig*](../interfaces/proto.temporal.api.replication.v1.iclusterreplicationconfig.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.replication.v1.clusterreplicationconfig.md#constructor)

### Properties

- [clusterName](proto.temporal.api.replication.v1.clusterreplicationconfig.md#clustername)

### Methods

- [toJSON](proto.temporal.api.replication.v1.clusterreplicationconfig.md#tojson)
- [create](proto.temporal.api.replication.v1.clusterreplicationconfig.md#create)
- [decode](proto.temporal.api.replication.v1.clusterreplicationconfig.md#decode)
- [decodeDelimited](proto.temporal.api.replication.v1.clusterreplicationconfig.md#decodedelimited)
- [encode](proto.temporal.api.replication.v1.clusterreplicationconfig.md#encode)
- [encodeDelimited](proto.temporal.api.replication.v1.clusterreplicationconfig.md#encodedelimited)
- [fromObject](proto.temporal.api.replication.v1.clusterreplicationconfig.md#fromobject)
- [toObject](proto.temporal.api.replication.v1.clusterreplicationconfig.md#toobject)
- [verify](proto.temporal.api.replication.v1.clusterreplicationconfig.md#verify)

## Constructors

### constructor

\+ **new ClusterReplicationConfig**(`properties?`: [*IClusterReplicationConfig*](../interfaces/proto.temporal.api.replication.v1.iclusterreplicationconfig.md)): [*ClusterReplicationConfig*](proto.temporal.api.replication.v1.clusterreplicationconfig.md)

Constructs a new ClusterReplicationConfig.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IClusterReplicationConfig*](../interfaces/proto.temporal.api.replication.v1.iclusterreplicationconfig.md) |

**Returns:** [*ClusterReplicationConfig*](proto.temporal.api.replication.v1.clusterreplicationconfig.md)

## Properties

### clusterName

• **clusterName**: *string*

ClusterReplicationConfig clusterName.

Implementation of: [IClusterReplicationConfig](../interfaces/proto.temporal.api.replication.v1.iclusterreplicationconfig.md).[clusterName](../interfaces/proto.temporal.api.replication.v1.iclusterreplicationconfig.md#clustername)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ClusterReplicationConfig to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IClusterReplicationConfig*](../interfaces/proto.temporal.api.replication.v1.iclusterreplicationconfig.md)): [*ClusterReplicationConfig*](proto.temporal.api.replication.v1.clusterreplicationconfig.md)

Creates a new ClusterReplicationConfig instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IClusterReplicationConfig*](../interfaces/proto.temporal.api.replication.v1.iclusterreplicationconfig.md) |

**Returns:** [*ClusterReplicationConfig*](proto.temporal.api.replication.v1.clusterreplicationconfig.md)

ClusterReplicationConfig instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ClusterReplicationConfig*](proto.temporal.api.replication.v1.clusterreplicationconfig.md)

Decodes a ClusterReplicationConfig message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ClusterReplicationConfig*](proto.temporal.api.replication.v1.clusterreplicationconfig.md)

ClusterReplicationConfig

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ClusterReplicationConfig*](proto.temporal.api.replication.v1.clusterreplicationconfig.md)

Decodes a ClusterReplicationConfig message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ClusterReplicationConfig*](proto.temporal.api.replication.v1.clusterreplicationconfig.md)

ClusterReplicationConfig

___

### encode

▸ `Static`**encode**(`message`: [*IClusterReplicationConfig*](../interfaces/proto.temporal.api.replication.v1.iclusterreplicationconfig.md), `writer?`: *Writer*): *Writer*

Encodes the specified ClusterReplicationConfig message. Does not implicitly [verify](proto.temporal.api.replication.v1.clusterreplicationconfig.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IClusterReplicationConfig*](../interfaces/proto.temporal.api.replication.v1.iclusterreplicationconfig.md) | ClusterReplicationConfig message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IClusterReplicationConfig*](../interfaces/proto.temporal.api.replication.v1.iclusterreplicationconfig.md), `writer?`: *Writer*): *Writer*

Encodes the specified ClusterReplicationConfig message, length delimited. Does not implicitly [verify](proto.temporal.api.replication.v1.clusterreplicationconfig.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IClusterReplicationConfig*](../interfaces/proto.temporal.api.replication.v1.iclusterreplicationconfig.md) | ClusterReplicationConfig message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ClusterReplicationConfig*](proto.temporal.api.replication.v1.clusterreplicationconfig.md)

Creates a ClusterReplicationConfig message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ClusterReplicationConfig*](proto.temporal.api.replication.v1.clusterreplicationconfig.md)

ClusterReplicationConfig

___

### toObject

▸ `Static`**toObject**(`message`: [*ClusterReplicationConfig*](proto.temporal.api.replication.v1.clusterreplicationconfig.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ClusterReplicationConfig message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ClusterReplicationConfig*](proto.temporal.api.replication.v1.clusterreplicationconfig.md) | ClusterReplicationConfig   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ClusterReplicationConfig message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
