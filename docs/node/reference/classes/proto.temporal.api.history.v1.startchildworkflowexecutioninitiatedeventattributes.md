# Class: StartChildWorkflowExecutionInitiatedEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).StartChildWorkflowExecutionInitiatedEventAttributes

Represents a StartChildWorkflowExecutionInitiatedEventAttributes.

## Implements

* [*IStartChildWorkflowExecutionInitiatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md#constructor)

### Properties

- [control](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md#control)
- [cronSchedule](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md#cronschedule)
- [header](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md#header)
- [input](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md#input)
- [memo](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md#memo)
- [namespace](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md#namespace)
- [parentClosePolicy](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md#parentclosepolicy)
- [retryPolicy](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md#retrypolicy)
- [searchAttributes](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md#searchattributes)
- [taskQueue](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md#taskqueue)
- [workflowExecutionTimeout](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md#workflowexecutiontimeout)
- [workflowId](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md#workflowid)
- [workflowIdReusePolicy](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md#workflowidreusepolicy)
- [workflowRunTimeout](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md#workflowruntimeout)
- [workflowTaskCompletedEventId](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md#workflowtaskcompletedeventid)
- [workflowTaskTimeout](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md#workflowtasktimeout)
- [workflowType](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md#workflowtype)

### Methods

- [toJSON](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md#create)
- [decode](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md#verify)

## Constructors

### constructor

\+ **new StartChildWorkflowExecutionInitiatedEventAttributes**(`properties?`: [*IStartChildWorkflowExecutionInitiatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md)): [*StartChildWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md)

Constructs a new StartChildWorkflowExecutionInitiatedEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IStartChildWorkflowExecutionInitiatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md) |

**Returns:** [*StartChildWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md)

## Properties

### control

• **control**: *string*

StartChildWorkflowExecutionInitiatedEventAttributes control.

Implementation of: [IStartChildWorkflowExecutionInitiatedEventAttributes](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md).[control](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md#control)

___

### cronSchedule

• **cronSchedule**: *string*

StartChildWorkflowExecutionInitiatedEventAttributes cronSchedule.

Implementation of: [IStartChildWorkflowExecutionInitiatedEventAttributes](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md).[cronSchedule](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md#cronschedule)

___

### header

• `Optional` **header**: *null* \| [*IHeader*](../interfaces/proto.temporal.api.common.v1.iheader.md)

StartChildWorkflowExecutionInitiatedEventAttributes header.

Implementation of: [IStartChildWorkflowExecutionInitiatedEventAttributes](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md).[header](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md#header)

___

### input

• `Optional` **input**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

StartChildWorkflowExecutionInitiatedEventAttributes input.

Implementation of: [IStartChildWorkflowExecutionInitiatedEventAttributes](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md).[input](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md#input)

___

### memo

• `Optional` **memo**: *null* \| [*IMemo*](../interfaces/proto.temporal.api.common.v1.imemo.md)

StartChildWorkflowExecutionInitiatedEventAttributes memo.

Implementation of: [IStartChildWorkflowExecutionInitiatedEventAttributes](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md).[memo](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md#memo)

___

### namespace

• **namespace**: *string*

StartChildWorkflowExecutionInitiatedEventAttributes namespace.

Implementation of: [IStartChildWorkflowExecutionInitiatedEventAttributes](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md).[namespace](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md#namespace)

___

### parentClosePolicy

• **parentClosePolicy**: [*ParentClosePolicy*](../enums/proto.temporal.api.enums.v1.parentclosepolicy.md)

StartChildWorkflowExecutionInitiatedEventAttributes parentClosePolicy.

Implementation of: [IStartChildWorkflowExecutionInitiatedEventAttributes](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md).[parentClosePolicy](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md#parentclosepolicy)

___

### retryPolicy

• `Optional` **retryPolicy**: *null* \| [*IRetryPolicy*](../interfaces/proto.temporal.api.common.v1.iretrypolicy.md)

StartChildWorkflowExecutionInitiatedEventAttributes retryPolicy.

Implementation of: [IStartChildWorkflowExecutionInitiatedEventAttributes](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md).[retryPolicy](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md#retrypolicy)

___

### searchAttributes

• `Optional` **searchAttributes**: *null* \| [*ISearchAttributes*](../interfaces/proto.temporal.api.common.v1.isearchattributes.md)

StartChildWorkflowExecutionInitiatedEventAttributes searchAttributes.

Implementation of: [IStartChildWorkflowExecutionInitiatedEventAttributes](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md).[searchAttributes](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md#searchattributes)

___

### taskQueue

• `Optional` **taskQueue**: *null* \| [*ITaskQueue*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueue.md)

StartChildWorkflowExecutionInitiatedEventAttributes taskQueue.

Implementation of: [IStartChildWorkflowExecutionInitiatedEventAttributes](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md).[taskQueue](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md#taskqueue)

___

### workflowExecutionTimeout

• `Optional` **workflowExecutionTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

StartChildWorkflowExecutionInitiatedEventAttributes workflowExecutionTimeout.

Implementation of: [IStartChildWorkflowExecutionInitiatedEventAttributes](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md).[workflowExecutionTimeout](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md#workflowexecutiontimeout)

___

### workflowId

• **workflowId**: *string*

StartChildWorkflowExecutionInitiatedEventAttributes workflowId.

Implementation of: [IStartChildWorkflowExecutionInitiatedEventAttributes](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md).[workflowId](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md#workflowid)

___

### workflowIdReusePolicy

• **workflowIdReusePolicy**: [*WorkflowIdReusePolicy*](../enums/proto.temporal.api.enums.v1.workflowidreusepolicy.md)

StartChildWorkflowExecutionInitiatedEventAttributes workflowIdReusePolicy.

Implementation of: [IStartChildWorkflowExecutionInitiatedEventAttributes](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md).[workflowIdReusePolicy](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md#workflowidreusepolicy)

___

### workflowRunTimeout

• `Optional` **workflowRunTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

StartChildWorkflowExecutionInitiatedEventAttributes workflowRunTimeout.

Implementation of: [IStartChildWorkflowExecutionInitiatedEventAttributes](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md).[workflowRunTimeout](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md#workflowruntimeout)

___

### workflowTaskCompletedEventId

• **workflowTaskCompletedEventId**: Long

StartChildWorkflowExecutionInitiatedEventAttributes workflowTaskCompletedEventId.

Implementation of: [IStartChildWorkflowExecutionInitiatedEventAttributes](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md).[workflowTaskCompletedEventId](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md#workflowtaskcompletedeventid)

___

### workflowTaskTimeout

• `Optional` **workflowTaskTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

StartChildWorkflowExecutionInitiatedEventAttributes workflowTaskTimeout.

Implementation of: [IStartChildWorkflowExecutionInitiatedEventAttributes](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md).[workflowTaskTimeout](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md#workflowtasktimeout)

___

### workflowType

• `Optional` **workflowType**: *null* \| [*IWorkflowType*](../interfaces/proto.temporal.api.common.v1.iworkflowtype.md)

StartChildWorkflowExecutionInitiatedEventAttributes workflowType.

Implementation of: [IStartChildWorkflowExecutionInitiatedEventAttributes](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md).[workflowType](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md#workflowtype)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this StartChildWorkflowExecutionInitiatedEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IStartChildWorkflowExecutionInitiatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md)): [*StartChildWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md)

Creates a new StartChildWorkflowExecutionInitiatedEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IStartChildWorkflowExecutionInitiatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md) |

**Returns:** [*StartChildWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md)

StartChildWorkflowExecutionInitiatedEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*StartChildWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md)

Decodes a StartChildWorkflowExecutionInitiatedEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*StartChildWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md)

StartChildWorkflowExecutionInitiatedEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*StartChildWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md)

Decodes a StartChildWorkflowExecutionInitiatedEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*StartChildWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md)

StartChildWorkflowExecutionInitiatedEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IStartChildWorkflowExecutionInitiatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified StartChildWorkflowExecutionInitiatedEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IStartChildWorkflowExecutionInitiatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md) | StartChildWorkflowExecutionInitiatedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IStartChildWorkflowExecutionInitiatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified StartChildWorkflowExecutionInitiatedEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IStartChildWorkflowExecutionInitiatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md) | StartChildWorkflowExecutionInitiatedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*StartChildWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md)

Creates a StartChildWorkflowExecutionInitiatedEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*StartChildWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md)

StartChildWorkflowExecutionInitiatedEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*StartChildWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a StartChildWorkflowExecutionInitiatedEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*StartChildWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.startchildworkflowexecutioninitiatedeventattributes.md) | StartChildWorkflowExecutionInitiatedEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a StartChildWorkflowExecutionInitiatedEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
