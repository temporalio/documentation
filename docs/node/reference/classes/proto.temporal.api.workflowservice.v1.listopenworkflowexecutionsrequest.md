# Class: ListOpenWorkflowExecutionsRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).ListOpenWorkflowExecutionsRequest

Represents a ListOpenWorkflowExecutionsRequest.

## Implements

* [*IListOpenWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsrequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsrequest.md#constructor)

### Properties

- [executionFilter](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsrequest.md#executionfilter)
- [filters](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsrequest.md#filters)
- [maximumPageSize](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsrequest.md#maximumpagesize)
- [namespace](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsrequest.md#namespace)
- [nextPageToken](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsrequest.md#nextpagetoken)
- [startTimeFilter](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsrequest.md#starttimefilter)
- [typeFilter](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsrequest.md#typefilter)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsrequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsrequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsrequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsrequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsrequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsrequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsrequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsrequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsrequest.md#verify)

## Constructors

### constructor

\+ **new ListOpenWorkflowExecutionsRequest**(`properties?`: [*IListOpenWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsrequest.md)): [*ListOpenWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsrequest.md)

Constructs a new ListOpenWorkflowExecutionsRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IListOpenWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsrequest.md) |

**Returns:** [*ListOpenWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsrequest.md)

## Properties

### executionFilter

• `Optional` **executionFilter**: *null* \| [*IWorkflowExecutionFilter*](../interfaces/proto.temporal.api.filter.v1.iworkflowexecutionfilter.md)

ListOpenWorkflowExecutionsRequest executionFilter.

Implementation of: [IListOpenWorkflowExecutionsRequest](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsrequest.md).[executionFilter](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsrequest.md#executionfilter)

___

### filters

• `Optional` **filters**: *executionFilter* \| *typeFilter*

ListOpenWorkflowExecutionsRequest filters.

___

### maximumPageSize

• **maximumPageSize**: *number*

ListOpenWorkflowExecutionsRequest maximumPageSize.

Implementation of: [IListOpenWorkflowExecutionsRequest](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsrequest.md).[maximumPageSize](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsrequest.md#maximumpagesize)

___

### namespace

• **namespace**: *string*

ListOpenWorkflowExecutionsRequest namespace.

Implementation of: [IListOpenWorkflowExecutionsRequest](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsrequest.md).[namespace](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsrequest.md#namespace)

___

### nextPageToken

• **nextPageToken**: *Uint8Array*

ListOpenWorkflowExecutionsRequest nextPageToken.

Implementation of: [IListOpenWorkflowExecutionsRequest](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsrequest.md).[nextPageToken](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsrequest.md#nextpagetoken)

___

### startTimeFilter

• `Optional` **startTimeFilter**: *null* \| [*IStartTimeFilter*](../interfaces/proto.temporal.api.filter.v1.istarttimefilter.md)

ListOpenWorkflowExecutionsRequest startTimeFilter.

Implementation of: [IListOpenWorkflowExecutionsRequest](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsrequest.md).[startTimeFilter](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsrequest.md#starttimefilter)

___

### typeFilter

• `Optional` **typeFilter**: *null* \| [*IWorkflowTypeFilter*](../interfaces/proto.temporal.api.filter.v1.iworkflowtypefilter.md)

ListOpenWorkflowExecutionsRequest typeFilter.

Implementation of: [IListOpenWorkflowExecutionsRequest](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsrequest.md).[typeFilter](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsrequest.md#typefilter)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this ListOpenWorkflowExecutionsRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IListOpenWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsrequest.md)): [*ListOpenWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsrequest.md)

Creates a new ListOpenWorkflowExecutionsRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IListOpenWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsrequest.md) |

**Returns:** [*ListOpenWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsrequest.md)

ListOpenWorkflowExecutionsRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*ListOpenWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsrequest.md)

Decodes a ListOpenWorkflowExecutionsRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*ListOpenWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsrequest.md)

ListOpenWorkflowExecutionsRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*ListOpenWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsrequest.md)

Decodes a ListOpenWorkflowExecutionsRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*ListOpenWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsrequest.md)

ListOpenWorkflowExecutionsRequest

___

### encode

▸ `Static`**encode**(`message`: [*IListOpenWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified ListOpenWorkflowExecutionsRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IListOpenWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsrequest.md) | ListOpenWorkflowExecutionsRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IListOpenWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified ListOpenWorkflowExecutionsRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IListOpenWorkflowExecutionsRequest*](../interfaces/proto.temporal.api.workflowservice.v1.ilistopenworkflowexecutionsrequest.md) | ListOpenWorkflowExecutionsRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*ListOpenWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsrequest.md)

Creates a ListOpenWorkflowExecutionsRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*ListOpenWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsrequest.md)

ListOpenWorkflowExecutionsRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*ListOpenWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsrequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a ListOpenWorkflowExecutionsRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ListOpenWorkflowExecutionsRequest*](proto.temporal.api.workflowservice.v1.listopenworkflowexecutionsrequest.md) | ListOpenWorkflowExecutionsRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a ListOpenWorkflowExecutionsRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
