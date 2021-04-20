# Class: FieldOptions

[google](../modules/proto.google.md).[protobuf](../modules/proto.google.protobuf.md).FieldOptions

Represents a FieldOptions.

## Implements

* [*IFieldOptions*](../interfaces/proto.google.protobuf.ifieldoptions.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.fieldoptions-1.md#constructor)

### Properties

- [ctype](proto.google.protobuf.fieldoptions-1.md#ctype)
- [deprecated](proto.google.protobuf.fieldoptions-1.md#deprecated)
- [jstype](proto.google.protobuf.fieldoptions-1.md#jstype)
- [lazy](proto.google.protobuf.fieldoptions-1.md#lazy)
- [packed](proto.google.protobuf.fieldoptions-1.md#packed)
- [uninterpretedOption](proto.google.protobuf.fieldoptions-1.md#uninterpretedoption)
- [weak](proto.google.protobuf.fieldoptions-1.md#weak)

### Methods

- [toJSON](proto.google.protobuf.fieldoptions-1.md#tojson)
- [create](proto.google.protobuf.fieldoptions-1.md#create)
- [decode](proto.google.protobuf.fieldoptions-1.md#decode)
- [decodeDelimited](proto.google.protobuf.fieldoptions-1.md#decodedelimited)
- [encode](proto.google.protobuf.fieldoptions-1.md#encode)
- [encodeDelimited](proto.google.protobuf.fieldoptions-1.md#encodedelimited)
- [fromObject](proto.google.protobuf.fieldoptions-1.md#fromobject)
- [toObject](proto.google.protobuf.fieldoptions-1.md#toobject)
- [verify](proto.google.protobuf.fieldoptions-1.md#verify)

## Constructors

### constructor

\+ **new FieldOptions**(`properties?`: [*IFieldOptions*](../interfaces/proto.google.protobuf.ifieldoptions.md)): [*FieldOptions*](proto.google.protobuf.fieldoptions-1.md)

Constructs a new FieldOptions.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IFieldOptions*](../interfaces/proto.google.protobuf.ifieldoptions.md) |

**Returns:** [*FieldOptions*](proto.google.protobuf.fieldoptions-1.md)

## Properties

### ctype

• **ctype**: [*CType*](../enums/proto.google.protobuf.fieldoptions.ctype.md)

FieldOptions ctype.

Implementation of: [IFieldOptions](../interfaces/proto.google.protobuf.ifieldoptions.md).[ctype](../interfaces/proto.google.protobuf.ifieldoptions.md#ctype)

___

### deprecated

• **deprecated**: *boolean*

FieldOptions deprecated.

Implementation of: [IFieldOptions](../interfaces/proto.google.protobuf.ifieldoptions.md).[deprecated](../interfaces/proto.google.protobuf.ifieldoptions.md#deprecated)

___

### jstype

• **jstype**: [*JSType*](../enums/proto.google.protobuf.fieldoptions.jstype.md)

FieldOptions jstype.

Implementation of: [IFieldOptions](../interfaces/proto.google.protobuf.ifieldoptions.md).[jstype](../interfaces/proto.google.protobuf.ifieldoptions.md#jstype)

___

### lazy

• **lazy**: *boolean*

FieldOptions lazy.

Implementation of: [IFieldOptions](../interfaces/proto.google.protobuf.ifieldoptions.md).[lazy](../interfaces/proto.google.protobuf.ifieldoptions.md#lazy)

___

### packed

• **packed**: *boolean*

FieldOptions packed.

Implementation of: [IFieldOptions](../interfaces/proto.google.protobuf.ifieldoptions.md).[packed](../interfaces/proto.google.protobuf.ifieldoptions.md#packed)

___

### uninterpretedOption

• **uninterpretedOption**: [*IUninterpretedOption*](../interfaces/proto.google.protobuf.iuninterpretedoption.md)[]

FieldOptions uninterpretedOption.

Implementation of: [IFieldOptions](../interfaces/proto.google.protobuf.ifieldoptions.md).[uninterpretedOption](../interfaces/proto.google.protobuf.ifieldoptions.md#uninterpretedoption)

___

### weak

• **weak**: *boolean*

FieldOptions weak.

Implementation of: [IFieldOptions](../interfaces/proto.google.protobuf.ifieldoptions.md).[weak](../interfaces/proto.google.protobuf.ifieldoptions.md#weak)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this FieldOptions to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IFieldOptions*](../interfaces/proto.google.protobuf.ifieldoptions.md)): [*FieldOptions*](proto.google.protobuf.fieldoptions-1.md)

Creates a new FieldOptions instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IFieldOptions*](../interfaces/proto.google.protobuf.ifieldoptions.md) |

**Returns:** [*FieldOptions*](proto.google.protobuf.fieldoptions-1.md)

FieldOptions instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*FieldOptions*](proto.google.protobuf.fieldoptions-1.md)

Decodes a FieldOptions message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*FieldOptions*](proto.google.protobuf.fieldoptions-1.md)

FieldOptions

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*FieldOptions*](proto.google.protobuf.fieldoptions-1.md)

Decodes a FieldOptions message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*FieldOptions*](proto.google.protobuf.fieldoptions-1.md)

FieldOptions

___

### encode

▸ `Static`**encode**(`message`: [*IFieldOptions*](../interfaces/proto.google.protobuf.ifieldoptions.md), `writer?`: *Writer*): *Writer*

Encodes the specified FieldOptions message. Does not implicitly [verify](proto.google.protobuf.fieldoptions-1.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IFieldOptions*](../interfaces/proto.google.protobuf.ifieldoptions.md) | FieldOptions message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IFieldOptions*](../interfaces/proto.google.protobuf.ifieldoptions.md), `writer?`: *Writer*): *Writer*

Encodes the specified FieldOptions message, length delimited. Does not implicitly [verify](proto.google.protobuf.fieldoptions-1.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IFieldOptions*](../interfaces/proto.google.protobuf.ifieldoptions.md) | FieldOptions message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*FieldOptions*](proto.google.protobuf.fieldoptions-1.md)

Creates a FieldOptions message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*FieldOptions*](proto.google.protobuf.fieldoptions-1.md)

FieldOptions

___

### toObject

▸ `Static`**toObject**(`message`: [*FieldOptions*](proto.google.protobuf.fieldoptions-1.md), `options?`: IConversionOptions): *object*

Creates a plain object from a FieldOptions message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*FieldOptions*](proto.google.protobuf.fieldoptions-1.md) | FieldOptions   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a FieldOptions message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
