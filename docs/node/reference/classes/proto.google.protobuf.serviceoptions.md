# Class: ServiceOptions

[google](../modules/proto.google.md).[protobuf](../modules/proto.google.protobuf.md).ServiceOptions

Represents a ServiceOptions.

## Implements

* [*IServiceOptions*](../interfaces/proto.google.protobuf.iserviceoptions.md)

## Table of contents

### Constructors

- [constructor](proto.google.protobuf.serviceoptions.md#constructor)

### Properties

- [deprecated](proto.google.protobuf.serviceoptions.md#deprecated)
- [uninterpretedOption](proto.google.protobuf.serviceoptions.md#uninterpretedoption)

### Methods

- [toJSON](proto.google.protobuf.serviceoptions.md#tojson)
- [create](proto.google.protobuf.serviceoptions.md#create)
- [decode](proto.google.protobuf.serviceoptions.md#decode)
- [decodeDelimited](proto.google.protobuf.serviceoptions.md#decodedelimited)
- [encode](proto.google.protobuf.serviceoptions.md#encode)
- [encodeDelimited](proto.google.protobuf.serviceoptions.md#encodedelimited)
- [fromObject](proto.google.protobuf.serviceoptions.md#fromobject)
- [toObject](proto.google.protobuf.serviceoptions.md#toobject)
- [verify](proto.google.protobuf.serviceoptions.md#verify)

## Constructors

### constructor

\+ **new ServiceOptions**(`properties?`: [*IServiceOptions*](../interfaces/proto.google.protobuf.iserviceoptions.md)): [*ServiceOptions*](proto.google.protobuf.serviceoptions.md)

Constructs a new ServiceOptions.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IServiceOptions*](../interfaces/proto.google.protobuf.iserviceoptions.md) |

**Returns:** [*ServiceOptions*](proto.google.protobuf.serviceoptions.md)

## Properties

### deprecated

• **deprecated**: *boolean*

ServiceOptions deprecated.

Implementation of: [IServiceOptions](../interfaces/proto.google.protobuf.iserviceoptions.md).[deprecated](../interfaces/proto.google.protobuf.iserviceoptions.md#deprecated)

___

### uninterpretedOption

• **uninterpretedOption**: [*IUninterpretedOption*](../interfaces/proto.google.protobuf.iuninterpretedoption.md)[]

ServiceOptions uninterpretedOption.

Implementation of: [IServiceOptions](../interfaces/proto.google.protobuf.iserviceoptions.md).[uninterpretedOption](../interfaces/proto.google.protobuf.iserviceoptions.md#uninterpretedoption)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ServiceOptions to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IServiceOptions*](../interfaces/proto.google.protobuf.iserviceoptions.md)): [*ServiceOptions*](proto.google.protobuf.serviceoptions.md)

Creates a new ServiceOptions instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IServiceOptions*](../interfaces/proto.google.protobuf.iserviceoptions.md) |

**Returns:** [*ServiceOptions*](proto.google.protobuf.serviceoptions.md)

ServiceOptions instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ServiceOptions*](proto.google.protobuf.serviceoptions.md)

Decodes a ServiceOptions message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ServiceOptions*](proto.google.protobuf.serviceoptions.md)

ServiceOptions

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ServiceOptions*](proto.google.protobuf.serviceoptions.md)

Decodes a ServiceOptions message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ServiceOptions*](proto.google.protobuf.serviceoptions.md)

ServiceOptions

___

### encode

▸ `Static`**encode**(`message`: [*IServiceOptions*](../interfaces/proto.google.protobuf.iserviceoptions.md), `writer?`: *Writer*): *Writer*

Encodes the specified ServiceOptions message. Does not implicitly [verify](proto.google.protobuf.serviceoptions.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IServiceOptions*](../interfaces/proto.google.protobuf.iserviceoptions.md) | ServiceOptions message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IServiceOptions*](../interfaces/proto.google.protobuf.iserviceoptions.md), `writer?`: *Writer*): *Writer*

Encodes the specified ServiceOptions message, length delimited. Does not implicitly [verify](proto.google.protobuf.serviceoptions.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IServiceOptions*](../interfaces/proto.google.protobuf.iserviceoptions.md) | ServiceOptions message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ServiceOptions*](proto.google.protobuf.serviceoptions.md)

Creates a ServiceOptions message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ServiceOptions*](proto.google.protobuf.serviceoptions.md)

ServiceOptions

___

### toObject

▸ `Static`**toObject**(`message`: [*ServiceOptions*](proto.google.protobuf.serviceoptions.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ServiceOptions message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ServiceOptions*](proto.google.protobuf.serviceoptions.md) | ServiceOptions   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ServiceOptions message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
