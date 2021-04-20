# Class: ScanWorkflowExecutionsResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).ScanWorkflowExecutionsResponse

Represents a ScanWorkflowExecutionsResponse.

## Implements

* [*IScanWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iscanworkflowexecutionsresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsresponse.md#constructor)

### Properties

- [executions](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsresponse.md#executions)
- [nextPageToken](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsresponse.md#nextpagetoken)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsresponse.md#verify)

## Constructors

### constructor

\+ **new ScanWorkflowExecutionsResponse**(`properties?`: [*IScanWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iscanworkflowexecutionsresponse.md)): [*ScanWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsresponse.md)

Constructs a new ScanWorkflowExecutionsResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IScanWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iscanworkflowexecutionsresponse.md) |

**Returns:** [*ScanWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsresponse.md)

## Properties

### executions

• **executions**: [*IWorkflowExecutionInfo*](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md)[]

ScanWorkflowExecutionsResponse executions.

Implementation of: [IScanWorkflowExecutionsResponse](../interfaces/proto.temporal.api.workflowservice.v1.iscanworkflowexecutionsresponse.md).[executions](../interfaces/proto.temporal.api.workflowservice.v1.iscanworkflowexecutionsresponse.md#executions)

___

### nextPageToken

• **nextPageToken**: *Uint8Array*

ScanWorkflowExecutionsResponse nextPageToken.

Implementation of: [IScanWorkflowExecutionsResponse](../interfaces/proto.temporal.api.workflowservice.v1.iscanworkflowexecutionsresponse.md).[nextPageToken](../interfaces/proto.temporal.api.workflowservice.v1.iscanworkflowexecutionsresponse.md#nextpagetoken)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ScanWorkflowExecutionsResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IScanWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iscanworkflowexecutionsresponse.md)): [*ScanWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsresponse.md)

Creates a new ScanWorkflowExecutionsResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IScanWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iscanworkflowexecutionsresponse.md) |

**Returns:** [*ScanWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsresponse.md)

ScanWorkflowExecutionsResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ScanWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsresponse.md)

Decodes a ScanWorkflowExecutionsResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ScanWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsresponse.md)

ScanWorkflowExecutionsResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ScanWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsresponse.md)

Decodes a ScanWorkflowExecutionsResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ScanWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsresponse.md)

ScanWorkflowExecutionsResponse

___

### encode

▸ `Static`**encode**(`message`: [*IScanWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iscanworkflowexecutionsresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified ScanWorkflowExecutionsResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IScanWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iscanworkflowexecutionsresponse.md) | ScanWorkflowExecutionsResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IScanWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iscanworkflowexecutionsresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified ScanWorkflowExecutionsResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IScanWorkflowExecutionsResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iscanworkflowexecutionsresponse.md) | ScanWorkflowExecutionsResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ScanWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsresponse.md)

Creates a ScanWorkflowExecutionsResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ScanWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsresponse.md)

ScanWorkflowExecutionsResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*ScanWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ScanWorkflowExecutionsResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ScanWorkflowExecutionsResponse*](proto.temporal.api.workflowservice.v1.scanworkflowexecutionsresponse.md) | ScanWorkflowExecutionsResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ScanWorkflowExecutionsResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
