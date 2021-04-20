# Class: WorkflowExecutionFailedEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).WorkflowExecutionFailedEventAttributes

Represents a WorkflowExecutionFailedEventAttributes.

## Implements

* [*IWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionfailedeventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.workflowexecutionfailedeventattributes.md#constructor)

### Properties

- [failure](proto.temporal.api.history.v1.workflowexecutionfailedeventattributes.md#failure)
- [retryState](proto.temporal.api.history.v1.workflowexecutionfailedeventattributes.md#retrystate)
- [workflowTaskCompletedEventId](proto.temporal.api.history.v1.workflowexecutionfailedeventattributes.md#workflowtaskcompletedeventid)

### Methods

- [toJSON](proto.temporal.api.history.v1.workflowexecutionfailedeventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.workflowexecutionfailedeventattributes.md#create)
- [decode](proto.temporal.api.history.v1.workflowexecutionfailedeventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.workflowexecutionfailedeventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.workflowexecutionfailedeventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.workflowexecutionfailedeventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.workflowexecutionfailedeventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.workflowexecutionfailedeventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.workflowexecutionfailedeventattributes.md#verify)

## Constructors

### constructor

\+ **new WorkflowExecutionFailedEventAttributes**(`properties?`: [*IWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionfailedeventattributes.md)): [*WorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionfailedeventattributes.md)

Constructs a new WorkflowExecutionFailedEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionfailedeventattributes.md) |

**Returns:** [*WorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionfailedeventattributes.md)

## Properties

### failure

• `Optional` **failure**: *null* \| [*IFailure*](../interfaces/proto.temporal.api.failure.v1.ifailure.md)

WorkflowExecutionFailedEventAttributes failure.

Implementation of: [IWorkflowExecutionFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionfailedeventattributes.md).[failure](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionfailedeventattributes.md#failure)

___

### retryState

• **retryState**: [*RetryState*](../enums/proto.temporal.api.enums.v1.retrystate.md)

WorkflowExecutionFailedEventAttributes retryState.

Implementation of: [IWorkflowExecutionFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionfailedeventattributes.md).[retryState](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionfailedeventattributes.md#retrystate)

___

### workflowTaskCompletedEventId

• **workflowTaskCompletedEventId**: Long

WorkflowExecutionFailedEventAttributes workflowTaskCompletedEventId.

Implementation of: [IWorkflowExecutionFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionfailedeventattributes.md).[workflowTaskCompletedEventId](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionfailedeventattributes.md#workflowtaskcompletedeventid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this WorkflowExecutionFailedEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionfailedeventattributes.md)): [*WorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionfailedeventattributes.md)

Creates a new WorkflowExecutionFailedEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionfailedeventattributes.md) |

**Returns:** [*WorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionfailedeventattributes.md)

WorkflowExecutionFailedEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*WorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionfailedeventattributes.md)

Decodes a WorkflowExecutionFailedEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*WorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionfailedeventattributes.md)

WorkflowExecutionFailedEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*WorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionfailedeventattributes.md)

Decodes a WorkflowExecutionFailedEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*WorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionfailedeventattributes.md)

WorkflowExecutionFailedEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionfailedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowExecutionFailedEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.workflowexecutionfailedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionfailedeventattributes.md) | WorkflowExecutionFailedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionfailedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowExecutionFailedEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.workflowexecutionfailedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionfailedeventattributes.md) | WorkflowExecutionFailedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*WorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionfailedeventattributes.md)

Creates a WorkflowExecutionFailedEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*WorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionfailedeventattributes.md)

WorkflowExecutionFailedEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*WorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionfailedeventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a WorkflowExecutionFailedEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*WorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionfailedeventattributes.md) | WorkflowExecutionFailedEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a WorkflowExecutionFailedEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
