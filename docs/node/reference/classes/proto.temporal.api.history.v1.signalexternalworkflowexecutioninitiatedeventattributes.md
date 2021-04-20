# Class: SignalExternalWorkflowExecutionInitiatedEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).SignalExternalWorkflowExecutionInitiatedEventAttributes

Represents a SignalExternalWorkflowExecutionInitiatedEventAttributes.

## Implements

* [*ISignalExternalWorkflowExecutionInitiatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutioninitiatedeventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.signalexternalworkflowexecutioninitiatedeventattributes.md#constructor)

### Properties

- [childWorkflowOnly](proto.temporal.api.history.v1.signalexternalworkflowexecutioninitiatedeventattributes.md#childworkflowonly)
- [control](proto.temporal.api.history.v1.signalexternalworkflowexecutioninitiatedeventattributes.md#control)
- [input](proto.temporal.api.history.v1.signalexternalworkflowexecutioninitiatedeventattributes.md#input)
- [namespace](proto.temporal.api.history.v1.signalexternalworkflowexecutioninitiatedeventattributes.md#namespace)
- [signalName](proto.temporal.api.history.v1.signalexternalworkflowexecutioninitiatedeventattributes.md#signalname)
- [workflowExecution](proto.temporal.api.history.v1.signalexternalworkflowexecutioninitiatedeventattributes.md#workflowexecution)
- [workflowTaskCompletedEventId](proto.temporal.api.history.v1.signalexternalworkflowexecutioninitiatedeventattributes.md#workflowtaskcompletedeventid)

### Methods

- [toJSON](proto.temporal.api.history.v1.signalexternalworkflowexecutioninitiatedeventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.signalexternalworkflowexecutioninitiatedeventattributes.md#create)
- [decode](proto.temporal.api.history.v1.signalexternalworkflowexecutioninitiatedeventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.signalexternalworkflowexecutioninitiatedeventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.signalexternalworkflowexecutioninitiatedeventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.signalexternalworkflowexecutioninitiatedeventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.signalexternalworkflowexecutioninitiatedeventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.signalexternalworkflowexecutioninitiatedeventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.signalexternalworkflowexecutioninitiatedeventattributes.md#verify)

## Constructors

### constructor

\+ **new SignalExternalWorkflowExecutionInitiatedEventAttributes**(`properties?`: [*ISignalExternalWorkflowExecutionInitiatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutioninitiatedeventattributes.md)): [*SignalExternalWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.signalexternalworkflowexecutioninitiatedeventattributes.md)

Constructs a new SignalExternalWorkflowExecutionInitiatedEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ISignalExternalWorkflowExecutionInitiatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutioninitiatedeventattributes.md) |

**Returns:** [*SignalExternalWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.signalexternalworkflowexecutioninitiatedeventattributes.md)

## Properties

### childWorkflowOnly

• **childWorkflowOnly**: *boolean*

SignalExternalWorkflowExecutionInitiatedEventAttributes childWorkflowOnly.

Implementation of: [ISignalExternalWorkflowExecutionInitiatedEventAttributes](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutioninitiatedeventattributes.md).[childWorkflowOnly](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutioninitiatedeventattributes.md#childworkflowonly)

___

### control

• **control**: *string*

SignalExternalWorkflowExecutionInitiatedEventAttributes control.

Implementation of: [ISignalExternalWorkflowExecutionInitiatedEventAttributes](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutioninitiatedeventattributes.md).[control](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutioninitiatedeventattributes.md#control)

___

### input

• `Optional` **input**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

SignalExternalWorkflowExecutionInitiatedEventAttributes input.

Implementation of: [ISignalExternalWorkflowExecutionInitiatedEventAttributes](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutioninitiatedeventattributes.md).[input](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutioninitiatedeventattributes.md#input)

___

### namespace

• **namespace**: *string*

SignalExternalWorkflowExecutionInitiatedEventAttributes namespace.

Implementation of: [ISignalExternalWorkflowExecutionInitiatedEventAttributes](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutioninitiatedeventattributes.md).[namespace](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutioninitiatedeventattributes.md#namespace)

___

### signalName

• **signalName**: *string*

SignalExternalWorkflowExecutionInitiatedEventAttributes signalName.

Implementation of: [ISignalExternalWorkflowExecutionInitiatedEventAttributes](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutioninitiatedeventattributes.md).[signalName](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutioninitiatedeventattributes.md#signalname)

___

### workflowExecution

• `Optional` **workflowExecution**: *null* \| [*IWorkflowExecution*](../interfaces/proto.temporal.api.common.v1.iworkflowexecution.md)

SignalExternalWorkflowExecutionInitiatedEventAttributes workflowExecution.

Implementation of: [ISignalExternalWorkflowExecutionInitiatedEventAttributes](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutioninitiatedeventattributes.md).[workflowExecution](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutioninitiatedeventattributes.md#workflowexecution)

___

### workflowTaskCompletedEventId

• **workflowTaskCompletedEventId**: Long

SignalExternalWorkflowExecutionInitiatedEventAttributes workflowTaskCompletedEventId.

Implementation of: [ISignalExternalWorkflowExecutionInitiatedEventAttributes](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutioninitiatedeventattributes.md).[workflowTaskCompletedEventId](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutioninitiatedeventattributes.md#workflowtaskcompletedeventid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this SignalExternalWorkflowExecutionInitiatedEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ISignalExternalWorkflowExecutionInitiatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutioninitiatedeventattributes.md)): [*SignalExternalWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.signalexternalworkflowexecutioninitiatedeventattributes.md)

Creates a new SignalExternalWorkflowExecutionInitiatedEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ISignalExternalWorkflowExecutionInitiatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutioninitiatedeventattributes.md) |

**Returns:** [*SignalExternalWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.signalexternalworkflowexecutioninitiatedeventattributes.md)

SignalExternalWorkflowExecutionInitiatedEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*SignalExternalWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.signalexternalworkflowexecutioninitiatedeventattributes.md)

Decodes a SignalExternalWorkflowExecutionInitiatedEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*SignalExternalWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.signalexternalworkflowexecutioninitiatedeventattributes.md)

SignalExternalWorkflowExecutionInitiatedEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*SignalExternalWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.signalexternalworkflowexecutioninitiatedeventattributes.md)

Decodes a SignalExternalWorkflowExecutionInitiatedEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*SignalExternalWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.signalexternalworkflowexecutioninitiatedeventattributes.md)

SignalExternalWorkflowExecutionInitiatedEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*ISignalExternalWorkflowExecutionInitiatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutioninitiatedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified SignalExternalWorkflowExecutionInitiatedEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.signalexternalworkflowexecutioninitiatedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ISignalExternalWorkflowExecutionInitiatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutioninitiatedeventattributes.md) | SignalExternalWorkflowExecutionInitiatedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ISignalExternalWorkflowExecutionInitiatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutioninitiatedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified SignalExternalWorkflowExecutionInitiatedEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.signalexternalworkflowexecutioninitiatedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ISignalExternalWorkflowExecutionInitiatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutioninitiatedeventattributes.md) | SignalExternalWorkflowExecutionInitiatedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*SignalExternalWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.signalexternalworkflowexecutioninitiatedeventattributes.md)

Creates a SignalExternalWorkflowExecutionInitiatedEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*SignalExternalWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.signalexternalworkflowexecutioninitiatedeventattributes.md)

SignalExternalWorkflowExecutionInitiatedEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*SignalExternalWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.signalexternalworkflowexecutioninitiatedeventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a SignalExternalWorkflowExecutionInitiatedEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*SignalExternalWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.signalexternalworkflowexecutioninitiatedeventattributes.md) | SignalExternalWorkflowExecutionInitiatedEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a SignalExternalWorkflowExecutionInitiatedEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
