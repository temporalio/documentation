# Class: GetWorkflowExecutionHistoryResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).GetWorkflowExecutionHistoryResponse

Represents a GetWorkflowExecutionHistoryResponse.

## Implements

* [*IGetWorkflowExecutionHistoryResponse*](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryresponse.md#constructor)

### Properties

- [archived](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryresponse.md#archived)
- [history](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryresponse.md#history)
- [nextPageToken](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryresponse.md#nextpagetoken)
- [rawHistory](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryresponse.md#rawhistory)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryresponse.md#verify)

## Constructors

### constructor

\+ **new GetWorkflowExecutionHistoryResponse**(`properties?`: [*IGetWorkflowExecutionHistoryResponse*](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryresponse.md)): [*GetWorkflowExecutionHistoryResponse*](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryresponse.md)

Constructs a new GetWorkflowExecutionHistoryResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IGetWorkflowExecutionHistoryResponse*](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryresponse.md) |

**Returns:** [*GetWorkflowExecutionHistoryResponse*](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryresponse.md)

## Properties

### archived

• **archived**: *boolean*

GetWorkflowExecutionHistoryResponse archived.

Implementation of: [IGetWorkflowExecutionHistoryResponse](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryresponse.md).[archived](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryresponse.md#archived)

___

### history

• `Optional` **history**: *null* \| [*IHistory*](../interfaces/proto.temporal.api.history.v1.ihistory.md)

GetWorkflowExecutionHistoryResponse history.

Implementation of: [IGetWorkflowExecutionHistoryResponse](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryresponse.md).[history](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryresponse.md#history)

___

### nextPageToken

• **nextPageToken**: *Uint8Array*

GetWorkflowExecutionHistoryResponse nextPageToken.

Implementation of: [IGetWorkflowExecutionHistoryResponse](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryresponse.md).[nextPageToken](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryresponse.md#nextpagetoken)

___

### rawHistory

• **rawHistory**: [*IDataBlob*](../interfaces/proto.temporal.api.common.v1.idatablob.md)[]

GetWorkflowExecutionHistoryResponse rawHistory.

Implementation of: [IGetWorkflowExecutionHistoryResponse](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryresponse.md).[rawHistory](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryresponse.md#rawhistory)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this GetWorkflowExecutionHistoryResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IGetWorkflowExecutionHistoryResponse*](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryresponse.md)): [*GetWorkflowExecutionHistoryResponse*](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryresponse.md)

Creates a new GetWorkflowExecutionHistoryResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IGetWorkflowExecutionHistoryResponse*](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryresponse.md) |

**Returns:** [*GetWorkflowExecutionHistoryResponse*](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryresponse.md)

GetWorkflowExecutionHistoryResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*GetWorkflowExecutionHistoryResponse*](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryresponse.md)

Decodes a GetWorkflowExecutionHistoryResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*GetWorkflowExecutionHistoryResponse*](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryresponse.md)

GetWorkflowExecutionHistoryResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*GetWorkflowExecutionHistoryResponse*](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryresponse.md)

Decodes a GetWorkflowExecutionHistoryResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*GetWorkflowExecutionHistoryResponse*](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryresponse.md)

GetWorkflowExecutionHistoryResponse

___

### encode

▸ `Static`**encode**(`message`: [*IGetWorkflowExecutionHistoryResponse*](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified GetWorkflowExecutionHistoryResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IGetWorkflowExecutionHistoryResponse*](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryresponse.md) | GetWorkflowExecutionHistoryResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IGetWorkflowExecutionHistoryResponse*](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified GetWorkflowExecutionHistoryResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IGetWorkflowExecutionHistoryResponse*](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryresponse.md) | GetWorkflowExecutionHistoryResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*GetWorkflowExecutionHistoryResponse*](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryresponse.md)

Creates a GetWorkflowExecutionHistoryResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*GetWorkflowExecutionHistoryResponse*](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryresponse.md)

GetWorkflowExecutionHistoryResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*GetWorkflowExecutionHistoryResponse*](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a GetWorkflowExecutionHistoryResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*GetWorkflowExecutionHistoryResponse*](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryresponse.md) | GetWorkflowExecutionHistoryResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a GetWorkflowExecutionHistoryResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
