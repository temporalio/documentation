# Class: EnumValueDescriptorProto

[google](../modules/proto.google.md).[protobuf](../modules/proto.google.protobuf.md).EnumValueDescriptorProto

Represents an EnumValueDescriptorProto.

## Implements

* [*IEnumValueDescriptorProto*](../interfaces/proto.google.protobuf.ienumvaluedescriptorproto.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.enumvaluedescriptorproto.md#constructor)

### Properties

- [name](proto.google.protobuf.enumvaluedescriptorproto.md#name)
- [number](proto.google.protobuf.enumvaluedescriptorproto.md#number)
- [options](proto.google.protobuf.enumvaluedescriptorproto.md#options)

### Methods

- [toJSON](proto.google.protobuf.enumvaluedescriptorproto.md#tojson)
- [create](proto.google.protobuf.enumvaluedescriptorproto.md#create)
- [decode](proto.google.protobuf.enumvaluedescriptorproto.md#decode)
- [decodeDelimited](proto.google.protobuf.enumvaluedescriptorproto.md#decodedelimited)
- [encode](proto.google.protobuf.enumvaluedescriptorproto.md#encode)
- [encodeDelimited](proto.google.protobuf.enumvaluedescriptorproto.md#encodedelimited)
- [fromObject](proto.google.protobuf.enumvaluedescriptorproto.md#fromobject)
- [toObject](proto.google.protobuf.enumvaluedescriptorproto.md#toobject)
- [verify](proto.google.protobuf.enumvaluedescriptorproto.md#verify)

## Constructors

### constructor

\+ **new EnumValueDescriptorProto**(`properties?`: [*IEnumValueDescriptorProto*](../interfaces/proto.google.protobuf.ienumvaluedescriptorproto.md)): [*EnumValueDescriptorProto*](proto.google.protobuf.enumvaluedescriptorproto.md)

Constructs a new EnumValueDescriptorProto.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IEnumValueDescriptorProto*](../interfaces/proto.google.protobuf.ienumvaluedescriptorproto.md) |

**Returns:** [*EnumValueDescriptorProto*](proto.google.protobuf.enumvaluedescriptorproto.md)

## Properties

### name

• **name**: *string*

EnumValueDescriptorProto name.

Implementation of: [IEnumValueDescriptorProto](../interfaces/proto.google.protobuf.ienumvaluedescriptorproto.md).[name](../interfaces/proto.google.protobuf.ienumvaluedescriptorproto.md#name)

___

### number

• **number**: *number*

EnumValueDescriptorProto number.

Implementation of: [IEnumValueDescriptorProto](../interfaces/proto.google.protobuf.ienumvaluedescriptorproto.md).[number](../interfaces/proto.google.protobuf.ienumvaluedescriptorproto.md#number)

___

### options

• `Optional` **options**: *null* \| [*IEnumValueOptions*](../interfaces/proto.google.protobuf.ienumvalueoptions.md)

EnumValueDescriptorProto options.

Implementation of: [IEnumValueDescriptorProto](../interfaces/proto.google.protobuf.ienumvaluedescriptorproto.md).[options](../interfaces/proto.google.protobuf.ienumvaluedescriptorproto.md#options)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this EnumValueDescriptorProto to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IEnumValueDescriptorProto*](../interfaces/proto.google.protobuf.ienumvaluedescriptorproto.md)): [*EnumValueDescriptorProto*](proto.google.protobuf.enumvaluedescriptorproto.md)

Creates a new EnumValueDescriptorProto instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IEnumValueDescriptorProto*](../interfaces/proto.google.protobuf.ienumvaluedescriptorproto.md) |

**Returns:** [*EnumValueDescriptorProto*](proto.google.protobuf.enumvaluedescriptorproto.md)

EnumValueDescriptorProto instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*EnumValueDescriptorProto*](proto.google.protobuf.enumvaluedescriptorproto.md)

Decodes an EnumValueDescriptorProto message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*EnumValueDescriptorProto*](proto.google.protobuf.enumvaluedescriptorproto.md)

EnumValueDescriptorProto

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*EnumValueDescriptorProto*](proto.google.protobuf.enumvaluedescriptorproto.md)

Decodes an EnumValueDescriptorProto message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*EnumValueDescriptorProto*](proto.google.protobuf.enumvaluedescriptorproto.md)

EnumValueDescriptorProto

___

### encode

▸ `Static`**encode**(`message`: [*IEnumValueDescriptorProto*](../interfaces/proto.google.protobuf.ienumvaluedescriptorproto.md), `writer?`: *Writer*): *Writer*

Encodes the specified EnumValueDescriptorProto message. Does not implicitly [verify](proto.google.protobuf.enumvaluedescriptorproto.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IEnumValueDescriptorProto*](../interfaces/proto.google.protobuf.ienumvaluedescriptorproto.md) | EnumValueDescriptorProto message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IEnumValueDescriptorProto*](../interfaces/proto.google.protobuf.ienumvaluedescriptorproto.md), `writer?`: *Writer*): *Writer*

Encodes the specified EnumValueDescriptorProto message, length delimited. Does not implicitly [verify](proto.google.protobuf.enumvaluedescriptorproto.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IEnumValueDescriptorProto*](../interfaces/proto.google.protobuf.ienumvaluedescriptorproto.md) | EnumValueDescriptorProto message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*EnumValueDescriptorProto*](proto.google.protobuf.enumvaluedescriptorproto.md)

Creates an EnumValueDescriptorProto message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*EnumValueDescriptorProto*](proto.google.protobuf.enumvaluedescriptorproto.md)

EnumValueDescriptorProto

___

### toObject

▸ `Static`**toObject**(`message`: [*EnumValueDescriptorProto*](proto.google.protobuf.enumvaluedescriptorproto.md), `options?`: IConversionOptions): *object*

Creates a plain object from an EnumValueDescriptorProto message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*EnumValueDescriptorProto*](proto.google.protobuf.enumvaluedescriptorproto.md) | EnumValueDescriptorProto   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an EnumValueDescriptorProto message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
