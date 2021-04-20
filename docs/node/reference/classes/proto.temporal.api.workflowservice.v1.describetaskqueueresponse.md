# Class: DescribeTaskQueueResponse

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).DescribeTaskQueueResponse

Represents a DescribeTaskQueueResponse.

## Implements

* [*IDescribeTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.idescribetaskqueueresponse.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.describetaskqueueresponse.md#constructor)

### Properties

- [pollers](proto.temporal.api.workflowservice.v1.describetaskqueueresponse.md#pollers)
- [taskQueueStatus](proto.temporal.api.workflowservice.v1.describetaskqueueresponse.md#taskqueuestatus)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.describetaskqueueresponse.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.describetaskqueueresponse.md#create)
- [decode](proto.temporal.api.workflowservice.v1.describetaskqueueresponse.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.describetaskqueueresponse.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.describetaskqueueresponse.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.describetaskqueueresponse.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.describetaskqueueresponse.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.describetaskqueueresponse.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.describetaskqueueresponse.md#verify)

## Constructors

### constructor

\+ **new DescribeTaskQueueResponse**(`properties?`: [*IDescribeTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.idescribetaskqueueresponse.md)): [*DescribeTaskQueueResponse*](proto.temporal.api.workflowservice.v1.describetaskqueueresponse.md)

Constructs a new DescribeTaskQueueResponse.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IDescribeTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.idescribetaskqueueresponse.md) |

**Returns:** [*DescribeTaskQueueResponse*](proto.temporal.api.workflowservice.v1.describetaskqueueresponse.md)

## Properties

### pollers

• **pollers**: [*IPollerInfo*](../interfaces/proto.temporal.api.taskqueue.v1.ipollerinfo.md)[]

DescribeTaskQueueResponse pollers.

Implementation of: [IDescribeTaskQueueResponse](../interfaces/proto.temporal.api.workflowservice.v1.idescribetaskqueueresponse.md).[pollers](../interfaces/proto.temporal.api.workflowservice.v1.idescribetaskqueueresponse.md#pollers)

___

### taskQueueStatus

• `Optional` **taskQueueStatus**: *null* \| [*ITaskQueueStatus*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueuestatus.md)

DescribeTaskQueueResponse taskQueueStatus.

Implementation of: [IDescribeTaskQueueResponse](../interfaces/proto.temporal.api.workflowservice.v1.idescribetaskqueueresponse.md).[taskQueueStatus](../interfaces/proto.temporal.api.workflowservice.v1.idescribetaskqueueresponse.md#taskqueuestatus)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this DescribeTaskQueueResponse to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IDescribeTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.idescribetaskqueueresponse.md)): [*DescribeTaskQueueResponse*](proto.temporal.api.workflowservice.v1.describetaskqueueresponse.md)

Creates a new DescribeTaskQueueResponse instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IDescribeTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.idescribetaskqueueresponse.md) |

**Returns:** [*DescribeTaskQueueResponse*](proto.temporal.api.workflowservice.v1.describetaskqueueresponse.md)

DescribeTaskQueueResponse instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*DescribeTaskQueueResponse*](proto.temporal.api.workflowservice.v1.describetaskqueueresponse.md)

Decodes a DescribeTaskQueueResponse message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*DescribeTaskQueueResponse*](proto.temporal.api.workflowservice.v1.describetaskqueueresponse.md)

DescribeTaskQueueResponse

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*DescribeTaskQueueResponse*](proto.temporal.api.workflowservice.v1.describetaskqueueresponse.md)

Decodes a DescribeTaskQueueResponse message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*DescribeTaskQueueResponse*](proto.temporal.api.workflowservice.v1.describetaskqueueresponse.md)

DescribeTaskQueueResponse

___

### encode

▸ `Static`**encode**(`message`: [*IDescribeTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.idescribetaskqueueresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified DescribeTaskQueueResponse message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.describetaskqueueresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IDescribeTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.idescribetaskqueueresponse.md) | DescribeTaskQueueResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IDescribeTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.idescribetaskqueueresponse.md), `writer?`: *Writer*): *Writer*

Encodes the specified DescribeTaskQueueResponse message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.describetaskqueueresponse.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IDescribeTaskQueueResponse*](../interfaces/proto.temporal.api.workflowservice.v1.idescribetaskqueueresponse.md) | DescribeTaskQueueResponse message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*DescribeTaskQueueResponse*](proto.temporal.api.workflowservice.v1.describetaskqueueresponse.md)

Creates a DescribeTaskQueueResponse message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*DescribeTaskQueueResponse*](proto.temporal.api.workflowservice.v1.describetaskqueueresponse.md)

DescribeTaskQueueResponse

___

### toObject

▸ `Static`**toObject**(`message`: [*DescribeTaskQueueResponse*](proto.temporal.api.workflowservice.v1.describetaskqueueresponse.md), `options?`: IConversionOptions): *object*

Creates a plain object from a DescribeTaskQueueResponse message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*DescribeTaskQueueResponse*](proto.temporal.api.workflowservice.v1.describetaskqueueresponse.md) | DescribeTaskQueueResponse   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a DescribeTaskQueueResponse message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
