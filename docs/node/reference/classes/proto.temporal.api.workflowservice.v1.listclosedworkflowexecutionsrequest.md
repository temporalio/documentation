# Class: ListClosedWorkflowExecutionsRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).ListClosedWorkflowExecutionsRequest

Represents a ListClosedWorkflowExecutionsRequest.

## Implements

* [*IListClosedWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsrequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsrequest.md#constructor)

### Properties

- [executionFilter](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsrequest.md#executionfilter)
- [filters](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsrequest.md#filters)
- [maximumPageSize](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsrequest.md#maximumpagesize)
- [namespace](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsrequest.md#namespace)
- [nextPageToken](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsrequest.md#nextpagetoken)
- [startTimeFilter](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsrequest.md#starttimefilter)
- [statusFilter](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsrequest.md#statusfilter)
- [typeFilter](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsrequest.md#typefilter)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsrequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsrequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsrequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsrequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsrequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsrequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsrequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsrequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsrequest.md#verify)

## Constructors

### constructor

\+ **new ListClosedWorkflowExecutionsRequest**(`properties?`: [*IListClosedWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsrequest.md)): [*ListClosedWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsrequest.md)

Constructs a new ListClosedWorkflowExecutionsRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IListClosedWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsrequest.md) |

**Returns:** [*ListClosedWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsrequest.md)

## Properties

### executionFilter

• `Optional` **executionFilter**: *null* \| [*IWorkflowExecutionFilter*](../interfaces/proto.temporal.api.filter.v1.iworkflowexecutionfilter.md)

ListClosedWorkflowExecutionsRequest executionFilter.

Implementation of: [IListClosedWorkflowExecutionsRequest](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsrequest.md).[executionFilter](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsrequest.md#executionfilter)

___

### filters

• `Optional` **filters**: *executionFilter* \| *typeFilter* \| *statusFilter*

ListClosedWorkflowExecutionsRequest filters.

___

### maximumPageSize

• **maximumPageSize**: *number*

ListClosedWorkflowExecutionsRequest maximumPageSize.

Implementation of: [IListClosedWorkflowExecutionsRequest](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsrequest.md).[maximumPageSize](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsrequest.md#maximumpagesize)

___

### namespace

• **namespace**: *string*

ListClosedWorkflowExecutionsRequest namespace.

Implementation of: [IListClosedWorkflowExecutionsRequest](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsrequest.md).[namespace](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsrequest.md#namespace)

___

### nextPageToken

• **nextPageToken**: *Uint8Array*

ListClosedWorkflowExecutionsRequest nextPageToken.

Implementation of: [IListClosedWorkflowExecutionsRequest](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsrequest.md).[nextPageToken](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsrequest.md#nextpagetoken)

___

### startTimeFilter

• `Optional` **startTimeFilter**: *null* \| [*IStartTimeFilter*](../interfaces/proto.temporal.api.filter.v1.istarttimefilter.md)

ListClosedWorkflowExecutionsRequest startTimeFilter.

Implementation of: [IListClosedWorkflowExecutionsRequest](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsrequest.md).[startTimeFilter](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsrequest.md#starttimefilter)

___

### statusFilter

• `Optional` **statusFilter**: *null* \| [*IStatusFilter*](../interfaces/proto.temporal.api.filter.v1.istatusfilter.md)

ListClosedWorkflowExecutionsRequest statusFilter.

Implementation of: [IListClosedWorkflowExecutionsRequest](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsrequest.md).[statusFilter](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsrequest.md#statusfilter)

___

### typeFilter

• `Optional` **typeFilter**: *null* \| [*IWorkflowTypeFilter*](../interfaces/proto.temporal.api.filter.v1.iworkflowtypefilter.md)

ListClosedWorkflowExecutionsRequest typeFilter.

Implementation of: [IListClosedWorkflowExecutionsRequest](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsrequest.md).[typeFilter](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsrequest.md#typefilter)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ListClosedWorkflowExecutionsRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IListClosedWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsrequest.md)): [*ListClosedWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsrequest.md)

Creates a new ListClosedWorkflowExecutionsRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IListClosedWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsrequest.md) |

**Returns:** [*ListClosedWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsrequest.md)

ListClosedWorkflowExecutionsRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ListClosedWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsrequest.md)

Decodes a ListClosedWorkflowExecutionsRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ListClosedWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsrequest.md)

ListClosedWorkflowExecutionsRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ListClosedWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsrequest.md)

Decodes a ListClosedWorkflowExecutionsRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ListClosedWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsrequest.md)

ListClosedWorkflowExecutionsRequest

___

### encode

▸ `Static`**encode**(`message`: [*IListClosedWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified ListClosedWorkflowExecutionsRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IListClosedWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsrequest.md) | ListClosedWorkflowExecutionsRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IListClosedWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified ListClosedWorkflowExecutionsRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IListClosedWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistclosedworkflowexecutionsrequest.md) | ListClosedWorkflowExecutionsRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ListClosedWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsrequest.md)

Creates a ListClosedWorkflowExecutionsRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ListClosedWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsrequest.md)

ListClosedWorkflowExecutionsRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*ListClosedWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsrequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ListClosedWorkflowExecutionsRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ListClosedWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listclosedworkflowexecutionsrequest.md) | ListClosedWorkflowExecutionsRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ListClosedWorkflowExecutionsRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
