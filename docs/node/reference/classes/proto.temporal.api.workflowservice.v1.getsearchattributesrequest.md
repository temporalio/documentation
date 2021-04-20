# Class: GetSearchAttributesRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).GetSearchAttributesRequest

Represents a GetSearchAttributesRequest.

## Implements

* [*IGetSearchAttributesRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetsearchattributesrequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.getsearchattributesrequest.md#constructor)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.getsearchattributesrequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.getsearchattributesrequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.getsearchattributesrequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.getsearchattributesrequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.getsearchattributesrequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.getsearchattributesrequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.getsearchattributesrequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.getsearchattributesrequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.getsearchattributesrequest.md#verify)

## Constructors

### constructor

\+ **new GetSearchAttributesRequest**(`properties?`: [*IGetSearchAttributesRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetsearchattributesrequest.md)): [*GetSearchAttributesRequest*](proto.temporal.api.workflowservice.v1.getsearchattributesrequest.md)

Constructs a new GetSearchAttributesRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IGetSearchAttributesRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetsearchattributesrequest.md) |

**Returns:** [*GetSearchAttributesRequest*](proto.temporal.api.workflowservice.v1.getsearchattributesrequest.md)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this GetSearchAttributesRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IGetSearchAttributesRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetsearchattributesrequest.md)): [*GetSearchAttributesRequest*](proto.temporal.api.workflowservice.v1.getsearchattributesrequest.md)

Creates a new GetSearchAttributesRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IGetSearchAttributesRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetsearchattributesrequest.md) |

**Returns:** [*GetSearchAttributesRequest*](proto.temporal.api.workflowservice.v1.getsearchattributesrequest.md)

GetSearchAttributesRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*GetSearchAttributesRequest*](proto.temporal.api.workflowservice.v1.getsearchattributesrequest.md)

Decodes a GetSearchAttributesRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*GetSearchAttributesRequest*](proto.temporal.api.workflowservice.v1.getsearchattributesrequest.md)

GetSearchAttributesRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*GetSearchAttributesRequest*](proto.temporal.api.workflowservice.v1.getsearchattributesrequest.md)

Decodes a GetSearchAttributesRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*GetSearchAttributesRequest*](proto.temporal.api.workflowservice.v1.getsearchattributesrequest.md)

GetSearchAttributesRequest

___

### encode

▸ `Static`**encode**(`message`: [*IGetSearchAttributesRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetsearchattributesrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified GetSearchAttributesRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.getsearchattributesrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IGetSearchAttributesRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetsearchattributesrequest.md) | GetSearchAttributesRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IGetSearchAttributesRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetsearchattributesrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified GetSearchAttributesRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.getsearchattributesrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IGetSearchAttributesRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetsearchattributesrequest.md) | GetSearchAttributesRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*GetSearchAttributesRequest*](proto.temporal.api.workflowservice.v1.getsearchattributesrequest.md)

Creates a GetSearchAttributesRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*GetSearchAttributesRequest*](proto.temporal.api.workflowservice.v1.getsearchattributesrequest.md)

GetSearchAttributesRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*GetSearchAttributesRequest*](proto.temporal.api.workflowservice.v1.getsearchattributesrequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a GetSearchAttributesRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*GetSearchAttributesRequest*](proto.temporal.api.workflowservice.v1.getsearchattributesrequest.md) | GetSearchAttributesRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a GetSearchAttributesRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
