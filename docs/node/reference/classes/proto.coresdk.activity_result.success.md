# Class: Success

[coresdk](../modules/proto.coresdk.md).[activity_result](../modules/proto.coresdk.activity_result.md).Success

Used in ActivityResult to report successful completion

## Implements

* [*ISuccess*](../interfaces/proto.coresdk.activity_result.isuccess.md)

## Table of contents

### Constructors

- [constructor](proto.coresdk.activity_result.success.md#constructor)

### Properties

- [result](proto.coresdk.activity_result.success.md#result)

### Methods

- [toJSON](proto.coresdk.activity_result.success.md#tojson)
- [create](proto.coresdk.activity_result.success.md#create)
- [decode](proto.coresdk.activity_result.success.md#decode)
- [decodeDelimited](proto.coresdk.activity_result.success.md#decodedelimited)
- [encode](proto.coresdk.activity_result.success.md#encode)
- [encodeDelimited](proto.coresdk.activity_result.success.md#encodedelimited)
- [fromObject](proto.coresdk.activity_result.success.md#fromobject)
- [toObject](proto.coresdk.activity_result.success.md#toobject)
- [verify](proto.coresdk.activity_result.success.md#verify)

## Constructors

### constructor

\+ **new Success**(`properties?`: [*ISuccess*](../interfaces/proto.coresdk.activity_result.isuccess.md)): [*Success*](proto.coresdk.activity_result.success.md)

Constructs a new Success.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ISuccess*](../interfaces/proto.coresdk.activity_result.isuccess.md) |

**Returns:** [*Success*](proto.coresdk.activity_result.success.md)

## Properties

### result

• `Optional` **result**: *null* \| [*IPayload*](../interfaces/proto.coresdk.common.ipayload.md)

Success result.

Implementation of: [ISuccess](../interfaces/proto.coresdk.activity_result.isuccess.md).[result](../interfaces/proto.coresdk.activity_result.isuccess.md#result)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this Success to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ISuccess*](../interfaces/proto.coresdk.activity_result.isuccess.md)): [*Success*](proto.coresdk.activity_result.success.md)

Creates a new Success instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ISuccess*](../interfaces/proto.coresdk.activity_result.isuccess.md) |

**Returns:** [*Success*](proto.coresdk.activity_result.success.md)

Success instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*Success*](proto.coresdk.activity_result.success.md)

Decodes a Success message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*Success*](proto.coresdk.activity_result.success.md)

Success

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*Success*](proto.coresdk.activity_result.success.md)

Decodes a Success message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*Success*](proto.coresdk.activity_result.success.md)

Success

___

### encode

▸ `Static`**encode**(`message`: [*ISuccess*](../interfaces/proto.coresdk.activity_result.isuccess.md), `writer?`: *Writer*): *Writer*

Encodes the specified Success message. Does not implicitly [verify](proto.coresdk.activity_result.success.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ISuccess*](../interfaces/proto.coresdk.activity_result.isuccess.md) | Success message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ISuccess*](../interfaces/proto.coresdk.activity_result.isuccess.md), `writer?`: *Writer*): *Writer*

Encodes the specified Success message, length delimited. Does not implicitly [verify](proto.coresdk.activity_result.success.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ISuccess*](../interfaces/proto.coresdk.activity_result.isuccess.md) | Success message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*Success*](proto.coresdk.activity_result.success.md)

Creates a Success message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*Success*](proto.coresdk.activity_result.success.md)

Success

___

### toObject

▸ `Static`**toObject**(`message`: [*Success*](proto.coresdk.activity_result.success.md), `options?`: IConversionOptions): *object*

Creates a plain object from a Success message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*Success*](proto.coresdk.activity_result.success.md) | Success   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a Success message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
