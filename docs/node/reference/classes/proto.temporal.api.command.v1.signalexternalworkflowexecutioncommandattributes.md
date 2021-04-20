# Class: SignalExternalWorkflowExecutionCommandAttributes

[command](../modules/proto.temporal.api.command.md).[v1](../modules/proto.temporal.api.command.v1.md).SignalExternalWorkflowExecutionCommandAttributes

Represents a SignalExternalWorkflowExecutionCommandAttributes.

## Implements

* [*ISignalExternalWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.isignalexternalworkflowexecutioncommandattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.command.v1.signalexternalworkflowexecutioncommandattributes.md#constructor)

### Properties

- [childWorkflowOnly](proto.temporal.api.command.v1.signalexternalworkflowexecutioncommandattributes.md#childworkflowonly)
- [control](proto.temporal.api.command.v1.signalexternalworkflowexecutioncommandattributes.md#control)
- [execution](proto.temporal.api.command.v1.signalexternalworkflowexecutioncommandattributes.md#execution)
- [input](proto.temporal.api.command.v1.signalexternalworkflowexecutioncommandattributes.md#input)
- [namespace](proto.temporal.api.command.v1.signalexternalworkflowexecutioncommandattributes.md#namespace)
- [signalName](proto.temporal.api.command.v1.signalexternalworkflowexecutioncommandattributes.md#signalname)

### Methods

- [toJSON](proto.temporal.api.command.v1.signalexternalworkflowexecutioncommandattributes.md#tojson)
- [create](proto.temporal.api.command.v1.signalexternalworkflowexecutioncommandattributes.md#create)
- [decode](proto.temporal.api.command.v1.signalexternalworkflowexecutioncommandattributes.md#decode)
- [decodeDelimited](proto.temporal.api.command.v1.signalexternalworkflowexecutioncommandattributes.md#decodedelimited)
- [encode](proto.temporal.api.command.v1.signalexternalworkflowexecutioncommandattributes.md#encode)
- [encodeDelimited](proto.temporal.api.command.v1.signalexternalworkflowexecutioncommandattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.command.v1.signalexternalworkflowexecutioncommandattributes.md#fromobject)
- [toObject](proto.temporal.api.command.v1.signalexternalworkflowexecutioncommandattributes.md#toobject)
- [verify](proto.temporal.api.command.v1.signalexternalworkflowexecutioncommandattributes.md#verify)

## Constructors

### constructor

\+ **new SignalExternalWorkflowExecutionCommandAttributes**(`properties?`: [*ISignalExternalWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.isignalexternalworkflowexecutioncommandattributes.md)): [*SignalExternalWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.signalexternalworkflowexecutioncommandattributes.md)

Constructs a new SignalExternalWorkflowExecutionCommandAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ISignalExternalWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.isignalexternalworkflowexecutioncommandattributes.md) |

**Returns:** [*SignalExternalWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.signalexternalworkflowexecutioncommandattributes.md)

## Properties

### childWorkflowOnly

• **childWorkflowOnly**: *boolean*

SignalExternalWorkflowExecutionCommandAttributes childWorkflowOnly.

Implementation of: [ISignalExternalWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.isignalexternalworkflowexecutioncommandattributes.md).[childWorkflowOnly](../interfaces/proto.temporal.api.command.v1.isignalexternalworkflowexecutioncommandattributes.md#childworkflowonly)

___

### control

• **control**: *string*

SignalExternalWorkflowExecutionCommandAttributes control.

Implementation of: [ISignalExternalWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.isignalexternalworkflowexecutioncommandattributes.md).[control](../interfaces/proto.temporal.api.command.v1.isignalexternalworkflowexecutioncommandattributes.md#control)

___

### execution

• `Optional` **execution**: *null* \| [*IWorkflowExecution*](../interfaces/proto.temporal.api.common.v1.iworkflowexecution.md)

SignalExternalWorkflowExecutionCommandAttributes execution.

Implementation of: [ISignalExternalWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.isignalexternalworkflowexecutioncommandattributes.md).[execution](../interfaces/proto.temporal.api.command.v1.isignalexternalworkflowexecutioncommandattributes.md#execution)

___

### input

• `Optional` **input**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

SignalExternalWorkflowExecutionCommandAttributes input.

Implementation of: [ISignalExternalWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.isignalexternalworkflowexecutioncommandattributes.md).[input](../interfaces/proto.temporal.api.command.v1.isignalexternalworkflowexecutioncommandattributes.md#input)

___

### namespace

• **namespace**: *string*

SignalExternalWorkflowExecutionCommandAttributes namespace.

Implementation of: [ISignalExternalWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.isignalexternalworkflowexecutioncommandattributes.md).[namespace](../interfaces/proto.temporal.api.command.v1.isignalexternalworkflowexecutioncommandattributes.md#namespace)

___

### signalName

• **signalName**: *string*

SignalExternalWorkflowExecutionCommandAttributes signalName.

Implementation of: [ISignalExternalWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.isignalexternalworkflowexecutioncommandattributes.md).[signalName](../interfaces/proto.temporal.api.command.v1.isignalexternalworkflowexecutioncommandattributes.md#signalname)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this SignalExternalWorkflowExecutionCommandAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ISignalExternalWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.isignalexternalworkflowexecutioncommandattributes.md)): [*SignalExternalWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.signalexternalworkflowexecutioncommandattributes.md)

Creates a new SignalExternalWorkflowExecutionCommandAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ISignalExternalWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.isignalexternalworkflowexecutioncommandattributes.md) |

**Returns:** [*SignalExternalWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.signalexternalworkflowexecutioncommandattributes.md)

SignalExternalWorkflowExecutionCommandAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*SignalExternalWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.signalexternalworkflowexecutioncommandattributes.md)

Decodes a SignalExternalWorkflowExecutionCommandAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*SignalExternalWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.signalexternalworkflowexecutioncommandattributes.md)

SignalExternalWorkflowExecutionCommandAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*SignalExternalWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.signalexternalworkflowexecutioncommandattributes.md)

Decodes a SignalExternalWorkflowExecutionCommandAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*SignalExternalWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.signalexternalworkflowexecutioncommandattributes.md)

SignalExternalWorkflowExecutionCommandAttributes

___

### encode

▸ `Static`**encode**(`message`: [*ISignalExternalWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.isignalexternalworkflowexecutioncommandattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified SignalExternalWorkflowExecutionCommandAttributes message. Does not implicitly [verify](proto.temporal.api.command.v1.signalexternalworkflowexecutioncommandattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ISignalExternalWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.isignalexternalworkflowexecutioncommandattributes.md) | SignalExternalWorkflowExecutionCommandAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ISignalExternalWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.isignalexternalworkflowexecutioncommandattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified SignalExternalWorkflowExecutionCommandAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.command.v1.signalexternalworkflowexecutioncommandattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ISignalExternalWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.isignalexternalworkflowexecutioncommandattributes.md) | SignalExternalWorkflowExecutionCommandAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*SignalExternalWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.signalexternalworkflowexecutioncommandattributes.md)

Creates a SignalExternalWorkflowExecutionCommandAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*SignalExternalWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.signalexternalworkflowexecutioncommandattributes.md)

SignalExternalWorkflowExecutionCommandAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*SignalExternalWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.signalexternalworkflowexecutioncommandattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a SignalExternalWorkflowExecutionCommandAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*SignalExternalWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.signalexternalworkflowexecutioncommandattributes.md) | SignalExternalWorkflowExecutionCommandAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a SignalExternalWorkflowExecutionCommandAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
