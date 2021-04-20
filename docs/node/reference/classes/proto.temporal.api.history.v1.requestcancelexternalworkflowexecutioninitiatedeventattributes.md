# Class: RequestCancelExternalWorkflowExecutionInitiatedEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).RequestCancelExternalWorkflowExecutionInitiatedEventAttributes

Represents a RequestCancelExternalWorkflowExecutionInitiatedEventAttributes.

## Implements

* [*IRequestCancelExternalWorkflowExecutionInitiatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutioninitiatedeventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutioninitiatedeventattributes.md#constructor)

### Properties

- [childWorkflowOnly](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutioninitiatedeventattributes.md#childworkflowonly)
- [control](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutioninitiatedeventattributes.md#control)
- [namespace](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutioninitiatedeventattributes.md#namespace)
- [workflowExecution](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutioninitiatedeventattributes.md#workflowexecution)
- [workflowTaskCompletedEventId](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutioninitiatedeventattributes.md#workflowtaskcompletedeventid)

### Methods

- [toJSON](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutioninitiatedeventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutioninitiatedeventattributes.md#create)
- [decode](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutioninitiatedeventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutioninitiatedeventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutioninitiatedeventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutioninitiatedeventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutioninitiatedeventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutioninitiatedeventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutioninitiatedeventattributes.md#verify)

## Constructors

### constructor

\+ **new RequestCancelExternalWorkflowExecutionInitiatedEventAttributes**(`properties?`: [*IRequestCancelExternalWorkflowExecutionInitiatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutioninitiatedeventattributes.md)): [*RequestCancelExternalWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutioninitiatedeventattributes.md)

Constructs a new RequestCancelExternalWorkflowExecutionInitiatedEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRequestCancelExternalWorkflowExecutionInitiatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutioninitiatedeventattributes.md) |

**Returns:** [*RequestCancelExternalWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutioninitiatedeventattributes.md)

## Properties

### childWorkflowOnly

• **childWorkflowOnly**: *boolean*

RequestCancelExternalWorkflowExecutionInitiatedEventAttributes childWorkflowOnly.

Implementation of: [IRequestCancelExternalWorkflowExecutionInitiatedEventAttributes](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutioninitiatedeventattributes.md).[childWorkflowOnly](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutioninitiatedeventattributes.md#childworkflowonly)

___

### control

• **control**: *string*

RequestCancelExternalWorkflowExecutionInitiatedEventAttributes control.

Implementation of: [IRequestCancelExternalWorkflowExecutionInitiatedEventAttributes](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutioninitiatedeventattributes.md).[control](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutioninitiatedeventattributes.md#control)

___

### namespace

• **namespace**: *string*

RequestCancelExternalWorkflowExecutionInitiatedEventAttributes namespace.

Implementation of: [IRequestCancelExternalWorkflowExecutionInitiatedEventAttributes](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutioninitiatedeventattributes.md).[namespace](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutioninitiatedeventattributes.md#namespace)

___

### workflowExecution

• `Optional` **workflowExecution**: *null* \| [*IWorkflowExecution*](../interfaces/proto.temporal.api.common.v1.iworkflowexecution.md)

RequestCancelExternalWorkflowExecutionInitiatedEventAttributes workflowExecution.

Implementation of: [IRequestCancelExternalWorkflowExecutionInitiatedEventAttributes](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutioninitiatedeventattributes.md).[workflowExecution](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutioninitiatedeventattributes.md#workflowexecution)

___

### workflowTaskCompletedEventId

• **workflowTaskCompletedEventId**: Long

RequestCancelExternalWorkflowExecutionInitiatedEventAttributes workflowTaskCompletedEventId.

Implementation of: [IRequestCancelExternalWorkflowExecutionInitiatedEventAttributes](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutioninitiatedeventattributes.md).[workflowTaskCompletedEventId](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutioninitiatedeventattributes.md#workflowtaskcompletedeventid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this RequestCancelExternalWorkflowExecutionInitiatedEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IRequestCancelExternalWorkflowExecutionInitiatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutioninitiatedeventattributes.md)): [*RequestCancelExternalWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutioninitiatedeventattributes.md)

Creates a new RequestCancelExternalWorkflowExecutionInitiatedEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRequestCancelExternalWorkflowExecutionInitiatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutioninitiatedeventattributes.md) |

**Returns:** [*RequestCancelExternalWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutioninitiatedeventattributes.md)

RequestCancelExternalWorkflowExecutionInitiatedEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*RequestCancelExternalWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutioninitiatedeventattributes.md)

Decodes a RequestCancelExternalWorkflowExecutionInitiatedEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*RequestCancelExternalWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutioninitiatedeventattributes.md)

RequestCancelExternalWorkflowExecutionInitiatedEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*RequestCancelExternalWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutioninitiatedeventattributes.md)

Decodes a RequestCancelExternalWorkflowExecutionInitiatedEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*RequestCancelExternalWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutioninitiatedeventattributes.md)

RequestCancelExternalWorkflowExecutionInitiatedEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IRequestCancelExternalWorkflowExecutionInitiatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutioninitiatedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified RequestCancelExternalWorkflowExecutionInitiatedEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutioninitiatedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRequestCancelExternalWorkflowExecutionInitiatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutioninitiatedeventattributes.md) | RequestCancelExternalWorkflowExecutionInitiatedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IRequestCancelExternalWorkflowExecutionInitiatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutioninitiatedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified RequestCancelExternalWorkflowExecutionInitiatedEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutioninitiatedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRequestCancelExternalWorkflowExecutionInitiatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutioninitiatedeventattributes.md) | RequestCancelExternalWorkflowExecutionInitiatedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*RequestCancelExternalWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutioninitiatedeventattributes.md)

Creates a RequestCancelExternalWorkflowExecutionInitiatedEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*RequestCancelExternalWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutioninitiatedeventattributes.md)

RequestCancelExternalWorkflowExecutionInitiatedEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*RequestCancelExternalWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutioninitiatedeventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a RequestCancelExternalWorkflowExecutionInitiatedEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*RequestCancelExternalWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutioninitiatedeventattributes.md) | RequestCancelExternalWorkflowExecutionInitiatedEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a RequestCancelExternalWorkflowExecutionInitiatedEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
