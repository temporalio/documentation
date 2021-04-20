# Class: GetClusterInfoRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).GetClusterInfoRequest

Represents a GetClusterInfoRequest.

## Implements

* [*IGetClusterInfoRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetclusterinforequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.getclusterinforequest.md#constructor)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.getclusterinforequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.getclusterinforequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.getclusterinforequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.getclusterinforequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.getclusterinforequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.getclusterinforequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.getclusterinforequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.getclusterinforequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.getclusterinforequest.md#verify)

## Constructors

### constructor

\+ **new GetClusterInfoRequest**(`properties?`: [*IGetClusterInfoRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetclusterinforequest.md)): [*GetClusterInfoRequest*](proto.temporal.api.workflowservice.v1.getclusterinforequest.md)

Constructs a new GetClusterInfoRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IGetClusterInfoRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetclusterinforequest.md) |

**Returns:** [*GetClusterInfoRequest*](proto.temporal.api.workflowservice.v1.getclusterinforequest.md)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this GetClusterInfoRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IGetClusterInfoRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetclusterinforequest.md)): [*GetClusterInfoRequest*](proto.temporal.api.workflowservice.v1.getclusterinforequest.md)

Creates a new GetClusterInfoRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IGetClusterInfoRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetclusterinforequest.md) |

**Returns:** [*GetClusterInfoRequest*](proto.temporal.api.workflowservice.v1.getclusterinforequest.md)

GetClusterInfoRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*GetClusterInfoRequest*](proto.temporal.api.workflowservice.v1.getclusterinforequest.md)

Decodes a GetClusterInfoRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*GetClusterInfoRequest*](proto.temporal.api.workflowservice.v1.getclusterinforequest.md)

GetClusterInfoRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*GetClusterInfoRequest*](proto.temporal.api.workflowservice.v1.getclusterinforequest.md)

Decodes a GetClusterInfoRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*GetClusterInfoRequest*](proto.temporal.api.workflowservice.v1.getclusterinforequest.md)

GetClusterInfoRequest

___

### encode

▸ `Static`**encode**(`message`: [*IGetClusterInfoRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetclusterinforequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified GetClusterInfoRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.getclusterinforequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IGetClusterInfoRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetclusterinforequest.md) | GetClusterInfoRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IGetClusterInfoRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetclusterinforequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified GetClusterInfoRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.getclusterinforequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IGetClusterInfoRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetclusterinforequest.md) | GetClusterInfoRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*GetClusterInfoRequest*](proto.temporal.api.workflowservice.v1.getclusterinforequest.md)

Creates a GetClusterInfoRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*GetClusterInfoRequest*](proto.temporal.api.workflowservice.v1.getclusterinforequest.md)

GetClusterInfoRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*GetClusterInfoRequest*](proto.temporal.api.workflowservice.v1.getclusterinforequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a GetClusterInfoRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*GetClusterInfoRequest*](proto.temporal.api.workflowservice.v1.getclusterinforequest.md) | GetClusterInfoRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a GetClusterInfoRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
