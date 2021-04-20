# Class: MethodOptions

[google](../modules/proto.google.md).[protobuf](../modules/proto.google.protobuf.md).MethodOptions

Represents a MethodOptions.

## Implements

* [*IMethodOptions*](../interfaces/proto.google.protobuf.imethodoptions.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.methodoptions.md#constructor)

### Properties

- [deprecated](proto.google.protobuf.methodoptions.md#deprecated)
- [uninterpretedOption](proto.google.protobuf.methodoptions.md#uninterpretedoption)

### Methods

- [toJSON](proto.google.protobuf.methodoptions.md#tojson)
- [create](proto.google.protobuf.methodoptions.md#create)
- [decode](proto.google.protobuf.methodoptions.md#decode)
- [decodeDelimited](proto.google.protobuf.methodoptions.md#decodedelimited)
- [encode](proto.google.protobuf.methodoptions.md#encode)
- [encodeDelimited](proto.google.protobuf.methodoptions.md#encodedelimited)
- [fromObject](proto.google.protobuf.methodoptions.md#fromobject)
- [toObject](proto.google.protobuf.methodoptions.md#toobject)
- [verify](proto.google.protobuf.methodoptions.md#verify)

## Constructors

### constructor

\+ **new MethodOptions**(`properties?`: [*IMethodOptions*](../interfaces/proto.google.protobuf.imethodoptions.md)): [*MethodOptions*](proto.google.protobuf.methodoptions.md)

Constructs a new MethodOptions.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IMethodOptions*](../interfaces/proto.google.protobuf.imethodoptions.md) |

**Returns:** [*MethodOptions*](proto.google.protobuf.methodoptions.md)

## Properties

### deprecated

• **deprecated**: *boolean*

MethodOptions deprecated.

Implementation of: [IMethodOptions](../interfaces/proto.google.protobuf.imethodoptions.md).[deprecated](../interfaces/proto.google.protobuf.imethodoptions.md#deprecated)

___

### uninterpretedOption

• **uninterpretedOption**: [*IUninterpretedOption*](../interfaces/proto.google.protobuf.iuninterpretedoption.md)[]

MethodOptions uninterpretedOption.

Implementation of: [IMethodOptions](../interfaces/proto.google.protobuf.imethodoptions.md).[uninterpretedOption](../interfaces/proto.google.protobuf.imethodoptions.md#uninterpretedoption)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this MethodOptions to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IMethodOptions*](../interfaces/proto.google.protobuf.imethodoptions.md)): [*MethodOptions*](proto.google.protobuf.methodoptions.md)

Creates a new MethodOptions instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IMethodOptions*](../interfaces/proto.google.protobuf.imethodoptions.md) |

**Returns:** [*MethodOptions*](proto.google.protobuf.methodoptions.md)

MethodOptions instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*MethodOptions*](proto.google.protobuf.methodoptions.md)

Decodes a MethodOptions message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*MethodOptions*](proto.google.protobuf.methodoptions.md)

MethodOptions

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*MethodOptions*](proto.google.protobuf.methodoptions.md)

Decodes a MethodOptions message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*MethodOptions*](proto.google.protobuf.methodoptions.md)

MethodOptions

___

### encode

▸ `Static`**encode**(`message`: [*IMethodOptions*](../interfaces/proto.google.protobuf.imethodoptions.md), `writer?`: *Writer*): *Writer*

Encodes the specified MethodOptions message. Does not implicitly [verify](proto.google.protobuf.methodoptions.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IMethodOptions*](../interfaces/proto.google.protobuf.imethodoptions.md) | MethodOptions message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IMethodOptions*](../interfaces/proto.google.protobuf.imethodoptions.md), `writer?`: *Writer*): *Writer*

Encodes the specified MethodOptions message, length delimited. Does not implicitly [verify](proto.google.protobuf.methodoptions.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IMethodOptions*](../interfaces/proto.google.protobuf.imethodoptions.md) | MethodOptions message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*MethodOptions*](proto.google.protobuf.methodoptions.md)

Creates a MethodOptions message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*MethodOptions*](proto.google.protobuf.methodoptions.md)

MethodOptions

___

### toObject

▸ `Static`**toObject**(`message`: [*MethodOptions*](proto.google.protobuf.methodoptions.md), `options?`: IConversionOptions): *object*

Creates a plain object from a MethodOptions message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*MethodOptions*](proto.google.protobuf.methodoptions.md) | MethodOptions   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a MethodOptions message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
