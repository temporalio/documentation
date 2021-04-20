# Class: GetWorkflowExecutionHistoryRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).GetWorkflowExecutionHistoryRequest

Represents a GetWorkflowExecutionHistoryRequest.

## Implements

* [*IGetWorkflowExecutionHistoryRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryrequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryrequest.md#constructor)

### Properties

- [execution](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryrequest.md#execution)
- [historyEventFilterType](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryrequest.md#historyeventfiltertype)
- [maximumPageSize](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryrequest.md#maximumpagesize)
- [namespace](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryrequest.md#namespace)
- [nextPageToken](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryrequest.md#nextpagetoken)
- [skipArchival](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryrequest.md#skiparchival)
- [waitNewEvent](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryrequest.md#waitnewevent)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryrequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryrequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryrequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryrequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryrequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryrequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryrequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryrequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryrequest.md#verify)

## Constructors

### constructor

\+ **new GetWorkflowExecutionHistoryRequest**(`properties?`: [*IGetWorkflowExecutionHistoryRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryrequest.md)): [*GetWorkflowExecutionHistoryRequest*](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryrequest.md)

Constructs a new GetWorkflowExecutionHistoryRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IGetWorkflowExecutionHistoryRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryrequest.md) |

**Returns:** [*GetWorkflowExecutionHistoryRequest*](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryrequest.md)

## Properties

### execution

• `Optional` **execution**: *null* \| [*IWorkflowExecution*](../interfaces/proto.temporal.api.common.v1.iworkflowexecution.md)

GetWorkflowExecutionHistoryRequest execution.

Implementation of: [IGetWorkflowExecutionHistoryRequest](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryrequest.md).[execution](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryrequest.md#execution)

___

### historyEventFilterType

• **historyEventFilterType**: [*HistoryEventFilterType*](../enums/proto.temporal.api.enums.v1.historyeventfiltertype.md)

GetWorkflowExecutionHistoryRequest historyEventFilterType.

Implementation of: [IGetWorkflowExecutionHistoryRequest](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryrequest.md).[historyEventFilterType](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryrequest.md#historyeventfiltertype)

___

### maximumPageSize

• **maximumPageSize**: *number*

GetWorkflowExecutionHistoryRequest maximumPageSize.

Implementation of: [IGetWorkflowExecutionHistoryRequest](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryrequest.md).[maximumPageSize](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryrequest.md#maximumpagesize)

___

### namespace

• **namespace**: *string*

GetWorkflowExecutionHistoryRequest namespace.

Implementation of: [IGetWorkflowExecutionHistoryRequest](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryrequest.md).[namespace](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryrequest.md#namespace)

___

### nextPageToken

• **nextPageToken**: *Uint8Array*

GetWorkflowExecutionHistoryRequest nextPageToken.

Implementation of: [IGetWorkflowExecutionHistoryRequest](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryrequest.md).[nextPageToken](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryrequest.md#nextpagetoken)

___

### skipArchival

• **skipArchival**: *boolean*

GetWorkflowExecutionHistoryRequest skipArchival.

Implementation of: [IGetWorkflowExecutionHistoryRequest](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryrequest.md).[skipArchival](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryrequest.md#skiparchival)

___

### waitNewEvent

• **waitNewEvent**: *boolean*

GetWorkflowExecutionHistoryRequest waitNewEvent.

Implementation of: [IGetWorkflowExecutionHistoryRequest](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryrequest.md).[waitNewEvent](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryrequest.md#waitnewevent)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this GetWorkflowExecutionHistoryRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IGetWorkflowExecutionHistoryRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryrequest.md)): [*GetWorkflowExecutionHistoryRequest*](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryrequest.md)

Creates a new GetWorkflowExecutionHistoryRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IGetWorkflowExecutionHistoryRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryrequest.md) |

**Returns:** [*GetWorkflowExecutionHistoryRequest*](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryrequest.md)

GetWorkflowExecutionHistoryRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*GetWorkflowExecutionHistoryRequest*](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryrequest.md)

Decodes a GetWorkflowExecutionHistoryRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*GetWorkflowExecutionHistoryRequest*](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryrequest.md)

GetWorkflowExecutionHistoryRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*GetWorkflowExecutionHistoryRequest*](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryrequest.md)

Decodes a GetWorkflowExecutionHistoryRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*GetWorkflowExecutionHistoryRequest*](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryrequest.md)

GetWorkflowExecutionHistoryRequest

___

### encode

▸ `Static`**encode**(`message`: [*IGetWorkflowExecutionHistoryRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified GetWorkflowExecutionHistoryRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IGetWorkflowExecutionHistoryRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryrequest.md) | GetWorkflowExecutionHistoryRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IGetWorkflowExecutionHistoryRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified GetWorkflowExecutionHistoryRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IGetWorkflowExecutionHistoryRequest*](../interfaces/proto.temporal.api.workflowservice.v1.igetworkflowexecutionhistoryrequest.md) | GetWorkflowExecutionHistoryRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*GetWorkflowExecutionHistoryRequest*](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryrequest.md)

Creates a GetWorkflowExecutionHistoryRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*GetWorkflowExecutionHistoryRequest*](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryrequest.md)

GetWorkflowExecutionHistoryRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*GetWorkflowExecutionHistoryRequest*](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryrequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a GetWorkflowExecutionHistoryRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*GetWorkflowExecutionHistoryRequest*](proto.temporal.api.workflowservice.v1.getworkflowexecutionhistoryrequest.md) | GetWorkflowExecutionHistoryRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a GetWorkflowExecutionHistoryRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
