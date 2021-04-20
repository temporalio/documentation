# Class: OneofOptions

[google](../modules/proto.google.md).[protobuf](../modules/proto.google.protobuf.md).OneofOptions

Represents an OneofOptions.

## Implements

* [*IOneofOptions*](../interfaces/proto.google.protobuf.ioneofoptions.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.oneofoptions.md#constructor)

### Properties

- [uninterpretedOption](proto.google.protobuf.oneofoptions.md#uninterpretedoption)

### Methods

- [toJSON](proto.google.protobuf.oneofoptions.md#tojson)
- [create](proto.google.protobuf.oneofoptions.md#create)
- [decode](proto.google.protobuf.oneofoptions.md#decode)
- [decodeDelimited](proto.google.protobuf.oneofoptions.md#decodedelimited)
- [encode](proto.google.protobuf.oneofoptions.md#encode)
- [encodeDelimited](proto.google.protobuf.oneofoptions.md#encodedelimited)
- [fromObject](proto.google.protobuf.oneofoptions.md#fromobject)
- [toObject](proto.google.protobuf.oneofoptions.md#toobject)
- [verify](proto.google.protobuf.oneofoptions.md#verify)

## Constructors

### constructor

\+ **new OneofOptions**(`properties?`: [*IOneofOptions*](../interfaces/proto.google.protobuf.ioneofoptions.md)): [*OneofOptions*](proto.google.protobuf.oneofoptions.md)

Constructs a new OneofOptions.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IOneofOptions*](../interfaces/proto.google.protobuf.ioneofoptions.md) |

**Returns:** [*OneofOptions*](proto.google.protobuf.oneofoptions.md)

## Properties

### uninterpretedOption

• **uninterpretedOption**: [*IUninterpretedOption*](../interfaces/proto.google.protobuf.iuninterpretedoption.md)[]

OneofOptions uninterpretedOption.

Implementation of: [IOneofOptions](../interfaces/proto.google.protobuf.ioneofoptions.md).[uninterpretedOption](../interfaces/proto.google.protobuf.ioneofoptions.md#uninterpretedoption)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this OneofOptions to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IOneofOptions*](../interfaces/proto.google.protobuf.ioneofoptions.md)): [*OneofOptions*](proto.google.protobuf.oneofoptions.md)

Creates a new OneofOptions instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IOneofOptions*](../interfaces/proto.google.protobuf.ioneofoptions.md) |

**Returns:** [*OneofOptions*](proto.google.protobuf.oneofoptions.md)

OneofOptions instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*OneofOptions*](proto.google.protobuf.oneofoptions.md)

Decodes an OneofOptions message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*OneofOptions*](proto.google.protobuf.oneofoptions.md)

OneofOptions

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*OneofOptions*](proto.google.protobuf.oneofoptions.md)

Decodes an OneofOptions message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*OneofOptions*](proto.google.protobuf.oneofoptions.md)

OneofOptions

___

### encode

▸ `Static`**encode**(`message`: [*IOneofOptions*](../interfaces/proto.google.protobuf.ioneofoptions.md), `writer?`: *Writer*): *Writer*

Encodes the specified OneofOptions message. Does not implicitly [verify](proto.google.protobuf.oneofoptions.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IOneofOptions*](../interfaces/proto.google.protobuf.ioneofoptions.md) | OneofOptions message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IOneofOptions*](../interfaces/proto.google.protobuf.ioneofoptions.md), `writer?`: *Writer*): *Writer*

Encodes the specified OneofOptions message, length delimited. Does not implicitly [verify](proto.google.protobuf.oneofoptions.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IOneofOptions*](../interfaces/proto.google.protobuf.ioneofoptions.md) | OneofOptions message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*OneofOptions*](proto.google.protobuf.oneofoptions.md)

Creates an OneofOptions message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*OneofOptions*](proto.google.protobuf.oneofoptions.md)

OneofOptions

___

### toObject

▸ `Static`**toObject**(`message`: [*OneofOptions*](proto.google.protobuf.oneofoptions.md), `options?`: IConversionOptions): *object*

Creates a plain object from an OneofOptions message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*OneofOptions*](proto.google.protobuf.oneofoptions.md) | OneofOptions   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an OneofOptions message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
