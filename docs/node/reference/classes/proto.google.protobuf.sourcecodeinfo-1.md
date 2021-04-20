# Class: SourceCodeInfo

[google](../modules/proto.google.md).[protobuf](../modules/proto.google.protobuf.md).SourceCodeInfo

Represents a SourceCodeInfo.

## Implements

* [*ISourceCodeInfo*](../interfaces/proto.google.protobuf.isourcecodeinfo.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.sourcecodeinfo-1.md#constructor)

### Properties

- [location](proto.google.protobuf.sourcecodeinfo-1.md#location)

### Methods

- [toJSON](proto.google.protobuf.sourcecodeinfo-1.md#tojson)
- [create](proto.google.protobuf.sourcecodeinfo-1.md#create)
- [decode](proto.google.protobuf.sourcecodeinfo-1.md#decode)
- [decodeDelimited](proto.google.protobuf.sourcecodeinfo-1.md#decodedelimited)
- [encode](proto.google.protobuf.sourcecodeinfo-1.md#encode)
- [encodeDelimited](proto.google.protobuf.sourcecodeinfo-1.md#encodedelimited)
- [fromObject](proto.google.protobuf.sourcecodeinfo-1.md#fromobject)
- [toObject](proto.google.protobuf.sourcecodeinfo-1.md#toobject)
- [verify](proto.google.protobuf.sourcecodeinfo-1.md#verify)

## Constructors

### constructor

\+ **new SourceCodeInfo**(`properties?`: [*ISourceCodeInfo*](../interfaces/proto.google.protobuf.isourcecodeinfo.md)): [*SourceCodeInfo*](proto.google.protobuf.sourcecodeinfo-1.md)

Constructs a new SourceCodeInfo.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ISourceCodeInfo*](../interfaces/proto.google.protobuf.isourcecodeinfo.md) |

**Returns:** [*SourceCodeInfo*](proto.google.protobuf.sourcecodeinfo-1.md)

## Properties

### location

• **location**: [*ILocation*](../interfaces/proto.google.protobuf.sourcecodeinfo.ilocation.md)[]

SourceCodeInfo location.

Implementation of: [ISourceCodeInfo](../interfaces/proto.google.protobuf.isourcecodeinfo.md).[location](../interfaces/proto.google.protobuf.isourcecodeinfo.md#location)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this SourceCodeInfo to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ISourceCodeInfo*](../interfaces/proto.google.protobuf.isourcecodeinfo.md)): [*SourceCodeInfo*](proto.google.protobuf.sourcecodeinfo-1.md)

Creates a new SourceCodeInfo instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ISourceCodeInfo*](../interfaces/proto.google.protobuf.isourcecodeinfo.md) |

**Returns:** [*SourceCodeInfo*](proto.google.protobuf.sourcecodeinfo-1.md)

SourceCodeInfo instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*SourceCodeInfo*](proto.google.protobuf.sourcecodeinfo-1.md)

Decodes a SourceCodeInfo message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*SourceCodeInfo*](proto.google.protobuf.sourcecodeinfo-1.md)

SourceCodeInfo

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*SourceCodeInfo*](proto.google.protobuf.sourcecodeinfo-1.md)

Decodes a SourceCodeInfo message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*SourceCodeInfo*](proto.google.protobuf.sourcecodeinfo-1.md)

SourceCodeInfo

___

### encode

▸ `Static`**encode**(`message`: [*ISourceCodeInfo*](../interfaces/proto.google.protobuf.isourcecodeinfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified SourceCodeInfo message. Does not implicitly [verify](proto.google.protobuf.sourcecodeinfo-1.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ISourceCodeInfo*](../interfaces/proto.google.protobuf.isourcecodeinfo.md) | SourceCodeInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ISourceCodeInfo*](../interfaces/proto.google.protobuf.isourcecodeinfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified SourceCodeInfo message, length delimited. Does not implicitly [verify](proto.google.protobuf.sourcecodeinfo-1.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ISourceCodeInfo*](../interfaces/proto.google.protobuf.isourcecodeinfo.md) | SourceCodeInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*SourceCodeInfo*](proto.google.protobuf.sourcecodeinfo-1.md)

Creates a SourceCodeInfo message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*SourceCodeInfo*](proto.google.protobuf.sourcecodeinfo-1.md)

SourceCodeInfo

___

### toObject

▸ `Static`**toObject**(`message`: [*SourceCodeInfo*](proto.google.protobuf.sourcecodeinfo-1.md), `options?`: IConversionOptions): *object*

Creates a plain object from a SourceCodeInfo message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*SourceCodeInfo*](proto.google.protobuf.sourcecodeinfo-1.md) | SourceCodeInfo   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a SourceCodeInfo message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
