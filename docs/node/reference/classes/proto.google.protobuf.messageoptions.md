# Class: MessageOptions

[google](../modules/proto.google.md).[protobuf](../modules/proto.google.protobuf.md).MessageOptions

Represents a MessageOptions.

## Implements

* [*IMessageOptions*](../interfaces/proto.google.protobuf.imessageoptions.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.messageoptions.md#constructor)

### Properties

- [deprecated](proto.google.protobuf.messageoptions.md#deprecated)
- [mapEntry](proto.google.protobuf.messageoptions.md#mapentry)
- [messageSetWireFormat](proto.google.protobuf.messageoptions.md#messagesetwireformat)
- [noStandardDescriptorAccessor](proto.google.protobuf.messageoptions.md#nostandarddescriptoraccessor)
- [uninterpretedOption](proto.google.protobuf.messageoptions.md#uninterpretedoption)

### Methods

- [toJSON](proto.google.protobuf.messageoptions.md#tojson)
- [create](proto.google.protobuf.messageoptions.md#create)
- [decode](proto.google.protobuf.messageoptions.md#decode)
- [decodeDelimited](proto.google.protobuf.messageoptions.md#decodedelimited)
- [encode](proto.google.protobuf.messageoptions.md#encode)
- [encodeDelimited](proto.google.protobuf.messageoptions.md#encodedelimited)
- [fromObject](proto.google.protobuf.messageoptions.md#fromobject)
- [toObject](proto.google.protobuf.messageoptions.md#toobject)
- [verify](proto.google.protobuf.messageoptions.md#verify)

## Constructors

### constructor

\+ **new MessageOptions**(`properties?`: [*IMessageOptions*](../interfaces/proto.google.protobuf.imessageoptions.md)): [*MessageOptions*](proto.google.protobuf.messageoptions.md)

Constructs a new MessageOptions.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IMessageOptions*](../interfaces/proto.google.protobuf.imessageoptions.md) |

**Returns:** [*MessageOptions*](proto.google.protobuf.messageoptions.md)

## Properties

### deprecated

• **deprecated**: *boolean*

MessageOptions deprecated.

Implementation of: [IMessageOptions](../interfaces/proto.google.protobuf.imessageoptions.md).[deprecated](../interfaces/proto.google.protobuf.imessageoptions.md#deprecated)

___

### mapEntry

• **mapEntry**: *boolean*

MessageOptions mapEntry.

Implementation of: [IMessageOptions](../interfaces/proto.google.protobuf.imessageoptions.md).[mapEntry](../interfaces/proto.google.protobuf.imessageoptions.md#mapentry)

___

### messageSetWireFormat

• **messageSetWireFormat**: *boolean*

MessageOptions messageSetWireFormat.

Implementation of: [IMessageOptions](../interfaces/proto.google.protobuf.imessageoptions.md).[messageSetWireFormat](../interfaces/proto.google.protobuf.imessageoptions.md#messagesetwireformat)

___

### noStandardDescriptorAccessor

• **noStandardDescriptorAccessor**: *boolean*

MessageOptions noStandardDescriptorAccessor.

Implementation of: [IMessageOptions](../interfaces/proto.google.protobuf.imessageoptions.md).[noStandardDescriptorAccessor](../interfaces/proto.google.protobuf.imessageoptions.md#nostandarddescriptoraccessor)

___

### uninterpretedOption

• **uninterpretedOption**: [*IUninterpretedOption*](../interfaces/proto.google.protobuf.iuninterpretedoption.md)[]

MessageOptions uninterpretedOption.

Implementation of: [IMessageOptions](../interfaces/proto.google.protobuf.imessageoptions.md).[uninterpretedOption](../interfaces/proto.google.protobuf.imessageoptions.md#uninterpretedoption)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this MessageOptions to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IMessageOptions*](../interfaces/proto.google.protobuf.imessageoptions.md)): [*MessageOptions*](proto.google.protobuf.messageoptions.md)

Creates a new MessageOptions instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IMessageOptions*](../interfaces/proto.google.protobuf.imessageoptions.md) |

**Returns:** [*MessageOptions*](proto.google.protobuf.messageoptions.md)

MessageOptions instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*MessageOptions*](proto.google.protobuf.messageoptions.md)

Decodes a MessageOptions message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*MessageOptions*](proto.google.protobuf.messageoptions.md)

MessageOptions

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*MessageOptions*](proto.google.protobuf.messageoptions.md)

Decodes a MessageOptions message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*MessageOptions*](proto.google.protobuf.messageoptions.md)

MessageOptions

___

### encode

▸ `Static`**encode**(`message`: [*IMessageOptions*](../interfaces/proto.google.protobuf.imessageoptions.md), `writer?`: *Writer*): *Writer*

Encodes the specified MessageOptions message. Does not implicitly [verify](proto.google.protobuf.messageoptions.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IMessageOptions*](../interfaces/proto.google.protobuf.imessageoptions.md) | MessageOptions message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IMessageOptions*](../interfaces/proto.google.protobuf.imessageoptions.md), `writer?`: *Writer*): *Writer*

Encodes the specified MessageOptions message, length delimited. Does not implicitly [verify](proto.google.protobuf.messageoptions.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IMessageOptions*](../interfaces/proto.google.protobuf.imessageoptions.md) | MessageOptions message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*MessageOptions*](proto.google.protobuf.messageoptions.md)

Creates a MessageOptions message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*MessageOptions*](proto.google.protobuf.messageoptions.md)

MessageOptions

___

### toObject

▸ `Static`**toObject**(`message`: [*MessageOptions*](proto.google.protobuf.messageoptions.md), `options?`: IConversionOptions): *object*

Creates a plain object from a MessageOptions message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*MessageOptions*](proto.google.protobuf.messageoptions.md) | MessageOptions   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a MessageOptions message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
