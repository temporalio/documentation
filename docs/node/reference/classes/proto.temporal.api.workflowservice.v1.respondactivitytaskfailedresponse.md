# Class: RespondActivityTaskFailedResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).RespondActivityTaskFailedResponse

Represents a RespondActivityTaskFailedResponse.

## Implements

* [*IRespondActivityTaskFailedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedresponse.md#constructor)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedresponse.md#verify)

## Constructors

### constructor

\+ **new RespondActivityTaskFailedResponse**(`properties?`: [*IRespondActivityTaskFailedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedresponse.md)): [*RespondActivityTaskFailedResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedresponse.md)

Constructs a new RespondActivityTaskFailedResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRespondActivityTaskFailedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedresponse.md) |

**Returns:** [*RespondActivityTaskFailedResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedresponse.md)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this RespondActivityTaskFailedResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IRespondActivityTaskFailedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedresponse.md)): [*RespondActivityTaskFailedResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedresponse.md)

Creates a new RespondActivityTaskFailedResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRespondActivityTaskFailedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedresponse.md) |

**Returns:** [*RespondActivityTaskFailedResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedresponse.md)

RespondActivityTaskFailedResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*RespondActivityTaskFailedResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedresponse.md)

Decodes a RespondActivityTaskFailedResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*RespondActivityTaskFailedResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedresponse.md)

RespondActivityTaskFailedResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*RespondActivityTaskFailedResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedresponse.md)

Decodes a RespondActivityTaskFailedResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*RespondActivityTaskFailedResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedresponse.md)

RespondActivityTaskFailedResponse

___

### encode

▸ `Static`**encode**(`message`: [*IRespondActivityTaskFailedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified RespondActivityTaskFailedResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRespondActivityTaskFailedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedresponse.md) | RespondActivityTaskFailedResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IRespondActivityTaskFailedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified RespondActivityTaskFailedResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRespondActivityTaskFailedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedresponse.md) | RespondActivityTaskFailedResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*RespondActivityTaskFailedResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedresponse.md)

Creates a RespondActivityTaskFailedResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*RespondActivityTaskFailedResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedresponse.md)

RespondActivityTaskFailedResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*RespondActivityTaskFailedResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a RespondActivityTaskFailedResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*RespondActivityTaskFailedResponse*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedresponse.md) | RespondActivityTaskFailedResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a RespondActivityTaskFailedResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
