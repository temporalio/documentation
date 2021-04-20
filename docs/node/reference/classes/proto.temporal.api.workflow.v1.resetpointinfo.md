# Class: ResetPointInfo

[workflow](../modules/proto.temporal.api.workflow.md).[v1](../modules/proto.temporal.api.workflow.v1.md).ResetPointInfo

Represents a ResetPointInfo.

## Implements

* [*IResetPointInfo*](../interfaces/proto.temporal.api.workflow.v1.iresetpointinfo.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflow.v1.resetpointinfo.md#constructor)

### Properties

- [binaryChecksum](proto.temporal.api.workflow.v1.resetpointinfo.md#binarychecksum)
- [createTime](proto.temporal.api.workflow.v1.resetpointinfo.md#createtime)
- [expireTime](proto.temporal.api.workflow.v1.resetpointinfo.md#expiretime)
- [firstWorkflowTaskCompletedId](proto.temporal.api.workflow.v1.resetpointinfo.md#firstworkflowtaskcompletedid)
- [resettable](proto.temporal.api.workflow.v1.resetpointinfo.md#resettable)
- [runId](proto.temporal.api.workflow.v1.resetpointinfo.md#runid)

### Methods

- [toJSON](proto.temporal.api.workflow.v1.resetpointinfo.md#tojson)
- [create](proto.temporal.api.workflow.v1.resetpointinfo.md#create)
- [decode](proto.temporal.api.workflow.v1.resetpointinfo.md#decode)
- [decodeDelimited](proto.temporal.api.workflow.v1.resetpointinfo.md#decodedelimited)
- [encode](proto.temporal.api.workflow.v1.resetpointinfo.md#encode)
- [encodeDelimited](proto.temporal.api.workflow.v1.resetpointinfo.md#encodedelimited)
- [fromObject](proto.temporal.api.workflow.v1.resetpointinfo.md#fromobject)
- [toObject](proto.temporal.api.workflow.v1.resetpointinfo.md#toobject)
- [verify](proto.temporal.api.workflow.v1.resetpointinfo.md#verify)

## Constructors

### constructor

\+ **new ResetPointInfo**(`properties?`: [*IResetPointInfo*](../interfaces/proto.temporal.api.workflow.v1.iresetpointinfo.md)): [*ResetPointInfo*](proto.temporal.api.workflow.v1.resetpointinfo.md)

Constructs a new ResetPointInfo.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IResetPointInfo*](../interfaces/proto.temporal.api.workflow.v1.iresetpointinfo.md) |

**Returns:** [*ResetPointInfo*](proto.temporal.api.workflow.v1.resetpointinfo.md)

## Properties

### binaryChecksum

• **binaryChecksum**: *string*

ResetPointInfo binaryChecksum.

Implementation of: [IResetPointInfo](../interfaces/proto.temporal.api.workflow.v1.iresetpointinfo.md).[binaryChecksum](../interfaces/proto.temporal.api.workflow.v1.iresetpointinfo.md#binarychecksum)

___

### createTime

• `Optional` **createTime**: *null* \| [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md)

ResetPointInfo createTime.

Implementation of: [IResetPointInfo](../interfaces/proto.temporal.api.workflow.v1.iresetpointinfo.md).[createTime](../interfaces/proto.temporal.api.workflow.v1.iresetpointinfo.md#createtime)

___

### expireTime

• `Optional` **expireTime**: *null* \| [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md)

ResetPointInfo expireTime.

Implementation of: [IResetPointInfo](../interfaces/proto.temporal.api.workflow.v1.iresetpointinfo.md).[expireTime](../interfaces/proto.temporal.api.workflow.v1.iresetpointinfo.md#expiretime)

___

### firstWorkflowTaskCompletedId

• **firstWorkflowTaskCompletedId**: Long

ResetPointInfo firstWorkflowTaskCompletedId.

Implementation of: [IResetPointInfo](../interfaces/proto.temporal.api.workflow.v1.iresetpointinfo.md).[firstWorkflowTaskCompletedId](../interfaces/proto.temporal.api.workflow.v1.iresetpointinfo.md#firstworkflowtaskcompletedid)

___

### resettable

• **resettable**: *boolean*

ResetPointInfo resettable.

Implementation of: [IResetPointInfo](../interfaces/proto.temporal.api.workflow.v1.iresetpointinfo.md).[resettable](../interfaces/proto.temporal.api.workflow.v1.iresetpointinfo.md#resettable)

___

### runId

• **runId**: *string*

ResetPointInfo runId.

Implementation of: [IResetPointInfo](../interfaces/proto.temporal.api.workflow.v1.iresetpointinfo.md).[runId](../interfaces/proto.temporal.api.workflow.v1.iresetpointinfo.md#runid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ResetPointInfo to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IResetPointInfo*](../interfaces/proto.temporal.api.workflow.v1.iresetpointinfo.md)): [*ResetPointInfo*](proto.temporal.api.workflow.v1.resetpointinfo.md)

Creates a new ResetPointInfo instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IResetPointInfo*](../interfaces/proto.temporal.api.workflow.v1.iresetpointinfo.md) |

**Returns:** [*ResetPointInfo*](proto.temporal.api.workflow.v1.resetpointinfo.md)

ResetPointInfo instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ResetPointInfo*](proto.temporal.api.workflow.v1.resetpointinfo.md)

Decodes a ResetPointInfo message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ResetPointInfo*](proto.temporal.api.workflow.v1.resetpointinfo.md)

ResetPointInfo

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ResetPointInfo*](proto.temporal.api.workflow.v1.resetpointinfo.md)

Decodes a ResetPointInfo message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ResetPointInfo*](proto.temporal.api.workflow.v1.resetpointinfo.md)

ResetPointInfo

___

### encode

▸ `Static`**encode**(`message`: [*IResetPointInfo*](../interfaces/proto.temporal.api.workflow.v1.iresetpointinfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified ResetPointInfo message. Does not implicitly [verify](proto.temporal.api.workflow.v1.resetpointinfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IResetPointInfo*](../interfaces/proto.temporal.api.workflow.v1.iresetpointinfo.md) | ResetPointInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IResetPointInfo*](../interfaces/proto.temporal.api.workflow.v1.iresetpointinfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified ResetPointInfo message, length delimited. Does not implicitly [verify](proto.temporal.api.workflow.v1.resetpointinfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IResetPointInfo*](../interfaces/proto.temporal.api.workflow.v1.iresetpointinfo.md) | ResetPointInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ResetPointInfo*](proto.temporal.api.workflow.v1.resetpointinfo.md)

Creates a ResetPointInfo message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ResetPointInfo*](proto.temporal.api.workflow.v1.resetpointinfo.md)

ResetPointInfo

___

### toObject

▸ `Static`**toObject**(`message`: [*ResetPointInfo*](proto.temporal.api.workflow.v1.resetpointinfo.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ResetPointInfo message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ResetPointInfo*](proto.temporal.api.workflow.v1.resetpointinfo.md) | ResetPointInfo   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ResetPointInfo message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
