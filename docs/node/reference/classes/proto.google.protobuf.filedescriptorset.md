# Class: FileDescriptorSet

[google](../modules/proto.google.md).[protobuf](../modules/proto.google.protobuf.md).FileDescriptorSet

Represents a FileDescriptorSet.

## Implements

* [*IFileDescriptorSet*](../interfaces/proto.google.protobuf.ifiledescriptorset.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.filedescriptorset.md#constructor)

### Properties

- [file](proto.google.protobuf.filedescriptorset.md#file)

### Methods

- [toJSON](proto.google.protobuf.filedescriptorset.md#tojson)
- [create](proto.google.protobuf.filedescriptorset.md#create)
- [decode](proto.google.protobuf.filedescriptorset.md#decode)
- [decodeDelimited](proto.google.protobuf.filedescriptorset.md#decodedelimited)
- [encode](proto.google.protobuf.filedescriptorset.md#encode)
- [encodeDelimited](proto.google.protobuf.filedescriptorset.md#encodedelimited)
- [fromObject](proto.google.protobuf.filedescriptorset.md#fromobject)
- [toObject](proto.google.protobuf.filedescriptorset.md#toobject)
- [verify](proto.google.protobuf.filedescriptorset.md#verify)

## Constructors

### constructor

\+ **new FileDescriptorSet**(`properties?`: [*IFileDescriptorSet*](../interfaces/proto.google.protobuf.ifiledescriptorset.md)): [*FileDescriptorSet*](proto.google.protobuf.filedescriptorset.md)

Constructs a new FileDescriptorSet.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IFileDescriptorSet*](../interfaces/proto.google.protobuf.ifiledescriptorset.md) |

**Returns:** [*FileDescriptorSet*](proto.google.protobuf.filedescriptorset.md)

## Properties

### file

• **file**: [*IFileDescriptorProto*](../interfaces/proto.google.protobuf.ifiledescriptorproto.md)[]

FileDescriptorSet file.

Implementation of: [IFileDescriptorSet](../interfaces/proto.google.protobuf.ifiledescriptorset.md).[file](../interfaces/proto.google.protobuf.ifiledescriptorset.md#file)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this FileDescriptorSet to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IFileDescriptorSet*](../interfaces/proto.google.protobuf.ifiledescriptorset.md)): [*FileDescriptorSet*](proto.google.protobuf.filedescriptorset.md)

Creates a new FileDescriptorSet instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IFileDescriptorSet*](../interfaces/proto.google.protobuf.ifiledescriptorset.md) |

**Returns:** [*FileDescriptorSet*](proto.google.protobuf.filedescriptorset.md)

FileDescriptorSet instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*FileDescriptorSet*](proto.google.protobuf.filedescriptorset.md)

Decodes a FileDescriptorSet message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*FileDescriptorSet*](proto.google.protobuf.filedescriptorset.md)

FileDescriptorSet

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*FileDescriptorSet*](proto.google.protobuf.filedescriptorset.md)

Decodes a FileDescriptorSet message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*FileDescriptorSet*](proto.google.protobuf.filedescriptorset.md)

FileDescriptorSet

___

### encode

▸ `Static`**encode**(`message`: [*IFileDescriptorSet*](../interfaces/proto.google.protobuf.ifiledescriptorset.md), `writer?`: *Writer*): *Writer*

Encodes the specified FileDescriptorSet message. Does not implicitly [verify](proto.google.protobuf.filedescriptorset.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IFileDescriptorSet*](../interfaces/proto.google.protobuf.ifiledescriptorset.md) | FileDescriptorSet message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IFileDescriptorSet*](../interfaces/proto.google.protobuf.ifiledescriptorset.md), `writer?`: *Writer*): *Writer*

Encodes the specified FileDescriptorSet message, length delimited. Does not implicitly [verify](proto.google.protobuf.filedescriptorset.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IFileDescriptorSet*](../interfaces/proto.google.protobuf.ifiledescriptorset.md) | FileDescriptorSet message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*FileDescriptorSet*](proto.google.protobuf.filedescriptorset.md)

Creates a FileDescriptorSet message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*FileDescriptorSet*](proto.google.protobuf.filedescriptorset.md)

FileDescriptorSet

___

### toObject

▸ `Static`**toObject**(`message`: [*FileDescriptorSet*](proto.google.protobuf.filedescriptorset.md), `options?`: IConversionOptions): *object*

Creates a plain object from a FileDescriptorSet message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*FileDescriptorSet*](proto.google.protobuf.filedescriptorset.md) | FileDescriptorSet   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a FileDescriptorSet message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
