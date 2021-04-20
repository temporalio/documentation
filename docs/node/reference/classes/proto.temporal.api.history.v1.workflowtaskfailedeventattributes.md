# Class: WorkflowTaskFailedEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).WorkflowTaskFailedEventAttributes

Represents a WorkflowTaskFailedEventAttributes.

## Implements

* [*IWorkflowTaskFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.workflowtaskfailedeventattributes.md#constructor)

### Properties

- [baseRunId](proto.temporal.api.history.v1.workflowtaskfailedeventattributes.md#baserunid)
- [binaryChecksum](proto.temporal.api.history.v1.workflowtaskfailedeventattributes.md#binarychecksum)
- [cause](proto.temporal.api.history.v1.workflowtaskfailedeventattributes.md#cause)
- [failure](proto.temporal.api.history.v1.workflowtaskfailedeventattributes.md#failure)
- [forkEventVersion](proto.temporal.api.history.v1.workflowtaskfailedeventattributes.md#forkeventversion)
- [identity](proto.temporal.api.history.v1.workflowtaskfailedeventattributes.md#identity)
- [newRunId](proto.temporal.api.history.v1.workflowtaskfailedeventattributes.md#newrunid)
- [scheduledEventId](proto.temporal.api.history.v1.workflowtaskfailedeventattributes.md#scheduledeventid)
- [startedEventId](proto.temporal.api.history.v1.workflowtaskfailedeventattributes.md#startedeventid)

### Methods

- [toJSON](proto.temporal.api.history.v1.workflowtaskfailedeventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.workflowtaskfailedeventattributes.md#create)
- [decode](proto.temporal.api.history.v1.workflowtaskfailedeventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.workflowtaskfailedeventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.workflowtaskfailedeventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.workflowtaskfailedeventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.workflowtaskfailedeventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.workflowtaskfailedeventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.workflowtaskfailedeventattributes.md#verify)

## Constructors

### constructor

\+ **new WorkflowTaskFailedEventAttributes**(`properties?`: [*IWorkflowTaskFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md)): [*WorkflowTaskFailedEventAttributes*](proto.temporal.api.history.v1.workflowtaskfailedeventattributes.md)

Constructs a new WorkflowTaskFailedEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowTaskFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md) |

**Returns:** [*WorkflowTaskFailedEventAttributes*](proto.temporal.api.history.v1.workflowtaskfailedeventattributes.md)

## Properties

### baseRunId

• **baseRunId**: *string*

WorkflowTaskFailedEventAttributes baseRunId.

Implementation of: [IWorkflowTaskFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md).[baseRunId](../interfaces/proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md#baserunid)

___

### binaryChecksum

• **binaryChecksum**: *string*

WorkflowTaskFailedEventAttributes binaryChecksum.

Implementation of: [IWorkflowTaskFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md).[binaryChecksum](../interfaces/proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md#binarychecksum)

___

### cause

• **cause**: [*WorkflowTaskFailedCause*](../enums/proto.temporal.api.enums.v1.workflowtaskfailedcause.md)

WorkflowTaskFailedEventAttributes cause.

Implementation of: [IWorkflowTaskFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md).[cause](../interfaces/proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md#cause)

___

### failure

• `Optional` **failure**: *null* \| [*IFailure*](../interfaces/proto.temporal.api.failure.v1.ifailure.md)

WorkflowTaskFailedEventAttributes failure.

Implementation of: [IWorkflowTaskFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md).[failure](../interfaces/proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md#failure)

___

### forkEventVersion

• **forkEventVersion**: Long

WorkflowTaskFailedEventAttributes forkEventVersion.

Implementation of: [IWorkflowTaskFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md).[forkEventVersion](../interfaces/proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md#forkeventversion)

___

### identity

• **identity**: *string*

WorkflowTaskFailedEventAttributes identity.

Implementation of: [IWorkflowTaskFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md).[identity](../interfaces/proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md#identity)

___

### newRunId

• **newRunId**: *string*

WorkflowTaskFailedEventAttributes newRunId.

Implementation of: [IWorkflowTaskFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md).[newRunId](../interfaces/proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md#newrunid)

___

### scheduledEventId

• **scheduledEventId**: Long

WorkflowTaskFailedEventAttributes scheduledEventId.

Implementation of: [IWorkflowTaskFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md).[scheduledEventId](../interfaces/proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md#scheduledeventid)

___

### startedEventId

• **startedEventId**: Long

WorkflowTaskFailedEventAttributes startedEventId.

Implementation of: [IWorkflowTaskFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md).[startedEventId](../interfaces/proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md#startedeventid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this WorkflowTaskFailedEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IWorkflowTaskFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md)): [*WorkflowTaskFailedEventAttributes*](proto.temporal.api.history.v1.workflowtaskfailedeventattributes.md)

Creates a new WorkflowTaskFailedEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowTaskFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md) |

**Returns:** [*WorkflowTaskFailedEventAttributes*](proto.temporal.api.history.v1.workflowtaskfailedeventattributes.md)

WorkflowTaskFailedEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*WorkflowTaskFailedEventAttributes*](proto.temporal.api.history.v1.workflowtaskfailedeventattributes.md)

Decodes a WorkflowTaskFailedEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*WorkflowTaskFailedEventAttributes*](proto.temporal.api.history.v1.workflowtaskfailedeventattributes.md)

WorkflowTaskFailedEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*WorkflowTaskFailedEventAttributes*](proto.temporal.api.history.v1.workflowtaskfailedeventattributes.md)

Decodes a WorkflowTaskFailedEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*WorkflowTaskFailedEventAttributes*](proto.temporal.api.history.v1.workflowtaskfailedeventattributes.md)

WorkflowTaskFailedEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IWorkflowTaskFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowTaskFailedEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.workflowtaskfailedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowTaskFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md) | WorkflowTaskFailedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IWorkflowTaskFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowTaskFailedEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.workflowtaskfailedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowTaskFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md) | WorkflowTaskFailedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*WorkflowTaskFailedEventAttributes*](proto.temporal.api.history.v1.workflowtaskfailedeventattributes.md)

Creates a WorkflowTaskFailedEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*WorkflowTaskFailedEventAttributes*](proto.temporal.api.history.v1.workflowtaskfailedeventattributes.md)

WorkflowTaskFailedEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*WorkflowTaskFailedEventAttributes*](proto.temporal.api.history.v1.workflowtaskfailedeventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a WorkflowTaskFailedEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*WorkflowTaskFailedEventAttributes*](proto.temporal.api.history.v1.workflowtaskfailedeventattributes.md) | WorkflowTaskFailedEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a WorkflowTaskFailedEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
