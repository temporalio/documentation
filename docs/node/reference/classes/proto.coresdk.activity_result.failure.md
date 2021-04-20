# Class: Failure

[coresdk](../modules/proto.coresdk.md).[activity_result](../modules/proto.coresdk.activity_result.md).Failure

Used in ActivityResult to report failure

## Implements

* [*IFailure*](../interfaces/proto.coresdk.activity_result.ifailure.md)

## Table of contents

### Constructors

- [constructor](proto.coresdk.activity_result.failure.md#constructor)

### Properties

- [failure](proto.coresdk.activity_result.failure.md#failure)

### Methods

- [toJSON](proto.coresdk.activity_result.failure.md#tojson)
- [create](proto.coresdk.activity_result.failure.md#create)
- [decode](proto.coresdk.activity_result.failure.md#decode)
- [decodeDelimited](proto.coresdk.activity_result.failure.md#decodedelimited)
- [encode](proto.coresdk.activity_result.failure.md#encode)
- [encodeDelimited](proto.coresdk.activity_result.failure.md#encodedelimited)
- [fromObject](proto.coresdk.activity_result.failure.md#fromobject)
- [toObject](proto.coresdk.activity_result.failure.md#toobject)
- [verify](proto.coresdk.activity_result.failure.md#verify)

## Constructors

### constructor

\+ **new Failure**(`properties?`: [*IFailure*](../interfaces/proto.coresdk.activity_result.ifailure.md)): [*Failure*](proto.coresdk.activity_result.failure.md)

Constructs a new Failure.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IFailure*](../interfaces/proto.coresdk.activity_result.ifailure.md) |

**Returns:** [*Failure*](proto.coresdk.activity_result.failure.md)

## Properties

### failure

• `Optional` **failure**: *null* \| [*IUserCodeFailure*](../interfaces/proto.coresdk.common.iusercodefailure.md)

Failure failure.

Implementation of: [IFailure](../interfaces/proto.coresdk.activity_result.ifailure.md).[failure](../interfaces/proto.coresdk.activity_result.ifailure.md#failure)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this Failure to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IFailure*](../interfaces/proto.coresdk.activity_result.ifailure.md)): [*Failure*](proto.coresdk.activity_result.failure.md)

Creates a new Failure instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IFailure*](../interfaces/proto.coresdk.activity_result.ifailure.md) |

**Returns:** [*Failure*](proto.coresdk.activity_result.failure.md)

Failure instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*Failure*](proto.coresdk.activity_result.failure.md)

Decodes a Failure message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*Failure*](proto.coresdk.activity_result.failure.md)

Failure

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*Failure*](proto.coresdk.activity_result.failure.md)

Decodes a Failure message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*Failure*](proto.coresdk.activity_result.failure.md)

Failure

___

### encode

▸ `Static`**encode**(`message`: [*IFailure*](../interfaces/proto.coresdk.activity_result.ifailure.md), `writer?`: *Writer*): *Writer*

Encodes the specified Failure message. Does not implicitly [verify](proto.coresdk.activity_result.failure.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IFailure*](../interfaces/proto.coresdk.activity_result.ifailure.md) | Failure message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IFailure*](../interfaces/proto.coresdk.activity_result.ifailure.md), `writer?`: *Writer*): *Writer*

Encodes the specified Failure message, length delimited. Does not implicitly [verify](proto.coresdk.activity_result.failure.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IFailure*](../interfaces/proto.coresdk.activity_result.ifailure.md) | Failure message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*Failure*](proto.coresdk.activity_result.failure.md)

Creates a Failure message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*Failure*](proto.coresdk.activity_result.failure.md)

Failure

___

### toObject

▸ `Static`**toObject**(`message`: [*Failure*](proto.coresdk.activity_result.failure.md), `options?`: IConversionOptions): *object*

Creates a plain object from a Failure message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*Failure*](proto.coresdk.activity_result.failure.md) | Failure   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a Failure message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
