# Class: Location

[protobuf](../modules/proto.google.protobuf.md).[SourceCodeInfo](../modules/proto.google.protobuf.sourcecodeinfo.md).Location

Represents a Location.

## Implements

* [*ILocation*](../interfaces/proto.google.protobuf.sourcecodeinfo.ilocation.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.sourcecodeinfo.location.md#constructor)

### Properties

- [leadingComments](proto.google.protobuf.sourcecodeinfo.location.md#leadingcomments)
- [leadingDetachedComments](proto.google.protobuf.sourcecodeinfo.location.md#leadingdetachedcomments)
- [path](proto.google.protobuf.sourcecodeinfo.location.md#path)
- [span](proto.google.protobuf.sourcecodeinfo.location.md#span)
- [trailingComments](proto.google.protobuf.sourcecodeinfo.location.md#trailingcomments)

### Methods

- [toJSON](proto.google.protobuf.sourcecodeinfo.location.md#tojson)
- [create](proto.google.protobuf.sourcecodeinfo.location.md#create)
- [decode](proto.google.protobuf.sourcecodeinfo.location.md#decode)
- [decodeDelimited](proto.google.protobuf.sourcecodeinfo.location.md#decodedelimited)
- [encode](proto.google.protobuf.sourcecodeinfo.location.md#encode)
- [encodeDelimited](proto.google.protobuf.sourcecodeinfo.location.md#encodedelimited)
- [fromObject](proto.google.protobuf.sourcecodeinfo.location.md#fromobject)
- [toObject](proto.google.protobuf.sourcecodeinfo.location.md#toobject)
- [verify](proto.google.protobuf.sourcecodeinfo.location.md#verify)

## Constructors

### constructor

\+ **new Location**(`properties?`: [*ILocation*](../interfaces/proto.google.protobuf.sourcecodeinfo.ilocation.md)): [*Location*](proto.google.protobuf.sourcecodeinfo.location.md)

Constructs a new Location.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ILocation*](../interfaces/proto.google.protobuf.sourcecodeinfo.ilocation.md) |

**Returns:** [*Location*](proto.google.protobuf.sourcecodeinfo.location.md)

## Properties

### leadingComments

• **leadingComments**: *string*

Location leadingComments.

Implementation of: [ILocation](../interfaces/proto.google.protobuf.sourcecodeinfo.ilocation.md).[leadingComments](../interfaces/proto.google.protobuf.sourcecodeinfo.ilocation.md#leadingcomments)

___

### leadingDetachedComments

• **leadingDetachedComments**: *string*[]

Location leadingDetachedComments.

Implementation of: [ILocation](../interfaces/proto.google.protobuf.sourcecodeinfo.ilocation.md).[leadingDetachedComments](../interfaces/proto.google.protobuf.sourcecodeinfo.ilocation.md#leadingdetachedcomments)

___

### path

• **path**: *number*[]

Location path.

Implementation of: [ILocation](../interfaces/proto.google.protobuf.sourcecodeinfo.ilocation.md).[path](../interfaces/proto.google.protobuf.sourcecodeinfo.ilocation.md#path)

___

### span

• **span**: *number*[]

Location span.

Implementation of: [ILocation](../interfaces/proto.google.protobuf.sourcecodeinfo.ilocation.md).[span](../interfaces/proto.google.protobuf.sourcecodeinfo.ilocation.md#span)

___

### trailingComments

• **trailingComments**: *string*

Location trailingComments.

Implementation of: [ILocation](../interfaces/proto.google.protobuf.sourcecodeinfo.ilocation.md).[trailingComments](../interfaces/proto.google.protobuf.sourcecodeinfo.ilocation.md#trailingcomments)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this Location to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ILocation*](../interfaces/proto.google.protobuf.sourcecodeinfo.ilocation.md)): [*Location*](proto.google.protobuf.sourcecodeinfo.location.md)

Creates a new Location instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ILocation*](../interfaces/proto.google.protobuf.sourcecodeinfo.ilocation.md) |

**Returns:** [*Location*](proto.google.protobuf.sourcecodeinfo.location.md)

Location instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*Location*](proto.google.protobuf.sourcecodeinfo.location.md)

Decodes a Location message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*Location*](proto.google.protobuf.sourcecodeinfo.location.md)

Location

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*Location*](proto.google.protobuf.sourcecodeinfo.location.md)

Decodes a Location message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*Location*](proto.google.protobuf.sourcecodeinfo.location.md)

Location

___

### encode

▸ `Static`**encode**(`message`: [*ILocation*](../interfaces/proto.google.protobuf.sourcecodeinfo.ilocation.md), `writer?`: *Writer*): *Writer*

Encodes the specified Location message. Does not implicitly [verify](proto.google.protobuf.sourcecodeinfo.location.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ILocation*](../interfaces/proto.google.protobuf.sourcecodeinfo.ilocation.md) | Location message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ILocation*](../interfaces/proto.google.protobuf.sourcecodeinfo.ilocation.md), `writer?`: *Writer*): *Writer*

Encodes the specified Location message, length delimited. Does not implicitly [verify](proto.google.protobuf.sourcecodeinfo.location.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ILocation*](../interfaces/proto.google.protobuf.sourcecodeinfo.ilocation.md) | Location message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*Location*](proto.google.protobuf.sourcecodeinfo.location.md)

Creates a Location message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*Location*](proto.google.protobuf.sourcecodeinfo.location.md)

Location

___

### toObject

▸ `Static`**toObject**(`message`: [*Location*](proto.google.protobuf.sourcecodeinfo.location.md), `options?`: IConversionOptions): *object*

Creates a plain object from a Location message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*Location*](proto.google.protobuf.sourcecodeinfo.location.md) | Location   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a Location message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
