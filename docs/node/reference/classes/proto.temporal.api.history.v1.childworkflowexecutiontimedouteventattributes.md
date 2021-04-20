# Class: ChildWorkflowExecutionTimedOutEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).ChildWorkflowExecutionTimedOutEventAttributes

Represents a ChildWorkflowExecutionTimedOutEventAttributes.

## Implements

* [*IChildWorkflowExecutionTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutiontimedouteventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.childworkflowexecutiontimedouteventattributes.md#constructor)

### Properties

- [initiatedEventId](proto.temporal.api.history.v1.childworkflowexecutiontimedouteventattributes.md#initiatedeventid)
- [namespace](proto.temporal.api.history.v1.childworkflowexecutiontimedouteventattributes.md#namespace)
- [retryState](proto.temporal.api.history.v1.childworkflowexecutiontimedouteventattributes.md#retrystate)
- [startedEventId](proto.temporal.api.history.v1.childworkflowexecutiontimedouteventattributes.md#startedeventid)
- [workflowExecution](proto.temporal.api.history.v1.childworkflowexecutiontimedouteventattributes.md#workflowexecution)
- [workflowType](proto.temporal.api.history.v1.childworkflowexecutiontimedouteventattributes.md#workflowtype)

### Methods

- [toJSON](proto.temporal.api.history.v1.childworkflowexecutiontimedouteventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.childworkflowexecutiontimedouteventattributes.md#create)
- [decode](proto.temporal.api.history.v1.childworkflowexecutiontimedouteventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.childworkflowexecutiontimedouteventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.childworkflowexecutiontimedouteventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.childworkflowexecutiontimedouteventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.childworkflowexecutiontimedouteventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.childworkflowexecutiontimedouteventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.childworkflowexecutiontimedouteventattributes.md#verify)

## Constructors

### constructor

\+ **new ChildWorkflowExecutionTimedOutEventAttributes**(`properties?`: [*IChildWorkflowExecutionTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutiontimedouteventattributes.md)): [*ChildWorkflowExecutionTimedOutEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutiontimedouteventattributes.md)

Constructs a new ChildWorkflowExecutionTimedOutEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IChildWorkflowExecutionTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutiontimedouteventattributes.md) |

**Returns:** [*ChildWorkflowExecutionTimedOutEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutiontimedouteventattributes.md)

## Properties

### initiatedEventId

• **initiatedEventId**: Long

ChildWorkflowExecutionTimedOutEventAttributes initiatedEventId.

Implementation of: [IChildWorkflowExecutionTimedOutEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutiontimedouteventattributes.md).[initiatedEventId](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutiontimedouteventattributes.md#initiatedeventid)

___

### namespace

• **namespace**: *string*

ChildWorkflowExecutionTimedOutEventAttributes namespace.

Implementation of: [IChildWorkflowExecutionTimedOutEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutiontimedouteventattributes.md).[namespace](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutiontimedouteventattributes.md#namespace)

___

### retryState

• **retryState**: [*RetryState*](../enums/proto.temporal.api.enums.v1.retrystate.md)

ChildWorkflowExecutionTimedOutEventAttributes retryState.

Implementation of: [IChildWorkflowExecutionTimedOutEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutiontimedouteventattributes.md).[retryState](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutiontimedouteventattributes.md#retrystate)

___

### startedEventId

• **startedEventId**: Long

ChildWorkflowExecutionTimedOutEventAttributes startedEventId.

Implementation of: [IChildWorkflowExecutionTimedOutEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutiontimedouteventattributes.md).[startedEventId](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutiontimedouteventattributes.md#startedeventid)

___

### workflowExecution

• `Optional` **workflowExecution**: *null* \| [*IWorkflowExecution*](../interfaces/proto.temporal.api.common.v1.iworkflowexecution.md)

ChildWorkflowExecutionTimedOutEventAttributes workflowExecution.

Implementation of: [IChildWorkflowExecutionTimedOutEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutiontimedouteventattributes.md).[workflowExecution](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutiontimedouteventattributes.md#workflowexecution)

___

### workflowType

• `Optional` **workflowType**: *null* \| [*IWorkflowType*](../interfaces/proto.temporal.api.common.v1.iworkflowtype.md)

ChildWorkflowExecutionTimedOutEventAttributes workflowType.

Implementation of: [IChildWorkflowExecutionTimedOutEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutiontimedouteventattributes.md).[workflowType](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutiontimedouteventattributes.md#workflowtype)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ChildWorkflowExecutionTimedOutEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IChildWorkflowExecutionTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutiontimedouteventattributes.md)): [*ChildWorkflowExecutionTimedOutEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutiontimedouteventattributes.md)

Creates a new ChildWorkflowExecutionTimedOutEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IChildWorkflowExecutionTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutiontimedouteventattributes.md) |

**Returns:** [*ChildWorkflowExecutionTimedOutEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutiontimedouteventattributes.md)

ChildWorkflowExecutionTimedOutEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ChildWorkflowExecutionTimedOutEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutiontimedouteventattributes.md)

Decodes a ChildWorkflowExecutionTimedOutEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ChildWorkflowExecutionTimedOutEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutiontimedouteventattributes.md)

ChildWorkflowExecutionTimedOutEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ChildWorkflowExecutionTimedOutEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutiontimedouteventattributes.md)

Decodes a ChildWorkflowExecutionTimedOutEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ChildWorkflowExecutionTimedOutEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutiontimedouteventattributes.md)

ChildWorkflowExecutionTimedOutEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IChildWorkflowExecutionTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutiontimedouteventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified ChildWorkflowExecutionTimedOutEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.childworkflowexecutiontimedouteventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IChildWorkflowExecutionTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutiontimedouteventattributes.md) | ChildWorkflowExecutionTimedOutEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IChildWorkflowExecutionTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutiontimedouteventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified ChildWorkflowExecutionTimedOutEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.childworkflowexecutiontimedouteventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IChildWorkflowExecutionTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutiontimedouteventattributes.md) | ChildWorkflowExecutionTimedOutEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ChildWorkflowExecutionTimedOutEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutiontimedouteventattributes.md)

Creates a ChildWorkflowExecutionTimedOutEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ChildWorkflowExecutionTimedOutEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutiontimedouteventattributes.md)

ChildWorkflowExecutionTimedOutEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*ChildWorkflowExecutionTimedOutEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutiontimedouteventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ChildWorkflowExecutionTimedOutEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ChildWorkflowExecutionTimedOutEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutiontimedouteventattributes.md) | ChildWorkflowExecutionTimedOutEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ChildWorkflowExecutionTimedOutEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
