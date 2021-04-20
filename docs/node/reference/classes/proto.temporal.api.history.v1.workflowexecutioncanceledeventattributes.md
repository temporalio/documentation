# Class: WorkflowExecutionCanceledEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).WorkflowExecutionCanceledEventAttributes

Represents a WorkflowExecutionCanceledEventAttributes.

## Implements

* [*IWorkflowExecutionCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncanceledeventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.workflowexecutioncanceledeventattributes.md#constructor)

### Properties

- [details](proto.temporal.api.history.v1.workflowexecutioncanceledeventattributes.md#details)
- [workflowTaskCompletedEventId](proto.temporal.api.history.v1.workflowexecutioncanceledeventattributes.md#workflowtaskcompletedeventid)

### Methods

- [toJSON](proto.temporal.api.history.v1.workflowexecutioncanceledeventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.workflowexecutioncanceledeventattributes.md#create)
- [decode](proto.temporal.api.history.v1.workflowexecutioncanceledeventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.workflowexecutioncanceledeventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.workflowexecutioncanceledeventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.workflowexecutioncanceledeventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.workflowexecutioncanceledeventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.workflowexecutioncanceledeventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.workflowexecutioncanceledeventattributes.md#verify)

## Constructors

### constructor

\+ **new WorkflowExecutionCanceledEventAttributes**(`properties?`: [*IWorkflowExecutionCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncanceledeventattributes.md)): [*WorkflowExecutionCanceledEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncanceledeventattributes.md)

Constructs a new WorkflowExecutionCanceledEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowExecutionCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncanceledeventattributes.md) |

**Returns:** [*WorkflowExecutionCanceledEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncanceledeventattributes.md)

## Properties

### details

• `Optional` **details**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

WorkflowExecutionCanceledEventAttributes details.

Implementation of: [IWorkflowExecutionCanceledEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncanceledeventattributes.md).[details](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncanceledeventattributes.md#details)

___

### workflowTaskCompletedEventId

• **workflowTaskCompletedEventId**: Long

WorkflowExecutionCanceledEventAttributes workflowTaskCompletedEventId.

Implementation of: [IWorkflowExecutionCanceledEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncanceledeventattributes.md).[workflowTaskCompletedEventId](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncanceledeventattributes.md#workflowtaskcompletedeventid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this WorkflowExecutionCanceledEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IWorkflowExecutionCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncanceledeventattributes.md)): [*WorkflowExecutionCanceledEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncanceledeventattributes.md)

Creates a new WorkflowExecutionCanceledEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowExecutionCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncanceledeventattributes.md) |

**Returns:** [*WorkflowExecutionCanceledEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncanceledeventattributes.md)

WorkflowExecutionCanceledEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*WorkflowExecutionCanceledEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncanceledeventattributes.md)

Decodes a WorkflowExecutionCanceledEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*WorkflowExecutionCanceledEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncanceledeventattributes.md)

WorkflowExecutionCanceledEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*WorkflowExecutionCanceledEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncanceledeventattributes.md)

Decodes a WorkflowExecutionCanceledEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*WorkflowExecutionCanceledEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncanceledeventattributes.md)

WorkflowExecutionCanceledEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IWorkflowExecutionCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncanceledeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowExecutionCanceledEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.workflowexecutioncanceledeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowExecutionCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncanceledeventattributes.md) | WorkflowExecutionCanceledEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IWorkflowExecutionCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncanceledeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowExecutionCanceledEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.workflowexecutioncanceledeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowExecutionCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncanceledeventattributes.md) | WorkflowExecutionCanceledEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*WorkflowExecutionCanceledEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncanceledeventattributes.md)

Creates a WorkflowExecutionCanceledEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*WorkflowExecutionCanceledEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncanceledeventattributes.md)

WorkflowExecutionCanceledEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*WorkflowExecutionCanceledEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncanceledeventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a WorkflowExecutionCanceledEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*WorkflowExecutionCanceledEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncanceledeventattributes.md) | WorkflowExecutionCanceledEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a WorkflowExecutionCanceledEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
