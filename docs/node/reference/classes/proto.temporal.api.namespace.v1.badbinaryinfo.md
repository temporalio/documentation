# Class: BadBinaryInfo

[namespace](../modules/proto.temporal.api.namespace.md).[v1](../modules/proto.temporal.api.namespace.v1.md).BadBinaryInfo

Represents a BadBinaryInfo.

## Implements

* [*IBadBinaryInfo*](../interfaces/proto.temporal.api.namespace.v1.ibadbinaryinfo.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.namespace.v1.badbinaryinfo.md#constructor)

### Properties

- [createTime](proto.temporal.api.namespace.v1.badbinaryinfo.md#createtime)
- [operator](proto.temporal.api.namespace.v1.badbinaryinfo.md#operator)
- [reason](proto.temporal.api.namespace.v1.badbinaryinfo.md#reason)

### Methods

- [toJSON](proto.temporal.api.namespace.v1.badbinaryinfo.md#tojson)
- [create](proto.temporal.api.namespace.v1.badbinaryinfo.md#create)
- [decode](proto.temporal.api.namespace.v1.badbinaryinfo.md#decode)
- [decodeDelimited](proto.temporal.api.namespace.v1.badbinaryinfo.md#decodedelimited)
- [encode](proto.temporal.api.namespace.v1.badbinaryinfo.md#encode)
- [encodeDelimited](proto.temporal.api.namespace.v1.badbinaryinfo.md#encodedelimited)
- [fromObject](proto.temporal.api.namespace.v1.badbinaryinfo.md#fromobject)
- [toObject](proto.temporal.api.namespace.v1.badbinaryinfo.md#toobject)
- [verify](proto.temporal.api.namespace.v1.badbinaryinfo.md#verify)

## Constructors

### constructor

\+ **new BadBinaryInfo**(`properties?`: [*IBadBinaryInfo*](../interfaces/proto.temporal.api.namespace.v1.ibadbinaryinfo.md)): [*BadBinaryInfo*](proto.temporal.api.namespace.v1.badbinaryinfo.md)

Constructs a new BadBinaryInfo.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IBadBinaryInfo*](../interfaces/proto.temporal.api.namespace.v1.ibadbinaryinfo.md) |

**Returns:** [*BadBinaryInfo*](proto.temporal.api.namespace.v1.badbinaryinfo.md)

## Properties

### createTime

• `Optional` **createTime**: *null* \| [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md)

BadBinaryInfo createTime.

Implementation of: [IBadBinaryInfo](../interfaces/proto.temporal.api.namespace.v1.ibadbinaryinfo.md).[createTime](../interfaces/proto.temporal.api.namespace.v1.ibadbinaryinfo.md#createtime)

___

### operator

• **operator**: *string*

BadBinaryInfo operator.

Implementation of: [IBadBinaryInfo](../interfaces/proto.temporal.api.namespace.v1.ibadbinaryinfo.md).[operator](../interfaces/proto.temporal.api.namespace.v1.ibadbinaryinfo.md#operator)

___

### reason

• **reason**: *string*

BadBinaryInfo reason.

Implementation of: [IBadBinaryInfo](../interfaces/proto.temporal.api.namespace.v1.ibadbinaryinfo.md).[reason](../interfaces/proto.temporal.api.namespace.v1.ibadbinaryinfo.md#reason)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this BadBinaryInfo to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IBadBinaryInfo*](../interfaces/proto.temporal.api.namespace.v1.ibadbinaryinfo.md)): [*BadBinaryInfo*](proto.temporal.api.namespace.v1.badbinaryinfo.md)

Creates a new BadBinaryInfo instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IBadBinaryInfo*](../interfaces/proto.temporal.api.namespace.v1.ibadbinaryinfo.md) |

**Returns:** [*BadBinaryInfo*](proto.temporal.api.namespace.v1.badbinaryinfo.md)

BadBinaryInfo instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*BadBinaryInfo*](proto.temporal.api.namespace.v1.badbinaryinfo.md)

Decodes a BadBinaryInfo message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*BadBinaryInfo*](proto.temporal.api.namespace.v1.badbinaryinfo.md)

BadBinaryInfo

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*BadBinaryInfo*](proto.temporal.api.namespace.v1.badbinaryinfo.md)

Decodes a BadBinaryInfo message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*BadBinaryInfo*](proto.temporal.api.namespace.v1.badbinaryinfo.md)

BadBinaryInfo

___

### encode

▸ `Static`**encode**(`message`: [*IBadBinaryInfo*](../interfaces/proto.temporal.api.namespace.v1.ibadbinaryinfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified BadBinaryInfo message. Does not implicitly [verify](proto.temporal.api.namespace.v1.badbinaryinfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IBadBinaryInfo*](../interfaces/proto.temporal.api.namespace.v1.ibadbinaryinfo.md) | BadBinaryInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IBadBinaryInfo*](../interfaces/proto.temporal.api.namespace.v1.ibadbinaryinfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified BadBinaryInfo message, length delimited. Does not implicitly [verify](proto.temporal.api.namespace.v1.badbinaryinfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IBadBinaryInfo*](../interfaces/proto.temporal.api.namespace.v1.ibadbinaryinfo.md) | BadBinaryInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*BadBinaryInfo*](proto.temporal.api.namespace.v1.badbinaryinfo.md)

Creates a BadBinaryInfo message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*BadBinaryInfo*](proto.temporal.api.namespace.v1.badbinaryinfo.md)

BadBinaryInfo

___

### toObject

▸ `Static`**toObject**(`message`: [*BadBinaryInfo*](proto.temporal.api.namespace.v1.badbinaryinfo.md), `options?`: IConversionOptions): *object*

Creates a plain object from a BadBinaryInfo message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*BadBinaryInfo*](proto.temporal.api.namespace.v1.badbinaryinfo.md) | BadBinaryInfo   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a BadBinaryInfo message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
