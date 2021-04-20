# Class: ChildWorkflowExecutionTerminatedEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).ChildWorkflowExecutionTerminatedEventAttributes

Represents a ChildWorkflowExecutionTerminatedEventAttributes.

## Implements

* [*IChildWorkflowExecutionTerminatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionterminatedeventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.childworkflowexecutionterminatedeventattributes.md#constructor)

### Properties

- [initiatedEventId](proto.temporal.api.history.v1.childworkflowexecutionterminatedeventattributes.md#initiatedeventid)
- [namespace](proto.temporal.api.history.v1.childworkflowexecutionterminatedeventattributes.md#namespace)
- [startedEventId](proto.temporal.api.history.v1.childworkflowexecutionterminatedeventattributes.md#startedeventid)
- [workflowExecution](proto.temporal.api.history.v1.childworkflowexecutionterminatedeventattributes.md#workflowexecution)
- [workflowType](proto.temporal.api.history.v1.childworkflowexecutionterminatedeventattributes.md#workflowtype)

### Methods

- [toJSON](proto.temporal.api.history.v1.childworkflowexecutionterminatedeventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.childworkflowexecutionterminatedeventattributes.md#create)
- [decode](proto.temporal.api.history.v1.childworkflowexecutionterminatedeventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.childworkflowexecutionterminatedeventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.childworkflowexecutionterminatedeventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.childworkflowexecutionterminatedeventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.childworkflowexecutionterminatedeventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.childworkflowexecutionterminatedeventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.childworkflowexecutionterminatedeventattributes.md#verify)

## Constructors

### constructor

\+ **new ChildWorkflowExecutionTerminatedEventAttributes**(`properties?`: [*IChildWorkflowExecutionTerminatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionterminatedeventattributes.md)): [*ChildWorkflowExecutionTerminatedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionterminatedeventattributes.md)

Constructs a new ChildWorkflowExecutionTerminatedEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IChildWorkflowExecutionTerminatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionterminatedeventattributes.md) |

**Returns:** [*ChildWorkflowExecutionTerminatedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionterminatedeventattributes.md)

## Properties

### initiatedEventId

• **initiatedEventId**: Long

ChildWorkflowExecutionTerminatedEventAttributes initiatedEventId.

Implementation of: [IChildWorkflowExecutionTerminatedEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionterminatedeventattributes.md).[initiatedEventId](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionterminatedeventattributes.md#initiatedeventid)

___

### namespace

• **namespace**: *string*

ChildWorkflowExecutionTerminatedEventAttributes namespace.

Implementation of: [IChildWorkflowExecutionTerminatedEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionterminatedeventattributes.md).[namespace](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionterminatedeventattributes.md#namespace)

___

### startedEventId

• **startedEventId**: Long

ChildWorkflowExecutionTerminatedEventAttributes startedEventId.

Implementation of: [IChildWorkflowExecutionTerminatedEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionterminatedeventattributes.md).[startedEventId](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionterminatedeventattributes.md#startedeventid)

___

### workflowExecution

• `Optional` **workflowExecution**: *null* \| [*IWorkflowExecution*](../interfaces/proto.temporal.api.common.v1.iworkflowexecution.md)

ChildWorkflowExecutionTerminatedEventAttributes workflowExecution.

Implementation of: [IChildWorkflowExecutionTerminatedEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionterminatedeventattributes.md).[workflowExecution](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionterminatedeventattributes.md#workflowexecution)

___

### workflowType

• `Optional` **workflowType**: *null* \| [*IWorkflowType*](../interfaces/proto.temporal.api.common.v1.iworkflowtype.md)

ChildWorkflowExecutionTerminatedEventAttributes workflowType.

Implementation of: [IChildWorkflowExecutionTerminatedEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionterminatedeventattributes.md).[workflowType](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionterminatedeventattributes.md#workflowtype)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ChildWorkflowExecutionTerminatedEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IChildWorkflowExecutionTerminatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionterminatedeventattributes.md)): [*ChildWorkflowExecutionTerminatedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionterminatedeventattributes.md)

Creates a new ChildWorkflowExecutionTerminatedEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IChildWorkflowExecutionTerminatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionterminatedeventattributes.md) |

**Returns:** [*ChildWorkflowExecutionTerminatedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionterminatedeventattributes.md)

ChildWorkflowExecutionTerminatedEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ChildWorkflowExecutionTerminatedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionterminatedeventattributes.md)

Decodes a ChildWorkflowExecutionTerminatedEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ChildWorkflowExecutionTerminatedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionterminatedeventattributes.md)

ChildWorkflowExecutionTerminatedEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ChildWorkflowExecutionTerminatedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionterminatedeventattributes.md)

Decodes a ChildWorkflowExecutionTerminatedEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ChildWorkflowExecutionTerminatedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionterminatedeventattributes.md)

ChildWorkflowExecutionTerminatedEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IChildWorkflowExecutionTerminatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionterminatedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified ChildWorkflowExecutionTerminatedEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.childworkflowexecutionterminatedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IChildWorkflowExecutionTerminatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionterminatedeventattributes.md) | ChildWorkflowExecutionTerminatedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IChildWorkflowExecutionTerminatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionterminatedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified ChildWorkflowExecutionTerminatedEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.childworkflowexecutionterminatedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IChildWorkflowExecutionTerminatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionterminatedeventattributes.md) | ChildWorkflowExecutionTerminatedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ChildWorkflowExecutionTerminatedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionterminatedeventattributes.md)

Creates a ChildWorkflowExecutionTerminatedEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ChildWorkflowExecutionTerminatedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionterminatedeventattributes.md)

ChildWorkflowExecutionTerminatedEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*ChildWorkflowExecutionTerminatedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionterminatedeventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ChildWorkflowExecutionTerminatedEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ChildWorkflowExecutionTerminatedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionterminatedeventattributes.md) | ChildWorkflowExecutionTerminatedEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ChildWorkflowExecutionTerminatedEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
