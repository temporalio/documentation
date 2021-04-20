# Class: RecordActivityTaskHeartbeatResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).RecordActivityTaskHeartbeatResponse

Represents a RecordActivityTaskHeartbeatResponse.

## Implements

* [*IRecordActivityTaskHeartbeatResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatresponse.md#constructor)

### Properties

- [cancelRequested](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatresponse.md#cancelrequested)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatresponse.md#verify)

## Constructors

### constructor

\+ **new RecordActivityTaskHeartbeatResponse**(`properties?`: [*IRecordActivityTaskHeartbeatResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatresponse.md)): [*RecordActivityTaskHeartbeatResponse*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatresponse.md)

Constructs a new RecordActivityTaskHeartbeatResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRecordActivityTaskHeartbeatResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatresponse.md) |

**Returns:** [*RecordActivityTaskHeartbeatResponse*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatresponse.md)

## Properties

### cancelRequested

• **cancelRequested**: *boolean*

RecordActivityTaskHeartbeatResponse cancelRequested.

Implementation of: [IRecordActivityTaskHeartbeatResponse](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatresponse.md).[cancelRequested](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatresponse.md#cancelrequested)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this RecordActivityTaskHeartbeatResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IRecordActivityTaskHeartbeatResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatresponse.md)): [*RecordActivityTaskHeartbeatResponse*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatresponse.md)

Creates a new RecordActivityTaskHeartbeatResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRecordActivityTaskHeartbeatResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatresponse.md) |

**Returns:** [*RecordActivityTaskHeartbeatResponse*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatresponse.md)

RecordActivityTaskHeartbeatResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*RecordActivityTaskHeartbeatResponse*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatresponse.md)

Decodes a RecordActivityTaskHeartbeatResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*RecordActivityTaskHeartbeatResponse*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatresponse.md)

RecordActivityTaskHeartbeatResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*RecordActivityTaskHeartbeatResponse*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatresponse.md)

Decodes a RecordActivityTaskHeartbeatResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*RecordActivityTaskHeartbeatResponse*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatresponse.md)

RecordActivityTaskHeartbeatResponse

___

### encode

▸ `Static`**encode**(`message`: [*IRecordActivityTaskHeartbeatResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified RecordActivityTaskHeartbeatResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRecordActivityTaskHeartbeatResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatresponse.md) | RecordActivityTaskHeartbeatResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IRecordActivityTaskHeartbeatResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified RecordActivityTaskHeartbeatResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRecordActivityTaskHeartbeatResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irecordactivitytaskheartbeatresponse.md) | RecordActivityTaskHeartbeatResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*RecordActivityTaskHeartbeatResponse*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatresponse.md)

Creates a RecordActivityTaskHeartbeatResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*RecordActivityTaskHeartbeatResponse*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatresponse.md)

RecordActivityTaskHeartbeatResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*RecordActivityTaskHeartbeatResponse*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a RecordActivityTaskHeartbeatResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*RecordActivityTaskHeartbeatResponse*](proto.temporal.api.workflowservice.v1.recordactivitytaskheartbeatresponse.md) | RecordActivityTaskHeartbeatResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a RecordActivityTaskHeartbeatResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
