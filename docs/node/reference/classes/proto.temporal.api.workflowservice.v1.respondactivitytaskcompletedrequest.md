# Class: RespondActivityTaskCompletedRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).RespondActivityTaskCompletedRequest

Represents a RespondActivityTaskCompletedRequest.

## Implements

* [*IRespondActivityTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedrequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedrequest.md#constructor)

### Properties

- [identity](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedrequest.md#identity)
- [namespace](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedrequest.md#namespace)
- [result](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedrequest.md#result)
- [taskToken](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedrequest.md#tasktoken)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedrequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedrequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedrequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedrequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedrequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedrequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedrequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedrequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedrequest.md#verify)

## Constructors

### constructor

\+ **new RespondActivityTaskCompletedRequest**(`properties?`: [*IRespondActivityTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedrequest.md)): [*RespondActivityTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedrequest.md)

Constructs a new RespondActivityTaskCompletedRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRespondActivityTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedrequest.md) |

**Returns:** [*RespondActivityTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedrequest.md)

## Properties

### identity

• **identity**: *string*

RespondActivityTaskCompletedRequest identity.

Implementation of: [IRespondActivityTaskCompletedRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedrequest.md).[identity](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedrequest.md#identity)

___

### namespace

• **namespace**: *string*

RespondActivityTaskCompletedRequest namespace.

Implementation of: [IRespondActivityTaskCompletedRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedrequest.md).[namespace](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedrequest.md#namespace)

___

### result

• `Optional` **result**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

RespondActivityTaskCompletedRequest result.

Implementation of: [IRespondActivityTaskCompletedRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedrequest.md).[result](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedrequest.md#result)

___

### taskToken

• **taskToken**: *Uint8Array*

RespondActivityTaskCompletedRequest taskToken.

Implementation of: [IRespondActivityTaskCompletedRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedrequest.md).[taskToken](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedrequest.md#tasktoken)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this RespondActivityTaskCompletedRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IRespondActivityTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedrequest.md)): [*RespondActivityTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedrequest.md)

Creates a new RespondActivityTaskCompletedRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRespondActivityTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedrequest.md) |

**Returns:** [*RespondActivityTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedrequest.md)

RespondActivityTaskCompletedRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*RespondActivityTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedrequest.md)

Decodes a RespondActivityTaskCompletedRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*RespondActivityTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedrequest.md)

RespondActivityTaskCompletedRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*RespondActivityTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedrequest.md)

Decodes a RespondActivityTaskCompletedRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*RespondActivityTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedrequest.md)

RespondActivityTaskCompletedRequest

___

### encode

▸ `Static`**encode**(`message`: [*IRespondActivityTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified RespondActivityTaskCompletedRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRespondActivityTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedrequest.md) | RespondActivityTaskCompletedRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IRespondActivityTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified RespondActivityTaskCompletedRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRespondActivityTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcompletedrequest.md) | RespondActivityTaskCompletedRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*RespondActivityTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedrequest.md)

Creates a RespondActivityTaskCompletedRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*RespondActivityTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedrequest.md)

RespondActivityTaskCompletedRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*RespondActivityTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedrequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a RespondActivityTaskCompletedRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*RespondActivityTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskcompletedrequest.md) | RespondActivityTaskCompletedRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a RespondActivityTaskCompletedRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
