# Class: GetSearchAttributesResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).GetSearchAttributesResponse

Represents a GetSearchAttributesResponse.

## Implements

* [*IGetSearchAttributesResponse*](../interfaces/proto.temporal.api.workflowservice.v1.igetsearchattributesresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.getsearchattributesresponse.md#constructor)

### Properties

- [keys](proto.temporal.api.workflowservice.v1.getsearchattributesresponse.md#keys)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.getsearchattributesresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.getsearchattributesresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.getsearchattributesresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.getsearchattributesresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.getsearchattributesresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.getsearchattributesresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.getsearchattributesresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.getsearchattributesresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.getsearchattributesresponse.md#verify)

## Constructors

### constructor

\+ **new GetSearchAttributesResponse**(`properties?`: [*IGetSearchAttributesResponse*](../interfaces/proto.temporal.api.workflowservice.v1.igetsearchattributesresponse.md)): [*GetSearchAttributesResponse*](proto.temporal.api.workflowservice.v1.getsearchattributesresponse.md)

Constructs a new GetSearchAttributesResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IGetSearchAttributesResponse*](../interfaces/proto.temporal.api.workflowservice.v1.igetsearchattributesresponse.md) |

**Returns:** [*GetSearchAttributesResponse*](proto.temporal.api.workflowservice.v1.getsearchattributesresponse.md)

## Properties

### keys

• **keys**: *object*

GetSearchAttributesResponse keys.

#### Type declaration:

Implementation of: [IGetSearchAttributesResponse](../interfaces/proto.temporal.api.workflowservice.v1.igetsearchattributesresponse.md).[keys](../interfaces/proto.temporal.api.workflowservice.v1.igetsearchattributesresponse.md#keys)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this GetSearchAttributesResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IGetSearchAttributesResponse*](../interfaces/proto.temporal.api.workflowservice.v1.igetsearchattributesresponse.md)): [*GetSearchAttributesResponse*](proto.temporal.api.workflowservice.v1.getsearchattributesresponse.md)

Creates a new GetSearchAttributesResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IGetSearchAttributesResponse*](../interfaces/proto.temporal.api.workflowservice.v1.igetsearchattributesresponse.md) |

**Returns:** [*GetSearchAttributesResponse*](proto.temporal.api.workflowservice.v1.getsearchattributesresponse.md)

GetSearchAttributesResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*GetSearchAttributesResponse*](proto.temporal.api.workflowservice.v1.getsearchattributesresponse.md)

Decodes a GetSearchAttributesResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*GetSearchAttributesResponse*](proto.temporal.api.workflowservice.v1.getsearchattributesresponse.md)

GetSearchAttributesResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*GetSearchAttributesResponse*](proto.temporal.api.workflowservice.v1.getsearchattributesresponse.md)

Decodes a GetSearchAttributesResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*GetSearchAttributesResponse*](proto.temporal.api.workflowservice.v1.getsearchattributesresponse.md)

GetSearchAttributesResponse

___

### encode

▸ `Static`**encode**(`message`: [*IGetSearchAttributesResponse*](../interfaces/proto.temporal.api.workflowservice.v1.igetsearchattributesresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified GetSearchAttributesResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.getsearchattributesresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IGetSearchAttributesResponse*](../interfaces/proto.temporal.api.workflowservice.v1.igetsearchattributesresponse.md) | GetSearchAttributesResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IGetSearchAttributesResponse*](../interfaces/proto.temporal.api.workflowservice.v1.igetsearchattributesresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified GetSearchAttributesResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.getsearchattributesresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IGetSearchAttributesResponse*](../interfaces/proto.temporal.api.workflowservice.v1.igetsearchattributesresponse.md) | GetSearchAttributesResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*GetSearchAttributesResponse*](proto.temporal.api.workflowservice.v1.getsearchattributesresponse.md)

Creates a GetSearchAttributesResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*GetSearchAttributesResponse*](proto.temporal.api.workflowservice.v1.getsearchattributesresponse.md)

GetSearchAttributesResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*GetSearchAttributesResponse*](proto.temporal.api.workflowservice.v1.getsearchattributesresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a GetSearchAttributesResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*GetSearchAttributesResponse*](proto.temporal.api.workflowservice.v1.getsearchattributesresponse.md) | GetSearchAttributesResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a GetSearchAttributesResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
