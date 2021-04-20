# Class: NamespaceConfig

[namespace](../modules/proto.temporal.api.namespace.md).[v1](../modules/proto.temporal.api.namespace.v1.md).NamespaceConfig

Represents a NamespaceConfig.

## Implements

* [*INamespaceConfig*](../interfaces/proto.temporal.api.namespace.v1.inamespaceconfig.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.namespace.v1.namespaceconfig.md#constructor)

### Properties

- [badBinaries](proto.temporal.api.namespace.v1.namespaceconfig.md#badbinaries)
- [historyArchivalState](proto.temporal.api.namespace.v1.namespaceconfig.md#historyarchivalstate)
- [historyArchivalUri](proto.temporal.api.namespace.v1.namespaceconfig.md#historyarchivaluri)
- [visibilityArchivalState](proto.temporal.api.namespace.v1.namespaceconfig.md#visibilityarchivalstate)
- [visibilityArchivalUri](proto.temporal.api.namespace.v1.namespaceconfig.md#visibilityarchivaluri)
- [workflowExecutionRetentionTtl](proto.temporal.api.namespace.v1.namespaceconfig.md#workflowexecutionretentionttl)

### Methods

- [toJSON](proto.temporal.api.namespace.v1.namespaceconfig.md#tojson)
- [create](proto.temporal.api.namespace.v1.namespaceconfig.md#create)
- [decode](proto.temporal.api.namespace.v1.namespaceconfig.md#decode)
- [decodeDelimited](proto.temporal.api.namespace.v1.namespaceconfig.md#decodedelimited)
- [encode](proto.temporal.api.namespace.v1.namespaceconfig.md#encode)
- [encodeDelimited](proto.temporal.api.namespace.v1.namespaceconfig.md#encodedelimited)
- [fromObject](proto.temporal.api.namespace.v1.namespaceconfig.md#fromobject)
- [toObject](proto.temporal.api.namespace.v1.namespaceconfig.md#toobject)
- [verify](proto.temporal.api.namespace.v1.namespaceconfig.md#verify)

## Constructors

### constructor

\+ **new NamespaceConfig**(`properties?`: [*INamespaceConfig*](../interfaces/proto.temporal.api.namespace.v1.inamespaceconfig.md)): [*NamespaceConfig*](proto.temporal.api.namespace.v1.namespaceconfig.md)

Constructs a new NamespaceConfig.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*INamespaceConfig*](../interfaces/proto.temporal.api.namespace.v1.inamespaceconfig.md) |

**Returns:** [*NamespaceConfig*](proto.temporal.api.namespace.v1.namespaceconfig.md)

## Properties

### badBinaries

• `Optional` **badBinaries**: *null* \| [*IBadBinaries*](../interfaces/proto.temporal.api.namespace.v1.ibadbinaries.md)

NamespaceConfig badBinaries.

Implementation of: [INamespaceConfig](../interfaces/proto.temporal.api.namespace.v1.inamespaceconfig.md).[badBinaries](../interfaces/proto.temporal.api.namespace.v1.inamespaceconfig.md#badbinaries)

___

### historyArchivalState

• **historyArchivalState**: [*ArchivalState*](../enums/proto.temporal.api.enums.v1.archivalstate.md)

NamespaceConfig historyArchivalState.

Implementation of: [INamespaceConfig](../interfaces/proto.temporal.api.namespace.v1.inamespaceconfig.md).[historyArchivalState](../interfaces/proto.temporal.api.namespace.v1.inamespaceconfig.md#historyarchivalstate)

___

### historyArchivalUri

• **historyArchivalUri**: *string*

NamespaceConfig historyArchivalUri.

Implementation of: [INamespaceConfig](../interfaces/proto.temporal.api.namespace.v1.inamespaceconfig.md).[historyArchivalUri](../interfaces/proto.temporal.api.namespace.v1.inamespaceconfig.md#historyarchivaluri)

___

### visibilityArchivalState

• **visibilityArchivalState**: [*ArchivalState*](../enums/proto.temporal.api.enums.v1.archivalstate.md)

NamespaceConfig visibilityArchivalState.

Implementation of: [INamespaceConfig](../interfaces/proto.temporal.api.namespace.v1.inamespaceconfig.md).[visibilityArchivalState](../interfaces/proto.temporal.api.namespace.v1.inamespaceconfig.md#visibilityarchivalstate)

___

### visibilityArchivalUri

• **visibilityArchivalUri**: *string*

NamespaceConfig visibilityArchivalUri.

Implementation of: [INamespaceConfig](../interfaces/proto.temporal.api.namespace.v1.inamespaceconfig.md).[visibilityArchivalUri](../interfaces/proto.temporal.api.namespace.v1.inamespaceconfig.md#visibilityarchivaluri)

___

### workflowExecutionRetentionTtl

• `Optional` **workflowExecutionRetentionTtl**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

NamespaceConfig workflowExecutionRetentionTtl.

Implementation of: [INamespaceConfig](../interfaces/proto.temporal.api.namespace.v1.inamespaceconfig.md).[workflowExecutionRetentionTtl](../interfaces/proto.temporal.api.namespace.v1.inamespaceconfig.md#workflowexecutionretentionttl)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this NamespaceConfig to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*INamespaceConfig*](../interfaces/proto.temporal.api.namespace.v1.inamespaceconfig.md)): [*NamespaceConfig*](proto.temporal.api.namespace.v1.namespaceconfig.md)

Creates a new NamespaceConfig instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*INamespaceConfig*](../interfaces/proto.temporal.api.namespace.v1.inamespaceconfig.md) |

**Returns:** [*NamespaceConfig*](proto.temporal.api.namespace.v1.namespaceconfig.md)

NamespaceConfig instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*NamespaceConfig*](proto.temporal.api.namespace.v1.namespaceconfig.md)

Decodes a NamespaceConfig message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*NamespaceConfig*](proto.temporal.api.namespace.v1.namespaceconfig.md)

NamespaceConfig

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*NamespaceConfig*](proto.temporal.api.namespace.v1.namespaceconfig.md)

Decodes a NamespaceConfig message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*NamespaceConfig*](proto.temporal.api.namespace.v1.namespaceconfig.md)

NamespaceConfig

___

### encode

▸ `Static`**encode**(`message`: [*INamespaceConfig*](../interfaces/proto.temporal.api.namespace.v1.inamespaceconfig.md), `writer?`: *Writer*): *Writer*

Encodes the specified NamespaceConfig message. Does not implicitly [verify](proto.temporal.api.namespace.v1.namespaceconfig.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*INamespaceConfig*](../interfaces/proto.temporal.api.namespace.v1.inamespaceconfig.md) | NamespaceConfig message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*INamespaceConfig*](../interfaces/proto.temporal.api.namespace.v1.inamespaceconfig.md), `writer?`: *Writer*): *Writer*

Encodes the specified NamespaceConfig message, length delimited. Does not implicitly [verify](proto.temporal.api.namespace.v1.namespaceconfig.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*INamespaceConfig*](../interfaces/proto.temporal.api.namespace.v1.inamespaceconfig.md) | NamespaceConfig message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*NamespaceConfig*](proto.temporal.api.namespace.v1.namespaceconfig.md)

Creates a NamespaceConfig message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*NamespaceConfig*](proto.temporal.api.namespace.v1.namespaceconfig.md)

NamespaceConfig

___

### toObject

▸ `Static`**toObject**(`message`: [*NamespaceConfig*](proto.temporal.api.namespace.v1.namespaceconfig.md), `options?`: IConversionOptions): *object*

Creates a plain object from a NamespaceConfig message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*NamespaceConfig*](proto.temporal.api.namespace.v1.namespaceconfig.md) | NamespaceConfig   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a NamespaceConfig message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
