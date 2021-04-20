# Class: PendingActivityInfo

[workflow](../modules/proto.temporal.api.workflow.md).[v1](../modules/proto.temporal.api.workflow.v1.md).PendingActivityInfo

Represents a PendingActivityInfo.

## Implements

* [*IPendingActivityInfo*](../interfaces/proto.temporal.api.workflow.v1.ipendingactivityinfo.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflow.v1.pendingactivityinfo.md#constructor)

### Properties

- [activityId](proto.temporal.api.workflow.v1.pendingactivityinfo.md#activityid)
- [activityType](proto.temporal.api.workflow.v1.pendingactivityinfo.md#activitytype)
- [attempt](proto.temporal.api.workflow.v1.pendingactivityinfo.md#attempt)
- [expirationTime](proto.temporal.api.workflow.v1.pendingactivityinfo.md#expirationtime)
- [heartbeatDetails](proto.temporal.api.workflow.v1.pendingactivityinfo.md#heartbeatdetails)
- [lastFailure](proto.temporal.api.workflow.v1.pendingactivityinfo.md#lastfailure)
- [lastHeartbeatTime](proto.temporal.api.workflow.v1.pendingactivityinfo.md#lastheartbeattime)
- [lastStartedTime](proto.temporal.api.workflow.v1.pendingactivityinfo.md#laststartedtime)
- [lastWorkerIdentity](proto.temporal.api.workflow.v1.pendingactivityinfo.md#lastworkeridentity)
- [maximumAttempts](proto.temporal.api.workflow.v1.pendingactivityinfo.md#maximumattempts)
- [scheduledTime](proto.temporal.api.workflow.v1.pendingactivityinfo.md#scheduledtime)
- [state](proto.temporal.api.workflow.v1.pendingactivityinfo.md#state)

### Methods

- [toJSON](proto.temporal.api.workflow.v1.pendingactivityinfo.md#tojson)
- [create](proto.temporal.api.workflow.v1.pendingactivityinfo.md#create)
- [decode](proto.temporal.api.workflow.v1.pendingactivityinfo.md#decode)
- [decodeDelimited](proto.temporal.api.workflow.v1.pendingactivityinfo.md#decodedelimited)
- [encode](proto.temporal.api.workflow.v1.pendingactivityinfo.md#encode)
- [encodeDelimited](proto.temporal.api.workflow.v1.pendingactivityinfo.md#encodedelimited)
- [fromObject](proto.temporal.api.workflow.v1.pendingactivityinfo.md#fromobject)
- [toObject](proto.temporal.api.workflow.v1.pendingactivityinfo.md#toobject)
- [verify](proto.temporal.api.workflow.v1.pendingactivityinfo.md#verify)

## Constructors

### constructor

\+ **new PendingActivityInfo**(`properties?`: [*IPendingActivityInfo*](../interfaces/proto.temporal.api.workflow.v1.ipendingactivityinfo.md)): [*PendingActivityInfo*](proto.temporal.api.workflow.v1.pendingactivityinfo.md)

Constructs a new PendingActivityInfo.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IPendingActivityInfo*](../interfaces/proto.temporal.api.workflow.v1.ipendingactivityinfo.md) |

**Returns:** [*PendingActivityInfo*](proto.temporal.api.workflow.v1.pendingactivityinfo.md)

## Properties

### activityId

• **activityId**: *string*

PendingActivityInfo activityId.

Implementation of: [IPendingActivityInfo](../interfaces/proto.temporal.api.workflow.v1.ipendingactivityinfo.md).[activityId](../interfaces/proto.temporal.api.workflow.v1.ipendingactivityinfo.md#activityid)

___

### activityType

• `Optional` **activityType**: *null* \| [*IActivityType*](../interfaces/proto.temporal.api.common.v1.iactivitytype.md)

PendingActivityInfo activityType.

Implementation of: [IPendingActivityInfo](../interfaces/proto.temporal.api.workflow.v1.ipendingactivityinfo.md).[activityType](../interfaces/proto.temporal.api.workflow.v1.ipendingactivityinfo.md#activitytype)

___

### attempt

• **attempt**: *number*

PendingActivityInfo attempt.

Implementation of: [IPendingActivityInfo](../interfaces/proto.temporal.api.workflow.v1.ipendingactivityinfo.md).[attempt](../interfaces/proto.temporal.api.workflow.v1.ipendingactivityinfo.md#attempt)

___

### expirationTime

• `Optional` **expirationTime**: *null* \| [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md)

PendingActivityInfo expirationTime.

Implementation of: [IPendingActivityInfo](../interfaces/proto.temporal.api.workflow.v1.ipendingactivityinfo.md).[expirationTime](../interfaces/proto.temporal.api.workflow.v1.ipendingactivityinfo.md#expirationtime)

___

### heartbeatDetails

• `Optional` **heartbeatDetails**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

PendingActivityInfo heartbeatDetails.

Implementation of: [IPendingActivityInfo](../interfaces/proto.temporal.api.workflow.v1.ipendingactivityinfo.md).[heartbeatDetails](../interfaces/proto.temporal.api.workflow.v1.ipendingactivityinfo.md#heartbeatdetails)

___

### lastFailure

• `Optional` **lastFailure**: *null* \| [*IFailure*](../interfaces/proto.temporal.api.failure.v1.ifailure.md)

PendingActivityInfo lastFailure.

Implementation of: [IPendingActivityInfo](../interfaces/proto.temporal.api.workflow.v1.ipendingactivityinfo.md).[lastFailure](../interfaces/proto.temporal.api.workflow.v1.ipendingactivityinfo.md#lastfailure)

___

### lastHeartbeatTime

• `Optional` **lastHeartbeatTime**: *null* \| [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md)

PendingActivityInfo lastHeartbeatTime.

Implementation of: [IPendingActivityInfo](../interfaces/proto.temporal.api.workflow.v1.ipendingactivityinfo.md).[lastHeartbeatTime](../interfaces/proto.temporal.api.workflow.v1.ipendingactivityinfo.md#lastheartbeattime)

___

### lastStartedTime

• `Optional` **lastStartedTime**: *null* \| [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md)

PendingActivityInfo lastStartedTime.

Implementation of: [IPendingActivityInfo](../interfaces/proto.temporal.api.workflow.v1.ipendingactivityinfo.md).[lastStartedTime](../interfaces/proto.temporal.api.workflow.v1.ipendingactivityinfo.md#laststartedtime)

___

### lastWorkerIdentity

• **lastWorkerIdentity**: *string*

PendingActivityInfo lastWorkerIdentity.

Implementation of: [IPendingActivityInfo](../interfaces/proto.temporal.api.workflow.v1.ipendingactivityinfo.md).[lastWorkerIdentity](../interfaces/proto.temporal.api.workflow.v1.ipendingactivityinfo.md#lastworkeridentity)

___

### maximumAttempts

• **maximumAttempts**: *number*

PendingActivityInfo maximumAttempts.

Implementation of: [IPendingActivityInfo](../interfaces/proto.temporal.api.workflow.v1.ipendingactivityinfo.md).[maximumAttempts](../interfaces/proto.temporal.api.workflow.v1.ipendingactivityinfo.md#maximumattempts)

___

### scheduledTime

• `Optional` **scheduledTime**: *null* \| [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md)

PendingActivityInfo scheduledTime.

Implementation of: [IPendingActivityInfo](../interfaces/proto.temporal.api.workflow.v1.ipendingactivityinfo.md).[scheduledTime](../interfaces/proto.temporal.api.workflow.v1.ipendingactivityinfo.md#scheduledtime)

___

### state

• **state**: [*PendingActivityState*](../enums/proto.temporal.api.enums.v1.pendingactivitystate.md)

PendingActivityInfo state.

Implementation of: [IPendingActivityInfo](../interfaces/proto.temporal.api.workflow.v1.ipendingactivityinfo.md).[state](../interfaces/proto.temporal.api.workflow.v1.ipendingactivityinfo.md#state)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this PendingActivityInfo to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IPendingActivityInfo*](../interfaces/proto.temporal.api.workflow.v1.ipendingactivityinfo.md)): [*PendingActivityInfo*](proto.temporal.api.workflow.v1.pendingactivityinfo.md)

Creates a new PendingActivityInfo instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IPendingActivityInfo*](../interfaces/proto.temporal.api.workflow.v1.ipendingactivityinfo.md) |

**Returns:** [*PendingActivityInfo*](proto.temporal.api.workflow.v1.pendingactivityinfo.md)

PendingActivityInfo instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*PendingActivityInfo*](proto.temporal.api.workflow.v1.pendingactivityinfo.md)

Decodes a PendingActivityInfo message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*PendingActivityInfo*](proto.temporal.api.workflow.v1.pendingactivityinfo.md)

PendingActivityInfo

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*PendingActivityInfo*](proto.temporal.api.workflow.v1.pendingactivityinfo.md)

Decodes a PendingActivityInfo message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*PendingActivityInfo*](proto.temporal.api.workflow.v1.pendingactivityinfo.md)

PendingActivityInfo

___

### encode

▸ `Static`**encode**(`message`: [*IPendingActivityInfo*](../interfaces/proto.temporal.api.workflow.v1.ipendingactivityinfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified PendingActivityInfo message. Does not implicitly [verify](proto.temporal.api.workflow.v1.pendingactivityinfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IPendingActivityInfo*](../interfaces/proto.temporal.api.workflow.v1.ipendingactivityinfo.md) | PendingActivityInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IPendingActivityInfo*](../interfaces/proto.temporal.api.workflow.v1.ipendingactivityinfo.md), `writer?`: *Writer*): *Writer*

Encodes the specified PendingActivityInfo message, length delimited. Does not implicitly [verify](proto.temporal.api.workflow.v1.pendingactivityinfo.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IPendingActivityInfo*](../interfaces/proto.temporal.api.workflow.v1.ipendingactivityinfo.md) | PendingActivityInfo message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*PendingActivityInfo*](proto.temporal.api.workflow.v1.pendingactivityinfo.md)

Creates a PendingActivityInfo message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*PendingActivityInfo*](proto.temporal.api.workflow.v1.pendingactivityinfo.md)

PendingActivityInfo

___

### toObject

▸ `Static`**toObject**(`message`: [*PendingActivityInfo*](proto.temporal.api.workflow.v1.pendingactivityinfo.md), `options?`: IConversionOptions): *object*

Creates a plain object from a PendingActivityInfo message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*PendingActivityInfo*](proto.temporal.api.workflow.v1.pendingactivityinfo.md) | PendingActivityInfo   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a PendingActivityInfo message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
