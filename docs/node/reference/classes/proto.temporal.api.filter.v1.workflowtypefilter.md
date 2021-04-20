# Class: WorkflowTypeFilter

[filter](../modules/proto.temporal.api.filter.md).[v1](../modules/proto.temporal.api.filter.v1.md).WorkflowTypeFilter

Represents a WorkflowTypeFilter.

## Implements

* [*IWorkflowTypeFilter*](../interfaces/proto.temporal.api.filter.v1.iworkflowtypefilter.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.filter.v1.workflowtypefilter.md#constructor)

### Properties

- [name](proto.temporal.api.filter.v1.workflowtypefilter.md#name)

### Methods

- [toJSON](proto.temporal.api.filter.v1.workflowtypefilter.md#tojson)
- [create](proto.temporal.api.filter.v1.workflowtypefilter.md#create)
- [decode](proto.temporal.api.filter.v1.workflowtypefilter.md#decode)
- [decodeDelimited](proto.temporal.api.filter.v1.workflowtypefilter.md#decodedelimited)
- [encode](proto.temporal.api.filter.v1.workflowtypefilter.md#encode)
- [encodeDelimited](proto.temporal.api.filter.v1.workflowtypefilter.md#encodedelimited)
- [fromObject](proto.temporal.api.filter.v1.workflowtypefilter.md#fromobject)
- [toObject](proto.temporal.api.filter.v1.workflowtypefilter.md#toobject)
- [verify](proto.temporal.api.filter.v1.workflowtypefilter.md#verify)

## Constructors

### constructor

\+ **new WorkflowTypeFilter**(`properties?`: [*IWorkflowTypeFilter*](../interfaces/proto.temporal.api.filter.v1.iworkflowtypefilter.md)): [*WorkflowTypeFilter*](proto.temporal.api.filter.v1.workflowtypefilter.md)

Constructs a new WorkflowTypeFilter.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowTypeFilter*](../interfaces/proto.temporal.api.filter.v1.iworkflowtypefilter.md) |

**Returns:** [*WorkflowTypeFilter*](proto.temporal.api.filter.v1.workflowtypefilter.md)

## Properties

### name

• **name**: *string*

WorkflowTypeFilter name.

Implementation of: [IWorkflowTypeFilter](../interfaces/proto.temporal.api.filter.v1.iworkflowtypefilter.md).[name](../interfaces/proto.temporal.api.filter.v1.iworkflowtypefilter.md#name)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this WorkflowTypeFilter to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IWorkflowTypeFilter*](../interfaces/proto.temporal.api.filter.v1.iworkflowtypefilter.md)): [*WorkflowTypeFilter*](proto.temporal.api.filter.v1.workflowtypefilter.md)

Creates a new WorkflowTypeFilter instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowTypeFilter*](../interfaces/proto.temporal.api.filter.v1.iworkflowtypefilter.md) |

**Returns:** [*WorkflowTypeFilter*](proto.temporal.api.filter.v1.workflowtypefilter.md)

WorkflowTypeFilter instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*WorkflowTypeFilter*](proto.temporal.api.filter.v1.workflowtypefilter.md)

Decodes a WorkflowTypeFilter message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*WorkflowTypeFilter*](proto.temporal.api.filter.v1.workflowtypefilter.md)

WorkflowTypeFilter

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*WorkflowTypeFilter*](proto.temporal.api.filter.v1.workflowtypefilter.md)

Decodes a WorkflowTypeFilter message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*WorkflowTypeFilter*](proto.temporal.api.filter.v1.workflowtypefilter.md)

WorkflowTypeFilter

___

### encode

▸ `Static`**encode**(`message`: [*IWorkflowTypeFilter*](../interfaces/proto.temporal.api.filter.v1.iworkflowtypefilter.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowTypeFilter message. Does not implicitly [verify](proto.temporal.api.filter.v1.workflowtypefilter.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowTypeFilter*](../interfaces/proto.temporal.api.filter.v1.iworkflowtypefilter.md) | WorkflowTypeFilter message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IWorkflowTypeFilter*](../interfaces/proto.temporal.api.filter.v1.iworkflowtypefilter.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowTypeFilter message, length delimited. Does not implicitly [verify](proto.temporal.api.filter.v1.workflowtypefilter.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowTypeFilter*](../interfaces/proto.temporal.api.filter.v1.iworkflowtypefilter.md) | WorkflowTypeFilter message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*WorkflowTypeFilter*](proto.temporal.api.filter.v1.workflowtypefilter.md)

Creates a WorkflowTypeFilter message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*WorkflowTypeFilter*](proto.temporal.api.filter.v1.workflowtypefilter.md)

WorkflowTypeFilter

___

### toObject

▸ `Static`**toObject**(`message`: [*WorkflowTypeFilter*](proto.temporal.api.filter.v1.workflowtypefilter.md), `options?`: IConversionOptions): *object*

Creates a plain object from a WorkflowTypeFilter message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*WorkflowTypeFilter*](proto.temporal.api.filter.v1.workflowtypefilter.md) | WorkflowTypeFilter   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a WorkflowTypeFilter message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
