# Class: Alert

[version](../modules/proto.temporal.api.version.md).[v1](../modules/proto.temporal.api.version.v1.md).Alert

Represents an Alert.

## Implements

* [*IAlert*](../interfaces/proto.temporal.api.version.v1.ialert.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.version.v1.alert.md#constructor)

### Properties

- [message](proto.temporal.api.version.v1.alert.md#message)
- [severity](proto.temporal.api.version.v1.alert.md#severity)

### Methods

- [toJSON](proto.temporal.api.version.v1.alert.md#tojson)
- [create](proto.temporal.api.version.v1.alert.md#create)
- [decode](proto.temporal.api.version.v1.alert.md#decode)
- [decodeDelimited](proto.temporal.api.version.v1.alert.md#decodedelimited)
- [encode](proto.temporal.api.version.v1.alert.md#encode)
- [encodeDelimited](proto.temporal.api.version.v1.alert.md#encodedelimited)
- [fromObject](proto.temporal.api.version.v1.alert.md#fromobject)
- [toObject](proto.temporal.api.version.v1.alert.md#toobject)
- [verify](proto.temporal.api.version.v1.alert.md#verify)

## Constructors

### constructor

\+ **new Alert**(`properties?`: [*IAlert*](../interfaces/proto.temporal.api.version.v1.ialert.md)): [*Alert*](proto.temporal.api.version.v1.alert.md)

Constructs a new Alert.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IAlert*](../interfaces/proto.temporal.api.version.v1.ialert.md) |

**Returns:** [*Alert*](proto.temporal.api.version.v1.alert.md)

## Properties

### message

• **message**: *string*

Alert message.

Implementation of: [IAlert](../interfaces/proto.temporal.api.version.v1.ialert.md).[message](../interfaces/proto.temporal.api.version.v1.ialert.md#message)

___

### severity

• **severity**: [*Severity*](../enums/proto.temporal.api.enums.v1.severity.md)

Alert severity.

Implementation of: [IAlert](../interfaces/proto.temporal.api.version.v1.ialert.md).[severity](../interfaces/proto.temporal.api.version.v1.ialert.md#severity)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this Alert to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IAlert*](../interfaces/proto.temporal.api.version.v1.ialert.md)): [*Alert*](proto.temporal.api.version.v1.alert.md)

Creates a new Alert instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IAlert*](../interfaces/proto.temporal.api.version.v1.ialert.md) |

**Returns:** [*Alert*](proto.temporal.api.version.v1.alert.md)

Alert instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*Alert*](proto.temporal.api.version.v1.alert.md)

Decodes an Alert message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*Alert*](proto.temporal.api.version.v1.alert.md)

Alert

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*Alert*](proto.temporal.api.version.v1.alert.md)

Decodes an Alert message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*Alert*](proto.temporal.api.version.v1.alert.md)

Alert

___

### encode

▸ `Static`**encode**(`message`: [*IAlert*](../interfaces/proto.temporal.api.version.v1.ialert.md), `writer?`: *Writer*): *Writer*

Encodes the specified Alert message. Does not implicitly [verify](proto.temporal.api.version.v1.alert.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IAlert*](../interfaces/proto.temporal.api.version.v1.ialert.md) | Alert message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IAlert*](../interfaces/proto.temporal.api.version.v1.ialert.md), `writer?`: *Writer*): *Writer*

Encodes the specified Alert message, length delimited. Does not implicitly [verify](proto.temporal.api.version.v1.alert.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IAlert*](../interfaces/proto.temporal.api.version.v1.ialert.md) | Alert message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*Alert*](proto.temporal.api.version.v1.alert.md)

Creates an Alert message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*Alert*](proto.temporal.api.version.v1.alert.md)

Alert

___

### toObject

▸ `Static`**toObject**(`message`: [*Alert*](proto.temporal.api.version.v1.alert.md), `options?`: IConversionOptions): *object*

Creates a plain object from an Alert message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*Alert*](proto.temporal.api.version.v1.alert.md) | Alert   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies an Alert message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
