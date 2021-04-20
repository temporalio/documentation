# Class: NamespaceInfo

[namespace](../modules/proto.temporal.api.namespace.md).[v1](../modules/proto.temporal.api.namespace.v1.md).NamespaceInfo

Represents a NamespaceInfo.

## Implements

* [*INamespaceInfo*](../interfaces/proto.temporal.api.namespace.v1.inamespaceinfo.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.namespace.v1.namespaceinfo.md#constructor)

### Properties

- [data](proto.temporal.api.namespace.v1.namespaceinfo.md#data)
- [description](proto.temporal.api.namespace.v1.namespaceinfo.md#description)
- [id](proto.temporal.api.namespace.v1.namespaceinfo.md#id)
- [name](proto.temporal.api.namespace.v1.namespaceinfo.md#name)
- [ownerEmail](proto.temporal.api.namespace.v1.namespaceinfo.md#owneremail)
- [state](proto.temporal.api.namespace.v1.namespaceinfo.md#state)

### Methods

- [toJSON](proto.temporal.api.namespace.v1.namespaceinfo.md#tojson)
- [create](proto.temporal.api.namespace.v1.namespaceinfo.md#create)
- [decode](proto.temporal.api.namespace.v1.namespaceinfo.md#decode)
- [decodeDelimited](proto.temporal.api.namespace.v1.namespaceinfo.md#decodedelimited)
- [encode](proto.temporal.api.namespace.v1.namespaceinfo.md#encode)
- [encodeDelimited](proto.temporal.api.namespace.v1.namespaceinfo.md#encodedelimited)
- [fromObject](proto.temporal.api.namespace.v1.namespaceinfo.md#fromobject)
- [toObject](proto.temporal.api.namespace.v1.namespaceinfo.md#toobject)
- [verify](proto.temporal.api.namespace.v1.namespaceinfo.md#verify)

## Constructors

### constructor

\+ **new NamespaceInfo**(`properties?`: [*INamespaceInfo*](../interfaces/proto.temporal.api.namespace.v1.inamespaceinfo.md)): [*NamespaceInfo*](proto.temporal.api.namespace.v1.namespaceinfo.md)

Constructs a new NamespaceInfo.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*INamespaceInfo*](../interfaces/proto.temporal.api.namespace.v1.inamespaceinfo.md) |

**Returns:** [*NamespaceInfo*](proto.temporal.api.namespace.v1.namespaceinfo.md)

## Properties

### data

• **data**: *object*

NamespaceInfo data.

#### Type declaration:

Implementation of: [INamespaceInfo](../interfaces/proto.temporal.api.namespace.v1.inamespaceinfo.md).[data](../interfaces/proto.temporal.api.namespace.v1.inamespaceinfo.md#data)

___

### description

• **description**: *string*

NamespaceInfo description.

Implementation of: [INamespaceInfo](../interfaces/proto.temporal.api.namespace.v1.inamespaceinfo.md).[description](../interfaces/proto.temporal.api.namespace.v1.inamespaceinfo.md#description)

___

### id

• **id**: *string*

NamespaceInfo id.

Implementation of: [INamespaceInfo](../interfaces/proto.temporal.api.namespace.v1.inamespaceinfo.md).[id](../interfaces/proto.temporal.api.namespace.v1.inamespaceinfo.md#id)

___

### name

• **name**: *string*

NamespaceInfo name.

Implementation of: [INamespaceInfo](../interfaces/proto.temporal.api.namespace.v1.inamespaceinfo.md).[name](../interfaces/proto.temporal.api.namespace.v1.inamespaceinfo.md#name)

___

### ownerEmail

• **ownerEmail**: *string*

NamespaceInfo ownerEmail.

Implementation of: [INamespaceInfo](../interfaces/proto.temporal.api.namespace.v1.inamespaceinfo.md).[ownerEmail](../interfaces/proto.temporal.api.namespace.v1.inamespaceinfo.md#owneremail)

___

### state

• **state**: [*NamespaceState*](../enums/proto.temporal.api.enums.v1.namespacestate.md)

NamespaceInfo state.

Implementation of: [INamespaceInfo](../interfaces/proto.temporal.api.namespace.v1.inamespaceinfo.md).[state](../interfaces/proto.temporal.api.namespace.v1.inamespaceinfo.md#state)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this NamespaceInfo to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*INamespaceInfo*](../interfaces/proto.temporal.api.namespace.v1.inamespaceinfo.md)): [*NamespaceInfo*](proto.temporal.api.namespace.v1.namespaceinfo.md)

Creates a new NamespaceInfo instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*INamespaceInfo*](../interfaces/proto.temporal.api.namespace.v1.inamespaceinfo.md) |

**Returns:** [*NamespaceInfo*](proto.temporal.api.namespace.v1.namespaceinfo.md)

NamespaceInfo instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*NamespaceInfo*](proto.temporal.api.namespace.v1.namespaceinfo.md)

Decodes a NamespaceInfo message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*NamespaceInfo*](proto.temporal.api.namespace.v1.namespaceinfo.md)

NamespaceInfo

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*NamespaceInfo*](proto.temporal.api.namespace.v1.namespaceinfo.md)

Decodes a NamespaceInfo message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*NamespaceInfo*](proto.temporal.api.namespace.v1.namespaceinfo.md)

NamespaceInfo

___

### encode

▸ `Static`**encode**(`message`: [*INamespaceInfo*](../interfaces/proto.temporal.api.namespace.v1.inamespaceinfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified NamespaceInfo message. Does not implicitly [verify](proto.temporal.api.namespace.v1.namespaceinfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*INamespaceInfo*](../interfaces/proto.temporal.api.namespace.v1.inamespaceinfo.md) | NamespaceInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*INamespaceInfo*](../interfaces/proto.temporal.api.namespace.v1.inamespaceinfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified NamespaceInfo message, length delimited. Does not implicitly [verify](proto.temporal.api.namespace.v1.namespaceinfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*INamespaceInfo*](../interfaces/proto.temporal.api.namespace.v1.inamespaceinfo.md) | NamespaceInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*NamespaceInfo*](proto.temporal.api.namespace.v1.namespaceinfo.md)

Creates a NamespaceInfo message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*NamespaceInfo*](proto.temporal.api.namespace.v1.namespaceinfo.md)

NamespaceInfo

___

### toObject

▸ `Static`**toObject**(`message`: [*NamespaceInfo*](proto.temporal.api.namespace.v1.namespaceinfo.md), `options?`: IConversionOptions): *object*

Creates a plain object from a NamespaceInfo message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*NamespaceInfo*](proto.temporal.api.namespace.v1.namespaceinfo.md) | NamespaceInfo   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a NamespaceInfo message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
