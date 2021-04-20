# Class: WorkflowExecutionTimedOutEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).WorkflowExecutionTimedOutEventAttributes

Represents a WorkflowExecutionTimedOutEventAttributes.

## Implements

* [*IWorkflowExecutionTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutiontimedouteventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.workflowexecutiontimedouteventattributes.md#constructor)

### Properties

- [retryState](proto.temporal.api.history.v1.workflowexecutiontimedouteventattributes.md#retrystate)

### Methods

- [toJSON](proto.temporal.api.history.v1.workflowexecutiontimedouteventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.workflowexecutiontimedouteventattributes.md#create)
- [decode](proto.temporal.api.history.v1.workflowexecutiontimedouteventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.workflowexecutiontimedouteventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.workflowexecutiontimedouteventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.workflowexecutiontimedouteventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.workflowexecutiontimedouteventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.workflowexecutiontimedouteventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.workflowexecutiontimedouteventattributes.md#verify)

## Constructors

### constructor

\+ **new WorkflowExecutionTimedOutEventAttributes**(`properties?`: [*IWorkflowExecutionTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutiontimedouteventattributes.md)): [*WorkflowExecutionTimedOutEventAttributes*](proto.temporal.api.history.v1.workflowexecutiontimedouteventattributes.md)

Constructs a new WorkflowExecutionTimedOutEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowExecutionTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutiontimedouteventattributes.md) |

**Returns:** [*WorkflowExecutionTimedOutEventAttributes*](proto.temporal.api.history.v1.workflowexecutiontimedouteventattributes.md)

## Properties

### retryState

• **retryState**: [*RetryState*](../enums/proto.temporal.api.enums.v1.retrystate.md)

WorkflowExecutionTimedOutEventAttributes retryState.

Implementation of: [IWorkflowExecutionTimedOutEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutiontimedouteventattributes.md).[retryState](../interfaces/proto.temporal.api.history.v1.iworkflowexecutiontimedouteventattributes.md#retrystate)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this WorkflowExecutionTimedOutEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IWorkflowExecutionTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutiontimedouteventattributes.md)): [*WorkflowExecutionTimedOutEventAttributes*](proto.temporal.api.history.v1.workflowexecutiontimedouteventattributes.md)

Creates a new WorkflowExecutionTimedOutEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowExecutionTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutiontimedouteventattributes.md) |

**Returns:** [*WorkflowExecutionTimedOutEventAttributes*](proto.temporal.api.history.v1.workflowexecutiontimedouteventattributes.md)

WorkflowExecutionTimedOutEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*WorkflowExecutionTimedOutEventAttributes*](proto.temporal.api.history.v1.workflowexecutiontimedouteventattributes.md)

Decodes a WorkflowExecutionTimedOutEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*WorkflowExecutionTimedOutEventAttributes*](proto.temporal.api.history.v1.workflowexecutiontimedouteventattributes.md)

WorkflowExecutionTimedOutEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*WorkflowExecutionTimedOutEventAttributes*](proto.temporal.api.history.v1.workflowexecutiontimedouteventattributes.md)

Decodes a WorkflowExecutionTimedOutEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*WorkflowExecutionTimedOutEventAttributes*](proto.temporal.api.history.v1.workflowexecutiontimedouteventattributes.md)

WorkflowExecutionTimedOutEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IWorkflowExecutionTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutiontimedouteventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowExecutionTimedOutEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.workflowexecutiontimedouteventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowExecutionTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutiontimedouteventattributes.md) | WorkflowExecutionTimedOutEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IWorkflowExecutionTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutiontimedouteventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowExecutionTimedOutEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.workflowexecutiontimedouteventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowExecutionTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutiontimedouteventattributes.md) | WorkflowExecutionTimedOutEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*WorkflowExecutionTimedOutEventAttributes*](proto.temporal.api.history.v1.workflowexecutiontimedouteventattributes.md)

Creates a WorkflowExecutionTimedOutEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*WorkflowExecutionTimedOutEventAttributes*](proto.temporal.api.history.v1.workflowexecutiontimedouteventattributes.md)

WorkflowExecutionTimedOutEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*WorkflowExecutionTimedOutEventAttributes*](proto.temporal.api.history.v1.workflowexecutiontimedouteventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a WorkflowExecutionTimedOutEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*WorkflowExecutionTimedOutEventAttributes*](proto.temporal.api.history.v1.workflowexecutiontimedouteventattributes.md) | WorkflowExecutionTimedOutEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a WorkflowExecutionTimedOutEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
