# Class: StartTimer

[coresdk](../modules/proto.coresdk.md).[workflow_commands](../modules/proto.coresdk.workflow_commands.md).StartTimer

Represents a StartTimer.

## Implements

* [*IStartTimer*](../interfaces/proto.coresdk.workflow_commands.istarttimer.md)

## Table of contents

### Constructors

- [constructor](proto.coresdk.workflow_commands.starttimer.md#constructor)

### Properties

- [startToFireTimeout](proto.coresdk.workflow_commands.starttimer.md#starttofiretimeout)
- [timerId](proto.coresdk.workflow_commands.starttimer.md#timerid)

### Methods

- [toJSON](proto.coresdk.workflow_commands.starttimer.md#tojson)
- [create](proto.coresdk.workflow_commands.starttimer.md#create)
- [decode](proto.coresdk.workflow_commands.starttimer.md#decode)
- [decodeDelimited](proto.coresdk.workflow_commands.starttimer.md#decodedelimited)
- [encode](proto.coresdk.workflow_commands.starttimer.md#encode)
- [encodeDelimited](proto.coresdk.workflow_commands.starttimer.md#encodedelimited)
- [fromObject](proto.coresdk.workflow_commands.starttimer.md#fromobject)
- [toObject](proto.coresdk.workflow_commands.starttimer.md#toobject)
- [verify](proto.coresdk.workflow_commands.starttimer.md#verify)

## Constructors

### constructor

\+ **new StartTimer**(`properties?`: [*IStartTimer*](../interfaces/proto.coresdk.workflow_commands.istarttimer.md)): [*StartTimer*](proto.coresdk.workflow_commands.starttimer.md)

Constructs a new StartTimer.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IStartTimer*](../interfaces/proto.coresdk.workflow_commands.istarttimer.md) |

**Returns:** [*StartTimer*](proto.coresdk.workflow_commands.starttimer.md)

## Properties

### startToFireTimeout

• `Optional` **startToFireTimeout**: *null* \| [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)

StartTimer startToFireTimeout.

Implementation of: [IStartTimer](../interfaces/proto.coresdk.workflow_commands.istarttimer.md).[startToFireTimeout](../interfaces/proto.coresdk.workflow_commands.istarttimer.md#starttofiretimeout)

___

### timerId

• **timerId**: *string*

StartTimer timerId.

Implementation of: [IStartTimer](../interfaces/proto.coresdk.workflow_commands.istarttimer.md).[timerId](../interfaces/proto.coresdk.workflow_commands.istarttimer.md#timerid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this StartTimer to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IStartTimer*](../interfaces/proto.coresdk.workflow_commands.istarttimer.md)): [*StartTimer*](proto.coresdk.workflow_commands.starttimer.md)

Creates a new StartTimer instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IStartTimer*](../interfaces/proto.coresdk.workflow_commands.istarttimer.md) |

**Returns:** [*StartTimer*](proto.coresdk.workflow_commands.starttimer.md)

StartTimer instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*StartTimer*](proto.coresdk.workflow_commands.starttimer.md)

Decodes a StartTimer message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*StartTimer*](proto.coresdk.workflow_commands.starttimer.md)

StartTimer

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*StartTimer*](proto.coresdk.workflow_commands.starttimer.md)

Decodes a StartTimer message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*StartTimer*](proto.coresdk.workflow_commands.starttimer.md)

StartTimer

___

### encode

▸ `Static`**encode**(`message`: [*IStartTimer*](../interfaces/proto.coresdk.workflow_commands.istarttimer.md), `writer?`: *Writer*): *Writer*

Encodes the specified StartTimer message. Does not implicitly [verify](proto.coresdk.workflow_commands.starttimer.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IStartTimer*](../interfaces/proto.coresdk.workflow_commands.istarttimer.md) | StartTimer message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IStartTimer*](../interfaces/proto.coresdk.workflow_commands.istarttimer.md), `writer?`: *Writer*): *Writer*

Encodes the specified StartTimer message, length delimited. Does not implicitly [verify](proto.coresdk.workflow_commands.starttimer.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IStartTimer*](../interfaces/proto.coresdk.workflow_commands.istarttimer.md) | StartTimer message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*StartTimer*](proto.coresdk.workflow_commands.starttimer.md)

Creates a StartTimer message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*StartTimer*](proto.coresdk.workflow_commands.starttimer.md)

StartTimer

___

### toObject

▸ `Static`**toObject**(`message`: [*StartTimer*](proto.coresdk.workflow_commands.starttimer.md), `options?`: IConversionOptions): *object*

Creates a plain object from a StartTimer message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*StartTimer*](proto.coresdk.workflow_commands.starttimer.md) | StartTimer   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a StartTimer message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
