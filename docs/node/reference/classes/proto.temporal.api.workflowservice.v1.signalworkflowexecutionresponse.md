# Class: SignalWorkflowExecutionResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).SignalWorkflowExecutionResponse

Represents a SignalWorkflowExecutionResponse.

## Implements

* [*ISignalWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.signalworkflowexecutionresponse.md#constructor)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.signalworkflowexecutionresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.signalworkflowexecutionresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.signalworkflowexecutionresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.signalworkflowexecutionresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.signalworkflowexecutionresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.signalworkflowexecutionresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.signalworkflowexecutionresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.signalworkflowexecutionresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.signalworkflowexecutionresponse.md#verify)

## Constructors

### constructor

\+ **new SignalWorkflowExecutionResponse**(`properties?`: [*ISignalWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionresponse.md)): [*SignalWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.signalworkflowexecutionresponse.md)

Constructs a new SignalWorkflowExecutionResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ISignalWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionresponse.md) |

**Returns:** [*SignalWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.signalworkflowexecutionresponse.md)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this SignalWorkflowExecutionResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ISignalWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionresponse.md)): [*SignalWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.signalworkflowexecutionresponse.md)

Creates a new SignalWorkflowExecutionResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ISignalWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionresponse.md) |

**Returns:** [*SignalWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.signalworkflowexecutionresponse.md)

SignalWorkflowExecutionResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*SignalWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.signalworkflowexecutionresponse.md)

Decodes a SignalWorkflowExecutionResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*SignalWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.signalworkflowexecutionresponse.md)

SignalWorkflowExecutionResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*SignalWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.signalworkflowexecutionresponse.md)

Decodes a SignalWorkflowExecutionResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*SignalWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.signalworkflowexecutionresponse.md)

SignalWorkflowExecutionResponse

___

### encode

▸ `Static`**encode**(`message`: [*ISignalWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified SignalWorkflowExecutionResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.signalworkflowexecutionresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ISignalWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionresponse.md) | SignalWorkflowExecutionResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ISignalWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified SignalWorkflowExecutionResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.signalworkflowexecutionresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ISignalWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.isignalworkflowexecutionresponse.md) | SignalWorkflowExecutionResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*SignalWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.signalworkflowexecutionresponse.md)

Creates a SignalWorkflowExecutionResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*SignalWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.signalworkflowexecutionresponse.md)

SignalWorkflowExecutionResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*SignalWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.signalworkflowexecutionresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a SignalWorkflowExecutionResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*SignalWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.signalworkflowexecutionresponse.md) | SignalWorkflowExecutionResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a SignalWorkflowExecutionResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
