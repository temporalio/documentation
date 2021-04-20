# Class: TimerFiredEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).TimerFiredEventAttributes

Represents a TimerFiredEventAttributes.

## Implements

* [*ITimerFiredEventAttributes*](../interfaces/proto.temporal.api.history.v1.itimerfiredeventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.timerfiredeventattributes.md#constructor)

### Properties

- [startedEventId](proto.temporal.api.history.v1.timerfiredeventattributes.md#startedeventid)
- [timerId](proto.temporal.api.history.v1.timerfiredeventattributes.md#timerid)

### Methods

- [toJSON](proto.temporal.api.history.v1.timerfiredeventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.timerfiredeventattributes.md#create)
- [decode](proto.temporal.api.history.v1.timerfiredeventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.timerfiredeventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.timerfiredeventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.timerfiredeventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.timerfiredeventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.timerfiredeventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.timerfiredeventattributes.md#verify)

## Constructors

### constructor

\+ **new TimerFiredEventAttributes**(`properties?`: [*ITimerFiredEventAttributes*](../interfaces/proto.temporal.api.history.v1.itimerfiredeventattributes.md)): [*TimerFiredEventAttributes*](proto.temporal.api.history.v1.timerfiredeventattributes.md)

Constructs a new TimerFiredEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ITimerFiredEventAttributes*](../interfaces/proto.temporal.api.history.v1.itimerfiredeventattributes.md) |

**Returns:** [*TimerFiredEventAttributes*](proto.temporal.api.history.v1.timerfiredeventattributes.md)

## Properties

### startedEventId

• **startedEventId**: Long

TimerFiredEventAttributes startedEventId.

Implementation of: [ITimerFiredEventAttributes](../interfaces/proto.temporal.api.history.v1.itimerfiredeventattributes.md).[startedEventId](../interfaces/proto.temporal.api.history.v1.itimerfiredeventattributes.md#startedeventid)

___

### timerId

• **timerId**: *string*

TimerFiredEventAttributes timerId.

Implementation of: [ITimerFiredEventAttributes](../interfaces/proto.temporal.api.history.v1.itimerfiredeventattributes.md).[timerId](../interfaces/proto.temporal.api.history.v1.itimerfiredeventattributes.md#timerid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this TimerFiredEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ITimerFiredEventAttributes*](../interfaces/proto.temporal.api.history.v1.itimerfiredeventattributes.md)): [*TimerFiredEventAttributes*](proto.temporal.api.history.v1.timerfiredeventattributes.md)

Creates a new TimerFiredEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ITimerFiredEventAttributes*](../interfaces/proto.temporal.api.history.v1.itimerfiredeventattributes.md) |

**Returns:** [*TimerFiredEventAttributes*](proto.temporal.api.history.v1.timerfiredeventattributes.md)

TimerFiredEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*TimerFiredEventAttributes*](proto.temporal.api.history.v1.timerfiredeventattributes.md)

Decodes a TimerFiredEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*TimerFiredEventAttributes*](proto.temporal.api.history.v1.timerfiredeventattributes.md)

TimerFiredEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*TimerFiredEventAttributes*](proto.temporal.api.history.v1.timerfiredeventattributes.md)

Decodes a TimerFiredEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*TimerFiredEventAttributes*](proto.temporal.api.history.v1.timerfiredeventattributes.md)

TimerFiredEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*ITimerFiredEventAttributes*](../interfaces/proto.temporal.api.history.v1.itimerfiredeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified TimerFiredEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.timerfiredeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ITimerFiredEventAttributes*](../interfaces/proto.temporal.api.history.v1.itimerfiredeventattributes.md) | TimerFiredEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ITimerFiredEventAttributes*](../interfaces/proto.temporal.api.history.v1.itimerfiredeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified TimerFiredEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.timerfiredeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ITimerFiredEventAttributes*](../interfaces/proto.temporal.api.history.v1.itimerfiredeventattributes.md) | TimerFiredEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*TimerFiredEventAttributes*](proto.temporal.api.history.v1.timerfiredeventattributes.md)

Creates a TimerFiredEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*TimerFiredEventAttributes*](proto.temporal.api.history.v1.timerfiredeventattributes.md)

TimerFiredEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*TimerFiredEventAttributes*](proto.temporal.api.history.v1.timerfiredeventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a TimerFiredEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*TimerFiredEventAttributes*](proto.temporal.api.history.v1.timerfiredeventattributes.md) | TimerFiredEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a TimerFiredEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
