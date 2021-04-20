# Class: RequestCancelWorkflowExecutionResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).RequestCancelWorkflowExecutionResponse

Represents a RequestCancelWorkflowExecutionResponse.

## Implements

* [*IRequestCancelWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionresponse.md#constructor)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionresponse.md#verify)

## Constructors

### constructor

\+ **new RequestCancelWorkflowExecutionResponse**(`properties?`: [*IRequestCancelWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionresponse.md)): [*RequestCancelWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionresponse.md)

Constructs a new RequestCancelWorkflowExecutionResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRequestCancelWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionresponse.md) |

**Returns:** [*RequestCancelWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionresponse.md)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this RequestCancelWorkflowExecutionResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IRequestCancelWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionresponse.md)): [*RequestCancelWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionresponse.md)

Creates a new RequestCancelWorkflowExecutionResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRequestCancelWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionresponse.md) |

**Returns:** [*RequestCancelWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionresponse.md)

RequestCancelWorkflowExecutionResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*RequestCancelWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionresponse.md)

Decodes a RequestCancelWorkflowExecutionResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*RequestCancelWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionresponse.md)

RequestCancelWorkflowExecutionResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*RequestCancelWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionresponse.md)

Decodes a RequestCancelWorkflowExecutionResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*RequestCancelWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionresponse.md)

RequestCancelWorkflowExecutionResponse

___

### encode

▸ `Static`**encode**(`message`: [*IRequestCancelWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified RequestCancelWorkflowExecutionResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRequestCancelWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionresponse.md) | RequestCancelWorkflowExecutionResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IRequestCancelWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified RequestCancelWorkflowExecutionResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRequestCancelWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionresponse.md) | RequestCancelWorkflowExecutionResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*RequestCancelWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionresponse.md)

Creates a RequestCancelWorkflowExecutionResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*RequestCancelWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionresponse.md)

RequestCancelWorkflowExecutionResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*RequestCancelWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a RequestCancelWorkflowExecutionResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*RequestCancelWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.requestcancelworkflowexecutionresponse.md) | RequestCancelWorkflowExecutionResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a RequestCancelWorkflowExecutionResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
