# Class: RespondQueryTaskCompletedResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).RespondQueryTaskCompletedResponse

Represents a RespondQueryTaskCompletedResponse.

## Implements

* [*IRespondQueryTaskCompletedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedresponse.md#constructor)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedresponse.md#verify)

## Constructors

### constructor

\+ **new RespondQueryTaskCompletedResponse**(`properties?`: [*IRespondQueryTaskCompletedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedresponse.md)): [*RespondQueryTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedresponse.md)

Constructs a new RespondQueryTaskCompletedResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRespondQueryTaskCompletedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedresponse.md) |

**Returns:** [*RespondQueryTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedresponse.md)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this RespondQueryTaskCompletedResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IRespondQueryTaskCompletedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedresponse.md)): [*RespondQueryTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedresponse.md)

Creates a new RespondQueryTaskCompletedResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRespondQueryTaskCompletedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedresponse.md) |

**Returns:** [*RespondQueryTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedresponse.md)

RespondQueryTaskCompletedResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*RespondQueryTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedresponse.md)

Decodes a RespondQueryTaskCompletedResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*RespondQueryTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedresponse.md)

RespondQueryTaskCompletedResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*RespondQueryTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedresponse.md)

Decodes a RespondQueryTaskCompletedResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*RespondQueryTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedresponse.md)

RespondQueryTaskCompletedResponse

___

### encode

▸ `Static`**encode**(`message`: [*IRespondQueryTaskCompletedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified RespondQueryTaskCompletedResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRespondQueryTaskCompletedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedresponse.md) | RespondQueryTaskCompletedResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IRespondQueryTaskCompletedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified RespondQueryTaskCompletedResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRespondQueryTaskCompletedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedresponse.md) | RespondQueryTaskCompletedResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*RespondQueryTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedresponse.md)

Creates a RespondQueryTaskCompletedResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*RespondQueryTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedresponse.md)

RespondQueryTaskCompletedResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*RespondQueryTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a RespondQueryTaskCompletedResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*RespondQueryTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedresponse.md) | RespondQueryTaskCompletedResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a RespondQueryTaskCompletedResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
