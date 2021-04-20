# Class: FieldDescriptorProto

[google](../modules/proto.google.md).[protobuf](../modules/proto.google.protobuf.md).FieldDescriptorProto

Represents a FieldDescriptorProto.

## Implements

* [*IFieldDescriptorProto*](../interfaces/proto.google.protobuf.ifielddescriptorproto.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.fielddescriptorproto-1.md#constructor)

### Properties

- [defaultValue](proto.google.protobuf.fielddescriptorproto-1.md#defaultvalue)
- [extendee](proto.google.protobuf.fielddescriptorproto-1.md#extendee)
- [jsonName](proto.google.protobuf.fielddescriptorproto-1.md#jsonname)
- [label](proto.google.protobuf.fielddescriptorproto-1.md#label)
- [name](proto.google.protobuf.fielddescriptorproto-1.md#name)
- [number](proto.google.protobuf.fielddescriptorproto-1.md#number)
- [oneofIndex](proto.google.protobuf.fielddescriptorproto-1.md#oneofindex)
- [options](proto.google.protobuf.fielddescriptorproto-1.md#options)
- [type](proto.google.protobuf.fielddescriptorproto-1.md#type)
- [typeName](proto.google.protobuf.fielddescriptorproto-1.md#typename)

### Methods

- [toJSON](proto.google.protobuf.fielddescriptorproto-1.md#tojson)
- [create](proto.google.protobuf.fielddescriptorproto-1.md#create)
- [decode](proto.google.protobuf.fielddescriptorproto-1.md#decode)
- [decodeDelimited](proto.google.protobuf.fielddescriptorproto-1.md#decodedelimited)
- [encode](proto.google.protobuf.fielddescriptorproto-1.md#encode)
- [encodeDelimited](proto.google.protobuf.fielddescriptorproto-1.md#encodedelimited)
- [fromObject](proto.google.protobuf.fielddescriptorproto-1.md#fromobject)
- [toObject](proto.google.protobuf.fielddescriptorproto-1.md#toobject)
- [verify](proto.google.protobuf.fielddescriptorproto-1.md#verify)

## Constructors

### constructor

\+ **new FieldDescriptorProto**(`properties?`: [*IFieldDescriptorProto*](../interfaces/proto.google.protobuf.ifielddescriptorproto.md)): [*FieldDescriptorProto*](proto.google.protobuf.fielddescriptorproto-1.md)

Constructs a new FieldDescriptorProto.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IFieldDescriptorProto*](../interfaces/proto.google.protobuf.ifielddescriptorproto.md) |

**Returns:** [*FieldDescriptorProto*](proto.google.protobuf.fielddescriptorproto-1.md)

## Properties

### defaultValue

• **defaultValue**: *string*

FieldDescriptorProto defaultValue.

Implementation of: [IFieldDescriptorProto](../interfaces/proto.google.protobuf.ifielddescriptorproto.md).[defaultValue](../interfaces/proto.google.protobuf.ifielddescriptorproto.md#defaultvalue)

___

### extendee

• **extendee**: *string*

FieldDescriptorProto extendee.

Implementation of: [IFieldDescriptorProto](../interfaces/proto.google.protobuf.ifielddescriptorproto.md).[extendee](../interfaces/proto.google.protobuf.ifielddescriptorproto.md#extendee)

___

### jsonName

• **jsonName**: *string*

FieldDescriptorProto jsonName.

Implementation of: [IFieldDescriptorProto](../interfaces/proto.google.protobuf.ifielddescriptorproto.md).[jsonName](../interfaces/proto.google.protobuf.ifielddescriptorproto.md#jsonname)

___

### label

• **label**: [*Label*](../enums/proto.google.protobuf.fielddescriptorproto.label.md)

FieldDescriptorProto label.

Implementation of: [IFieldDescriptorProto](../interfaces/proto.google.protobuf.ifielddescriptorproto.md).[label](../interfaces/proto.google.protobuf.ifielddescriptorproto.md#label)

___

### name

• **name**: *string*

FieldDescriptorProto name.

Implementation of: [IFieldDescriptorProto](../interfaces/proto.google.protobuf.ifielddescriptorproto.md).[name](../interfaces/proto.google.protobuf.ifielddescriptorproto.md#name)

___

### number

• **number**: *number*

FieldDescriptorProto number.

Implementation of: [IFieldDescriptorProto](../interfaces/proto.google.protobuf.ifielddescriptorproto.md).[number](../interfaces/proto.google.protobuf.ifielddescriptorproto.md#number)

___

### oneofIndex

• **oneofIndex**: *number*

FieldDescriptorProto oneofIndex.

Implementation of: [IFieldDescriptorProto](../interfaces/proto.google.protobuf.ifielddescriptorproto.md).[oneofIndex](../interfaces/proto.google.protobuf.ifielddescriptorproto.md#oneofindex)

___

### options

• `Optional` **options**: *null* \| [*IFieldOptions*](../interfaces/proto.google.protobuf.ifieldoptions.md)

FieldDescriptorProto options.

Implementation of: [IFieldDescriptorProto](../interfaces/proto.google.protobuf.ifielddescriptorproto.md).[options](../interfaces/proto.google.protobuf.ifielddescriptorproto.md#options)

___

### type

• **type**: [*Type*](../enums/proto.google.protobuf.fielddescriptorproto.type.md)

FieldDescriptorProto type.

Implementation of: [IFieldDescriptorProto](../interfaces/proto.google.protobuf.ifielddescriptorproto.md).[type](../interfaces/proto.google.protobuf.ifielddescriptorproto.md#type)

___

### typeName

• **typeName**: *string*

FieldDescriptorProto typeName.

Implementation of: [IFieldDescriptorProto](../interfaces/proto.google.protobuf.ifielddescriptorproto.md).[typeName](../interfaces/proto.google.protobuf.ifielddescriptorproto.md#typename)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this FieldDescriptorProto to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IFieldDescriptorProto*](../interfaces/proto.google.protobuf.ifielddescriptorproto.md)): [*FieldDescriptorProto*](proto.google.protobuf.fielddescriptorproto-1.md)

Creates a new FieldDescriptorProto instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IFieldDescriptorProto*](../interfaces/proto.google.protobuf.ifielddescriptorproto.md) |

**Returns:** [*FieldDescriptorProto*](proto.google.protobuf.fielddescriptorproto-1.md)

FieldDescriptorProto instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*FieldDescriptorProto*](proto.google.protobuf.fielddescriptorproto-1.md)

Decodes a FieldDescriptorProto message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*FieldDescriptorProto*](proto.google.protobuf.fielddescriptorproto-1.md)

FieldDescriptorProto

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*FieldDescriptorProto*](proto.google.protobuf.fielddescriptorproto-1.md)

Decodes a FieldDescriptorProto message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*FieldDescriptorProto*](proto.google.protobuf.fielddescriptorproto-1.md)

FieldDescriptorProto

___

### encode

▸ `Static`**encode**(`message`: [*IFieldDescriptorProto*](../interfaces/proto.google.protobuf.ifielddescriptorproto.md), `writer?`: *Writer*): *Writer*

Encodes the specified FieldDescriptorProto message. Does not implicitly [verify](proto.google.protobuf.fielddescriptorproto-1.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IFieldDescriptorProto*](../interfaces/proto.google.protobuf.ifielddescriptorproto.md) | FieldDescriptorProto message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IFieldDescriptorProto*](../interfaces/proto.google.protobuf.ifielddescriptorproto.md), `writer?`: *Writer*): *Writer*

Encodes the specified FieldDescriptorProto message, length delimited. Does not implicitly [verify](proto.google.protobuf.fielddescriptorproto-1.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IFieldDescriptorProto*](../interfaces/proto.google.protobuf.ifielddescriptorproto.md) | FieldDescriptorProto message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*FieldDescriptorProto*](proto.google.protobuf.fielddescriptorproto-1.md)

Creates a FieldDescriptorProto message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*FieldDescriptorProto*](proto.google.protobuf.fielddescriptorproto-1.md)

FieldDescriptorProto

___

### toObject

▸ `Static`**toObject**(`message`: [*FieldDescriptorProto*](proto.google.protobuf.fielddescriptorproto-1.md), `options?`: IConversionOptions): *object*

Creates a plain object from a FieldDescriptorProto message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*FieldDescriptorProto*](proto.google.protobuf.fielddescriptorproto-1.md) | FieldDescriptorProto   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a FieldDescriptorProto message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
