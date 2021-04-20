# Class: EnumValueOptions

[google](../modules/proto.google.md).[protobuf](../modules/proto.google.protobuf.md).EnumValueOptions

Represents an EnumValueOptions.

## Implements

* [*IEnumValueOptions*](../interfaces/proto.google.protobuf.ienumvalueoptions.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.enumvalueoptions.md#constructor)

### Properties

- [deprecated](proto.google.protobuf.enumvalueoptions.md#deprecated)
- [uninterpretedOption](proto.google.protobuf.enumvalueoptions.md#uninterpretedoption)

### Methods

- [toJSON](proto.google.protobuf.enumvalueoptions.md#tojson)
- [create](proto.google.protobuf.enumvalueoptions.md#create)
- [decode](proto.google.protobuf.enumvalueoptions.md#decode)
- [decodeDelimited](proto.google.protobuf.enumvalueoptions.md#decodedelimited)
- [encode](proto.google.protobuf.enumvalueoptions.md#encode)
- [encodeDelimited](proto.google.protobuf.enumvalueoptions.md#encodedelimited)
- [fromObject](proto.google.protobuf.enumvalueoptions.md#fromobject)
- [toObject](proto.google.protobuf.enumvalueoptions.md#toobject)
- [verify](proto.google.protobuf.enumvalueoptions.md#verify)

## Constructors

### constructor

\+ **new EnumValueOptions**(`properties?`: [*IEnumValueOptions*](../interfaces/proto.google.protobuf.ienumvalueoptions.md)): [*EnumValueOptions*](proto.google.protobuf.enumvalueoptions.md)

Constructs a new EnumValueOptions.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IEnumValueOptions*](../interfaces/proto.google.protobuf.ienumvalueoptions.md) |

**Returns:** [*EnumValueOptions*](proto.google.protobuf.enumvalueoptions.md)

## Properties

### deprecated

• **deprecated**: *boolean*

EnumValueOptions deprecated.

Implementation of: [IEnumValueOptions](../interfaces/proto.google.protobuf.ienumvalueoptions.md).[deprecated](../interfaces/proto.google.protobuf.ienumvalueoptions.md#deprecated)

___

### uninterpretedOption

• **uninterpretedOption**: [*IUninterpretedOption*](../interfaces/proto.google.protobuf.iuninterpretedoption.md)[]

EnumValueOptions uninterpretedOption.

Implementation of: [IEnumValueOptions](../interfaces/proto.google.protobuf.ienumvalueoptions.md).[uninterpretedOption](../interfaces/proto.google.protobuf.ienumvalueoptions.md#uninterpretedoption)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this EnumValueOptions to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IEnumValueOptions*](../interfaces/proto.google.protobuf.ienumvalueoptions.md)): [*EnumValueOptions*](proto.google.protobuf.enumvalueoptions.md)

Creates a new EnumValueOptions instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IEnumValueOptions*](../interfaces/proto.google.protobuf.ienumvalueoptions.md) |

**Returns:** [*EnumValueOptions*](proto.google.protobuf.enumvalueoptions.md)

EnumValueOptions instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*EnumValueOptions*](proto.google.protobuf.enumvalueoptions.md)

Decodes an EnumValueOptions message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*EnumValueOptions*](proto.google.protobuf.enumvalueoptions.md)

EnumValueOptions

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*EnumValueOptions*](proto.google.protobuf.enumvalueoptions.md)

Decodes an EnumValueOptions message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*EnumValueOptions*](proto.google.protobuf.enumvalueoptions.md)

EnumValueOptions

___

### encode

▸ `Static`**encode**(`message`: [*IEnumValueOptions*](../interfaces/proto.google.protobuf.ienumvalueoptions.md), `writer?`: *Writer*): *Writer*

Encodes the specified EnumValueOptions message. Does not implicitly [verify](proto.google.protobuf.enumvalueoptions.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IEnumValueOptions*](../interfaces/proto.google.protobuf.ienumvalueoptions.md) | EnumValueOptions message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IEnumValueOptions*](../interfaces/proto.google.protobuf.ienumvalueoptions.md), `writer?`: *Writer*): *Writer*

Encodes the specified EnumValueOptions message, length delimited. Does not implicitly [verify](proto.google.protobuf.enumvalueoptions.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IEnumValueOptions*](../interfaces/proto.google.protobuf.ienumvalueoptions.md) | EnumValueOptions message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*EnumValueOptions*](proto.google.protobuf.enumvalueoptions.md)

Creates an EnumValueOptions message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*EnumValueOptions*](proto.google.protobuf.enumvalueoptions.md)

EnumValueOptions

___

### toObject

▸ `Static`**toObject**(`message`: [*EnumValueOptions*](proto.google.protobuf.enumvalueoptions.md), `options?`: IConversionOptions): *object*

Creates a plain object from an EnumValueOptions message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*EnumValueOptions*](proto.google.protobuf.enumvalueoptions.md) | EnumValueOptions   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an EnumValueOptions message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
