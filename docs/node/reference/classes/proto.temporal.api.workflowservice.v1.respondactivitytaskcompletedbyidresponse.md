# Class: RespondActivityTaskCompletedByIdResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).RespondActivityTaskCompletedByIdResponse

Represents a RespondActivityTaskCompletedByIdResponse.

## Implements

* [*IRespondActivityTaskCompletedByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedbyidresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedbyidresponse.md#constructor)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedbyidresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedbyidresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedbyidresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedbyidresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedbyidresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedbyidresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedbyidresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedbyidresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedbyidresponse.md#verify)

## Constructors

### constructor

\+ **new RespondActivityTaskCompletedByIdResponse**(`properties?`: [*IRespondActivityTaskCompletedByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedbyidresponse.md)): [*RespondActivityTaskCompletedByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedbyidresponse.md)

Constructs a new RespondActivityTaskCompletedByIdResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRespondActivityTaskCompletedByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedbyidresponse.md) |

**Returns:** [*RespondActivityTaskCompletedByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedbyidresponse.md)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this RespondActivityTaskCompletedByIdResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IRespondActivityTaskCompletedByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedbyidresponse.md)): [*RespondActivityTaskCompletedByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedbyidresponse.md)

Creates a new RespondActivityTaskCompletedByIdResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRespondActivityTaskCompletedByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedbyidresponse.md) |

**Returns:** [*RespondActivityTaskCompletedByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedbyidresponse.md)

RespondActivityTaskCompletedByIdResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*RespondActivityTaskCompletedByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedbyidresponse.md)

Decodes a RespondActivityTaskCompletedByIdResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*RespondActivityTaskCompletedByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedbyidresponse.md)

RespondActivityTaskCompletedByIdResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*RespondActivityTaskCompletedByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedbyidresponse.md)

Decodes a RespondActivityTaskCompletedByIdResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*RespondActivityTaskCompletedByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedbyidresponse.md)

RespondActivityTaskCompletedByIdResponse

___

### encode

▸ `Static`**encode**(`message`: [*IRespondActivityTaskCompletedByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedbyidresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified RespondActivityTaskCompletedByIdResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedbyidresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRespondActivityTaskCompletedByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedbyidresponse.md) | RespondActivityTaskCompletedByIdResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IRespondActivityTaskCompletedByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedbyidresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified RespondActivityTaskCompletedByIdResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedbyidresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRespondActivityTaskCompletedByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedbyidresponse.md) | RespondActivityTaskCompletedByIdResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*RespondActivityTaskCompletedByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedbyidresponse.md)

Creates a RespondActivityTaskCompletedByIdResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*RespondActivityTaskCompletedByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedbyidresponse.md)

RespondActivityTaskCompletedByIdResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*RespondActivityTaskCompletedByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedbyidresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a RespondActivityTaskCompletedByIdResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*RespondActivityTaskCompletedByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedbyidresponse.md) | RespondActivityTaskCompletedByIdResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a RespondActivityTaskCompletedByIdResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
