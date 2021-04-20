# Class: CanceledFailureInfo

[failure](../modules/proto.temporal.api.failure.md).[v1](../modules/proto.temporal.api.failure.v1.md).CanceledFailureInfo

Represents a CanceledFailureInfo.

## Implements

* [*ICanceledFailureInfo*](../interfaces/proto.temporal.api.failure.v1.icanceledfailureinfo.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.failure.v1.canceledfailureinfo.md#constructor)

### Properties

- [details](proto.temporal.api.failure.v1.canceledfailureinfo.md#details)

### Methods

- [toJSON](proto.temporal.api.failure.v1.canceledfailureinfo.md#tojson)
- [create](proto.temporal.api.failure.v1.canceledfailureinfo.md#create)
- [decode](proto.temporal.api.failure.v1.canceledfailureinfo.md#decode)
- [decodeDelimited](proto.temporal.api.failure.v1.canceledfailureinfo.md#decodedelimited)
- [encode](proto.temporal.api.failure.v1.canceledfailureinfo.md#encode)
- [encodeDelimited](proto.temporal.api.failure.v1.canceledfailureinfo.md#encodedelimited)
- [fromObject](proto.temporal.api.failure.v1.canceledfailureinfo.md#fromobject)
- [toObject](proto.temporal.api.failure.v1.canceledfailureinfo.md#toobject)
- [verify](proto.temporal.api.failure.v1.canceledfailureinfo.md#verify)

## Constructors

### constructor

\+ **new CanceledFailureInfo**(`properties?`: [*ICanceledFailureInfo*](../interfaces/proto.temporal.api.failure.v1.icanceledfailureinfo.md)): [*CanceledFailureInfo*](proto.temporal.api.failure.v1.canceledfailureinfo.md)

Constructs a new CanceledFailureInfo.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ICanceledFailureInfo*](../interfaces/proto.temporal.api.failure.v1.icanceledfailureinfo.md) |

**Returns:** [*CanceledFailureInfo*](proto.temporal.api.failure.v1.canceledfailureinfo.md)

## Properties

### details

• `Optional` **details**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

CanceledFailureInfo details.

Implementation of: [ICanceledFailureInfo](../interfaces/proto.temporal.api.failure.v1.icanceledfailureinfo.md).[details](../interfaces/proto.temporal.api.failure.v1.icanceledfailureinfo.md#details)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this CanceledFailureInfo to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ICanceledFailureInfo*](../interfaces/proto.temporal.api.failure.v1.icanceledfailureinfo.md)): [*CanceledFailureInfo*](proto.temporal.api.failure.v1.canceledfailureinfo.md)

Creates a new CanceledFailureInfo instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ICanceledFailureInfo*](../interfaces/proto.temporal.api.failure.v1.icanceledfailureinfo.md) |

**Returns:** [*CanceledFailureInfo*](proto.temporal.api.failure.v1.canceledfailureinfo.md)

CanceledFailureInfo instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*CanceledFailureInfo*](proto.temporal.api.failure.v1.canceledfailureinfo.md)

Decodes a CanceledFailureInfo message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*CanceledFailureInfo*](proto.temporal.api.failure.v1.canceledfailureinfo.md)

CanceledFailureInfo

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*CanceledFailureInfo*](proto.temporal.api.failure.v1.canceledfailureinfo.md)

Decodes a CanceledFailureInfo message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*CanceledFailureInfo*](proto.temporal.api.failure.v1.canceledfailureinfo.md)

CanceledFailureInfo

___

### encode

▸ `Static`**encode**(`message`: [*ICanceledFailureInfo*](../interfaces/proto.temporal.api.failure.v1.icanceledfailureinfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified CanceledFailureInfo message. Does not implicitly [verify](proto.temporal.api.failure.v1.canceledfailureinfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ICanceledFailureInfo*](../interfaces/proto.temporal.api.failure.v1.icanceledfailureinfo.md) | CanceledFailureInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ICanceledFailureInfo*](../interfaces/proto.temporal.api.failure.v1.icanceledfailureinfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified CanceledFailureInfo message, length delimited. Does not implicitly [verify](proto.temporal.api.failure.v1.canceledfailureinfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ICanceledFailureInfo*](../interfaces/proto.temporal.api.failure.v1.icanceledfailureinfo.md) | CanceledFailureInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*CanceledFailureInfo*](proto.temporal.api.failure.v1.canceledfailureinfo.md)

Creates a CanceledFailureInfo message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*CanceledFailureInfo*](proto.temporal.api.failure.v1.canceledfailureinfo.md)

CanceledFailureInfo

___

### toObject

▸ `Static`**toObject**(`message`: [*CanceledFailureInfo*](proto.temporal.api.failure.v1.canceledfailureinfo.md), `options?`: IConversionOptions): *object*

Creates a plain object from a CanceledFailureInfo message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*CanceledFailureInfo*](proto.temporal.api.failure.v1.canceledfailureinfo.md) | CanceledFailureInfo   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a CanceledFailureInfo message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
