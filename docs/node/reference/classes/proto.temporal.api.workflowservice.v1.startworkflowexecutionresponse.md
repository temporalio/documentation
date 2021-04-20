# Class: StartWorkflowExecutionResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).StartWorkflowExecutionResponse

Represents a StartWorkflowExecutionResponse.

## Implements

* [*IStartWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.startworkflowexecutionresponse.md#constructor)

### Properties

- [runId](proto.temporal.api.workflowservice.v1.startworkflowexecutionresponse.md#runid)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.startworkflowexecutionresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.startworkflowexecutionresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.startworkflowexecutionresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.startworkflowexecutionresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.startworkflowexecutionresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.startworkflowexecutionresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.startworkflowexecutionresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.startworkflowexecutionresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.startworkflowexecutionresponse.md#verify)

## Constructors

### constructor

\+ **new StartWorkflowExecutionResponse**(`properties?`: [*IStartWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionresponse.md)): [*StartWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.startworkflowexecutionresponse.md)

Constructs a new StartWorkflowExecutionResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IStartWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionresponse.md) |

**Returns:** [*StartWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.startworkflowexecutionresponse.md)

## Properties

### runId

• **runId**: *string*

StartWorkflowExecutionResponse runId.

Implementation of: [IStartWorkflowExecutionResponse](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionresponse.md).[runId](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionresponse.md#runid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this StartWorkflowExecutionResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IStartWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionresponse.md)): [*StartWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.startworkflowexecutionresponse.md)

Creates a new StartWorkflowExecutionResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IStartWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionresponse.md) |

**Returns:** [*StartWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.startworkflowexecutionresponse.md)

StartWorkflowExecutionResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*StartWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.startworkflowexecutionresponse.md)

Decodes a StartWorkflowExecutionResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*StartWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.startworkflowexecutionresponse.md)

StartWorkflowExecutionResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*StartWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.startworkflowexecutionresponse.md)

Decodes a StartWorkflowExecutionResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*StartWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.startworkflowexecutionresponse.md)

StartWorkflowExecutionResponse

___

### encode

▸ `Static`**encode**(`message`: [*IStartWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified StartWorkflowExecutionResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.startworkflowexecutionresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IStartWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionresponse.md) | StartWorkflowExecutionResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IStartWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified StartWorkflowExecutionResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.startworkflowexecutionresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IStartWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.istartworkflowexecutionresponse.md) | StartWorkflowExecutionResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*StartWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.startworkflowexecutionresponse.md)

Creates a StartWorkflowExecutionResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*StartWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.startworkflowexecutionresponse.md)

StartWorkflowExecutionResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*StartWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.startworkflowexecutionresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a StartWorkflowExecutionResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*StartWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.startworkflowexecutionresponse.md) | StartWorkflowExecutionResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a StartWorkflowExecutionResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
