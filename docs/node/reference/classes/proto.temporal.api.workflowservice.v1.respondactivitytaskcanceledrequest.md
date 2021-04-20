# Class: RespondActivityTaskCanceledRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).RespondActivityTaskCanceledRequest

Represents a RespondActivityTaskCanceledRequest.

## Implements

* [*IRespondActivityTaskCanceledRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledrequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledrequest.md#constructor)

### Properties

- [details](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledrequest.md#details)
- [identity](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledrequest.md#identity)
- [namespace](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledrequest.md#namespace)
- [taskToken](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledrequest.md#tasktoken)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledrequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledrequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledrequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledrequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledrequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledrequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledrequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledrequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledrequest.md#verify)

## Constructors

### constructor

\+ **new RespondActivityTaskCanceledRequest**(`properties?`: [*IRespondActivityTaskCanceledRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledrequest.md)): [*RespondActivityTaskCanceledRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledrequest.md)

Constructs a new RespondActivityTaskCanceledRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRespondActivityTaskCanceledRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledrequest.md) |

**Returns:** [*RespondActivityTaskCanceledRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledrequest.md)

## Properties

### details

• `Optional` **details**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

RespondActivityTaskCanceledRequest details.

Implementation of: [IRespondActivityTaskCanceledRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledrequest.md).[details](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledrequest.md#details)

___

### identity

• **identity**: *string*

RespondActivityTaskCanceledRequest identity.

Implementation of: [IRespondActivityTaskCanceledRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledrequest.md).[identity](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledrequest.md#identity)

___

### namespace

• **namespace**: *string*

RespondActivityTaskCanceledRequest namespace.

Implementation of: [IRespondActivityTaskCanceledRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledrequest.md).[namespace](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledrequest.md#namespace)

___

### taskToken

• **taskToken**: *Uint8Array*

RespondActivityTaskCanceledRequest taskToken.

Implementation of: [IRespondActivityTaskCanceledRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledrequest.md).[taskToken](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledrequest.md#tasktoken)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this RespondActivityTaskCanceledRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IRespondActivityTaskCanceledRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledrequest.md)): [*RespondActivityTaskCanceledRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledrequest.md)

Creates a new RespondActivityTaskCanceledRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRespondActivityTaskCanceledRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledrequest.md) |

**Returns:** [*RespondActivityTaskCanceledRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledrequest.md)

RespondActivityTaskCanceledRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*RespondActivityTaskCanceledRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledrequest.md)

Decodes a RespondActivityTaskCanceledRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*RespondActivityTaskCanceledRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledrequest.md)

RespondActivityTaskCanceledRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*RespondActivityTaskCanceledRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledrequest.md)

Decodes a RespondActivityTaskCanceledRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*RespondActivityTaskCanceledRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledrequest.md)

RespondActivityTaskCanceledRequest

___

### encode

▸ `Static`**encode**(`message`: [*IRespondActivityTaskCanceledRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified RespondActivityTaskCanceledRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRespondActivityTaskCanceledRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledrequest.md) | RespondActivityTaskCanceledRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IRespondActivityTaskCanceledRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified RespondActivityTaskCanceledRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRespondActivityTaskCanceledRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskcanceledrequest.md) | RespondActivityTaskCanceledRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*RespondActivityTaskCanceledRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledrequest.md)

Creates a RespondActivityTaskCanceledRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*RespondActivityTaskCanceledRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledrequest.md)

RespondActivityTaskCanceledRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*RespondActivityTaskCanceledRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledrequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a RespondActivityTaskCanceledRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*RespondActivityTaskCanceledRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskcanceledrequest.md) | RespondActivityTaskCanceledRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a RespondActivityTaskCanceledRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
