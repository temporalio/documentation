# Class: UninterpretedOption

[google](../modules/proto.google.md).[protobuf](../modules/proto.google.protobuf.md).UninterpretedOption

Represents an UninterpretedOption.

## Implements

* [*IUninterpretedOption*](../interfaces/proto.google.protobuf.iuninterpretedoption.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.uninterpretedoption-1.md#constructor)

### Properties

- [aggregateValue](proto.google.protobuf.uninterpretedoption-1.md#aggregatevalue)
- [doubleValue](proto.google.protobuf.uninterpretedoption-1.md#doublevalue)
- [identifierValue](proto.google.protobuf.uninterpretedoption-1.md#identifiervalue)
- [name](proto.google.protobuf.uninterpretedoption-1.md#name)
- [negativeIntValue](proto.google.protobuf.uninterpretedoption-1.md#negativeintvalue)
- [positiveIntValue](proto.google.protobuf.uninterpretedoption-1.md#positiveintvalue)
- [stringValue](proto.google.protobuf.uninterpretedoption-1.md#stringvalue)

### Methods

- [toJSON](proto.google.protobuf.uninterpretedoption-1.md#tojson)
- [create](proto.google.protobuf.uninterpretedoption-1.md#create)
- [decode](proto.google.protobuf.uninterpretedoption-1.md#decode)
- [decodeDelimited](proto.google.protobuf.uninterpretedoption-1.md#decodedelimited)
- [encode](proto.google.protobuf.uninterpretedoption-1.md#encode)
- [encodeDelimited](proto.google.protobuf.uninterpretedoption-1.md#encodedelimited)
- [fromObject](proto.google.protobuf.uninterpretedoption-1.md#fromobject)
- [toObject](proto.google.protobuf.uninterpretedoption-1.md#toobject)
- [verify](proto.google.protobuf.uninterpretedoption-1.md#verify)

## Constructors

### constructor

\+ **new UninterpretedOption**(`properties?`: [*IUninterpretedOption*](../interfaces/proto.google.protobuf.iuninterpretedoption.md)): [*UninterpretedOption*](proto.google.protobuf.uninterpretedoption-1.md)

Constructs a new UninterpretedOption.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IUninterpretedOption*](../interfaces/proto.google.protobuf.iuninterpretedoption.md) |

**Returns:** [*UninterpretedOption*](proto.google.protobuf.uninterpretedoption-1.md)

## Properties

### aggregateValue

• **aggregateValue**: *string*

UninterpretedOption aggregateValue.

Implementation of: [IUninterpretedOption](../interfaces/proto.google.protobuf.iuninterpretedoption.md).[aggregateValue](../interfaces/proto.google.protobuf.iuninterpretedoption.md#aggregatevalue)

___

### doubleValue

• **doubleValue**: *number*

UninterpretedOption doubleValue.

Implementation of: [IUninterpretedOption](../interfaces/proto.google.protobuf.iuninterpretedoption.md).[doubleValue](../interfaces/proto.google.protobuf.iuninterpretedoption.md#doublevalue)

___

### identifierValue

• **identifierValue**: *string*

UninterpretedOption identifierValue.

Implementation of: [IUninterpretedOption](../interfaces/proto.google.protobuf.iuninterpretedoption.md).[identifierValue](../interfaces/proto.google.protobuf.iuninterpretedoption.md#identifiervalue)

___

### name

• **name**: [*INamePart*](../interfaces/proto.google.protobuf.uninterpretedoption.inamepart.md)[]

UninterpretedOption name.

Implementation of: [IUninterpretedOption](../interfaces/proto.google.protobuf.iuninterpretedoption.md).[name](../interfaces/proto.google.protobuf.iuninterpretedoption.md#name)

___

### negativeIntValue

• **negativeIntValue**: Long

UninterpretedOption negativeIntValue.

Implementation of: [IUninterpretedOption](../interfaces/proto.google.protobuf.iuninterpretedoption.md).[negativeIntValue](../interfaces/proto.google.protobuf.iuninterpretedoption.md#negativeintvalue)

___

### positiveIntValue

• **positiveIntValue**: Long

UninterpretedOption positiveIntValue.

Implementation of: [IUninterpretedOption](../interfaces/proto.google.protobuf.iuninterpretedoption.md).[positiveIntValue](../interfaces/proto.google.protobuf.iuninterpretedoption.md#positiveintvalue)

___

### stringValue

• **stringValue**: *Uint8Array*

UninterpretedOption stringValue.

Implementation of: [IUninterpretedOption](../interfaces/proto.google.protobuf.iuninterpretedoption.md).[stringValue](../interfaces/proto.google.protobuf.iuninterpretedoption.md#stringvalue)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this UninterpretedOption to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IUninterpretedOption*](../interfaces/proto.google.protobuf.iuninterpretedoption.md)): [*UninterpretedOption*](proto.google.protobuf.uninterpretedoption-1.md)

Creates a new UninterpretedOption instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IUninterpretedOption*](../interfaces/proto.google.protobuf.iuninterpretedoption.md) |

**Returns:** [*UninterpretedOption*](proto.google.protobuf.uninterpretedoption-1.md)

UninterpretedOption instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*UninterpretedOption*](proto.google.protobuf.uninterpretedoption-1.md)

Decodes an UninterpretedOption message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*UninterpretedOption*](proto.google.protobuf.uninterpretedoption-1.md)

UninterpretedOption

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*UninterpretedOption*](proto.google.protobuf.uninterpretedoption-1.md)

Decodes an UninterpretedOption message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*UninterpretedOption*](proto.google.protobuf.uninterpretedoption-1.md)

UninterpretedOption

___

### encode

▸ `Static`**encode**(`message`: [*IUninterpretedOption*](../interfaces/proto.google.protobuf.iuninterpretedoption.md), `writer?`: *Writer*): *Writer*

Encodes the specified UninterpretedOption message. Does not implicitly [verify](proto.google.protobuf.uninterpretedoption-1.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IUninterpretedOption*](../interfaces/proto.google.protobuf.iuninterpretedoption.md) | UninterpretedOption message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IUninterpretedOption*](../interfaces/proto.google.protobuf.iuninterpretedoption.md), `writer?`: *Writer*): *Writer*

Encodes the specified UninterpretedOption message, length delimited. Does not implicitly [verify](proto.google.protobuf.uninterpretedoption-1.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IUninterpretedOption*](../interfaces/proto.google.protobuf.iuninterpretedoption.md) | UninterpretedOption message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*UninterpretedOption*](proto.google.protobuf.uninterpretedoption-1.md)

Creates an UninterpretedOption message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*UninterpretedOption*](proto.google.protobuf.uninterpretedoption-1.md)

UninterpretedOption

___

### toObject

▸ `Static`**toObject**(`message`: [*UninterpretedOption*](proto.google.protobuf.uninterpretedoption-1.md), `options?`: IConversionOptions): *object*

Creates a plain object from an UninterpretedOption message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*UninterpretedOption*](proto.google.protobuf.uninterpretedoption-1.md) | UninterpretedOption   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an UninterpretedOption message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
