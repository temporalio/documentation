# Class: RespondWorkflowTaskFailedResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).RespondWorkflowTaskFailedResponse

Represents a RespondWorkflowTaskFailedResponse.

## Implements

* [*IRespondWorkflowTaskFailedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedresponse.md#constructor)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedresponse.md#verify)

## Constructors

### constructor

\+ **new RespondWorkflowTaskFailedResponse**(`properties?`: [*IRespondWorkflowTaskFailedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedresponse.md)): [*RespondWorkflowTaskFailedResponse*](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedresponse.md)

Constructs a new RespondWorkflowTaskFailedResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRespondWorkflowTaskFailedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedresponse.md) |

**Returns:** [*RespondWorkflowTaskFailedResponse*](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedresponse.md)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this RespondWorkflowTaskFailedResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IRespondWorkflowTaskFailedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedresponse.md)): [*RespondWorkflowTaskFailedResponse*](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedresponse.md)

Creates a new RespondWorkflowTaskFailedResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRespondWorkflowTaskFailedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedresponse.md) |

**Returns:** [*RespondWorkflowTaskFailedResponse*](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedresponse.md)

RespondWorkflowTaskFailedResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*RespondWorkflowTaskFailedResponse*](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedresponse.md)

Decodes a RespondWorkflowTaskFailedResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*RespondWorkflowTaskFailedResponse*](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedresponse.md)

RespondWorkflowTaskFailedResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*RespondWorkflowTaskFailedResponse*](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedresponse.md)

Decodes a RespondWorkflowTaskFailedResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*RespondWorkflowTaskFailedResponse*](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedresponse.md)

RespondWorkflowTaskFailedResponse

___

### encode

▸ `Static`**encode**(`message`: [*IRespondWorkflowTaskFailedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified RespondWorkflowTaskFailedResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRespondWorkflowTaskFailedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedresponse.md) | RespondWorkflowTaskFailedResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IRespondWorkflowTaskFailedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified RespondWorkflowTaskFailedResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRespondWorkflowTaskFailedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedresponse.md) | RespondWorkflowTaskFailedResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*RespondWorkflowTaskFailedResponse*](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedresponse.md)

Creates a RespondWorkflowTaskFailedResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*RespondWorkflowTaskFailedResponse*](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedresponse.md)

RespondWorkflowTaskFailedResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*RespondWorkflowTaskFailedResponse*](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a RespondWorkflowTaskFailedResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*RespondWorkflowTaskFailedResponse*](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedresponse.md) | RespondWorkflowTaskFailedResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a RespondWorkflowTaskFailedResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
