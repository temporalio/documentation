# Class: TimerCanceledEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).TimerCanceledEventAttributes

Represents a TimerCanceledEventAttributes.

## Implements

* [*ITimerCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.itimercanceledeventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.timercanceledeventattributes.md#constructor)

### Properties

- [identity](proto.temporal.api.history.v1.timercanceledeventattributes.md#identity)
- [startedEventId](proto.temporal.api.history.v1.timercanceledeventattributes.md#startedeventid)
- [timerId](proto.temporal.api.history.v1.timercanceledeventattributes.md#timerid)
- [workflowTaskCompletedEventId](proto.temporal.api.history.v1.timercanceledeventattributes.md#workflowtaskcompletedeventid)

### Methods

- [toJSON](proto.temporal.api.history.v1.timercanceledeventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.timercanceledeventattributes.md#create)
- [decode](proto.temporal.api.history.v1.timercanceledeventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.timercanceledeventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.timercanceledeventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.timercanceledeventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.timercanceledeventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.timercanceledeventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.timercanceledeventattributes.md#verify)

## Constructors

### constructor

\+ **new TimerCanceledEventAttributes**(`properties?`: [*ITimerCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.itimercanceledeventattributes.md)): [*TimerCanceledEventAttributes*](proto.temporal.api.history.v1.timercanceledeventattributes.md)

Constructs a new TimerCanceledEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ITimerCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.itimercanceledeventattributes.md) |

**Returns:** [*TimerCanceledEventAttributes*](proto.temporal.api.history.v1.timercanceledeventattributes.md)

## Properties

### identity

• **identity**: *string*

TimerCanceledEventAttributes identity.

Implementation of: [ITimerCanceledEventAttributes](../interfaces/proto.temporal.api.history.v1.itimercanceledeventattributes.md).[identity](../interfaces/proto.temporal.api.history.v1.itimercanceledeventattributes.md#identity)

___

### startedEventId

• **startedEventId**: Long

TimerCanceledEventAttributes startedEventId.

Implementation of: [ITimerCanceledEventAttributes](../interfaces/proto.temporal.api.history.v1.itimercanceledeventattributes.md).[startedEventId](../interfaces/proto.temporal.api.history.v1.itimercanceledeventattributes.md#startedeventid)

___

### timerId

• **timerId**: *string*

TimerCanceledEventAttributes timerId.

Implementation of: [ITimerCanceledEventAttributes](../interfaces/proto.temporal.api.history.v1.itimercanceledeventattributes.md).[timerId](../interfaces/proto.temporal.api.history.v1.itimercanceledeventattributes.md#timerid)

___

### workflowTaskCompletedEventId

• **workflowTaskCompletedEventId**: Long

TimerCanceledEventAttributes workflowTaskCompletedEventId.

Implementation of: [ITimerCanceledEventAttributes](../interfaces/proto.temporal.api.history.v1.itimercanceledeventattributes.md).[workflowTaskCompletedEventId](../interfaces/proto.temporal.api.history.v1.itimercanceledeventattributes.md#workflowtaskcompletedeventid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this TimerCanceledEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ITimerCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.itimercanceledeventattributes.md)): [*TimerCanceledEventAttributes*](proto.temporal.api.history.v1.timercanceledeventattributes.md)

Creates a new TimerCanceledEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ITimerCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.itimercanceledeventattributes.md) |

**Returns:** [*TimerCanceledEventAttributes*](proto.temporal.api.history.v1.timercanceledeventattributes.md)

TimerCanceledEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*TimerCanceledEventAttributes*](proto.temporal.api.history.v1.timercanceledeventattributes.md)

Decodes a TimerCanceledEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*TimerCanceledEventAttributes*](proto.temporal.api.history.v1.timercanceledeventattributes.md)

TimerCanceledEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*TimerCanceledEventAttributes*](proto.temporal.api.history.v1.timercanceledeventattributes.md)

Decodes a TimerCanceledEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*TimerCanceledEventAttributes*](proto.temporal.api.history.v1.timercanceledeventattributes.md)

TimerCanceledEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*ITimerCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.itimercanceledeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified TimerCanceledEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.timercanceledeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ITimerCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.itimercanceledeventattributes.md) | TimerCanceledEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ITimerCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.itimercanceledeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified TimerCanceledEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.timercanceledeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ITimerCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.itimercanceledeventattributes.md) | TimerCanceledEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*TimerCanceledEventAttributes*](proto.temporal.api.history.v1.timercanceledeventattributes.md)

Creates a TimerCanceledEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*TimerCanceledEventAttributes*](proto.temporal.api.history.v1.timercanceledeventattributes.md)

TimerCanceledEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*TimerCanceledEventAttributes*](proto.temporal.api.history.v1.timercanceledeventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a TimerCanceledEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*TimerCanceledEventAttributes*](proto.temporal.api.history.v1.timercanceledeventattributes.md) | TimerCanceledEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a TimerCanceledEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
