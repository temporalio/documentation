# Class: TimerStartedEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).TimerStartedEventAttributes

Represents a TimerStartedEventAttributes.

## Implements

* [*ITimerStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.itimerstartedeventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.timerstartedeventattributes.md#constructor)

### Properties

- [startToFireTimeout](proto.temporal.api.history.v1.timerstartedeventattributes.md#starttofiretimeout)
- [timerId](proto.temporal.api.history.v1.timerstartedeventattributes.md#timerid)
- [workflowTaskCompletedEventId](proto.temporal.api.history.v1.timerstartedeventattributes.md#workflowtaskcompletedeventid)

### Methods

- [toJSON](proto.temporal.api.history.v1.timerstartedeventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.timerstartedeventattributes.md#create)
- [decode](proto.temporal.api.history.v1.timerstartedeventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.timerstartedeventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.timerstartedeventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.timerstartedeventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.timerstartedeventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.timerstartedeventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.timerstartedeventattributes.md#verify)

## Constructors

### constructor

\+ **new TimerStartedEventAttributes**(`properties?`: [*ITimerStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.itimerstartedeventattributes.md)): [*TimerStartedEventAttributes*](proto.temporal.api.history.v1.timerstartedeventattributes.md)

Constructs a new TimerStartedEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ITimerStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.itimerstartedeventattributes.md) |

**Returns:** [*TimerStartedEventAttributes*](proto.temporal.api.history.v1.timerstartedeventattributes.md)

## Properties

### startToFireTimeout

• `Optional` **startToFireTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

TimerStartedEventAttributes startToFireTimeout.

Implementation of: [ITimerStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.itimerstartedeventattributes.md).[startToFireTimeout](../interfaces/proto.temporal.api.history.v1.itimerstartedeventattributes.md#starttofiretimeout)

___

### timerId

• **timerId**: *string*

TimerStartedEventAttributes timerId.

Implementation of: [ITimerStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.itimerstartedeventattributes.md).[timerId](../interfaces/proto.temporal.api.history.v1.itimerstartedeventattributes.md#timerid)

___

### workflowTaskCompletedEventId

• **workflowTaskCompletedEventId**: Long

TimerStartedEventAttributes workflowTaskCompletedEventId.

Implementation of: [ITimerStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.itimerstartedeventattributes.md).[workflowTaskCompletedEventId](../interfaces/proto.temporal.api.history.v1.itimerstartedeventattributes.md#workflowtaskcompletedeventid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this TimerStartedEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ITimerStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.itimerstartedeventattributes.md)): [*TimerStartedEventAttributes*](proto.temporal.api.history.v1.timerstartedeventattributes.md)

Creates a new TimerStartedEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ITimerStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.itimerstartedeventattributes.md) |

**Returns:** [*TimerStartedEventAttributes*](proto.temporal.api.history.v1.timerstartedeventattributes.md)

TimerStartedEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*TimerStartedEventAttributes*](proto.temporal.api.history.v1.timerstartedeventattributes.md)

Decodes a TimerStartedEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*TimerStartedEventAttributes*](proto.temporal.api.history.v1.timerstartedeventattributes.md)

TimerStartedEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*TimerStartedEventAttributes*](proto.temporal.api.history.v1.timerstartedeventattributes.md)

Decodes a TimerStartedEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*TimerStartedEventAttributes*](proto.temporal.api.history.v1.timerstartedeventattributes.md)

TimerStartedEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*ITimerStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.itimerstartedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified TimerStartedEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.timerstartedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ITimerStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.itimerstartedeventattributes.md) | TimerStartedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ITimerStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.itimerstartedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified TimerStartedEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.timerstartedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ITimerStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.itimerstartedeventattributes.md) | TimerStartedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*TimerStartedEventAttributes*](proto.temporal.api.history.v1.timerstartedeventattributes.md)

Creates a TimerStartedEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*TimerStartedEventAttributes*](proto.temporal.api.history.v1.timerstartedeventattributes.md)

TimerStartedEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*TimerStartedEventAttributes*](proto.temporal.api.history.v1.timerstartedeventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a TimerStartedEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*TimerStartedEventAttributes*](proto.temporal.api.history.v1.timerstartedeventattributes.md) | TimerStartedEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a TimerStartedEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
