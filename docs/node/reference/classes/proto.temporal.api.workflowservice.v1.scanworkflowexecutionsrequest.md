# Class: ScanWorkflowExecutionsRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).ScanWorkflowExecutionsRequest

Represents a ScanWorkflowExecutionsRequest.

## Implements

* [*IScanWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iscanworkflowexecutionsrequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsrequest.md#constructor)

### Properties

- [namespace](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsrequest.md#namespace)
- [nextPageToken](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsrequest.md#nextpagetoken)
- [pageSize](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsrequest.md#pagesize)
- [query](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsrequest.md#query)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsrequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsrequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsrequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsrequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsrequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsrequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsrequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsrequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsrequest.md#verify)

## Constructors

### constructor

\+ **new ScanWorkflowExecutionsRequest**(`properties?`: [*IScanWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iscanworkflowexecutionsrequest.md)): [*ScanWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsrequest.md)

Constructs a new ScanWorkflowExecutionsRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IScanWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iscanworkflowexecutionsrequest.md) |

**Returns:** [*ScanWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsrequest.md)

## Properties

### namespace

• **namespace**: *string*

ScanWorkflowExecutionsRequest namespace.

Implementation of: [IScanWorkflowExecutionsRequest](../interfaces/proto.temporal.api.workflowservice.v1.iscanworkflowexecutionsrequest.md).[namespace](../interfaces/proto.temporal.api.workflowservice.v1.iscanworkflowexecutionsrequest.md#namespace)

___

### nextPageToken

• **nextPageToken**: *Uint8Array*

ScanWorkflowExecutionsRequest nextPageToken.

Implementation of: [IScanWorkflowExecutionsRequest](../interfaces/proto.temporal.api.workflowservice.v1.iscanworkflowexecutionsrequest.md).[nextPageToken](../interfaces/proto.temporal.api.workflowservice.v1.iscanworkflowexecutionsrequest.md#nextpagetoken)

___

### pageSize

• **pageSize**: *number*

ScanWorkflowExecutionsRequest pageSize.

Implementation of: [IScanWorkflowExecutionsRequest](../interfaces/proto.temporal.api.workflowservice.v1.iscanworkflowexecutionsrequest.md).[pageSize](../interfaces/proto.temporal.api.workflowservice.v1.iscanworkflowexecutionsrequest.md#pagesize)

___

### query

• **query**: *string*

ScanWorkflowExecutionsRequest query.

Implementation of: [IScanWorkflowExecutionsRequest](../interfaces/proto.temporal.api.workflowservice.v1.iscanworkflowexecutionsrequest.md).[query](../interfaces/proto.temporal.api.workflowservice.v1.iscanworkflowexecutionsrequest.md#query)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ScanWorkflowExecutionsRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IScanWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iscanworkflowexecutionsrequest.md)): [*ScanWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsrequest.md)

Creates a new ScanWorkflowExecutionsRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IScanWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iscanworkflowexecutionsrequest.md) |

**Returns:** [*ScanWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsrequest.md)

ScanWorkflowExecutionsRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ScanWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsrequest.md)

Decodes a ScanWorkflowExecutionsRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ScanWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsrequest.md)

ScanWorkflowExecutionsRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ScanWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsrequest.md)

Decodes a ScanWorkflowExecutionsRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ScanWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsrequest.md)

ScanWorkflowExecutionsRequest

___

### encode

▸ `Static`**encode**(`message`: [*IScanWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iscanworkflowexecutionsrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified ScanWorkflowExecutionsRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IScanWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iscanworkflowexecutionsrequest.md) | ScanWorkflowExecutionsRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IScanWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iscanworkflowexecutionsrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified ScanWorkflowExecutionsRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IScanWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.iscanworkflowexecutionsrequest.md) | ScanWorkflowExecutionsRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ScanWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsrequest.md)

Creates a ScanWorkflowExecutionsRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ScanWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsrequest.md)

ScanWorkflowExecutionsRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*ScanWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsrequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ScanWorkflowExecutionsRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ScanWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsrequest.md) | ScanWorkflowExecutionsRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ScanWorkflowExecutionsRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
