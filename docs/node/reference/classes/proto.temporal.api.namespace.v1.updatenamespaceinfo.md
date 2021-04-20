# Class: UpdateNamespaceInfo

[namespace](../modules/proto.temporal.api.namespace.md).[v1](../modules/proto.temporal.api.namespace.v1.md).UpdateNamespaceInfo

Represents an UpdateNamespaceInfo.

## Implements

* [*IUpdateNamespaceInfo*](../interfaces/proto.temporal.api.namespace.v1.iupdatenamespaceinfo.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.namespace.v1.updatenamespaceinfo.md#constructor)

### Properties

- [data](proto.temporal.api.namespace.v1.updatenamespaceinfo.md#data)
- [description](proto.temporal.api.namespace.v1.updatenamespaceinfo.md#description)
- [ownerEmail](proto.temporal.api.namespace.v1.updatenamespaceinfo.md#owneremail)

### Methods

- [toJSON](proto.temporal.api.namespace.v1.updatenamespaceinfo.md#tojson)
- [create](proto.temporal.api.namespace.v1.updatenamespaceinfo.md#create)
- [decode](proto.temporal.api.namespace.v1.updatenamespaceinfo.md#decode)
- [decodeDelimited](proto.temporal.api.namespace.v1.updatenamespaceinfo.md#decodedelimited)
- [encode](proto.temporal.api.namespace.v1.updatenamespaceinfo.md#encode)
- [encodeDelimited](proto.temporal.api.namespace.v1.updatenamespaceinfo.md#encodedelimited)
- [fromObject](proto.temporal.api.namespace.v1.updatenamespaceinfo.md#fromobject)
- [toObject](proto.temporal.api.namespace.v1.updatenamespaceinfo.md#toobject)
- [verify](proto.temporal.api.namespace.v1.updatenamespaceinfo.md#verify)

## Constructors

### constructor

\+ **new UpdateNamespaceInfo**(`properties?`: [*IUpdateNamespaceInfo*](../interfaces/proto.temporal.api.namespace.v1.iupdatenamespaceinfo.md)): [*UpdateNamespaceInfo*](proto.temporal.api.namespace.v1.updatenamespaceinfo.md)

Constructs a new UpdateNamespaceInfo.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IUpdateNamespaceInfo*](../interfaces/proto.temporal.api.namespace.v1.iupdatenamespaceinfo.md) |

**Returns:** [*UpdateNamespaceInfo*](proto.temporal.api.namespace.v1.updatenamespaceinfo.md)

## Properties

### data

• **data**: *object*

UpdateNamespaceInfo data.

#### Type declaration:

Implementation of: [IUpdateNamespaceInfo](../interfaces/proto.temporal.api.namespace.v1.iupdatenamespaceinfo.md).[data](../interfaces/proto.temporal.api.namespace.v1.iupdatenamespaceinfo.md#data)

___

### description

• **description**: *string*

UpdateNamespaceInfo description.

Implementation of: [IUpdateNamespaceInfo](../interfaces/proto.temporal.api.namespace.v1.iupdatenamespaceinfo.md).[description](../interfaces/proto.temporal.api.namespace.v1.iupdatenamespaceinfo.md#description)

___

### ownerEmail

• **ownerEmail**: *string*

UpdateNamespaceInfo ownerEmail.

Implementation of: [IUpdateNamespaceInfo](../interfaces/proto.temporal.api.namespace.v1.iupdatenamespaceinfo.md).[ownerEmail](../interfaces/proto.temporal.api.namespace.v1.iupdatenamespaceinfo.md#owneremail)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this UpdateNamespaceInfo to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IUpdateNamespaceInfo*](../interfaces/proto.temporal.api.namespace.v1.iupdatenamespaceinfo.md)): [*UpdateNamespaceInfo*](proto.temporal.api.namespace.v1.updatenamespaceinfo.md)

Creates a new UpdateNamespaceInfo instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IUpdateNamespaceInfo*](../interfaces/proto.temporal.api.namespace.v1.iupdatenamespaceinfo.md) |

**Returns:** [*UpdateNamespaceInfo*](proto.temporal.api.namespace.v1.updatenamespaceinfo.md)

UpdateNamespaceInfo instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*UpdateNamespaceInfo*](proto.temporal.api.namespace.v1.updatenamespaceinfo.md)

Decodes an UpdateNamespaceInfo message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*UpdateNamespaceInfo*](proto.temporal.api.namespace.v1.updatenamespaceinfo.md)

UpdateNamespaceInfo

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*UpdateNamespaceInfo*](proto.temporal.api.namespace.v1.updatenamespaceinfo.md)

Decodes an UpdateNamespaceInfo message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*UpdateNamespaceInfo*](proto.temporal.api.namespace.v1.updatenamespaceinfo.md)

UpdateNamespaceInfo

___

### encode

▸ `Static`**encode**(`message`: [*IUpdateNamespaceInfo*](../interfaces/proto.temporal.api.namespace.v1.iupdatenamespaceinfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified UpdateNamespaceInfo message. Does not implicitly [verify](proto.temporal.api.namespace.v1.updatenamespaceinfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IUpdateNamespaceInfo*](../interfaces/proto.temporal.api.namespace.v1.iupdatenamespaceinfo.md) | UpdateNamespaceInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IUpdateNamespaceInfo*](../interfaces/proto.temporal.api.namespace.v1.iupdatenamespaceinfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified UpdateNamespaceInfo message, length delimited. Does not implicitly [verify](proto.temporal.api.namespace.v1.updatenamespaceinfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IUpdateNamespaceInfo*](../interfaces/proto.temporal.api.namespace.v1.iupdatenamespaceinfo.md) | UpdateNamespaceInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*UpdateNamespaceInfo*](proto.temporal.api.namespace.v1.updatenamespaceinfo.md)

Creates an UpdateNamespaceInfo message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*UpdateNamespaceInfo*](proto.temporal.api.namespace.v1.updatenamespaceinfo.md)

UpdateNamespaceInfo

___

### toObject

▸ `Static`**toObject**(`message`: [*UpdateNamespaceInfo*](proto.temporal.api.namespace.v1.updatenamespaceinfo.md), `options?`: IConversionOptions): *object*

Creates a plain object from an UpdateNamespaceInfo message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*UpdateNamespaceInfo*](proto.temporal.api.namespace.v1.updatenamespaceinfo.md) | UpdateNamespaceInfo   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an UpdateNamespaceInfo message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
