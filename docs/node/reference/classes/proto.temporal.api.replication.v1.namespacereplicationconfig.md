# Class: NamespaceReplicationConfig

[replication](../modules/proto.temporal.api.replication.md).[v1](../modules/proto.temporal.api.replication.v1.md).NamespaceReplicationConfig

Represents a NamespaceReplicationConfig.

## Implements

* [*INamespaceReplicationConfig*](../interfaces/proto.temporal.api.replication.v1.inamespacereplicationconfig.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.replication.v1.namespacereplicationconfig.md#constructor)

### Properties

- [activeClusterName](proto.temporal.api.replication.v1.namespacereplicationconfig.md#activeclustername)
- [clusters](proto.temporal.api.replication.v1.namespacereplicationconfig.md#clusters)

### Methods

- [toJSON](proto.temporal.api.replication.v1.namespacereplicationconfig.md#tojson)
- [create](proto.temporal.api.replication.v1.namespacereplicationconfig.md#create)
- [decode](proto.temporal.api.replication.v1.namespacereplicationconfig.md#decode)
- [decodeDelimited](proto.temporal.api.replication.v1.namespacereplicationconfig.md#decodedelimited)
- [encode](proto.temporal.api.replication.v1.namespacereplicationconfig.md#encode)
- [encodeDelimited](proto.temporal.api.replication.v1.namespacereplicationconfig.md#encodedelimited)
- [fromObject](proto.temporal.api.replication.v1.namespacereplicationconfig.md#fromobject)
- [toObject](proto.temporal.api.replication.v1.namespacereplicationconfig.md#toobject)
- [verify](proto.temporal.api.replication.v1.namespacereplicationconfig.md#verify)

## Constructors

### constructor

\+ **new NamespaceReplicationConfig**(`properties?`: [*INamespaceReplicationConfig*](../interfaces/proto.temporal.api.replication.v1.inamespacereplicationconfig.md)): [*NamespaceReplicationConfig*](proto.temporal.api.replication.v1.namespacereplicationconfig.md)

Constructs a new NamespaceReplicationConfig.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*INamespaceReplicationConfig*](../interfaces/proto.temporal.api.replication.v1.inamespacereplicationconfig.md) |

**Returns:** [*NamespaceReplicationConfig*](proto.temporal.api.replication.v1.namespacereplicationconfig.md)

## Properties

### activeClusterName

• **activeClusterName**: *string*

NamespaceReplicationConfig activeClusterName.

Implementation of: [INamespaceReplicationConfig](../interfaces/proto.temporal.api.replication.v1.inamespacereplicationconfig.md).[activeClusterName](../interfaces/proto.temporal.api.replication.v1.inamespacereplicationconfig.md#activeclustername)

___

### clusters

• **clusters**: [*IClusterReplicationConfig*](../interfaces/proto.temporal.api.replication.v1.iclusterreplicationconfig.md)[]

NamespaceReplicationConfig clusters.

Implementation of: [INamespaceReplicationConfig](../interfaces/proto.temporal.api.replication.v1.inamespacereplicationconfig.md).[clusters](../interfaces/proto.temporal.api.replication.v1.inamespacereplicationconfig.md#clusters)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this NamespaceReplicationConfig to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*INamespaceReplicationConfig*](../interfaces/proto.temporal.api.replication.v1.inamespacereplicationconfig.md)): [*NamespaceReplicationConfig*](proto.temporal.api.replication.v1.namespacereplicationconfig.md)

Creates a new NamespaceReplicationConfig instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*INamespaceReplicationConfig*](../interfaces/proto.temporal.api.replication.v1.inamespacereplicationconfig.md) |

**Returns:** [*NamespaceReplicationConfig*](proto.temporal.api.replication.v1.namespacereplicationconfig.md)

NamespaceReplicationConfig instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*NamespaceReplicationConfig*](proto.temporal.api.replication.v1.namespacereplicationconfig.md)

Decodes a NamespaceReplicationConfig message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*NamespaceReplicationConfig*](proto.temporal.api.replication.v1.namespacereplicationconfig.md)

NamespaceReplicationConfig

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*NamespaceReplicationConfig*](proto.temporal.api.replication.v1.namespacereplicationconfig.md)

Decodes a NamespaceReplicationConfig message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*NamespaceReplicationConfig*](proto.temporal.api.replication.v1.namespacereplicationconfig.md)

NamespaceReplicationConfig

___

### encode

▸ `Static`**encode**(`message`: [*INamespaceReplicationConfig*](../interfaces/proto.temporal.api.replication.v1.inamespacereplicationconfig.md), `writer?`: *Writer*): *Writer*

Encodes the specified NamespaceReplicationConfig message. Does not implicitly [verify](proto.temporal.api.replication.v1.namespacereplicationconfig.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*INamespaceReplicationConfig*](../interfaces/proto.temporal.api.replication.v1.inamespacereplicationconfig.md) | NamespaceReplicationConfig message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*INamespaceReplicationConfig*](../interfaces/proto.temporal.api.replication.v1.inamespacereplicationconfig.md), `writer?`: *Writer*): *Writer*

Encodes the specified NamespaceReplicationConfig message, length delimited. Does not implicitly [verify](proto.temporal.api.replication.v1.namespacereplicationconfig.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*INamespaceReplicationConfig*](../interfaces/proto.temporal.api.replication.v1.inamespacereplicationconfig.md) | NamespaceReplicationConfig message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*NamespaceReplicationConfig*](proto.temporal.api.replication.v1.namespacereplicationconfig.md)

Creates a NamespaceReplicationConfig message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*NamespaceReplicationConfig*](proto.temporal.api.replication.v1.namespacereplicationconfig.md)

NamespaceReplicationConfig

___

### toObject

▸ `Static`**toObject**(`message`: [*NamespaceReplicationConfig*](proto.temporal.api.replication.v1.namespacereplicationconfig.md), `options?`: IConversionOptions): *object*

Creates a plain object from a NamespaceReplicationConfig message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*NamespaceReplicationConfig*](proto.temporal.api.replication.v1.namespacereplicationconfig.md) | NamespaceReplicationConfig   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a NamespaceReplicationConfig message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
