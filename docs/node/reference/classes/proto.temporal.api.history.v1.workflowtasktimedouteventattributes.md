# Class: WorkflowTaskTimedOutEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).WorkflowTaskTimedOutEventAttributes

Represents a WorkflowTaskTimedOutEventAttributes.

## Implements

* [*IWorkflowTaskTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtasktimedouteventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.workflowtasktimedouteventattributes.md#constructor)

### Properties

- [scheduledEventId](proto.temporal.api.history.v1.workflowtasktimedouteventattributes.md#scheduledeventid)
- [startedEventId](proto.temporal.api.history.v1.workflowtasktimedouteventattributes.md#startedeventid)
- [timeoutType](proto.temporal.api.history.v1.workflowtasktimedouteventattributes.md#timeouttype)

### Methods

- [toJSON](proto.temporal.api.history.v1.workflowtasktimedouteventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.workflowtasktimedouteventattributes.md#create)
- [decode](proto.temporal.api.history.v1.workflowtasktimedouteventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.workflowtasktimedouteventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.workflowtasktimedouteventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.workflowtasktimedouteventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.workflowtasktimedouteventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.workflowtasktimedouteventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.workflowtasktimedouteventattributes.md#verify)

## Constructors

### constructor

\+ **new WorkflowTaskTimedOutEventAttributes**(`properties?`: [*IWorkflowTaskTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtasktimedouteventattributes.md)): [*WorkflowTaskTimedOutEventAttributes*](proto.temporal.api.history.v1.workflowtasktimedouteventattributes.md)

Constructs a new WorkflowTaskTimedOutEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowTaskTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtasktimedouteventattributes.md) |

**Returns:** [*WorkflowTaskTimedOutEventAttributes*](proto.temporal.api.history.v1.workflowtasktimedouteventattributes.md)

## Properties

### scheduledEventId

• **scheduledEventId**: Long

WorkflowTaskTimedOutEventAttributes scheduledEventId.

Implementation of: [IWorkflowTaskTimedOutEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowtasktimedouteventattributes.md).[scheduledEventId](../interfaces/proto.temporal.api.history.v1.iworkflowtasktimedouteventattributes.md#scheduledeventid)

___

### startedEventId

• **startedEventId**: Long

WorkflowTaskTimedOutEventAttributes startedEventId.

Implementation of: [IWorkflowTaskTimedOutEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowtasktimedouteventattributes.md).[startedEventId](../interfaces/proto.temporal.api.history.v1.iworkflowtasktimedouteventattributes.md#startedeventid)

___

### timeoutType

• **timeoutType**: [*TimeoutType*](../enums/proto.temporal.api.enums.v1.timeouttype.md)

WorkflowTaskTimedOutEventAttributes timeoutType.

Implementation of: [IWorkflowTaskTimedOutEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowtasktimedouteventattributes.md).[timeoutType](../interfaces/proto.temporal.api.history.v1.iworkflowtasktimedouteventattributes.md#timeouttype)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this WorkflowTaskTimedOutEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IWorkflowTaskTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtasktimedouteventattributes.md)): [*WorkflowTaskTimedOutEventAttributes*](proto.temporal.api.history.v1.workflowtasktimedouteventattributes.md)

Creates a new WorkflowTaskTimedOutEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowTaskTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtasktimedouteventattributes.md) |

**Returns:** [*WorkflowTaskTimedOutEventAttributes*](proto.temporal.api.history.v1.workflowtasktimedouteventattributes.md)

WorkflowTaskTimedOutEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*WorkflowTaskTimedOutEventAttributes*](proto.temporal.api.history.v1.workflowtasktimedouteventattributes.md)

Decodes a WorkflowTaskTimedOutEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*WorkflowTaskTimedOutEventAttributes*](proto.temporal.api.history.v1.workflowtasktimedouteventattributes.md)

WorkflowTaskTimedOutEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*WorkflowTaskTimedOutEventAttributes*](proto.temporal.api.history.v1.workflowtasktimedouteventattributes.md)

Decodes a WorkflowTaskTimedOutEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*WorkflowTaskTimedOutEventAttributes*](proto.temporal.api.history.v1.workflowtasktimedouteventattributes.md)

WorkflowTaskTimedOutEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IWorkflowTaskTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtasktimedouteventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowTaskTimedOutEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.workflowtasktimedouteventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowTaskTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtasktimedouteventattributes.md) | WorkflowTaskTimedOutEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IWorkflowTaskTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtasktimedouteventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowTaskTimedOutEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.workflowtasktimedouteventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowTaskTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtasktimedouteventattributes.md) | WorkflowTaskTimedOutEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*WorkflowTaskTimedOutEventAttributes*](proto.temporal.api.history.v1.workflowtasktimedouteventattributes.md)

Creates a WorkflowTaskTimedOutEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*WorkflowTaskTimedOutEventAttributes*](proto.temporal.api.history.v1.workflowtasktimedouteventattributes.md)

WorkflowTaskTimedOutEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*WorkflowTaskTimedOutEventAttributes*](proto.temporal.api.history.v1.workflowtasktimedouteventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a WorkflowTaskTimedOutEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*WorkflowTaskTimedOutEventAttributes*](proto.temporal.api.history.v1.workflowtasktimedouteventattributes.md) | WorkflowTaskTimedOutEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a WorkflowTaskTimedOutEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
