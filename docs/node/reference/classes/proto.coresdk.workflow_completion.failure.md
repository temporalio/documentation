# Class: Failure

[coresdk](../modules/proto.coresdk.md).[workflow_completion](../modules/proto.coresdk.workflow_completion.md).Failure

Failure to activate or execute a workflow

## Implements

* [*IFailure*](../interfaces/proto.coresdk.workflow_completion.ifailure.md)

## Table of contents

### Constructors

- [constructor](proto.coresdk.workflow_completion.failure.md#constructor)

### Properties

- [failure](proto.coresdk.workflow_completion.failure.md#failure)

### Methods

- [toJSON](proto.coresdk.workflow_completion.failure.md#tojson)
- [create](proto.coresdk.workflow_completion.failure.md#create)
- [decode](proto.coresdk.workflow_completion.failure.md#decode)
- [decodeDelimited](proto.coresdk.workflow_completion.failure.md#decodedelimited)
- [encode](proto.coresdk.workflow_completion.failure.md#encode)
- [encodeDelimited](proto.coresdk.workflow_completion.failure.md#encodedelimited)
- [fromObject](proto.coresdk.workflow_completion.failure.md#fromobject)
- [toObject](proto.coresdk.workflow_completion.failure.md#toobject)
- [verify](proto.coresdk.workflow_completion.failure.md#verify)

## Constructors

### constructor

\+ **new Failure**(`properties?`: [*IFailure*](../interfaces/proto.coresdk.workflow_completion.ifailure.md)): [*Failure*](proto.coresdk.workflow_completion.failure.md)

Constructs a new Failure.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IFailure*](../interfaces/proto.coresdk.workflow_completion.ifailure.md) |

**Returns:** [*Failure*](proto.coresdk.workflow_completion.failure.md)

## Properties

### failure

• `Optional` **failure**: *null* \| [*IUserCodeFailure*](../interfaces/proto.coresdk.common.iusercodefailure.md)

Failure failure.

Implementation of: [IFailure](../interfaces/proto.coresdk.workflow_completion.ifailure.md).[failure](../interfaces/proto.coresdk.workflow_completion.ifailure.md#failure)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this Failure to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IFailure*](../interfaces/proto.coresdk.workflow_completion.ifailure.md)): [*Failure*](proto.coresdk.workflow_completion.failure.md)

Creates a new Failure instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IFailure*](../interfaces/proto.coresdk.workflow_completion.ifailure.md) |

**Returns:** [*Failure*](proto.coresdk.workflow_completion.failure.md)

Failure instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*Failure*](proto.coresdk.workflow_completion.failure.md)

Decodes a Failure message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*Failure*](proto.coresdk.workflow_completion.failure.md)

Failure

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*Failure*](proto.coresdk.workflow_completion.failure.md)

Decodes a Failure message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*Failure*](proto.coresdk.workflow_completion.failure.md)

Failure

___

### encode

▸ `Static`**encode**(`message`: [*IFailure*](../interfaces/proto.coresdk.workflow_completion.ifailure.md), `writer?`: *Writer*): *Writer*

Encodes the specified Failure message. Does not implicitly [verify](proto.coresdk.workflow_completion.failure.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IFailure*](../interfaces/proto.coresdk.workflow_completion.ifailure.md) | Failure message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IFailure*](../interfaces/proto.coresdk.workflow_completion.ifailure.md), `writer?`: *Writer*): *Writer*

Encodes the specified Failure message, length delimited. Does not implicitly [verify](proto.coresdk.workflow_completion.failure.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IFailure*](../interfaces/proto.coresdk.workflow_completion.ifailure.md) | Failure message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*Failure*](proto.coresdk.workflow_completion.failure.md)

Creates a Failure message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*Failure*](proto.coresdk.workflow_completion.failure.md)

Failure

___

### toObject

▸ `Static`**toObject**(`message`: [*Failure*](proto.coresdk.workflow_completion.failure.md), `options?`: IConversionOptions): *object*

Creates a plain object from a Failure message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*Failure*](proto.coresdk.workflow_completion.failure.md) | Failure   |
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
