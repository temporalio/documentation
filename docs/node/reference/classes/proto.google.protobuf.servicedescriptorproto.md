# Class: ServiceDescriptorProto

[google](../modules/proto.google.md).[protobuf](../modules/proto.google.protobuf.md).ServiceDescriptorProto

Represents a ServiceDescriptorProto.

## Implements

* [*IServiceDescriptorProto*](../interfaces/proto.google.protobuf.iservicedescriptorproto.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.servicedescriptorproto.md#constructor)

### Properties

- [method](proto.google.protobuf.servicedescriptorproto.md#method)
- [name](proto.google.protobuf.servicedescriptorproto.md#name)
- [options](proto.google.protobuf.servicedescriptorproto.md#options)

### Methods

- [toJSON](proto.google.protobuf.servicedescriptorproto.md#tojson)
- [create](proto.google.protobuf.servicedescriptorproto.md#create)
- [decode](proto.google.protobuf.servicedescriptorproto.md#decode)
- [decodeDelimited](proto.google.protobuf.servicedescriptorproto.md#decodedelimited)
- [encode](proto.google.protobuf.servicedescriptorproto.md#encode)
- [encodeDelimited](proto.google.protobuf.servicedescriptorproto.md#encodedelimited)
- [fromObject](proto.google.protobuf.servicedescriptorproto.md#fromobject)
- [toObject](proto.google.protobuf.servicedescriptorproto.md#toobject)
- [verify](proto.google.protobuf.servicedescriptorproto.md#verify)

## Constructors

### constructor

\+ **new ServiceDescriptorProto**(`properties?`: [*IServiceDescriptorProto*](../interfaces/proto.google.protobuf.iservicedescriptorproto.md)): [*ServiceDescriptorProto*](proto.google.protobuf.servicedescriptorproto.md)

Constructs a new ServiceDescriptorProto.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IServiceDescriptorProto*](../interfaces/proto.google.protobuf.iservicedescriptorproto.md) |

**Returns:** [*ServiceDescriptorProto*](proto.google.protobuf.servicedescriptorproto.md)

## Properties

### method

• **method**: [*IMethodDescriptorProto*](../interfaces/proto.google.protobuf.imethoddescriptorproto.md)[]

ServiceDescriptorProto method.

Implementation of: [IServiceDescriptorProto](../interfaces/proto.google.protobuf.iservicedescriptorproto.md).[method](../interfaces/proto.google.protobuf.iservicedescriptorproto.md#method)

___

### name

• **name**: *string*

ServiceDescriptorProto name.

Implementation of: [IServiceDescriptorProto](../interfaces/proto.google.protobuf.iservicedescriptorproto.md).[name](../interfaces/proto.google.protobuf.iservicedescriptorproto.md#name)

___

### options

• `Optional` **options**: *null* \| [*IServiceOptions*](../interfaces/proto.google.protobuf.iserviceoptions.md)

ServiceDescriptorProto options.

Implementation of: [IServiceDescriptorProto](../interfaces/proto.google.protobuf.iservicedescriptorproto.md).[options](../interfaces/proto.google.protobuf.iservicedescriptorproto.md#options)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ServiceDescriptorProto to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IServiceDescriptorProto*](../interfaces/proto.google.protobuf.iservicedescriptorproto.md)): [*ServiceDescriptorProto*](proto.google.protobuf.servicedescriptorproto.md)

Creates a new ServiceDescriptorProto instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IServiceDescriptorProto*](../interfaces/proto.google.protobuf.iservicedescriptorproto.md) |

**Returns:** [*ServiceDescriptorProto*](proto.google.protobuf.servicedescriptorproto.md)

ServiceDescriptorProto instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ServiceDescriptorProto*](proto.google.protobuf.servicedescriptorproto.md)

Decodes a ServiceDescriptorProto message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ServiceDescriptorProto*](proto.google.protobuf.servicedescriptorproto.md)

ServiceDescriptorProto

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ServiceDescriptorProto*](proto.google.protobuf.servicedescriptorproto.md)

Decodes a ServiceDescriptorProto message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ServiceDescriptorProto*](proto.google.protobuf.servicedescriptorproto.md)

ServiceDescriptorProto

___

### encode

▸ `Static`**encode**(`message`: [*IServiceDescriptorProto*](../interfaces/proto.google.protobuf.iservicedescriptorproto.md), `writer?`: *Writer*): *Writer*

Encodes the specified ServiceDescriptorProto message. Does not implicitly [verify](proto.google.protobuf.servicedescriptorproto.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IServiceDescriptorProto*](../interfaces/proto.google.protobuf.iservicedescriptorproto.md) | ServiceDescriptorProto message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IServiceDescriptorProto*](../interfaces/proto.google.protobuf.iservicedescriptorproto.md), `writer?`: *Writer*): *Writer*

Encodes the specified ServiceDescriptorProto message, length delimited. Does not implicitly [verify](proto.google.protobuf.servicedescriptorproto.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IServiceDescriptorProto*](../interfaces/proto.google.protobuf.iservicedescriptorproto.md) | ServiceDescriptorProto message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ServiceDescriptorProto*](proto.google.protobuf.servicedescriptorproto.md)

Creates a ServiceDescriptorProto message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ServiceDescriptorProto*](proto.google.protobuf.servicedescriptorproto.md)

ServiceDescriptorProto

___

### toObject

▸ `Static`**toObject**(`message`: [*ServiceDescriptorProto*](proto.google.protobuf.servicedescriptorproto.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ServiceDescriptorProto message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ServiceDescriptorProto*](proto.google.protobuf.servicedescriptorproto.md) | ServiceDescriptorProto   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ServiceDescriptorProto message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
