# Class: WorkflowTaskScheduledEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).WorkflowTaskScheduledEventAttributes

Represents a WorkflowTaskScheduledEventAttributes.

## Implements

* [*IWorkflowTaskScheduledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskscheduledeventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.workflowtaskscheduledeventattributes.md#constructor)

### Properties

- [attempt](proto.temporal.api.history.v1.workflowtaskscheduledeventattributes.md#attempt)
- [startToCloseTimeout](proto.temporal.api.history.v1.workflowtaskscheduledeventattributes.md#starttoclosetimeout)
- [taskQueue](proto.temporal.api.history.v1.workflowtaskscheduledeventattributes.md#taskqueue)

### Methods

- [toJSON](proto.temporal.api.history.v1.workflowtaskscheduledeventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.workflowtaskscheduledeventattributes.md#create)
- [decode](proto.temporal.api.history.v1.workflowtaskscheduledeventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.workflowtaskscheduledeventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.workflowtaskscheduledeventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.workflowtaskscheduledeventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.workflowtaskscheduledeventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.workflowtaskscheduledeventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.workflowtaskscheduledeventattributes.md#verify)

## Constructors

### constructor

\+ **new WorkflowTaskScheduledEventAttributes**(`properties?`: [*IWorkflowTaskScheduledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskscheduledeventattributes.md)): [*WorkflowTaskScheduledEventAttributes*](proto.temporal.api.history.v1.workflowtaskscheduledeventattributes.md)

Constructs a new WorkflowTaskScheduledEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowTaskScheduledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskscheduledeventattributes.md) |

**Returns:** [*WorkflowTaskScheduledEventAttributes*](proto.temporal.api.history.v1.workflowtaskscheduledeventattributes.md)

## Properties

### attempt

• **attempt**: *number*

WorkflowTaskScheduledEventAttributes attempt.

Implementation of: [IWorkflowTaskScheduledEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowtaskscheduledeventattributes.md).[attempt](../interfaces/proto.temporal.api.history.v1.iworkflowtaskscheduledeventattributes.md#attempt)

___

### startToCloseTimeout

• `Optional` **startToCloseTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

WorkflowTaskScheduledEventAttributes startToCloseTimeout.

Implementation of: [IWorkflowTaskScheduledEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowtaskscheduledeventattributes.md).[startToCloseTimeout](../interfaces/proto.temporal.api.history.v1.iworkflowtaskscheduledeventattributes.md#starttoclosetimeout)

___

### taskQueue

• `Optional` **taskQueue**: *null* \| [*ITaskQueue*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueue.md)

WorkflowTaskScheduledEventAttributes taskQueue.

Implementation of: [IWorkflowTaskScheduledEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowtaskscheduledeventattributes.md).[taskQueue](../interfaces/proto.temporal.api.history.v1.iworkflowtaskscheduledeventattributes.md#taskqueue)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this WorkflowTaskScheduledEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IWorkflowTaskScheduledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskscheduledeventattributes.md)): [*WorkflowTaskScheduledEventAttributes*](proto.temporal.api.history.v1.workflowtaskscheduledeventattributes.md)

Creates a new WorkflowTaskScheduledEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowTaskScheduledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskscheduledeventattributes.md) |

**Returns:** [*WorkflowTaskScheduledEventAttributes*](proto.temporal.api.history.v1.workflowtaskscheduledeventattributes.md)

WorkflowTaskScheduledEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*WorkflowTaskScheduledEventAttributes*](proto.temporal.api.history.v1.workflowtaskscheduledeventattributes.md)

Decodes a WorkflowTaskScheduledEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*WorkflowTaskScheduledEventAttributes*](proto.temporal.api.history.v1.workflowtaskscheduledeventattributes.md)

WorkflowTaskScheduledEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*WorkflowTaskScheduledEventAttributes*](proto.temporal.api.history.v1.workflowtaskscheduledeventattributes.md)

Decodes a WorkflowTaskScheduledEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*WorkflowTaskScheduledEventAttributes*](proto.temporal.api.history.v1.workflowtaskscheduledeventattributes.md)

WorkflowTaskScheduledEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IWorkflowTaskScheduledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskscheduledeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowTaskScheduledEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.workflowtaskscheduledeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowTaskScheduledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskscheduledeventattributes.md) | WorkflowTaskScheduledEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IWorkflowTaskScheduledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskscheduledeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowTaskScheduledEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.workflowtaskscheduledeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowTaskScheduledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskscheduledeventattributes.md) | WorkflowTaskScheduledEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*WorkflowTaskScheduledEventAttributes*](proto.temporal.api.history.v1.workflowtaskscheduledeventattributes.md)

Creates a WorkflowTaskScheduledEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*WorkflowTaskScheduledEventAttributes*](proto.temporal.api.history.v1.workflowtaskscheduledeventattributes.md)

WorkflowTaskScheduledEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*WorkflowTaskScheduledEventAttributes*](proto.temporal.api.history.v1.workflowtaskscheduledeventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a WorkflowTaskScheduledEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*WorkflowTaskScheduledEventAttributes*](proto.temporal.api.history.v1.workflowtaskscheduledeventattributes.md) | WorkflowTaskScheduledEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a WorkflowTaskScheduledEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
