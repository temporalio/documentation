# Class: RespondActivityTaskFailedByIdRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).RespondActivityTaskFailedByIdRequest

Represents a RespondActivityTaskFailedByIdRequest.

## Implements

* [*IRespondActivityTaskFailedByIdRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedbyidrequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidrequest.md#constructor)

### Properties

- [activityId](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidrequest.md#activityid)
- [failure](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidrequest.md#failure)
- [identity](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidrequest.md#identity)
- [namespace](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidrequest.md#namespace)
- [runId](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidrequest.md#runid)
- [workflowId](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidrequest.md#workflowid)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidrequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidrequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidrequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidrequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidrequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidrequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidrequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidrequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidrequest.md#verify)

## Constructors

### constructor

\+ **new RespondActivityTaskFailedByIdRequest**(`properties?`: [*IRespondActivityTaskFailedByIdRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedbyidrequest.md)): [*RespondActivityTaskFailedByIdRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidrequest.md)

Constructs a new RespondActivityTaskFailedByIdRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRespondActivityTaskFailedByIdRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedbyidrequest.md) |

**Returns:** [*RespondActivityTaskFailedByIdRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidrequest.md)

## Properties

### activityId

• **activityId**: *string*

RespondActivityTaskFailedByIdRequest activityId.

Implementation of: [IRespondActivityTaskFailedByIdRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedbyidrequest.md).[activityId](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedbyidrequest.md#activityid)

___

### failure

• `Optional` **failure**: *null* \| [*IFailure*](../interfaces/proto.temporal.api.failure.v1.ifailure.md)

RespondActivityTaskFailedByIdRequest failure.

Implementation of: [IRespondActivityTaskFailedByIdRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedbyidrequest.md).[failure](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedbyidrequest.md#failure)

___

### identity

• **identity**: *string*

RespondActivityTaskFailedByIdRequest identity.

Implementation of: [IRespondActivityTaskFailedByIdRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedbyidrequest.md).[identity](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedbyidrequest.md#identity)

___

### namespace

• **namespace**: *string*

RespondActivityTaskFailedByIdRequest namespace.

Implementation of: [IRespondActivityTaskFailedByIdRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedbyidrequest.md).[namespace](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedbyidrequest.md#namespace)

___

### runId

• **runId**: *string*

RespondActivityTaskFailedByIdRequest runId.

Implementation of: [IRespondActivityTaskFailedByIdRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedbyidrequest.md).[runId](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedbyidrequest.md#runid)

___

### workflowId

• **workflowId**: *string*

RespondActivityTaskFailedByIdRequest workflowId.

Implementation of: [IRespondActivityTaskFailedByIdRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedbyidrequest.md).[workflowId](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedbyidrequest.md#workflowid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this RespondActivityTaskFailedByIdRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IRespondActivityTaskFailedByIdRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedbyidrequest.md)): [*RespondActivityTaskFailedByIdRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidrequest.md)

Creates a new RespondActivityTaskFailedByIdRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRespondActivityTaskFailedByIdRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedbyidrequest.md) |

**Returns:** [*RespondActivityTaskFailedByIdRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidrequest.md)

RespondActivityTaskFailedByIdRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*RespondActivityTaskFailedByIdRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidrequest.md)

Decodes a RespondActivityTaskFailedByIdRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*RespondActivityTaskFailedByIdRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidrequest.md)

RespondActivityTaskFailedByIdRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*RespondActivityTaskFailedByIdRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidrequest.md)

Decodes a RespondActivityTaskFailedByIdRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*RespondActivityTaskFailedByIdRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidrequest.md)

RespondActivityTaskFailedByIdRequest

___

### encode

▸ `Static`**encode**(`message`: [*IRespondActivityTaskFailedByIdRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedbyidrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified RespondActivityTaskFailedByIdRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRespondActivityTaskFailedByIdRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedbyidrequest.md) | RespondActivityTaskFailedByIdRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IRespondActivityTaskFailedByIdRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedbyidrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified RespondActivityTaskFailedByIdRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRespondActivityTaskFailedByIdRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondactivitytaskfailedbyidrequest.md) | RespondActivityTaskFailedByIdRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*RespondActivityTaskFailedByIdRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidrequest.md)

Creates a RespondActivityTaskFailedByIdRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*RespondActivityTaskFailedByIdRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidrequest.md)

RespondActivityTaskFailedByIdRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*RespondActivityTaskFailedByIdRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidrequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a RespondActivityTaskFailedByIdRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*RespondActivityTaskFailedByIdRequest*](proto.temporal.api.workflowservice.v1.respondactivitytaskfailedbyidrequest.md) | RespondActivityTaskFailedByIdRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a RespondActivityTaskFailedByIdRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
