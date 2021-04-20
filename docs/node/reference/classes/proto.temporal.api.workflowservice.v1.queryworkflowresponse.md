# Class: QueryWorkflowResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).QueryWorkflowResponse

Represents a QueryWorkflowResponse.

## Implements

* [*IQueryWorkflowResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iqueryworkflowresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.queryworkflowresponse.md#constructor)

### Properties

- [queryRejected](proto.temporal.api.workflowservice.v1.queryworkflowresponse.md#queryrejected)
- [queryResult](proto.temporal.api.workflowservice.v1.queryworkflowresponse.md#queryresult)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.queryworkflowresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.queryworkflowresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.queryworkflowresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.queryworkflowresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.queryworkflowresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.queryworkflowresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.queryworkflowresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.queryworkflowresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.queryworkflowresponse.md#verify)

## Constructors

### constructor

\+ **new QueryWorkflowResponse**(`properties?`: [*IQueryWorkflowResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iqueryworkflowresponse.md)): [*QueryWorkflowResponse*](proto.temporal.api.workflowservice.v1.queryworkflowresponse.md)

Constructs a new QueryWorkflowResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IQueryWorkflowResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iqueryworkflowresponse.md) |

**Returns:** [*QueryWorkflowResponse*](proto.temporal.api.workflowservice.v1.queryworkflowresponse.md)

## Properties

### queryRejected

• `Optional` **queryRejected**: *null* \| [*IQueryRejected*](../interfaces/proto.temporal.api.query.v1.iqueryrejected.md)

QueryWorkflowResponse queryRejected.

Implementation of: [IQueryWorkflowResponse](../interfaces/proto.temporal.api.workflowservice.v1.iqueryworkflowresponse.md).[queryRejected](../interfaces/proto.temporal.api.workflowservice.v1.iqueryworkflowresponse.md#queryrejected)

___

### queryResult

• `Optional` **queryResult**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

QueryWorkflowResponse queryResult.

Implementation of: [IQueryWorkflowResponse](../interfaces/proto.temporal.api.workflowservice.v1.iqueryworkflowresponse.md).[queryResult](../interfaces/proto.temporal.api.workflowservice.v1.iqueryworkflowresponse.md#queryresult)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this QueryWorkflowResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IQueryWorkflowResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iqueryworkflowresponse.md)): [*QueryWorkflowResponse*](proto.temporal.api.workflowservice.v1.queryworkflowresponse.md)

Creates a new QueryWorkflowResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IQueryWorkflowResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iqueryworkflowresponse.md) |

**Returns:** [*QueryWorkflowResponse*](proto.temporal.api.workflowservice.v1.queryworkflowresponse.md)

QueryWorkflowResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*QueryWorkflowResponse*](proto.temporal.api.workflowservice.v1.queryworkflowresponse.md)

Decodes a QueryWorkflowResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*QueryWorkflowResponse*](proto.temporal.api.workflowservice.v1.queryworkflowresponse.md)

QueryWorkflowResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*QueryWorkflowResponse*](proto.temporal.api.workflowservice.v1.queryworkflowresponse.md)

Decodes a QueryWorkflowResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*QueryWorkflowResponse*](proto.temporal.api.workflowservice.v1.queryworkflowresponse.md)

QueryWorkflowResponse

___

### encode

▸ `Static`**encode**(`message`: [*IQueryWorkflowResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iqueryworkflowresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified QueryWorkflowResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.queryworkflowresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IQueryWorkflowResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iqueryworkflowresponse.md) | QueryWorkflowResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IQueryWorkflowResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iqueryworkflowresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified QueryWorkflowResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.queryworkflowresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IQueryWorkflowResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iqueryworkflowresponse.md) | QueryWorkflowResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*QueryWorkflowResponse*](proto.temporal.api.workflowservice.v1.queryworkflowresponse.md)

Creates a QueryWorkflowResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*QueryWorkflowResponse*](proto.temporal.api.workflowservice.v1.queryworkflowresponse.md)

QueryWorkflowResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*QueryWorkflowResponse*](proto.temporal.api.workflowservice.v1.queryworkflowresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a QueryWorkflowResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*QueryWorkflowResponse*](proto.temporal.api.workflowservice.v1.queryworkflowresponse.md) | QueryWorkflowResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a QueryWorkflowResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
