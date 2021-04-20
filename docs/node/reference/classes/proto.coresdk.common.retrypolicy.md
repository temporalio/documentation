# Class: RetryPolicy

[coresdk](../modules/proto.coresdk.md).[common](../modules/proto.coresdk.common.md).RetryPolicy

Represents a RetryPolicy.

## Implements

* [*IRetryPolicy*](../interfaces/proto.coresdk.common.iretrypolicy.md)

## Table of contents

### Constructors

- [constructor](proto.coresdk.common.retrypolicy.md#constructor)

### Properties

- [backoffCoefficient](proto.coresdk.common.retrypolicy.md#backoffcoefficient)
- [initialInterval](proto.coresdk.common.retrypolicy.md#initialinterval)
- [maximumAttempts](proto.coresdk.common.retrypolicy.md#maximumattempts)
- [maximumInterval](proto.coresdk.common.retrypolicy.md#maximuminterval)
- [nonRetryableErrorTypes](proto.coresdk.common.retrypolicy.md#nonretryableerrortypes)

### Methods

- [toJSON](proto.coresdk.common.retrypolicy.md#tojson)
- [create](proto.coresdk.common.retrypolicy.md#create)
- [decode](proto.coresdk.common.retrypolicy.md#decode)
- [decodeDelimited](proto.coresdk.common.retrypolicy.md#decodedelimited)
- [encode](proto.coresdk.common.retrypolicy.md#encode)
- [encodeDelimited](proto.coresdk.common.retrypolicy.md#encodedelimited)
- [fromObject](proto.coresdk.common.retrypolicy.md#fromobject)
- [toObject](proto.coresdk.common.retrypolicy.md#toobject)
- [verify](proto.coresdk.common.retrypolicy.md#verify)

## Constructors

### constructor

\+ **new RetryPolicy**(`properties?`: [*IRetryPolicy*](../interfaces/proto.coresdk.common.iretrypolicy.md)): [*RetryPolicy*](proto.coresdk.common.retrypolicy.md)

Constructs a new RetryPolicy.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRetryPolicy*](../interfaces/proto.coresdk.common.iretrypolicy.md) |

**Returns:** [*RetryPolicy*](proto.coresdk.common.retrypolicy.md)

## Properties

### backoffCoefficient

• **backoffCoefficient**: *number*

RetryPolicy backoffCoefficient.

Implementation of: [IRetryPolicy](../interfaces/proto.coresdk.common.iretrypolicy.md).[backoffCoefficient](../interfaces/proto.coresdk.common.iretrypolicy.md#backoffcoefficient)

___

### initialInterval

• `Optional` **initialInterval**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

RetryPolicy initialInterval.

Implementation of: [IRetryPolicy](../interfaces/proto.coresdk.common.iretrypolicy.md).[initialInterval](../interfaces/proto.coresdk.common.iretrypolicy.md#initialinterval)

___

### maximumAttempts

• **maximumAttempts**: *number*

RetryPolicy maximumAttempts.

Implementation of: [IRetryPolicy](../interfaces/proto.coresdk.common.iretrypolicy.md).[maximumAttempts](../interfaces/proto.coresdk.common.iretrypolicy.md#maximumattempts)

___

### maximumInterval

• `Optional` **maximumInterval**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

RetryPolicy maximumInterval.

Implementation of: [IRetryPolicy](../interfaces/proto.coresdk.common.iretrypolicy.md).[maximumInterval](../interfaces/proto.coresdk.common.iretrypolicy.md#maximuminterval)

___

### nonRetryableErrorTypes

• **nonRetryableErrorTypes**: *string*[]

RetryPolicy nonRetryableErrorTypes.

Implementation of: [IRetryPolicy](../interfaces/proto.coresdk.common.iretrypolicy.md).[nonRetryableErrorTypes](../interfaces/proto.coresdk.common.iretrypolicy.md#nonretryableerrortypes)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this RetryPolicy to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IRetryPolicy*](../interfaces/proto.coresdk.common.iretrypolicy.md)): [*RetryPolicy*](proto.coresdk.common.retrypolicy.md)

Creates a new RetryPolicy instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRetryPolicy*](../interfaces/proto.coresdk.common.iretrypolicy.md) |

**Returns:** [*RetryPolicy*](proto.coresdk.common.retrypolicy.md)

RetryPolicy instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*RetryPolicy*](proto.coresdk.common.retrypolicy.md)

Decodes a RetryPolicy message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*RetryPolicy*](proto.coresdk.common.retrypolicy.md)

RetryPolicy

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*RetryPolicy*](proto.coresdk.common.retrypolicy.md)

Decodes a RetryPolicy message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*RetryPolicy*](proto.coresdk.common.retrypolicy.md)

RetryPolicy

___

### encode

▸ `Static`**encode**(`message`: [*IRetryPolicy*](../interfaces/proto.coresdk.common.iretrypolicy.md), `writer?`: *Writer*): *Writer*

Encodes the specified RetryPolicy message. Does not implicitly [verify](proto.coresdk.common.retrypolicy.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRetryPolicy*](../interfaces/proto.coresdk.common.iretrypolicy.md) | RetryPolicy message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IRetryPolicy*](../interfaces/proto.coresdk.common.iretrypolicy.md), `writer?`: *Writer*): *Writer*

Encodes the specified RetryPolicy message, length delimited. Does not implicitly [verify](proto.coresdk.common.retrypolicy.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRetryPolicy*](../interfaces/proto.coresdk.common.iretrypolicy.md) | RetryPolicy message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*RetryPolicy*](proto.coresdk.common.retrypolicy.md)

Creates a RetryPolicy message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*RetryPolicy*](proto.coresdk.common.retrypolicy.md)

RetryPolicy

___

### toObject

▸ `Static`**toObject**(`message`: [*RetryPolicy*](proto.coresdk.common.retrypolicy.md), `options?`: IConversionOptions): *object*

Creates a plain object from a RetryPolicy message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*RetryPolicy*](proto.coresdk.common.retrypolicy.md) | RetryPolicy   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a RetryPolicy message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
