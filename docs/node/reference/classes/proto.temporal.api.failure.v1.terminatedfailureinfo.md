# Class: TerminatedFailureInfo

[failure](../modules/proto.temporal.api.failure.md).[v1](../modules/proto.temporal.api.failure.v1.md).TerminatedFailureInfo

Represents a TerminatedFailureInfo.

## Implements

* [*ITerminatedFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iterminatedfailureinfo.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.failure.v1.terminatedfailureinfo.md#constructor)

### Methods

- [toJSON](proto.temporal.api.failure.v1.terminatedfailureinfo.md#tojson)
- [create](proto.temporal.api.failure.v1.terminatedfailureinfo.md#create)
- [decode](proto.temporal.api.failure.v1.terminatedfailureinfo.md#decode)
- [decodeDelimited](proto.temporal.api.failure.v1.terminatedfailureinfo.md#decodedelimited)
- [encode](proto.temporal.api.failure.v1.terminatedfailureinfo.md#encode)
- [encodeDelimited](proto.temporal.api.failure.v1.terminatedfailureinfo.md#encodedelimited)
- [fromObject](proto.temporal.api.failure.v1.terminatedfailureinfo.md#fromobject)
- [toObject](proto.temporal.api.failure.v1.terminatedfailureinfo.md#toobject)
- [verify](proto.temporal.api.failure.v1.terminatedfailureinfo.md#verify)

## Constructors

### constructor

\+ **new TerminatedFailureInfo**(`properties?`: [*ITerminatedFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iterminatedfailureinfo.md)): [*TerminatedFailureInfo*](proto.temporal.api.failure.v1.terminatedfailureinfo.md)

Constructs a new TerminatedFailureInfo.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ITerminatedFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iterminatedfailureinfo.md) |

**Returns:** [*TerminatedFailureInfo*](proto.temporal.api.failure.v1.terminatedfailureinfo.md)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this TerminatedFailureInfo to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ITerminatedFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iterminatedfailureinfo.md)): [*TerminatedFailureInfo*](proto.temporal.api.failure.v1.terminatedfailureinfo.md)

Creates a new TerminatedFailureInfo instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ITerminatedFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iterminatedfailureinfo.md) |

**Returns:** [*TerminatedFailureInfo*](proto.temporal.api.failure.v1.terminatedfailureinfo.md)

TerminatedFailureInfo instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*TerminatedFailureInfo*](proto.temporal.api.failure.v1.terminatedfailureinfo.md)

Decodes a TerminatedFailureInfo message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*TerminatedFailureInfo*](proto.temporal.api.failure.v1.terminatedfailureinfo.md)

TerminatedFailureInfo

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*TerminatedFailureInfo*](proto.temporal.api.failure.v1.terminatedfailureinfo.md)

Decodes a TerminatedFailureInfo message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*TerminatedFailureInfo*](proto.temporal.api.failure.v1.terminatedfailureinfo.md)

TerminatedFailureInfo

___

### encode

▸ `Static`**encode**(`message`: [*ITerminatedFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iterminatedfailureinfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified TerminatedFailureInfo message. Does not implicitly [verify](proto.temporal.api.failure.v1.terminatedfailureinfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ITerminatedFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iterminatedfailureinfo.md) | TerminatedFailureInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ITerminatedFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iterminatedfailureinfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified TerminatedFailureInfo message, length delimited. Does not implicitly [verify](proto.temporal.api.failure.v1.terminatedfailureinfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ITerminatedFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iterminatedfailureinfo.md) | TerminatedFailureInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*TerminatedFailureInfo*](proto.temporal.api.failure.v1.terminatedfailureinfo.md)

Creates a TerminatedFailureInfo message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*TerminatedFailureInfo*](proto.temporal.api.failure.v1.terminatedfailureinfo.md)

TerminatedFailureInfo

___

### toObject

▸ `Static`**toObject**(`message`: [*TerminatedFailureInfo*](proto.temporal.api.failure.v1.terminatedfailureinfo.md), `options?`: IConversionOptions): *object*

Creates a plain object from a TerminatedFailureInfo message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*TerminatedFailureInfo*](proto.temporal.api.failure.v1.terminatedfailureinfo.md) | TerminatedFailureInfo   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a TerminatedFailureInfo message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
