# Class: MarkerRecordedEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).MarkerRecordedEventAttributes

Represents a MarkerRecordedEventAttributes.

## Implements

* [*IMarkerRecordedEventAttributes*](../interfaces/proto.temporal.api.history.v1.imarkerrecordedeventattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.markerrecordedeventattributes.md#constructor)

### Properties

- [details](proto.temporal.api.history.v1.markerrecordedeventattributes.md#details)
- [failure](proto.temporal.api.history.v1.markerrecordedeventattributes.md#failure)
- [header](proto.temporal.api.history.v1.markerrecordedeventattributes.md#header)
- [markerName](proto.temporal.api.history.v1.markerrecordedeventattributes.md#markername)
- [workflowTaskCompletedEventId](proto.temporal.api.history.v1.markerrecordedeventattributes.md#workflowtaskcompletedeventid)

### Methods

- [toJSON](proto.temporal.api.history.v1.markerrecordedeventattributes.md#tojson)
- [create](proto.temporal.api.history.v1.markerrecordedeventattributes.md#create)
- [decode](proto.temporal.api.history.v1.markerrecordedeventattributes.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.markerrecordedeventattributes.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.markerrecordedeventattributes.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.markerrecordedeventattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.markerrecordedeventattributes.md#fromobject)
- [toObject](proto.temporal.api.history.v1.markerrecordedeventattributes.md#toobject)
- [verify](proto.temporal.api.history.v1.markerrecordedeventattributes.md#verify)

## Constructors

### constructor

\+ **new MarkerRecordedEventAttributes**(`properties?`: [*IMarkerRecordedEventAttributes*](../interfaces/proto.temporal.api.history.v1.imarkerrecordedeventattributes.md)): [*MarkerRecordedEventAttributes*](proto.temporal.api.history.v1.markerrecordedeventattributes.md)

Constructs a new MarkerRecordedEventAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IMarkerRecordedEventAttributes*](../interfaces/proto.temporal.api.history.v1.imarkerrecordedeventattributes.md) |

**Returns:** [*MarkerRecordedEventAttributes*](proto.temporal.api.history.v1.markerrecordedeventattributes.md)

## Properties

### details

• **details**: *object*

MarkerRecordedEventAttributes details.

#### Type declaration:

Implementation of: [IMarkerRecordedEventAttributes](../interfaces/proto.temporal.api.history.v1.imarkerrecordedeventattributes.md).[details](../interfaces/proto.temporal.api.history.v1.imarkerrecordedeventattributes.md#details)

___

### failure

• `Optional` **failure**: *null* \| [*IFailure*](../interfaces/proto.temporal.api.failure.v1.ifailure.md)

MarkerRecordedEventAttributes failure.

Implementation of: [IMarkerRecordedEventAttributes](../interfaces/proto.temporal.api.history.v1.imarkerrecordedeventattributes.md).[failure](../interfaces/proto.temporal.api.history.v1.imarkerrecordedeventattributes.md#failure)

___

### header

• `Optional` **header**: *null* \| [*IHeader*](../interfaces/proto.temporal.api.common.v1.iheader.md)

MarkerRecordedEventAttributes header.

Implementation of: [IMarkerRecordedEventAttributes](../interfaces/proto.temporal.api.history.v1.imarkerrecordedeventattributes.md).[header](../interfaces/proto.temporal.api.history.v1.imarkerrecordedeventattributes.md#header)

___

### markerName

• **markerName**: *string*

MarkerRecordedEventAttributes markerName.

Implementation of: [IMarkerRecordedEventAttributes](../interfaces/proto.temporal.api.history.v1.imarkerrecordedeventattributes.md).[markerName](../interfaces/proto.temporal.api.history.v1.imarkerrecordedeventattributes.md#markername)

___

### workflowTaskCompletedEventId

• **workflowTaskCompletedEventId**: Long

MarkerRecordedEventAttributes workflowTaskCompletedEventId.

Implementation of: [IMarkerRecordedEventAttributes](../interfaces/proto.temporal.api.history.v1.imarkerrecordedeventattributes.md).[workflowTaskCompletedEventId](../interfaces/proto.temporal.api.history.v1.imarkerrecordedeventattributes.md#workflowtaskcompletedeventid)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this MarkerRecordedEventAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IMarkerRecordedEventAttributes*](../interfaces/proto.temporal.api.history.v1.imarkerrecordedeventattributes.md)): [*MarkerRecordedEventAttributes*](proto.temporal.api.history.v1.markerrecordedeventattributes.md)

Creates a new MarkerRecordedEventAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IMarkerRecordedEventAttributes*](../interfaces/proto.temporal.api.history.v1.imarkerrecordedeventattributes.md) |

**Returns:** [*MarkerRecordedEventAttributes*](proto.temporal.api.history.v1.markerrecordedeventattributes.md)

MarkerRecordedEventAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*MarkerRecordedEventAttributes*](proto.temporal.api.history.v1.markerrecordedeventattributes.md)

Decodes a MarkerRecordedEventAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*MarkerRecordedEventAttributes*](proto.temporal.api.history.v1.markerrecordedeventattributes.md)

MarkerRecordedEventAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*MarkerRecordedEventAttributes*](proto.temporal.api.history.v1.markerrecordedeventattributes.md)

Decodes a MarkerRecordedEventAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*MarkerRecordedEventAttributes*](proto.temporal.api.history.v1.markerrecordedeventattributes.md)

MarkerRecordedEventAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IMarkerRecordedEventAttributes*](../interfaces/proto.temporal.api.history.v1.imarkerrecordedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified MarkerRecordedEventAttributes message. Does not implicitly [verify](proto.temporal.api.history.v1.markerrecordedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IMarkerRecordedEventAttributes*](../interfaces/proto.temporal.api.history.v1.imarkerrecordedeventattributes.md) | MarkerRecordedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IMarkerRecordedEventAttributes*](../interfaces/proto.temporal.api.history.v1.imarkerrecordedeventattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified MarkerRecordedEventAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.markerrecordedeventattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IMarkerRecordedEventAttributes*](../interfaces/proto.temporal.api.history.v1.imarkerrecordedeventattributes.md) | MarkerRecordedEventAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*MarkerRecordedEventAttributes*](proto.temporal.api.history.v1.markerrecordedeventattributes.md)

Creates a MarkerRecordedEventAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*MarkerRecordedEventAttributes*](proto.temporal.api.history.v1.markerrecordedeventattributes.md)

MarkerRecordedEventAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*MarkerRecordedEventAttributes*](proto.temporal.api.history.v1.markerrecordedeventattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a MarkerRecordedEventAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*MarkerRecordedEventAttributes*](proto.temporal.api.history.v1.markerrecordedeventattributes.md) | MarkerRecordedEventAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a MarkerRecordedEventAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
