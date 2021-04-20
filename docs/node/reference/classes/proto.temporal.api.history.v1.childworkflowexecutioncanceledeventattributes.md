# Class: ChildWorkflowExecutionCanceledEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).ChildWorkflowExecutionCanceledEventAttributes

Represents a ChildWorkflowExecutionCanceledEventAttributes.

## Implements

* [*IChildWorkflowExecutionCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncanceledeventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.childworkflowexecutioncanceledeventattributes.md#constructor)

### Properties

- [details](proto.temporal.api.history.v1.childworkflowexecutioncanceledeventattributes.md#details)
- [initiatedEventId](proto.temporal.api.history.v1.childworkflowexecutioncanceledeventattributes.md#initiatedeventid)
- [namespace](proto.temporal.api.history.v1.childworkflowexecutioncanceledeventattributes.md#namespace)
- [startedEventId](proto.temporal.api.history.v1.childworkflowexecutioncanceledeventattributes.md#startedeventid)
- [workflowExecution](proto.temporal.api.history.v1.childworkflowexecutioncanceledeventattributes.md#workflowexecution)
- [workflowType](proto.temporal.api.history.v1.childworkflowexecutioncanceledeventattributes.md#workflowtype)

### Methods

- [toJSON](proto.temporal.api.history.v1.childworkflowexecutioncanceledeventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.childworkflowexecutioncanceledeventattributes.md#create)
- [decode](proto.temporal.api.history.v1.childworkflowexecutioncanceledeventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.childworkflowexecutioncanceledeventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.childworkflowexecutioncanceledeventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.childworkflowexecutioncanceledeventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.childworkflowexecutioncanceledeventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.childworkflowexecutioncanceledeventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.childworkflowexecutioncanceledeventattributes.md#verify)

## Constructors

### constructor

\+ **new ChildWorkflowExecutionCanceledEventAttributes**(`properties?`: [*IChildWorkflowExecutionCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncanceledeventattributes.md)): [*ChildWorkflowExecutionCanceledEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutioncanceledeventattributes.md)

Constructs a new ChildWorkflowExecutionCanceledEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IChildWorkflowExecutionCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncanceledeventattributes.md) |

**Returns:** [*ChildWorkflowExecutionCanceledEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutioncanceledeventattributes.md)

## Properties

### details

• `Optional` **details**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

ChildWorkflowExecutionCanceledEventAttributes details.

Implementation of: [IChildWorkflowExecutionCanceledEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncanceledeventattributes.md).[details](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncanceledeventattributes.md#details)

___

### initiatedEventId

• **initiatedEventId**: Long

ChildWorkflowExecutionCanceledEventAttributes initiatedEventId.

Implementation of: [IChildWorkflowExecutionCanceledEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncanceledeventattributes.md).[initiatedEventId](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncanceledeventattributes.md#initiatedeventid)

___

### namespace

• **namespace**: *string*

ChildWorkflowExecutionCanceledEventAttributes namespace.

Implementation of: [IChildWorkflowExecutionCanceledEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncanceledeventattributes.md).[namespace](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncanceledeventattributes.md#namespace)

___

### startedEventId

• **startedEventId**: Long

ChildWorkflowExecutionCanceledEventAttributes startedEventId.

Implementation of: [IChildWorkflowExecutionCanceledEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncanceledeventattributes.md).[startedEventId](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncanceledeventattributes.md#startedeventid)

___

### workflowExecution

• `Optional` **workflowExecution**: *null* \| [*IWorkflowExecution*](../interfaces/proto.temporal.api.common.v1.iworkflowexecution.md)

ChildWorkflowExecutionCanceledEventAttributes workflowExecution.

Implementation of: [IChildWorkflowExecutionCanceledEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncanceledeventattributes.md).[workflowExecution](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncanceledeventattributes.md#workflowexecution)

___

### workflowType

• `Optional` **workflowType**: *null* \| [*IWorkflowType*](../interfaces/proto.temporal.api.common.v1.iworkflowtype.md)

ChildWorkflowExecutionCanceledEventAttributes workflowType.

Implementation of: [IChildWorkflowExecutionCanceledEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncanceledeventattributes.md).[workflowType](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncanceledeventattributes.md#workflowtype)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ChildWorkflowExecutionCanceledEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IChildWorkflowExecutionCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncanceledeventattributes.md)): [*ChildWorkflowExecutionCanceledEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutioncanceledeventattributes.md)

Creates a new ChildWorkflowExecutionCanceledEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IChildWorkflowExecutionCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncanceledeventattributes.md) |

**Returns:** [*ChildWorkflowExecutionCanceledEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutioncanceledeventattributes.md)

ChildWorkflowExecutionCanceledEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ChildWorkflowExecutionCanceledEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutioncanceledeventattributes.md)

Decodes a ChildWorkflowExecutionCanceledEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ChildWorkflowExecutionCanceledEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutioncanceledeventattributes.md)

ChildWorkflowExecutionCanceledEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ChildWorkflowExecutionCanceledEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutioncanceledeventattributes.md)

Decodes a ChildWorkflowExecutionCanceledEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ChildWorkflowExecutionCanceledEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutioncanceledeventattributes.md)

ChildWorkflowExecutionCanceledEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IChildWorkflowExecutionCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncanceledeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified ChildWorkflowExecutionCanceledEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.childworkflowexecutioncanceledeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IChildWorkflowExecutionCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncanceledeventattributes.md) | ChildWorkflowExecutionCanceledEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IChildWorkflowExecutionCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncanceledeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified ChildWorkflowExecutionCanceledEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.childworkflowexecutioncanceledeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IChildWorkflowExecutionCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncanceledeventattributes.md) | ChildWorkflowExecutionCanceledEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ChildWorkflowExecutionCanceledEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutioncanceledeventattributes.md)

Creates a ChildWorkflowExecutionCanceledEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ChildWorkflowExecutionCanceledEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutioncanceledeventattributes.md)

ChildWorkflowExecutionCanceledEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*ChildWorkflowExecutionCanceledEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutioncanceledeventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ChildWorkflowExecutionCanceledEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ChildWorkflowExecutionCanceledEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutioncanceledeventattributes.md) | ChildWorkflowExecutionCanceledEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ChildWorkflowExecutionCanceledEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
