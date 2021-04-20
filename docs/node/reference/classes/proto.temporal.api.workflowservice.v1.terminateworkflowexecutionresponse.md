# Class: TerminateWorkflowExecutionResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).TerminateWorkflowExecutionResponse

Represents a TerminateWorkflowExecutionResponse.

## Implements

* [*ITerminateWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionresponse.md#constructor)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionresponse.md#verify)

## Constructors

### constructor

\+ **new TerminateWorkflowExecutionResponse**(`properties?`: [*ITerminateWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionresponse.md)): [*TerminateWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionresponse.md)

Constructs a new TerminateWorkflowExecutionResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ITerminateWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionresponse.md) |

**Returns:** [*TerminateWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionresponse.md)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this TerminateWorkflowExecutionResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ITerminateWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionresponse.md)): [*TerminateWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionresponse.md)

Creates a new TerminateWorkflowExecutionResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ITerminateWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionresponse.md) |

**Returns:** [*TerminateWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionresponse.md)

TerminateWorkflowExecutionResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*TerminateWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionresponse.md)

Decodes a TerminateWorkflowExecutionResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*TerminateWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionresponse.md)

TerminateWorkflowExecutionResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*TerminateWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionresponse.md)

Decodes a TerminateWorkflowExecutionResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*TerminateWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionresponse.md)

TerminateWorkflowExecutionResponse

___

### encode

▸ `Static`**encode**(`message`: [*ITerminateWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified TerminateWorkflowExecutionResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ITerminateWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionresponse.md) | TerminateWorkflowExecutionResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ITerminateWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified TerminateWorkflowExecutionResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ITerminateWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionresponse.md) | TerminateWorkflowExecutionResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*TerminateWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionresponse.md)

Creates a TerminateWorkflowExecutionResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*TerminateWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionresponse.md)

TerminateWorkflowExecutionResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*TerminateWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a TerminateWorkflowExecutionResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*TerminateWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.terminateworkflowexecutionresponse.md) | TerminateWorkflowExecutionResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a TerminateWorkflowExecutionResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
