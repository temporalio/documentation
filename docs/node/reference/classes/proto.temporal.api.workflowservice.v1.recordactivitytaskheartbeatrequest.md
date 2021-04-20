# Class: RecordActivityTaskHeartbeatRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).RecordActivityTaskHeartbeatRequest

Represents a RecordActivityTaskHeartbeatRequest.

## Implements

* [*IRecordActivityTaskHeartbeatRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatrequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatrequest.md#constructor)

### Properties

- [details](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatrequest.md#details)
- [identity](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatrequest.md#identity)
- [namespace](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatrequest.md#namespace)
- [taskToken](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatrequest.md#tasktoken)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatrequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatrequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatrequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatrequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatrequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatrequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatrequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatrequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatrequest.md#verify)

## Constructors

### constructor

\+ **new RecordActivityTaskHeartbeatRequest**(`properties?`: [*IRecordActivityTaskHeartbeatRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatrequest.md)): [*RecordActivityTaskHeartbeatRequest*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatrequest.md)

Constructs a new RecordActivityTaskHeartbeatRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRecordActivityTaskHeartbeatRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatrequest.md) |

**Returns:** [*RecordActivityTaskHeartbeatRequest*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatrequest.md)

## Properties

### details

• `Optional` **details**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

RecordActivityTaskHeartbeatRequest details.

Implementation of: [IRecordActivityTaskHeartbeatRequest](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatrequest.md).[details](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatrequest.md#details)

___

### identity

• **identity**: *string*

RecordActivityTaskHeartbeatRequest identity.

Implementation of: [IRecordActivityTaskHeartbeatRequest](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatrequest.md).[identity](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatrequest.md#identity)

___

### namespace

• **namespace**: *string*

RecordActivityTaskHeartbeatRequest namespace.

Implementation of: [IRecordActivityTaskHeartbeatRequest](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatrequest.md).[namespace](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatrequest.md#namespace)

___

### taskToken

• **taskToken**: *Uint8Array*

RecordActivityTaskHeartbeatRequest taskToken.

Implementation of: [IRecordActivityTaskHeartbeatRequest](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatrequest.md).[taskToken](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatrequest.md#tasktoken)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this RecordActivityTaskHeartbeatRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IRecordActivityTaskHeartbeatRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatrequest.md)): [*RecordActivityTaskHeartbeatRequest*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatrequest.md)

Creates a new RecordActivityTaskHeartbeatRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRecordActivityTaskHeartbeatRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatrequest.md) |

**Returns:** [*RecordActivityTaskHeartbeatRequest*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatrequest.md)

RecordActivityTaskHeartbeatRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*RecordActivityTaskHeartbeatRequest*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatrequest.md)

Decodes a RecordActivityTaskHeartbeatRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*RecordActivityTaskHeartbeatRequest*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatrequest.md)

RecordActivityTaskHeartbeatRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*RecordActivityTaskHeartbeatRequest*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatrequest.md)

Decodes a RecordActivityTaskHeartbeatRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*RecordActivityTaskHeartbeatRequest*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatrequest.md)

RecordActivityTaskHeartbeatRequest

___

### encode

▸ `Static`**encode**(`message`: [*IRecordActivityTaskHeartbeatRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified RecordActivityTaskHeartbeatRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRecordActivityTaskHeartbeatRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatrequest.md) | RecordActivityTaskHeartbeatRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IRecordActivityTaskHeartbeatRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified RecordActivityTaskHeartbeatRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRecordActivityTaskHeartbeatRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatrequest.md) | RecordActivityTaskHeartbeatRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*RecordActivityTaskHeartbeatRequest*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatrequest.md)

Creates a RecordActivityTaskHeartbeatRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*RecordActivityTaskHeartbeatRequest*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatrequest.md)

RecordActivityTaskHeartbeatRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*RecordActivityTaskHeartbeatRequest*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatrequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a RecordActivityTaskHeartbeatRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*RecordActivityTaskHeartbeatRequest*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatrequest.md) | RecordActivityTaskHeartbeatRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a RecordActivityTaskHeartbeatRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
