# Class: SignalWithStartWorkflowExecutionResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).SignalWithStartWorkflowExecutionResponse

Represents a SignalWithStartWorkflowExecutionResponse.

## Implements

* [*ISignalWithStartWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionresponse.md#constructor)

### Properties

- [runId](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionresponse.md#runid)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionresponse.md#verify)

## Constructors

### constructor

\+ **new SignalWithStartWorkflowExecutionResponse**(`properties?`: [*ISignalWithStartWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionresponse.md)): [*SignalWithStartWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionresponse.md)

Constructs a new SignalWithStartWorkflowExecutionResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ISignalWithStartWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionresponse.md) |

**Returns:** [*SignalWithStartWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionresponse.md)

## Properties

### runId

• **runId**: *string*

SignalWithStartWorkflowExecutionResponse runId.

Implementation of: [ISignalWithStartWorkflowExecutionResponse](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionresponse.md).[runId](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionresponse.md#runid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this SignalWithStartWorkflowExecutionResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ISignalWithStartWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionresponse.md)): [*SignalWithStartWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionresponse.md)

Creates a new SignalWithStartWorkflowExecutionResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ISignalWithStartWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionresponse.md) |

**Returns:** [*SignalWithStartWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionresponse.md)

SignalWithStartWorkflowExecutionResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*SignalWithStartWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionresponse.md)

Decodes a SignalWithStartWorkflowExecutionResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*SignalWithStartWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionresponse.md)

SignalWithStartWorkflowExecutionResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*SignalWithStartWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionresponse.md)

Decodes a SignalWithStartWorkflowExecutionResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*SignalWithStartWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionresponse.md)

SignalWithStartWorkflowExecutionResponse

___

### encode

▸ `Static`**encode**(`message`: [*ISignalWithStartWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified SignalWithStartWorkflowExecutionResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ISignalWithStartWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionresponse.md) | SignalWithStartWorkflowExecutionResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ISignalWithStartWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified SignalWithStartWorkflowExecutionResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ISignalWithStartWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.isignalwithstartworkflowexecutionresponse.md) | SignalWithStartWorkflowExecutionResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*SignalWithStartWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionresponse.md)

Creates a SignalWithStartWorkflowExecutionResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*SignalWithStartWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionresponse.md)

SignalWithStartWorkflowExecutionResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*SignalWithStartWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a SignalWithStartWorkflowExecutionResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*SignalWithStartWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.signalwithstartworkflowexecutionresponse.md) | SignalWithStartWorkflowExecutionResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a SignalWithStartWorkflowExecutionResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
