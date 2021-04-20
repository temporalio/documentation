# Class: StartTimeFilter

[filter](../modules/proto.temporal.api.filter.md).[v1](../modules/proto.temporal.api.filter.v1.md).StartTimeFilter

Represents a StartTimeFilter.

## Implements

* [*IStartTimeFilter*](../interfaces/proto.temporal.api.filter.v1.istarttimefilter.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.filter.v1.starttimefilter.md#constructor)

### Properties

- [earliestTime](proto.temporal.api.filter.v1.starttimefilter.md#earliesttime)
- [latestTime](proto.temporal.api.filter.v1.starttimefilter.md#latesttime)

### Methods

- [toJSON](proto.temporal.api.filter.v1.starttimefilter.md#tojson)
- [create](proto.temporal.api.filter.v1.starttimefilter.md#create)
- [decode](proto.temporal.api.filter.v1.starttimefilter.md#decode)
- [decodeDelimited](proto.temporal.api.filter.v1.starttimefilter.md#decodedelimited)
- [encode](proto.temporal.api.filter.v1.starttimefilter.md#encode)
- [encodeDelimited](proto.temporal.api.filter.v1.starttimefilter.md#encodedelimited)
- [fromObject](proto.temporal.api.filter.v1.starttimefilter.md#fromobject)
- [toObject](proto.temporal.api.filter.v1.starttimefilter.md#toobject)
- [verify](proto.temporal.api.filter.v1.starttimefilter.md#verify)

## Constructors

### constructor

\+ **new StartTimeFilter**(`properties?`: [*IStartTimeFilter*](../interfaces/proto.temporal.api.filter.v1.istarttimefilter.md)): [*StartTimeFilter*](proto.temporal.api.filter.v1.starttimefilter.md)

Constructs a new StartTimeFilter.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IStartTimeFilter*](../interfaces/proto.temporal.api.filter.v1.istarttimefilter.md) |

**Returns:** [*StartTimeFilter*](proto.temporal.api.filter.v1.starttimefilter.md)

## Properties

### earliestTime

• `Optional` **earliestTime**: *null* \| [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md)

StartTimeFilter earliestTime.

Implementation of: [IStartTimeFilter](../interfaces/proto.temporal.api.filter.v1.istarttimefilter.md).[earliestTime](../interfaces/proto.temporal.api.filter.v1.istarttimefilter.md#earliesttime)

___

### latestTime

• `Optional` **latestTime**: *null* \| [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md)

StartTimeFilter latestTime.

Implementation of: [IStartTimeFilter](../interfaces/proto.temporal.api.filter.v1.istarttimefilter.md).[latestTime](../interfaces/proto.temporal.api.filter.v1.istarttimefilter.md#latesttime)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this StartTimeFilter to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IStartTimeFilter*](../interfaces/proto.temporal.api.filter.v1.istarttimefilter.md)): [*StartTimeFilter*](proto.temporal.api.filter.v1.starttimefilter.md)

Creates a new StartTimeFilter instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IStartTimeFilter*](../interfaces/proto.temporal.api.filter.v1.istarttimefilter.md) |

**Returns:** [*StartTimeFilter*](proto.temporal.api.filter.v1.starttimefilter.md)

StartTimeFilter instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*StartTimeFilter*](proto.temporal.api.filter.v1.starttimefilter.md)

Decodes a StartTimeFilter message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*StartTimeFilter*](proto.temporal.api.filter.v1.starttimefilter.md)

StartTimeFilter

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*StartTimeFilter*](proto.temporal.api.filter.v1.starttimefilter.md)

Decodes a StartTimeFilter message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*StartTimeFilter*](proto.temporal.api.filter.v1.starttimefilter.md)

StartTimeFilter

___

### encode

▸ `Static`**encode**(`message`: [*IStartTimeFilter*](../interfaces/proto.temporal.api.filter.v1.istarttimefilter.md), `writer?`: *Writer*): *Writer*

Encodes the specified StartTimeFilter message. Does not implicitly [verify](proto.temporal.api.filter.v1.starttimefilter.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IStartTimeFilter*](../interfaces/proto.temporal.api.filter.v1.istarttimefilter.md) | StartTimeFilter message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IStartTimeFilter*](../interfaces/proto.temporal.api.filter.v1.istarttimefilter.md), `writer?`: *Writer*): *Writer*

Encodes the specified StartTimeFilter message, length delimited. Does not implicitly [verify](proto.temporal.api.filter.v1.starttimefilter.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IStartTimeFilter*](../interfaces/proto.temporal.api.filter.v1.istarttimefilter.md) | StartTimeFilter message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*StartTimeFilter*](proto.temporal.api.filter.v1.starttimefilter.md)

Creates a StartTimeFilter message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*StartTimeFilter*](proto.temporal.api.filter.v1.starttimefilter.md)

StartTimeFilter

___

### toObject

▸ `Static`**toObject**(`message`: [*StartTimeFilter*](proto.temporal.api.filter.v1.starttimefilter.md), `options?`: IConversionOptions): *object*

Creates a plain object from a StartTimeFilter message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*StartTimeFilter*](proto.temporal.api.filter.v1.starttimefilter.md) | StartTimeFilter   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a StartTimeFilter message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
