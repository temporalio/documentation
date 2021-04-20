# Class: Annotation

[protobuf](../modules/proto.google.protobuf.md).[GeneratedCodeInfo](../modules/proto.google.protobuf.generatedcodeinfo.md).Annotation

Represents an Annotation.

## Implements

* [*IAnnotation*](../interfaces/proto.google.protobuf.generatedcodeinfo.iannotation.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.generatedcodeinfo.annotation.md#constructor)

### Properties

- [begin](proto.google.protobuf.generatedcodeinfo.annotation.md#begin)
- [end](proto.google.protobuf.generatedcodeinfo.annotation.md#end)
- [path](proto.google.protobuf.generatedcodeinfo.annotation.md#path)
- [sourceFile](proto.google.protobuf.generatedcodeinfo.annotation.md#sourcefile)

### Methods

- [toJSON](proto.google.protobuf.generatedcodeinfo.annotation.md#tojson)
- [create](proto.google.protobuf.generatedcodeinfo.annotation.md#create)
- [decode](proto.google.protobuf.generatedcodeinfo.annotation.md#decode)
- [decodeDelimited](proto.google.protobuf.generatedcodeinfo.annotation.md#decodedelimited)
- [encode](proto.google.protobuf.generatedcodeinfo.annotation.md#encode)
- [encodeDelimited](proto.google.protobuf.generatedcodeinfo.annotation.md#encodedelimited)
- [fromObject](proto.google.protobuf.generatedcodeinfo.annotation.md#fromobject)
- [toObject](proto.google.protobuf.generatedcodeinfo.annotation.md#toobject)
- [verify](proto.google.protobuf.generatedcodeinfo.annotation.md#verify)

## Constructors

### constructor

\+ **new Annotation**(`properties?`: [*IAnnotation*](../interfaces/proto.google.protobuf.generatedcodeinfo.iannotation.md)): [*Annotation*](proto.google.protobuf.generatedcodeinfo.annotation.md)

Constructs a new Annotation.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IAnnotation*](../interfaces/proto.google.protobuf.generatedcodeinfo.iannotation.md) |

**Returns:** [*Annotation*](proto.google.protobuf.generatedcodeinfo.annotation.md)

## Properties

### begin

• **begin**: *number*

Annotation begin.

Implementation of: [IAnnotation](../interfaces/proto.google.protobuf.generatedcodeinfo.iannotation.md).[begin](../interfaces/proto.google.protobuf.generatedcodeinfo.iannotation.md#begin)

___

### end

• **end**: *number*

Annotation end.

Implementation of: [IAnnotation](../interfaces/proto.google.protobuf.generatedcodeinfo.iannotation.md).[end](../interfaces/proto.google.protobuf.generatedcodeinfo.iannotation.md#end)

___

### path

• **path**: *number*[]

Annotation path.

Implementation of: [IAnnotation](../interfaces/proto.google.protobuf.generatedcodeinfo.iannotation.md).[path](../interfaces/proto.google.protobuf.generatedcodeinfo.iannotation.md#path)

___

### sourceFile

• **sourceFile**: *string*

Annotation sourceFile.

Implementation of: [IAnnotation](../interfaces/proto.google.protobuf.generatedcodeinfo.iannotation.md).[sourceFile](../interfaces/proto.google.protobuf.generatedcodeinfo.iannotation.md#sourcefile)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this Annotation to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IAnnotation*](../interfaces/proto.google.protobuf.generatedcodeinfo.iannotation.md)): [*Annotation*](proto.google.protobuf.generatedcodeinfo.annotation.md)

Creates a new Annotation instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IAnnotation*](../interfaces/proto.google.protobuf.generatedcodeinfo.iannotation.md) |

**Returns:** [*Annotation*](proto.google.protobuf.generatedcodeinfo.annotation.md)

Annotation instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*Annotation*](proto.google.protobuf.generatedcodeinfo.annotation.md)

Decodes an Annotation message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*Annotation*](proto.google.protobuf.generatedcodeinfo.annotation.md)

Annotation

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*Annotation*](proto.google.protobuf.generatedcodeinfo.annotation.md)

Decodes an Annotation message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*Annotation*](proto.google.protobuf.generatedcodeinfo.annotation.md)

Annotation

___

### encode

▸ `Static`**encode**(`message`: [*IAnnotation*](../interfaces/proto.google.protobuf.generatedcodeinfo.iannotation.md), `writer?`: *Writer*): *Writer*

Encodes the specified Annotation message. Does not implicitly [verify](proto.google.protobuf.generatedcodeinfo.annotation.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IAnnotation*](../interfaces/proto.google.protobuf.generatedcodeinfo.iannotation.md) | Annotation message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IAnnotation*](../interfaces/proto.google.protobuf.generatedcodeinfo.iannotation.md), `writer?`: *Writer*): *Writer*

Encodes the specified Annotation message, length delimited. Does not implicitly [verify](proto.google.protobuf.generatedcodeinfo.annotation.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IAnnotation*](../interfaces/proto.google.protobuf.generatedcodeinfo.iannotation.md) | Annotation message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*Annotation*](proto.google.protobuf.generatedcodeinfo.annotation.md)

Creates an Annotation message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*Annotation*](proto.google.protobuf.generatedcodeinfo.annotation.md)

Annotation

___

### toObject

▸ `Static`**toObject**(`message`: [*Annotation*](proto.google.protobuf.generatedcodeinfo.annotation.md), `options?`: IConversionOptions): *object*

Creates a plain object from an Annotation message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*Annotation*](proto.google.protobuf.generatedcodeinfo.annotation.md) | Annotation   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an Annotation message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
