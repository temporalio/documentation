# Class: WorkflowCommand

[coresdk](../modules/proto.coresdk.md).[workflow_commands](../modules/proto.coresdk.workflow_commands.md).WorkflowCommand

Represents a WorkflowCommand.

## Implements

* [*IWorkflowCommand*](../interfaces/proto.coresdk.workflow_commands.iworkflowcommand.md)

## Table of contents

### Constructors

- [constructor](proto.coresdk.workflow_commands.workflowcommand.md#constructor)

### Properties

- [cancelTimer](proto.coresdk.workflow_commands.workflowcommand.md#canceltimer)
- [completeWorkflowExecution](proto.coresdk.workflow_commands.workflowcommand.md#completeworkflowexecution)
- [failWorkflowExecution](proto.coresdk.workflow_commands.workflowcommand.md#failworkflowexecution)
- [requestCancelActivity](proto.coresdk.workflow_commands.workflowcommand.md#requestcancelactivity)
- [respondToQuery](proto.coresdk.workflow_commands.workflowcommand.md#respondtoquery)
- [scheduleActivity](proto.coresdk.workflow_commands.workflowcommand.md#scheduleactivity)
- [startTimer](proto.coresdk.workflow_commands.workflowcommand.md#starttimer)
- [variant](proto.coresdk.workflow_commands.workflowcommand.md#variant)

### Methods

- [toJSON](proto.coresdk.workflow_commands.workflowcommand.md#tojson)
- [create](proto.coresdk.workflow_commands.workflowcommand.md#create)
- [decode](proto.coresdk.workflow_commands.workflowcommand.md#decode)
- [decodeDelimited](proto.coresdk.workflow_commands.workflowcommand.md#decodedelimited)
- [encode](proto.coresdk.workflow_commands.workflowcommand.md#encode)
- [encodeDelimited](proto.coresdk.workflow_commands.workflowcommand.md#encodedelimited)
- [fromObject](proto.coresdk.workflow_commands.workflowcommand.md#fromobject)
- [toObject](proto.coresdk.workflow_commands.workflowcommand.md#toobject)
- [verify](proto.coresdk.workflow_commands.workflowcommand.md#verify)

## Constructors

### constructor

\+ **new WorkflowCommand**(`properties?`: [*IWorkflowCommand*](../interfaces/proto.coresdk.workflow_commands.iworkflowcommand.md)): [*WorkflowCommand*](proto.coresdk.workflow_commands.workflowcommand.md)

Constructs a new WorkflowCommand.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowCommand*](../interfaces/proto.coresdk.workflow_commands.iworkflowcommand.md) |

**Returns:** [*WorkflowCommand*](proto.coresdk.workflow_commands.workflowcommand.md)

## Properties

### cancelTimer

• `Optional` **cancelTimer**: *null* \| [*ICancelTimer*](../interfaces/proto.coresdk.workflow_commands.icanceltimer.md)

WorkflowCommand cancelTimer.

Implementation of: [IWorkflowCommand](../interfaces/proto.coresdk.workflow_commands.iworkflowcommand.md).[cancelTimer](../interfaces/proto.coresdk.workflow_commands.iworkflowcommand.md#canceltimer)

___

### completeWorkflowExecution

• `Optional` **completeWorkflowExecution**: *null* \| [*ICompleteWorkflowExecution*](../interfaces/proto.coresdk.workflow_commands.icompleteworkflowexecution.md)

WorkflowCommand completeWorkflowExecution.

Implementation of: [IWorkflowCommand](../interfaces/proto.coresdk.workflow_commands.iworkflowcommand.md).[completeWorkflowExecution](../interfaces/proto.coresdk.workflow_commands.iworkflowcommand.md#completeworkflowexecution)

___

### failWorkflowExecution

• `Optional` **failWorkflowExecution**: *null* \| [*IFailWorkflowExecution*](../interfaces/proto.coresdk.workflow_commands.ifailworkflowexecution.md)

WorkflowCommand failWorkflowExecution.

Implementation of: [IWorkflowCommand](../interfaces/proto.coresdk.workflow_commands.iworkflowcommand.md).[failWorkflowExecution](../interfaces/proto.coresdk.workflow_commands.iworkflowcommand.md#failworkflowexecution)

___

### requestCancelActivity

• `Optional` **requestCancelActivity**: *null* \| [*IRequestCancelActivity*](../interfaces/proto.coresdk.workflow_commands.irequestcancelactivity.md)

WorkflowCommand requestCancelActivity.

Implementation of: [IWorkflowCommand](../interfaces/proto.coresdk.workflow_commands.iworkflowcommand.md).[requestCancelActivity](../interfaces/proto.coresdk.workflow_commands.iworkflowcommand.md#requestcancelactivity)

___

### respondToQuery

• `Optional` **respondToQuery**: *null* \| [*IQueryResult*](../interfaces/proto.coresdk.workflow_commands.iqueryresult.md)

WorkflowCommand respondToQuery.

Implementation of: [IWorkflowCommand](../interfaces/proto.coresdk.workflow_commands.iworkflowcommand.md).[respondToQuery](../interfaces/proto.coresdk.workflow_commands.iworkflowcommand.md#respondtoquery)

___

### scheduleActivity

• `Optional` **scheduleActivity**: *null* \| [*IScheduleActivity*](../interfaces/proto.coresdk.workflow_commands.ischeduleactivity.md)

WorkflowCommand scheduleActivity.

Implementation of: [IWorkflowCommand](../interfaces/proto.coresdk.workflow_commands.iworkflowcommand.md).[scheduleActivity](../interfaces/proto.coresdk.workflow_commands.iworkflowcommand.md#scheduleactivity)

___

### startTimer

• `Optional` **startTimer**: *null* \| [*IStartTimer*](../interfaces/proto.coresdk.workflow_commands.istarttimer.md)

WorkflowCommand startTimer.

Implementation of: [IWorkflowCommand](../interfaces/proto.coresdk.workflow_commands.iworkflowcommand.md).[startTimer](../interfaces/proto.coresdk.workflow_commands.iworkflowcommand.md#starttimer)

___

### variant

• `Optional` **variant**: *startTimer* \| *scheduleActivity* \| *respondToQuery* \| *requestCancelActivity* \| *cancelTimer* \| *completeWorkflowExecution* \| *failWorkflowExecution*

WorkflowCommand variant.

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this WorkflowCommand to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IWorkflowCommand*](../interfaces/proto.coresdk.workflow_commands.iworkflowcommand.md)): [*WorkflowCommand*](proto.coresdk.workflow_commands.workflowcommand.md)

Creates a new WorkflowCommand instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowCommand*](../interfaces/proto.coresdk.workflow_commands.iworkflowcommand.md) |

**Returns:** [*WorkflowCommand*](proto.coresdk.workflow_commands.workflowcommand.md)

WorkflowCommand instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*WorkflowCommand*](proto.coresdk.workflow_commands.workflowcommand.md)

Decodes a WorkflowCommand message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*WorkflowCommand*](proto.coresdk.workflow_commands.workflowcommand.md)

WorkflowCommand

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*WorkflowCommand*](proto.coresdk.workflow_commands.workflowcommand.md)

Decodes a WorkflowCommand message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*WorkflowCommand*](proto.coresdk.workflow_commands.workflowcommand.md)

WorkflowCommand

___

### encode

▸ `Static`**encode**(`message`: [*IWorkflowCommand*](../interfaces/proto.coresdk.workflow_commands.iworkflowcommand.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowCommand message. Does not implicitly [verify](proto.coresdk.workflow_commands.workflowcommand.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowCommand*](../interfaces/proto.coresdk.workflow_commands.iworkflowcommand.md) | WorkflowCommand message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IWorkflowCommand*](../interfaces/proto.coresdk.workflow_commands.iworkflowcommand.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowCommand message, length delimited. Does not implicitly [verify](proto.coresdk.workflow_commands.workflowcommand.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowCommand*](../interfaces/proto.coresdk.workflow_commands.iworkflowcommand.md) | WorkflowCommand message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*WorkflowCommand*](proto.coresdk.workflow_commands.workflowcommand.md)

Creates a WorkflowCommand message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*WorkflowCommand*](proto.coresdk.workflow_commands.workflowcommand.md)

WorkflowCommand

___

### toObject

▸ `Static`**toObject**(`message`: [*WorkflowCommand*](proto.coresdk.workflow_commands.workflowcommand.md), `options?`: IConversionOptions): *object*

Creates a plain object from a WorkflowCommand message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*WorkflowCommand*](proto.coresdk.workflow_commands.workflowcommand.md) | WorkflowCommand   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a WorkflowCommand message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
