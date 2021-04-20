# Class: RequestCancelActivity

[coresdk](../modules/proto.coresdk.md).[workflow_commands](../modules/proto.coresdk.workflow_commands.md).RequestCancelActivity

Represents a RequestCancelActivity.

## Implements

* [*IRequestCancelActivity*](../interfaces/proto.coresdk.workflow_commands.irequestcancelactivity.md)

## Table of contents

### Constructors

- [constructor](proto.coresdk.workflow_commands.requestcancelactivity.md#constructor)

### Properties

- [activityId](proto.coresdk.workflow_commands.requestcancelactivity.md#activityid)

### Methods

- [toJSON](proto.coresdk.workflow_commands.requestcancelactivity.md#tojson)
- [create](proto.coresdk.workflow_commands.requestcancelactivity.md#create)
- [decode](proto.coresdk.workflow_commands.requestcancelactivity.md#decode)
- [decodeDelimited](proto.coresdk.workflow_commands.requestcancelactivity.md#decodedelimited)
- [encode](proto.coresdk.workflow_commands.requestcancelactivity.md#encode)
- [encodeDelimited](proto.coresdk.workflow_commands.requestcancelactivity.md#encodedelimited)
- [fromObject](proto.coresdk.workflow_commands.requestcancelactivity.md#fromobject)
- [toObject](proto.coresdk.workflow_commands.requestcancelactivity.md#toobject)
- [verify](proto.coresdk.workflow_commands.requestcancelactivity.md#verify)

## Constructors

### constructor

\+ **new RequestCancelActivity**(`properties?`: [*IRequestCancelActivity*](../interfaces/proto.coresdk.workflow_commands.irequestcancelactivity.md)): [*RequestCancelActivity*](proto.coresdk.workflow_commands.requestcancelactivity.md)

Constructs a new RequestCancelActivity.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRequestCancelActivity*](../interfaces/proto.coresdk.workflow_commands.irequestcancelactivity.md) |

**Returns:** [*RequestCancelActivity*](proto.coresdk.workflow_commands.requestcancelactivity.md)

## Properties

### activityId

• **activityId**: *string*

RequestCancelActivity activityId.

Implementation of: [IRequestCancelActivity](../interfaces/proto.coresdk.workflow_commands.irequestcancelactivity.md).[activityId](../interfaces/proto.coresdk.workflow_commands.irequestcancelactivity.md#activityid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this RequestCancelActivity to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IRequestCancelActivity*](../interfaces/proto.coresdk.workflow_commands.irequestcancelactivity.md)): [*RequestCancelActivity*](proto.coresdk.workflow_commands.requestcancelactivity.md)

Creates a new RequestCancelActivity instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRequestCancelActivity*](../interfaces/proto.coresdk.workflow_commands.irequestcancelactivity.md) |

**Returns:** [*RequestCancelActivity*](proto.coresdk.workflow_commands.requestcancelactivity.md)

RequestCancelActivity instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*RequestCancelActivity*](proto.coresdk.workflow_commands.requestcancelactivity.md)

Decodes a RequestCancelActivity message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*RequestCancelActivity*](proto.coresdk.workflow_commands.requestcancelactivity.md)

RequestCancelActivity

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*RequestCancelActivity*](proto.coresdk.workflow_commands.requestcancelactivity.md)

Decodes a RequestCancelActivity message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*RequestCancelActivity*](proto.coresdk.workflow_commands.requestcancelactivity.md)

RequestCancelActivity

___

### encode

▸ `Static`**encode**(`message`: [*IRequestCancelActivity*](../interfaces/proto.coresdk.workflow_commands.irequestcancelactivity.md), `writer?`: *Writer*): *Writer*

Encodes the specified RequestCancelActivity message. Does not implicitly [verify](proto.coresdk.workflow_commands.requestcancelactivity.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRequestCancelActivity*](../interfaces/proto.coresdk.workflow_commands.irequestcancelactivity.md) | RequestCancelActivity message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IRequestCancelActivity*](../interfaces/proto.coresdk.workflow_commands.irequestcancelactivity.md), `writer?`: *Writer*): *Writer*

Encodes the specified RequestCancelActivity message, length delimited. Does not implicitly [verify](proto.coresdk.workflow_commands.requestcancelactivity.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRequestCancelActivity*](../interfaces/proto.coresdk.workflow_commands.irequestcancelactivity.md) | RequestCancelActivity message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*RequestCancelActivity*](proto.coresdk.workflow_commands.requestcancelactivity.md)

Creates a RequestCancelActivity message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*RequestCancelActivity*](proto.coresdk.workflow_commands.requestcancelactivity.md)

RequestCancelActivity

___

### toObject

▸ `Static`**toObject**(`message`: [*RequestCancelActivity*](proto.coresdk.workflow_commands.requestcancelactivity.md), `options?`: IConversionOptions): *object*

Creates a plain object from a RequestCancelActivity message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*RequestCancelActivity*](proto.coresdk.workflow_commands.requestcancelactivity.md) | RequestCancelActivity   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a RequestCancelActivity message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
