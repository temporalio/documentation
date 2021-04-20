# Class: ExternalWorkflowExecutionCancelRequestedEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).ExternalWorkflowExecutionCancelRequestedEventAttributes

Represents an ExternalWorkflowExecutionCancelRequestedEventAttributes.

## Implements

* [*IExternalWorkflowExecutionCancelRequestedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iexternalworkflowexecutioncancelrequestedeventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.externalworkflowexecutioncancelrequestedeventattributes.md#constructor)

### Properties

- [initiatedEventId](proto.temporal.api.history.v1.externalworkflowexecutioncancelrequestedeventattributes.md#initiatedeventid)
- [namespace](proto.temporal.api.history.v1.externalworkflowexecutioncancelrequestedeventattributes.md#namespace)
- [workflowExecution](proto.temporal.api.history.v1.externalworkflowexecutioncancelrequestedeventattributes.md#workflowexecution)

### Methods

- [toJSON](proto.temporal.api.history.v1.externalworkflowexecutioncancelrequestedeventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.externalworkflowexecutioncancelrequestedeventattributes.md#create)
- [decode](proto.temporal.api.history.v1.externalworkflowexecutioncancelrequestedeventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.externalworkflowexecutioncancelrequestedeventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.externalworkflowexecutioncancelrequestedeventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.externalworkflowexecutioncancelrequestedeventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.externalworkflowexecutioncancelrequestedeventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.externalworkflowexecutioncancelrequestedeventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.externalworkflowexecutioncancelrequestedeventattributes.md#verify)

## Constructors

### constructor

\+ **new ExternalWorkflowExecutionCancelRequestedEventAttributes**(`properties?`: [*IExternalWorkflowExecutionCancelRequestedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iexternalworkflowexecutioncancelrequestedeventattributes.md)): [*ExternalWorkflowExecutionCancelRequestedEventAttributes*](proto.temporal.api.history.v1.externalworkflowexecutioncancelrequestedeventattributes.md)

Constructs a new ExternalWorkflowExecutionCancelRequestedEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IExternalWorkflowExecutionCancelRequestedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iexternalworkflowexecutioncancelrequestedeventattributes.md) |

**Returns:** [*ExternalWorkflowExecutionCancelRequestedEventAttributes*](proto.temporal.api.history.v1.externalworkflowexecutioncancelrequestedeventattributes.md)

## Properties

### initiatedEventId

• **initiatedEventId**: Long

ExternalWorkflowExecutionCancelRequestedEventAttributes initiatedEventId.

Implementation of: [IExternalWorkflowExecutionCancelRequestedEventAttributes](../interfaces/proto.temporal.api.history.v1.iexternalworkflowexecutioncancelrequestedeventattributes.md).[initiatedEventId](../interfaces/proto.temporal.api.history.v1.iexternalworkflowexecutioncancelrequestedeventattributes.md#initiatedeventid)

___

### namespace

• **namespace**: *string*

ExternalWorkflowExecutionCancelRequestedEventAttributes namespace.

Implementation of: [IExternalWorkflowExecutionCancelRequestedEventAttributes](../interfaces/proto.temporal.api.history.v1.iexternalworkflowexecutioncancelrequestedeventattributes.md).[namespace](../interfaces/proto.temporal.api.history.v1.iexternalworkflowexecutioncancelrequestedeventattributes.md#namespace)

___

### workflowExecution

• `Optional` **workflowExecution**: *null* \| [*IWorkflowExecution*](../interfaces/proto.temporal.api.common.v1.iworkflowexecution.md)

ExternalWorkflowExecutionCancelRequestedEventAttributes workflowExecution.

Implementation of: [IExternalWorkflowExecutionCancelRequestedEventAttributes](../interfaces/proto.temporal.api.history.v1.iexternalworkflowexecutioncancelrequestedeventattributes.md).[workflowExecution](../interfaces/proto.temporal.api.history.v1.iexternalworkflowexecutioncancelrequestedeventattributes.md#workflowexecution)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ExternalWorkflowExecutionCancelRequestedEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IExternalWorkflowExecutionCancelRequestedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iexternalworkflowexecutioncancelrequestedeventattributes.md)): [*ExternalWorkflowExecutionCancelRequestedEventAttributes*](proto.temporal.api.history.v1.externalworkflowexecutioncancelrequestedeventattributes.md)

Creates a new ExternalWorkflowExecutionCancelRequestedEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IExternalWorkflowExecutionCancelRequestedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iexternalworkflowexecutioncancelrequestedeventattributes.md) |

**Returns:** [*ExternalWorkflowExecutionCancelRequestedEventAttributes*](proto.temporal.api.history.v1.externalworkflowexecutioncancelrequestedeventattributes.md)

ExternalWorkflowExecutionCancelRequestedEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ExternalWorkflowExecutionCancelRequestedEventAttributes*](proto.temporal.api.history.v1.externalworkflowexecutioncancelrequestedeventattributes.md)

Decodes an ExternalWorkflowExecutionCancelRequestedEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ExternalWorkflowExecutionCancelRequestedEventAttributes*](proto.temporal.api.history.v1.externalworkflowexecutioncancelrequestedeventattributes.md)

ExternalWorkflowExecutionCancelRequestedEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ExternalWorkflowExecutionCancelRequestedEventAttributes*](proto.temporal.api.history.v1.externalworkflowexecutioncancelrequestedeventattributes.md)

Decodes an ExternalWorkflowExecutionCancelRequestedEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ExternalWorkflowExecutionCancelRequestedEventAttributes*](proto.temporal.api.history.v1.externalworkflowexecutioncancelrequestedeventattributes.md)

ExternalWorkflowExecutionCancelRequestedEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IExternalWorkflowExecutionCancelRequestedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iexternalworkflowexecutioncancelrequestedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified ExternalWorkflowExecutionCancelRequestedEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.externalworkflowexecutioncancelrequestedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IExternalWorkflowExecutionCancelRequestedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iexternalworkflowexecutioncancelrequestedeventattributes.md) | ExternalWorkflowExecutionCancelRequestedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IExternalWorkflowExecutionCancelRequestedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iexternalworkflowexecutioncancelrequestedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified ExternalWorkflowExecutionCancelRequestedEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.externalworkflowexecutioncancelrequestedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IExternalWorkflowExecutionCancelRequestedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iexternalworkflowexecutioncancelrequestedeventattributes.md) | ExternalWorkflowExecutionCancelRequestedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ExternalWorkflowExecutionCancelRequestedEventAttributes*](proto.temporal.api.history.v1.externalworkflowexecutioncancelrequestedeventattributes.md)

Creates an ExternalWorkflowExecutionCancelRequestedEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ExternalWorkflowExecutionCancelRequestedEventAttributes*](proto.temporal.api.history.v1.externalworkflowexecutioncancelrequestedeventattributes.md)

ExternalWorkflowExecutionCancelRequestedEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*ExternalWorkflowExecutionCancelRequestedEventAttributes*](proto.temporal.api.history.v1.externalworkflowexecutioncancelrequestedeventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from an ExternalWorkflowExecutionCancelRequestedEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ExternalWorkflowExecutionCancelRequestedEventAttributes*](proto.temporal.api.history.v1.externalworkflowexecutioncancelrequestedeventattributes.md) | ExternalWorkflowExecutionCancelRequestedEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an ExternalWorkflowExecutionCancelRequestedEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
