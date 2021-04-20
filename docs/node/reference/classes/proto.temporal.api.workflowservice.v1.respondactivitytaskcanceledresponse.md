# Class: RespondActivityTaskCanceledResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).RespondActivityTaskCanceledResponse

Represents a RespondActivityTaskCanceledResponse.

## Implements

* [*IRespondActivityTaskCanceledResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledresponse.md#constructor)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledresponse.md#verify)

## Constructors

### constructor

\+ **new RespondActivityTaskCanceledResponse**(`properties?`: [*IRespondActivityTaskCanceledResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledresponse.md)): [*RespondActivityTaskCanceledResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledresponse.md)

Constructs a new RespondActivityTaskCanceledResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRespondActivityTaskCanceledResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledresponse.md) |

**Returns:** [*RespondActivityTaskCanceledResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledresponse.md)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this RespondActivityTaskCanceledResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IRespondActivityTaskCanceledResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledresponse.md)): [*RespondActivityTaskCanceledResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledresponse.md)

Creates a new RespondActivityTaskCanceledResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRespondActivityTaskCanceledResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledresponse.md) |

**Returns:** [*RespondActivityTaskCanceledResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledresponse.md)

RespondActivityTaskCanceledResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*RespondActivityTaskCanceledResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledresponse.md)

Decodes a RespondActivityTaskCanceledResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*RespondActivityTaskCanceledResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledresponse.md)

RespondActivityTaskCanceledResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*RespondActivityTaskCanceledResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledresponse.md)

Decodes a RespondActivityTaskCanceledResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*RespondActivityTaskCanceledResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledresponse.md)

RespondActivityTaskCanceledResponse

___

### encode

▸ `Static`**encode**(`message`: [*IRespondActivityTaskCanceledResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified RespondActivityTaskCanceledResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRespondActivityTaskCanceledResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledresponse.md) | RespondActivityTaskCanceledResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IRespondActivityTaskCanceledResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified RespondActivityTaskCanceledResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRespondActivityTaskCanceledResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledresponse.md) | RespondActivityTaskCanceledResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*RespondActivityTaskCanceledResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledresponse.md)

Creates a RespondActivityTaskCanceledResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*RespondActivityTaskCanceledResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledresponse.md)

RespondActivityTaskCanceledResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*RespondActivityTaskCanceledResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a RespondActivityTaskCanceledResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*RespondActivityTaskCanceledResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledresponse.md) | RespondActivityTaskCanceledResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a RespondActivityTaskCanceledResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
