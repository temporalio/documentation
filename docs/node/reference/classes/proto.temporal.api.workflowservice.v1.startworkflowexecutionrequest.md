# Class: StartWorkflowExecutionRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).StartWorkflowExecutionRequest

Represents a StartWorkflowExecutionRequest.

## Implements

* [*IStartWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md#constructor)

### Properties

- [cronSchedule](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md#cronschedule)
- [header](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md#header)
- [identity](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md#identity)
- [input](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md#input)
- [memo](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md#memo)
- [namespace](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md#namespace)
- [requestId](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md#requestid)
- [retryPolicy](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md#retrypolicy)
- [searchAttributes](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md#searchattributes)
- [taskQueue](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md#taskqueue)
- [workflowExecutionTimeout](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md#workflowexecutiontimeout)
- [workflowId](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md#workflowid)
- [workflowIdReusePolicy](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md#workflowidreusepolicy)
- [workflowRunTimeout](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md#workflowruntimeout)
- [workflowTaskTimeout](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md#workflowtasktimeout)
- [workflowType](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md#workflowtype)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md#verify)

## Constructors

### constructor

\+ **new StartWorkflowExecutionRequest**(`properties?`: [*IStartWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md)): [*StartWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md)

Constructs a new StartWorkflowExecutionRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IStartWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md) |

**Returns:** [*StartWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md)

## Properties

### cronSchedule

• **cronSchedule**: *string*

StartWorkflowExecutionRequest cronSchedule.

Implementation of: [IStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md).[cronSchedule](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md#cronschedule)

___

### header

• `Optional` **header**: *null* \| [*IHeader*](../interfaces/proto.temporal.api.common.v1.iheader.md)

StartWorkflowExecutionRequest header.

Implementation of: [IStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md).[header](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md#header)

___

### identity

• **identity**: *string*

StartWorkflowExecutionRequest identity.

Implementation of: [IStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md).[identity](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md#identity)

___

### input

• `Optional` **input**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

StartWorkflowExecutionRequest input.

Implementation of: [IStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md).[input](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md#input)

___

### memo

• `Optional` **memo**: *null* \| [*IMemo*](../interfaces/proto.temporal.api.common.v1.imemo.md)

StartWorkflowExecutionRequest memo.

Implementation of: [IStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md).[memo](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md#memo)

___

### namespace

• **namespace**: *string*

StartWorkflowExecutionRequest namespace.

Implementation of: [IStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md).[namespace](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md#namespace)

___

### requestId

• **requestId**: *string*

StartWorkflowExecutionRequest requestId.

Implementation of: [IStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md).[requestId](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md#requestid)

___

### retryPolicy

• `Optional` **retryPolicy**: *null* \| [*IRetryPolicy*](../interfaces/proto.temporal.api.common.v1.iretrypolicy.md)

StartWorkflowExecutionRequest retryPolicy.

Implementation of: [IStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md).[retryPolicy](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md#retrypolicy)

___

### searchAttributes

• `Optional` **searchAttributes**: *null* \| [*ISearchAttributes*](../interfaces/proto.temporal.api.common.v1.isearchattributes.md)

StartWorkflowExecutionRequest searchAttributes.

Implementation of: [IStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md).[searchAttributes](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md#searchattributes)

___

### taskQueue

• `Optional` **taskQueue**: *null* \| [*ITaskQueue*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueue.md)

StartWorkflowExecutionRequest taskQueue.

Implementation of: [IStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md).[taskQueue](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md#taskqueue)

___

### workflowExecutionTimeout

• `Optional` **workflowExecutionTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

StartWorkflowExecutionRequest workflowExecutionTimeout.

Implementation of: [IStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md).[workflowExecutionTimeout](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md#workflowexecutiontimeout)

___

### workflowId

• **workflowId**: *string*

StartWorkflowExecutionRequest workflowId.

Implementation of: [IStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md).[workflowId](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md#workflowid)

___

### workflowIdReusePolicy

• **workflowIdReusePolicy**: [*WorkflowIdReusePolicy*](../enums/proto.temporal.api.enums.v1.workflowidreusepolicy.md)

StartWorkflowExecutionRequest workflowIdReusePolicy.

Implementation of: [IStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md).[workflowIdReusePolicy](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md#workflowidreusepolicy)

___

### workflowRunTimeout

• `Optional` **workflowRunTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

StartWorkflowExecutionRequest workflowRunTimeout.

Implementation of: [IStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md).[workflowRunTimeout](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md#workflowruntimeout)

___

### workflowTaskTimeout

• `Optional` **workflowTaskTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

StartWorkflowExecutionRequest workflowTaskTimeout.

Implementation of: [IStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md).[workflowTaskTimeout](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md#workflowtasktimeout)

___

### workflowType

• `Optional` **workflowType**: *null* \| [*IWorkflowType*](../interfaces/proto.temporal.api.common.v1.iworkflowtype.md)

StartWorkflowExecutionRequest workflowType.

Implementation of: [IStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md).[workflowType](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md#workflowtype)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this StartWorkflowExecutionRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IStartWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md)): [*StartWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md)

Creates a new StartWorkflowExecutionRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IStartWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md) |

**Returns:** [*StartWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md)

StartWorkflowExecutionRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*StartWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md)

Decodes a StartWorkflowExecutionRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*StartWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md)

StartWorkflowExecutionRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*StartWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md)

Decodes a StartWorkflowExecutionRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*StartWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md)

StartWorkflowExecutionRequest

___

### encode

▸ `Static`**encode**(`message`: [*IStartWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified StartWorkflowExecutionRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IStartWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md) | StartWorkflowExecutionRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IStartWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified StartWorkflowExecutionRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IStartWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionrequest.md) | StartWorkflowExecutionRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*StartWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md)

Creates a StartWorkflowExecutionRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*StartWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md)

StartWorkflowExecutionRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*StartWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a StartWorkflowExecutionRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*StartWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.startworkflowexecutionrequest.md) | StartWorkflowExecutionRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a StartWorkflowExecutionRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
