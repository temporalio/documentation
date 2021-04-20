# Class: Cancel

[coresdk](../modules/proto.coresdk.md).[activity_task](../modules/proto.coresdk.activity_task.md).Cancel

Attempt to cancel a running activity

## Implements

* [*ICancel*](../interfaces/proto.coresdk.activity_task.icancel.md)

## Table of contents

### Constructors

- [constructor](proto.coresdk.activity_task.cancel.md#constructor)

### Methods

- [toJSON](proto.coresdk.activity_task.cancel.md#tojson)
- [create](proto.coresdk.activity_task.cancel.md#create)
- [decode](proto.coresdk.activity_task.cancel.md#decode)
- [decodeDelimited](proto.coresdk.activity_task.cancel.md#decodedelimited)
- [encode](proto.coresdk.activity_task.cancel.md#encode)
- [encodeDelimited](proto.coresdk.activity_task.cancel.md#encodedelimited)
- [fromObject](proto.coresdk.activity_task.cancel.md#fromobject)
- [toObject](proto.coresdk.activity_task.cancel.md#toobject)
- [verify](proto.coresdk.activity_task.cancel.md#verify)

## Constructors

### constructor

\+ **new Cancel**(`properties?`: [*ICancel*](../interfaces/proto.coresdk.activity_task.icancel.md)): [*Cancel*](proto.coresdk.activity_task.cancel.md)

Constructs a new Cancel.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ICancel*](../interfaces/proto.coresdk.activity_task.icancel.md) |

**Returns:** [*Cancel*](proto.coresdk.activity_task.cancel.md)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this Cancel to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ICancel*](../interfaces/proto.coresdk.activity_task.icancel.md)): [*Cancel*](proto.coresdk.activity_task.cancel.md)

Creates a new Cancel instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ICancel*](../interfaces/proto.coresdk.activity_task.icancel.md) |

**Returns:** [*Cancel*](proto.coresdk.activity_task.cancel.md)

Cancel instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*Cancel*](proto.coresdk.activity_task.cancel.md)

Decodes a Cancel message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*Cancel*](proto.coresdk.activity_task.cancel.md)

Cancel

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*Cancel*](proto.coresdk.activity_task.cancel.md)

Decodes a Cancel message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*Cancel*](proto.coresdk.activity_task.cancel.md)

Cancel

___

### encode

▸ `Static`**encode**(`message`: [*ICancel*](../interfaces/proto.coresdk.activity_task.icancel.md), `writer?`: *Writer*): *Writer*

Encodes the specified Cancel message. Does not implicitly [verify](proto.coresdk.activity_task.cancel.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ICancel*](../interfaces/proto.coresdk.activity_task.icancel.md) | Cancel message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ICancel*](../interfaces/proto.coresdk.activity_task.icancel.md), `writer?`: *Writer*): *Writer*

Encodes the specified Cancel message, length delimited. Does not implicitly [verify](proto.coresdk.activity_task.cancel.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ICancel*](../interfaces/proto.coresdk.activity_task.icancel.md) | Cancel message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*Cancel*](proto.coresdk.activity_task.cancel.md)

Creates a Cancel message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*Cancel*](proto.coresdk.activity_task.cancel.md)

Cancel

___

### toObject

▸ `Static`**toObject**(`message`: [*Cancel*](proto.coresdk.activity_task.cancel.md), `options?`: IConversionOptions): *object*

Creates a plain object from a Cancel message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*Cancel*](proto.coresdk.activity_task.cancel.md) | Cancel   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a Cancel message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
