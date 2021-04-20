# Class: RequestActivityCancellation

[coresdk](../modules/proto.coresdk.md).[workflow_commands](../modules/proto.coresdk.workflow_commands.md).RequestActivityCancellation

Request cancellation of an activity from a workflow

## Implements

* [*IRequestActivityCancellation*](../interfaces/proto.coresdk.workflow_commands.irequestactivitycancellation.md)

## Table of contents

### Constructors

- [constructor](proto.coresdk.workflow_commands.requestactivitycancellation.md#constructor)

### Properties

- [activityId](proto.coresdk.workflow_commands.requestactivitycancellation.md#activityid)
- [reason](proto.coresdk.workflow_commands.requestactivitycancellation.md#reason)

### Methods

- [toJSON](proto.coresdk.workflow_commands.requestactivitycancellation.md#tojson)
- [create](proto.coresdk.workflow_commands.requestactivitycancellation.md#create)
- [decode](proto.coresdk.workflow_commands.requestactivitycancellation.md#decode)
- [decodeDelimited](proto.coresdk.workflow_commands.requestactivitycancellation.md#decodedelimited)
- [encode](proto.coresdk.workflow_commands.requestactivitycancellation.md#encode)
- [encodeDelimited](proto.coresdk.workflow_commands.requestactivitycancellation.md#encodedelimited)
- [fromObject](proto.coresdk.workflow_commands.requestactivitycancellation.md#fromobject)
- [toObject](proto.coresdk.workflow_commands.requestactivitycancellation.md#toobject)
- [verify](proto.coresdk.workflow_commands.requestactivitycancellation.md#verify)

## Constructors

### constructor

\+ **new RequestActivityCancellation**(`properties?`: [*IRequestActivityCancellation*](../interfaces/proto.coresdk.workflow_commands.irequestactivitycancellation.md)): [*RequestActivityCancellation*](proto.coresdk.workflow_commands.requestactivitycancellation.md)

Constructs a new RequestActivityCancellation.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRequestActivityCancellation*](../interfaces/proto.coresdk.workflow_commands.irequestactivitycancellation.md) |

**Returns:** [*RequestActivityCancellation*](proto.coresdk.workflow_commands.requestactivitycancellation.md)

## Properties

### activityId

• **activityId**: *string*

RequestActivityCancellation activityId.

Implementation of: [IRequestActivityCancellation](../interfaces/proto.coresdk.workflow_commands.irequestactivitycancellation.md).[activityId](../interfaces/proto.coresdk.workflow_commands.irequestactivitycancellation.md#activityid)

___

### reason

• **reason**: *string*

RequestActivityCancellation reason.

Implementation of: [IRequestActivityCancellation](../interfaces/proto.coresdk.workflow_commands.irequestactivitycancellation.md).[reason](../interfaces/proto.coresdk.workflow_commands.irequestactivitycancellation.md#reason)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this RequestActivityCancellation to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IRequestActivityCancellation*](../interfaces/proto.coresdk.workflow_commands.irequestactivitycancellation.md)): [*RequestActivityCancellation*](proto.coresdk.workflow_commands.requestactivitycancellation.md)

Creates a new RequestActivityCancellation instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRequestActivityCancellation*](../interfaces/proto.coresdk.workflow_commands.irequestactivitycancellation.md) |

**Returns:** [*RequestActivityCancellation*](proto.coresdk.workflow_commands.requestactivitycancellation.md)

RequestActivityCancellation instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*RequestActivityCancellation*](proto.coresdk.workflow_commands.requestactivitycancellation.md)

Decodes a RequestActivityCancellation message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*RequestActivityCancellation*](proto.coresdk.workflow_commands.requestactivitycancellation.md)

RequestActivityCancellation

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*RequestActivityCancellation*](proto.coresdk.workflow_commands.requestactivitycancellation.md)

Decodes a RequestActivityCancellation message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*RequestActivityCancellation*](proto.coresdk.workflow_commands.requestactivitycancellation.md)

RequestActivityCancellation

___

### encode

▸ `Static`**encode**(`message`: [*IRequestActivityCancellation*](../interfaces/proto.coresdk.workflow_commands.irequestactivitycancellation.md), `writer?`: *Writer*): *Writer*

Encodes the specified RequestActivityCancellation message. Does not implicitly [verify](proto.coresdk.workflow_commands.requestactivitycancellation.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRequestActivityCancellation*](../interfaces/proto.coresdk.workflow_commands.irequestactivitycancellation.md) | RequestActivityCancellation message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IRequestActivityCancellation*](../interfaces/proto.coresdk.workflow_commands.irequestactivitycancellation.md), `writer?`: *Writer*): *Writer*

Encodes the specified RequestActivityCancellation message, length delimited. Does not implicitly [verify](proto.coresdk.workflow_commands.requestactivitycancellation.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRequestActivityCancellation*](../interfaces/proto.coresdk.workflow_commands.irequestactivitycancellation.md) | RequestActivityCancellation message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*RequestActivityCancellation*](proto.coresdk.workflow_commands.requestactivitycancellation.md)

Creates a RequestActivityCancellation message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*RequestActivityCancellation*](proto.coresdk.workflow_commands.requestactivitycancellation.md)

RequestActivityCancellation

___

### toObject

▸ `Static`**toObject**(`message`: [*RequestActivityCancellation*](proto.coresdk.workflow_commands.requestactivitycancellation.md), `options?`: IConversionOptions): *object*

Creates a plain object from a RequestActivityCancellation message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*RequestActivityCancellation*](proto.coresdk.workflow_commands.requestactivitycancellation.md) | RequestActivityCancellation   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a RequestActivityCancellation message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
