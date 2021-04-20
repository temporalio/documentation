# Class: WorkflowTaskStartedEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).WorkflowTaskStartedEventAttributes

Represents a WorkflowTaskStartedEventAttributes.

## Implements

* [*IWorkflowTaskStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskstartedeventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.workflowtaskstartedeventattributes.md#constructor)

### Properties

- [identity](proto.temporal.api.history.v1.workflowtaskstartedeventattributes.md#identity)
- [requestId](proto.temporal.api.history.v1.workflowtaskstartedeventattributes.md#requestid)
- [scheduledEventId](proto.temporal.api.history.v1.workflowtaskstartedeventattributes.md#scheduledeventid)

### Methods

- [toJSON](proto.temporal.api.history.v1.workflowtaskstartedeventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.workflowtaskstartedeventattributes.md#create)
- [decode](proto.temporal.api.history.v1.workflowtaskstartedeventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.workflowtaskstartedeventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.workflowtaskstartedeventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.workflowtaskstartedeventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.workflowtaskstartedeventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.workflowtaskstartedeventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.workflowtaskstartedeventattributes.md#verify)

## Constructors

### constructor

\+ **new WorkflowTaskStartedEventAttributes**(`properties?`: [*IWorkflowTaskStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskstartedeventattributes.md)): [*WorkflowTaskStartedEventAttributes*](proto.temporal.api.history.v1.workflowtaskstartedeventattributes.md)

Constructs a new WorkflowTaskStartedEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowTaskStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskstartedeventattributes.md) |

**Returns:** [*WorkflowTaskStartedEventAttributes*](proto.temporal.api.history.v1.workflowtaskstartedeventattributes.md)

## Properties

### identity

• **identity**: *string*

WorkflowTaskStartedEventAttributes identity.

Implementation of: [IWorkflowTaskStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowtaskstartedeventattributes.md).[identity](../interfaces/proto.temporal.api.history.v1.iworkflowtaskstartedeventattributes.md#identity)

___

### requestId

• **requestId**: *string*

WorkflowTaskStartedEventAttributes requestId.

Implementation of: [IWorkflowTaskStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowtaskstartedeventattributes.md).[requestId](../interfaces/proto.temporal.api.history.v1.iworkflowtaskstartedeventattributes.md#requestid)

___

### scheduledEventId

• **scheduledEventId**: Long

WorkflowTaskStartedEventAttributes scheduledEventId.

Implementation of: [IWorkflowTaskStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowtaskstartedeventattributes.md).[scheduledEventId](../interfaces/proto.temporal.api.history.v1.iworkflowtaskstartedeventattributes.md#scheduledeventid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this WorkflowTaskStartedEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IWorkflowTaskStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskstartedeventattributes.md)): [*WorkflowTaskStartedEventAttributes*](proto.temporal.api.history.v1.workflowtaskstartedeventattributes.md)

Creates a new WorkflowTaskStartedEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowTaskStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskstartedeventattributes.md) |

**Returns:** [*WorkflowTaskStartedEventAttributes*](proto.temporal.api.history.v1.workflowtaskstartedeventattributes.md)

WorkflowTaskStartedEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*WorkflowTaskStartedEventAttributes*](proto.temporal.api.history.v1.workflowtaskstartedeventattributes.md)

Decodes a WorkflowTaskStartedEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*WorkflowTaskStartedEventAttributes*](proto.temporal.api.history.v1.workflowtaskstartedeventattributes.md)

WorkflowTaskStartedEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*WorkflowTaskStartedEventAttributes*](proto.temporal.api.history.v1.workflowtaskstartedeventattributes.md)

Decodes a WorkflowTaskStartedEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*WorkflowTaskStartedEventAttributes*](proto.temporal.api.history.v1.workflowtaskstartedeventattributes.md)

WorkflowTaskStartedEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IWorkflowTaskStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskstartedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowTaskStartedEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.workflowtaskstartedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowTaskStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskstartedeventattributes.md) | WorkflowTaskStartedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IWorkflowTaskStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskstartedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowTaskStartedEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.workflowtaskstartedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowTaskStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskstartedeventattributes.md) | WorkflowTaskStartedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*WorkflowTaskStartedEventAttributes*](proto.temporal.api.history.v1.workflowtaskstartedeventattributes.md)

Creates a WorkflowTaskStartedEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*WorkflowTaskStartedEventAttributes*](proto.temporal.api.history.v1.workflowtaskstartedeventattributes.md)

WorkflowTaskStartedEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*WorkflowTaskStartedEventAttributes*](proto.temporal.api.history.v1.workflowtaskstartedeventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a WorkflowTaskStartedEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*WorkflowTaskStartedEventAttributes*](proto.temporal.api.history.v1.workflowtaskstartedeventattributes.md) | WorkflowTaskStartedEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a WorkflowTaskStartedEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
