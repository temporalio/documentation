# Class: RespondActivityTaskCompletedResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).RespondActivityTaskCompletedResponse

Represents a RespondActivityTaskCompletedResponse.

## Implements

* [*IRespondActivityTaskCompletedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedresponse.md#constructor)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedresponse.md#verify)

## Constructors

### constructor

\+ **new RespondActivityTaskCompletedResponse**(`properties?`: [*IRespondActivityTaskCompletedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedresponse.md)): [*RespondActivityTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedresponse.md)

Constructs a new RespondActivityTaskCompletedResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRespondActivityTaskCompletedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedresponse.md) |

**Returns:** [*RespondActivityTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedresponse.md)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this RespondActivityTaskCompletedResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IRespondActivityTaskCompletedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedresponse.md)): [*RespondActivityTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedresponse.md)

Creates a new RespondActivityTaskCompletedResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRespondActivityTaskCompletedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedresponse.md) |

**Returns:** [*RespondActivityTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedresponse.md)

RespondActivityTaskCompletedResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*RespondActivityTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedresponse.md)

Decodes a RespondActivityTaskCompletedResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*RespondActivityTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedresponse.md)

RespondActivityTaskCompletedResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*RespondActivityTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedresponse.md)

Decodes a RespondActivityTaskCompletedResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*RespondActivityTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedresponse.md)

RespondActivityTaskCompletedResponse

___

### encode

▸ `Static`**encode**(`message`: [*IRespondActivityTaskCompletedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified RespondActivityTaskCompletedResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRespondActivityTaskCompletedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedresponse.md) | RespondActivityTaskCompletedResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IRespondActivityTaskCompletedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified RespondActivityTaskCompletedResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRespondActivityTaskCompletedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedresponse.md) | RespondActivityTaskCompletedResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*RespondActivityTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedresponse.md)

Creates a RespondActivityTaskCompletedResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*RespondActivityTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedresponse.md)

RespondActivityTaskCompletedResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*RespondActivityTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a RespondActivityTaskCompletedResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*RespondActivityTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedresponse.md) | RespondActivityTaskCompletedResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a RespondActivityTaskCompletedResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
