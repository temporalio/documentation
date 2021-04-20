# Class: VersionInfo

[version](../modules/proto.temporal.api.version.md).[v1](../modules/proto.temporal.api.version.v1.md).VersionInfo

Represents a VersionInfo.

## Implements

* [*IVersionInfo*](../interfaces/proto.temporal.api.version.v1.iversioninfo.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.version.v1.versioninfo.md#constructor)

### Properties

- [alerts](proto.temporal.api.version.v1.versioninfo.md#alerts)
- [current](proto.temporal.api.version.v1.versioninfo.md#current)
- [instructions](proto.temporal.api.version.v1.versioninfo.md#instructions)
- [lastUpdateTime](proto.temporal.api.version.v1.versioninfo.md#lastupdatetime)
- [recommended](proto.temporal.api.version.v1.versioninfo.md#recommended)

### Methods

- [toJSON](proto.temporal.api.version.v1.versioninfo.md#tojson)
- [create](proto.temporal.api.version.v1.versioninfo.md#create)
- [decode](proto.temporal.api.version.v1.versioninfo.md#decode)
- [decodeDelimited](proto.temporal.api.version.v1.versioninfo.md#decodedelimited)
- [encode](proto.temporal.api.version.v1.versioninfo.md#encode)
- [encodeDelimited](proto.temporal.api.version.v1.versioninfo.md#encodedelimited)
- [fromObject](proto.temporal.api.version.v1.versioninfo.md#fromobject)
- [toObject](proto.temporal.api.version.v1.versioninfo.md#toobject)
- [verify](proto.temporal.api.version.v1.versioninfo.md#verify)

## Constructors

### constructor

\+ **new VersionInfo**(`properties?`: [*IVersionInfo*](../interfaces/proto.temporal.api.version.v1.iversioninfo.md)): [*VersionInfo*](proto.temporal.api.version.v1.versioninfo.md)

Constructs a new VersionInfo.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IVersionInfo*](../interfaces/proto.temporal.api.version.v1.iversioninfo.md) |

**Returns:** [*VersionInfo*](proto.temporal.api.version.v1.versioninfo.md)

## Properties

### alerts

• **alerts**: [*IAlert*](../interfaces/proto.temporal.api.version.v1.ialert.md)[]

VersionInfo alerts.

Implementation of: [IVersionInfo](../interfaces/proto.temporal.api.version.v1.iversioninfo.md).[alerts](../interfaces/proto.temporal.api.version.v1.iversioninfo.md#alerts)

___

### current

• `Optional` **current**: *null* \| [*IReleaseInfo*](../interfaces/proto.temporal.api.version.v1.ireleaseinfo.md)

VersionInfo current.

Implementation of: [IVersionInfo](../interfaces/proto.temporal.api.version.v1.iversioninfo.md).[current](../interfaces/proto.temporal.api.version.v1.iversioninfo.md#current)

___

### instructions

• **instructions**: *string*

VersionInfo instructions.

Implementation of: [IVersionInfo](../interfaces/proto.temporal.api.version.v1.iversioninfo.md).[instructions](../interfaces/proto.temporal.api.version.v1.iversioninfo.md#instructions)

___

### lastUpdateTime

• `Optional` **lastUpdateTime**: *null* \| [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md)

VersionInfo lastUpdateTime.

Implementation of: [IVersionInfo](../interfaces/proto.temporal.api.version.v1.iversioninfo.md).[lastUpdateTime](../interfaces/proto.temporal.api.version.v1.iversioninfo.md#lastupdatetime)

___

### recommended

• `Optional` **recommended**: *null* \| [*IReleaseInfo*](../interfaces/proto.temporal.api.version.v1.ireleaseinfo.md)

VersionInfo recommended.

Implementation of: [IVersionInfo](../interfaces/proto.temporal.api.version.v1.iversioninfo.md).[recommended](../interfaces/proto.temporal.api.version.v1.iversioninfo.md#recommended)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this VersionInfo to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IVersionInfo*](../interfaces/proto.temporal.api.version.v1.iversioninfo.md)): [*VersionInfo*](proto.temporal.api.version.v1.versioninfo.md)

Creates a new VersionInfo instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IVersionInfo*](../interfaces/proto.temporal.api.version.v1.iversioninfo.md) |

**Returns:** [*VersionInfo*](proto.temporal.api.version.v1.versioninfo.md)

VersionInfo instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*VersionInfo*](proto.temporal.api.version.v1.versioninfo.md)

Decodes a VersionInfo message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*VersionInfo*](proto.temporal.api.version.v1.versioninfo.md)

VersionInfo

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*VersionInfo*](proto.temporal.api.version.v1.versioninfo.md)

Decodes a VersionInfo message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*VersionInfo*](proto.temporal.api.version.v1.versioninfo.md)

VersionInfo

___

### encode

▸ `Static`**encode**(`message`: [*IVersionInfo*](../interfaces/proto.temporal.api.version.v1.iversioninfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified VersionInfo message. Does not implicitly [verify](proto.temporal.api.version.v1.versioninfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IVersionInfo*](../interfaces/proto.temporal.api.version.v1.iversioninfo.md) | VersionInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IVersionInfo*](../interfaces/proto.temporal.api.version.v1.iversioninfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified VersionInfo message, length delimited. Does not implicitly [verify](proto.temporal.api.version.v1.versioninfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IVersionInfo*](../interfaces/proto.temporal.api.version.v1.iversioninfo.md) | VersionInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*VersionInfo*](proto.temporal.api.version.v1.versioninfo.md)

Creates a VersionInfo message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*VersionInfo*](proto.temporal.api.version.v1.versioninfo.md)

VersionInfo

___

### toObject

▸ `Static`**toObject**(`message`: [*VersionInfo*](proto.temporal.api.version.v1.versioninfo.md), `options?`: IConversionOptions): *object*

Creates a plain object from a VersionInfo message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*VersionInfo*](proto.temporal.api.version.v1.versioninfo.md) | VersionInfo   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a VersionInfo message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
