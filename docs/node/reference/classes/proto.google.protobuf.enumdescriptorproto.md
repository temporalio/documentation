# Class: EnumDescriptorProto

[google](../modules/proto.google.md).[protobuf](../modules/proto.google.protobuf.md).EnumDescriptorProto

Represents an EnumDescriptorProto.

## Implements

* [*IEnumDescriptorProto*](../interfaces/proto.google.protobuf.ienumdescriptorproto.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.enumdescriptorproto.md#constructor)

### Properties

- [name](proto.google.protobuf.enumdescriptorproto.md#name)
- [options](proto.google.protobuf.enumdescriptorproto.md#options)
- [value](proto.google.protobuf.enumdescriptorproto.md#value)

### Methods

- [toJSON](proto.google.protobuf.enumdescriptorproto.md#tojson)
- [create](proto.google.protobuf.enumdescriptorproto.md#create)
- [decode](proto.google.protobuf.enumdescriptorproto.md#decode)
- [decodeDelimited](proto.google.protobuf.enumdescriptorproto.md#decodedelimited)
- [encode](proto.google.protobuf.enumdescriptorproto.md#encode)
- [encodeDelimited](proto.google.protobuf.enumdescriptorproto.md#encodedelimited)
- [fromObject](proto.google.protobuf.enumdescriptorproto.md#fromobject)
- [toObject](proto.google.protobuf.enumdescriptorproto.md#toobject)
- [verify](proto.google.protobuf.enumdescriptorproto.md#verify)

## Constructors

### constructor

\+ **new EnumDescriptorProto**(`properties?`: [*IEnumDescriptorProto*](../interfaces/proto.google.protobuf.ienumdescriptorproto.md)): [*EnumDescriptorProto*](proto.google.protobuf.enumdescriptorproto.md)

Constructs a new EnumDescriptorProto.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IEnumDescriptorProto*](../interfaces/proto.google.protobuf.ienumdescriptorproto.md) |

**Returns:** [*EnumDescriptorProto*](proto.google.protobuf.enumdescriptorproto.md)

## Properties

### name

• **name**: *string*

EnumDescriptorProto name.

Implementation of: [IEnumDescriptorProto](../interfaces/proto.google.protobuf.ienumdescriptorproto.md).[name](../interfaces/proto.google.protobuf.ienumdescriptorproto.md#name)

___

### options

• `Optional` **options**: *null* \| [*IEnumOptions*](../interfaces/proto.google.protobuf.ienumoptions.md)

EnumDescriptorProto options.

Implementation of: [IEnumDescriptorProto](../interfaces/proto.google.protobuf.ienumdescriptorproto.md).[options](../interfaces/proto.google.protobuf.ienumdescriptorproto.md#options)

___

### value

• **value**: [*IEnumValueDescriptorProto*](../interfaces/proto.google.protobuf.ienumvaluedescriptorproto.md)[]

EnumDescriptorProto value.

Implementation of: [IEnumDescriptorProto](../interfaces/proto.google.protobuf.ienumdescriptorproto.md).[value](../interfaces/proto.google.protobuf.ienumdescriptorproto.md#value)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this EnumDescriptorProto to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IEnumDescriptorProto*](../interfaces/proto.google.protobuf.ienumdescriptorproto.md)): [*EnumDescriptorProto*](proto.google.protobuf.enumdescriptorproto.md)

Creates a new EnumDescriptorProto instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IEnumDescriptorProto*](../interfaces/proto.google.protobuf.ienumdescriptorproto.md) |

**Returns:** [*EnumDescriptorProto*](proto.google.protobuf.enumdescriptorproto.md)

EnumDescriptorProto instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*EnumDescriptorProto*](proto.google.protobuf.enumdescriptorproto.md)

Decodes an EnumDescriptorProto message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*EnumDescriptorProto*](proto.google.protobuf.enumdescriptorproto.md)

EnumDescriptorProto

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*EnumDescriptorProto*](proto.google.protobuf.enumdescriptorproto.md)

Decodes an EnumDescriptorProto message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*EnumDescriptorProto*](proto.google.protobuf.enumdescriptorproto.md)

EnumDescriptorProto

___

### encode

▸ `Static`**encode**(`message`: [*IEnumDescriptorProto*](../interfaces/proto.google.protobuf.ienumdescriptorproto.md), `writer?`: *Writer*): *Writer*

Encodes the specified EnumDescriptorProto message. Does not implicitly [verify](proto.google.protobuf.enumdescriptorproto.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IEnumDescriptorProto*](../interfaces/proto.google.protobuf.ienumdescriptorproto.md) | EnumDescriptorProto message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IEnumDescriptorProto*](../interfaces/proto.google.protobuf.ienumdescriptorproto.md), `writer?`: *Writer*): *Writer*

Encodes the specified EnumDescriptorProto message, length delimited. Does not implicitly [verify](proto.google.protobuf.enumdescriptorproto.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IEnumDescriptorProto*](../interfaces/proto.google.protobuf.ienumdescriptorproto.md) | EnumDescriptorProto message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*EnumDescriptorProto*](proto.google.protobuf.enumdescriptorproto.md)

Creates an EnumDescriptorProto message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*EnumDescriptorProto*](proto.google.protobuf.enumdescriptorproto.md)

EnumDescriptorProto

___

### toObject

▸ `Static`**toObject**(`message`: [*EnumDescriptorProto*](proto.google.protobuf.enumdescriptorproto.md), `options?`: IConversionOptions): *object*

Creates a plain object from an EnumDescriptorProto message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*EnumDescriptorProto*](proto.google.protobuf.enumdescriptorproto.md) | EnumDescriptorProto   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an EnumDescriptorProto message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
