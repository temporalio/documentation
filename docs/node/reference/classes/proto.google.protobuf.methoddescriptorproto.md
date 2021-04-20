# Class: MethodDescriptorProto

[google](../modules/proto.google.md).[protobuf](../modules/proto.google.protobuf.md).MethodDescriptorProto

Represents a MethodDescriptorProto.

## Implements

* [*IMethodDescriptorProto*](../interfaces/proto.google.protobuf.imethoddescriptorproto.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.methoddescriptorproto.md#constructor)

### Properties

- [clientStreaming](proto.google.protobuf.methoddescriptorproto.md#clientstreaming)
- [inputType](proto.google.protobuf.methoddescriptorproto.md#inputtype)
- [name](proto.google.protobuf.methoddescriptorproto.md#name)
- [options](proto.google.protobuf.methoddescriptorproto.md#options)
- [outputType](proto.google.protobuf.methoddescriptorproto.md#outputtype)
- [serverStreaming](proto.google.protobuf.methoddescriptorproto.md#serverstreaming)

### Methods

- [toJSON](proto.google.protobuf.methoddescriptorproto.md#tojson)
- [create](proto.google.protobuf.methoddescriptorproto.md#create)
- [decode](proto.google.protobuf.methoddescriptorproto.md#decode)
- [decodeDelimited](proto.google.protobuf.methoddescriptorproto.md#decodedelimited)
- [encode](proto.google.protobuf.methoddescriptorproto.md#encode)
- [encodeDelimited](proto.google.protobuf.methoddescriptorproto.md#encodedelimited)
- [fromObject](proto.google.protobuf.methoddescriptorproto.md#fromobject)
- [toObject](proto.google.protobuf.methoddescriptorproto.md#toobject)
- [verify](proto.google.protobuf.methoddescriptorproto.md#verify)

## Constructors

### constructor

\+ **new MethodDescriptorProto**(`properties?`: [*IMethodDescriptorProto*](../interfaces/proto.google.protobuf.imethoddescriptorproto.md)): [*MethodDescriptorProto*](proto.google.protobuf.methoddescriptorproto.md)

Constructs a new MethodDescriptorProto.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IMethodDescriptorProto*](../interfaces/proto.google.protobuf.imethoddescriptorproto.md) |

**Returns:** [*MethodDescriptorProto*](proto.google.protobuf.methoddescriptorproto.md)

## Properties

### clientStreaming

• **clientStreaming**: *boolean*

MethodDescriptorProto clientStreaming.

Implementation of: [IMethodDescriptorProto](../interfaces/proto.google.protobuf.imethoddescriptorproto.md).[clientStreaming](../interfaces/proto.google.protobuf.imethoddescriptorproto.md#clientstreaming)

___

### inputType

• **inputType**: *string*

MethodDescriptorProto inputType.

Implementation of: [IMethodDescriptorProto](../interfaces/proto.google.protobuf.imethoddescriptorproto.md).[inputType](../interfaces/proto.google.protobuf.imethoddescriptorproto.md#inputtype)

___

### name

• **name**: *string*

MethodDescriptorProto name.

Implementation of: [IMethodDescriptorProto](../interfaces/proto.google.protobuf.imethoddescriptorproto.md).[name](../interfaces/proto.google.protobuf.imethoddescriptorproto.md#name)

___

### options

• `Optional` **options**: *null* \| [*IMethodOptions*](../interfaces/proto.google.protobuf.imethodoptions.md)

MethodDescriptorProto options.

Implementation of: [IMethodDescriptorProto](../interfaces/proto.google.protobuf.imethoddescriptorproto.md).[options](../interfaces/proto.google.protobuf.imethoddescriptorproto.md#options)

___

### outputType

• **outputType**: *string*

MethodDescriptorProto outputType.

Implementation of: [IMethodDescriptorProto](../interfaces/proto.google.protobuf.imethoddescriptorproto.md).[outputType](../interfaces/proto.google.protobuf.imethoddescriptorproto.md#outputtype)

___

### serverStreaming

• **serverStreaming**: *boolean*

MethodDescriptorProto serverStreaming.

Implementation of: [IMethodDescriptorProto](../interfaces/proto.google.protobuf.imethoddescriptorproto.md).[serverStreaming](../interfaces/proto.google.protobuf.imethoddescriptorproto.md#serverstreaming)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this MethodDescriptorProto to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IMethodDescriptorProto*](../interfaces/proto.google.protobuf.imethoddescriptorproto.md)): [*MethodDescriptorProto*](proto.google.protobuf.methoddescriptorproto.md)

Creates a new MethodDescriptorProto instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IMethodDescriptorProto*](../interfaces/proto.google.protobuf.imethoddescriptorproto.md) |

**Returns:** [*MethodDescriptorProto*](proto.google.protobuf.methoddescriptorproto.md)

MethodDescriptorProto instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*MethodDescriptorProto*](proto.google.protobuf.methoddescriptorproto.md)

Decodes a MethodDescriptorProto message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*MethodDescriptorProto*](proto.google.protobuf.methoddescriptorproto.md)

MethodDescriptorProto

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*MethodDescriptorProto*](proto.google.protobuf.methoddescriptorproto.md)

Decodes a MethodDescriptorProto message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*MethodDescriptorProto*](proto.google.protobuf.methoddescriptorproto.md)

MethodDescriptorProto

___

### encode

▸ `Static`**encode**(`message`: [*IMethodDescriptorProto*](../interfaces/proto.google.protobuf.imethoddescriptorproto.md), `writer?`: *Writer*): *Writer*

Encodes the specified MethodDescriptorProto message. Does not implicitly [verify](proto.google.protobuf.methoddescriptorproto.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IMethodDescriptorProto*](../interfaces/proto.google.protobuf.imethoddescriptorproto.md) | MethodDescriptorProto message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IMethodDescriptorProto*](../interfaces/proto.google.protobuf.imethoddescriptorproto.md), `writer?`: *Writer*): *Writer*

Encodes the specified MethodDescriptorProto message, length delimited. Does not implicitly [verify](proto.google.protobuf.methoddescriptorproto.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IMethodDescriptorProto*](../interfaces/proto.google.protobuf.imethoddescriptorproto.md) | MethodDescriptorProto message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*MethodDescriptorProto*](proto.google.protobuf.methoddescriptorproto.md)

Creates a MethodDescriptorProto message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*MethodDescriptorProto*](proto.google.protobuf.methoddescriptorproto.md)

MethodDescriptorProto

___

### toObject

▸ `Static`**toObject**(`message`: [*MethodDescriptorProto*](proto.google.protobuf.methoddescriptorproto.md), `options?`: IConversionOptions): *object*

Creates a plain object from a MethodDescriptorProto message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*MethodDescriptorProto*](proto.google.protobuf.methoddescriptorproto.md) | MethodDescriptorProto   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a MethodDescriptorProto message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
