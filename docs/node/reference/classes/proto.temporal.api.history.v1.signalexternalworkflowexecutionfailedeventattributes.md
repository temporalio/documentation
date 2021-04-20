# Class: SignalExternalWorkflowExecutionFailedEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).SignalExternalWorkflowExecutionFailedEventAttributes

Represents a SignalExternalWorkflowExecutionFailedEventAttributes.

## Implements

* [*ISignalExternalWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutionfailedeventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.signalexternalworkflowexecutionfailedeventattributes.md#constructor)

### Properties

- [cause](proto.temporal.api.history.v1.signalexternalworkflowexecutionfailedeventattributes.md#cause)
- [control](proto.temporal.api.history.v1.signalexternalworkflowexecutionfailedeventattributes.md#control)
- [initiatedEventId](proto.temporal.api.history.v1.signalexternalworkflowexecutionfailedeventattributes.md#initiatedeventid)
- [namespace](proto.temporal.api.history.v1.signalexternalworkflowexecutionfailedeventattributes.md#namespace)
- [workflowExecution](proto.temporal.api.history.v1.signalexternalworkflowexecutionfailedeventattributes.md#workflowexecution)
- [workflowTaskCompletedEventId](proto.temporal.api.history.v1.signalexternalworkflowexecutionfailedeventattributes.md#workflowtaskcompletedeventid)

### Methods

- [toJSON](proto.temporal.api.history.v1.signalexternalworkflowexecutionfailedeventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.signalexternalworkflowexecutionfailedeventattributes.md#create)
- [decode](proto.temporal.api.history.v1.signalexternalworkflowexecutionfailedeventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.signalexternalworkflowexecutionfailedeventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.signalexternalworkflowexecutionfailedeventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.signalexternalworkflowexecutionfailedeventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.signalexternalworkflowexecutionfailedeventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.signalexternalworkflowexecutionfailedeventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.signalexternalworkflowexecutionfailedeventattributes.md#verify)

## Constructors

### constructor

\+ **new SignalExternalWorkflowExecutionFailedEventAttributes**(`properties?`: [*ISignalExternalWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutionfailedeventattributes.md)): [*SignalExternalWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.signalexternalworkflowexecutionfailedeventattributes.md)

Constructs a new SignalExternalWorkflowExecutionFailedEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ISignalExternalWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutionfailedeventattributes.md) |

**Returns:** [*SignalExternalWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.signalexternalworkflowexecutionfailedeventattributes.md)

## Properties

### cause

• **cause**: [*SignalExternalWorkflowExecutionFailedCause*](../enums/proto.temporal.api.enums.v1.signalexternalworkflowexecutionfailedcause.md)

SignalExternalWorkflowExecutionFailedEventAttributes cause.

Implementation of: [ISignalExternalWorkflowExecutionFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutionfailedeventattributes.md).[cause](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutionfailedeventattributes.md#cause)

___

### control

• **control**: *string*

SignalExternalWorkflowExecutionFailedEventAttributes control.

Implementation of: [ISignalExternalWorkflowExecutionFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutionfailedeventattributes.md).[control](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutionfailedeventattributes.md#control)

___

### initiatedEventId

• **initiatedEventId**: Long

SignalExternalWorkflowExecutionFailedEventAttributes initiatedEventId.

Implementation of: [ISignalExternalWorkflowExecutionFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutionfailedeventattributes.md).[initiatedEventId](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutionfailedeventattributes.md#initiatedeventid)

___

### namespace

• **namespace**: *string*

SignalExternalWorkflowExecutionFailedEventAttributes namespace.

Implementation of: [ISignalExternalWorkflowExecutionFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutionfailedeventattributes.md).[namespace](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutionfailedeventattributes.md#namespace)

___

### workflowExecution

• `Optional` **workflowExecution**: *null* \| [*IWorkflowExecution*](../interfaces/proto.temporal.api.common.v1.iworkflowexecution.md)

SignalExternalWorkflowExecutionFailedEventAttributes workflowExecution.

Implementation of: [ISignalExternalWorkflowExecutionFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutionfailedeventattributes.md).[workflowExecution](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutionfailedeventattributes.md#workflowexecution)

___

### workflowTaskCompletedEventId

• **workflowTaskCompletedEventId**: Long

SignalExternalWorkflowExecutionFailedEventAttributes workflowTaskCompletedEventId.

Implementation of: [ISignalExternalWorkflowExecutionFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutionfailedeventattributes.md).[workflowTaskCompletedEventId](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutionfailedeventattributes.md#workflowtaskcompletedeventid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this SignalExternalWorkflowExecutionFailedEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ISignalExternalWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutionfailedeventattributes.md)): [*SignalExternalWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.signalexternalworkflowexecutionfailedeventattributes.md)

Creates a new SignalExternalWorkflowExecutionFailedEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ISignalExternalWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutionfailedeventattributes.md) |

**Returns:** [*SignalExternalWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.signalexternalworkflowexecutionfailedeventattributes.md)

SignalExternalWorkflowExecutionFailedEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*SignalExternalWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.signalexternalworkflowexecutionfailedeventattributes.md)

Decodes a SignalExternalWorkflowExecutionFailedEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*SignalExternalWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.signalexternalworkflowexecutionfailedeventattributes.md)

SignalExternalWorkflowExecutionFailedEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*SignalExternalWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.signalexternalworkflowexecutionfailedeventattributes.md)

Decodes a SignalExternalWorkflowExecutionFailedEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*SignalExternalWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.signalexternalworkflowexecutionfailedeventattributes.md)

SignalExternalWorkflowExecutionFailedEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*ISignalExternalWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutionfailedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified SignalExternalWorkflowExecutionFailedEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.signalexternalworkflowexecutionfailedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ISignalExternalWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutionfailedeventattributes.md) | SignalExternalWorkflowExecutionFailedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ISignalExternalWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutionfailedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified SignalExternalWorkflowExecutionFailedEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.signalexternalworkflowexecutionfailedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ISignalExternalWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutionfailedeventattributes.md) | SignalExternalWorkflowExecutionFailedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*SignalExternalWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.signalexternalworkflowexecutionfailedeventattributes.md)

Creates a SignalExternalWorkflowExecutionFailedEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*SignalExternalWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.signalexternalworkflowexecutionfailedeventattributes.md)

SignalExternalWorkflowExecutionFailedEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*SignalExternalWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.signalexternalworkflowexecutionfailedeventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a SignalExternalWorkflowExecutionFailedEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*SignalExternalWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.signalexternalworkflowexecutionfailedeventattributes.md) | SignalExternalWorkflowExecutionFailedEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a SignalExternalWorkflowExecutionFailedEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
