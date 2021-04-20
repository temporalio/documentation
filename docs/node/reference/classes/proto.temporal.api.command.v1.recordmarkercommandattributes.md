# Class: RecordMarkerCommandAttributes

[command](../modules/proto.temporal.api.command.md).[v1](../modules/proto.temporal.api.command.v1.md).RecordMarkerCommandAttributes

Represents a RecordMarkerCommandAttributes.

## Implements

* [*IRecordMarkerCommandAttributes*](../interfaces/proto.temporal.api.command.v1.irecordmarkercommandattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.command.v1.recordmarkercommandattributes.md#constructor)

### Properties

- [details](proto.temporal.api.command.v1.recordmarkercommandattributes.md#details)
- [failure](proto.temporal.api.command.v1.recordmarkercommandattributes.md#failure)
- [header](proto.temporal.api.command.v1.recordmarkercommandattributes.md#header)
- [markerName](proto.temporal.api.command.v1.recordmarkercommandattributes.md#markername)

### Methods

- [toJSON](proto.temporal.api.command.v1.recordmarkercommandattributes.md#tojson)
- [create](proto.temporal.api.command.v1.recordmarkercommandattributes.md#create)
- [decode](proto.temporal.api.command.v1.recordmarkercommandattributes.md#decode)
- [decodeDelimited](proto.temporal.api.command.v1.recordmarkercommandattributes.md#decodedelimited)
- [encode](proto.temporal.api.command.v1.recordmarkercommandattributes.md#encode)
- [encodeDelimited](proto.temporal.api.command.v1.recordmarkercommandattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.command.v1.recordmarkercommandattributes.md#fromobject)
- [toObject](proto.temporal.api.command.v1.recordmarkercommandattributes.md#toobject)
- [verify](proto.temporal.api.command.v1.recordmarkercommandattributes.md#verify)

## Constructors

### constructor

\+ **new RecordMarkerCommandAttributes**(`properties?`: [*IRecordMarkerCommandAttributes*](../interfaces/proto.temporal.api.command.v1.irecordmarkercommandattributes.md)): [*RecordMarkerCommandAttributes*](proto.temporal.api.command.v1.recordmarkercommandattributes.md)

Constructs a new RecordMarkerCommandAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRecordMarkerCommandAttributes*](../interfaces/proto.temporal.api.command.v1.irecordmarkercommandattributes.md) |

**Returns:** [*RecordMarkerCommandAttributes*](proto.temporal.api.command.v1.recordmarkercommandattributes.md)

## Properties

### details

• **details**: *object*

RecordMarkerCommandAttributes details.

#### Type declaration:

Implementation of: [IRecordMarkerCommandAttributes](../interfaces/proto.temporal.api.command.v1.irecordmarkercommandattributes.md).[details](../interfaces/proto.temporal.api.command.v1.irecordmarkercommandattributes.md#details)

___

### failure

• `Optional` **failure**: *null* \| [*IFailure*](../interfaces/proto.temporal.api.failure.v1.ifailure.md)

RecordMarkerCommandAttributes failure.

Implementation of: [IRecordMarkerCommandAttributes](../interfaces/proto.temporal.api.command.v1.irecordmarkercommandattributes.md).[failure](../interfaces/proto.temporal.api.command.v1.irecordmarkercommandattributes.md#failure)

___

### header

• `Optional` **header**: *null* \| [*IHeader*](../interfaces/proto.temporal.api.common.v1.iheader.md)

RecordMarkerCommandAttributes header.

Implementation of: [IRecordMarkerCommandAttributes](../interfaces/proto.temporal.api.command.v1.irecordmarkercommandattributes.md).[header](../interfaces/proto.temporal.api.command.v1.irecordmarkercommandattributes.md#header)

___

### markerName

• **markerName**: *string*

RecordMarkerCommandAttributes markerName.

Implementation of: [IRecordMarkerCommandAttributes](../interfaces/proto.temporal.api.command.v1.irecordmarkercommandattributes.md).[markerName](../interfaces/proto.temporal.api.command.v1.irecordmarkercommandattributes.md#markername)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this RecordMarkerCommandAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IRecordMarkerCommandAttributes*](../interfaces/proto.temporal.api.command.v1.irecordmarkercommandattributes.md)): [*RecordMarkerCommandAttributes*](proto.temporal.api.command.v1.recordmarkercommandattributes.md)

Creates a new RecordMarkerCommandAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRecordMarkerCommandAttributes*](../interfaces/proto.temporal.api.command.v1.irecordmarkercommandattributes.md) |

**Returns:** [*RecordMarkerCommandAttributes*](proto.temporal.api.command.v1.recordmarkercommandattributes.md)

RecordMarkerCommandAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*RecordMarkerCommandAttributes*](proto.temporal.api.command.v1.recordmarkercommandattributes.md)

Decodes a RecordMarkerCommandAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*RecordMarkerCommandAttributes*](proto.temporal.api.command.v1.recordmarkercommandattributes.md)

RecordMarkerCommandAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*RecordMarkerCommandAttributes*](proto.temporal.api.command.v1.recordmarkercommandattributes.md)

Decodes a RecordMarkerCommandAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*RecordMarkerCommandAttributes*](proto.temporal.api.command.v1.recordmarkercommandattributes.md)

RecordMarkerCommandAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IRecordMarkerCommandAttributes*](../interfaces/proto.temporal.api.command.v1.irecordmarkercommandattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified RecordMarkerCommandAttributes message. Does not implicitly [verify](proto.temporal.api.command.v1.recordmarkercommandattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRecordMarkerCommandAttributes*](../interfaces/proto.temporal.api.command.v1.irecordmarkercommandattributes.md) | RecordMarkerCommandAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IRecordMarkerCommandAttributes*](../interfaces/proto.temporal.api.command.v1.irecordmarkercommandattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified RecordMarkerCommandAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.command.v1.recordmarkercommandattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRecordMarkerCommandAttributes*](../interfaces/proto.temporal.api.command.v1.irecordmarkercommandattributes.md) | RecordMarkerCommandAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*RecordMarkerCommandAttributes*](proto.temporal.api.command.v1.recordmarkercommandattributes.md)

Creates a RecordMarkerCommandAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*RecordMarkerCommandAttributes*](proto.temporal.api.command.v1.recordmarkercommandattributes.md)

RecordMarkerCommandAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*RecordMarkerCommandAttributes*](proto.temporal.api.command.v1.recordmarkercommandattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a RecordMarkerCommandAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*RecordMarkerCommandAttributes*](proto.temporal.api.command.v1.recordmarkercommandattributes.md) | RecordMarkerCommandAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a RecordMarkerCommandAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
