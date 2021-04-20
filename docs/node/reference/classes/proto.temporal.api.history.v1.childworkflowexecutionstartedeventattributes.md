# Class: ChildWorkflowExecutionStartedEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).ChildWorkflowExecutionStartedEventAttributes

Represents a ChildWorkflowExecutionStartedEventAttributes.

## Implements

* [*IChildWorkflowExecutionStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionstartedeventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.childworkflowexecutionstartedeventattributes.md#constructor)

### Properties

- [header](proto.temporal.api.history.v1.childworkflowexecutionstartedeventattributes.md#header)
- [initiatedEventId](proto.temporal.api.history.v1.childworkflowexecutionstartedeventattributes.md#initiatedeventid)
- [namespace](proto.temporal.api.history.v1.childworkflowexecutionstartedeventattributes.md#namespace)
- [workflowExecution](proto.temporal.api.history.v1.childworkflowexecutionstartedeventattributes.md#workflowexecution)
- [workflowType](proto.temporal.api.history.v1.childworkflowexecutionstartedeventattributes.md#workflowtype)

### Methods

- [toJSON](proto.temporal.api.history.v1.childworkflowexecutionstartedeventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.childworkflowexecutionstartedeventattributes.md#create)
- [decode](proto.temporal.api.history.v1.childworkflowexecutionstartedeventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.childworkflowexecutionstartedeventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.childworkflowexecutionstartedeventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.childworkflowexecutionstartedeventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.childworkflowexecutionstartedeventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.childworkflowexecutionstartedeventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.childworkflowexecutionstartedeventattributes.md#verify)

## Constructors

### constructor

\+ **new ChildWorkflowExecutionStartedEventAttributes**(`properties?`: [*IChildWorkflowExecutionStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionstartedeventattributes.md)): [*ChildWorkflowExecutionStartedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionstartedeventattributes.md)

Constructs a new ChildWorkflowExecutionStartedEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IChildWorkflowExecutionStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionstartedeventattributes.md) |

**Returns:** [*ChildWorkflowExecutionStartedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionstartedeventattributes.md)

## Properties

### header

• `Optional` **header**: *null* \| [*IHeader*](../interfaces/proto.temporal.api.common.v1.iheader.md)

ChildWorkflowExecutionStartedEventAttributes header.

Implementation of: [IChildWorkflowExecutionStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionstartedeventattributes.md).[header](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionstartedeventattributes.md#header)

___

### initiatedEventId

• **initiatedEventId**: Long

ChildWorkflowExecutionStartedEventAttributes initiatedEventId.

Implementation of: [IChildWorkflowExecutionStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionstartedeventattributes.md).[initiatedEventId](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionstartedeventattributes.md#initiatedeventid)

___

### namespace

• **namespace**: *string*

ChildWorkflowExecutionStartedEventAttributes namespace.

Implementation of: [IChildWorkflowExecutionStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionstartedeventattributes.md).[namespace](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionstartedeventattributes.md#namespace)

___

### workflowExecution

• `Optional` **workflowExecution**: *null* \| [*IWorkflowExecution*](../interfaces/proto.temporal.api.common.v1.iworkflowexecution.md)

ChildWorkflowExecutionStartedEventAttributes workflowExecution.

Implementation of: [IChildWorkflowExecutionStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionstartedeventattributes.md).[workflowExecution](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionstartedeventattributes.md#workflowexecution)

___

### workflowType

• `Optional` **workflowType**: *null* \| [*IWorkflowType*](../interfaces/proto.temporal.api.common.v1.iworkflowtype.md)

ChildWorkflowExecutionStartedEventAttributes workflowType.

Implementation of: [IChildWorkflowExecutionStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionstartedeventattributes.md).[workflowType](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionstartedeventattributes.md#workflowtype)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ChildWorkflowExecutionStartedEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IChildWorkflowExecutionStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionstartedeventattributes.md)): [*ChildWorkflowExecutionStartedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionstartedeventattributes.md)

Creates a new ChildWorkflowExecutionStartedEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IChildWorkflowExecutionStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionstartedeventattributes.md) |

**Returns:** [*ChildWorkflowExecutionStartedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionstartedeventattributes.md)

ChildWorkflowExecutionStartedEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ChildWorkflowExecutionStartedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionstartedeventattributes.md)

Decodes a ChildWorkflowExecutionStartedEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ChildWorkflowExecutionStartedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionstartedeventattributes.md)

ChildWorkflowExecutionStartedEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ChildWorkflowExecutionStartedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionstartedeventattributes.md)

Decodes a ChildWorkflowExecutionStartedEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ChildWorkflowExecutionStartedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionstartedeventattributes.md)

ChildWorkflowExecutionStartedEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IChildWorkflowExecutionStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionstartedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified ChildWorkflowExecutionStartedEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.childworkflowexecutionstartedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IChildWorkflowExecutionStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionstartedeventattributes.md) | ChildWorkflowExecutionStartedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IChildWorkflowExecutionStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionstartedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified ChildWorkflowExecutionStartedEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.childworkflowexecutionstartedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IChildWorkflowExecutionStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionstartedeventattributes.md) | ChildWorkflowExecutionStartedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ChildWorkflowExecutionStartedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionstartedeventattributes.md)

Creates a ChildWorkflowExecutionStartedEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ChildWorkflowExecutionStartedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionstartedeventattributes.md)

ChildWorkflowExecutionStartedEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*ChildWorkflowExecutionStartedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionstartedeventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ChildWorkflowExecutionStartedEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ChildWorkflowExecutionStartedEventAttributes*](proto.temporal.api.history.v1.childworkflowexecutionstartedeventattributes.md) | ChildWorkflowExecutionStartedEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ChildWorkflowExecutionStartedEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
