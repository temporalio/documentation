# Class: GeneratedCodeInfo

[google](../modules/proto.google.md).[protobuf](../modules/proto.google.protobuf.md).GeneratedCodeInfo

Represents a GeneratedCodeInfo.

## Implements

* [*IGeneratedCodeInfo*](../interfaces/proto.google.protobuf.igeneratedcodeinfo.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.generatedcodeinfo-1.md#constructor)

### Properties

- [annotation](proto.google.protobuf.generatedcodeinfo-1.md#annotation)

### Methods

- [toJSON](proto.google.protobuf.generatedcodeinfo-1.md#tojson)
- [create](proto.google.protobuf.generatedcodeinfo-1.md#create)
- [decode](proto.google.protobuf.generatedcodeinfo-1.md#decode)
- [decodeDelimited](proto.google.protobuf.generatedcodeinfo-1.md#decodedelimited)
- [encode](proto.google.protobuf.generatedcodeinfo-1.md#encode)
- [encodeDelimited](proto.google.protobuf.generatedcodeinfo-1.md#encodedelimited)
- [fromObject](proto.google.protobuf.generatedcodeinfo-1.md#fromobject)
- [toObject](proto.google.protobuf.generatedcodeinfo-1.md#toobject)
- [verify](proto.google.protobuf.generatedcodeinfo-1.md#verify)

## Constructors

### constructor

\+ **new GeneratedCodeInfo**(`properties?`: [*IGeneratedCodeInfo*](../interfaces/proto.google.protobuf.igeneratedcodeinfo.md)): [*GeneratedCodeInfo*](proto.google.protobuf.generatedcodeinfo-1.md)

Constructs a new GeneratedCodeInfo.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IGeneratedCodeInfo*](../interfaces/proto.google.protobuf.igeneratedcodeinfo.md) |

**Returns:** [*GeneratedCodeInfo*](proto.google.protobuf.generatedcodeinfo-1.md)

## Properties

### annotation

• **annotation**: [*IAnnotation*](../interfaces/proto.google.protobuf.generatedcodeinfo.iannotation.md)[]

GeneratedCodeInfo annotation.

Implementation of: [IGeneratedCodeInfo](../interfaces/proto.google.protobuf.igeneratedcodeinfo.md).[annotation](../interfaces/proto.google.protobuf.igeneratedcodeinfo.md#annotation)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this GeneratedCodeInfo to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IGeneratedCodeInfo*](../interfaces/proto.google.protobuf.igeneratedcodeinfo.md)): [*GeneratedCodeInfo*](proto.google.protobuf.generatedcodeinfo-1.md)

Creates a new GeneratedCodeInfo instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IGeneratedCodeInfo*](../interfaces/proto.google.protobuf.igeneratedcodeinfo.md) |

**Returns:** [*GeneratedCodeInfo*](proto.google.protobuf.generatedcodeinfo-1.md)

GeneratedCodeInfo instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*GeneratedCodeInfo*](proto.google.protobuf.generatedcodeinfo-1.md)

Decodes a GeneratedCodeInfo message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*GeneratedCodeInfo*](proto.google.protobuf.generatedcodeinfo-1.md)

GeneratedCodeInfo

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*GeneratedCodeInfo*](proto.google.protobuf.generatedcodeinfo-1.md)

Decodes a GeneratedCodeInfo message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*GeneratedCodeInfo*](proto.google.protobuf.generatedcodeinfo-1.md)

GeneratedCodeInfo

___

### encode

▸ `Static`**encode**(`message`: [*IGeneratedCodeInfo*](../interfaces/proto.google.protobuf.igeneratedcodeinfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified GeneratedCodeInfo message. Does not implicitly [verify](proto.google.protobuf.generatedcodeinfo-1.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IGeneratedCodeInfo*](../interfaces/proto.google.protobuf.igeneratedcodeinfo.md) | GeneratedCodeInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IGeneratedCodeInfo*](../interfaces/proto.google.protobuf.igeneratedcodeinfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified GeneratedCodeInfo message, length delimited. Does not implicitly [verify](proto.google.protobuf.generatedcodeinfo-1.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IGeneratedCodeInfo*](../interfaces/proto.google.protobuf.igeneratedcodeinfo.md) | GeneratedCodeInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*GeneratedCodeInfo*](proto.google.protobuf.generatedcodeinfo-1.md)

Creates a GeneratedCodeInfo message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*GeneratedCodeInfo*](proto.google.protobuf.generatedcodeinfo-1.md)

GeneratedCodeInfo

___

### toObject

▸ `Static`**toObject**(`message`: [*GeneratedCodeInfo*](proto.google.protobuf.generatedcodeinfo-1.md), `options?`: IConversionOptions): *object*

Creates a plain object from a GeneratedCodeInfo message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*GeneratedCodeInfo*](proto.google.protobuf.generatedcodeinfo-1.md) | GeneratedCodeInfo   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a GeneratedCodeInfo message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
