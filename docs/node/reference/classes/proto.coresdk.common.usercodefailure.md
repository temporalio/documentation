# Class: UserCodeFailure

[coresdk](../modules/proto.coresdk.md).[common](../modules/proto.coresdk.common.md).UserCodeFailure

Represents a UserCodeFailure.

## Implements

* [*IUserCodeFailure*](../interfaces/proto.coresdk.common.iusercodefailure.md)

## Table of contents

### Constructors

- [constructor](proto.coresdk.common.usercodefailure.md#constructor)

### Properties

- [cause](proto.coresdk.common.usercodefailure.md#cause)
- [message](proto.coresdk.common.usercodefailure.md#message)
- [nonRetryable](proto.coresdk.common.usercodefailure.md#nonretryable)
- [source](proto.coresdk.common.usercodefailure.md#source)
- [stackTrace](proto.coresdk.common.usercodefailure.md#stacktrace)
- [type](proto.coresdk.common.usercodefailure.md#type)

### Methods

- [toJSON](proto.coresdk.common.usercodefailure.md#tojson)
- [create](proto.coresdk.common.usercodefailure.md#create)
- [decode](proto.coresdk.common.usercodefailure.md#decode)
- [decodeDelimited](proto.coresdk.common.usercodefailure.md#decodedelimited)
- [encode](proto.coresdk.common.usercodefailure.md#encode)
- [encodeDelimited](proto.coresdk.common.usercodefailure.md#encodedelimited)
- [fromObject](proto.coresdk.common.usercodefailure.md#fromobject)
- [toObject](proto.coresdk.common.usercodefailure.md#toobject)
- [verify](proto.coresdk.common.usercodefailure.md#verify)

## Constructors

### constructor

\+ **new UserCodeFailure**(`properties?`: [*IUserCodeFailure*](../interfaces/proto.coresdk.common.iusercodefailure.md)): [*UserCodeFailure*](proto.coresdk.common.usercodefailure.md)

Constructs a new UserCodeFailure.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IUserCodeFailure*](../interfaces/proto.coresdk.common.iusercodefailure.md) |

**Returns:** [*UserCodeFailure*](proto.coresdk.common.usercodefailure.md)

## Properties

### cause

• `Optional` **cause**: *null* \| [*IUserCodeFailure*](../interfaces/proto.coresdk.common.iusercodefailure.md)

UserCodeFailure cause.

Implementation of: [IUserCodeFailure](../interfaces/proto.coresdk.common.iusercodefailure.md).[cause](../interfaces/proto.coresdk.common.iusercodefailure.md#cause)

___

### message

• **message**: *string*

UserCodeFailure message.

Implementation of: [IUserCodeFailure](../interfaces/proto.coresdk.common.iusercodefailure.md).[message](../interfaces/proto.coresdk.common.iusercodefailure.md#message)

___

### nonRetryable

• **nonRetryable**: *boolean*

UserCodeFailure nonRetryable.

Implementation of: [IUserCodeFailure](../interfaces/proto.coresdk.common.iusercodefailure.md).[nonRetryable](../interfaces/proto.coresdk.common.iusercodefailure.md#nonretryable)

___

### source

• **source**: *string*

UserCodeFailure source.

Implementation of: [IUserCodeFailure](../interfaces/proto.coresdk.common.iusercodefailure.md).[source](../interfaces/proto.coresdk.common.iusercodefailure.md#source)

___

### stackTrace

• **stackTrace**: *string*

UserCodeFailure stackTrace.

Implementation of: [IUserCodeFailure](../interfaces/proto.coresdk.common.iusercodefailure.md).[stackTrace](../interfaces/proto.coresdk.common.iusercodefailure.md#stacktrace)

___

### type

• **type**: *string*

UserCodeFailure type.

Implementation of: [IUserCodeFailure](../interfaces/proto.coresdk.common.iusercodefailure.md).[type](../interfaces/proto.coresdk.common.iusercodefailure.md#type)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this UserCodeFailure to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IUserCodeFailure*](../interfaces/proto.coresdk.common.iusercodefailure.md)): [*UserCodeFailure*](proto.coresdk.common.usercodefailure.md)

Creates a new UserCodeFailure instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IUserCodeFailure*](../interfaces/proto.coresdk.common.iusercodefailure.md) |

**Returns:** [*UserCodeFailure*](proto.coresdk.common.usercodefailure.md)

UserCodeFailure instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*UserCodeFailure*](proto.coresdk.common.usercodefailure.md)

Decodes a UserCodeFailure message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*UserCodeFailure*](proto.coresdk.common.usercodefailure.md)

UserCodeFailure

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*UserCodeFailure*](proto.coresdk.common.usercodefailure.md)

Decodes a UserCodeFailure message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*UserCodeFailure*](proto.coresdk.common.usercodefailure.md)

UserCodeFailure

___

### encode

▸ `Static`**encode**(`message`: [*IUserCodeFailure*](../interfaces/proto.coresdk.common.iusercodefailure.md), `writer?`: *Writer*): *Writer*

Encodes the specified UserCodeFailure message. Does not implicitly [verify](proto.coresdk.common.usercodefailure.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IUserCodeFailure*](../interfaces/proto.coresdk.common.iusercodefailure.md) | UserCodeFailure message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IUserCodeFailure*](../interfaces/proto.coresdk.common.iusercodefailure.md), `writer?`: *Writer*): *Writer*

Encodes the specified UserCodeFailure message, length delimited. Does not implicitly [verify](proto.coresdk.common.usercodefailure.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IUserCodeFailure*](../interfaces/proto.coresdk.common.iusercodefailure.md) | UserCodeFailure message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*UserCodeFailure*](proto.coresdk.common.usercodefailure.md)

Creates a UserCodeFailure message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*UserCodeFailure*](proto.coresdk.common.usercodefailure.md)

UserCodeFailure

___

### toObject

▸ `Static`**toObject**(`message`: [*UserCodeFailure*](proto.coresdk.common.usercodefailure.md), `options?`: IConversionOptions): *object*

Creates a plain object from a UserCodeFailure message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*UserCodeFailure*](proto.coresdk.common.usercodefailure.md) | UserCodeFailure   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a UserCodeFailure message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
