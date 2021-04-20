# Class: RequestCancelActivityTaskCommandAttributes

[command](../modules/proto.temporal.api.command.md).[v1](../modules/proto.temporal.api.command.v1.md).RequestCancelActivityTaskCommandAttributes

Represents a RequestCancelActivityTaskCommandAttributes.

## Implements

* [*IRequestCancelActivityTaskCommandAttributes*](../interfaces/proto.temporal.api.command.v1.irequestcancelactivitytaskcommandattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.command.v1.requestcancelactivitytaskcommandattributes.md#constructor)

### Properties

- [scheduledEventId](proto.temporal.api.command.v1.requestcancelactivitytaskcommandattributes.md#scheduledeventid)

### Methods

- [toJSON](proto.temporal.api.command.v1.requestcancelactivitytaskcommandattributes.md#tojson)
- [create](proto.temporal.api.command.v1.requestcancelactivitytaskcommandattributes.md#create)
- [decode](proto.temporal.api.command.v1.requestcancelactivitytaskcommandattributes.md#decode)
- [decodeDelimited](proto.temporal.api.command.v1.requestcancelactivitytaskcommandattributes.md#decodedelimited)
- [encode](proto.temporal.api.command.v1.requestcancelactivitytaskcommandattributes.md#encode)
- [encodeDelimited](proto.temporal.api.command.v1.requestcancelactivitytaskcommandattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.command.v1.requestcancelactivitytaskcommandattributes.md#fromobject)
- [toObject](proto.temporal.api.command.v1.requestcancelactivitytaskcommandattributes.md#toobject)
- [verify](proto.temporal.api.command.v1.requestcancelactivitytaskcommandattributes.md#verify)

## Constructors

### constructor

\+ **new RequestCancelActivityTaskCommandAttributes**(`properties?`: [*IRequestCancelActivityTaskCommandAttributes*](../interfaces/proto.temporal.api.command.v1.irequestcancelactivitytaskcommandattributes.md)): [*RequestCancelActivityTaskCommandAttributes*](proto.temporal.api.command.v1.requestcancelactivitytaskcommandattributes.md)

Constructs a new RequestCancelActivityTaskCommandAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRequestCancelActivityTaskCommandAttributes*](../interfaces/proto.temporal.api.command.v1.irequestcancelactivitytaskcommandattributes.md) |

**Returns:** [*RequestCancelActivityTaskCommandAttributes*](proto.temporal.api.command.v1.requestcancelactivitytaskcommandattributes.md)

## Properties

### scheduledEventId

• **scheduledEventId**: Long

RequestCancelActivityTaskCommandAttributes scheduledEventId.

Implementation of: [IRequestCancelActivityTaskCommandAttributes](../interfaces/proto.temporal.api.command.v1.irequestcancelactivitytaskcommandattributes.md).[scheduledEventId](../interfaces/proto.temporal.api.command.v1.irequestcancelactivitytaskcommandattributes.md#scheduledeventid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this RequestCancelActivityTaskCommandAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IRequestCancelActivityTaskCommandAttributes*](../interfaces/proto.temporal.api.command.v1.irequestcancelactivitytaskcommandattributes.md)): [*RequestCancelActivityTaskCommandAttributes*](proto.temporal.api.command.v1.requestcancelactivitytaskcommandattributes.md)

Creates a new RequestCancelActivityTaskCommandAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRequestCancelActivityTaskCommandAttributes*](../interfaces/proto.temporal.api.command.v1.irequestcancelactivitytaskcommandattributes.md) |

**Returns:** [*RequestCancelActivityTaskCommandAttributes*](proto.temporal.api.command.v1.requestcancelactivitytaskcommandattributes.md)

RequestCancelActivityTaskCommandAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*RequestCancelActivityTaskCommandAttributes*](proto.temporal.api.command.v1.requestcancelactivitytaskcommandattributes.md)

Decodes a RequestCancelActivityTaskCommandAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*RequestCancelActivityTaskCommandAttributes*](proto.temporal.api.command.v1.requestcancelactivitytaskcommandattributes.md)

RequestCancelActivityTaskCommandAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*RequestCancelActivityTaskCommandAttributes*](proto.temporal.api.command.v1.requestcancelactivitytaskcommandattributes.md)

Decodes a RequestCancelActivityTaskCommandAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*RequestCancelActivityTaskCommandAttributes*](proto.temporal.api.command.v1.requestcancelactivitytaskcommandattributes.md)

RequestCancelActivityTaskCommandAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IRequestCancelActivityTaskCommandAttributes*](../interfaces/proto.temporal.api.command.v1.irequestcancelactivitytaskcommandattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified RequestCancelActivityTaskCommandAttributes message. Does not implicitly [verify](proto.temporal.api.command.v1.requestcancelactivitytaskcommandattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRequestCancelActivityTaskCommandAttributes*](../interfaces/proto.temporal.api.command.v1.irequestcancelactivitytaskcommandattributes.md) | RequestCancelActivityTaskCommandAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IRequestCancelActivityTaskCommandAttributes*](../interfaces/proto.temporal.api.command.v1.irequestcancelactivitytaskcommandattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified RequestCancelActivityTaskCommandAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.command.v1.requestcancelactivitytaskcommandattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRequestCancelActivityTaskCommandAttributes*](../interfaces/proto.temporal.api.command.v1.irequestcancelactivitytaskcommandattributes.md) | RequestCancelActivityTaskCommandAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*RequestCancelActivityTaskCommandAttributes*](proto.temporal.api.command.v1.requestcancelactivitytaskcommandattributes.md)

Creates a RequestCancelActivityTaskCommandAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*RequestCancelActivityTaskCommandAttributes*](proto.temporal.api.command.v1.requestcancelactivitytaskcommandattributes.md)

RequestCancelActivityTaskCommandAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*RequestCancelActivityTaskCommandAttributes*](proto.temporal.api.command.v1.requestcancelactivitytaskcommandattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a RequestCancelActivityTaskCommandAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*RequestCancelActivityTaskCommandAttributes*](proto.temporal.api.command.v1.requestcancelactivitytaskcommandattributes.md) | RequestCancelActivityTaskCommandAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a RequestCancelActivityTaskCommandAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
