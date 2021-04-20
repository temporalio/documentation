# Class: WorkflowExecution

[coresdk](../modules/proto.coresdk.md).[common](../modules/proto.coresdk.common.md).WorkflowExecution

Represents a WorkflowExecution.

## Implements

* [*IWorkflowExecution*](../interfaces/proto.coresdk.common.iworkflowexecution.md)

## Table of contents

### Constructors

- [constructor](proto.coresdk.common.workflowexecution.md#constructor)

### Properties

- [runId](proto.coresdk.common.workflowexecution.md#runid)
- [workflowId](proto.coresdk.common.workflowexecution.md#workflowid)

### Methods

- [toJSON](proto.coresdk.common.workflowexecution.md#tojson)
- [create](proto.coresdk.common.workflowexecution.md#create)
- [decode](proto.coresdk.common.workflowexecution.md#decode)
- [decodeDelimited](proto.coresdk.common.workflowexecution.md#decodedelimited)
- [encode](proto.coresdk.common.workflowexecution.md#encode)
- [encodeDelimited](proto.coresdk.common.workflowexecution.md#encodedelimited)
- [fromObject](proto.coresdk.common.workflowexecution.md#fromobject)
- [toObject](proto.coresdk.common.workflowexecution.md#toobject)
- [verify](proto.coresdk.common.workflowexecution.md#verify)

## Constructors

### constructor

\+ **new WorkflowExecution**(`properties?`: [*IWorkflowExecution*](../interfaces/proto.coresdk.common.iworkflowexecution.md)): [*WorkflowExecution*](proto.coresdk.common.workflowexecution.md)

Constructs a new WorkflowExecution.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowExecution*](../interfaces/proto.coresdk.common.iworkflowexecution.md) |

**Returns:** [*WorkflowExecution*](proto.coresdk.common.workflowexecution.md)

## Properties

### runId

• **runId**: *string*

WorkflowExecution runId.

Implementation of: [IWorkflowExecution](../interfaces/proto.coresdk.common.iworkflowexecution.md).[runId](../interfaces/proto.coresdk.common.iworkflowexecution.md#runid)

___

### workflowId

• **workflowId**: *string*

WorkflowExecution workflowId.

Implementation of: [IWorkflowExecution](../interfaces/proto.coresdk.common.iworkflowexecution.md).[workflowId](../interfaces/proto.coresdk.common.iworkflowexecution.md#workflowid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this WorkflowExecution to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IWorkflowExecution*](../interfaces/proto.coresdk.common.iworkflowexecution.md)): [*WorkflowExecution*](proto.coresdk.common.workflowexecution.md)

Creates a new WorkflowExecution instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowExecution*](../interfaces/proto.coresdk.common.iworkflowexecution.md) |

**Returns:** [*WorkflowExecution*](proto.coresdk.common.workflowexecution.md)

WorkflowExecution instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*WorkflowExecution*](proto.coresdk.common.workflowexecution.md)

Decodes a WorkflowExecution message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*WorkflowExecution*](proto.coresdk.common.workflowexecution.md)

WorkflowExecution

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*WorkflowExecution*](proto.coresdk.common.workflowexecution.md)

Decodes a WorkflowExecution message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*WorkflowExecution*](proto.coresdk.common.workflowexecution.md)

WorkflowExecution

___

### encode

▸ `Static`**encode**(`message`: [*IWorkflowExecution*](../interfaces/proto.coresdk.common.iworkflowexecution.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowExecution message. Does not implicitly [verify](proto.coresdk.common.workflowexecution.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowExecution*](../interfaces/proto.coresdk.common.iworkflowexecution.md) | WorkflowExecution message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IWorkflowExecution*](../interfaces/proto.coresdk.common.iworkflowexecution.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowExecution message, length delimited. Does not implicitly [verify](proto.coresdk.common.workflowexecution.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowExecution*](../interfaces/proto.coresdk.common.iworkflowexecution.md) | WorkflowExecution message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*WorkflowExecution*](proto.coresdk.common.workflowexecution.md)

Creates a WorkflowExecution message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*WorkflowExecution*](proto.coresdk.common.workflowexecution.md)

WorkflowExecution

___

### toObject

▸ `Static`**toObject**(`message`: [*WorkflowExecution*](proto.coresdk.common.workflowexecution.md), `options?`: IConversionOptions): *object*

Creates a plain object from a WorkflowExecution message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*WorkflowExecution*](proto.coresdk.common.workflowexecution.md) | WorkflowExecution   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a WorkflowExecution message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
