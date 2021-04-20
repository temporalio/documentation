# Class: ActivityType

[common](../modules/proto.temporal.api.common.md).[v1](../modules/proto.temporal.api.common.v1.md).ActivityType

Represents an ActivityType.

## Implements

* [*IActivityType*](../interfaces/proto.temporal.api.common.v1.iactivitytype.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.common.v1.activitytype.md#constructor)

### Properties

- [name](proto.temporal.api.common.v1.activitytype.md#name)

### Methods

- [toJSON](proto.temporal.api.common.v1.activitytype.md#tojson)
- [create](proto.temporal.api.common.v1.activitytype.md#create)
- [decode](proto.temporal.api.common.v1.activitytype.md#decode)
- [decodeDelimited](proto.temporal.api.common.v1.activitytype.md#decodedelimited)
- [encode](proto.temporal.api.common.v1.activitytype.md#encode)
- [encodeDelimited](proto.temporal.api.common.v1.activitytype.md#encodedelimited)
- [fromObject](proto.temporal.api.common.v1.activitytype.md#fromobject)
- [toObject](proto.temporal.api.common.v1.activitytype.md#toobject)
- [verify](proto.temporal.api.common.v1.activitytype.md#verify)

## Constructors

### constructor

\+ **new ActivityType**(`properties?`: [*IActivityType*](../interfaces/proto.temporal.api.common.v1.iactivitytype.md)): [*ActivityType*](proto.temporal.api.common.v1.activitytype.md)

Constructs a new ActivityType.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IActivityType*](../interfaces/proto.temporal.api.common.v1.iactivitytype.md) |

**Returns:** [*ActivityType*](proto.temporal.api.common.v1.activitytype.md)

## Properties

### name

• **name**: *string*

ActivityType name.

Implementation of: [IActivityType](../interfaces/proto.temporal.api.common.v1.iactivitytype.md).[name](../interfaces/proto.temporal.api.common.v1.iactivitytype.md#name)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ActivityType to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IActivityType*](../interfaces/proto.temporal.api.common.v1.iactivitytype.md)): [*ActivityType*](proto.temporal.api.common.v1.activitytype.md)

Creates a new ActivityType instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IActivityType*](../interfaces/proto.temporal.api.common.v1.iactivitytype.md) |

**Returns:** [*ActivityType*](proto.temporal.api.common.v1.activitytype.md)

ActivityType instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ActivityType*](proto.temporal.api.common.v1.activitytype.md)

Decodes an ActivityType message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ActivityType*](proto.temporal.api.common.v1.activitytype.md)

ActivityType

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ActivityType*](proto.temporal.api.common.v1.activitytype.md)

Decodes an ActivityType message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ActivityType*](proto.temporal.api.common.v1.activitytype.md)

ActivityType

___

### encode

▸ `Static`**encode**(`message`: [*IActivityType*](../interfaces/proto.temporal.api.common.v1.iactivitytype.md), `writer?`: *Writer*): *Writer*

Encodes the specified ActivityType message. Does not implicitly [verify](proto.temporal.api.common.v1.activitytype.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IActivityType*](../interfaces/proto.temporal.api.common.v1.iactivitytype.md) | ActivityType message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IActivityType*](../interfaces/proto.temporal.api.common.v1.iactivitytype.md), `writer?`: *Writer*): *Writer*

Encodes the specified ActivityType message, length delimited. Does not implicitly [verify](proto.temporal.api.common.v1.activitytype.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IActivityType*](../interfaces/proto.temporal.api.common.v1.iactivitytype.md) | ActivityType message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ActivityType*](proto.temporal.api.common.v1.activitytype.md)

Creates an ActivityType message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ActivityType*](proto.temporal.api.common.v1.activitytype.md)

ActivityType

___

### toObject

▸ `Static`**toObject**(`message`: [*ActivityType*](proto.temporal.api.common.v1.activitytype.md), `options?`: IConversionOptions): *object*

Creates a plain object from an ActivityType message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ActivityType*](proto.temporal.api.common.v1.activitytype.md) | ActivityType   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an ActivityType message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
