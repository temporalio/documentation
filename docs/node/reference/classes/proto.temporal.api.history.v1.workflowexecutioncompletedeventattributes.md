# Class: WorkflowExecutionCompletedEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).WorkflowExecutionCompletedEventAttributes

Represents a WorkflowExecutionCompletedEventAttributes.

## Implements

* [*IWorkflowExecutionCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncompletedeventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.workflowexecutioncompletedeventattributes.md#constructor)

### Properties

- [result](proto.temporal.api.history.v1.workflowexecutioncompletedeventattributes.md#result)
- [workflowTaskCompletedEventId](proto.temporal.api.history.v1.workflowexecutioncompletedeventattributes.md#workflowtaskcompletedeventid)

### Methods

- [toJSON](proto.temporal.api.history.v1.workflowexecutioncompletedeventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.workflowexecutioncompletedeventattributes.md#create)
- [decode](proto.temporal.api.history.v1.workflowexecutioncompletedeventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.workflowexecutioncompletedeventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.workflowexecutioncompletedeventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.workflowexecutioncompletedeventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.workflowexecutioncompletedeventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.workflowexecutioncompletedeventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.workflowexecutioncompletedeventattributes.md#verify)

## Constructors

### constructor

\+ **new WorkflowExecutionCompletedEventAttributes**(`properties?`: [*IWorkflowExecutionCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncompletedeventattributes.md)): [*WorkflowExecutionCompletedEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncompletedeventattributes.md)

Constructs a new WorkflowExecutionCompletedEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowExecutionCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncompletedeventattributes.md) |

**Returns:** [*WorkflowExecutionCompletedEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncompletedeventattributes.md)

## Properties

### result

• `Optional` **result**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

WorkflowExecutionCompletedEventAttributes result.

Implementation of: [IWorkflowExecutionCompletedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncompletedeventattributes.md).[result](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncompletedeventattributes.md#result)

___

### workflowTaskCompletedEventId

• **workflowTaskCompletedEventId**: Long

WorkflowExecutionCompletedEventAttributes workflowTaskCompletedEventId.

Implementation of: [IWorkflowExecutionCompletedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncompletedeventattributes.md).[workflowTaskCompletedEventId](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncompletedeventattributes.md#workflowtaskcompletedeventid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this WorkflowExecutionCompletedEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IWorkflowExecutionCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncompletedeventattributes.md)): [*WorkflowExecutionCompletedEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncompletedeventattributes.md)

Creates a new WorkflowExecutionCompletedEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowExecutionCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncompletedeventattributes.md) |

**Returns:** [*WorkflowExecutionCompletedEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncompletedeventattributes.md)

WorkflowExecutionCompletedEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*WorkflowExecutionCompletedEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncompletedeventattributes.md)

Decodes a WorkflowExecutionCompletedEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*WorkflowExecutionCompletedEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncompletedeventattributes.md)

WorkflowExecutionCompletedEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*WorkflowExecutionCompletedEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncompletedeventattributes.md)

Decodes a WorkflowExecutionCompletedEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*WorkflowExecutionCompletedEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncompletedeventattributes.md)

WorkflowExecutionCompletedEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IWorkflowExecutionCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncompletedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowExecutionCompletedEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.workflowexecutioncompletedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowExecutionCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncompletedeventattributes.md) | WorkflowExecutionCompletedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IWorkflowExecutionCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncompletedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowExecutionCompletedEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.workflowexecutioncompletedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowExecutionCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncompletedeventattributes.md) | WorkflowExecutionCompletedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*WorkflowExecutionCompletedEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncompletedeventattributes.md)

Creates a WorkflowExecutionCompletedEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*WorkflowExecutionCompletedEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncompletedeventattributes.md)

WorkflowExecutionCompletedEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*WorkflowExecutionCompletedEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncompletedeventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a WorkflowExecutionCompletedEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*WorkflowExecutionCompletedEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncompletedeventattributes.md) | WorkflowExecutionCompletedEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a WorkflowExecutionCompletedEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
