# Class: OneofDescriptorProto

[google](../modules/proto.google.md).[protobuf](../modules/proto.google.protobuf.md).OneofDescriptorProto

Represents an OneofDescriptorProto.

## Implements

* [*IOneofDescriptorProto*](../interfaces/proto.google.protobuf.ioneofdescriptorproto.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.oneofdescriptorproto.md#constructor)

### Properties

- [name](proto.google.protobuf.oneofdescriptorproto.md#name)
- [options](proto.google.protobuf.oneofdescriptorproto.md#options)

### Methods

- [toJSON](proto.google.protobuf.oneofdescriptorproto.md#tojson)
- [create](proto.google.protobuf.oneofdescriptorproto.md#create)
- [decode](proto.google.protobuf.oneofdescriptorproto.md#decode)
- [decodeDelimited](proto.google.protobuf.oneofdescriptorproto.md#decodedelimited)
- [encode](proto.google.protobuf.oneofdescriptorproto.md#encode)
- [encodeDelimited](proto.google.protobuf.oneofdescriptorproto.md#encodedelimited)
- [fromObject](proto.google.protobuf.oneofdescriptorproto.md#fromobject)
- [toObject](proto.google.protobuf.oneofdescriptorproto.md#toobject)
- [verify](proto.google.protobuf.oneofdescriptorproto.md#verify)

## Constructors

### constructor

\+ **new OneofDescriptorProto**(`properties?`: [*IOneofDescriptorProto*](../interfaces/proto.google.protobuf.ioneofdescriptorproto.md)): [*OneofDescriptorProto*](proto.google.protobuf.oneofdescriptorproto.md)

Constructs a new OneofDescriptorProto.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IOneofDescriptorProto*](../interfaces/proto.google.protobuf.ioneofdescriptorproto.md) |

**Returns:** [*OneofDescriptorProto*](proto.google.protobuf.oneofdescriptorproto.md)

## Properties

### name

• **name**: *string*

OneofDescriptorProto name.

Implementation of: [IOneofDescriptorProto](../interfaces/proto.google.protobuf.ioneofdescriptorproto.md).[name](../interfaces/proto.google.protobuf.ioneofdescriptorproto.md#name)

___

### options

• `Optional` **options**: *null* \| [*IOneofOptions*](../interfaces/proto.google.protobuf.ioneofoptions.md)

OneofDescriptorProto options.

Implementation of: [IOneofDescriptorProto](../interfaces/proto.google.protobuf.ioneofdescriptorproto.md).[options](../interfaces/proto.google.protobuf.ioneofdescriptorproto.md#options)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this OneofDescriptorProto to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IOneofDescriptorProto*](../interfaces/proto.google.protobuf.ioneofdescriptorproto.md)): [*OneofDescriptorProto*](proto.google.protobuf.oneofdescriptorproto.md)

Creates a new OneofDescriptorProto instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IOneofDescriptorProto*](../interfaces/proto.google.protobuf.ioneofdescriptorproto.md) |

**Returns:** [*OneofDescriptorProto*](proto.google.protobuf.oneofdescriptorproto.md)

OneofDescriptorProto instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*OneofDescriptorProto*](proto.google.protobuf.oneofdescriptorproto.md)

Decodes an OneofDescriptorProto message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*OneofDescriptorProto*](proto.google.protobuf.oneofdescriptorproto.md)

OneofDescriptorProto

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*OneofDescriptorProto*](proto.google.protobuf.oneofdescriptorproto.md)

Decodes an OneofDescriptorProto message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*OneofDescriptorProto*](proto.google.protobuf.oneofdescriptorproto.md)

OneofDescriptorProto

___

### encode

▸ `Static`**encode**(`message`: [*IOneofDescriptorProto*](../interfaces/proto.google.protobuf.ioneofdescriptorproto.md), `writer?`: *Writer*): *Writer*

Encodes the specified OneofDescriptorProto message. Does not implicitly [verify](proto.google.protobuf.oneofdescriptorproto.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IOneofDescriptorProto*](../interfaces/proto.google.protobuf.ioneofdescriptorproto.md) | OneofDescriptorProto message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IOneofDescriptorProto*](../interfaces/proto.google.protobuf.ioneofdescriptorproto.md), `writer?`: *Writer*): *Writer*

Encodes the specified OneofDescriptorProto message, length delimited. Does not implicitly [verify](proto.google.protobuf.oneofdescriptorproto.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IOneofDescriptorProto*](../interfaces/proto.google.protobuf.ioneofdescriptorproto.md) | OneofDescriptorProto message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*OneofDescriptorProto*](proto.google.protobuf.oneofdescriptorproto.md)

Creates an OneofDescriptorProto message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*OneofDescriptorProto*](proto.google.protobuf.oneofdescriptorproto.md)

OneofDescriptorProto

___

### toObject

▸ `Static`**toObject**(`message`: [*OneofDescriptorProto*](proto.google.protobuf.oneofdescriptorproto.md), `options?`: IConversionOptions): *object*

Creates a plain object from an OneofDescriptorProto message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*OneofDescriptorProto*](proto.google.protobuf.oneofdescriptorproto.md) | OneofDescriptorProto   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an OneofDescriptorProto message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
