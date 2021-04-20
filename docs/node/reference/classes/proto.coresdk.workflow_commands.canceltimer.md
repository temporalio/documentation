# Class: CancelTimer

[coresdk](../modules/proto.coresdk.md).[workflow_commands](../modules/proto.coresdk.workflow_commands.md).CancelTimer

Represents a CancelTimer.

## Implements

* [*ICancelTimer*](../interfaces/proto.coresdk.workflow_commands.icanceltimer.md)

## Table of contents

### Constructors

- [constructor](proto.coresdk.workflow_commands.canceltimer.md#constructor)

### Properties

- [timerId](proto.coresdk.workflow_commands.canceltimer.md#timerid)

### Methods

- [toJSON](proto.coresdk.workflow_commands.canceltimer.md#tojson)
- [create](proto.coresdk.workflow_commands.canceltimer.md#create)
- [decode](proto.coresdk.workflow_commands.canceltimer.md#decode)
- [decodeDelimited](proto.coresdk.workflow_commands.canceltimer.md#decodedelimited)
- [encode](proto.coresdk.workflow_commands.canceltimer.md#encode)
- [encodeDelimited](proto.coresdk.workflow_commands.canceltimer.md#encodedelimited)
- [fromObject](proto.coresdk.workflow_commands.canceltimer.md#fromobject)
- [toObject](proto.coresdk.workflow_commands.canceltimer.md#toobject)
- [verify](proto.coresdk.workflow_commands.canceltimer.md#verify)

## Constructors

### constructor

\+ **new CancelTimer**(`properties?`: [*ICancelTimer*](../interfaces/proto.coresdk.workflow_commands.icanceltimer.md)): [*CancelTimer*](proto.coresdk.workflow_commands.canceltimer.md)

Constructs a new CancelTimer.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ICancelTimer*](../interfaces/proto.coresdk.workflow_commands.icanceltimer.md) |

**Returns:** [*CancelTimer*](proto.coresdk.workflow_commands.canceltimer.md)

## Properties

### timerId

• **timerId**: *string*

CancelTimer timerId.

Implementation of: [ICancelTimer](../interfaces/proto.coresdk.workflow_commands.icanceltimer.md).[timerId](../interfaces/proto.coresdk.workflow_commands.icanceltimer.md#timerid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this CancelTimer to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ICancelTimer*](../interfaces/proto.coresdk.workflow_commands.icanceltimer.md)): [*CancelTimer*](proto.coresdk.workflow_commands.canceltimer.md)

Creates a new CancelTimer instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ICancelTimer*](../interfaces/proto.coresdk.workflow_commands.icanceltimer.md) |

**Returns:** [*CancelTimer*](proto.coresdk.workflow_commands.canceltimer.md)

CancelTimer instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*CancelTimer*](proto.coresdk.workflow_commands.canceltimer.md)

Decodes a CancelTimer message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*CancelTimer*](proto.coresdk.workflow_commands.canceltimer.md)

CancelTimer

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*CancelTimer*](proto.coresdk.workflow_commands.canceltimer.md)

Decodes a CancelTimer message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*CancelTimer*](proto.coresdk.workflow_commands.canceltimer.md)

CancelTimer

___

### encode

▸ `Static`**encode**(`message`: [*ICancelTimer*](../interfaces/proto.coresdk.workflow_commands.icanceltimer.md), `writer?`: *Writer*): *Writer*

Encodes the specified CancelTimer message. Does not implicitly [verify](proto.coresdk.workflow_commands.canceltimer.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ICancelTimer*](../interfaces/proto.coresdk.workflow_commands.icanceltimer.md) | CancelTimer message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ICancelTimer*](../interfaces/proto.coresdk.workflow_commands.icanceltimer.md), `writer?`: *Writer*): *Writer*

Encodes the specified CancelTimer message, length delimited. Does not implicitly [verify](proto.coresdk.workflow_commands.canceltimer.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ICancelTimer*](../interfaces/proto.coresdk.workflow_commands.icanceltimer.md) | CancelTimer message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*CancelTimer*](proto.coresdk.workflow_commands.canceltimer.md)

Creates a CancelTimer message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*CancelTimer*](proto.coresdk.workflow_commands.canceltimer.md)

CancelTimer

___

### toObject

▸ `Static`**toObject**(`message`: [*CancelTimer*](proto.coresdk.workflow_commands.canceltimer.md), `options?`: IConversionOptions): *object*

Creates a plain object from a CancelTimer message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*CancelTimer*](proto.coresdk.workflow_commands.canceltimer.md) | CancelTimer   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a CancelTimer message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
