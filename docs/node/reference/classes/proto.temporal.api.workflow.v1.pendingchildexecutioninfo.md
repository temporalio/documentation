# Class: PendingChildExecutionInfo

[workflow](../modules/proto.temporal.api.workflow.md).[v1](../modules/proto.temporal.api.workflow.v1.md).PendingChildExecutionInfo

Represents a PendingChildExecutionInfo.

## Implements

* [*IPendingChildExecutionInfo*](../interfaces/proto.temporal.api.workflow.v1.ipendingchildexecutioninfo.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflow.v1.pendingchildexecutioninfo.md#constructor)

### Properties

- [initiatedId](proto.temporal.api.workflow.v1.pendingchildexecutioninfo.md#initiatedid)
- [parentClosePolicy](proto.temporal.api.workflow.v1.pendingchildexecutioninfo.md#parentclosepolicy)
- [runId](proto.temporal.api.workflow.v1.pendingchildexecutioninfo.md#runid)
- [workflowId](proto.temporal.api.workflow.v1.pendingchildexecutioninfo.md#workflowid)
- [workflowTypeName](proto.temporal.api.workflow.v1.pendingchildexecutioninfo.md#workflowtypename)

### Methods

- [toJSON](proto.temporal.api.workflow.v1.pendingchildexecutioninfo.md#tojson)
- [create](proto.temporal.api.workflow.v1.pendingchildexecutioninfo.md#create)
- [decode](proto.temporal.api.workflow.v1.pendingchildexecutioninfo.md#decode)
- [decodeDelimited](proto.temporal.api.workflow.v1.pendingchildexecutioninfo.md#decodedelimited)
- [encode](proto.temporal.api.workflow.v1.pendingchildexecutioninfo.md#encode)
- [encodeDelimited](proto.temporal.api.workflow.v1.pendingchildexecutioninfo.md#encodedelimited)
- [fromObject](proto.temporal.api.workflow.v1.pendingchildexecutioninfo.md#fromobject)
- [toObject](proto.temporal.api.workflow.v1.pendingchildexecutioninfo.md#toobject)
- [verify](proto.temporal.api.workflow.v1.pendingchildexecutioninfo.md#verify)

## Constructors

### constructor

\+ **new PendingChildExecutionInfo**(`properties?`: [*IPendingChildExecutionInfo*](../interfaces/proto.temporal.api.workflow.v1.ipendingchildexecutioninfo.md)): [*PendingChildExecutionInfo*](proto.temporal.api.workflow.v1.pendingchildexecutioninfo.md)

Constructs a new PendingChildExecutionInfo.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IPendingChildExecutionInfo*](../interfaces/proto.temporal.api.workflow.v1.ipendingchildexecutioninfo.md) |

**Returns:** [*PendingChildExecutionInfo*](proto.temporal.api.workflow.v1.pendingchildexecutioninfo.md)

## Properties

### initiatedId

• **initiatedId**: Long

PendingChildExecutionInfo initiatedId.

Implementation of: [IPendingChildExecutionInfo](../interfaces/proto.temporal.api.workflow.v1.ipendingchildexecutioninfo.md).[initiatedId](../interfaces/proto.temporal.api.workflow.v1.ipendingchildexecutioninfo.md#initiatedid)

___

### parentClosePolicy

• **parentClosePolicy**: [*ParentClosePolicy*](../enums/proto.temporal.api.enums.v1.parentclosepolicy.md)

PendingChildExecutionInfo parentClosePolicy.

Implementation of: [IPendingChildExecutionInfo](../interfaces/proto.temporal.api.workflow.v1.ipendingchildexecutioninfo.md).[parentClosePolicy](../interfaces/proto.temporal.api.workflow.v1.ipendingchildexecutioninfo.md#parentclosepolicy)

___

### runId

• **runId**: *string*

PendingChildExecutionInfo runId.

Implementation of: [IPendingChildExecutionInfo](../interfaces/proto.temporal.api.workflow.v1.ipendingchildexecutioninfo.md).[runId](../interfaces/proto.temporal.api.workflow.v1.ipendingchildexecutioninfo.md#runid)

___

### workflowId

• **workflowId**: *string*

PendingChildExecutionInfo workflowId.

Implementation of: [IPendingChildExecutionInfo](../interfaces/proto.temporal.api.workflow.v1.ipendingchildexecutioninfo.md).[workflowId](../interfaces/proto.temporal.api.workflow.v1.ipendingchildexecutioninfo.md#workflowid)

___

### workflowTypeName

• **workflowTypeName**: *string*

PendingChildExecutionInfo workflowTypeName.

Implementation of: [IPendingChildExecutionInfo](../interfaces/proto.temporal.api.workflow.v1.ipendingchildexecutioninfo.md).[workflowTypeName](../interfaces/proto.temporal.api.workflow.v1.ipendingchildexecutioninfo.md#workflowtypename)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this PendingChildExecutionInfo to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IPendingChildExecutionInfo*](../interfaces/proto.temporal.api.workflow.v1.ipendingchildexecutioninfo.md)): [*PendingChildExecutionInfo*](proto.temporal.api.workflow.v1.pendingchildexecutioninfo.md)

Creates a new PendingChildExecutionInfo instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IPendingChildExecutionInfo*](../interfaces/proto.temporal.api.workflow.v1.ipendingchildexecutioninfo.md) |

**Returns:** [*PendingChildExecutionInfo*](proto.temporal.api.workflow.v1.pendingchildexecutioninfo.md)

PendingChildExecutionInfo instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*PendingChildExecutionInfo*](proto.temporal.api.workflow.v1.pendingchildexecutioninfo.md)

Decodes a PendingChildExecutionInfo message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*PendingChildExecutionInfo*](proto.temporal.api.workflow.v1.pendingchildexecutioninfo.md)

PendingChildExecutionInfo

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*PendingChildExecutionInfo*](proto.temporal.api.workflow.v1.pendingchildexecutioninfo.md)

Decodes a PendingChildExecutionInfo message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*PendingChildExecutionInfo*](proto.temporal.api.workflow.v1.pendingchildexecutioninfo.md)

PendingChildExecutionInfo

___

### encode

▸ `Static`**encode**(`message`: [*IPendingChildExecutionInfo*](../interfaces/proto.temporal.api.workflow.v1.ipendingchildexecutioninfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified PendingChildExecutionInfo message. Does not implicitly [verify](proto.temporal.api.workflow.v1.pendingchildexecutioninfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IPendingChildExecutionInfo*](../interfaces/proto.temporal.api.workflow.v1.ipendingchildexecutioninfo.md) | PendingChildExecutionInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IPendingChildExecutionInfo*](../interfaces/proto.temporal.api.workflow.v1.ipendingchildexecutioninfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified PendingChildExecutionInfo message, length delimited. Does not implicitly [verify](proto.temporal.api.workflow.v1.pendingchildexecutioninfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IPendingChildExecutionInfo*](../interfaces/proto.temporal.api.workflow.v1.ipendingchildexecutioninfo.md) | PendingChildExecutionInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*PendingChildExecutionInfo*](proto.temporal.api.workflow.v1.pendingchildexecutioninfo.md)

Creates a PendingChildExecutionInfo message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*PendingChildExecutionInfo*](proto.temporal.api.workflow.v1.pendingchildexecutioninfo.md)

PendingChildExecutionInfo

___

### toObject

▸ `Static`**toObject**(`message`: [*PendingChildExecutionInfo*](proto.temporal.api.workflow.v1.pendingchildexecutioninfo.md), `options?`: IConversionOptions): *object*

Creates a plain object from a PendingChildExecutionInfo message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*PendingChildExecutionInfo*](proto.temporal.api.workflow.v1.pendingchildexecutioninfo.md) | PendingChildExecutionInfo   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a PendingChildExecutionInfo message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
