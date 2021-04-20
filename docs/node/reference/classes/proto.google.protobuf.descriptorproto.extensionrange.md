# Class: ExtensionRange

[protobuf](../modules/proto.google.protobuf.md).[DescriptorProto](../modules/proto.google.protobuf.descriptorproto.md).ExtensionRange

Represents an ExtensionRange.

## Implements

* [*IExtensionRange*](../interfaces/proto.google.protobuf.descriptorproto.iextensionrange.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.descriptorproto.extensionrange.md#constructor)

### Properties

- [end](proto.google.protobuf.descriptorproto.extensionrange.md#end)
- [start](proto.google.protobuf.descriptorproto.extensionrange.md#start)

### Methods

- [toJSON](proto.google.protobuf.descriptorproto.extensionrange.md#tojson)
- [create](proto.google.protobuf.descriptorproto.extensionrange.md#create)
- [decode](proto.google.protobuf.descriptorproto.extensionrange.md#decode)
- [decodeDelimited](proto.google.protobuf.descriptorproto.extensionrange.md#decodedelimited)
- [encode](proto.google.protobuf.descriptorproto.extensionrange.md#encode)
- [encodeDelimited](proto.google.protobuf.descriptorproto.extensionrange.md#encodedelimited)
- [fromObject](proto.google.protobuf.descriptorproto.extensionrange.md#fromobject)
- [toObject](proto.google.protobuf.descriptorproto.extensionrange.md#toobject)
- [verify](proto.google.protobuf.descriptorproto.extensionrange.md#verify)

## Constructors

### constructor

\+ **new ExtensionRange**(`properties?`: [*IExtensionRange*](../interfaces/proto.google.protobuf.descriptorproto.iextensionrange.md)): [*ExtensionRange*](proto.google.protobuf.descriptorproto.extensionrange.md)

Constructs a new ExtensionRange.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IExtensionRange*](../interfaces/proto.google.protobuf.descriptorproto.iextensionrange.md) |

**Returns:** [*ExtensionRange*](proto.google.protobuf.descriptorproto.extensionrange.md)

## Properties

### end

• **end**: *number*

ExtensionRange end.

Implementation of: [IExtensionRange](../interfaces/proto.google.protobuf.descriptorproto.iextensionrange.md).[end](../interfaces/proto.google.protobuf.descriptorproto.iextensionrange.md#end)

___

### start

• **start**: *number*

ExtensionRange start.

Implementation of: [IExtensionRange](../interfaces/proto.google.protobuf.descriptorproto.iextensionrange.md).[start](../interfaces/proto.google.protobuf.descriptorproto.iextensionrange.md#start)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ExtensionRange to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IExtensionRange*](../interfaces/proto.google.protobuf.descriptorproto.iextensionrange.md)): [*ExtensionRange*](proto.google.protobuf.descriptorproto.extensionrange.md)

Creates a new ExtensionRange instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IExtensionRange*](../interfaces/proto.google.protobuf.descriptorproto.iextensionrange.md) |

**Returns:** [*ExtensionRange*](proto.google.protobuf.descriptorproto.extensionrange.md)

ExtensionRange instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ExtensionRange*](proto.google.protobuf.descriptorproto.extensionrange.md)

Decodes an ExtensionRange message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ExtensionRange*](proto.google.protobuf.descriptorproto.extensionrange.md)

ExtensionRange

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ExtensionRange*](proto.google.protobuf.descriptorproto.extensionrange.md)

Decodes an ExtensionRange message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ExtensionRange*](proto.google.protobuf.descriptorproto.extensionrange.md)

ExtensionRange

___

### encode

▸ `Static`**encode**(`message`: [*IExtensionRange*](../interfaces/proto.google.protobuf.descriptorproto.iextensionrange.md), `writer?`: *Writer*): *Writer*

Encodes the specified ExtensionRange message. Does not implicitly [verify](proto.google.protobuf.descriptorproto.extensionrange.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IExtensionRange*](../interfaces/proto.google.protobuf.descriptorproto.iextensionrange.md) | ExtensionRange message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IExtensionRange*](../interfaces/proto.google.protobuf.descriptorproto.iextensionrange.md), `writer?`: *Writer*): *Writer*

Encodes the specified ExtensionRange message, length delimited. Does not implicitly [verify](proto.google.protobuf.descriptorproto.extensionrange.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IExtensionRange*](../interfaces/proto.google.protobuf.descriptorproto.iextensionrange.md) | ExtensionRange message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ExtensionRange*](proto.google.protobuf.descriptorproto.extensionrange.md)

Creates an ExtensionRange message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ExtensionRange*](proto.google.protobuf.descriptorproto.extensionrange.md)

ExtensionRange

___

### toObject

▸ `Static`**toObject**(`message`: [*ExtensionRange*](proto.google.protobuf.descriptorproto.extensionrange.md), `options?`: IConversionOptions): *object*

Creates a plain object from an ExtensionRange message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ExtensionRange*](proto.google.protobuf.descriptorproto.extensionrange.md) | ExtensionRange   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an ExtensionRange message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
