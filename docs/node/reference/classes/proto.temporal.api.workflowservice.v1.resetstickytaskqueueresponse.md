# Class: ResetStickyTaskQueueResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).ResetStickyTaskQueueResponse

Represents a ResetStickyTaskQueueResponse.

## Implements

* [*IResetStickyTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iresetstickytaskqueueresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.resetstickytaskqueueresponse.md#constructor)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.resetstickytaskqueueresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.resetstickytaskqueueresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.resetstickytaskqueueresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.resetstickytaskqueueresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.resetstickytaskqueueresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.resetstickytaskqueueresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.resetstickytaskqueueresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.resetstickytaskqueueresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.resetstickytaskqueueresponse.md#verify)

## Constructors

### constructor

\+ **new ResetStickyTaskQueueResponse**(`properties?`: [*IResetStickyTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iresetstickytaskqueueresponse.md)): [*ResetStickyTaskQueueResponse*](proto.temporal.api.workflowservice.v1.resetstickytaskqueueresponse.md)

Constructs a new ResetStickyTaskQueueResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IResetStickyTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iresetstickytaskqueueresponse.md) |

**Returns:** [*ResetStickyTaskQueueResponse*](proto.temporal.api.workflowservice.v1.resetstickytaskqueueresponse.md)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ResetStickyTaskQueueResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IResetStickyTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iresetstickytaskqueueresponse.md)): [*ResetStickyTaskQueueResponse*](proto.temporal.api.workflowservice.v1.resetstickytaskqueueresponse.md)

Creates a new ResetStickyTaskQueueResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IResetStickyTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iresetstickytaskqueueresponse.md) |

**Returns:** [*ResetStickyTaskQueueResponse*](proto.temporal.api.workflowservice.v1.resetstickytaskqueueresponse.md)

ResetStickyTaskQueueResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ResetStickyTaskQueueResponse*](proto.temporal.api.workflowservice.v1.resetstickytaskqueueresponse.md)

Decodes a ResetStickyTaskQueueResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ResetStickyTaskQueueResponse*](proto.temporal.api.workflowservice.v1.resetstickytaskqueueresponse.md)

ResetStickyTaskQueueResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ResetStickyTaskQueueResponse*](proto.temporal.api.workflowservice.v1.resetstickytaskqueueresponse.md)

Decodes a ResetStickyTaskQueueResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ResetStickyTaskQueueResponse*](proto.temporal.api.workflowservice.v1.resetstickytaskqueueresponse.md)

ResetStickyTaskQueueResponse

___

### encode

▸ `Static`**encode**(`message`: [*IResetStickyTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iresetstickytaskqueueresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified ResetStickyTaskQueueResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.resetstickytaskqueueresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IResetStickyTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iresetstickytaskqueueresponse.md) | ResetStickyTaskQueueResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IResetStickyTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iresetstickytaskqueueresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified ResetStickyTaskQueueResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.resetstickytaskqueueresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IResetStickyTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iresetstickytaskqueueresponse.md) | ResetStickyTaskQueueResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ResetStickyTaskQueueResponse*](proto.temporal.api.workflowservice.v1.resetstickytaskqueueresponse.md)

Creates a ResetStickyTaskQueueResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ResetStickyTaskQueueResponse*](proto.temporal.api.workflowservice.v1.resetstickytaskqueueresponse.md)

ResetStickyTaskQueueResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*ResetStickyTaskQueueResponse*](proto.temporal.api.workflowservice.v1.resetstickytaskqueueresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ResetStickyTaskQueueResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ResetStickyTaskQueueResponse*](proto.temporal.api.workflowservice.v1.resetstickytaskqueueresponse.md) | ResetStickyTaskQueueResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ResetStickyTaskQueueResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
