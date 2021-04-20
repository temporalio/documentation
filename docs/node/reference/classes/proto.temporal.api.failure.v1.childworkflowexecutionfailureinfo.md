# Class: ChildWorkflowExecutionFailureInfo

[failure](../modules/proto.temporal.api.failure.md).[v1](../modules/proto.temporal.api.failure.v1.md).ChildWorkflowExecutionFailureInfo

Represents a ChildWorkflowExecutionFailureInfo.

## Implements

* [*IChildWorkflowExecutionFailureInfo*](../interfaces/proto.temporal.api.failure.v1.ichildworkflowexecutionfailureinfo.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.failure.v1.childworkflowexecutionfailureinfo.md#constructor)

### Properties

- [initiatedEventId](proto.temporal.api.failure.v1.childworkflowexecutionfailureinfo.md#initiatedeventid)
- [namespace](proto.temporal.api.failure.v1.childworkflowexecutionfailureinfo.md#namespace)
- [retryState](proto.temporal.api.failure.v1.childworkflowexecutionfailureinfo.md#retrystate)
- [startedEventId](proto.temporal.api.failure.v1.childworkflowexecutionfailureinfo.md#startedeventid)
- [workflowExecution](proto.temporal.api.failure.v1.childworkflowexecutionfailureinfo.md#workflowexecution)
- [workflowType](proto.temporal.api.failure.v1.childworkflowexecutionfailureinfo.md#workflowtype)

### Methods

- [toJSON](proto.temporal.api.failure.v1.childworkflowexecutionfailureinfo.md#tojson)
- [create](proto.temporal.api.failure.v1.childworkflowexecutionfailureinfo.md#create)
- [decode](proto.temporal.api.failure.v1.childworkflowexecutionfailureinfo.md#decode)
- [decodeDelimited](proto.temporal.api.failure.v1.childworkflowexecutionfailureinfo.md#decodedelimited)
- [encode](proto.temporal.api.failure.v1.childworkflowexecutionfailureinfo.md#encode)
- [encodeDelimited](proto.temporal.api.failure.v1.childworkflowexecutionfailureinfo.md#encodedelimited)
- [fromObject](proto.temporal.api.failure.v1.childworkflowexecutionfailureinfo.md#fromobject)
- [toObject](proto.temporal.api.failure.v1.childworkflowexecutionfailureinfo.md#toobject)
- [verify](proto.temporal.api.failure.v1.childworkflowexecutionfailureinfo.md#verify)

## Constructors

### constructor

\+ **new ChildWorkflowExecutionFailureInfo**(`properties?`: [*IChildWorkflowExecutionFailureInfo*](../interfaces/proto.temporal.api.failure.v1.ichildworkflowexecutionfailureinfo.md)): [*ChildWorkflowExecutionFailureInfo*](proto.temporal.api.failure.v1.childworkflowexecutionfailureinfo.md)

Constructs a new ChildWorkflowExecutionFailureInfo.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IChildWorkflowExecutionFailureInfo*](../interfaces/proto.temporal.api.failure.v1.ichildworkflowexecutionfailureinfo.md) |

**Returns:** [*ChildWorkflowExecutionFailureInfo*](proto.temporal.api.failure.v1.childworkflowexecutionfailureinfo.md)

## Properties

### initiatedEventId

• **initiatedEventId**: Long

ChildWorkflowExecutionFailureInfo initiatedEventId.

Implementation of: [IChildWorkflowExecutionFailureInfo](../interfaces/proto.temporal.api.failure.v1.ichildworkflowexecutionfailureinfo.md).[initiatedEventId](../interfaces/proto.temporal.api.failure.v1.ichildworkflowexecutionfailureinfo.md#initiatedeventid)

___

### namespace

• **namespace**: *string*

ChildWorkflowExecutionFailureInfo namespace.

Implementation of: [IChildWorkflowExecutionFailureInfo](../interfaces/proto.temporal.api.failure.v1.ichildworkflowexecutionfailureinfo.md).[namespace](../interfaces/proto.temporal.api.failure.v1.ichildworkflowexecutionfailureinfo.md#namespace)

___

### retryState

• **retryState**: [*RetryState*](../enums/proto.temporal.api.enums.v1.retrystate.md)

ChildWorkflowExecutionFailureInfo retryState.

Implementation of: [IChildWorkflowExecutionFailureInfo](../interfaces/proto.temporal.api.failure.v1.ichildworkflowexecutionfailureinfo.md).[retryState](../interfaces/proto.temporal.api.failure.v1.ichildworkflowexecutionfailureinfo.md#retrystate)

___

### startedEventId

• **startedEventId**: Long

ChildWorkflowExecutionFailureInfo startedEventId.

Implementation of: [IChildWorkflowExecutionFailureInfo](../interfaces/proto.temporal.api.failure.v1.ichildworkflowexecutionfailureinfo.md).[startedEventId](../interfaces/proto.temporal.api.failure.v1.ichildworkflowexecutionfailureinfo.md#startedeventid)

___

### workflowExecution

• `Optional` **workflowExecution**: *null* \| [*IWorkflowExecution*](../interfaces/proto.temporal.api.common.v1.iworkflowexecution.md)

ChildWorkflowExecutionFailureInfo workflowExecution.

Implementation of: [IChildWorkflowExecutionFailureInfo](../interfaces/proto.temporal.api.failure.v1.ichildworkflowexecutionfailureinfo.md).[workflowExecution](../interfaces/proto.temporal.api.failure.v1.ichildworkflowexecutionfailureinfo.md#workflowexecution)

___

### workflowType

• `Optional` **workflowType**: *null* \| [*IWorkflowType*](../interfaces/proto.temporal.api.common.v1.iworkflowtype.md)

ChildWorkflowExecutionFailureInfo workflowType.

Implementation of: [IChildWorkflowExecutionFailureInfo](../interfaces/proto.temporal.api.failure.v1.ichildworkflowexecutionfailureinfo.md).[workflowType](../interfaces/proto.temporal.api.failure.v1.ichildworkflowexecutionfailureinfo.md#workflowtype)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ChildWorkflowExecutionFailureInfo to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IChildWorkflowExecutionFailureInfo*](../interfaces/proto.temporal.api.failure.v1.ichildworkflowexecutionfailureinfo.md)): [*ChildWorkflowExecutionFailureInfo*](proto.temporal.api.failure.v1.childworkflowexecutionfailureinfo.md)

Creates a new ChildWorkflowExecutionFailureInfo instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IChildWorkflowExecutionFailureInfo*](../interfaces/proto.temporal.api.failure.v1.ichildworkflowexecutionfailureinfo.md) |

**Returns:** [*ChildWorkflowExecutionFailureInfo*](proto.temporal.api.failure.v1.childworkflowexecutionfailureinfo.md)

ChildWorkflowExecutionFailureInfo instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ChildWorkflowExecutionFailureInfo*](proto.temporal.api.failure.v1.childworkflowexecutionfailureinfo.md)

Decodes a ChildWorkflowExecutionFailureInfo message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ChildWorkflowExecutionFailureInfo*](proto.temporal.api.failure.v1.childworkflowexecutionfailureinfo.md)

ChildWorkflowExecutionFailureInfo

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ChildWorkflowExecutionFailureInfo*](proto.temporal.api.failure.v1.childworkflowexecutionfailureinfo.md)

Decodes a ChildWorkflowExecutionFailureInfo message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ChildWorkflowExecutionFailureInfo*](proto.temporal.api.failure.v1.childworkflowexecutionfailureinfo.md)

ChildWorkflowExecutionFailureInfo

___

### encode

▸ `Static`**encode**(`message`: [*IChildWorkflowExecutionFailureInfo*](../interfaces/proto.temporal.api.failure.v1.ichildworkflowexecutionfailureinfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified ChildWorkflowExecutionFailureInfo message. Does not implicitly [verify](proto.temporal.api.failure.v1.childworkflowexecutionfailureinfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IChildWorkflowExecutionFailureInfo*](../interfaces/proto.temporal.api.failure.v1.ichildworkflowexecutionfailureinfo.md) | ChildWorkflowExecutionFailureInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IChildWorkflowExecutionFailureInfo*](../interfaces/proto.temporal.api.failure.v1.ichildworkflowexecutionfailureinfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified ChildWorkflowExecutionFailureInfo message, length delimited. Does not implicitly [verify](proto.temporal.api.failure.v1.childworkflowexecutionfailureinfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IChildWorkflowExecutionFailureInfo*](../interfaces/proto.temporal.api.failure.v1.ichildworkflowexecutionfailureinfo.md) | ChildWorkflowExecutionFailureInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ChildWorkflowExecutionFailureInfo*](proto.temporal.api.failure.v1.childworkflowexecutionfailureinfo.md)

Creates a ChildWorkflowExecutionFailureInfo message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ChildWorkflowExecutionFailureInfo*](proto.temporal.api.failure.v1.childworkflowexecutionfailureinfo.md)

ChildWorkflowExecutionFailureInfo

___

### toObject

▸ `Static`**toObject**(`message`: [*ChildWorkflowExecutionFailureInfo*](proto.temporal.api.failure.v1.childworkflowexecutionfailureinfo.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ChildWorkflowExecutionFailureInfo message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ChildWorkflowExecutionFailureInfo*](proto.temporal.api.failure.v1.childworkflowexecutionfailureinfo.md) | ChildWorkflowExecutionFailureInfo   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ChildWorkflowExecutionFailureInfo message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
