# Class: FileDescriptorProto

[google](../modules/proto.google.md).[protobuf](../modules/proto.google.protobuf.md).FileDescriptorProto

Represents a FileDescriptorProto.

## Implements

* [*IFileDescriptorProto*](../interfaces/proto.google.protobuf.ifiledescriptorproto.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.filedescriptorproto.md#constructor)

### Properties

- [dependency](proto.google.protobuf.filedescriptorproto.md#dependency)
- [enumType](proto.google.protobuf.filedescriptorproto.md#enumtype)
- [extension](proto.google.protobuf.filedescriptorproto.md#extension)
- [messageType](proto.google.protobuf.filedescriptorproto.md#messagetype)
- [name](proto.google.protobuf.filedescriptorproto.md#name)
- [options](proto.google.protobuf.filedescriptorproto.md#options)
- [package](proto.google.protobuf.filedescriptorproto.md#package)
- [publicDependency](proto.google.protobuf.filedescriptorproto.md#publicdependency)
- [service](proto.google.protobuf.filedescriptorproto.md#service)
- [sourceCodeInfo](proto.google.protobuf.filedescriptorproto.md#sourcecodeinfo)
- [syntax](proto.google.protobuf.filedescriptorproto.md#syntax)
- [weakDependency](proto.google.protobuf.filedescriptorproto.md#weakdependency)

### Methods

- [toJSON](proto.google.protobuf.filedescriptorproto.md#tojson)
- [create](proto.google.protobuf.filedescriptorproto.md#create)
- [decode](proto.google.protobuf.filedescriptorproto.md#decode)
- [decodeDelimited](proto.google.protobuf.filedescriptorproto.md#decodedelimited)
- [encode](proto.google.protobuf.filedescriptorproto.md#encode)
- [encodeDelimited](proto.google.protobuf.filedescriptorproto.md#encodedelimited)
- [fromObject](proto.google.protobuf.filedescriptorproto.md#fromobject)
- [toObject](proto.google.protobuf.filedescriptorproto.md#toobject)
- [verify](proto.google.protobuf.filedescriptorproto.md#verify)

## Constructors

### constructor

\+ **new FileDescriptorProto**(`properties?`: [*IFileDescriptorProto*](../interfaces/proto.google.protobuf.ifiledescriptorproto.md)): [*FileDescriptorProto*](proto.google.protobuf.filedescriptorproto.md)

Constructs a new FileDescriptorProto.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IFileDescriptorProto*](../interfaces/proto.google.protobuf.ifiledescriptorproto.md) |

**Returns:** [*FileDescriptorProto*](proto.google.protobuf.filedescriptorproto.md)

## Properties

### dependency

• **dependency**: *string*[]

FileDescriptorProto dependency.

Implementation of: [IFileDescriptorProto](../interfaces/proto.google.protobuf.ifiledescriptorproto.md).[dependency](../interfaces/proto.google.protobuf.ifiledescriptorproto.md#dependency)

___

### enumType

• **enumType**: [*IEnumDescriptorProto*](../interfaces/proto.google.protobuf.ienumdescriptorproto.md)[]

FileDescriptorProto enumType.

Implementation of: [IFileDescriptorProto](../interfaces/proto.google.protobuf.ifiledescriptorproto.md).[enumType](../interfaces/proto.google.protobuf.ifiledescriptorproto.md#enumtype)

___

### extension

• **extension**: [*IFieldDescriptorProto*](../interfaces/proto.google.protobuf.ifielddescriptorproto.md)[]

FileDescriptorProto extension.

Implementation of: [IFileDescriptorProto](../interfaces/proto.google.protobuf.ifiledescriptorproto.md).[extension](../interfaces/proto.google.protobuf.ifiledescriptorproto.md#extension)

___

### messageType

• **messageType**: [*IDescriptorProto*](../interfaces/proto.google.protobuf.idescriptorproto.md)[]

FileDescriptorProto messageType.

Implementation of: [IFileDescriptorProto](../interfaces/proto.google.protobuf.ifiledescriptorproto.md).[messageType](../interfaces/proto.google.protobuf.ifiledescriptorproto.md#messagetype)

___

### name

• **name**: *string*

FileDescriptorProto name.

Implementation of: [IFileDescriptorProto](../interfaces/proto.google.protobuf.ifiledescriptorproto.md).[name](../interfaces/proto.google.protobuf.ifiledescriptorproto.md#name)

___

### options

• `Optional` **options**: *null* \| [*IFileOptions*](../interfaces/proto.google.protobuf.ifileoptions.md)

FileDescriptorProto options.

Implementation of: [IFileDescriptorProto](../interfaces/proto.google.protobuf.ifiledescriptorproto.md).[options](../interfaces/proto.google.protobuf.ifiledescriptorproto.md#options)

___

### package

• **package**: *string*

FileDescriptorProto package.

Implementation of: [IFileDescriptorProto](../interfaces/proto.google.protobuf.ifiledescriptorproto.md).[package](../interfaces/proto.google.protobuf.ifiledescriptorproto.md#package)

___

### publicDependency

• **publicDependency**: *number*[]

FileDescriptorProto publicDependency.

Implementation of: [IFileDescriptorProto](../interfaces/proto.google.protobuf.ifiledescriptorproto.md).[publicDependency](../interfaces/proto.google.protobuf.ifiledescriptorproto.md#publicdependency)

___

### service

• **service**: [*IServiceDescriptorProto*](../interfaces/proto.google.protobuf.iservicedescriptorproto.md)[]

FileDescriptorProto service.

Implementation of: [IFileDescriptorProto](../interfaces/proto.google.protobuf.ifiledescriptorproto.md).[service](../interfaces/proto.google.protobuf.ifiledescriptorproto.md#service)

___

### sourceCodeInfo

• `Optional` **sourceCodeInfo**: *null* \| [*ISourceCodeInfo*](../interfaces/proto.google.protobuf.isourcecodeinfo.md)

FileDescriptorProto sourceCodeInfo.

Implementation of: [IFileDescriptorProto](../interfaces/proto.google.protobuf.ifiledescriptorproto.md).[sourceCodeInfo](../interfaces/proto.google.protobuf.ifiledescriptorproto.md#sourcecodeinfo)

___

### syntax

• **syntax**: *string*

FileDescriptorProto syntax.

Implementation of: [IFileDescriptorProto](../interfaces/proto.google.protobuf.ifiledescriptorproto.md).[syntax](../interfaces/proto.google.protobuf.ifiledescriptorproto.md#syntax)

___

### weakDependency

• **weakDependency**: *number*[]

FileDescriptorProto weakDependency.

Implementation of: [IFileDescriptorProto](../interfaces/proto.google.protobuf.ifiledescriptorproto.md).[weakDependency](../interfaces/proto.google.protobuf.ifiledescriptorproto.md#weakdependency)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this FileDescriptorProto to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IFileDescriptorProto*](../interfaces/proto.google.protobuf.ifiledescriptorproto.md)): [*FileDescriptorProto*](proto.google.protobuf.filedescriptorproto.md)

Creates a new FileDescriptorProto instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IFileDescriptorProto*](../interfaces/proto.google.protobuf.ifiledescriptorproto.md) |

**Returns:** [*FileDescriptorProto*](proto.google.protobuf.filedescriptorproto.md)

FileDescriptorProto instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*FileDescriptorProto*](proto.google.protobuf.filedescriptorproto.md)

Decodes a FileDescriptorProto message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*FileDescriptorProto*](proto.google.protobuf.filedescriptorproto.md)

FileDescriptorProto

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*FileDescriptorProto*](proto.google.protobuf.filedescriptorproto.md)

Decodes a FileDescriptorProto message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*FileDescriptorProto*](proto.google.protobuf.filedescriptorproto.md)

FileDescriptorProto

___

### encode

▸ `Static`**encode**(`message`: [*IFileDescriptorProto*](../interfaces/proto.google.protobuf.ifiledescriptorproto.md), `writer?`: *Writer*): *Writer*

Encodes the specified FileDescriptorProto message. Does not implicitly [verify](proto.google.protobuf.filedescriptorproto.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IFileDescriptorProto*](../interfaces/proto.google.protobuf.ifiledescriptorproto.md) | FileDescriptorProto message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IFileDescriptorProto*](../interfaces/proto.google.protobuf.ifiledescriptorproto.md), `writer?`: *Writer*): *Writer*

Encodes the specified FileDescriptorProto message, length delimited. Does not implicitly [verify](proto.google.protobuf.filedescriptorproto.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IFileDescriptorProto*](../interfaces/proto.google.protobuf.ifiledescriptorproto.md) | FileDescriptorProto message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*FileDescriptorProto*](proto.google.protobuf.filedescriptorproto.md)

Creates a FileDescriptorProto message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*FileDescriptorProto*](proto.google.protobuf.filedescriptorproto.md)

FileDescriptorProto

___

### toObject

▸ `Static`**toObject**(`message`: [*FileDescriptorProto*](proto.google.protobuf.filedescriptorproto.md), `options?`: IConversionOptions): *object*

Creates a plain object from a FileDescriptorProto message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*FileDescriptorProto*](proto.google.protobuf.filedescriptorproto.md) | FileDescriptorProto   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a FileDescriptorProto message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
