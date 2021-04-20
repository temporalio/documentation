# Class: RespondQueryTaskCompletedRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).RespondQueryTaskCompletedRequest

Represents a RespondQueryTaskCompletedRequest.

## Implements

* [*IRespondQueryTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedrequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedrequest.md#constructor)

### Properties

- [completedType](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedrequest.md#completedtype)
- [errorMessage](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedrequest.md#errormessage)
- [namespace](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedrequest.md#namespace)
- [queryResult](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedrequest.md#queryresult)
- [taskToken](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedrequest.md#tasktoken)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedrequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedrequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedrequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedrequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedrequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedrequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedrequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedrequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedrequest.md#verify)

## Constructors

### constructor

\+ **new RespondQueryTaskCompletedRequest**(`properties?`: [*IRespondQueryTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedrequest.md)): [*RespondQueryTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedrequest.md)

Constructs a new RespondQueryTaskCompletedRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRespondQueryTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedrequest.md) |

**Returns:** [*RespondQueryTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedrequest.md)

## Properties

### completedType

• **completedType**: [*QueryResultType*](../enums/proto.temporal.api.enums.v1.queryresulttype.md)

RespondQueryTaskCompletedRequest completedType.

Implementation of: [IRespondQueryTaskCompletedRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedrequest.md).[completedType](../interfaces/proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedrequest.md#completedtype)

___

### errorMessage

• **errorMessage**: *string*

RespondQueryTaskCompletedRequest errorMessage.

Implementation of: [IRespondQueryTaskCompletedRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedrequest.md).[errorMessage](../interfaces/proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedrequest.md#errormessage)

___

### namespace

• **namespace**: *string*

RespondQueryTaskCompletedRequest namespace.

Implementation of: [IRespondQueryTaskCompletedRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedrequest.md).[namespace](../interfaces/proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedrequest.md#namespace)

___

### queryResult

• `Optional` **queryResult**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

RespondQueryTaskCompletedRequest queryResult.

Implementation of: [IRespondQueryTaskCompletedRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedrequest.md).[queryResult](../interfaces/proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedrequest.md#queryresult)

___

### taskToken

• **taskToken**: *Uint8Array*

RespondQueryTaskCompletedRequest taskToken.

Implementation of: [IRespondQueryTaskCompletedRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedrequest.md).[taskToken](../interfaces/proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedrequest.md#tasktoken)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this RespondQueryTaskCompletedRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IRespondQueryTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedrequest.md)): [*RespondQueryTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedrequest.md)

Creates a new RespondQueryTaskCompletedRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRespondQueryTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedrequest.md) |

**Returns:** [*RespondQueryTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedrequest.md)

RespondQueryTaskCompletedRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*RespondQueryTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedrequest.md)

Decodes a RespondQueryTaskCompletedRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*RespondQueryTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedrequest.md)

RespondQueryTaskCompletedRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*RespondQueryTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedrequest.md)

Decodes a RespondQueryTaskCompletedRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*RespondQueryTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedrequest.md)

RespondQueryTaskCompletedRequest

___

### encode

▸ `Static`**encode**(`message`: [*IRespondQueryTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified RespondQueryTaskCompletedRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRespondQueryTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedrequest.md) | RespondQueryTaskCompletedRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IRespondQueryTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified RespondQueryTaskCompletedRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRespondQueryTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondquerytaskcompletedrequest.md) | RespondQueryTaskCompletedRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*RespondQueryTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedrequest.md)

Creates a RespondQueryTaskCompletedRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*RespondQueryTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedrequest.md)

RespondQueryTaskCompletedRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*RespondQueryTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedrequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a RespondQueryTaskCompletedRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*RespondQueryTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondquerytaskcompletedrequest.md) | RespondQueryTaskCompletedRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a RespondQueryTaskCompletedRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
