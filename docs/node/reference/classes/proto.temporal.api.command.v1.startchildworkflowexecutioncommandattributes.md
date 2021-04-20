# Class: StartChildWorkflowExecutionCommandAttributes

[command](../modules/proto.temporal.api.command.md).[v1](../modules/proto.temporal.api.command.v1.md).StartChildWorkflowExecutionCommandAttributes

Represents a StartChildWorkflowExecutionCommandAttributes.

## Implements

* [*IStartChildWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md#constructor)

### Properties

- [control](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md#control)
- [cronSchedule](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md#cronschedule)
- [header](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md#header)
- [input](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md#input)
- [memo](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md#memo)
- [namespace](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md#namespace)
- [parentClosePolicy](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md#parentclosepolicy)
- [retryPolicy](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md#retrypolicy)
- [searchAttributes](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md#searchattributes)
- [taskQueue](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md#taskqueue)
- [workflowExecutionTimeout](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md#workflowexecutiontimeout)
- [workflowId](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md#workflowid)
- [workflowIdReusePolicy](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md#workflowidreusepolicy)
- [workflowRunTimeout](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md#workflowruntimeout)
- [workflowTaskTimeout](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md#workflowtasktimeout)
- [workflowType](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md#workflowtype)

### Methods

- [toJSON](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md#tojson)
- [create](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md#create)
- [decode](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md#decode)
- [decodeDelimited](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md#decodedelimited)
- [encode](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md#encode)
- [encodeDelimited](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md#fromobject)
- [toObject](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md#toobject)
- [verify](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md#verify)

## Constructors

### constructor

\+ **new StartChildWorkflowExecutionCommandAttributes**(`properties?`: [*IStartChildWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md)): [*StartChildWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md)

Constructs a new StartChildWorkflowExecutionCommandAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IStartChildWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md) |

**Returns:** [*StartChildWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md)

## Properties

### control

• **control**: *string*

StartChildWorkflowExecutionCommandAttributes control.

Implementation of: [IStartChildWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md).[control](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md#control)

___

### cronSchedule

• **cronSchedule**: *string*

StartChildWorkflowExecutionCommandAttributes cronSchedule.

Implementation of: [IStartChildWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md).[cronSchedule](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md#cronschedule)

___

### header

• `Optional` **header**: *null* \| [*IHeader*](../interfaces/proto.temporal.api.common.v1.iheader.md)

StartChildWorkflowExecutionCommandAttributes header.

Implementation of: [IStartChildWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md).[header](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md#header)

___

### input

• `Optional` **input**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

StartChildWorkflowExecutionCommandAttributes input.

Implementation of: [IStartChildWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md).[input](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md#input)

___

### memo

• `Optional` **memo**: *null* \| [*IMemo*](../interfaces/proto.temporal.api.common.v1.imemo.md)

StartChildWorkflowExecutionCommandAttributes memo.

Implementation of: [IStartChildWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md).[memo](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md#memo)

___

### namespace

• **namespace**: *string*

StartChildWorkflowExecutionCommandAttributes namespace.

Implementation of: [IStartChildWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md).[namespace](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md#namespace)

___

### parentClosePolicy

• **parentClosePolicy**: [*ParentClosePolicy*](../enums/proto.temporal.api.enums.v1.parentclosepolicy.md)

StartChildWorkflowExecutionCommandAttributes parentClosePolicy.

Implementation of: [IStartChildWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md).[parentClosePolicy](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md#parentclosepolicy)

___

### retryPolicy

• `Optional` **retryPolicy**: *null* \| [*IRetryPolicy*](../interfaces/proto.temporal.api.common.v1.iretrypolicy.md)

StartChildWorkflowExecutionCommandAttributes retryPolicy.

Implementation of: [IStartChildWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md).[retryPolicy](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md#retrypolicy)

___

### searchAttributes

• `Optional` **searchAttributes**: *null* \| [*ISearchAttributes*](../interfaces/proto.temporal.api.common.v1.isearchattributes.md)

StartChildWorkflowExecutionCommandAttributes searchAttributes.

Implementation of: [IStartChildWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md).[searchAttributes](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md#searchattributes)

___

### taskQueue

• `Optional` **taskQueue**: *null* \| [*ITaskQueue*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueue.md)

StartChildWorkflowExecutionCommandAttributes taskQueue.

Implementation of: [IStartChildWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md).[taskQueue](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md#taskqueue)

___

### workflowExecutionTimeout

• `Optional` **workflowExecutionTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

StartChildWorkflowExecutionCommandAttributes workflowExecutionTimeout.

Implementation of: [IStartChildWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md).[workflowExecutionTimeout](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md#workflowexecutiontimeout)

___

### workflowId

• **workflowId**: *string*

StartChildWorkflowExecutionCommandAttributes workflowId.

Implementation of: [IStartChildWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md).[workflowId](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md#workflowid)

___

### workflowIdReusePolicy

• **workflowIdReusePolicy**: [*WorkflowIdReusePolicy*](../enums/proto.temporal.api.enums.v1.workflowidreusepolicy.md)

StartChildWorkflowExecutionCommandAttributes workflowIdReusePolicy.

Implementation of: [IStartChildWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md).[workflowIdReusePolicy](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md#workflowidreusepolicy)

___

### workflowRunTimeout

• `Optional` **workflowRunTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

StartChildWorkflowExecutionCommandAttributes workflowRunTimeout.

Implementation of: [IStartChildWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md).[workflowRunTimeout](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md#workflowruntimeout)

___

### workflowTaskTimeout

• `Optional` **workflowTaskTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

StartChildWorkflowExecutionCommandAttributes workflowTaskTimeout.

Implementation of: [IStartChildWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md).[workflowTaskTimeout](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md#workflowtasktimeout)

___

### workflowType

• `Optional` **workflowType**: *null* \| [*IWorkflowType*](../interfaces/proto.temporal.api.common.v1.iworkflowtype.md)

StartChildWorkflowExecutionCommandAttributes workflowType.

Implementation of: [IStartChildWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md).[workflowType](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md#workflowtype)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this StartChildWorkflowExecutionCommandAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IStartChildWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md)): [*StartChildWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md)

Creates a new StartChildWorkflowExecutionCommandAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IStartChildWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md) |

**Returns:** [*StartChildWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md)

StartChildWorkflowExecutionCommandAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*StartChildWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md)

Decodes a StartChildWorkflowExecutionCommandAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*StartChildWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md)

StartChildWorkflowExecutionCommandAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*StartChildWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md)

Decodes a StartChildWorkflowExecutionCommandAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*StartChildWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md)

StartChildWorkflowExecutionCommandAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IStartChildWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified StartChildWorkflowExecutionCommandAttributes message. Does not implicitly [verify](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IStartChildWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md) | StartChildWorkflowExecutionCommandAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IStartChildWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified StartChildWorkflowExecutionCommandAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IStartChildWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md) | StartChildWorkflowExecutionCommandAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*StartChildWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md)

Creates a StartChildWorkflowExecutionCommandAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*StartChildWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md)

StartChildWorkflowExecutionCommandAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*StartChildWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a StartChildWorkflowExecutionCommandAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*StartChildWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.startchildworkflowexecutioncommandattributes.md) | StartChildWorkflowExecutionCommandAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a StartChildWorkflowExecutionCommandAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
