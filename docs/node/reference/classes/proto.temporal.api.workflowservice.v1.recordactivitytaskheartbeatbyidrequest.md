# Class: RecordActivityTaskHeartbeatByIdRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).RecordActivityTaskHeartbeatByIdRequest

Represents a RecordActivityTaskHeartbeatByIdRequest.

## Implements

* [*IRecordActivityTaskHeartbeatByIdRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidrequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidrequest.md#constructor)

### Properties

- [activityId](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidrequest.md#activityid)
- [details](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidrequest.md#details)
- [identity](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidrequest.md#identity)
- [namespace](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidrequest.md#namespace)
- [runId](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidrequest.md#runid)
- [workflowId](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidrequest.md#workflowid)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidrequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidrequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidrequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidrequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidrequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidrequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidrequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidrequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidrequest.md#verify)

## Constructors

### constructor

\+ **new RecordActivityTaskHeartbeatByIdRequest**(`properties?`: [*IRecordActivityTaskHeartbeatByIdRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidrequest.md)): [*RecordActivityTaskHeartbeatByIdRequest*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidrequest.md)

Constructs a new RecordActivityTaskHeartbeatByIdRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRecordActivityTaskHeartbeatByIdRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidrequest.md) |

**Returns:** [*RecordActivityTaskHeartbeatByIdRequest*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidrequest.md)

## Properties

### activityId

• **activityId**: *string*

RecordActivityTaskHeartbeatByIdRequest activityId.

Implementation of: [IRecordActivityTaskHeartbeatByIdRequest](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidrequest.md).[activityId](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidrequest.md#activityid)

___

### details

• `Optional` **details**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

RecordActivityTaskHeartbeatByIdRequest details.

Implementation of: [IRecordActivityTaskHeartbeatByIdRequest](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidrequest.md).[details](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidrequest.md#details)

___

### identity

• **identity**: *string*

RecordActivityTaskHeartbeatByIdRequest identity.

Implementation of: [IRecordActivityTaskHeartbeatByIdRequest](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidrequest.md).[identity](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidrequest.md#identity)

___

### namespace

• **namespace**: *string*

RecordActivityTaskHeartbeatByIdRequest namespace.

Implementation of: [IRecordActivityTaskHeartbeatByIdRequest](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidrequest.md).[namespace](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidrequest.md#namespace)

___

### runId

• **runId**: *string*

RecordActivityTaskHeartbeatByIdRequest runId.

Implementation of: [IRecordActivityTaskHeartbeatByIdRequest](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidrequest.md).[runId](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidrequest.md#runid)

___

### workflowId

• **workflowId**: *string*

RecordActivityTaskHeartbeatByIdRequest workflowId.

Implementation of: [IRecordActivityTaskHeartbeatByIdRequest](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidrequest.md).[workflowId](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidrequest.md#workflowid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this RecordActivityTaskHeartbeatByIdRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IRecordActivityTaskHeartbeatByIdRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidrequest.md)): [*RecordActivityTaskHeartbeatByIdRequest*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidrequest.md)

Creates a new RecordActivityTaskHeartbeatByIdRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRecordActivityTaskHeartbeatByIdRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidrequest.md) |

**Returns:** [*RecordActivityTaskHeartbeatByIdRequest*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidrequest.md)

RecordActivityTaskHeartbeatByIdRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*RecordActivityTaskHeartbeatByIdRequest*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidrequest.md)

Decodes a RecordActivityTaskHeartbeatByIdRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*RecordActivityTaskHeartbeatByIdRequest*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidrequest.md)

RecordActivityTaskHeartbeatByIdRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*RecordActivityTaskHeartbeatByIdRequest*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidrequest.md)

Decodes a RecordActivityTaskHeartbeatByIdRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*RecordActivityTaskHeartbeatByIdRequest*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidrequest.md)

RecordActivityTaskHeartbeatByIdRequest

___

### encode

▸ `Static`**encode**(`message`: [*IRecordActivityTaskHeartbeatByIdRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified RecordActivityTaskHeartbeatByIdRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRecordActivityTaskHeartbeatByIdRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidrequest.md) | RecordActivityTaskHeartbeatByIdRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IRecordActivityTaskHeartbeatByIdRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified RecordActivityTaskHeartbeatByIdRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRecordActivityTaskHeartbeatByIdRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidrequest.md) | RecordActivityTaskHeartbeatByIdRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*RecordActivityTaskHeartbeatByIdRequest*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidrequest.md)

Creates a RecordActivityTaskHeartbeatByIdRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*RecordActivityTaskHeartbeatByIdRequest*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidrequest.md)

RecordActivityTaskHeartbeatByIdRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*RecordActivityTaskHeartbeatByIdRequest*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidrequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a RecordActivityTaskHeartbeatByIdRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*RecordActivityTaskHeartbeatByIdRequest*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidrequest.md) | RecordActivityTaskHeartbeatByIdRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a RecordActivityTaskHeartbeatByIdRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
