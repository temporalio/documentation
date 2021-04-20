# Class: RespondWorkflowTaskCompletedResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).RespondWorkflowTaskCompletedResponse

Represents a RespondWorkflowTaskCompletedResponse.

## Implements

* [*IRespondWorkflowTaskCompletedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedresponse.md#constructor)

### Properties

- [workflowTask](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedresponse.md#workflowtask)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedresponse.md#verify)

## Constructors

### constructor

\+ **new RespondWorkflowTaskCompletedResponse**(`properties?`: [*IRespondWorkflowTaskCompletedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedresponse.md)): [*RespondWorkflowTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedresponse.md)

Constructs a new RespondWorkflowTaskCompletedResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRespondWorkflowTaskCompletedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedresponse.md) |

**Returns:** [*RespondWorkflowTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedresponse.md)

## Properties

### workflowTask

• `Optional` **workflowTask**: *null* \| [*IPollWorkflowTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.ipollworkflowtaskqueueresponse.md)

RespondWorkflowTaskCompletedResponse workflowTask.

Implementation of: [IRespondWorkflowTaskCompletedResponse](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedresponse.md).[workflowTask](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedresponse.md#workflowtask)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this RespondWorkflowTaskCompletedResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IRespondWorkflowTaskCompletedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedresponse.md)): [*RespondWorkflowTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedresponse.md)

Creates a new RespondWorkflowTaskCompletedResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRespondWorkflowTaskCompletedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedresponse.md) |

**Returns:** [*RespondWorkflowTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedresponse.md)

RespondWorkflowTaskCompletedResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*RespondWorkflowTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedresponse.md)

Decodes a RespondWorkflowTaskCompletedResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*RespondWorkflowTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedresponse.md)

RespondWorkflowTaskCompletedResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*RespondWorkflowTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedresponse.md)

Decodes a RespondWorkflowTaskCompletedResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*RespondWorkflowTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedresponse.md)

RespondWorkflowTaskCompletedResponse

___

### encode

▸ `Static`**encode**(`message`: [*IRespondWorkflowTaskCompletedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified RespondWorkflowTaskCompletedResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRespondWorkflowTaskCompletedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedresponse.md) | RespondWorkflowTaskCompletedResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IRespondWorkflowTaskCompletedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified RespondWorkflowTaskCompletedResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRespondWorkflowTaskCompletedResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedresponse.md) | RespondWorkflowTaskCompletedResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*RespondWorkflowTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedresponse.md)

Creates a RespondWorkflowTaskCompletedResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*RespondWorkflowTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedresponse.md)

RespondWorkflowTaskCompletedResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*RespondWorkflowTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a RespondWorkflowTaskCompletedResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*RespondWorkflowTaskCompletedResponse*](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedresponse.md) | RespondWorkflowTaskCompletedResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a RespondWorkflowTaskCompletedResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
