# Class: Timestamp

[google](../modules/proto.google.md).[protobuf](../modules/proto.google.protobuf.md).Timestamp

Represents a Timestamp.

## Implements

* [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.timestamp.md#constructor)

### Properties

- [nanos](proto.google.protobuf.timestamp.md#nanos)
- [seconds](proto.google.protobuf.timestamp.md#seconds)

### Methods

- [toJSON](proto.google.protobuf.timestamp.md#tojson)
- [create](proto.google.protobuf.timestamp.md#create)
- [decode](proto.google.protobuf.timestamp.md#decode)
- [decodeDelimited](proto.google.protobuf.timestamp.md#decodedelimited)
- [encode](proto.google.protobuf.timestamp.md#encode)
- [encodeDelimited](proto.google.protobuf.timestamp.md#encodedelimited)
- [fromObject](proto.google.protobuf.timestamp.md#fromobject)
- [toObject](proto.google.protobuf.timestamp.md#toobject)
- [verify](proto.google.protobuf.timestamp.md#verify)

## Constructors

### constructor

\+ **new Timestamp**(`properties?`: [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md)): [*Timestamp*](proto.google.protobuf.timestamp.md)

Constructs a new Timestamp.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md) |

**Returns:** [*Timestamp*](proto.google.protobuf.timestamp.md)

## Properties

### nanos

• **nanos**: *number*

Timestamp nanos.

Implementation of: [ITimestamp](../interfaces/proto.google.protobuf.itimestamp.md).[nanos](../interfaces/proto.google.protobuf.itimestamp.md#nanos)

___

### seconds

• **seconds**: Long

Timestamp seconds.

Implementation of: [ITimestamp](../interfaces/proto.google.protobuf.itimestamp.md).[seconds](../interfaces/proto.google.protobuf.itimestamp.md#seconds)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this Timestamp to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md)): [*Timestamp*](proto.google.protobuf.timestamp.md)

Creates a new Timestamp instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md) |

**Returns:** [*Timestamp*](proto.google.protobuf.timestamp.md)

Timestamp instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*Timestamp*](proto.google.protobuf.timestamp.md)

Decodes a Timestamp message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*Timestamp*](proto.google.protobuf.timestamp.md)

Timestamp

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*Timestamp*](proto.google.protobuf.timestamp.md)

Decodes a Timestamp message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*Timestamp*](proto.google.protobuf.timestamp.md)

Timestamp

___

### encode

▸ `Static`**encode**(`message`: [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md), `writer?`: *Writer*): *Writer*

Encodes the specified Timestamp message. Does not implicitly [verify](proto.google.protobuf.timestamp.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md) | Timestamp message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md), `writer?`: *Writer*): *Writer*

Encodes the specified Timestamp message, length delimited. Does not implicitly [verify](proto.google.protobuf.timestamp.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md) | Timestamp message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*Timestamp*](proto.google.protobuf.timestamp.md)

Creates a Timestamp message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*Timestamp*](proto.google.protobuf.timestamp.md)

Timestamp

___

### toObject

▸ `Static`**toObject**(`message`: [*Timestamp*](proto.google.protobuf.timestamp.md), `options?`: IConversionOptions): *object*

Creates a plain object from a Timestamp message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*Timestamp*](proto.google.protobuf.timestamp.md) | Timestamp   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a Timestamp message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
