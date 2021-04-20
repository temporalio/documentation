# Class: ResetWorkflowFailureInfo

[failure](../modules/proto.temporal.api.failure.md).[v1](../modules/proto.temporal.api.failure.v1.md).ResetWorkflowFailureInfo

Represents a ResetWorkflowFailureInfo.

## Implements

* [*IResetWorkflowFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iresetworkflowfailureinfo.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.failure.v1.resetworkflowfailureinfo.md#constructor)

### Properties

- [lastHeartbeatDetails](proto.temporal.api.failure.v1.resetworkflowfailureinfo.md#lastheartbeatdetails)

### Methods

- [toJSON](proto.temporal.api.failure.v1.resetworkflowfailureinfo.md#tojson)
- [create](proto.temporal.api.failure.v1.resetworkflowfailureinfo.md#create)
- [decode](proto.temporal.api.failure.v1.resetworkflowfailureinfo.md#decode)
- [decodeDelimited](proto.temporal.api.failure.v1.resetworkflowfailureinfo.md#decodedelimited)
- [encode](proto.temporal.api.failure.v1.resetworkflowfailureinfo.md#encode)
- [encodeDelimited](proto.temporal.api.failure.v1.resetworkflowfailureinfo.md#encodedelimited)
- [fromObject](proto.temporal.api.failure.v1.resetworkflowfailureinfo.md#fromobject)
- [toObject](proto.temporal.api.failure.v1.resetworkflowfailureinfo.md#toobject)
- [verify](proto.temporal.api.failure.v1.resetworkflowfailureinfo.md#verify)

## Constructors

### constructor

\+ **new ResetWorkflowFailureInfo**(`properties?`: [*IResetWorkflowFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iresetworkflowfailureinfo.md)): [*ResetWorkflowFailureInfo*](proto.temporal.api.failure.v1.resetworkflowfailureinfo.md)

Constructs a new ResetWorkflowFailureInfo.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IResetWorkflowFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iresetworkflowfailureinfo.md) |

**Returns:** [*ResetWorkflowFailureInfo*](proto.temporal.api.failure.v1.resetworkflowfailureinfo.md)

## Properties

### lastHeartbeatDetails

• `Optional` **lastHeartbeatDetails**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

ResetWorkflowFailureInfo lastHeartbeatDetails.

Implementation of: [IResetWorkflowFailureInfo](../interfaces/proto.temporal.api.failure.v1.iresetworkflowfailureinfo.md).[lastHeartbeatDetails](../interfaces/proto.temporal.api.failure.v1.iresetworkflowfailureinfo.md#lastheartbeatdetails)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ResetWorkflowFailureInfo to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IResetWorkflowFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iresetworkflowfailureinfo.md)): [*ResetWorkflowFailureInfo*](proto.temporal.api.failure.v1.resetworkflowfailureinfo.md)

Creates a new ResetWorkflowFailureInfo instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IResetWorkflowFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iresetworkflowfailureinfo.md) |

**Returns:** [*ResetWorkflowFailureInfo*](proto.temporal.api.failure.v1.resetworkflowfailureinfo.md)

ResetWorkflowFailureInfo instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ResetWorkflowFailureInfo*](proto.temporal.api.failure.v1.resetworkflowfailureinfo.md)

Decodes a ResetWorkflowFailureInfo message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ResetWorkflowFailureInfo*](proto.temporal.api.failure.v1.resetworkflowfailureinfo.md)

ResetWorkflowFailureInfo

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ResetWorkflowFailureInfo*](proto.temporal.api.failure.v1.resetworkflowfailureinfo.md)

Decodes a ResetWorkflowFailureInfo message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ResetWorkflowFailureInfo*](proto.temporal.api.failure.v1.resetworkflowfailureinfo.md)

ResetWorkflowFailureInfo

___

### encode

▸ `Static`**encode**(`message`: [*IResetWorkflowFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iresetworkflowfailureinfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified ResetWorkflowFailureInfo message. Does not implicitly [verify](proto.temporal.api.failure.v1.resetworkflowfailureinfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IResetWorkflowFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iresetworkflowfailureinfo.md) | ResetWorkflowFailureInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IResetWorkflowFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iresetworkflowfailureinfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified ResetWorkflowFailureInfo message, length delimited. Does not implicitly [verify](proto.temporal.api.failure.v1.resetworkflowfailureinfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IResetWorkflowFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iresetworkflowfailureinfo.md) | ResetWorkflowFailureInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ResetWorkflowFailureInfo*](proto.temporal.api.failure.v1.resetworkflowfailureinfo.md)

Creates a ResetWorkflowFailureInfo message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ResetWorkflowFailureInfo*](proto.temporal.api.failure.v1.resetworkflowfailureinfo.md)

ResetWorkflowFailureInfo

___

### toObject

▸ `Static`**toObject**(`message`: [*ResetWorkflowFailureInfo*](proto.temporal.api.failure.v1.resetworkflowfailureinfo.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ResetWorkflowFailureInfo message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ResetWorkflowFailureInfo*](proto.temporal.api.failure.v1.resetworkflowfailureinfo.md) | ResetWorkflowFailureInfo   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ResetWorkflowFailureInfo message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
