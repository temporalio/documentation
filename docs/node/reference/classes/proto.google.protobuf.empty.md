# Class: Empty

[google](../modules/proto.google.md).[protobuf](../modules/proto.google.protobuf.md).Empty

Represents an Empty.

## Implements

* [*IEmpty*](../interfaces/proto.google.protobuf.iempty.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.empty.md#constructor)

### Methods

- [toJSON](proto.google.protobuf.empty.md#tojson)
- [create](proto.google.protobuf.empty.md#create)
- [decode](proto.google.protobuf.empty.md#decode)
- [decodeDelimited](proto.google.protobuf.empty.md#decodedelimited)
- [encode](proto.google.protobuf.empty.md#encode)
- [encodeDelimited](proto.google.protobuf.empty.md#encodedelimited)
- [fromObject](proto.google.protobuf.empty.md#fromobject)
- [toObject](proto.google.protobuf.empty.md#toobject)
- [verify](proto.google.protobuf.empty.md#verify)

## Constructors

### constructor

\+ **new Empty**(`properties?`: [*IEmpty*](../interfaces/proto.google.protobuf.iempty.md)): [*Empty*](proto.google.protobuf.empty.md)

Constructs a new Empty.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IEmpty*](../interfaces/proto.google.protobuf.iempty.md) |

**Returns:** [*Empty*](proto.google.protobuf.empty.md)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this Empty to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IEmpty*](../interfaces/proto.google.protobuf.iempty.md)): [*Empty*](proto.google.protobuf.empty.md)

Creates a new Empty instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IEmpty*](../interfaces/proto.google.protobuf.iempty.md) |

**Returns:** [*Empty*](proto.google.protobuf.empty.md)

Empty instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*Empty*](proto.google.protobuf.empty.md)

Decodes an Empty message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*Empty*](proto.google.protobuf.empty.md)

Empty

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*Empty*](proto.google.protobuf.empty.md)

Decodes an Empty message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*Empty*](proto.google.protobuf.empty.md)

Empty

___

### encode

▸ `Static`**encode**(`message`: [*IEmpty*](../interfaces/proto.google.protobuf.iempty.md), `writer?`: *Writer*): *Writer*

Encodes the specified Empty message. Does not implicitly [verify](proto.google.protobuf.empty.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IEmpty*](../interfaces/proto.google.protobuf.iempty.md) | Empty message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IEmpty*](../interfaces/proto.google.protobuf.iempty.md), `writer?`: *Writer*): *Writer*

Encodes the specified Empty message, length delimited. Does not implicitly [verify](proto.google.protobuf.empty.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IEmpty*](../interfaces/proto.google.protobuf.iempty.md) | Empty message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*Empty*](proto.google.protobuf.empty.md)

Creates an Empty message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*Empty*](proto.google.protobuf.empty.md)

Empty

___

### toObject

▸ `Static`**toObject**(`message`: [*Empty*](proto.google.protobuf.empty.md), `options?`: IConversionOptions): *object*

Creates a plain object from an Empty message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*Empty*](proto.google.protobuf.empty.md) | Empty   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an Empty message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
