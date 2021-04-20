# Class: DescriptorProto

[google](../modules/proto.google.md).[protobuf](../modules/proto.google.protobuf.md).DescriptorProto

Represents a DescriptorProto.

## Implements

* [*IDescriptorProto*](../interfaces/proto.google.protobuf.idescriptorproto.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.descriptorproto-1.md#constructor)

### Properties

- [enumType](proto.google.protobuf.descriptorproto-1.md#enumtype)
- [extension](proto.google.protobuf.descriptorproto-1.md#extension)
- [extensionRange](proto.google.protobuf.descriptorproto-1.md#extensionrange)
- [field](proto.google.protobuf.descriptorproto-1.md#field)
- [name](proto.google.protobuf.descriptorproto-1.md#name)
- [nestedType](proto.google.protobuf.descriptorproto-1.md#nestedtype)
- [oneofDecl](proto.google.protobuf.descriptorproto-1.md#oneofdecl)
- [options](proto.google.protobuf.descriptorproto-1.md#options)
- [reservedName](proto.google.protobuf.descriptorproto-1.md#reservedname)
- [reservedRange](proto.google.protobuf.descriptorproto-1.md#reservedrange)

### Methods

- [toJSON](proto.google.protobuf.descriptorproto-1.md#tojson)
- [create](proto.google.protobuf.descriptorproto-1.md#create)
- [decode](proto.google.protobuf.descriptorproto-1.md#decode)
- [decodeDelimited](proto.google.protobuf.descriptorproto-1.md#decodedelimited)
- [encode](proto.google.protobuf.descriptorproto-1.md#encode)
- [encodeDelimited](proto.google.protobuf.descriptorproto-1.md#encodedelimited)
- [fromObject](proto.google.protobuf.descriptorproto-1.md#fromobject)
- [toObject](proto.google.protobuf.descriptorproto-1.md#toobject)
- [verify](proto.google.protobuf.descriptorproto-1.md#verify)

## Constructors

### constructor

\+ **new DescriptorProto**(`properties?`: [*IDescriptorProto*](../interfaces/proto.google.protobuf.idescriptorproto.md)): [*DescriptorProto*](proto.google.protobuf.descriptorproto-1.md)

Constructs a new DescriptorProto.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IDescriptorProto*](../interfaces/proto.google.protobuf.idescriptorproto.md) |

**Returns:** [*DescriptorProto*](proto.google.protobuf.descriptorproto-1.md)

## Properties

### enumType

• **enumType**: [*IEnumDescriptorProto*](../interfaces/proto.google.protobuf.ienumdescriptorproto.md)[]

DescriptorProto enumType.

Implementation of: [IDescriptorProto](../interfaces/proto.google.protobuf.idescriptorproto.md).[enumType](../interfaces/proto.google.protobuf.idescriptorproto.md#enumtype)

___

### extension

• **extension**: [*IFieldDescriptorProto*](../interfaces/proto.google.protobuf.ifielddescriptorproto.md)[]

DescriptorProto extension.

Implementation of: [IDescriptorProto](../interfaces/proto.google.protobuf.idescriptorproto.md).[extension](../interfaces/proto.google.protobuf.idescriptorproto.md#extension)

___

### extensionRange

• **extensionRange**: [*IExtensionRange*](../interfaces/proto.google.protobuf.descriptorproto.iextensionrange.md)[]

DescriptorProto extensionRange.

Implementation of: [IDescriptorProto](../interfaces/proto.google.protobuf.idescriptorproto.md).[extensionRange](../interfaces/proto.google.protobuf.idescriptorproto.md#extensionrange)

___

### field

• **field**: [*IFieldDescriptorProto*](../interfaces/proto.google.protobuf.ifielddescriptorproto.md)[]

DescriptorProto field.

Implementation of: [IDescriptorProto](../interfaces/proto.google.protobuf.idescriptorproto.md).[field](../interfaces/proto.google.protobuf.idescriptorproto.md#field)

___

### name

• **name**: *string*

DescriptorProto name.

Implementation of: [IDescriptorProto](../interfaces/proto.google.protobuf.idescriptorproto.md).[name](../interfaces/proto.google.protobuf.idescriptorproto.md#name)

___

### nestedType

• **nestedType**: [*IDescriptorProto*](../interfaces/proto.google.protobuf.idescriptorproto.md)[]

DescriptorProto nestedType.

Implementation of: [IDescriptorProto](../interfaces/proto.google.protobuf.idescriptorproto.md).[nestedType](../interfaces/proto.google.protobuf.idescriptorproto.md#nestedtype)

___

### oneofDecl

• **oneofDecl**: [*IOneofDescriptorProto*](../interfaces/proto.google.protobuf.ioneofdescriptorproto.md)[]

DescriptorProto oneofDecl.

Implementation of: [IDescriptorProto](../interfaces/proto.google.protobuf.idescriptorproto.md).[oneofDecl](../interfaces/proto.google.protobuf.idescriptorproto.md#oneofdecl)

___

### options

• `Optional` **options**: *null* \| [*IMessageOptions*](../interfaces/proto.google.protobuf.imessageoptions.md)

DescriptorProto options.

Implementation of: [IDescriptorProto](../interfaces/proto.google.protobuf.idescriptorproto.md).[options](../interfaces/proto.google.protobuf.idescriptorproto.md#options)

___

### reservedName

• **reservedName**: *string*[]

DescriptorProto reservedName.

Implementation of: [IDescriptorProto](../interfaces/proto.google.protobuf.idescriptorproto.md).[reservedName](../interfaces/proto.google.protobuf.idescriptorproto.md#reservedname)

___

### reservedRange

• **reservedRange**: [*IReservedRange*](../interfaces/proto.google.protobuf.descriptorproto.ireservedrange.md)[]

DescriptorProto reservedRange.

Implementation of: [IDescriptorProto](../interfaces/proto.google.protobuf.idescriptorproto.md).[reservedRange](../interfaces/proto.google.protobuf.idescriptorproto.md#reservedrange)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this DescriptorProto to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IDescriptorProto*](../interfaces/proto.google.protobuf.idescriptorproto.md)): [*DescriptorProto*](proto.google.protobuf.descriptorproto-1.md)

Creates a new DescriptorProto instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IDescriptorProto*](../interfaces/proto.google.protobuf.idescriptorproto.md) |

**Returns:** [*DescriptorProto*](proto.google.protobuf.descriptorproto-1.md)

DescriptorProto instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*DescriptorProto*](proto.google.protobuf.descriptorproto-1.md)

Decodes a DescriptorProto message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*DescriptorProto*](proto.google.protobuf.descriptorproto-1.md)

DescriptorProto

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*DescriptorProto*](proto.google.protobuf.descriptorproto-1.md)

Decodes a DescriptorProto message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*DescriptorProto*](proto.google.protobuf.descriptorproto-1.md)

DescriptorProto

___

### encode

▸ `Static`**encode**(`message`: [*IDescriptorProto*](../interfaces/proto.google.protobuf.idescriptorproto.md), `writer?`: *Writer*): *Writer*

Encodes the specified DescriptorProto message. Does not implicitly [verify](proto.google.protobuf.descriptorproto-1.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IDescriptorProto*](../interfaces/proto.google.protobuf.idescriptorproto.md) | DescriptorProto message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IDescriptorProto*](../interfaces/proto.google.protobuf.idescriptorproto.md), `writer?`: *Writer*): *Writer*

Encodes the specified DescriptorProto message, length delimited. Does not implicitly [verify](proto.google.protobuf.descriptorproto-1.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IDescriptorProto*](../interfaces/proto.google.protobuf.idescriptorproto.md) | DescriptorProto message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*DescriptorProto*](proto.google.protobuf.descriptorproto-1.md)

Creates a DescriptorProto message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*DescriptorProto*](proto.google.protobuf.descriptorproto-1.md)

DescriptorProto

___

### toObject

▸ `Static`**toObject**(`message`: [*DescriptorProto*](proto.google.protobuf.descriptorproto-1.md), `options?`: IConversionOptions): *object*

Creates a plain object from a DescriptorProto message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*DescriptorProto*](proto.google.protobuf.descriptorproto-1.md) | DescriptorProto   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a DescriptorProto message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
