# Class: SignalWithStartWorkflowExecutionRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).SignalWithStartWorkflowExecutionRequest

Represents a SignalWithStartWorkflowExecutionRequest.

## Implements

* [*ISignalWithStartWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md#constructor)

### Properties

- [control](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md#control)
- [cronSchedule](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md#cronschedule)
- [header](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md#header)
- [identity](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md#identity)
- [input](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md#input)
- [memo](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md#memo)
- [namespace](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md#namespace)
- [requestId](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md#requestid)
- [retryPolicy](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md#retrypolicy)
- [searchAttributes](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md#searchattributes)
- [signalInput](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md#signalinput)
- [signalName](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md#signalname)
- [taskQueue](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md#taskqueue)
- [workflowExecutionTimeout](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md#workflowexecutiontimeout)
- [workflowId](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md#workflowid)
- [workflowIdReusePolicy](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md#workflowidreusepolicy)
- [workflowRunTimeout](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md#workflowruntimeout)
- [workflowTaskTimeout](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md#workflowtasktimeout)
- [workflowType](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md#workflowtype)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md#verify)

## Constructors

### constructor

\+ **new SignalWithStartWorkflowExecutionRequest**(`properties?`: [*ISignalWithStartWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md)): [*SignalWithStartWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md)

Constructs a new SignalWithStartWorkflowExecutionRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ISignalWithStartWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md) |

**Returns:** [*SignalWithStartWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md)

## Properties

### control

• **control**: *string*

SignalWithStartWorkflowExecutionRequest control.

Implementation of: [ISignalWithStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md).[control](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#control)

___

### cronSchedule

• **cronSchedule**: *string*

SignalWithStartWorkflowExecutionRequest cronSchedule.

Implementation of: [ISignalWithStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md).[cronSchedule](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#cronschedule)

___

### header

• `Optional` **header**: *null* \| [*IHeader*](../interfaces/proto.temporal.api.common.v1.iheader.md)

SignalWithStartWorkflowExecutionRequest header.

Implementation of: [ISignalWithStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md).[header](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#header)

___

### identity

• **identity**: *string*

SignalWithStartWorkflowExecutionRequest identity.

Implementation of: [ISignalWithStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md).[identity](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#identity)

___

### input

• `Optional` **input**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

SignalWithStartWorkflowExecutionRequest input.

Implementation of: [ISignalWithStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md).[input](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#input)

___

### memo

• `Optional` **memo**: *null* \| [*IMemo*](../interfaces/proto.temporal.api.common.v1.imemo.md)

SignalWithStartWorkflowExecutionRequest memo.

Implementation of: [ISignalWithStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md).[memo](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#memo)

___

### namespace

• **namespace**: *string*

SignalWithStartWorkflowExecutionRequest namespace.

Implementation of: [ISignalWithStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md).[namespace](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#namespace)

___

### requestId

• **requestId**: *string*

SignalWithStartWorkflowExecutionRequest requestId.

Implementation of: [ISignalWithStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md).[requestId](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#requestid)

___

### retryPolicy

• `Optional` **retryPolicy**: *null* \| [*IRetryPolicy*](../interfaces/proto.temporal.api.common.v1.iretrypolicy.md)

SignalWithStartWorkflowExecutionRequest retryPolicy.

Implementation of: [ISignalWithStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md).[retryPolicy](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#retrypolicy)

___

### searchAttributes

• `Optional` **searchAttributes**: *null* \| [*ISearchAttributes*](../interfaces/proto.temporal.api.common.v1.isearchattributes.md)

SignalWithStartWorkflowExecutionRequest searchAttributes.

Implementation of: [ISignalWithStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md).[searchAttributes](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#searchattributes)

___

### signalInput

• `Optional` **signalInput**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

SignalWithStartWorkflowExecutionRequest signalInput.

Implementation of: [ISignalWithStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md).[signalInput](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#signalinput)

___

### signalName

• **signalName**: *string*

SignalWithStartWorkflowExecutionRequest signalName.

Implementation of: [ISignalWithStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md).[signalName](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#signalname)

___

### taskQueue

• `Optional` **taskQueue**: *null* \| [*ITaskQueue*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueue.md)

SignalWithStartWorkflowExecutionRequest taskQueue.

Implementation of: [ISignalWithStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md).[taskQueue](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#taskqueue)

___

### workflowExecutionTimeout

• `Optional` **workflowExecutionTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

SignalWithStartWorkflowExecutionRequest workflowExecutionTimeout.

Implementation of: [ISignalWithStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md).[workflowExecutionTimeout](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#workflowexecutiontimeout)

___

### workflowId

• **workflowId**: *string*

SignalWithStartWorkflowExecutionRequest workflowId.

Implementation of: [ISignalWithStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md).[workflowId](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#workflowid)

___

### workflowIdReusePolicy

• **workflowIdReusePolicy**: [*WorkflowIdReusePolicy*](../enums/proto.temporal.api.enums.v1.workflowidreusepolicy.md)

SignalWithStartWorkflowExecutionRequest workflowIdReusePolicy.

Implementation of: [ISignalWithStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md).[workflowIdReusePolicy](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#workflowidreusepolicy)

___

### workflowRunTimeout

• `Optional` **workflowRunTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

SignalWithStartWorkflowExecutionRequest workflowRunTimeout.

Implementation of: [ISignalWithStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md).[workflowRunTimeout](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#workflowruntimeout)

___

### workflowTaskTimeout

• `Optional` **workflowTaskTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

SignalWithStartWorkflowExecutionRequest workflowTaskTimeout.

Implementation of: [ISignalWithStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md).[workflowTaskTimeout](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#workflowtasktimeout)

___

### workflowType

• `Optional` **workflowType**: *null* \| [*IWorkflowType*](../interfaces/proto.temporal.api.common.v1.iworkflowtype.md)

SignalWithStartWorkflowExecutionRequest workflowType.

Implementation of: [ISignalWithStartWorkflowExecutionRequest](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md).[workflowType](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md#workflowtype)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this SignalWithStartWorkflowExecutionRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ISignalWithStartWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md)): [*SignalWithStartWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md)

Creates a new SignalWithStartWorkflowExecutionRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ISignalWithStartWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md) |

**Returns:** [*SignalWithStartWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md)

SignalWithStartWorkflowExecutionRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*SignalWithStartWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md)

Decodes a SignalWithStartWorkflowExecutionRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*SignalWithStartWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md)

SignalWithStartWorkflowExecutionRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*SignalWithStartWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md)

Decodes a SignalWithStartWorkflowExecutionRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*SignalWithStartWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md)

SignalWithStartWorkflowExecutionRequest

___

### encode

▸ `Static`**encode**(`message`: [*ISignalWithStartWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified SignalWithStartWorkflowExecutionRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ISignalWithStartWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md) | SignalWithStartWorkflowExecutionRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ISignalWithStartWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified SignalWithStartWorkflowExecutionRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ISignalWithStartWorkflowExecutionRequest*](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionrequest.md) | SignalWithStartWorkflowExecutionRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*SignalWithStartWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md)

Creates a SignalWithStartWorkflowExecutionRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*SignalWithStartWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md)

SignalWithStartWorkflowExecutionRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*SignalWithStartWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a SignalWithStartWorkflowExecutionRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*SignalWithStartWorkflowExecutionRequest*](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionrequest.md) | SignalWithStartWorkflowExecutionRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a SignalWithStartWorkflowExecutionRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
