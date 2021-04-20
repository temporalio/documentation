# Class: ContinueAsNewWorkflowExecutionCommandAttributes

[command](../modules/proto.temporal.api.command.md).[v1](../modules/proto.temporal.api.command.v1.md).ContinueAsNewWorkflowExecutionCommandAttributes

Represents a ContinueAsNewWorkflowExecutionCommandAttributes.

## Implements

* [*IContinueAsNewWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md#constructor)

### Properties

- [backoffStartInterval](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md#backoffstartinterval)
- [cronSchedule](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md#cronschedule)
- [failure](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md#failure)
- [header](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md#header)
- [initiator](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md#initiator)
- [input](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md#input)
- [lastCompletionResult](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md#lastcompletionresult)
- [memo](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md#memo)
- [retryPolicy](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md#retrypolicy)
- [searchAttributes](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md#searchattributes)
- [taskQueue](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md#taskqueue)
- [workflowRunTimeout](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md#workflowruntimeout)
- [workflowTaskTimeout](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md#workflowtasktimeout)
- [workflowType](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md#workflowtype)

### Methods

- [toJSON](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md#tojson)
- [create](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md#create)
- [decode](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md#decode)
- [decodeDelimited](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md#decodedelimited)
- [encode](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md#encode)
- [encodeDelimited](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md#fromobject)
- [toObject](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md#toobject)
- [verify](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md#verify)

## Constructors

### constructor

\+ **new ContinueAsNewWorkflowExecutionCommandAttributes**(`properties?`: [*IContinueAsNewWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md)): [*ContinueAsNewWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md)

Constructs a new ContinueAsNewWorkflowExecutionCommandAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IContinueAsNewWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md) |

**Returns:** [*ContinueAsNewWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md)

## Properties

### backoffStartInterval

• `Optional` **backoffStartInterval**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

ContinueAsNewWorkflowExecutionCommandAttributes backoffStartInterval.

Implementation of: [IContinueAsNewWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md).[backoffStartInterval](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md#backoffstartinterval)

___

### cronSchedule

• **cronSchedule**: *string*

ContinueAsNewWorkflowExecutionCommandAttributes cronSchedule.

Implementation of: [IContinueAsNewWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md).[cronSchedule](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md#cronschedule)

___

### failure

• `Optional` **failure**: *null* \| [*IFailure*](../interfaces/proto.temporal.api.failure.v1.ifailure.md)

ContinueAsNewWorkflowExecutionCommandAttributes failure.

Implementation of: [IContinueAsNewWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md).[failure](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md#failure)

___

### header

• `Optional` **header**: *null* \| [*IHeader*](../interfaces/proto.temporal.api.common.v1.iheader.md)

ContinueAsNewWorkflowExecutionCommandAttributes header.

Implementation of: [IContinueAsNewWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md).[header](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md#header)

___

### initiator

• **initiator**: [*ContinueAsNewInitiator*](../enums/proto.temporal.api.enums.v1.continueasnewinitiator.md)

ContinueAsNewWorkflowExecutionCommandAttributes initiator.

Implementation of: [IContinueAsNewWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md).[initiator](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md#initiator)

___

### input

• `Optional` **input**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

ContinueAsNewWorkflowExecutionCommandAttributes input.

Implementation of: [IContinueAsNewWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md).[input](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md#input)

___

### lastCompletionResult

• `Optional` **lastCompletionResult**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

ContinueAsNewWorkflowExecutionCommandAttributes lastCompletionResult.

Implementation of: [IContinueAsNewWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md).[lastCompletionResult](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md#lastcompletionresult)

___

### memo

• `Optional` **memo**: *null* \| [*IMemo*](../interfaces/proto.temporal.api.common.v1.imemo.md)

ContinueAsNewWorkflowExecutionCommandAttributes memo.

Implementation of: [IContinueAsNewWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md).[memo](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md#memo)

___

### retryPolicy

• `Optional` **retryPolicy**: *null* \| [*IRetryPolicy*](../interfaces/proto.temporal.api.common.v1.iretrypolicy.md)

ContinueAsNewWorkflowExecutionCommandAttributes retryPolicy.

Implementation of: [IContinueAsNewWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md).[retryPolicy](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md#retrypolicy)

___

### searchAttributes

• `Optional` **searchAttributes**: *null* \| [*ISearchAttributes*](../interfaces/proto.temporal.api.common.v1.isearchattributes.md)

ContinueAsNewWorkflowExecutionCommandAttributes searchAttributes.

Implementation of: [IContinueAsNewWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md).[searchAttributes](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md#searchattributes)

___

### taskQueue

• `Optional` **taskQueue**: *null* \| [*ITaskQueue*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueue.md)

ContinueAsNewWorkflowExecutionCommandAttributes taskQueue.

Implementation of: [IContinueAsNewWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md).[taskQueue](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md#taskqueue)

___

### workflowRunTimeout

• `Optional` **workflowRunTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

ContinueAsNewWorkflowExecutionCommandAttributes workflowRunTimeout.

Implementation of: [IContinueAsNewWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md).[workflowRunTimeout](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md#workflowruntimeout)

___

### workflowTaskTimeout

• `Optional` **workflowTaskTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

ContinueAsNewWorkflowExecutionCommandAttributes workflowTaskTimeout.

Implementation of: [IContinueAsNewWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md).[workflowTaskTimeout](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md#workflowtasktimeout)

___

### workflowType

• `Optional` **workflowType**: *null* \| [*IWorkflowType*](../interfaces/proto.temporal.api.common.v1.iworkflowtype.md)

ContinueAsNewWorkflowExecutionCommandAttributes workflowType.

Implementation of: [IContinueAsNewWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md).[workflowType](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md#workflowtype)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ContinueAsNewWorkflowExecutionCommandAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IContinueAsNewWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md)): [*ContinueAsNewWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md)

Creates a new ContinueAsNewWorkflowExecutionCommandAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IContinueAsNewWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md) |

**Returns:** [*ContinueAsNewWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md)

ContinueAsNewWorkflowExecutionCommandAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ContinueAsNewWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md)

Decodes a ContinueAsNewWorkflowExecutionCommandAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ContinueAsNewWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md)

ContinueAsNewWorkflowExecutionCommandAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ContinueAsNewWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md)

Decodes a ContinueAsNewWorkflowExecutionCommandAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ContinueAsNewWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md)

ContinueAsNewWorkflowExecutionCommandAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IContinueAsNewWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified ContinueAsNewWorkflowExecutionCommandAttributes message. Does not implicitly [verify](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IContinueAsNewWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md) | ContinueAsNewWorkflowExecutionCommandAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IContinueAsNewWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified ContinueAsNewWorkflowExecutionCommandAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IContinueAsNewWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md) | ContinueAsNewWorkflowExecutionCommandAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ContinueAsNewWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md)

Creates a ContinueAsNewWorkflowExecutionCommandAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ContinueAsNewWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md)

ContinueAsNewWorkflowExecutionCommandAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*ContinueAsNewWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ContinueAsNewWorkflowExecutionCommandAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ContinueAsNewWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.continueasnewworkflowexecutioncommandattributes.md) | ContinueAsNewWorkflowExecutionCommandAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ContinueAsNewWorkflowExecutionCommandAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
