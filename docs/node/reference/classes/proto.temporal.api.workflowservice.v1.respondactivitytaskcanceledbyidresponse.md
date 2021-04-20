# Class: RespondActivityTaskCanceledByIdResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).RespondActivityTaskCanceledByIdResponse

Represents a RespondActivityTaskCanceledByIdResponse.

## Implements

* [*IRespondActivityTaskCanceledByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledbyidresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledbyidresponse.md#constructor)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledbyidresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledbyidresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledbyidresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledbyidresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledbyidresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledbyidresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledbyidresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledbyidresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledbyidresponse.md#verify)

## Constructors

### constructor

\+ **new RespondActivityTaskCanceledByIdResponse**(`properties?`: [*IRespondActivityTaskCanceledByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledbyidresponse.md)): [*RespondActivityTaskCanceledByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledbyidresponse.md)

Constructs a new RespondActivityTaskCanceledByIdResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRespondActivityTaskCanceledByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledbyidresponse.md) |

**Returns:** [*RespondActivityTaskCanceledByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledbyidresponse.md)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this RespondActivityTaskCanceledByIdResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IRespondActivityTaskCanceledByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledbyidresponse.md)): [*RespondActivityTaskCanceledByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledbyidresponse.md)

Creates a new RespondActivityTaskCanceledByIdResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRespondActivityTaskCanceledByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledbyidresponse.md) |

**Returns:** [*RespondActivityTaskCanceledByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledbyidresponse.md)

RespondActivityTaskCanceledByIdResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*RespondActivityTaskCanceledByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledbyidresponse.md)

Decodes a RespondActivityTaskCanceledByIdResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*RespondActivityTaskCanceledByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledbyidresponse.md)

RespondActivityTaskCanceledByIdResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*RespondActivityTaskCanceledByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledbyidresponse.md)

Decodes a RespondActivityTaskCanceledByIdResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*RespondActivityTaskCanceledByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledbyidresponse.md)

RespondActivityTaskCanceledByIdResponse

___

### encode

▸ `Static`**encode**(`message`: [*IRespondActivityTaskCanceledByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledbyidresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified RespondActivityTaskCanceledByIdResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledbyidresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRespondActivityTaskCanceledByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledbyidresponse.md) | RespondActivityTaskCanceledByIdResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IRespondActivityTaskCanceledByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledbyidresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified RespondActivityTaskCanceledByIdResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledbyidresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRespondActivityTaskCanceledByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledbyidresponse.md) | RespondActivityTaskCanceledByIdResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*RespondActivityTaskCanceledByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledbyidresponse.md)

Creates a RespondActivityTaskCanceledByIdResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*RespondActivityTaskCanceledByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledbyidresponse.md)

RespondActivityTaskCanceledByIdResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*RespondActivityTaskCanceledByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledbyidresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a RespondActivityTaskCanceledByIdResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*RespondActivityTaskCanceledByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledbyidresponse.md) | RespondActivityTaskCanceledByIdResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a RespondActivityTaskCanceledByIdResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
