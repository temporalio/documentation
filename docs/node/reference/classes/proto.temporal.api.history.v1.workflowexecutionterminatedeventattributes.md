# Class: WorkflowExecutionTerminatedEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).WorkflowExecutionTerminatedEventAttributes

Represents a WorkflowExecutionTerminatedEventAttributes.

## Implements

* [*IWorkflowExecutionTerminatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionterminatedeventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.workflowexecutionterminatedeventattributes.md#constructor)

### Properties

- [details](proto.temporal.api.history.v1.workflowexecutionterminatedeventattributes.md#details)
- [identity](proto.temporal.api.history.v1.workflowexecutionterminatedeventattributes.md#identity)
- [reason](proto.temporal.api.history.v1.workflowexecutionterminatedeventattributes.md#reason)

### Methods

- [toJSON](proto.temporal.api.history.v1.workflowexecutionterminatedeventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.workflowexecutionterminatedeventattributes.md#create)
- [decode](proto.temporal.api.history.v1.workflowexecutionterminatedeventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.workflowexecutionterminatedeventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.workflowexecutionterminatedeventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.workflowexecutionterminatedeventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.workflowexecutionterminatedeventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.workflowexecutionterminatedeventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.workflowexecutionterminatedeventattributes.md#verify)

## Constructors

### constructor

\+ **new WorkflowExecutionTerminatedEventAttributes**(`properties?`: [*IWorkflowExecutionTerminatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionterminatedeventattributes.md)): [*WorkflowExecutionTerminatedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionterminatedeventattributes.md)

Constructs a new WorkflowExecutionTerminatedEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowExecutionTerminatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionterminatedeventattributes.md) |

**Returns:** [*WorkflowExecutionTerminatedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionterminatedeventattributes.md)

## Properties

### details

• `Optional` **details**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

WorkflowExecutionTerminatedEventAttributes details.

Implementation of: [IWorkflowExecutionTerminatedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionterminatedeventattributes.md).[details](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionterminatedeventattributes.md#details)

___

### identity

• **identity**: *string*

WorkflowExecutionTerminatedEventAttributes identity.

Implementation of: [IWorkflowExecutionTerminatedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionterminatedeventattributes.md).[identity](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionterminatedeventattributes.md#identity)

___

### reason

• **reason**: *string*

WorkflowExecutionTerminatedEventAttributes reason.

Implementation of: [IWorkflowExecutionTerminatedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionterminatedeventattributes.md).[reason](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionterminatedeventattributes.md#reason)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this WorkflowExecutionTerminatedEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IWorkflowExecutionTerminatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionterminatedeventattributes.md)): [*WorkflowExecutionTerminatedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionterminatedeventattributes.md)

Creates a new WorkflowExecutionTerminatedEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowExecutionTerminatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionterminatedeventattributes.md) |

**Returns:** [*WorkflowExecutionTerminatedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionterminatedeventattributes.md)

WorkflowExecutionTerminatedEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*WorkflowExecutionTerminatedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionterminatedeventattributes.md)

Decodes a WorkflowExecutionTerminatedEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*WorkflowExecutionTerminatedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionterminatedeventattributes.md)

WorkflowExecutionTerminatedEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*WorkflowExecutionTerminatedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionterminatedeventattributes.md)

Decodes a WorkflowExecutionTerminatedEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*WorkflowExecutionTerminatedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionterminatedeventattributes.md)

WorkflowExecutionTerminatedEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IWorkflowExecutionTerminatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionterminatedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowExecutionTerminatedEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.workflowexecutionterminatedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowExecutionTerminatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionterminatedeventattributes.md) | WorkflowExecutionTerminatedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IWorkflowExecutionTerminatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionterminatedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowExecutionTerminatedEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.workflowexecutionterminatedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowExecutionTerminatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionterminatedeventattributes.md) | WorkflowExecutionTerminatedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*WorkflowExecutionTerminatedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionterminatedeventattributes.md)

Creates a WorkflowExecutionTerminatedEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*WorkflowExecutionTerminatedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionterminatedeventattributes.md)

WorkflowExecutionTerminatedEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*WorkflowExecutionTerminatedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionterminatedeventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a WorkflowExecutionTerminatedEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*WorkflowExecutionTerminatedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionterminatedeventattributes.md) | WorkflowExecutionTerminatedEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a WorkflowExecutionTerminatedEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
