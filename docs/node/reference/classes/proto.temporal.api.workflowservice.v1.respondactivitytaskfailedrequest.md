# Class: RespondActivityTaskFailedRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).RespondActivityTaskFailedRequest

Represents a RespondActivityTaskFailedRequest.

## Implements

* [*IRespondActivityTaskFailedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedrequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedrequest.md#constructor)

### Properties

- [failure](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedrequest.md#failure)
- [identity](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedrequest.md#identity)
- [namespace](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedrequest.md#namespace)
- [taskToken](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedrequest.md#tasktoken)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedrequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedrequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedrequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedrequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedrequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedrequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedrequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedrequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedrequest.md#verify)

## Constructors

### constructor

\+ **new RespondActivityTaskFailedRequest**(`properties?`: [*IRespondActivityTaskFailedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedrequest.md)): [*RespondActivityTaskFailedRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedrequest.md)

Constructs a new RespondActivityTaskFailedRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRespondActivityTaskFailedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedrequest.md) |

**Returns:** [*RespondActivityTaskFailedRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedrequest.md)

## Properties

### failure

• `Optional` **failure**: *null* \| [*IFailure*](../interfaces/proto.temporal.api.failure.v1.ifailure.md)

RespondActivityTaskFailedRequest failure.

Implementation of: [IRespondActivityTaskFailedRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedrequest.md).[failure](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedrequest.md#failure)

___

### identity

• **identity**: *string*

RespondActivityTaskFailedRequest identity.

Implementation of: [IRespondActivityTaskFailedRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedrequest.md).[identity](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedrequest.md#identity)

___

### namespace

• **namespace**: *string*

RespondActivityTaskFailedRequest namespace.

Implementation of: [IRespondActivityTaskFailedRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedrequest.md).[namespace](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedrequest.md#namespace)

___

### taskToken

• **taskToken**: *Uint8Array*

RespondActivityTaskFailedRequest taskToken.

Implementation of: [IRespondActivityTaskFailedRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedrequest.md).[taskToken](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedrequest.md#tasktoken)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this RespondActivityTaskFailedRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IRespondActivityTaskFailedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedrequest.md)): [*RespondActivityTaskFailedRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedrequest.md)

Creates a new RespondActivityTaskFailedRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRespondActivityTaskFailedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedrequest.md) |

**Returns:** [*RespondActivityTaskFailedRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedrequest.md)

RespondActivityTaskFailedRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*RespondActivityTaskFailedRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedrequest.md)

Decodes a RespondActivityTaskFailedRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*RespondActivityTaskFailedRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedrequest.md)

RespondActivityTaskFailedRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*RespondActivityTaskFailedRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedrequest.md)

Decodes a RespondActivityTaskFailedRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*RespondActivityTaskFailedRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedrequest.md)

RespondActivityTaskFailedRequest

___

### encode

▸ `Static`**encode**(`message`: [*IRespondActivityTaskFailedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified RespondActivityTaskFailedRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRespondActivityTaskFailedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedrequest.md) | RespondActivityTaskFailedRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IRespondActivityTaskFailedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified RespondActivityTaskFailedRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRespondActivityTaskFailedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedrequest.md) | RespondActivityTaskFailedRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*RespondActivityTaskFailedRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedrequest.md)

Creates a RespondActivityTaskFailedRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*RespondActivityTaskFailedRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedrequest.md)

RespondActivityTaskFailedRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*RespondActivityTaskFailedRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedrequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a RespondActivityTaskFailedRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*RespondActivityTaskFailedRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedrequest.md) | RespondActivityTaskFailedRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a RespondActivityTaskFailedRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
