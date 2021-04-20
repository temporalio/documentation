# Class: StartTimerCommandAttributes

[command](../modules/proto.temporal.api.command.md).[v1](../modules/proto.temporal.api.command.v1.md).StartTimerCommandAttributes

Represents a StartTimerCommandAttributes.

## Implements

* [*IStartTimerCommandAttributes*](../interfaces/proto.temporal.api.command.v1.istarttimercommandattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.command.v1.starttimercommandattributes.md#constructor)

### Properties

- [startToFireTimeout](proto.temporal.api.command.v1.starttimercommandattributes.md#starttofiretimeout)
- [timerId](proto.temporal.api.command.v1.starttimercommandattributes.md#timerid)

### Methods

- [toJSON](proto.temporal.api.command.v1.starttimercommandattributes.md#tojson)
- [create](proto.temporal.api.command.v1.starttimercommandattributes.md#create)
- [decode](proto.temporal.api.command.v1.starttimercommandattributes.md#decode)
- [decodeDelimited](proto.temporal.api.command.v1.starttimercommandattributes.md#decodedelimited)
- [encode](proto.temporal.api.command.v1.starttimercommandattributes.md#encode)
- [encodeDelimited](proto.temporal.api.command.v1.starttimercommandattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.command.v1.starttimercommandattributes.md#fromobject)
- [toObject](proto.temporal.api.command.v1.starttimercommandattributes.md#toobject)
- [verify](proto.temporal.api.command.v1.starttimercommandattributes.md#verify)

## Constructors

### constructor

\+ **new StartTimerCommandAttributes**(`properties?`: [*IStartTimerCommandAttributes*](../interfaces/proto.temporal.api.command.v1.istarttimercommandattributes.md)): [*StartTimerCommandAttributes*](proto.temporal.api.command.v1.starttimercommandattributes.md)

Constructs a new StartTimerCommandAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IStartTimerCommandAttributes*](../interfaces/proto.temporal.api.command.v1.istarttimercommandattributes.md) |

**Returns:** [*StartTimerCommandAttributes*](proto.temporal.api.command.v1.starttimercommandattributes.md)

## Properties

### startToFireTimeout

• `Optional` **startToFireTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

StartTimerCommandAttributes startToFireTimeout.

Implementation of: [IStartTimerCommandAttributes](../interfaces/proto.temporal.api.command.v1.istarttimercommandattributes.md).[startToFireTimeout](../interfaces/proto.temporal.api.command.v1.istarttimercommandattributes.md#starttofiretimeout)

___

### timerId

• **timerId**: *string*

StartTimerCommandAttributes timerId.

Implementation of: [IStartTimerCommandAttributes](../interfaces/proto.temporal.api.command.v1.istarttimercommandattributes.md).[timerId](../interfaces/proto.temporal.api.command.v1.istarttimercommandattributes.md#timerid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this StartTimerCommandAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IStartTimerCommandAttributes*](../interfaces/proto.temporal.api.command.v1.istarttimercommandattributes.md)): [*StartTimerCommandAttributes*](proto.temporal.api.command.v1.starttimercommandattributes.md)

Creates a new StartTimerCommandAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IStartTimerCommandAttributes*](../interfaces/proto.temporal.api.command.v1.istarttimercommandattributes.md) |

**Returns:** [*StartTimerCommandAttributes*](proto.temporal.api.command.v1.starttimercommandattributes.md)

StartTimerCommandAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*StartTimerCommandAttributes*](proto.temporal.api.command.v1.starttimercommandattributes.md)

Decodes a StartTimerCommandAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*StartTimerCommandAttributes*](proto.temporal.api.command.v1.starttimercommandattributes.md)

StartTimerCommandAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*StartTimerCommandAttributes*](proto.temporal.api.command.v1.starttimercommandattributes.md)

Decodes a StartTimerCommandAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*StartTimerCommandAttributes*](proto.temporal.api.command.v1.starttimercommandattributes.md)

StartTimerCommandAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IStartTimerCommandAttributes*](../interfaces/proto.temporal.api.command.v1.istarttimercommandattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified StartTimerCommandAttributes message. Does not implicitly [verify](proto.temporal.api.command.v1.starttimercommandattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IStartTimerCommandAttributes*](../interfaces/proto.temporal.api.command.v1.istarttimercommandattributes.md) | StartTimerCommandAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IStartTimerCommandAttributes*](../interfaces/proto.temporal.api.command.v1.istarttimercommandattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified StartTimerCommandAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.command.v1.starttimercommandattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IStartTimerCommandAttributes*](../interfaces/proto.temporal.api.command.v1.istarttimercommandattributes.md) | StartTimerCommandAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*StartTimerCommandAttributes*](proto.temporal.api.command.v1.starttimercommandattributes.md)

Creates a StartTimerCommandAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*StartTimerCommandAttributes*](proto.temporal.api.command.v1.starttimercommandattributes.md)

StartTimerCommandAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*StartTimerCommandAttributes*](proto.temporal.api.command.v1.starttimercommandattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a StartTimerCommandAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*StartTimerCommandAttributes*](proto.temporal.api.command.v1.starttimercommandattributes.md) | StartTimerCommandAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a StartTimerCommandAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
