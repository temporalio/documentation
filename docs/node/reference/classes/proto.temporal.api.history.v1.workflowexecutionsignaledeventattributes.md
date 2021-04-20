# Class: WorkflowExecutionSignaledEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).WorkflowExecutionSignaledEventAttributes

Represents a WorkflowExecutionSignaledEventAttributes.

## Implements

* [*IWorkflowExecutionSignaledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionsignaledeventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.workflowexecutionsignaledeventattributes.md#constructor)

### Properties

- [identity](proto.temporal.api.history.v1.workflowexecutionsignaledeventattributes.md#identity)
- [input](proto.temporal.api.history.v1.workflowexecutionsignaledeventattributes.md#input)
- [signalName](proto.temporal.api.history.v1.workflowexecutionsignaledeventattributes.md#signalname)

### Methods

- [toJSON](proto.temporal.api.history.v1.workflowexecutionsignaledeventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.workflowexecutionsignaledeventattributes.md#create)
- [decode](proto.temporal.api.history.v1.workflowexecutionsignaledeventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.workflowexecutionsignaledeventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.workflowexecutionsignaledeventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.workflowexecutionsignaledeventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.workflowexecutionsignaledeventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.workflowexecutionsignaledeventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.workflowexecutionsignaledeventattributes.md#verify)

## Constructors

### constructor

\+ **new WorkflowExecutionSignaledEventAttributes**(`properties?`: [*IWorkflowExecutionSignaledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionsignaledeventattributes.md)): [*WorkflowExecutionSignaledEventAttributes*](proto.temporal.api.history.v1.workflowexecutionsignaledeventattributes.md)

Constructs a new WorkflowExecutionSignaledEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowExecutionSignaledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionsignaledeventattributes.md) |

**Returns:** [*WorkflowExecutionSignaledEventAttributes*](proto.temporal.api.history.v1.workflowexecutionsignaledeventattributes.md)

## Properties

### identity

• **identity**: *string*

WorkflowExecutionSignaledEventAttributes identity.

Implementation of: [IWorkflowExecutionSignaledEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionsignaledeventattributes.md).[identity](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionsignaledeventattributes.md#identity)

___

### input

• `Optional` **input**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

WorkflowExecutionSignaledEventAttributes input.

Implementation of: [IWorkflowExecutionSignaledEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionsignaledeventattributes.md).[input](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionsignaledeventattributes.md#input)

___

### signalName

• **signalName**: *string*

WorkflowExecutionSignaledEventAttributes signalName.

Implementation of: [IWorkflowExecutionSignaledEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionsignaledeventattributes.md).[signalName](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionsignaledeventattributes.md#signalname)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this WorkflowExecutionSignaledEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IWorkflowExecutionSignaledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionsignaledeventattributes.md)): [*WorkflowExecutionSignaledEventAttributes*](proto.temporal.api.history.v1.workflowexecutionsignaledeventattributes.md)

Creates a new WorkflowExecutionSignaledEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowExecutionSignaledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionsignaledeventattributes.md) |

**Returns:** [*WorkflowExecutionSignaledEventAttributes*](proto.temporal.api.history.v1.workflowexecutionsignaledeventattributes.md)

WorkflowExecutionSignaledEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*WorkflowExecutionSignaledEventAttributes*](proto.temporal.api.history.v1.workflowexecutionsignaledeventattributes.md)

Decodes a WorkflowExecutionSignaledEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*WorkflowExecutionSignaledEventAttributes*](proto.temporal.api.history.v1.workflowexecutionsignaledeventattributes.md)

WorkflowExecutionSignaledEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*WorkflowExecutionSignaledEventAttributes*](proto.temporal.api.history.v1.workflowexecutionsignaledeventattributes.md)

Decodes a WorkflowExecutionSignaledEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*WorkflowExecutionSignaledEventAttributes*](proto.temporal.api.history.v1.workflowexecutionsignaledeventattributes.md)

WorkflowExecutionSignaledEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IWorkflowExecutionSignaledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionsignaledeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowExecutionSignaledEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.workflowexecutionsignaledeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowExecutionSignaledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionsignaledeventattributes.md) | WorkflowExecutionSignaledEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IWorkflowExecutionSignaledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionsignaledeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowExecutionSignaledEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.workflowexecutionsignaledeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowExecutionSignaledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionsignaledeventattributes.md) | WorkflowExecutionSignaledEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*WorkflowExecutionSignaledEventAttributes*](proto.temporal.api.history.v1.workflowexecutionsignaledeventattributes.md)

Creates a WorkflowExecutionSignaledEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*WorkflowExecutionSignaledEventAttributes*](proto.temporal.api.history.v1.workflowexecutionsignaledeventattributes.md)

WorkflowExecutionSignaledEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*WorkflowExecutionSignaledEventAttributes*](proto.temporal.api.history.v1.workflowexecutionsignaledeventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a WorkflowExecutionSignaledEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*WorkflowExecutionSignaledEventAttributes*](proto.temporal.api.history.v1.workflowexecutionsignaledeventattributes.md) | WorkflowExecutionSignaledEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a WorkflowExecutionSignaledEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
