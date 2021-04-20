# Class: ExternalWorkflowExecutionSignaledEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).ExternalWorkflowExecutionSignaledEventAttributes

Represents an ExternalWorkflowExecutionSignaledEventAttributes.

## Implements

* [*IExternalWorkflowExecutionSignaledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iexternalworkflowexecutionsignaledeventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.externalworkflowexecutionsignaledeventattributes.md#constructor)

### Properties

- [control](proto.temporal.api.history.v1.externalworkflowexecutionsignaledeventattributes.md#control)
- [initiatedEventId](proto.temporal.api.history.v1.externalworkflowexecutionsignaledeventattributes.md#initiatedeventid)
- [namespace](proto.temporal.api.history.v1.externalworkflowexecutionsignaledeventattributes.md#namespace)
- [workflowExecution](proto.temporal.api.history.v1.externalworkflowexecutionsignaledeventattributes.md#workflowexecution)

### Methods

- [toJSON](proto.temporal.api.history.v1.externalworkflowexecutionsignaledeventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.externalworkflowexecutionsignaledeventattributes.md#create)
- [decode](proto.temporal.api.history.v1.externalworkflowexecutionsignaledeventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.externalworkflowexecutionsignaledeventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.externalworkflowexecutionsignaledeventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.externalworkflowexecutionsignaledeventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.externalworkflowexecutionsignaledeventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.externalworkflowexecutionsignaledeventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.externalworkflowexecutionsignaledeventattributes.md#verify)

## Constructors

### constructor

\+ **new ExternalWorkflowExecutionSignaledEventAttributes**(`properties?`: [*IExternalWorkflowExecutionSignaledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iexternalworkflowexecutionsignaledeventattributes.md)): [*ExternalWorkflowExecutionSignaledEventAttributes*](proto.temporal.api.history.v1.externalworkflowexecutionsignaledeventattributes.md)

Constructs a new ExternalWorkflowExecutionSignaledEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IExternalWorkflowExecutionSignaledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iexternalworkflowexecutionsignaledeventattributes.md) |

**Returns:** [*ExternalWorkflowExecutionSignaledEventAttributes*](proto.temporal.api.history.v1.externalworkflowexecutionsignaledeventattributes.md)

## Properties

### control

• **control**: *string*

ExternalWorkflowExecutionSignaledEventAttributes control.

Implementation of: [IExternalWorkflowExecutionSignaledEventAttributes](../interfaces/proto.temporal.api.history.v1.iexternalworkflowexecutionsignaledeventattributes.md).[control](../interfaces/proto.temporal.api.history.v1.iexternalworkflowexecutionsignaledeventattributes.md#control)

___

### initiatedEventId

• **initiatedEventId**: Long

ExternalWorkflowExecutionSignaledEventAttributes initiatedEventId.

Implementation of: [IExternalWorkflowExecutionSignaledEventAttributes](../interfaces/proto.temporal.api.history.v1.iexternalworkflowexecutionsignaledeventattributes.md).[initiatedEventId](../interfaces/proto.temporal.api.history.v1.iexternalworkflowexecutionsignaledeventattributes.md#initiatedeventid)

___

### namespace

• **namespace**: *string*

ExternalWorkflowExecutionSignaledEventAttributes namespace.

Implementation of: [IExternalWorkflowExecutionSignaledEventAttributes](../interfaces/proto.temporal.api.history.v1.iexternalworkflowexecutionsignaledeventattributes.md).[namespace](../interfaces/proto.temporal.api.history.v1.iexternalworkflowexecutionsignaledeventattributes.md#namespace)

___

### workflowExecution

• `Optional` **workflowExecution**: *null* \| [*IWorkflowExecution*](../interfaces/proto.temporal.api.common.v1.iworkflowexecution.md)

ExternalWorkflowExecutionSignaledEventAttributes workflowExecution.

Implementation of: [IExternalWorkflowExecutionSignaledEventAttributes](../interfaces/proto.temporal.api.history.v1.iexternalworkflowexecutionsignaledeventattributes.md).[workflowExecution](../interfaces/proto.temporal.api.history.v1.iexternalworkflowexecutionsignaledeventattributes.md#workflowexecution)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ExternalWorkflowExecutionSignaledEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IExternalWorkflowExecutionSignaledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iexternalworkflowexecutionsignaledeventattributes.md)): [*ExternalWorkflowExecutionSignaledEventAttributes*](proto.temporal.api.history.v1.externalworkflowexecutionsignaledeventattributes.md)

Creates a new ExternalWorkflowExecutionSignaledEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IExternalWorkflowExecutionSignaledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iexternalworkflowexecutionsignaledeventattributes.md) |

**Returns:** [*ExternalWorkflowExecutionSignaledEventAttributes*](proto.temporal.api.history.v1.externalworkflowexecutionsignaledeventattributes.md)

ExternalWorkflowExecutionSignaledEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ExternalWorkflowExecutionSignaledEventAttributes*](proto.temporal.api.history.v1.externalworkflowexecutionsignaledeventattributes.md)

Decodes an ExternalWorkflowExecutionSignaledEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ExternalWorkflowExecutionSignaledEventAttributes*](proto.temporal.api.history.v1.externalworkflowexecutionsignaledeventattributes.md)

ExternalWorkflowExecutionSignaledEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ExternalWorkflowExecutionSignaledEventAttributes*](proto.temporal.api.history.v1.externalworkflowexecutionsignaledeventattributes.md)

Decodes an ExternalWorkflowExecutionSignaledEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ExternalWorkflowExecutionSignaledEventAttributes*](proto.temporal.api.history.v1.externalworkflowexecutionsignaledeventattributes.md)

ExternalWorkflowExecutionSignaledEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IExternalWorkflowExecutionSignaledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iexternalworkflowexecutionsignaledeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified ExternalWorkflowExecutionSignaledEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.externalworkflowexecutionsignaledeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IExternalWorkflowExecutionSignaledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iexternalworkflowexecutionsignaledeventattributes.md) | ExternalWorkflowExecutionSignaledEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IExternalWorkflowExecutionSignaledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iexternalworkflowexecutionsignaledeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified ExternalWorkflowExecutionSignaledEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.externalworkflowexecutionsignaledeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IExternalWorkflowExecutionSignaledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iexternalworkflowexecutionsignaledeventattributes.md) | ExternalWorkflowExecutionSignaledEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ExternalWorkflowExecutionSignaledEventAttributes*](proto.temporal.api.history.v1.externalworkflowexecutionsignaledeventattributes.md)

Creates an ExternalWorkflowExecutionSignaledEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ExternalWorkflowExecutionSignaledEventAttributes*](proto.temporal.api.history.v1.externalworkflowexecutionsignaledeventattributes.md)

ExternalWorkflowExecutionSignaledEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*ExternalWorkflowExecutionSignaledEventAttributes*](proto.temporal.api.history.v1.externalworkflowexecutionsignaledeventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from an ExternalWorkflowExecutionSignaledEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ExternalWorkflowExecutionSignaledEventAttributes*](proto.temporal.api.history.v1.externalworkflowexecutionsignaledeventattributes.md) | ExternalWorkflowExecutionSignaledEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an ExternalWorkflowExecutionSignaledEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
