# Class: FireTimer

[coresdk](../modules/proto.coresdk.md).[workflow_activation](../modules/proto.coresdk.workflow_activation.md).FireTimer

Notify a workflow that a timer has fired

## Implements

* [*IFireTimer*](../interfaces/proto.coresdk.workflow_activation.ifiretimer.md)

## Table of contents

### Constructors

- [constructor](proto.coresdk.workflow_activation.firetimer.md#constructor)

### Properties

- [timerId](proto.coresdk.workflow_activation.firetimer.md#timerid)

### Methods

- [toJSON](proto.coresdk.workflow_activation.firetimer.md#tojson)
- [create](proto.coresdk.workflow_activation.firetimer.md#create)
- [decode](proto.coresdk.workflow_activation.firetimer.md#decode)
- [decodeDelimited](proto.coresdk.workflow_activation.firetimer.md#decodedelimited)
- [encode](proto.coresdk.workflow_activation.firetimer.md#encode)
- [encodeDelimited](proto.coresdk.workflow_activation.firetimer.md#encodedelimited)
- [fromObject](proto.coresdk.workflow_activation.firetimer.md#fromobject)
- [toObject](proto.coresdk.workflow_activation.firetimer.md#toobject)
- [verify](proto.coresdk.workflow_activation.firetimer.md#verify)

## Constructors

### constructor

\+ **new FireTimer**(`properties?`: [*IFireTimer*](../interfaces/proto.coresdk.workflow_activation.ifiretimer.md)): [*FireTimer*](proto.coresdk.workflow_activation.firetimer.md)

Constructs a new FireTimer.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IFireTimer*](../interfaces/proto.coresdk.workflow_activation.ifiretimer.md) |

**Returns:** [*FireTimer*](proto.coresdk.workflow_activation.firetimer.md)

## Properties

### timerId

• **timerId**: *string*

FireTimer timerId.

Implementation of: [IFireTimer](../interfaces/proto.coresdk.workflow_activation.ifiretimer.md).[timerId](../interfaces/proto.coresdk.workflow_activation.ifiretimer.md#timerid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this FireTimer to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IFireTimer*](../interfaces/proto.coresdk.workflow_activation.ifiretimer.md)): [*FireTimer*](proto.coresdk.workflow_activation.firetimer.md)

Creates a new FireTimer instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IFireTimer*](../interfaces/proto.coresdk.workflow_activation.ifiretimer.md) |

**Returns:** [*FireTimer*](proto.coresdk.workflow_activation.firetimer.md)

FireTimer instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*FireTimer*](proto.coresdk.workflow_activation.firetimer.md)

Decodes a FireTimer message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*FireTimer*](proto.coresdk.workflow_activation.firetimer.md)

FireTimer

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*FireTimer*](proto.coresdk.workflow_activation.firetimer.md)

Decodes a FireTimer message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*FireTimer*](proto.coresdk.workflow_activation.firetimer.md)

FireTimer

___

### encode

▸ `Static`**encode**(`message`: [*IFireTimer*](../interfaces/proto.coresdk.workflow_activation.ifiretimer.md), `writer?`: *Writer*): *Writer*

Encodes the specified FireTimer message. Does not implicitly [verify](proto.coresdk.workflow_activation.firetimer.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IFireTimer*](../interfaces/proto.coresdk.workflow_activation.ifiretimer.md) | FireTimer message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IFireTimer*](../interfaces/proto.coresdk.workflow_activation.ifiretimer.md), `writer?`: *Writer*): *Writer*

Encodes the specified FireTimer message, length delimited. Does not implicitly [verify](proto.coresdk.workflow_activation.firetimer.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IFireTimer*](../interfaces/proto.coresdk.workflow_activation.ifiretimer.md) | FireTimer message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*FireTimer*](proto.coresdk.workflow_activation.firetimer.md)

Creates a FireTimer message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*FireTimer*](proto.coresdk.workflow_activation.firetimer.md)

FireTimer

___

### toObject

▸ `Static`**toObject**(`message`: [*FireTimer*](proto.coresdk.workflow_activation.firetimer.md), `options?`: IConversionOptions): *object*

Creates a plain object from a FireTimer message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*FireTimer*](proto.coresdk.workflow_activation.firetimer.md) | FireTimer   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a FireTimer message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
