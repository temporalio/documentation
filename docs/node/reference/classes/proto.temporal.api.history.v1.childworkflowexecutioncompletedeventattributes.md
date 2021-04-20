# Class: ChildWorkflowExecutionCompletedEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).ChildWorkflowExecutionCompletedEventAttributes

Represents a ChildWorkflowExecutionCompletedEventAttributes.

## Implements

* [*IChildWorkflowExecutionCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncompletedeventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.childworkflowexecutioncompletedeventattributes.md#constructor)

### Properties

- [initiatedEventId](proto.temporal.api.history.v1.childworkflowexecutioncompletedeventattributes.md#initiatedeventid)
- [namespace](proto.temporal.api.history.v1.childworkflowexecutioncompletedeventattributes.md#namespace)
- [result](proto.temporal.api.history.v1.childworkflowexecutioncompletedeventattributes.md#result)
- [startedEventId](proto.temporal.api.history.v1.childworkflowexecutioncompletedeventattributes.md#startedeventid)
- [workflowExecution](proto.temporal.api.history.v1.childworkflowexecutioncompletedeventattributes.md#workflowexecution)
- [workflowType](proto.temporal.api.history.v1.childworkflowexecutioncompletedeventattributes.md#workflowtype)

### Methods

- [toJSON](proto.temporal.api.history.v1.childworkflowexecutioncompletedeventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.childworkflowexecutioncompletedeventattributes.md#create)
- [decode](proto.temporal.api.history.v1.childworkflowexecutioncompletedeventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.childworkflowexecutioncompletedeventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.childworkflowexecutioncompletedeventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.childworkflowexecutioncompletedeventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.childworkflowexecutioncompletedeventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.childworkflowexecutioncompletedeventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.childworkflowexecutioncompletedeventattributes.md#verify)

## Constructors

### constructor

\+ **new ChildWorkflowExecutionCompletedEventAttributes**(`properties?`: [*IChildWorkflowExecutionCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncompletedeventattributes.md)): [*ChildWorkflowExecutionCompletedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutioncompletedeventattributes.md)

Constructs a new ChildWorkflowExecutionCompletedEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IChildWorkflowExecutionCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncompletedeventattributes.md) |

**Returns:** [*ChildWorkflowExecutionCompletedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutioncompletedeventattributes.md)

## Properties

### initiatedEventId

• **initiatedEventId**: Long

ChildWorkflowExecutionCompletedEventAttributes initiatedEventId.

Implementation of: [IChildWorkflowExecutionCompletedEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncompletedeventattributes.md).[initiatedEventId](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncompletedeventattributes.md#initiatedeventid)

___

### namespace

• **namespace**: *string*

ChildWorkflowExecutionCompletedEventAttributes namespace.

Implementation of: [IChildWorkflowExecutionCompletedEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncompletedeventattributes.md).[namespace](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncompletedeventattributes.md#namespace)

___

### result

• `Optional` **result**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

ChildWorkflowExecutionCompletedEventAttributes result.

Implementation of: [IChildWorkflowExecutionCompletedEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncompletedeventattributes.md).[result](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncompletedeventattributes.md#result)

___

### startedEventId

• **startedEventId**: Long

ChildWorkflowExecutionCompletedEventAttributes startedEventId.

Implementation of: [IChildWorkflowExecutionCompletedEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncompletedeventattributes.md).[startedEventId](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncompletedeventattributes.md#startedeventid)

___

### workflowExecution

• `Optional` **workflowExecution**: *null* \| [*IWorkflowExecution*](../interfaces/proto.temporal.api.common.v1.iworkflowexecution.md)

ChildWorkflowExecutionCompletedEventAttributes workflowExecution.

Implementation of: [IChildWorkflowExecutionCompletedEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncompletedeventattributes.md).[workflowExecution](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncompletedeventattributes.md#workflowexecution)

___

### workflowType

• `Optional` **workflowType**: *null* \| [*IWorkflowType*](../interfaces/proto.temporal.api.common.v1.iworkflowtype.md)

ChildWorkflowExecutionCompletedEventAttributes workflowType.

Implementation of: [IChildWorkflowExecutionCompletedEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncompletedeventattributes.md).[workflowType](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncompletedeventattributes.md#workflowtype)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ChildWorkflowExecutionCompletedEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IChildWorkflowExecutionCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncompletedeventattributes.md)): [*ChildWorkflowExecutionCompletedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutioncompletedeventattributes.md)

Creates a new ChildWorkflowExecutionCompletedEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IChildWorkflowExecutionCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncompletedeventattributes.md) |

**Returns:** [*ChildWorkflowExecutionCompletedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutioncompletedeventattributes.md)

ChildWorkflowExecutionCompletedEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ChildWorkflowExecutionCompletedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutioncompletedeventattributes.md)

Decodes a ChildWorkflowExecutionCompletedEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ChildWorkflowExecutionCompletedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutioncompletedeventattributes.md)

ChildWorkflowExecutionCompletedEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ChildWorkflowExecutionCompletedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutioncompletedeventattributes.md)

Decodes a ChildWorkflowExecutionCompletedEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ChildWorkflowExecutionCompletedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutioncompletedeventattributes.md)

ChildWorkflowExecutionCompletedEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IChildWorkflowExecutionCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncompletedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified ChildWorkflowExecutionCompletedEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.childworkflowexecutioncompletedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IChildWorkflowExecutionCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncompletedeventattributes.md) | ChildWorkflowExecutionCompletedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IChildWorkflowExecutionCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncompletedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified ChildWorkflowExecutionCompletedEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.childworkflowexecutioncompletedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IChildWorkflowExecutionCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncompletedeventattributes.md) | ChildWorkflowExecutionCompletedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ChildWorkflowExecutionCompletedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutioncompletedeventattributes.md)

Creates a ChildWorkflowExecutionCompletedEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ChildWorkflowExecutionCompletedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutioncompletedeventattributes.md)

ChildWorkflowExecutionCompletedEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*ChildWorkflowExecutionCompletedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutioncompletedeventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ChildWorkflowExecutionCompletedEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ChildWorkflowExecutionCompletedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutioncompletedeventattributes.md) | ChildWorkflowExecutionCompletedEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ChildWorkflowExecutionCompletedEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
