# Class: WorkflowExecutionStartedEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).WorkflowExecutionStartedEventAttributes

Represents a WorkflowExecutionStartedEventAttributes.

## Implements

* [*IWorkflowExecutionStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#constructor)

### Properties

- [attempt](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#attempt)
- [continuedExecutionRunId](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#continuedexecutionrunid)
- [continuedFailure](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#continuedfailure)
- [cronSchedule](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#cronschedule)
- [firstExecutionRunId](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#firstexecutionrunid)
- [firstWorkflowTaskBackoff](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#firstworkflowtaskbackoff)
- [header](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#header)
- [identity](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#identity)
- [initiator](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#initiator)
- [input](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#input)
- [lastCompletionResult](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#lastcompletionresult)
- [memo](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#memo)
- [originalExecutionRunId](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#originalexecutionrunid)
- [parentInitiatedEventId](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#parentinitiatedeventid)
- [parentWorkflowExecution](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#parentworkflowexecution)
- [parentWorkflowNamespace](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#parentworkflownamespace)
- [prevAutoResetPoints](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#prevautoresetpoints)
- [retryPolicy](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#retrypolicy)
- [searchAttributes](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#searchattributes)
- [taskQueue](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#taskqueue)
- [workflowExecutionExpirationTime](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#workflowexecutionexpirationtime)
- [workflowExecutionTimeout](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#workflowexecutiontimeout)
- [workflowRunTimeout](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#workflowruntimeout)
- [workflowTaskTimeout](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#workflowtasktimeout)
- [workflowType](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#workflowtype)

### Methods

- [toJSON](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#create)
- [decode](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#verify)

## Constructors

### constructor

\+ **new WorkflowExecutionStartedEventAttributes**(`properties?`: [*IWorkflowExecutionStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md)): [*WorkflowExecutionStartedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md)

Constructs a new WorkflowExecutionStartedEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowExecutionStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md) |

**Returns:** [*WorkflowExecutionStartedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md)

## Properties

### attempt

• **attempt**: *number*

WorkflowExecutionStartedEventAttributes attempt.

Implementation of: [IWorkflowExecutionStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md).[attempt](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#attempt)

___

### continuedExecutionRunId

• **continuedExecutionRunId**: *string*

WorkflowExecutionStartedEventAttributes continuedExecutionRunId.

Implementation of: [IWorkflowExecutionStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md).[continuedExecutionRunId](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#continuedexecutionrunid)

___

### continuedFailure

• `Optional` **continuedFailure**: *null* \| [*IFailure*](../interfaces/proto.temporal.api.failure.v1.ifailure.md)

WorkflowExecutionStartedEventAttributes continuedFailure.

Implementation of: [IWorkflowExecutionStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md).[continuedFailure](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#continuedfailure)

___

### cronSchedule

• **cronSchedule**: *string*

WorkflowExecutionStartedEventAttributes cronSchedule.

Implementation of: [IWorkflowExecutionStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md).[cronSchedule](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#cronschedule)

___

### firstExecutionRunId

• **firstExecutionRunId**: *string*

WorkflowExecutionStartedEventAttributes firstExecutionRunId.

Implementation of: [IWorkflowExecutionStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md).[firstExecutionRunId](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#firstexecutionrunid)

___

### firstWorkflowTaskBackoff

• `Optional` **firstWorkflowTaskBackoff**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

WorkflowExecutionStartedEventAttributes firstWorkflowTaskBackoff.

Implementation of: [IWorkflowExecutionStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md).[firstWorkflowTaskBackoff](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#firstworkflowtaskbackoff)

___

### header

• `Optional` **header**: *null* \| [*IHeader*](../interfaces/proto.temporal.api.common.v1.iheader.md)

WorkflowExecutionStartedEventAttributes header.

Implementation of: [IWorkflowExecutionStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md).[header](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#header)

___

### identity

• **identity**: *string*

WorkflowExecutionStartedEventAttributes identity.

Implementation of: [IWorkflowExecutionStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md).[identity](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#identity)

___

### initiator

• **initiator**: [*ContinueAsNewInitiator*](../enums/proto.temporal.api.enums.v1.continueasnewinitiator.md)

WorkflowExecutionStartedEventAttributes initiator.

Implementation of: [IWorkflowExecutionStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md).[initiator](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#initiator)

___

### input

• `Optional` **input**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

WorkflowExecutionStartedEventAttributes input.

Implementation of: [IWorkflowExecutionStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md).[input](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#input)

___

### lastCompletionResult

• `Optional` **lastCompletionResult**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

WorkflowExecutionStartedEventAttributes lastCompletionResult.

Implementation of: [IWorkflowExecutionStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md).[lastCompletionResult](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#lastcompletionresult)

___

### memo

• `Optional` **memo**: *null* \| [*IMemo*](../interfaces/proto.temporal.api.common.v1.imemo.md)

WorkflowExecutionStartedEventAttributes memo.

Implementation of: [IWorkflowExecutionStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md).[memo](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#memo)

___

### originalExecutionRunId

• **originalExecutionRunId**: *string*

WorkflowExecutionStartedEventAttributes originalExecutionRunId.

Implementation of: [IWorkflowExecutionStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md).[originalExecutionRunId](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#originalexecutionrunid)

___

### parentInitiatedEventId

• **parentInitiatedEventId**: Long

WorkflowExecutionStartedEventAttributes parentInitiatedEventId.

Implementation of: [IWorkflowExecutionStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md).[parentInitiatedEventId](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#parentinitiatedeventid)

___

### parentWorkflowExecution

• `Optional` **parentWorkflowExecution**: *null* \| [*IWorkflowExecution*](../interfaces/proto.temporal.api.common.v1.iworkflowexecution.md)

WorkflowExecutionStartedEventAttributes parentWorkflowExecution.

Implementation of: [IWorkflowExecutionStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md).[parentWorkflowExecution](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#parentworkflowexecution)

___

### parentWorkflowNamespace

• **parentWorkflowNamespace**: *string*

WorkflowExecutionStartedEventAttributes parentWorkflowNamespace.

Implementation of: [IWorkflowExecutionStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md).[parentWorkflowNamespace](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#parentworkflownamespace)

___

### prevAutoResetPoints

• `Optional` **prevAutoResetPoints**: *null* \| [*IResetPoints*](../interfaces/proto.temporal.api.workflow.v1.iresetpoints.md)

WorkflowExecutionStartedEventAttributes prevAutoResetPoints.

Implementation of: [IWorkflowExecutionStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md).[prevAutoResetPoints](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#prevautoresetpoints)

___

### retryPolicy

• `Optional` **retryPolicy**: *null* \| [*IRetryPolicy*](../interfaces/proto.temporal.api.common.v1.iretrypolicy.md)

WorkflowExecutionStartedEventAttributes retryPolicy.

Implementation of: [IWorkflowExecutionStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md).[retryPolicy](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#retrypolicy)

___

### searchAttributes

• `Optional` **searchAttributes**: *null* \| [*ISearchAttributes*](../interfaces/proto.temporal.api.common.v1.isearchattributes.md)

WorkflowExecutionStartedEventAttributes searchAttributes.

Implementation of: [IWorkflowExecutionStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md).[searchAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#searchattributes)

___

### taskQueue

• `Optional` **taskQueue**: *null* \| [*ITaskQueue*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueue.md)

WorkflowExecutionStartedEventAttributes taskQueue.

Implementation of: [IWorkflowExecutionStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md).[taskQueue](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#taskqueue)

___

### workflowExecutionExpirationTime

• `Optional` **workflowExecutionExpirationTime**: *null* \| [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md)

WorkflowExecutionStartedEventAttributes workflowExecutionExpirationTime.

Implementation of: [IWorkflowExecutionStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md).[workflowExecutionExpirationTime](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#workflowexecutionexpirationtime)

___

### workflowExecutionTimeout

• `Optional` **workflowExecutionTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

WorkflowExecutionStartedEventAttributes workflowExecutionTimeout.

Implementation of: [IWorkflowExecutionStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md).[workflowExecutionTimeout](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#workflowexecutiontimeout)

___

### workflowRunTimeout

• `Optional` **workflowRunTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

WorkflowExecutionStartedEventAttributes workflowRunTimeout.

Implementation of: [IWorkflowExecutionStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md).[workflowRunTimeout](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#workflowruntimeout)

___

### workflowTaskTimeout

• `Optional` **workflowTaskTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

WorkflowExecutionStartedEventAttributes workflowTaskTimeout.

Implementation of: [IWorkflowExecutionStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md).[workflowTaskTimeout](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#workflowtasktimeout)

___

### workflowType

• `Optional` **workflowType**: *null* \| [*IWorkflowType*](../interfaces/proto.temporal.api.common.v1.iworkflowtype.md)

WorkflowExecutionStartedEventAttributes workflowType.

Implementation of: [IWorkflowExecutionStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md).[workflowType](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md#workflowtype)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this WorkflowExecutionStartedEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IWorkflowExecutionStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md)): [*WorkflowExecutionStartedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md)

Creates a new WorkflowExecutionStartedEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowExecutionStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md) |

**Returns:** [*WorkflowExecutionStartedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md)

WorkflowExecutionStartedEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*WorkflowExecutionStartedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md)

Decodes a WorkflowExecutionStartedEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*WorkflowExecutionStartedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md)

WorkflowExecutionStartedEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*WorkflowExecutionStartedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md)

Decodes a WorkflowExecutionStartedEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*WorkflowExecutionStartedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md)

WorkflowExecutionStartedEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IWorkflowExecutionStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowExecutionStartedEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowExecutionStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md) | WorkflowExecutionStartedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IWorkflowExecutionStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowExecutionStartedEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowExecutionStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md) | WorkflowExecutionStartedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*WorkflowExecutionStartedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md)

Creates a WorkflowExecutionStartedEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*WorkflowExecutionStartedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md)

WorkflowExecutionStartedEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*WorkflowExecutionStartedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a WorkflowExecutionStartedEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*WorkflowExecutionStartedEventAttributes*](proto.temporal.api.history.v1.workflowexecutionstartedeventattributes.md) | WorkflowExecutionStartedEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a WorkflowExecutionStartedEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
