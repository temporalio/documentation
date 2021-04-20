# Class: RespondActivityTaskFailedByIdResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).RespondActivityTaskFailedByIdResponse

Represents a RespondActivityTaskFailedByIdResponse.

## Implements

* [*IRespondActivityTaskFailedByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedbyidresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidresponse.md#constructor)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidresponse.md#verify)

## Constructors

### constructor

\+ **new RespondActivityTaskFailedByIdResponse**(`properties?`: [*IRespondActivityTaskFailedByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedbyidresponse.md)): [*RespondActivityTaskFailedByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidresponse.md)

Constructs a new RespondActivityTaskFailedByIdResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRespondActivityTaskFailedByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedbyidresponse.md) |

**Returns:** [*RespondActivityTaskFailedByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidresponse.md)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this RespondActivityTaskFailedByIdResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IRespondActivityTaskFailedByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedbyidresponse.md)): [*RespondActivityTaskFailedByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidresponse.md)

Creates a new RespondActivityTaskFailedByIdResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRespondActivityTaskFailedByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedbyidresponse.md) |

**Returns:** [*RespondActivityTaskFailedByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidresponse.md)

RespondActivityTaskFailedByIdResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*RespondActivityTaskFailedByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidresponse.md)

Decodes a RespondActivityTaskFailedByIdResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*RespondActivityTaskFailedByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidresponse.md)

RespondActivityTaskFailedByIdResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*RespondActivityTaskFailedByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidresponse.md)

Decodes a RespondActivityTaskFailedByIdResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*RespondActivityTaskFailedByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidresponse.md)

RespondActivityTaskFailedByIdResponse

___

### encode

▸ `Static`**encode**(`message`: [*IRespondActivityTaskFailedByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedbyidresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified RespondActivityTaskFailedByIdResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRespondActivityTaskFailedByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedbyidresponse.md) | RespondActivityTaskFailedByIdResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IRespondActivityTaskFailedByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedbyidresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified RespondActivityTaskFailedByIdResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRespondActivityTaskFailedByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedbyidresponse.md) | RespondActivityTaskFailedByIdResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*RespondActivityTaskFailedByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidresponse.md)

Creates a RespondActivityTaskFailedByIdResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*RespondActivityTaskFailedByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidresponse.md)

RespondActivityTaskFailedByIdResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*RespondActivityTaskFailedByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a RespondActivityTaskFailedByIdResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*RespondActivityTaskFailedByIdResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidresponse.md) | RespondActivityTaskFailedByIdResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a RespondActivityTaskFailedByIdResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
