# Class: CancelTimerCommandAttributes

[command](../modules/proto.temporal.api.command.md).[v1](../modules/proto.temporal.api.command.v1.md).CancelTimerCommandAttributes

Represents a CancelTimerCommandAttributes.

## Implements

* [*ICancelTimerCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icanceltimercommandattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.command.v1.canceltimercommandattributes.md#constructor)

### Properties

- [timerId](proto.temporal.api.command.v1.canceltimercommandattributes.md#timerid)

### Methods

- [toJSON](proto.temporal.api.command.v1.canceltimercommandattributes.md#tojson)
- [create](proto.temporal.api.command.v1.canceltimercommandattributes.md#create)
- [decode](proto.temporal.api.command.v1.canceltimercommandattributes.md#decode)
- [decodeDelimited](proto.temporal.api.command.v1.canceltimercommandattributes.md#decodedelimited)
- [encode](proto.temporal.api.command.v1.canceltimercommandattributes.md#encode)
- [encodeDelimited](proto.temporal.api.command.v1.canceltimercommandattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.command.v1.canceltimercommandattributes.md#fromobject)
- [toObject](proto.temporal.api.command.v1.canceltimercommandattributes.md#toobject)
- [verify](proto.temporal.api.command.v1.canceltimercommandattributes.md#verify)

## Constructors

### constructor

\+ **new CancelTimerCommandAttributes**(`properties?`: [*ICancelTimerCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icanceltimercommandattributes.md)): [*CancelTimerCommandAttributes*](proto.temporal.api.command.v1.canceltimercommandattributes.md)

Constructs a new CancelTimerCommandAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ICancelTimerCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icanceltimercommandattributes.md) |

**Returns:** [*CancelTimerCommandAttributes*](proto.temporal.api.command.v1.canceltimercommandattributes.md)

## Properties

### timerId

• **timerId**: *string*

CancelTimerCommandAttributes timerId.

Implementation of: [ICancelTimerCommandAttributes](../interfaces/proto.temporal.api.command.v1.icanceltimercommandattributes.md).[timerId](../interfaces/proto.temporal.api.command.v1.icanceltimercommandattributes.md#timerid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this CancelTimerCommandAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ICancelTimerCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icanceltimercommandattributes.md)): [*CancelTimerCommandAttributes*](proto.temporal.api.command.v1.canceltimercommandattributes.md)

Creates a new CancelTimerCommandAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ICancelTimerCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icanceltimercommandattributes.md) |

**Returns:** [*CancelTimerCommandAttributes*](proto.temporal.api.command.v1.canceltimercommandattributes.md)

CancelTimerCommandAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*CancelTimerCommandAttributes*](proto.temporal.api.command.v1.canceltimercommandattributes.md)

Decodes a CancelTimerCommandAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*CancelTimerCommandAttributes*](proto.temporal.api.command.v1.canceltimercommandattributes.md)

CancelTimerCommandAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*CancelTimerCommandAttributes*](proto.temporal.api.command.v1.canceltimercommandattributes.md)

Decodes a CancelTimerCommandAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*CancelTimerCommandAttributes*](proto.temporal.api.command.v1.canceltimercommandattributes.md)

CancelTimerCommandAttributes

___

### encode

▸ `Static`**encode**(`message`: [*ICancelTimerCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icanceltimercommandattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified CancelTimerCommandAttributes message. Does not implicitly [verify](proto.temporal.api.command.v1.canceltimercommandattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ICancelTimerCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icanceltimercommandattributes.md) | CancelTimerCommandAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ICancelTimerCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icanceltimercommandattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified CancelTimerCommandAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.command.v1.canceltimercommandattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ICancelTimerCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icanceltimercommandattributes.md) | CancelTimerCommandAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*CancelTimerCommandAttributes*](proto.temporal.api.command.v1.canceltimercommandattributes.md)

Creates a CancelTimerCommandAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*CancelTimerCommandAttributes*](proto.temporal.api.command.v1.canceltimercommandattributes.md)

CancelTimerCommandAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*CancelTimerCommandAttributes*](proto.temporal.api.command.v1.canceltimercommandattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a CancelTimerCommandAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*CancelTimerCommandAttributes*](proto.temporal.api.command.v1.canceltimercommandattributes.md) | CancelTimerCommandAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a CancelTimerCommandAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
