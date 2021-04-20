# Class: WorkflowExecutionCancelRequestedEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).WorkflowExecutionCancelRequestedEventAttributes

Represents a WorkflowExecutionCancelRequestedEventAttributes.

## Implements

* [*IWorkflowExecutionCancelRequestedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncancelrequestedeventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.workflowexecutioncancelrequestedeventattributes.md#constructor)

### Properties

- [cause](proto.temporal.api.history.v1.workflowexecutioncancelrequestedeventattributes.md#cause)
- [externalInitiatedEventId](proto.temporal.api.history.v1.workflowexecutioncancelrequestedeventattributes.md#externalinitiatedeventid)
- [externalWorkflowExecution](proto.temporal.api.history.v1.workflowexecutioncancelrequestedeventattributes.md#externalworkflowexecution)
- [identity](proto.temporal.api.history.v1.workflowexecutioncancelrequestedeventattributes.md#identity)

### Methods

- [toJSON](proto.temporal.api.history.v1.workflowexecutioncancelrequestedeventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.workflowexecutioncancelrequestedeventattributes.md#create)
- [decode](proto.temporal.api.history.v1.workflowexecutioncancelrequestedeventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.workflowexecutioncancelrequestedeventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.workflowexecutioncancelrequestedeventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.workflowexecutioncancelrequestedeventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.workflowexecutioncancelrequestedeventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.workflowexecutioncancelrequestedeventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.workflowexecutioncancelrequestedeventattributes.md#verify)

## Constructors

### constructor

\+ **new WorkflowExecutionCancelRequestedEventAttributes**(`properties?`: [*IWorkflowExecutionCancelRequestedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncancelrequestedeventattributes.md)): [*WorkflowExecutionCancelRequestedEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncancelrequestedeventattributes.md)

Constructs a new WorkflowExecutionCancelRequestedEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowExecutionCancelRequestedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncancelrequestedeventattributes.md) |

**Returns:** [*WorkflowExecutionCancelRequestedEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncancelrequestedeventattributes.md)

## Properties

### cause

• **cause**: *string*

WorkflowExecutionCancelRequestedEventAttributes cause.

Implementation of: [IWorkflowExecutionCancelRequestedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncancelrequestedeventattributes.md).[cause](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncancelrequestedeventattributes.md#cause)

___

### externalInitiatedEventId

• **externalInitiatedEventId**: Long

WorkflowExecutionCancelRequestedEventAttributes externalInitiatedEventId.

Implementation of: [IWorkflowExecutionCancelRequestedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncancelrequestedeventattributes.md).[externalInitiatedEventId](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncancelrequestedeventattributes.md#externalinitiatedeventid)

___

### externalWorkflowExecution

• `Optional` **externalWorkflowExecution**: *null* \| [*IWorkflowExecution*](../interfaces/proto.temporal.api.common.v1.iworkflowexecution.md)

WorkflowExecutionCancelRequestedEventAttributes externalWorkflowExecution.

Implementation of: [IWorkflowExecutionCancelRequestedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncancelrequestedeventattributes.md).[externalWorkflowExecution](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncancelrequestedeventattributes.md#externalworkflowexecution)

___

### identity

• **identity**: *string*

WorkflowExecutionCancelRequestedEventAttributes identity.

Implementation of: [IWorkflowExecutionCancelRequestedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncancelrequestedeventattributes.md).[identity](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncancelrequestedeventattributes.md#identity)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this WorkflowExecutionCancelRequestedEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IWorkflowExecutionCancelRequestedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncancelrequestedeventattributes.md)): [*WorkflowExecutionCancelRequestedEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncancelrequestedeventattributes.md)

Creates a new WorkflowExecutionCancelRequestedEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowExecutionCancelRequestedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncancelrequestedeventattributes.md) |

**Returns:** [*WorkflowExecutionCancelRequestedEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncancelrequestedeventattributes.md)

WorkflowExecutionCancelRequestedEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*WorkflowExecutionCancelRequestedEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncancelrequestedeventattributes.md)

Decodes a WorkflowExecutionCancelRequestedEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*WorkflowExecutionCancelRequestedEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncancelrequestedeventattributes.md)

WorkflowExecutionCancelRequestedEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*WorkflowExecutionCancelRequestedEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncancelrequestedeventattributes.md)

Decodes a WorkflowExecutionCancelRequestedEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*WorkflowExecutionCancelRequestedEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncancelrequestedeventattributes.md)

WorkflowExecutionCancelRequestedEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IWorkflowExecutionCancelRequestedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncancelrequestedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowExecutionCancelRequestedEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.workflowexecutioncancelrequestedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowExecutionCancelRequestedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncancelrequestedeventattributes.md) | WorkflowExecutionCancelRequestedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IWorkflowExecutionCancelRequestedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncancelrequestedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowExecutionCancelRequestedEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.workflowexecutioncancelrequestedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowExecutionCancelRequestedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncancelrequestedeventattributes.md) | WorkflowExecutionCancelRequestedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*WorkflowExecutionCancelRequestedEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncancelrequestedeventattributes.md)

Creates a WorkflowExecutionCancelRequestedEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*WorkflowExecutionCancelRequestedEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncancelrequestedeventattributes.md)

WorkflowExecutionCancelRequestedEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*WorkflowExecutionCancelRequestedEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncancelrequestedeventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a WorkflowExecutionCancelRequestedEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*WorkflowExecutionCancelRequestedEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncancelrequestedeventattributes.md) | WorkflowExecutionCancelRequestedEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a WorkflowExecutionCancelRequestedEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
