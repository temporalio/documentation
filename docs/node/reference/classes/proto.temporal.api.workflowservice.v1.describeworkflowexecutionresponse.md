# Class: DescribeWorkflowExecutionResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).DescribeWorkflowExecutionResponse

Represents a DescribeWorkflowExecutionResponse.

## Implements

* [*IDescribeWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.describeworkflowexecutionresponse.md#constructor)

### Properties

- [executionConfig](proto.temporal.api.workflowservice.v1.describeworkflowexecutionresponse.md#executionconfig)
- [pendingActivities](proto.temporal.api.workflowservice.v1.describeworkflowexecutionresponse.md#pendingactivities)
- [pendingChildren](proto.temporal.api.workflowservice.v1.describeworkflowexecutionresponse.md#pendingchildren)
- [workflowExecutionInfo](proto.temporal.api.workflowservice.v1.describeworkflowexecutionresponse.md#workflowexecutioninfo)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.describeworkflowexecutionresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.describeworkflowexecutionresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.describeworkflowexecutionresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.describeworkflowexecutionresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.describeworkflowexecutionresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.describeworkflowexecutionresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.describeworkflowexecutionresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.describeworkflowexecutionresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.describeworkflowexecutionresponse.md#verify)

## Constructors

### constructor

\+ **new DescribeWorkflowExecutionResponse**(`properties?`: [*IDescribeWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionresponse.md)): [*DescribeWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.describeworkflowexecutionresponse.md)

Constructs a new DescribeWorkflowExecutionResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IDescribeWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionresponse.md) |

**Returns:** [*DescribeWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.describeworkflowexecutionresponse.md)

## Properties

### executionConfig

• `Optional` **executionConfig**: *null* \| [*IWorkflowExecutionConfig*](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutionconfig.md)

DescribeWorkflowExecutionResponse executionConfig.

Implementation of: [IDescribeWorkflowExecutionResponse](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionresponse.md).[executionConfig](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionresponse.md#executionconfig)

___

### pendingActivities

• **pendingActivities**: [*IPendingActivityInfo*](../interfaces/proto.temporal.api.workflow.v1.ipendingactivityinfo.md)[]

DescribeWorkflowExecutionResponse pendingActivities.

Implementation of: [IDescribeWorkflowExecutionResponse](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionresponse.md).[pendingActivities](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionresponse.md#pendingactivities)

___

### pendingChildren

• **pendingChildren**: [*IPendingChildExecutionInfo*](../interfaces/proto.temporal.api.workflow.v1.ipendingchildexecutioninfo.md)[]

DescribeWorkflowExecutionResponse pendingChildren.

Implementation of: [IDescribeWorkflowExecutionResponse](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionresponse.md).[pendingChildren](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionresponse.md#pendingchildren)

___

### workflowExecutionInfo

• `Optional` **workflowExecutionInfo**: *null* \| [*IWorkflowExecutionInfo*](../interfaces/proto.temporal.api.workflow.v1.iworkflowexecutioninfo.md)

DescribeWorkflowExecutionResponse workflowExecutionInfo.

Implementation of: [IDescribeWorkflowExecutionResponse](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionresponse.md).[workflowExecutionInfo](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionresponse.md#workflowexecutioninfo)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this DescribeWorkflowExecutionResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IDescribeWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionresponse.md)): [*DescribeWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.describeworkflowexecutionresponse.md)

Creates a new DescribeWorkflowExecutionResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IDescribeWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionresponse.md) |

**Returns:** [*DescribeWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.describeworkflowexecutionresponse.md)

DescribeWorkflowExecutionResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*DescribeWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.describeworkflowexecutionresponse.md)

Decodes a DescribeWorkflowExecutionResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*DescribeWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.describeworkflowexecutionresponse.md)

DescribeWorkflowExecutionResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*DescribeWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.describeworkflowexecutionresponse.md)

Decodes a DescribeWorkflowExecutionResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*DescribeWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.describeworkflowexecutionresponse.md)

DescribeWorkflowExecutionResponse

___

### encode

▸ `Static`**encode**(`message`: [*IDescribeWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified DescribeWorkflowExecutionResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.describeworkflowexecutionresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IDescribeWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionresponse.md) | DescribeWorkflowExecutionResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IDescribeWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified DescribeWorkflowExecutionResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.describeworkflowexecutionresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IDescribeWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionresponse.md) | DescribeWorkflowExecutionResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*DescribeWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.describeworkflowexecutionresponse.md)

Creates a DescribeWorkflowExecutionResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*DescribeWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.describeworkflowexecutionresponse.md)

DescribeWorkflowExecutionResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*DescribeWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.describeworkflowexecutionresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a DescribeWorkflowExecutionResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*DescribeWorkflowExecutionResponse*](proto.temporal.api.workflowservice.v1.describeworkflowexecutionresponse.md) | DescribeWorkflowExecutionResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a DescribeWorkflowExecutionResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
