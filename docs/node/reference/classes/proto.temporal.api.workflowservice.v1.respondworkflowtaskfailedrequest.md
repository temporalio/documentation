# Class: RespondWorkflowTaskFailedRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).RespondWorkflowTaskFailedRequest

Represents a RespondWorkflowTaskFailedRequest.

## Implements

* [*IRespondWorkflowTaskFailedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedrequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedrequest.md#constructor)

### Properties

- [binaryChecksum](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedrequest.md#binarychecksum)
- [cause](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedrequest.md#cause)
- [failure](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedrequest.md#failure)
- [identity](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedrequest.md#identity)
- [namespace](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedrequest.md#namespace)
- [taskToken](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedrequest.md#tasktoken)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedrequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedrequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedrequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedrequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedrequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedrequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedrequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedrequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedrequest.md#verify)

## Constructors

### constructor

\+ **new RespondWorkflowTaskFailedRequest**(`properties?`: [*IRespondWorkflowTaskFailedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedrequest.md)): [*RespondWorkflowTaskFailedRequest*](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedrequest.md)

Constructs a new RespondWorkflowTaskFailedRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRespondWorkflowTaskFailedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedrequest.md) |

**Returns:** [*RespondWorkflowTaskFailedRequest*](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedrequest.md)

## Properties

### binaryChecksum

• **binaryChecksum**: *string*

RespondWorkflowTaskFailedRequest binaryChecksum.

Implementation of: [IRespondWorkflowTaskFailedRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedrequest.md).[binaryChecksum](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedrequest.md#binarychecksum)

___

### cause

• **cause**: [*WorkflowTaskFailedCause*](../enums/proto.temporal.api.enums.v1.workflowtaskfailedcause.md)

RespondWorkflowTaskFailedRequest cause.

Implementation of: [IRespondWorkflowTaskFailedRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedrequest.md).[cause](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedrequest.md#cause)

___

### failure

• `Optional` **failure**: *null* \| [*IFailure*](../interfaces/proto.temporal.api.failure.v1.ifailure.md)

RespondWorkflowTaskFailedRequest failure.

Implementation of: [IRespondWorkflowTaskFailedRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedrequest.md).[failure](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedrequest.md#failure)

___

### identity

• **identity**: *string*

RespondWorkflowTaskFailedRequest identity.

Implementation of: [IRespondWorkflowTaskFailedRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedrequest.md).[identity](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedrequest.md#identity)

___

### namespace

• **namespace**: *string*

RespondWorkflowTaskFailedRequest namespace.

Implementation of: [IRespondWorkflowTaskFailedRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedrequest.md).[namespace](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedrequest.md#namespace)

___

### taskToken

• **taskToken**: *Uint8Array*

RespondWorkflowTaskFailedRequest taskToken.

Implementation of: [IRespondWorkflowTaskFailedRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedrequest.md).[taskToken](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedrequest.md#tasktoken)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this RespondWorkflowTaskFailedRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IRespondWorkflowTaskFailedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedrequest.md)): [*RespondWorkflowTaskFailedRequest*](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedrequest.md)

Creates a new RespondWorkflowTaskFailedRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRespondWorkflowTaskFailedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedrequest.md) |

**Returns:** [*RespondWorkflowTaskFailedRequest*](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedrequest.md)

RespondWorkflowTaskFailedRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*RespondWorkflowTaskFailedRequest*](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedrequest.md)

Decodes a RespondWorkflowTaskFailedRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*RespondWorkflowTaskFailedRequest*](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedrequest.md)

RespondWorkflowTaskFailedRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*RespondWorkflowTaskFailedRequest*](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedrequest.md)

Decodes a RespondWorkflowTaskFailedRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*RespondWorkflowTaskFailedRequest*](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedrequest.md)

RespondWorkflowTaskFailedRequest

___

### encode

▸ `Static`**encode**(`message`: [*IRespondWorkflowTaskFailedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified RespondWorkflowTaskFailedRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRespondWorkflowTaskFailedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedrequest.md) | RespondWorkflowTaskFailedRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IRespondWorkflowTaskFailedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified RespondWorkflowTaskFailedRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRespondWorkflowTaskFailedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskfailedrequest.md) | RespondWorkflowTaskFailedRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*RespondWorkflowTaskFailedRequest*](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedrequest.md)

Creates a RespondWorkflowTaskFailedRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*RespondWorkflowTaskFailedRequest*](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedrequest.md)

RespondWorkflowTaskFailedRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*RespondWorkflowTaskFailedRequest*](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedrequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a RespondWorkflowTaskFailedRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*RespondWorkflowTaskFailedRequest*](proto.temporal.api.workflowservice.v1.respondworkflowtaskfailedrequest.md) | RespondWorkflowTaskFailedRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a RespondWorkflowTaskFailedRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
