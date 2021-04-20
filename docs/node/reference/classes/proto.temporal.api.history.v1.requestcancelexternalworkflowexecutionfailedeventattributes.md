# Class: RequestCancelExternalWorkflowExecutionFailedEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).RequestCancelExternalWorkflowExecutionFailedEventAttributes

Represents a RequestCancelExternalWorkflowExecutionFailedEventAttributes.

## Implements

* [*IRequestCancelExternalWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutionfailedeventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutionfailedeventattributes.md#constructor)

### Properties

- [cause](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutionfailedeventattributes.md#cause)
- [control](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutionfailedeventattributes.md#control)
- [initiatedEventId](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutionfailedeventattributes.md#initiatedeventid)
- [namespace](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutionfailedeventattributes.md#namespace)
- [workflowExecution](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutionfailedeventattributes.md#workflowexecution)
- [workflowTaskCompletedEventId](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutionfailedeventattributes.md#workflowtaskcompletedeventid)

### Methods

- [toJSON](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutionfailedeventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutionfailedeventattributes.md#create)
- [decode](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutionfailedeventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutionfailedeventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutionfailedeventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutionfailedeventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutionfailedeventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutionfailedeventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutionfailedeventattributes.md#verify)

## Constructors

### constructor

\+ **new RequestCancelExternalWorkflowExecutionFailedEventAttributes**(`properties?`: [*IRequestCancelExternalWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutionfailedeventattributes.md)): [*RequestCancelExternalWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutionfailedeventattributes.md)

Constructs a new RequestCancelExternalWorkflowExecutionFailedEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRequestCancelExternalWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutionfailedeventattributes.md) |

**Returns:** [*RequestCancelExternalWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutionfailedeventattributes.md)

## Properties

### cause

• **cause**: [*CancelExternalWorkflowExecutionFailedCause*](../enums/proto.temporal.api.enums.v1.cancelexternalworkflowexecutionfailedcause.md)

RequestCancelExternalWorkflowExecutionFailedEventAttributes cause.

Implementation of: [IRequestCancelExternalWorkflowExecutionFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutionfailedeventattributes.md).[cause](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutionfailedeventattributes.md#cause)

___

### control

• **control**: *string*

RequestCancelExternalWorkflowExecutionFailedEventAttributes control.

Implementation of: [IRequestCancelExternalWorkflowExecutionFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutionfailedeventattributes.md).[control](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutionfailedeventattributes.md#control)

___

### initiatedEventId

• **initiatedEventId**: Long

RequestCancelExternalWorkflowExecutionFailedEventAttributes initiatedEventId.

Implementation of: [IRequestCancelExternalWorkflowExecutionFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutionfailedeventattributes.md).[initiatedEventId](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutionfailedeventattributes.md#initiatedeventid)

___

### namespace

• **namespace**: *string*

RequestCancelExternalWorkflowExecutionFailedEventAttributes namespace.

Implementation of: [IRequestCancelExternalWorkflowExecutionFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutionfailedeventattributes.md).[namespace](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutionfailedeventattributes.md#namespace)

___

### workflowExecution

• `Optional` **workflowExecution**: *null* \| [*IWorkflowExecution*](../interfaces/proto.temporal.api.common.v1.iworkflowexecution.md)

RequestCancelExternalWorkflowExecutionFailedEventAttributes workflowExecution.

Implementation of: [IRequestCancelExternalWorkflowExecutionFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutionfailedeventattributes.md).[workflowExecution](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutionfailedeventattributes.md#workflowexecution)

___

### workflowTaskCompletedEventId

• **workflowTaskCompletedEventId**: Long

RequestCancelExternalWorkflowExecutionFailedEventAttributes workflowTaskCompletedEventId.

Implementation of: [IRequestCancelExternalWorkflowExecutionFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutionfailedeventattributes.md).[workflowTaskCompletedEventId](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutionfailedeventattributes.md#workflowtaskcompletedeventid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this RequestCancelExternalWorkflowExecutionFailedEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IRequestCancelExternalWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutionfailedeventattributes.md)): [*RequestCancelExternalWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutionfailedeventattributes.md)

Creates a new RequestCancelExternalWorkflowExecutionFailedEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRequestCancelExternalWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutionfailedeventattributes.md) |

**Returns:** [*RequestCancelExternalWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutionfailedeventattributes.md)

RequestCancelExternalWorkflowExecutionFailedEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*RequestCancelExternalWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutionfailedeventattributes.md)

Decodes a RequestCancelExternalWorkflowExecutionFailedEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*RequestCancelExternalWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutionfailedeventattributes.md)

RequestCancelExternalWorkflowExecutionFailedEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*RequestCancelExternalWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutionfailedeventattributes.md)

Decodes a RequestCancelExternalWorkflowExecutionFailedEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*RequestCancelExternalWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutionfailedeventattributes.md)

RequestCancelExternalWorkflowExecutionFailedEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IRequestCancelExternalWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutionfailedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified RequestCancelExternalWorkflowExecutionFailedEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutionfailedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRequestCancelExternalWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutionfailedeventattributes.md) | RequestCancelExternalWorkflowExecutionFailedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IRequestCancelExternalWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutionfailedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified RequestCancelExternalWorkflowExecutionFailedEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutionfailedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRequestCancelExternalWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutionfailedeventattributes.md) | RequestCancelExternalWorkflowExecutionFailedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*RequestCancelExternalWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutionfailedeventattributes.md)

Creates a RequestCancelExternalWorkflowExecutionFailedEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*RequestCancelExternalWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutionfailedeventattributes.md)

RequestCancelExternalWorkflowExecutionFailedEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*RequestCancelExternalWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutionfailedeventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a RequestCancelExternalWorkflowExecutionFailedEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*RequestCancelExternalWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.requestcancelexternalworkflowexecutionfailedeventattributes.md) | RequestCancelExternalWorkflowExecutionFailedEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a RequestCancelExternalWorkflowExecutionFailedEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
