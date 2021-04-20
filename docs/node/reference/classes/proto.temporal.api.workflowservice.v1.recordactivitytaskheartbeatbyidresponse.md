# Class: RecordActivityTaskHeartbeatByIdResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).RecordActivityTaskHeartbeatByIdResponse

Represents a RecordActivityTaskHeartbeatByIdResponse.

## Implements

* [*IRecordActivityTaskHeartbeatByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidresponse.md#constructor)

### Properties

- [cancelRequested](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidresponse.md#cancelrequested)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidresponse.md#verify)

## Constructors

### constructor

\+ **new RecordActivityTaskHeartbeatByIdResponse**(`properties?`: [*IRecordActivityTaskHeartbeatByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidresponse.md)): [*RecordActivityTaskHeartbeatByIdResponse*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidresponse.md)

Constructs a new RecordActivityTaskHeartbeatByIdResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRecordActivityTaskHeartbeatByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidresponse.md) |

**Returns:** [*RecordActivityTaskHeartbeatByIdResponse*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidresponse.md)

## Properties

### cancelRequested

• **cancelRequested**: *boolean*

RecordActivityTaskHeartbeatByIdResponse cancelRequested.

Implementation of: [IRecordActivityTaskHeartbeatByIdResponse](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidresponse.md).[cancelRequested](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidresponse.md#cancelrequested)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this RecordActivityTaskHeartbeatByIdResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IRecordActivityTaskHeartbeatByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidresponse.md)): [*RecordActivityTaskHeartbeatByIdResponse*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidresponse.md)

Creates a new RecordActivityTaskHeartbeatByIdResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRecordActivityTaskHeartbeatByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidresponse.md) |

**Returns:** [*RecordActivityTaskHeartbeatByIdResponse*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidresponse.md)

RecordActivityTaskHeartbeatByIdResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*RecordActivityTaskHeartbeatByIdResponse*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidresponse.md)

Decodes a RecordActivityTaskHeartbeatByIdResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*RecordActivityTaskHeartbeatByIdResponse*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidresponse.md)

RecordActivityTaskHeartbeatByIdResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*RecordActivityTaskHeartbeatByIdResponse*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidresponse.md)

Decodes a RecordActivityTaskHeartbeatByIdResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*RecordActivityTaskHeartbeatByIdResponse*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidresponse.md)

RecordActivityTaskHeartbeatByIdResponse

___

### encode

▸ `Static`**encode**(`message`: [*IRecordActivityTaskHeartbeatByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified RecordActivityTaskHeartbeatByIdResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRecordActivityTaskHeartbeatByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidresponse.md) | RecordActivityTaskHeartbeatByIdResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IRecordActivityTaskHeartbeatByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified RecordActivityTaskHeartbeatByIdResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRecordActivityTaskHeartbeatByIdResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatbyidresponse.md) | RecordActivityTaskHeartbeatByIdResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*RecordActivityTaskHeartbeatByIdResponse*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidresponse.md)

Creates a RecordActivityTaskHeartbeatByIdResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*RecordActivityTaskHeartbeatByIdResponse*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidresponse.md)

RecordActivityTaskHeartbeatByIdResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*RecordActivityTaskHeartbeatByIdResponse*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a RecordActivityTaskHeartbeatByIdResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*RecordActivityTaskHeartbeatByIdResponse*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatbyidresponse.md) | RecordActivityTaskHeartbeatByIdResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a RecordActivityTaskHeartbeatByIdResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
