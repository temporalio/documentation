# Class: ApplicationFailureInfo

[failure](../modules/proto.temporal.api.failure.md).[v1](../modules/proto.temporal.api.failure.v1.md).ApplicationFailureInfo

Represents an ApplicationFailureInfo.

## Implements

* [*IApplicationFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iapplicationfailureinfo.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.failure.v1.applicationfailureinfo.md#constructor)

### Properties

- [details](proto.temporal.api.failure.v1.applicationfailureinfo.md#details)
- [nonRetryable](proto.temporal.api.failure.v1.applicationfailureinfo.md#nonretryable)
- [type](proto.temporal.api.failure.v1.applicationfailureinfo.md#type)

### Methods

- [toJSON](proto.temporal.api.failure.v1.applicationfailureinfo.md#tojson)
- [create](proto.temporal.api.failure.v1.applicationfailureinfo.md#create)
- [decode](proto.temporal.api.failure.v1.applicationfailureinfo.md#decode)
- [decodeDelimited](proto.temporal.api.failure.v1.applicationfailureinfo.md#decodedelimited)
- [encode](proto.temporal.api.failure.v1.applicationfailureinfo.md#encode)
- [encodeDelimited](proto.temporal.api.failure.v1.applicationfailureinfo.md#encodedelimited)
- [fromObject](proto.temporal.api.failure.v1.applicationfailureinfo.md#fromobject)
- [toObject](proto.temporal.api.failure.v1.applicationfailureinfo.md#toobject)
- [verify](proto.temporal.api.failure.v1.applicationfailureinfo.md#verify)

## Constructors

### constructor

\+ **new ApplicationFailureInfo**(`properties?`: [*IApplicationFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iapplicationfailureinfo.md)): [*ApplicationFailureInfo*](proto.temporal.api.failure.v1.applicationfailureinfo.md)

Constructs a new ApplicationFailureInfo.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IApplicationFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iapplicationfailureinfo.md) |

**Returns:** [*ApplicationFailureInfo*](proto.temporal.api.failure.v1.applicationfailureinfo.md)

## Properties

### details

• `Optional` **details**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

ApplicationFailureInfo details.

Implementation of: [IApplicationFailureInfo](../interfaces/proto.temporal.api.failure.v1.iapplicationfailureinfo.md).[details](../interfaces/proto.temporal.api.failure.v1.iapplicationfailureinfo.md#details)

___

### nonRetryable

• **nonRetryable**: *boolean*

ApplicationFailureInfo nonRetryable.

Implementation of: [IApplicationFailureInfo](../interfaces/proto.temporal.api.failure.v1.iapplicationfailureinfo.md).[nonRetryable](../interfaces/proto.temporal.api.failure.v1.iapplicationfailureinfo.md#nonretryable)

___

### type

• **type**: *string*

ApplicationFailureInfo type.

Implementation of: [IApplicationFailureInfo](../interfaces/proto.temporal.api.failure.v1.iapplicationfailureinfo.md).[type](../interfaces/proto.temporal.api.failure.v1.iapplicationfailureinfo.md#type)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ApplicationFailureInfo to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IApplicationFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iapplicationfailureinfo.md)): [*ApplicationFailureInfo*](proto.temporal.api.failure.v1.applicationfailureinfo.md)

Creates a new ApplicationFailureInfo instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IApplicationFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iapplicationfailureinfo.md) |

**Returns:** [*ApplicationFailureInfo*](proto.temporal.api.failure.v1.applicationfailureinfo.md)

ApplicationFailureInfo instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ApplicationFailureInfo*](proto.temporal.api.failure.v1.applicationfailureinfo.md)

Decodes an ApplicationFailureInfo message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ApplicationFailureInfo*](proto.temporal.api.failure.v1.applicationfailureinfo.md)

ApplicationFailureInfo

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ApplicationFailureInfo*](proto.temporal.api.failure.v1.applicationfailureinfo.md)

Decodes an ApplicationFailureInfo message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ApplicationFailureInfo*](proto.temporal.api.failure.v1.applicationfailureinfo.md)

ApplicationFailureInfo

___

### encode

▸ `Static`**encode**(`message`: [*IApplicationFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iapplicationfailureinfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified ApplicationFailureInfo message. Does not implicitly [verify](proto.temporal.api.failure.v1.applicationfailureinfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IApplicationFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iapplicationfailureinfo.md) | ApplicationFailureInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IApplicationFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iapplicationfailureinfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified ApplicationFailureInfo message, length delimited. Does not implicitly [verify](proto.temporal.api.failure.v1.applicationfailureinfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IApplicationFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iapplicationfailureinfo.md) | ApplicationFailureInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ApplicationFailureInfo*](proto.temporal.api.failure.v1.applicationfailureinfo.md)

Creates an ApplicationFailureInfo message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ApplicationFailureInfo*](proto.temporal.api.failure.v1.applicationfailureinfo.md)

ApplicationFailureInfo

___

### toObject

▸ `Static`**toObject**(`message`: [*ApplicationFailureInfo*](proto.temporal.api.failure.v1.applicationfailureinfo.md), `options?`: IConversionOptions): *object*

Creates a plain object from an ApplicationFailureInfo message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ApplicationFailureInfo*](proto.temporal.api.failure.v1.applicationfailureinfo.md) | ApplicationFailureInfo   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an ApplicationFailureInfo message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
