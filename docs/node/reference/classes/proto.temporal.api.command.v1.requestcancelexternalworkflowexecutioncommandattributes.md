# Class: RequestCancelExternalWorkflowExecutionCommandAttributes

[command](../modules/proto.temporal.api.command.md).[v1](../modules/proto.temporal.api.command.v1.md).RequestCancelExternalWorkflowExecutionCommandAttributes

Represents a RequestCancelExternalWorkflowExecutionCommandAttributes.

## Implements

* [*IRequestCancelExternalWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.irequestcancelexternalworkflowexecutioncommandattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.command.v1.requestcancelexternalworkflowexecutioncommandattributes.md#constructor)

### Properties

- [childWorkflowOnly](proto.temporal.api.command.v1.requestcancelexternalworkflowexecutioncommandattributes.md#childworkflowonly)
- [control](proto.temporal.api.command.v1.requestcancelexternalworkflowexecutioncommandattributes.md#control)
- [namespace](proto.temporal.api.command.v1.requestcancelexternalworkflowexecutioncommandattributes.md#namespace)
- [runId](proto.temporal.api.command.v1.requestcancelexternalworkflowexecutioncommandattributes.md#runid)
- [workflowId](proto.temporal.api.command.v1.requestcancelexternalworkflowexecutioncommandattributes.md#workflowid)

### Methods

- [toJSON](proto.temporal.api.command.v1.requestcancelexternalworkflowexecutioncommandattributes.md#tojson)
- [create](proto.temporal.api.command.v1.requestcancelexternalworkflowexecutioncommandattributes.md#create)
- [decode](proto.temporal.api.command.v1.requestcancelexternalworkflowexecutioncommandattributes.md#decode)
- [decodeDelimited](proto.temporal.api.command.v1.requestcancelexternalworkflowexecutioncommandattributes.md#decodedelimited)
- [encode](proto.temporal.api.command.v1.requestcancelexternalworkflowexecutioncommandattributes.md#encode)
- [encodeDelimited](proto.temporal.api.command.v1.requestcancelexternalworkflowexecutioncommandattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.command.v1.requestcancelexternalworkflowexecutioncommandattributes.md#fromobject)
- [toObject](proto.temporal.api.command.v1.requestcancelexternalworkflowexecutioncommandattributes.md#toobject)
- [verify](proto.temporal.api.command.v1.requestcancelexternalworkflowexecutioncommandattributes.md#verify)

## Constructors

### constructor

\+ **new RequestCancelExternalWorkflowExecutionCommandAttributes**(`properties?`: [*IRequestCancelExternalWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.irequestcancelexternalworkflowexecutioncommandattributes.md)): [*RequestCancelExternalWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.requestcancelexternalworkflowexecutioncommandattributes.md)

Constructs a new RequestCancelExternalWorkflowExecutionCommandAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRequestCancelExternalWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.irequestcancelexternalworkflowexecutioncommandattributes.md) |

**Returns:** [*RequestCancelExternalWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.requestcancelexternalworkflowexecutioncommandattributes.md)

## Properties

### childWorkflowOnly

• **childWorkflowOnly**: *boolean*

RequestCancelExternalWorkflowExecutionCommandAttributes childWorkflowOnly.

Implementation of: [IRequestCancelExternalWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.irequestcancelexternalworkflowexecutioncommandattributes.md).[childWorkflowOnly](../interfaces/proto.temporal.api.command.v1.irequestcancelexternalworkflowexecutioncommandattributes.md#childworkflowonly)

___

### control

• **control**: *string*

RequestCancelExternalWorkflowExecutionCommandAttributes control.

Implementation of: [IRequestCancelExternalWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.irequestcancelexternalworkflowexecutioncommandattributes.md).[control](../interfaces/proto.temporal.api.command.v1.irequestcancelexternalworkflowexecutioncommandattributes.md#control)

___

### namespace

• **namespace**: *string*

RequestCancelExternalWorkflowExecutionCommandAttributes namespace.

Implementation of: [IRequestCancelExternalWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.irequestcancelexternalworkflowexecutioncommandattributes.md).[namespace](../interfaces/proto.temporal.api.command.v1.irequestcancelexternalworkflowexecutioncommandattributes.md#namespace)

___

### runId

• **runId**: *string*

RequestCancelExternalWorkflowExecutionCommandAttributes runId.

Implementation of: [IRequestCancelExternalWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.irequestcancelexternalworkflowexecutioncommandattributes.md).[runId](../interfaces/proto.temporal.api.command.v1.irequestcancelexternalworkflowexecutioncommandattributes.md#runid)

___

### workflowId

• **workflowId**: *string*

RequestCancelExternalWorkflowExecutionCommandAttributes workflowId.

Implementation of: [IRequestCancelExternalWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.irequestcancelexternalworkflowexecutioncommandattributes.md).[workflowId](../interfaces/proto.temporal.api.command.v1.irequestcancelexternalworkflowexecutioncommandattributes.md#workflowid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this RequestCancelExternalWorkflowExecutionCommandAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IRequestCancelExternalWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.irequestcancelexternalworkflowexecutioncommandattributes.md)): [*RequestCancelExternalWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.requestcancelexternalworkflowexecutioncommandattributes.md)

Creates a new RequestCancelExternalWorkflowExecutionCommandAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRequestCancelExternalWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.irequestcancelexternalworkflowexecutioncommandattributes.md) |

**Returns:** [*RequestCancelExternalWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.requestcancelexternalworkflowexecutioncommandattributes.md)

RequestCancelExternalWorkflowExecutionCommandAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*RequestCancelExternalWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.requestcancelexternalworkflowexecutioncommandattributes.md)

Decodes a RequestCancelExternalWorkflowExecutionCommandAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*RequestCancelExternalWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.requestcancelexternalworkflowexecutioncommandattributes.md)

RequestCancelExternalWorkflowExecutionCommandAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*RequestCancelExternalWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.requestcancelexternalworkflowexecutioncommandattributes.md)

Decodes a RequestCancelExternalWorkflowExecutionCommandAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*RequestCancelExternalWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.requestcancelexternalworkflowexecutioncommandattributes.md)

RequestCancelExternalWorkflowExecutionCommandAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IRequestCancelExternalWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.irequestcancelexternalworkflowexecutioncommandattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified RequestCancelExternalWorkflowExecutionCommandAttributes message. Does not implicitly [verify](proto.temporal.api.command.v1.requestcancelexternalworkflowexecutioncommandattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRequestCancelExternalWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.irequestcancelexternalworkflowexecutioncommandattributes.md) | RequestCancelExternalWorkflowExecutionCommandAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IRequestCancelExternalWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.irequestcancelexternalworkflowexecutioncommandattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified RequestCancelExternalWorkflowExecutionCommandAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.command.v1.requestcancelexternalworkflowexecutioncommandattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRequestCancelExternalWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.irequestcancelexternalworkflowexecutioncommandattributes.md) | RequestCancelExternalWorkflowExecutionCommandAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*RequestCancelExternalWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.requestcancelexternalworkflowexecutioncommandattributes.md)

Creates a RequestCancelExternalWorkflowExecutionCommandAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*RequestCancelExternalWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.requestcancelexternalworkflowexecutioncommandattributes.md)

RequestCancelExternalWorkflowExecutionCommandAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*RequestCancelExternalWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.requestcancelexternalworkflowexecutioncommandattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a RequestCancelExternalWorkflowExecutionCommandAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*RequestCancelExternalWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.requestcancelexternalworkflowexecutioncommandattributes.md) | RequestCancelExternalWorkflowExecutionCommandAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a RequestCancelExternalWorkflowExecutionCommandAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
