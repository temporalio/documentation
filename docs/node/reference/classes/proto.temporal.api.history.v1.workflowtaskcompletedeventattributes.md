# Class: WorkflowTaskCompletedEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).WorkflowTaskCompletedEventAttributes

Represents a WorkflowTaskCompletedEventAttributes.

## Implements

* [*IWorkflowTaskCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskcompletedeventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.workflowtaskcompletedeventattributes.md#constructor)

### Properties

- [binaryChecksum](proto.temporal.api.history.v1.workflowtaskcompletedeventattributes.md#binarychecksum)
- [identity](proto.temporal.api.history.v1.workflowtaskcompletedeventattributes.md#identity)
- [scheduledEventId](proto.temporal.api.history.v1.workflowtaskcompletedeventattributes.md#scheduledeventid)
- [startedEventId](proto.temporal.api.history.v1.workflowtaskcompletedeventattributes.md#startedeventid)

### Methods

- [toJSON](proto.temporal.api.history.v1.workflowtaskcompletedeventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.workflowtaskcompletedeventattributes.md#create)
- [decode](proto.temporal.api.history.v1.workflowtaskcompletedeventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.workflowtaskcompletedeventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.workflowtaskcompletedeventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.workflowtaskcompletedeventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.workflowtaskcompletedeventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.workflowtaskcompletedeventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.workflowtaskcompletedeventattributes.md#verify)

## Constructors

### constructor

\+ **new WorkflowTaskCompletedEventAttributes**(`properties?`: [*IWorkflowTaskCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskcompletedeventattributes.md)): [*WorkflowTaskCompletedEventAttributes*](proto.temporal.api.history.v1.workflowtaskcompletedeventattributes.md)

Constructs a new WorkflowTaskCompletedEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowTaskCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskcompletedeventattributes.md) |

**Returns:** [*WorkflowTaskCompletedEventAttributes*](proto.temporal.api.history.v1.workflowtaskcompletedeventattributes.md)

## Properties

### binaryChecksum

• **binaryChecksum**: *string*

WorkflowTaskCompletedEventAttributes binaryChecksum.

Implementation of: [IWorkflowTaskCompletedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowtaskcompletedeventattributes.md).[binaryChecksum](../interfaces/proto.temporal.api.history.v1.iworkflowtaskcompletedeventattributes.md#binarychecksum)

___

### identity

• **identity**: *string*

WorkflowTaskCompletedEventAttributes identity.

Implementation of: [IWorkflowTaskCompletedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowtaskcompletedeventattributes.md).[identity](../interfaces/proto.temporal.api.history.v1.iworkflowtaskcompletedeventattributes.md#identity)

___

### scheduledEventId

• **scheduledEventId**: Long

WorkflowTaskCompletedEventAttributes scheduledEventId.

Implementation of: [IWorkflowTaskCompletedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowtaskcompletedeventattributes.md).[scheduledEventId](../interfaces/proto.temporal.api.history.v1.iworkflowtaskcompletedeventattributes.md#scheduledeventid)

___

### startedEventId

• **startedEventId**: Long

WorkflowTaskCompletedEventAttributes startedEventId.

Implementation of: [IWorkflowTaskCompletedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowtaskcompletedeventattributes.md).[startedEventId](../interfaces/proto.temporal.api.history.v1.iworkflowtaskcompletedeventattributes.md#startedeventid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this WorkflowTaskCompletedEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IWorkflowTaskCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskcompletedeventattributes.md)): [*WorkflowTaskCompletedEventAttributes*](proto.temporal.api.history.v1.workflowtaskcompletedeventattributes.md)

Creates a new WorkflowTaskCompletedEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowTaskCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskcompletedeventattributes.md) |

**Returns:** [*WorkflowTaskCompletedEventAttributes*](proto.temporal.api.history.v1.workflowtaskcompletedeventattributes.md)

WorkflowTaskCompletedEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*WorkflowTaskCompletedEventAttributes*](proto.temporal.api.history.v1.workflowtaskcompletedeventattributes.md)

Decodes a WorkflowTaskCompletedEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*WorkflowTaskCompletedEventAttributes*](proto.temporal.api.history.v1.workflowtaskcompletedeventattributes.md)

WorkflowTaskCompletedEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*WorkflowTaskCompletedEventAttributes*](proto.temporal.api.history.v1.workflowtaskcompletedeventattributes.md)

Decodes a WorkflowTaskCompletedEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*WorkflowTaskCompletedEventAttributes*](proto.temporal.api.history.v1.workflowtaskcompletedeventattributes.md)

WorkflowTaskCompletedEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IWorkflowTaskCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskcompletedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowTaskCompletedEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.workflowtaskcompletedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowTaskCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskcompletedeventattributes.md) | WorkflowTaskCompletedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IWorkflowTaskCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskcompletedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowTaskCompletedEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.workflowtaskcompletedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowTaskCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskcompletedeventattributes.md) | WorkflowTaskCompletedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*WorkflowTaskCompletedEventAttributes*](proto.temporal.api.history.v1.workflowtaskcompletedeventattributes.md)

Creates a WorkflowTaskCompletedEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*WorkflowTaskCompletedEventAttributes*](proto.temporal.api.history.v1.workflowtaskcompletedeventattributes.md)

WorkflowTaskCompletedEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*WorkflowTaskCompletedEventAttributes*](proto.temporal.api.history.v1.workflowtaskcompletedeventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a WorkflowTaskCompletedEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*WorkflowTaskCompletedEventAttributes*](proto.temporal.api.history.v1.workflowtaskcompletedeventattributes.md) | WorkflowTaskCompletedEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a WorkflowTaskCompletedEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
