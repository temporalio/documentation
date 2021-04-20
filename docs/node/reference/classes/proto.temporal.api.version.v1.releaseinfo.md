# Class: ReleaseInfo

[version](../modules/proto.temporal.api.version.md).[v1](../modules/proto.temporal.api.version.v1.md).ReleaseInfo

Represents a ReleaseInfo.

## Implements

* [*IReleaseInfo*](../interfaces/proto.temporal.api.version.v1.ireleaseinfo.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.version.v1.releaseinfo.md#constructor)

### Properties

- [notes](proto.temporal.api.version.v1.releaseinfo.md#notes)
- [releaseTime](proto.temporal.api.version.v1.releaseinfo.md#releasetime)
- [version](proto.temporal.api.version.v1.releaseinfo.md#version)

### Methods

- [toJSON](proto.temporal.api.version.v1.releaseinfo.md#tojson)
- [create](proto.temporal.api.version.v1.releaseinfo.md#create)
- [decode](proto.temporal.api.version.v1.releaseinfo.md#decode)
- [decodeDelimited](proto.temporal.api.version.v1.releaseinfo.md#decodedelimited)
- [encode](proto.temporal.api.version.v1.releaseinfo.md#encode)
- [encodeDelimited](proto.temporal.api.version.v1.releaseinfo.md#encodedelimited)
- [fromObject](proto.temporal.api.version.v1.releaseinfo.md#fromobject)
- [toObject](proto.temporal.api.version.v1.releaseinfo.md#toobject)
- [verify](proto.temporal.api.version.v1.releaseinfo.md#verify)

## Constructors

### constructor

\+ **new ReleaseInfo**(`properties?`: [*IReleaseInfo*](../interfaces/proto.temporal.api.version.v1.ireleaseinfo.md)): [*ReleaseInfo*](proto.temporal.api.version.v1.releaseinfo.md)

Constructs a new ReleaseInfo.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IReleaseInfo*](../interfaces/proto.temporal.api.version.v1.ireleaseinfo.md) |

**Returns:** [*ReleaseInfo*](proto.temporal.api.version.v1.releaseinfo.md)

## Properties

### notes

• **notes**: *string*

ReleaseInfo notes.

Implementation of: [IReleaseInfo](../interfaces/proto.temporal.api.version.v1.ireleaseinfo.md).[notes](../interfaces/proto.temporal.api.version.v1.ireleaseinfo.md#notes)

___

### releaseTime

• `Optional` **releaseTime**: *null* \| [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md)

ReleaseInfo releaseTime.

Implementation of: [IReleaseInfo](../interfaces/proto.temporal.api.version.v1.ireleaseinfo.md).[releaseTime](../interfaces/proto.temporal.api.version.v1.ireleaseinfo.md#releasetime)

___

### version

• **version**: *string*

ReleaseInfo version.

Implementation of: [IReleaseInfo](../interfaces/proto.temporal.api.version.v1.ireleaseinfo.md).[version](../interfaces/proto.temporal.api.version.v1.ireleaseinfo.md#version)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ReleaseInfo to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IReleaseInfo*](../interfaces/proto.temporal.api.version.v1.ireleaseinfo.md)): [*ReleaseInfo*](proto.temporal.api.version.v1.releaseinfo.md)

Creates a new ReleaseInfo instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IReleaseInfo*](../interfaces/proto.temporal.api.version.v1.ireleaseinfo.md) |

**Returns:** [*ReleaseInfo*](proto.temporal.api.version.v1.releaseinfo.md)

ReleaseInfo instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ReleaseInfo*](proto.temporal.api.version.v1.releaseinfo.md)

Decodes a ReleaseInfo message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ReleaseInfo*](proto.temporal.api.version.v1.releaseinfo.md)

ReleaseInfo

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ReleaseInfo*](proto.temporal.api.version.v1.releaseinfo.md)

Decodes a ReleaseInfo message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ReleaseInfo*](proto.temporal.api.version.v1.releaseinfo.md)

ReleaseInfo

___

### encode

▸ `Static`**encode**(`message`: [*IReleaseInfo*](../interfaces/proto.temporal.api.version.v1.ireleaseinfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified ReleaseInfo message. Does not implicitly [verify](proto.temporal.api.version.v1.releaseinfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IReleaseInfo*](../interfaces/proto.temporal.api.version.v1.ireleaseinfo.md) | ReleaseInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IReleaseInfo*](../interfaces/proto.temporal.api.version.v1.ireleaseinfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified ReleaseInfo message, length delimited. Does not implicitly [verify](proto.temporal.api.version.v1.releaseinfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IReleaseInfo*](../interfaces/proto.temporal.api.version.v1.ireleaseinfo.md) | ReleaseInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ReleaseInfo*](proto.temporal.api.version.v1.releaseinfo.md)

Creates a ReleaseInfo message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ReleaseInfo*](proto.temporal.api.version.v1.releaseinfo.md)

ReleaseInfo

___

### toObject

▸ `Static`**toObject**(`message`: [*ReleaseInfo*](proto.temporal.api.version.v1.releaseinfo.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ReleaseInfo message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ReleaseInfo*](proto.temporal.api.version.v1.releaseinfo.md) | ReleaseInfo   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ReleaseInfo message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
