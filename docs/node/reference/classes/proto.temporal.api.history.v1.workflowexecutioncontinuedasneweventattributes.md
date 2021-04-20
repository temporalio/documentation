# Class: WorkflowExecutionContinuedAsNewEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).WorkflowExecutionContinuedAsNewEventAttributes

Represents a WorkflowExecutionContinuedAsNewEventAttributes.

## Implements

* [*IWorkflowExecutionContinuedAsNewEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md#constructor)

### Properties

- [backoffStartInterval](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md#backoffstartinterval)
- [failure](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md#failure)
- [header](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md#header)
- [initiator](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md#initiator)
- [input](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md#input)
- [lastCompletionResult](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md#lastcompletionresult)
- [memo](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md#memo)
- [newExecutionRunId](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md#newexecutionrunid)
- [searchAttributes](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md#searchattributes)
- [taskQueue](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md#taskqueue)
- [workflowRunTimeout](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md#workflowruntimeout)
- [workflowTaskCompletedEventId](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md#workflowtaskcompletedeventid)
- [workflowTaskTimeout](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md#workflowtasktimeout)
- [workflowType](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md#workflowtype)

### Methods

- [toJSON](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md#create)
- [decode](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md#verify)

## Constructors

### constructor

\+ **new WorkflowExecutionContinuedAsNewEventAttributes**(`properties?`: [*IWorkflowExecutionContinuedAsNewEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md)): [*WorkflowExecutionContinuedAsNewEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md)

Constructs a new WorkflowExecutionContinuedAsNewEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowExecutionContinuedAsNewEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md) |

**Returns:** [*WorkflowExecutionContinuedAsNewEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md)

## Properties

### backoffStartInterval

• `Optional` **backoffStartInterval**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

WorkflowExecutionContinuedAsNewEventAttributes backoffStartInterval.

Implementation of: [IWorkflowExecutionContinuedAsNewEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md).[backoffStartInterval](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md#backoffstartinterval)

___

### failure

• `Optional` **failure**: *null* \| [*IFailure*](../interfaces/proto.temporal.api.failure.v1.ifailure.md)

WorkflowExecutionContinuedAsNewEventAttributes failure.

Implementation of: [IWorkflowExecutionContinuedAsNewEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md).[failure](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md#failure)

___

### header

• `Optional` **header**: *null* \| [*IHeader*](../interfaces/proto.temporal.api.common.v1.iheader.md)

WorkflowExecutionContinuedAsNewEventAttributes header.

Implementation of: [IWorkflowExecutionContinuedAsNewEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md).[header](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md#header)

___

### initiator

• **initiator**: [*ContinueAsNewInitiator*](../enums/proto.temporal.api.enums.v1.continueasnewinitiator.md)

WorkflowExecutionContinuedAsNewEventAttributes initiator.

Implementation of: [IWorkflowExecutionContinuedAsNewEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md).[initiator](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md#initiator)

___

### input

• `Optional` **input**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

WorkflowExecutionContinuedAsNewEventAttributes input.

Implementation of: [IWorkflowExecutionContinuedAsNewEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md).[input](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md#input)

___

### lastCompletionResult

• `Optional` **lastCompletionResult**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

WorkflowExecutionContinuedAsNewEventAttributes lastCompletionResult.

Implementation of: [IWorkflowExecutionContinuedAsNewEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md).[lastCompletionResult](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md#lastcompletionresult)

___

### memo

• `Optional` **memo**: *null* \| [*IMemo*](../interfaces/proto.temporal.api.common.v1.imemo.md)

WorkflowExecutionContinuedAsNewEventAttributes memo.

Implementation of: [IWorkflowExecutionContinuedAsNewEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md).[memo](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md#memo)

___

### newExecutionRunId

• **newExecutionRunId**: *string*

WorkflowExecutionContinuedAsNewEventAttributes newExecutionRunId.

Implementation of: [IWorkflowExecutionContinuedAsNewEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md).[newExecutionRunId](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md#newexecutionrunid)

___

### searchAttributes

• `Optional` **searchAttributes**: *null* \| [*ISearchAttributes*](../interfaces/proto.temporal.api.common.v1.isearchattributes.md)

WorkflowExecutionContinuedAsNewEventAttributes searchAttributes.

Implementation of: [IWorkflowExecutionContinuedAsNewEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md).[searchAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md#searchattributes)

___

### taskQueue

• `Optional` **taskQueue**: *null* \| [*ITaskQueue*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueue.md)

WorkflowExecutionContinuedAsNewEventAttributes taskQueue.

Implementation of: [IWorkflowExecutionContinuedAsNewEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md).[taskQueue](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md#taskqueue)

___

### workflowRunTimeout

• `Optional` **workflowRunTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

WorkflowExecutionContinuedAsNewEventAttributes workflowRunTimeout.

Implementation of: [IWorkflowExecutionContinuedAsNewEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md).[workflowRunTimeout](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md#workflowruntimeout)

___

### workflowTaskCompletedEventId

• **workflowTaskCompletedEventId**: Long

WorkflowExecutionContinuedAsNewEventAttributes workflowTaskCompletedEventId.

Implementation of: [IWorkflowExecutionContinuedAsNewEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md).[workflowTaskCompletedEventId](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md#workflowtaskcompletedeventid)

___

### workflowTaskTimeout

• `Optional` **workflowTaskTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

WorkflowExecutionContinuedAsNewEventAttributes workflowTaskTimeout.

Implementation of: [IWorkflowExecutionContinuedAsNewEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md).[workflowTaskTimeout](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md#workflowtasktimeout)

___

### workflowType

• `Optional` **workflowType**: *null* \| [*IWorkflowType*](../interfaces/proto.temporal.api.common.v1.iworkflowtype.md)

WorkflowExecutionContinuedAsNewEventAttributes workflowType.

Implementation of: [IWorkflowExecutionContinuedAsNewEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md).[workflowType](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md#workflowtype)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this WorkflowExecutionContinuedAsNewEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IWorkflowExecutionContinuedAsNewEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md)): [*WorkflowExecutionContinuedAsNewEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md)

Creates a new WorkflowExecutionContinuedAsNewEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowExecutionContinuedAsNewEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md) |

**Returns:** [*WorkflowExecutionContinuedAsNewEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md)

WorkflowExecutionContinuedAsNewEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*WorkflowExecutionContinuedAsNewEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md)

Decodes a WorkflowExecutionContinuedAsNewEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*WorkflowExecutionContinuedAsNewEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md)

WorkflowExecutionContinuedAsNewEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*WorkflowExecutionContinuedAsNewEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md)

Decodes a WorkflowExecutionContinuedAsNewEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*WorkflowExecutionContinuedAsNewEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md)

WorkflowExecutionContinuedAsNewEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IWorkflowExecutionContinuedAsNewEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowExecutionContinuedAsNewEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowExecutionContinuedAsNewEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md) | WorkflowExecutionContinuedAsNewEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IWorkflowExecutionContinuedAsNewEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowExecutionContinuedAsNewEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowExecutionContinuedAsNewEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md) | WorkflowExecutionContinuedAsNewEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*WorkflowExecutionContinuedAsNewEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md)

Creates a WorkflowExecutionContinuedAsNewEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*WorkflowExecutionContinuedAsNewEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md)

WorkflowExecutionContinuedAsNewEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*WorkflowExecutionContinuedAsNewEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a WorkflowExecutionContinuedAsNewEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*WorkflowExecutionContinuedAsNewEventAttributes*](proto.temporal.api.history.v1.workflowexecutioncontinuedasneweventattributes.md) | WorkflowExecutionContinuedAsNewEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a WorkflowExecutionContinuedAsNewEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
