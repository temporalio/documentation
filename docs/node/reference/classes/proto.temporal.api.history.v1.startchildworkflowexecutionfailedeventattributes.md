# Class: StartChildWorkflowExecutionFailedEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).StartChildWorkflowExecutionFailedEventAttributes

Represents a StartChildWorkflowExecutionFailedEventAttributes.

## Implements

* [*IStartChildWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutionfailedeventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.startchildworkflowexecutionfailedeventattributes.md#constructor)

### Properties

- [cause](proto.temporal.api.history.v1.startchildworkflowexecutionfailedeventattributes.md#cause)
- [control](proto.temporal.api.history.v1.startchildworkflowexecutionfailedeventattributes.md#control)
- [initiatedEventId](proto.temporal.api.history.v1.startchildworkflowexecutionfailedeventattributes.md#initiatedeventid)
- [namespace](proto.temporal.api.history.v1.startchildworkflowexecutionfailedeventattributes.md#namespace)
- [workflowId](proto.temporal.api.history.v1.startchildworkflowexecutionfailedeventattributes.md#workflowid)
- [workflowTaskCompletedEventId](proto.temporal.api.history.v1.startchildworkflowexecutionfailedeventattributes.md#workflowtaskcompletedeventid)
- [workflowType](proto.temporal.api.history.v1.startchildworkflowexecutionfailedeventattributes.md#workflowtype)

### Methods

- [toJSON](proto.temporal.api.history.v1.startchildworkflowexecutionfailedeventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.startchildworkflowexecutionfailedeventattributes.md#create)
- [decode](proto.temporal.api.history.v1.startchildworkflowexecutionfailedeventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.startchildworkflowexecutionfailedeventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.startchildworkflowexecutionfailedeventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.startchildworkflowexecutionfailedeventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.startchildworkflowexecutionfailedeventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.startchildworkflowexecutionfailedeventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.startchildworkflowexecutionfailedeventattributes.md#verify)

## Constructors

### constructor

\+ **new StartChildWorkflowExecutionFailedEventAttributes**(`properties?`: [*IStartChildWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutionfailedeventattributes.md)): [*StartChildWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.startchildworkflowexecutionfailedeventattributes.md)

Constructs a new StartChildWorkflowExecutionFailedEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IStartChildWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutionfailedeventattributes.md) |

**Returns:** [*StartChildWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.startchildworkflowexecutionfailedeventattributes.md)

## Properties

### cause

• **cause**: [*StartChildWorkflowExecutionFailedCause*](../enums/proto.temporal.api.enums.v1.startchildworkflowexecutionfailedcause.md)

StartChildWorkflowExecutionFailedEventAttributes cause.

Implementation of: [IStartChildWorkflowExecutionFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutionfailedeventattributes.md).[cause](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutionfailedeventattributes.md#cause)

___

### control

• **control**: *string*

StartChildWorkflowExecutionFailedEventAttributes control.

Implementation of: [IStartChildWorkflowExecutionFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutionfailedeventattributes.md).[control](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutionfailedeventattributes.md#control)

___

### initiatedEventId

• **initiatedEventId**: Long

StartChildWorkflowExecutionFailedEventAttributes initiatedEventId.

Implementation of: [IStartChildWorkflowExecutionFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutionfailedeventattributes.md).[initiatedEventId](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutionfailedeventattributes.md#initiatedeventid)

___

### namespace

• **namespace**: *string*

StartChildWorkflowExecutionFailedEventAttributes namespace.

Implementation of: [IStartChildWorkflowExecutionFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutionfailedeventattributes.md).[namespace](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutionfailedeventattributes.md#namespace)

___

### workflowId

• **workflowId**: *string*

StartChildWorkflowExecutionFailedEventAttributes workflowId.

Implementation of: [IStartChildWorkflowExecutionFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutionfailedeventattributes.md).[workflowId](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutionfailedeventattributes.md#workflowid)

___

### workflowTaskCompletedEventId

• **workflowTaskCompletedEventId**: Long

StartChildWorkflowExecutionFailedEventAttributes workflowTaskCompletedEventId.

Implementation of: [IStartChildWorkflowExecutionFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutionfailedeventattributes.md).[workflowTaskCompletedEventId](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutionfailedeventattributes.md#workflowtaskcompletedeventid)

___

### workflowType

• `Optional` **workflowType**: *null* \| [*IWorkflowType*](../interfaces/proto.temporal.api.common.v1.iworkflowtype.md)

StartChildWorkflowExecutionFailedEventAttributes workflowType.

Implementation of: [IStartChildWorkflowExecutionFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutionfailedeventattributes.md).[workflowType](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutionfailedeventattributes.md#workflowtype)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this StartChildWorkflowExecutionFailedEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IStartChildWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutionfailedeventattributes.md)): [*StartChildWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.startchildworkflowexecutionfailedeventattributes.md)

Creates a new StartChildWorkflowExecutionFailedEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IStartChildWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutionfailedeventattributes.md) |

**Returns:** [*StartChildWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.startchildworkflowexecutionfailedeventattributes.md)

StartChildWorkflowExecutionFailedEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*StartChildWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.startchildworkflowexecutionfailedeventattributes.md)

Decodes a StartChildWorkflowExecutionFailedEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*StartChildWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.startchildworkflowexecutionfailedeventattributes.md)

StartChildWorkflowExecutionFailedEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*StartChildWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.startchildworkflowexecutionfailedeventattributes.md)

Decodes a StartChildWorkflowExecutionFailedEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*StartChildWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.startchildworkflowexecutionfailedeventattributes.md)

StartChildWorkflowExecutionFailedEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IStartChildWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutionfailedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified StartChildWorkflowExecutionFailedEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.startchildworkflowexecutionfailedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IStartChildWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutionfailedeventattributes.md) | StartChildWorkflowExecutionFailedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IStartChildWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutionfailedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified StartChildWorkflowExecutionFailedEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.startchildworkflowexecutionfailedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IStartChildWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutionfailedeventattributes.md) | StartChildWorkflowExecutionFailedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*StartChildWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.startchildworkflowexecutionfailedeventattributes.md)

Creates a StartChildWorkflowExecutionFailedEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*StartChildWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.startchildworkflowexecutionfailedeventattributes.md)

StartChildWorkflowExecutionFailedEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*StartChildWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.startchildworkflowexecutionfailedeventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a StartChildWorkflowExecutionFailedEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*StartChildWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.startchildworkflowexecutionfailedeventattributes.md) | StartChildWorkflowExecutionFailedEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a StartChildWorkflowExecutionFailedEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
