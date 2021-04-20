# Class: DescribeNamespaceRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).DescribeNamespaceRequest

Represents a DescribeNamespaceRequest.

## Implements

* [*IDescribeNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespacerequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.describenamespacerequest.md#constructor)

### Properties

- [id](proto.temporal.api.workflowservice.v1.describenamespacerequest.md#id)
- [namespace](proto.temporal.api.workflowservice.v1.describenamespacerequest.md#namespace)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.describenamespacerequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.describenamespacerequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.describenamespacerequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.describenamespacerequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.describenamespacerequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.describenamespacerequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.describenamespacerequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.describenamespacerequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.describenamespacerequest.md#verify)

## Constructors

### constructor

\+ **new DescribeNamespaceRequest**(`properties?`: [*IDescribeNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespacerequest.md)): [*DescribeNamespaceRequest*](proto.temporal.api.workflowservice.v1.describenamespacerequest.md)

Constructs a new DescribeNamespaceRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IDescribeNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespacerequest.md) |

**Returns:** [*DescribeNamespaceRequest*](proto.temporal.api.workflowservice.v1.describenamespacerequest.md)

## Properties

### id

• **id**: *string*

DescribeNamespaceRequest id.

Implementation of: [IDescribeNamespaceRequest](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespacerequest.md).[id](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespacerequest.md#id)

___

### namespace

• **namespace**: *string*

DescribeNamespaceRequest namespace.

Implementation of: [IDescribeNamespaceRequest](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespacerequest.md).[namespace](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespacerequest.md#namespace)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this DescribeNamespaceRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IDescribeNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespacerequest.md)): [*DescribeNamespaceRequest*](proto.temporal.api.workflowservice.v1.describenamespacerequest.md)

Creates a new DescribeNamespaceRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IDescribeNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespacerequest.md) |

**Returns:** [*DescribeNamespaceRequest*](proto.temporal.api.workflowservice.v1.describenamespacerequest.md)

DescribeNamespaceRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*DescribeNamespaceRequest*](proto.temporal.api.workflowservice.v1.describenamespacerequest.md)

Decodes a DescribeNamespaceRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*DescribeNamespaceRequest*](proto.temporal.api.workflowservice.v1.describenamespacerequest.md)

DescribeNamespaceRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*DescribeNamespaceRequest*](proto.temporal.api.workflowservice.v1.describenamespacerequest.md)

Decodes a DescribeNamespaceRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*DescribeNamespaceRequest*](proto.temporal.api.workflowservice.v1.describenamespacerequest.md)

DescribeNamespaceRequest

___

### encode

▸ `Static`**encode**(`message`: [*IDescribeNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespacerequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified DescribeNamespaceRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.describenamespacerequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IDescribeNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespacerequest.md) | DescribeNamespaceRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IDescribeNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespacerequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified DescribeNamespaceRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.describenamespacerequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IDescribeNamespaceRequest*](../interfaces/proto.temporal.api.workflowservice.v1.idescribenamespacerequest.md) | DescribeNamespaceRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*DescribeNamespaceRequest*](proto.temporal.api.workflowservice.v1.describenamespacerequest.md)

Creates a DescribeNamespaceRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*DescribeNamespaceRequest*](proto.temporal.api.workflowservice.v1.describenamespacerequest.md)

DescribeNamespaceRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*DescribeNamespaceRequest*](proto.temporal.api.workflowservice.v1.describenamespacerequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a DescribeNamespaceRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*DescribeNamespaceRequest*](proto.temporal.api.workflowservice.v1.describenamespacerequest.md) | DescribeNamespaceRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a DescribeNamespaceRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
