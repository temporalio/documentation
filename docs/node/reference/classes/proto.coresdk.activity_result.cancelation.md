# Class: Cancelation

[coresdk](../modules/proto.coresdk.md).[activity_result](../modules/proto.coresdk.activity_result.md).Cancelation

Used in ActivityResult to report cancellation

## Implements

* [*ICancelation*](../interfaces/proto.coresdk.activity_result.icancelation.md)

## Table of contents

### Constructors

- [constructor](proto.coresdk.activity_result.cancelation.md#constructor)

### Properties

- [details](proto.coresdk.activity_result.cancelation.md#details)

### Methods

- [toJSON](proto.coresdk.activity_result.cancelation.md#tojson)
- [create](proto.coresdk.activity_result.cancelation.md#create)
- [decode](proto.coresdk.activity_result.cancelation.md#decode)
- [decodeDelimited](proto.coresdk.activity_result.cancelation.md#decodedelimited)
- [encode](proto.coresdk.activity_result.cancelation.md#encode)
- [encodeDelimited](proto.coresdk.activity_result.cancelation.md#encodedelimited)
- [fromObject](proto.coresdk.activity_result.cancelation.md#fromobject)
- [toObject](proto.coresdk.activity_result.cancelation.md#toobject)
- [verify](proto.coresdk.activity_result.cancelation.md#verify)

## Constructors

### constructor

\+ **new Cancelation**(`properties?`: [*ICancelation*](../interfaces/proto.coresdk.activity_result.icancelation.md)): [*Cancelation*](proto.coresdk.activity_result.cancelation.md)

Constructs a new Cancelation.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ICancelation*](../interfaces/proto.coresdk.activity_result.icancelation.md) |

**Returns:** [*Cancelation*](proto.coresdk.activity_result.cancelation.md)

## Properties

### details

• `Optional` **details**: *null* \| [*IPayload*](../interfaces/proto.coresdk.common.ipayload.md)

Cancelation details.

Implementation of: [ICancelation](../interfaces/proto.coresdk.activity_result.icancelation.md).[details](../interfaces/proto.coresdk.activity_result.icancelation.md#details)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this Cancelation to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ICancelation*](../interfaces/proto.coresdk.activity_result.icancelation.md)): [*Cancelation*](proto.coresdk.activity_result.cancelation.md)

Creates a new Cancelation instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ICancelation*](../interfaces/proto.coresdk.activity_result.icancelation.md) |

**Returns:** [*Cancelation*](proto.coresdk.activity_result.cancelation.md)

Cancelation instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*Cancelation*](proto.coresdk.activity_result.cancelation.md)

Decodes a Cancelation message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*Cancelation*](proto.coresdk.activity_result.cancelation.md)

Cancelation

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*Cancelation*](proto.coresdk.activity_result.cancelation.md)

Decodes a Cancelation message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*Cancelation*](proto.coresdk.activity_result.cancelation.md)

Cancelation

___

### encode

▸ `Static`**encode**(`message`: [*ICancelation*](../interfaces/proto.coresdk.activity_result.icancelation.md), `writer?`: *Writer*): *Writer*

Encodes the specified Cancelation message. Does not implicitly [verify](proto.coresdk.activity_result.cancelation.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ICancelation*](../interfaces/proto.coresdk.activity_result.icancelation.md) | Cancelation message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ICancelation*](../interfaces/proto.coresdk.activity_result.icancelation.md), `writer?`: *Writer*): *Writer*

Encodes the specified Cancelation message, length delimited. Does not implicitly [verify](proto.coresdk.activity_result.cancelation.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ICancelation*](../interfaces/proto.coresdk.activity_result.icancelation.md) | Cancelation message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*Cancelation*](proto.coresdk.activity_result.cancelation.md)

Creates a Cancelation message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*Cancelation*](proto.coresdk.activity_result.cancelation.md)

Cancelation

___

### toObject

▸ `Static`**toObject**(`message`: [*Cancelation*](proto.coresdk.activity_result.cancelation.md), `options?`: IConversionOptions): *object*

Creates a plain object from a Cancelation message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*Cancelation*](proto.coresdk.activity_result.cancelation.md) | Cancelation   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a Cancelation message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
