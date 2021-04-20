# Class: StatusFilter

[filter](../modules/proto.temporal.api.filter.md).[v1](../modules/proto.temporal.api.filter.v1.md).StatusFilter

Represents a StatusFilter.

## Implements

* [*IStatusFilter*](../interfaces/proto.temporal.api.filter.v1.istatusfilter.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.filter.v1.statusfilter.md#constructor)

### Properties

- [status](proto.temporal.api.filter.v1.statusfilter.md#status)

### Methods

- [toJSON](proto.temporal.api.filter.v1.statusfilter.md#tojson)
- [create](proto.temporal.api.filter.v1.statusfilter.md#create)
- [decode](proto.temporal.api.filter.v1.statusfilter.md#decode)
- [decodeDelimited](proto.temporal.api.filter.v1.statusfilter.md#decodedelimited)
- [encode](proto.temporal.api.filter.v1.statusfilter.md#encode)
- [encodeDelimited](proto.temporal.api.filter.v1.statusfilter.md#encodedelimited)
- [fromObject](proto.temporal.api.filter.v1.statusfilter.md#fromobject)
- [toObject](proto.temporal.api.filter.v1.statusfilter.md#toobject)
- [verify](proto.temporal.api.filter.v1.statusfilter.md#verify)

## Constructors

### constructor

\+ **new StatusFilter**(`properties?`: [*IStatusFilter*](../interfaces/proto.temporal.api.filter.v1.istatusfilter.md)): [*StatusFilter*](proto.temporal.api.filter.v1.statusfilter.md)

Constructs a new StatusFilter.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IStatusFilter*](../interfaces/proto.temporal.api.filter.v1.istatusfilter.md) |

**Returns:** [*StatusFilter*](proto.temporal.api.filter.v1.statusfilter.md)

## Properties

### status

• **status**: [*WorkflowExecutionStatus*](../enums/proto.temporal.api.enums.v1.workflowexecutionstatus.md)

StatusFilter status.

Implementation of: [IStatusFilter](../interfaces/proto.temporal.api.filter.v1.istatusfilter.md).[status](../interfaces/proto.temporal.api.filter.v1.istatusfilter.md#status)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this StatusFilter to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IStatusFilter*](../interfaces/proto.temporal.api.filter.v1.istatusfilter.md)): [*StatusFilter*](proto.temporal.api.filter.v1.statusfilter.md)

Creates a new StatusFilter instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IStatusFilter*](../interfaces/proto.temporal.api.filter.v1.istatusfilter.md) |

**Returns:** [*StatusFilter*](proto.temporal.api.filter.v1.statusfilter.md)

StatusFilter instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*StatusFilter*](proto.temporal.api.filter.v1.statusfilter.md)

Decodes a StatusFilter message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*StatusFilter*](proto.temporal.api.filter.v1.statusfilter.md)

StatusFilter

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*StatusFilter*](proto.temporal.api.filter.v1.statusfilter.md)

Decodes a StatusFilter message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*StatusFilter*](proto.temporal.api.filter.v1.statusfilter.md)

StatusFilter

___

### encode

▸ `Static`**encode**(`message`: [*IStatusFilter*](../interfaces/proto.temporal.api.filter.v1.istatusfilter.md), `writer?`: *Writer*): *Writer*

Encodes the specified StatusFilter message. Does not implicitly [verify](proto.temporal.api.filter.v1.statusfilter.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IStatusFilter*](../interfaces/proto.temporal.api.filter.v1.istatusfilter.md) | StatusFilter message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IStatusFilter*](../interfaces/proto.temporal.api.filter.v1.istatusfilter.md), `writer?`: *Writer*): *Writer*

Encodes the specified StatusFilter message, length delimited. Does not implicitly [verify](proto.temporal.api.filter.v1.statusfilter.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IStatusFilter*](../interfaces/proto.temporal.api.filter.v1.istatusfilter.md) | StatusFilter message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*StatusFilter*](proto.temporal.api.filter.v1.statusfilter.md)

Creates a StatusFilter message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*StatusFilter*](proto.temporal.api.filter.v1.statusfilter.md)

StatusFilter

___

### toObject

▸ `Static`**toObject**(`message`: [*StatusFilter*](proto.temporal.api.filter.v1.statusfilter.md), `options?`: IConversionOptions): *object*

Creates a plain object from a StatusFilter message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*StatusFilter*](proto.temporal.api.filter.v1.statusfilter.md) | StatusFilter   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a StatusFilter message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
