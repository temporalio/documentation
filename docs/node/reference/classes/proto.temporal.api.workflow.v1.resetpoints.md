# Class: ResetPoints

[workflow](../modules/proto.temporal.api.workflow.md).[v1](../modules/proto.temporal.api.workflow.v1.md).ResetPoints

Represents a ResetPoints.

## Implements

* [*IResetPoints*](../interfaces/proto.temporal.api.workflow.v1.iresetpoints.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflow.v1.resetpoints.md#constructor)

### Properties

- [points](proto.temporal.api.workflow.v1.resetpoints.md#points)

### Methods

- [toJSON](proto.temporal.api.workflow.v1.resetpoints.md#tojson)
- [create](proto.temporal.api.workflow.v1.resetpoints.md#create)
- [decode](proto.temporal.api.workflow.v1.resetpoints.md#decode)
- [decodeDelimited](proto.temporal.api.workflow.v1.resetpoints.md#decodedelimited)
- [encode](proto.temporal.api.workflow.v1.resetpoints.md#encode)
- [encodeDelimited](proto.temporal.api.workflow.v1.resetpoints.md#encodedelimited)
- [fromObject](proto.temporal.api.workflow.v1.resetpoints.md#fromobject)
- [toObject](proto.temporal.api.workflow.v1.resetpoints.md#toobject)
- [verify](proto.temporal.api.workflow.v1.resetpoints.md#verify)

## Constructors

### constructor

\+ **new ResetPoints**(`properties?`: [*IResetPoints*](../interfaces/proto.temporal.api.workflow.v1.iresetpoints.md)): [*ResetPoints*](proto.temporal.api.workflow.v1.resetpoints.md)

Constructs a new ResetPoints.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IResetPoints*](../interfaces/proto.temporal.api.workflow.v1.iresetpoints.md) |

**Returns:** [*ResetPoints*](proto.temporal.api.workflow.v1.resetpoints.md)

## Properties

### points

• **points**: [*IResetPointInfo*](../interfaces/proto.temporal.api.workflow.v1.iresetpointinfo.md)[]

ResetPoints points.

Implementation of: [IResetPoints](../interfaces/proto.temporal.api.workflow.v1.iresetpoints.md).[points](../interfaces/proto.temporal.api.workflow.v1.iresetpoints.md#points)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ResetPoints to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IResetPoints*](../interfaces/proto.temporal.api.workflow.v1.iresetpoints.md)): [*ResetPoints*](proto.temporal.api.workflow.v1.resetpoints.md)

Creates a new ResetPoints instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IResetPoints*](../interfaces/proto.temporal.api.workflow.v1.iresetpoints.md) |

**Returns:** [*ResetPoints*](proto.temporal.api.workflow.v1.resetpoints.md)

ResetPoints instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ResetPoints*](proto.temporal.api.workflow.v1.resetpoints.md)

Decodes a ResetPoints message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ResetPoints*](proto.temporal.api.workflow.v1.resetpoints.md)

ResetPoints

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ResetPoints*](proto.temporal.api.workflow.v1.resetpoints.md)

Decodes a ResetPoints message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ResetPoints*](proto.temporal.api.workflow.v1.resetpoints.md)

ResetPoints

___

### encode

▸ `Static`**encode**(`message`: [*IResetPoints*](../interfaces/proto.temporal.api.workflow.v1.iresetpoints.md), `writer?`: *Writer*): *Writer*

Encodes the specified ResetPoints message. Does not implicitly [verify](proto.temporal.api.workflow.v1.resetpoints.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IResetPoints*](../interfaces/proto.temporal.api.workflow.v1.iresetpoints.md) | ResetPoints message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IResetPoints*](../interfaces/proto.temporal.api.workflow.v1.iresetpoints.md), `writer?`: *Writer*): *Writer*

Encodes the specified ResetPoints message, length delimited. Does not implicitly [verify](proto.temporal.api.workflow.v1.resetpoints.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IResetPoints*](../interfaces/proto.temporal.api.workflow.v1.iresetpoints.md) | ResetPoints message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ResetPoints*](proto.temporal.api.workflow.v1.resetpoints.md)

Creates a ResetPoints message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ResetPoints*](proto.temporal.api.workflow.v1.resetpoints.md)

ResetPoints

___

### toObject

▸ `Static`**toObject**(`message`: [*ResetPoints*](proto.temporal.api.workflow.v1.resetpoints.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ResetPoints message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ResetPoints*](proto.temporal.api.workflow.v1.resetpoints.md) | ResetPoints   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ResetPoints message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
