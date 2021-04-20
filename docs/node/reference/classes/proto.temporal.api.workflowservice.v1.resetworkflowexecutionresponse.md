# Class: ResetWorkflowExecutionResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).ResetWorkflowExecutionResponse

Represents a ResetWorkflowExecutionResponse.

## Implements

* [*IResetWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iresetworkflowexecutionresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.resetworkflowexecutionresponse.md#constructor)

### Properties

- [runId](proto.temporal.api.workflowservice.v1.resetworkflowexecutionresponse.md#runid)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.resetworkflowexecutionresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.resetworkflowexecutionresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.resetworkflowexecutionresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.resetworkflowexecutionresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.resetworkflowexecutionresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.resetworkflowexecutionresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.resetworkflowexecutionresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.resetworkflowexecutionresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.resetworkflowexecutionresponse.md#verify)

## Constructors

### constructor

\+ **new ResetWorkflowExecutionResponse**(`properties?`: [*IResetWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iresetworkflowexecutionresponse.md)): [*ResetWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.resetworkflowexecutionresponse.md)

Constructs a new ResetWorkflowExecutionResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IResetWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iresetworkflowexecutionresponse.md) |

**Returns:** [*ResetWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.resetworkflowexecutionresponse.md)

## Properties

### runId

• **runId**: *string*

ResetWorkflowExecutionResponse runId.

Implementation of: [IResetWorkflowExecutionResponse](../interfaces/proto.temporal.api.workflowservice.v1.iresetworkflowexecutionresponse.md).[runId](../interfaces/proto.temporal.api.workflowservice.v1.iresetworkflowexecutionresponse.md#runid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ResetWorkflowExecutionResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IResetWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iresetworkflowexecutionresponse.md)): [*ResetWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.resetworkflowexecutionresponse.md)

Creates a new ResetWorkflowExecutionResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IResetWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iresetworkflowexecutionresponse.md) |

**Returns:** [*ResetWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.resetworkflowexecutionresponse.md)

ResetWorkflowExecutionResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ResetWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.resetworkflowexecutionresponse.md)

Decodes a ResetWorkflowExecutionResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ResetWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.resetworkflowexecutionresponse.md)

ResetWorkflowExecutionResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ResetWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.resetworkflowexecutionresponse.md)

Decodes a ResetWorkflowExecutionResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ResetWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.resetworkflowexecutionresponse.md)

ResetWorkflowExecutionResponse

___

### encode

▸ `Static`**encode**(`message`: [*IResetWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iresetworkflowexecutionresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified ResetWorkflowExecutionResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.resetworkflowexecutionresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IResetWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iresetworkflowexecutionresponse.md) | ResetWorkflowExecutionResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IResetWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iresetworkflowexecutionresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified ResetWorkflowExecutionResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.resetworkflowexecutionresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IResetWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iresetworkflowexecutionresponse.md) | ResetWorkflowExecutionResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ResetWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.resetworkflowexecutionresponse.md)

Creates a ResetWorkflowExecutionResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ResetWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.resetworkflowexecutionresponse.md)

ResetWorkflowExecutionResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*ResetWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.resetworkflowexecutionresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ResetWorkflowExecutionResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ResetWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.resetworkflowexecutionresponse.md) | ResetWorkflowExecutionResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ResetWorkflowExecutionResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
