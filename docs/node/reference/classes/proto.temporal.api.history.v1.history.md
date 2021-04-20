# Class: History

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).History

Represents a History.

## Implements

* [*IHistory*](../interfaces/proto.temporal.api.history.v1.ihistory.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.history.md#constructor)

### Properties

- [events](proto.temporal.api.history.v1.history.md#events)

### Methods

- [toJSON](proto.temporal.api.history.v1.history.md#tojson)
- [create](proto.temporal.api.history.v1.history.md#create)
- [decode](proto.temporal.api.history.v1.history.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.history.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.history.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.history.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.history.md#fromobject)
- [toObject](proto.temporal.api.history.v1.history.md#toobject)
- [verify](proto.temporal.api.history.v1.history.md#verify)

## Constructors

### constructor

\+ **new History**(`properties?`: [*IHistory*](../interfaces/proto.temporal.api.history.v1.ihistory.md)): [*History*](proto.temporal.api.history.v1.history.md)

Constructs a new History.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IHistory*](../interfaces/proto.temporal.api.history.v1.ihistory.md) |

**Returns:** [*History*](proto.temporal.api.history.v1.history.md)

## Properties

### events

• **events**: [*IHistoryEvent*](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md)[]

History events.

Implementation of: [IHistory](../interfaces/proto.temporal.api.history.v1.ihistory.md).[events](../interfaces/proto.temporal.api.history.v1.ihistory.md#events)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this History to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IHistory*](../interfaces/proto.temporal.api.history.v1.ihistory.md)): [*History*](proto.temporal.api.history.v1.history.md)

Creates a new History instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IHistory*](../interfaces/proto.temporal.api.history.v1.ihistory.md) |

**Returns:** [*History*](proto.temporal.api.history.v1.history.md)

History instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*History*](proto.temporal.api.history.v1.history.md)

Decodes a History message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*History*](proto.temporal.api.history.v1.history.md)

History

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*History*](proto.temporal.api.history.v1.history.md)

Decodes a History message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*History*](proto.temporal.api.history.v1.history.md)

History

___

### encode

▸ `Static`**encode**(`message`: [*IHistory*](../interfaces/proto.temporal.api.history.v1.ihistory.md), `writer?`: *Writer*): *Writer*

Encodes the specified History message. Does not implicitly [verify](proto.temporal.api.history.v1.history.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IHistory*](../interfaces/proto.temporal.api.history.v1.ihistory.md) | History message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IHistory*](../interfaces/proto.temporal.api.history.v1.ihistory.md), `writer?`: *Writer*): *Writer*

Encodes the specified History message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.history.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IHistory*](../interfaces/proto.temporal.api.history.v1.ihistory.md) | History message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*History*](proto.temporal.api.history.v1.history.md)

Creates a History message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*History*](proto.temporal.api.history.v1.history.md)

History

___

### toObject

▸ `Static`**toObject**(`message`: [*History*](proto.temporal.api.history.v1.history.md), `options?`: IConversionOptions): *object*

Creates a plain object from a History message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*History*](proto.temporal.api.history.v1.history.md) | History   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a History message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
