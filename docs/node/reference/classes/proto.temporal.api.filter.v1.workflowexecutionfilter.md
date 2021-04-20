# Class: WorkflowExecutionFilter

[filter](../modules/proto.temporal.api.filter.md).[v1](../modules/proto.temporal.api.filter.v1.md).WorkflowExecutionFilter

Represents a WorkflowExecutionFilter.

## Implements

* [*IWorkflowExecutionFilter*](../interfaces/proto.temporal.api.filter.v1.iworkflowexecutionfilter.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.filter.v1.workflowexecutionfilter.md#constructor)

### Properties

- [runId](proto.temporal.api.filter.v1.workflowexecutionfilter.md#runid)
- [workflowId](proto.temporal.api.filter.v1.workflowexecutionfilter.md#workflowid)

### Methods

- [toJSON](proto.temporal.api.filter.v1.workflowexecutionfilter.md#tojson)
- [create](proto.temporal.api.filter.v1.workflowexecutionfilter.md#create)
- [decode](proto.temporal.api.filter.v1.workflowexecutionfilter.md#decode)
- [decodeDelimited](proto.temporal.api.filter.v1.workflowexecutionfilter.md#decodedelimited)
- [encode](proto.temporal.api.filter.v1.workflowexecutionfilter.md#encode)
- [encodeDelimited](proto.temporal.api.filter.v1.workflowexecutionfilter.md#encodedelimited)
- [fromObject](proto.temporal.api.filter.v1.workflowexecutionfilter.md#fromobject)
- [toObject](proto.temporal.api.filter.v1.workflowexecutionfilter.md#toobject)
- [verify](proto.temporal.api.filter.v1.workflowexecutionfilter.md#verify)

## Constructors

### constructor

\+ **new WorkflowExecutionFilter**(`properties?`: [*IWorkflowExecutionFilter*](../interfaces/proto.temporal.api.filter.v1.iworkflowexecutionfilter.md)): [*WorkflowExecutionFilter*](proto.temporal.api.filter.v1.workflowexecutionfilter.md)

Constructs a new WorkflowExecutionFilter.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowExecutionFilter*](../interfaces/proto.temporal.api.filter.v1.iworkflowexecutionfilter.md) |

**Returns:** [*WorkflowExecutionFilter*](proto.temporal.api.filter.v1.workflowexecutionfilter.md)

## Properties

### runId

• **runId**: *string*

WorkflowExecutionFilter runId.

Implementation of: [IWorkflowExecutionFilter](../interfaces/proto.temporal.api.filter.v1.iworkflowexecutionfilter.md).[runId](../interfaces/proto.temporal.api.filter.v1.iworkflowexecutionfilter.md#runid)

___

### workflowId

• **workflowId**: *string*

WorkflowExecutionFilter workflowId.

Implementation of: [IWorkflowExecutionFilter](../interfaces/proto.temporal.api.filter.v1.iworkflowexecutionfilter.md).[workflowId](../interfaces/proto.temporal.api.filter.v1.iworkflowexecutionfilter.md#workflowid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this WorkflowExecutionFilter to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IWorkflowExecutionFilter*](../interfaces/proto.temporal.api.filter.v1.iworkflowexecutionfilter.md)): [*WorkflowExecutionFilter*](proto.temporal.api.filter.v1.workflowexecutionfilter.md)

Creates a new WorkflowExecutionFilter instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowExecutionFilter*](../interfaces/proto.temporal.api.filter.v1.iworkflowexecutionfilter.md) |

**Returns:** [*WorkflowExecutionFilter*](proto.temporal.api.filter.v1.workflowexecutionfilter.md)

WorkflowExecutionFilter instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*WorkflowExecutionFilter*](proto.temporal.api.filter.v1.workflowexecutionfilter.md)

Decodes a WorkflowExecutionFilter message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*WorkflowExecutionFilter*](proto.temporal.api.filter.v1.workflowexecutionfilter.md)

WorkflowExecutionFilter

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*WorkflowExecutionFilter*](proto.temporal.api.filter.v1.workflowexecutionfilter.md)

Decodes a WorkflowExecutionFilter message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*WorkflowExecutionFilter*](proto.temporal.api.filter.v1.workflowexecutionfilter.md)

WorkflowExecutionFilter

___

### encode

▸ `Static`**encode**(`message`: [*IWorkflowExecutionFilter*](../interfaces/proto.temporal.api.filter.v1.iworkflowexecutionfilter.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowExecutionFilter message. Does not implicitly [verify](proto.temporal.api.filter.v1.workflowexecutionfilter.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowExecutionFilter*](../interfaces/proto.temporal.api.filter.v1.iworkflowexecutionfilter.md) | WorkflowExecutionFilter message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IWorkflowExecutionFilter*](../interfaces/proto.temporal.api.filter.v1.iworkflowexecutionfilter.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowExecutionFilter message, length delimited. Does not implicitly [verify](proto.temporal.api.filter.v1.workflowexecutionfilter.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowExecutionFilter*](../interfaces/proto.temporal.api.filter.v1.iworkflowexecutionfilter.md) | WorkflowExecutionFilter message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*WorkflowExecutionFilter*](proto.temporal.api.filter.v1.workflowexecutionfilter.md)

Creates a WorkflowExecutionFilter message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*WorkflowExecutionFilter*](proto.temporal.api.filter.v1.workflowexecutionfilter.md)

WorkflowExecutionFilter

___

### toObject

▸ `Static`**toObject**(`message`: [*WorkflowExecutionFilter*](proto.temporal.api.filter.v1.workflowexecutionfilter.md), `options?`: IConversionOptions): *object*

Creates a plain object from a WorkflowExecutionFilter message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*WorkflowExecutionFilter*](proto.temporal.api.filter.v1.workflowexecutionfilter.md) | WorkflowExecutionFilter   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a WorkflowExecutionFilter message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
