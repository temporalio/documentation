# Class: WorkflowExecutionConfig

[workflow](../modules/proto.temporal.api.workflow.md).[v1](../modules/proto.temporal.api.workflow.v1.md).WorkflowExecutionConfig

Represents a WorkflowExecutionConfig.

## Implements

* [*IWorkflowExecutionConfig*](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutionconfig.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflow.v1.workflowexecutionconfig.md#constructor)

### Properties

- [defaultWorkflowTaskTimeout](proto.temporal.api.workflow.v1.workflowexecutionconfig.md#defaultworkflowtasktimeout)
- [taskQueue](proto.temporal.api.workflow.v1.workflowexecutionconfig.md#taskqueue)
- [workflowExecutionTimeout](proto.temporal.api.workflow.v1.workflowexecutionconfig.md#workflowexecutiontimeout)
- [workflowRunTimeout](proto.temporal.api.workflow.v1.workflowexecutionconfig.md#workflowruntimeout)

### Methods

- [toJSON](proto.temporal.api.workflow.v1.workflowexecutionconfig.md#tojson)
- [create](proto.temporal.api.workflow.v1.workflowexecutionconfig.md#create)
- [decode](proto.temporal.api.workflow.v1.workflowexecutionconfig.md#decode)
- [decodeDelimited](proto.temporal.api.workflow.v1.workflowexecutionconfig.md#decodedelimited)
- [encode](proto.temporal.api.workflow.v1.workflowexecutionconfig.md#encode)
- [encodeDelimited](proto.temporal.api.workflow.v1.workflowexecutionconfig.md#encodedelimited)
- [fromObject](proto.temporal.api.workflow.v1.workflowexecutionconfig.md#fromobject)
- [toObject](proto.temporal.api.workflow.v1.workflowexecutionconfig.md#toobject)
- [verify](proto.temporal.api.workflow.v1.workflowexecutionconfig.md#verify)

## Constructors

### constructor

\+ **new WorkflowExecutionConfig**(`properties?`: [*IWorkflowExecutionConfig*](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutionconfig.md)): [*WorkflowExecutionConfig*](proto.temporal.api.workflow.v1.workflowexecutionconfig.md)

Constructs a new WorkflowExecutionConfig.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowExecutionConfig*](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutionconfig.md) |

**Returns:** [*WorkflowExecutionConfig*](proto.temporal.api.workflow.v1.workflowexecutionconfig.md)

## Properties

### defaultWorkflowTaskTimeout

• `Optional` **defaultWorkflowTaskTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

WorkflowExecutionConfig defaultWorkflowTaskTimeout.

Implementation of: [IWorkflowExecutionConfig](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutionconfig.md).[defaultWorkflowTaskTimeout](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutionconfig.md#defaultworkflowtasktimeout)

___

### taskQueue

• `Optional` **taskQueue**: *null* \| [*ITaskQueue*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueue.md)

WorkflowExecutionConfig taskQueue.

Implementation of: [IWorkflowExecutionConfig](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutionconfig.md).[taskQueue](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutionconfig.md#taskqueue)

___

### workflowExecutionTimeout

• `Optional` **workflowExecutionTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

WorkflowExecutionConfig workflowExecutionTimeout.

Implementation of: [IWorkflowExecutionConfig](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutionconfig.md).[workflowExecutionTimeout](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutionconfig.md#workflowexecutiontimeout)

___

### workflowRunTimeout

• `Optional` **workflowRunTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

WorkflowExecutionConfig workflowRunTimeout.

Implementation of: [IWorkflowExecutionConfig](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutionconfig.md).[workflowRunTimeout](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutionconfig.md#workflowruntimeout)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this WorkflowExecutionConfig to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IWorkflowExecutionConfig*](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutionconfig.md)): [*WorkflowExecutionConfig*](proto.temporal.api.workflow.v1.workflowexecutionconfig.md)

Creates a new WorkflowExecutionConfig instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowExecutionConfig*](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutionconfig.md) |

**Returns:** [*WorkflowExecutionConfig*](proto.temporal.api.workflow.v1.workflowexecutionconfig.md)

WorkflowExecutionConfig instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*WorkflowExecutionConfig*](proto.temporal.api.workflow.v1.workflowexecutionconfig.md)

Decodes a WorkflowExecutionConfig message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*WorkflowExecutionConfig*](proto.temporal.api.workflow.v1.workflowexecutionconfig.md)

WorkflowExecutionConfig

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*WorkflowExecutionConfig*](proto.temporal.api.workflow.v1.workflowexecutionconfig.md)

Decodes a WorkflowExecutionConfig message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*WorkflowExecutionConfig*](proto.temporal.api.workflow.v1.workflowexecutionconfig.md)

WorkflowExecutionConfig

___

### encode

▸ `Static`**encode**(`message`: [*IWorkflowExecutionConfig*](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutionconfig.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowExecutionConfig message. Does not implicitly [verify](proto.temporal.api.workflow.v1.workflowexecutionconfig.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowExecutionConfig*](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutionconfig.md) | WorkflowExecutionConfig message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IWorkflowExecutionConfig*](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutionconfig.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowExecutionConfig message, length delimited. Does not implicitly [verify](proto.temporal.api.workflow.v1.workflowexecutionconfig.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowExecutionConfig*](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutionconfig.md) | WorkflowExecutionConfig message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*WorkflowExecutionConfig*](proto.temporal.api.workflow.v1.workflowexecutionconfig.md)

Creates a WorkflowExecutionConfig message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*WorkflowExecutionConfig*](proto.temporal.api.workflow.v1.workflowexecutionconfig.md)

WorkflowExecutionConfig

___

### toObject

▸ `Static`**toObject**(`message`: [*WorkflowExecutionConfig*](proto.temporal.api.workflow.v1.workflowexecutionconfig.md), `options?`: IConversionOptions): *object*

Creates a plain object from a WorkflowExecutionConfig message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*WorkflowExecutionConfig*](proto.temporal.api.workflow.v1.workflowexecutionconfig.md) | WorkflowExecutionConfig   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a WorkflowExecutionConfig message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
