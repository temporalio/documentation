# Class: DescribeTaskQueueRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).DescribeTaskQueueRequest

Represents a DescribeTaskQueueRequest.

## Implements

* [*IDescribeTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribetaskqueuerequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.describetaskqueuerequest.md#constructor)

### Properties

- [includeTaskQueueStatus](proto.temporal.api.workflowservice.v1.describetaskqueuerequest.md#includetaskqueuestatus)
- [namespace](proto.temporal.api.workflowservice.v1.describetaskqueuerequest.md#namespace)
- [taskQueue](proto.temporal.api.workflowservice.v1.describetaskqueuerequest.md#taskqueue)
- [taskQueueType](proto.temporal.api.workflowservice.v1.describetaskqueuerequest.md#taskqueuetype)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.describetaskqueuerequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.describetaskqueuerequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.describetaskqueuerequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.describetaskqueuerequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.describetaskqueuerequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.describetaskqueuerequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.describetaskqueuerequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.describetaskqueuerequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.describetaskqueuerequest.md#verify)

## Constructors

### constructor

\+ **new DescribeTaskQueueRequest**(`properties?`: [*IDescribeTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribetaskqueuerequest.md)): [*DescribeTaskQueueRequest*](proto.temporal.api.workflowservice.v1.describetaskqueuerequest.md)

Constructs a new DescribeTaskQueueRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IDescribeTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribetaskqueuerequest.md) |

**Returns:** [*DescribeTaskQueueRequest*](proto.temporal.api.workflowservice.v1.describetaskqueuerequest.md)

## Properties

### includeTaskQueueStatus

• **includeTaskQueueStatus**: *boolean*

DescribeTaskQueueRequest includeTaskQueueStatus.

Implementation of: [IDescribeTaskQueueRequest](../interfaces/proto.temporal.api.workflowservice.v1.idescribetaskqueuerequest.md).[includeTaskQueueStatus](../interfaces/proto.temporal.api.workflowservice.v1.idescribetaskqueuerequest.md#includetaskqueuestatus)

___

### namespace

• **namespace**: *string*

DescribeTaskQueueRequest namespace.

Implementation of: [IDescribeTaskQueueRequest](../interfaces/proto.temporal.api.workflowservice.v1.idescribetaskqueuerequest.md).[namespace](../interfaces/proto.temporal.api.workflowservice.v1.idescribetaskqueuerequest.md#namespace)

___

### taskQueue

• `Optional` **taskQueue**: *null* \| [*ITaskQueue*](../interfaces/proto.temporal.api.taskqueue.v1.itaskqueue.md)

DescribeTaskQueueRequest taskQueue.

Implementation of: [IDescribeTaskQueueRequest](../interfaces/proto.temporal.api.workflowservice.v1.idescribetaskqueuerequest.md).[taskQueue](../interfaces/proto.temporal.api.workflowservice.v1.idescribetaskqueuerequest.md#taskqueue)

___

### taskQueueType

• **taskQueueType**: [*TaskQueueType*](../enums/proto.temporal.api.enums.v1.taskqueuetype.md)

DescribeTaskQueueRequest taskQueueType.

Implementation of: [IDescribeTaskQueueRequest](../interfaces/proto.temporal.api.workflowservice.v1.idescribetaskqueuerequest.md).[taskQueueType](../interfaces/proto.temporal.api.workflowservice.v1.idescribetaskqueuerequest.md#taskqueuetype)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this DescribeTaskQueueRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IDescribeTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribetaskqueuerequest.md)): [*DescribeTaskQueueRequest*](proto.temporal.api.workflowservice.v1.describetaskqueuerequest.md)

Creates a new DescribeTaskQueueRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IDescribeTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribetaskqueuerequest.md) |

**Returns:** [*DescribeTaskQueueRequest*](proto.temporal.api.workflowservice.v1.describetaskqueuerequest.md)

DescribeTaskQueueRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*DescribeTaskQueueRequest*](proto.temporal.api.workflowservice.v1.describetaskqueuerequest.md)

Decodes a DescribeTaskQueueRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*DescribeTaskQueueRequest*](proto.temporal.api.workflowservice.v1.describetaskqueuerequest.md)

DescribeTaskQueueRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*DescribeTaskQueueRequest*](proto.temporal.api.workflowservice.v1.describetaskqueuerequest.md)

Decodes a DescribeTaskQueueRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*DescribeTaskQueueRequest*](proto.temporal.api.workflowservice.v1.describetaskqueuerequest.md)

DescribeTaskQueueRequest

___

### encode

▸ `Static`**encode**(`message`: [*IDescribeTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribetaskqueuerequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified DescribeTaskQueueRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.describetaskqueuerequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IDescribeTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribetaskqueuerequest.md) | DescribeTaskQueueRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IDescribeTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribetaskqueuerequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified DescribeTaskQueueRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.describetaskqueuerequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IDescribeTaskQueueRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribetaskqueuerequest.md) | DescribeTaskQueueRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*DescribeTaskQueueRequest*](proto.temporal.api.workflowservice.v1.describetaskqueuerequest.md)

Creates a DescribeTaskQueueRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*DescribeTaskQueueRequest*](proto.temporal.api.workflowservice.v1.describetaskqueuerequest.md)

DescribeTaskQueueRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*DescribeTaskQueueRequest*](proto.temporal.api.workflowservice.v1.describetaskqueuerequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a DescribeTaskQueueRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*DescribeTaskQueueRequest*](proto.temporal.api.workflowservice.v1.describetaskqueuerequest.md) | DescribeTaskQueueRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a DescribeTaskQueueRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
