# Class: Duration

[google](../modules/proto.google.md).[protobuf](../modules/proto.google.protobuf.md).Duration

Represents a Duration.

## Implements

* [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.duration.md#constructor)

### Properties

- [nanos](proto.google.protobuf.duration.md#nanos)
- [seconds](proto.google.protobuf.duration.md#seconds)

### Methods

- [toJSON](proto.google.protobuf.duration.md#tojson)
- [create](proto.google.protobuf.duration.md#create)
- [decode](proto.google.protobuf.duration.md#decode)
- [decodeDelimited](proto.google.protobuf.duration.md#decodedelimited)
- [encode](proto.google.protobuf.duration.md#encode)
- [encodeDelimited](proto.google.protobuf.duration.md#encodedelimited)
- [fromObject](proto.google.protobuf.duration.md#fromobject)
- [toObject](proto.google.protobuf.duration.md#toobject)
- [verify](proto.google.protobuf.duration.md#verify)

## Constructors

### constructor

\+ **new Duration**(`properties?`: [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)): [*Duration*](proto.google.protobuf.duration.md)

Constructs a new Duration.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IDuration*](../interfaces/proto.google.protobuf.iduration.md) |

**Returns:** [*Duration*](proto.google.protobuf.duration.md)

## Properties

### nanos

• **nanos**: *number*

Duration nanos.

Implementation of: [IDuration](../interfaces/proto.google.protobuf.iduration.md).[nanos](../interfaces/proto.google.protobuf.iduration.md#nanos)

___

### seconds

• **seconds**: Long

Duration seconds.

Implementation of: [IDuration](../interfaces/proto.google.protobuf.iduration.md).[seconds](../interfaces/proto.google.protobuf.iduration.md#seconds)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this Duration to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)): [*Duration*](proto.google.protobuf.duration.md)

Creates a new Duration instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IDuration*](../interfaces/proto.google.protobuf.iduration.md) |

**Returns:** [*Duration*](proto.google.protobuf.duration.md)

Duration instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*Duration*](proto.google.protobuf.duration.md)

Decodes a Duration message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*Duration*](proto.google.protobuf.duration.md)

Duration

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*Duration*](proto.google.protobuf.duration.md)

Decodes a Duration message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*Duration*](proto.google.protobuf.duration.md)

Duration

___

### encode

▸ `Static`**encode**(`message`: [*IDuration*](../interfaces/proto.google.protobuf.iduration.md), `writer?`: *Writer*): *Writer*

Encodes the specified Duration message. Does not implicitly [verify](proto.google.protobuf.duration.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IDuration*](../interfaces/proto.google.protobuf.iduration.md) | Duration message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IDuration*](../interfaces/proto.google.protobuf.iduration.md), `writer?`: *Writer*): *Writer*

Encodes the specified Duration message, length delimited. Does not implicitly [verify](proto.google.protobuf.duration.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IDuration*](../interfaces/proto.google.protobuf.iduration.md) | Duration message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*Duration*](proto.google.protobuf.duration.md)

Creates a Duration message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*Duration*](proto.google.protobuf.duration.md)

Duration

___

### toObject

▸ `Static`**toObject**(`message`: [*Duration*](proto.google.protobuf.duration.md), `options?`: IConversionOptions): *object*

Creates a plain object from a Duration message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*Duration*](proto.google.protobuf.duration.md) | Duration   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a Duration message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
