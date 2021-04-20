# Class: NamePart

[protobuf](../modules/proto.google.protobuf.md).[UninterpretedOption](../modules/proto.google.protobuf.uninterpretedoption.md).NamePart

Represents a NamePart.

## Implements

* [*INamePart*](../interfaces/proto.google.protobuf.uninterpretedoption.inamepart.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.uninterpretedoption.namepart.md#constructor)

### Properties

- [isExtension](proto.google.protobuf.uninterpretedoption.namepart.md#isextension)
- [namePart](proto.google.protobuf.uninterpretedoption.namepart.md#namepart)

### Methods

- [toJSON](proto.google.protobuf.uninterpretedoption.namepart.md#tojson)
- [create](proto.google.protobuf.uninterpretedoption.namepart.md#create)
- [decode](proto.google.protobuf.uninterpretedoption.namepart.md#decode)
- [decodeDelimited](proto.google.protobuf.uninterpretedoption.namepart.md#decodedelimited)
- [encode](proto.google.protobuf.uninterpretedoption.namepart.md#encode)
- [encodeDelimited](proto.google.protobuf.uninterpretedoption.namepart.md#encodedelimited)
- [fromObject](proto.google.protobuf.uninterpretedoption.namepart.md#fromobject)
- [toObject](proto.google.protobuf.uninterpretedoption.namepart.md#toobject)
- [verify](proto.google.protobuf.uninterpretedoption.namepart.md#verify)

## Constructors

### constructor

\+ **new NamePart**(`properties?`: [*INamePart*](../interfaces/proto.google.protobuf.uninterpretedoption.inamepart.md)): [*NamePart*](proto.google.protobuf.uninterpretedoption.namepart.md)

Constructs a new NamePart.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*INamePart*](../interfaces/proto.google.protobuf.uninterpretedoption.inamepart.md) |

**Returns:** [*NamePart*](proto.google.protobuf.uninterpretedoption.namepart.md)

## Properties

### isExtension

• **isExtension**: *boolean*

NamePart isExtension.

Implementation of: [INamePart](../interfaces/proto.google.protobuf.uninterpretedoption.inamepart.md).[isExtension](../interfaces/proto.google.protobuf.uninterpretedoption.inamepart.md#isextension)

___

### namePart

• **namePart**: *string*

NamePart namePart.

Implementation of: [INamePart](../interfaces/proto.google.protobuf.uninterpretedoption.inamepart.md).[namePart](../interfaces/proto.google.protobuf.uninterpretedoption.inamepart.md#namepart)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this NamePart to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*INamePart*](../interfaces/proto.google.protobuf.uninterpretedoption.inamepart.md)): [*NamePart*](proto.google.protobuf.uninterpretedoption.namepart.md)

Creates a new NamePart instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*INamePart*](../interfaces/proto.google.protobuf.uninterpretedoption.inamepart.md) |

**Returns:** [*NamePart*](proto.google.protobuf.uninterpretedoption.namepart.md)

NamePart instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*NamePart*](proto.google.protobuf.uninterpretedoption.namepart.md)

Decodes a NamePart message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*NamePart*](proto.google.protobuf.uninterpretedoption.namepart.md)

NamePart

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*NamePart*](proto.google.protobuf.uninterpretedoption.namepart.md)

Decodes a NamePart message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*NamePart*](proto.google.protobuf.uninterpretedoption.namepart.md)

NamePart

___

### encode

▸ `Static`**encode**(`message`: [*INamePart*](../interfaces/proto.google.protobuf.uninterpretedoption.inamepart.md), `writer?`: *Writer*): *Writer*

Encodes the specified NamePart message. Does not implicitly [verify](proto.google.protobuf.uninterpretedoption.namepart.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*INamePart*](../interfaces/proto.google.protobuf.uninterpretedoption.inamepart.md) | NamePart message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*INamePart*](../interfaces/proto.google.protobuf.uninterpretedoption.inamepart.md), `writer?`: *Writer*): *Writer*

Encodes the specified NamePart message, length delimited. Does not implicitly [verify](proto.google.protobuf.uninterpretedoption.namepart.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*INamePart*](../interfaces/proto.google.protobuf.uninterpretedoption.inamepart.md) | NamePart message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*NamePart*](proto.google.protobuf.uninterpretedoption.namepart.md)

Creates a NamePart message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*NamePart*](proto.google.protobuf.uninterpretedoption.namepart.md)

NamePart

___

### toObject

▸ `Static`**toObject**(`message`: [*NamePart*](proto.google.protobuf.uninterpretedoption.namepart.md), `options?`: IConversionOptions): *object*

Creates a plain object from a NamePart message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*NamePart*](proto.google.protobuf.uninterpretedoption.namepart.md) | NamePart   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a NamePart message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
