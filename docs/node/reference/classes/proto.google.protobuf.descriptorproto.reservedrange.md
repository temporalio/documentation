# Class: ReservedRange

[protobuf](../modules/proto.google.protobuf.md).[DescriptorProto](../modules/proto.google.protobuf.descriptorproto.md).ReservedRange

Represents a ReservedRange.

## Implements

* [*IReservedRange*](../interfaces/proto.google.protobuf.descriptorproto.ireservedrange.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.descriptorproto.reservedrange.md#constructor)

### Properties

- [end](proto.google.protobuf.descriptorproto.reservedrange.md#end)
- [start](proto.google.protobuf.descriptorproto.reservedrange.md#start)

### Methods

- [toJSON](proto.google.protobuf.descriptorproto.reservedrange.md#tojson)
- [create](proto.google.protobuf.descriptorproto.reservedrange.md#create)
- [decode](proto.google.protobuf.descriptorproto.reservedrange.md#decode)
- [decodeDelimited](proto.google.protobuf.descriptorproto.reservedrange.md#decodedelimited)
- [encode](proto.google.protobuf.descriptorproto.reservedrange.md#encode)
- [encodeDelimited](proto.google.protobuf.descriptorproto.reservedrange.md#encodedelimited)
- [fromObject](proto.google.protobuf.descriptorproto.reservedrange.md#fromobject)
- [toObject](proto.google.protobuf.descriptorproto.reservedrange.md#toobject)
- [verify](proto.google.protobuf.descriptorproto.reservedrange.md#verify)

## Constructors

### constructor

\+ **new ReservedRange**(`properties?`: [*IReservedRange*](../interfaces/proto.google.protobuf.descriptorproto.ireservedrange.md)): [*ReservedRange*](proto.google.protobuf.descriptorproto.reservedrange.md)

Constructs a new ReservedRange.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IReservedRange*](../interfaces/proto.google.protobuf.descriptorproto.ireservedrange.md) |

**Returns:** [*ReservedRange*](proto.google.protobuf.descriptorproto.reservedrange.md)

## Properties

### end

• **end**: *number*

ReservedRange end.

Implementation of: [IReservedRange](../interfaces/proto.google.protobuf.descriptorproto.ireservedrange.md).[end](../interfaces/proto.google.protobuf.descriptorproto.ireservedrange.md#end)

___

### start

• **start**: *number*

ReservedRange start.

Implementation of: [IReservedRange](../interfaces/proto.google.protobuf.descriptorproto.ireservedrange.md).[start](../interfaces/proto.google.protobuf.descriptorproto.ireservedrange.md#start)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ReservedRange to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IReservedRange*](../interfaces/proto.google.protobuf.descriptorproto.ireservedrange.md)): [*ReservedRange*](proto.google.protobuf.descriptorproto.reservedrange.md)

Creates a new ReservedRange instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IReservedRange*](../interfaces/proto.google.protobuf.descriptorproto.ireservedrange.md) |

**Returns:** [*ReservedRange*](proto.google.protobuf.descriptorproto.reservedrange.md)

ReservedRange instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ReservedRange*](proto.google.protobuf.descriptorproto.reservedrange.md)

Decodes a ReservedRange message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ReservedRange*](proto.google.protobuf.descriptorproto.reservedrange.md)

ReservedRange

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ReservedRange*](proto.google.protobuf.descriptorproto.reservedrange.md)

Decodes a ReservedRange message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ReservedRange*](proto.google.protobuf.descriptorproto.reservedrange.md)

ReservedRange

___

### encode

▸ `Static`**encode**(`message`: [*IReservedRange*](../interfaces/proto.google.protobuf.descriptorproto.ireservedrange.md), `writer?`: *Writer*): *Writer*

Encodes the specified ReservedRange message. Does not implicitly [verify](proto.google.protobuf.descriptorproto.reservedrange.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IReservedRange*](../interfaces/proto.google.protobuf.descriptorproto.ireservedrange.md) | ReservedRange message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IReservedRange*](../interfaces/proto.google.protobuf.descriptorproto.ireservedrange.md), `writer?`: *Writer*): *Writer*

Encodes the specified ReservedRange message, length delimited. Does not implicitly [verify](proto.google.protobuf.descriptorproto.reservedrange.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IReservedRange*](../interfaces/proto.google.protobuf.descriptorproto.ireservedrange.md) | ReservedRange message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ReservedRange*](proto.google.protobuf.descriptorproto.reservedrange.md)

Creates a ReservedRange message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ReservedRange*](proto.google.protobuf.descriptorproto.reservedrange.md)

ReservedRange

___

### toObject

▸ `Static`**toObject**(`message`: [*ReservedRange*](proto.google.protobuf.descriptorproto.reservedrange.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ReservedRange message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ReservedRange*](proto.google.protobuf.descriptorproto.reservedrange.md) | ReservedRange   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ReservedRange message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
