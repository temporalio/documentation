# Class: WorkflowExecutionInfo

[workflow](../modules/proto.temporal.api.workflow.md).[v1](../modules/proto.temporal.api.workflow.v1.md).WorkflowExecutionInfo

Represents a WorkflowExecutionInfo.

## Implements

* [*IWorkflowExecutionInfo*](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflow.v1.workflowexecutioninfo.md#constructor)

### Properties

- [autoResetPoints](proto.temporal.api.workflow.v1.workflowexecutioninfo.md#autoresetpoints)
- [closeTime](proto.temporal.api.workflow.v1.workflowexecutioninfo.md#closetime)
- [execution](proto.temporal.api.workflow.v1.workflowexecutioninfo.md#execution)
- [executionTime](proto.temporal.api.workflow.v1.workflowexecutioninfo.md#executiontime)
- [historyLength](proto.temporal.api.workflow.v1.workflowexecutioninfo.md#historylength)
- [memo](proto.temporal.api.workflow.v1.workflowexecutioninfo.md#memo)
- [parentExecution](proto.temporal.api.workflow.v1.workflowexecutioninfo.md#parentexecution)
- [parentNamespaceId](proto.temporal.api.workflow.v1.workflowexecutioninfo.md#parentnamespaceid)
- [searchAttributes](proto.temporal.api.workflow.v1.workflowexecutioninfo.md#searchattributes)
- [startTime](proto.temporal.api.workflow.v1.workflowexecutioninfo.md#starttime)
- [status](proto.temporal.api.workflow.v1.workflowexecutioninfo.md#status)
- [taskQueue](proto.temporal.api.workflow.v1.workflowexecutioninfo.md#taskqueue)
- [type](proto.temporal.api.workflow.v1.workflowexecutioninfo.md#type)

### Methods

- [toJSON](proto.temporal.api.workflow.v1.workflowexecutioninfo.md#tojson)
- [create](proto.temporal.api.workflow.v1.workflowexecutioninfo.md#create)
- [decode](proto.temporal.api.workflow.v1.workflowexecutioninfo.md#decode)
- [decodeDelimited](proto.temporal.api.workflow.v1.workflowexecutioninfo.md#decodedelimited)
- [encode](proto.temporal.api.workflow.v1.workflowexecutioninfo.md#encode)
- [encodeDelimited](proto.temporal.api.workflow.v1.workflowexecutioninfo.md#encodedelimited)
- [fromObject](proto.temporal.api.workflow.v1.workflowexecutioninfo.md#fromobject)
- [toObject](proto.temporal.api.workflow.v1.workflowexecutioninfo.md#toobject)
- [verify](proto.temporal.api.workflow.v1.workflowexecutioninfo.md#verify)

## Constructors

### constructor

\+ **new WorkflowExecutionInfo**(`properties?`: [*IWorkflowExecutionInfo*](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md)): [*WorkflowExecutionInfo*](proto.temporal.api.workflow.v1.workflowexecutioninfo.md)

Constructs a new WorkflowExecutionInfo.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowExecutionInfo*](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md) |

**Returns:** [*WorkflowExecutionInfo*](proto.temporal.api.workflow.v1.workflowexecutioninfo.md)

## Properties

### autoResetPoints

• `Optional` **autoResetPoints**: *null* \| [*IResetPoints*](../interfaces/proto.temporal.api.workflow.v1.iresetpoints.md)

WorkflowExecutionInfo autoResetPoints.

Implementation of: [IWorkflowExecutionInfo](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md).[autoResetPoints](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md#autoresetpoints)

___

### closeTime

• `Optional` **closeTime**: *null* \| [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md)

WorkflowExecutionInfo closeTime.

Implementation of: [IWorkflowExecutionInfo](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md).[closeTime](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md#closetime)

___

### execution

• `Optional` **execution**: *null* \| [*IWorkflowExecution*](../interfaces/proto.temporal.api.common.v1.iworkflowexecution.md)

WorkflowExecutionInfo execution.

Implementation of: [IWorkflowExecutionInfo](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md).[execution](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md#execution)

___

### executionTime

• `Optional` **executionTime**: *null* \| [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md)

WorkflowExecutionInfo executionTime.

Implementation of: [IWorkflowExecutionInfo](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md).[executionTime](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md#executiontime)

___

### historyLength

• **historyLength**: Long

WorkflowExecutionInfo historyLength.

Implementation of: [IWorkflowExecutionInfo](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md).[historyLength](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md#historylength)

___

### memo

• `Optional` **memo**: *null* \| [*IMemo*](../interfaces/proto.temporal.api.common.v1.imemo.md)

WorkflowExecutionInfo memo.

Implementation of: [IWorkflowExecutionInfo](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md).[memo](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md#memo)

___

### parentExecution

• `Optional` **parentExecution**: *null* \| [*IWorkflowExecution*](../interfaces/proto.temporal.api.common.v1.iworkflowexecution.md)

WorkflowExecutionInfo parentExecution.

Implementation of: [IWorkflowExecutionInfo](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md).[parentExecution](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md#parentexecution)

___

### parentNamespaceId

• **parentNamespaceId**: *string*

WorkflowExecutionInfo parentNamespaceId.

Implementation of: [IWorkflowExecutionInfo](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md).[parentNamespaceId](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md#parentnamespaceid)

___

### searchAttributes

• `Optional` **searchAttributes**: *null* \| [*ISearchAttributes*](../interfaces/proto.temporal.api.common.v1.isearchattributes.md)

WorkflowExecutionInfo searchAttributes.

Implementation of: [IWorkflowExecutionInfo](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md).[searchAttributes](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md#searchattributes)

___

### startTime

• `Optional` **startTime**: *null* \| [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md)

WorkflowExecutionInfo startTime.

Implementation of: [IWorkflowExecutionInfo](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md).[startTime](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md#starttime)

___

### status

• **status**: [*WorkflowExecutionStatus*](../enums/proto.temporal.api.enums.v1.workflowexecutionstatus.md)

WorkflowExecutionInfo status.

Implementation of: [IWorkflowExecutionInfo](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md).[status](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md#status)

___

### taskQueue

• **taskQueue**: *string*

WorkflowExecutionInfo taskQueue.

Implementation of: [IWorkflowExecutionInfo](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md).[taskQueue](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md#taskqueue)

___

### type

• `Optional` **type**: *null* \| [*IWorkflowType*](../interfaces/proto.temporal.api.common.v1.iworkflowtype.md)

WorkflowExecutionInfo type.

Implementation of: [IWorkflowExecutionInfo](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md).[type](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md#type)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this WorkflowExecutionInfo to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IWorkflowExecutionInfo*](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md)): [*WorkflowExecutionInfo*](proto.temporal.api.workflow.v1.workflowexecutioninfo.md)

Creates a new WorkflowExecutionInfo instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowExecutionInfo*](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md) |

**Returns:** [*WorkflowExecutionInfo*](proto.temporal.api.workflow.v1.workflowexecutioninfo.md)

WorkflowExecutionInfo instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*WorkflowExecutionInfo*](proto.temporal.api.workflow.v1.workflowexecutioninfo.md)

Decodes a WorkflowExecutionInfo message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*WorkflowExecutionInfo*](proto.temporal.api.workflow.v1.workflowexecutioninfo.md)

WorkflowExecutionInfo

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*WorkflowExecutionInfo*](proto.temporal.api.workflow.v1.workflowexecutioninfo.md)

Decodes a WorkflowExecutionInfo message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*WorkflowExecutionInfo*](proto.temporal.api.workflow.v1.workflowexecutioninfo.md)

WorkflowExecutionInfo

___

### encode

▸ `Static`**encode**(`message`: [*IWorkflowExecutionInfo*](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowExecutionInfo message. Does not implicitly [verify](proto.temporal.api.workflow.v1.workflowexecutioninfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowExecutionInfo*](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md) | WorkflowExecutionInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IWorkflowExecutionInfo*](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowExecutionInfo message, length delimited. Does not implicitly [verify](proto.temporal.api.workflow.v1.workflowexecutioninfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowExecutionInfo*](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md) | WorkflowExecutionInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*WorkflowExecutionInfo*](proto.temporal.api.workflow.v1.workflowexecutioninfo.md)

Creates a WorkflowExecutionInfo message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*WorkflowExecutionInfo*](proto.temporal.api.workflow.v1.workflowexecutioninfo.md)

WorkflowExecutionInfo

___

### toObject

▸ `Static`**toObject**(`message`: [*WorkflowExecutionInfo*](proto.temporal.api.workflow.v1.workflowexecutioninfo.md), `options?`: IConversionOptions): *object*

Creates a plain object from a WorkflowExecutionInfo message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*WorkflowExecutionInfo*](proto.temporal.api.workflow.v1.workflowexecutioninfo.md) | WorkflowExecutionInfo   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a WorkflowExecutionInfo message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
