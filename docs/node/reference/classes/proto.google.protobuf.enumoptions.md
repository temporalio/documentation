# Class: EnumOptions

[google](../modules/proto.google.md).[protobuf](../modules/proto.google.protobuf.md).EnumOptions

Represents an EnumOptions.

## Implements

* [*IEnumOptions*](../interfaces/proto.google.protobuf.ienumoptions.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.enumoptions.md#constructor)

### Properties

- [allowAlias](proto.google.protobuf.enumoptions.md#allowalias)
- [deprecated](proto.google.protobuf.enumoptions.md#deprecated)
- [uninterpretedOption](proto.google.protobuf.enumoptions.md#uninterpretedoption)

### Methods

- [toJSON](proto.google.protobuf.enumoptions.md#tojson)
- [create](proto.google.protobuf.enumoptions.md#create)
- [decode](proto.google.protobuf.enumoptions.md#decode)
- [decodeDelimited](proto.google.protobuf.enumoptions.md#decodedelimited)
- [encode](proto.google.protobuf.enumoptions.md#encode)
- [encodeDelimited](proto.google.protobuf.enumoptions.md#encodedelimited)
- [fromObject](proto.google.protobuf.enumoptions.md#fromobject)
- [toObject](proto.google.protobuf.enumoptions.md#toobject)
- [verify](proto.google.protobuf.enumoptions.md#verify)

## Constructors

### constructor

\+ **new EnumOptions**(`properties?`: [*IEnumOptions*](../interfaces/proto.google.protobuf.ienumoptions.md)): [*EnumOptions*](proto.google.protobuf.enumoptions.md)

Constructs a new EnumOptions.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IEnumOptions*](../interfaces/proto.google.protobuf.ienumoptions.md) |

**Returns:** [*EnumOptions*](proto.google.protobuf.enumoptions.md)

## Properties

### allowAlias

• **allowAlias**: *boolean*

EnumOptions allowAlias.

Implementation of: [IEnumOptions](../interfaces/proto.google.protobuf.ienumoptions.md).[allowAlias](../interfaces/proto.google.protobuf.ienumoptions.md#allowalias)

___

### deprecated

• **deprecated**: *boolean*

EnumOptions deprecated.

Implementation of: [IEnumOptions](../interfaces/proto.google.protobuf.ienumoptions.md).[deprecated](../interfaces/proto.google.protobuf.ienumoptions.md#deprecated)

___

### uninterpretedOption

• **uninterpretedOption**: [*IUninterpretedOption*](../interfaces/proto.google.protobuf.iuninterpretedoption.md)[]

EnumOptions uninterpretedOption.

Implementation of: [IEnumOptions](../interfaces/proto.google.protobuf.ienumoptions.md).[uninterpretedOption](../interfaces/proto.google.protobuf.ienumoptions.md#uninterpretedoption)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this EnumOptions to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IEnumOptions*](../interfaces/proto.google.protobuf.ienumoptions.md)): [*EnumOptions*](proto.google.protobuf.enumoptions.md)

Creates a new EnumOptions instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IEnumOptions*](../interfaces/proto.google.protobuf.ienumoptions.md) |

**Returns:** [*EnumOptions*](proto.google.protobuf.enumoptions.md)

EnumOptions instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*EnumOptions*](proto.google.protobuf.enumoptions.md)

Decodes an EnumOptions message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*EnumOptions*](proto.google.protobuf.enumoptions.md)

EnumOptions

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*EnumOptions*](proto.google.protobuf.enumoptions.md)

Decodes an EnumOptions message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*EnumOptions*](proto.google.protobuf.enumoptions.md)

EnumOptions

___

### encode

▸ `Static`**encode**(`message`: [*IEnumOptions*](../interfaces/proto.google.protobuf.ienumoptions.md), `writer?`: *Writer*): *Writer*

Encodes the specified EnumOptions message. Does not implicitly [verify](proto.google.protobuf.enumoptions.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IEnumOptions*](../interfaces/proto.google.protobuf.ienumoptions.md) | EnumOptions message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IEnumOptions*](../interfaces/proto.google.protobuf.ienumoptions.md), `writer?`: *Writer*): *Writer*

Encodes the specified EnumOptions message, length delimited. Does not implicitly [verify](proto.google.protobuf.enumoptions.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IEnumOptions*](../interfaces/proto.google.protobuf.ienumoptions.md) | EnumOptions message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*EnumOptions*](proto.google.protobuf.enumoptions.md)

Creates an EnumOptions message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*EnumOptions*](proto.google.protobuf.enumoptions.md)

EnumOptions

___

### toObject

▸ `Static`**toObject**(`message`: [*EnumOptions*](proto.google.protobuf.enumoptions.md), `options?`: IConversionOptions): *object*

Creates a plain object from an EnumOptions message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*EnumOptions*](proto.google.protobuf.enumoptions.md) | EnumOptions   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an EnumOptions message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
