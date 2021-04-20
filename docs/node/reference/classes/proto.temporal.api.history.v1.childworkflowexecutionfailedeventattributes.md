# Class: ChildWorkflowExecutionFailedEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).ChildWorkflowExecutionFailedEventAttributes

Represents a ChildWorkflowExecutionFailedEventAttributes.

## Implements

* [*IChildWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionfailedeventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.childworkflowexecutionfailedeventattributes.md#constructor)

### Properties

- [failure](proto.temporal.api.history.v1.childworkflowexecutionfailedeventattributes.md#failure)
- [initiatedEventId](proto.temporal.api.history.v1.childworkflowexecutionfailedeventattributes.md#initiatedeventid)
- [namespace](proto.temporal.api.history.v1.childworkflowexecutionfailedeventattributes.md#namespace)
- [retryState](proto.temporal.api.history.v1.childworkflowexecutionfailedeventattributes.md#retrystate)
- [startedEventId](proto.temporal.api.history.v1.childworkflowexecutionfailedeventattributes.md#startedeventid)
- [workflowExecution](proto.temporal.api.history.v1.childworkflowexecutionfailedeventattributes.md#workflowexecution)
- [workflowType](proto.temporal.api.history.v1.childworkflowexecutionfailedeventattributes.md#workflowtype)

### Methods

- [toJSON](proto.temporal.api.history.v1.childworkflowexecutionfailedeventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.childworkflowexecutionfailedeventattributes.md#create)
- [decode](proto.temporal.api.history.v1.childworkflowexecutionfailedeventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.childworkflowexecutionfailedeventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.childworkflowexecutionfailedeventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.childworkflowexecutionfailedeventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.childworkflowexecutionfailedeventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.childworkflowexecutionfailedeventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.childworkflowexecutionfailedeventattributes.md#verify)

## Constructors

### constructor

\+ **new ChildWorkflowExecutionFailedEventAttributes**(`properties?`: [*IChildWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionfailedeventattributes.md)): [*ChildWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionfailedeventattributes.md)

Constructs a new ChildWorkflowExecutionFailedEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IChildWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionfailedeventattributes.md) |

**Returns:** [*ChildWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionfailedeventattributes.md)

## Properties

### failure

• `Optional` **failure**: *null* \| [*IFailure*](../interfaces/proto.temporal.api.failure.v1.ifailure.md)

ChildWorkflowExecutionFailedEventAttributes failure.

Implementation of: [IChildWorkflowExecutionFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionfailedeventattributes.md).[failure](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionfailedeventattributes.md#failure)

___

### initiatedEventId

• **initiatedEventId**: Long

ChildWorkflowExecutionFailedEventAttributes initiatedEventId.

Implementation of: [IChildWorkflowExecutionFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionfailedeventattributes.md).[initiatedEventId](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionfailedeventattributes.md#initiatedeventid)

___

### namespace

• **namespace**: *string*

ChildWorkflowExecutionFailedEventAttributes namespace.

Implementation of: [IChildWorkflowExecutionFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionfailedeventattributes.md).[namespace](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionfailedeventattributes.md#namespace)

___

### retryState

• **retryState**: [*RetryState*](../enums/proto.temporal.api.enums.v1.retrystate.md)

ChildWorkflowExecutionFailedEventAttributes retryState.

Implementation of: [IChildWorkflowExecutionFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionfailedeventattributes.md).[retryState](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionfailedeventattributes.md#retrystate)

___

### startedEventId

• **startedEventId**: Long

ChildWorkflowExecutionFailedEventAttributes startedEventId.

Implementation of: [IChildWorkflowExecutionFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionfailedeventattributes.md).[startedEventId](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionfailedeventattributes.md#startedeventid)

___

### workflowExecution

• `Optional` **workflowExecution**: *null* \| [*IWorkflowExecution*](../interfaces/proto.temporal.api.common.v1.iworkflowexecution.md)

ChildWorkflowExecutionFailedEventAttributes workflowExecution.

Implementation of: [IChildWorkflowExecutionFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionfailedeventattributes.md).[workflowExecution](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionfailedeventattributes.md#workflowexecution)

___

### workflowType

• `Optional` **workflowType**: *null* \| [*IWorkflowType*](../interfaces/proto.temporal.api.common.v1.iworkflowtype.md)

ChildWorkflowExecutionFailedEventAttributes workflowType.

Implementation of: [IChildWorkflowExecutionFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionfailedeventattributes.md).[workflowType](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionfailedeventattributes.md#workflowtype)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ChildWorkflowExecutionFailedEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IChildWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionfailedeventattributes.md)): [*ChildWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionfailedeventattributes.md)

Creates a new ChildWorkflowExecutionFailedEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IChildWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionfailedeventattributes.md) |

**Returns:** [*ChildWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionfailedeventattributes.md)

ChildWorkflowExecutionFailedEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ChildWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionfailedeventattributes.md)

Decodes a ChildWorkflowExecutionFailedEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ChildWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionfailedeventattributes.md)

ChildWorkflowExecutionFailedEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ChildWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionfailedeventattributes.md)

Decodes a ChildWorkflowExecutionFailedEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ChildWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionfailedeventattributes.md)

ChildWorkflowExecutionFailedEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IChildWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionfailedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified ChildWorkflowExecutionFailedEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.childworkflowexecutionfailedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IChildWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionfailedeventattributes.md) | ChildWorkflowExecutionFailedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IChildWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionfailedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified ChildWorkflowExecutionFailedEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.childworkflowexecutionfailedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IChildWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionfailedeventattributes.md) | ChildWorkflowExecutionFailedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ChildWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionfailedeventattributes.md)

Creates a ChildWorkflowExecutionFailedEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ChildWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionfailedeventattributes.md)

ChildWorkflowExecutionFailedEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*ChildWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionfailedeventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ChildWorkflowExecutionFailedEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ChildWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionfailedeventattributes.md) | ChildWorkflowExecutionFailedEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ChildWorkflowExecutionFailedEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
