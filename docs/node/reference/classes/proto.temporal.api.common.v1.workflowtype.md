# Class: WorkflowType

[common](../modules/proto.temporal.api.common.md).[v1](../modules/proto.temporal.api.common.v1.md).WorkflowType

Represents a WorkflowType.

## Implements

* [*IWorkflowType*](../interfaces/proto.temporal.api.common.v1.iworkflowtype.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.common.v1.workflowtype.md#constructor)

### Properties

- [name](proto.temporal.api.common.v1.workflowtype.md#name)

### Methods

- [toJSON](proto.temporal.api.common.v1.workflowtype.md#tojson)
- [create](proto.temporal.api.common.v1.workflowtype.md#create)
- [decode](proto.temporal.api.common.v1.workflowtype.md#decode)
- [decodeDelimited](proto.temporal.api.common.v1.workflowtype.md#decodedelimited)
- [encode](proto.temporal.api.common.v1.workflowtype.md#encode)
- [encodeDelimited](proto.temporal.api.common.v1.workflowtype.md#encodedelimited)
- [fromObject](proto.temporal.api.common.v1.workflowtype.md#fromobject)
- [toObject](proto.temporal.api.common.v1.workflowtype.md#toobject)
- [verify](proto.temporal.api.common.v1.workflowtype.md#verify)

## Constructors

### constructor

\+ **new WorkflowType**(`properties?`: [*IWorkflowType*](../interfaces/proto.temporal.api.common.v1.iworkflowtype.md)): [*WorkflowType*](proto.temporal.api.common.v1.workflowtype.md)

Constructs a new WorkflowType.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowType*](../interfaces/proto.temporal.api.common.v1.iworkflowtype.md) |

**Returns:** [*WorkflowType*](proto.temporal.api.common.v1.workflowtype.md)

## Properties

### name

• **name**: *string*

WorkflowType name.

Implementation of: [IWorkflowType](../interfaces/proto.temporal.api.common.v1.iworkflowtype.md).[name](../interfaces/proto.temporal.api.common.v1.iworkflowtype.md#name)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this WorkflowType to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IWorkflowType*](../interfaces/proto.temporal.api.common.v1.iworkflowtype.md)): [*WorkflowType*](proto.temporal.api.common.v1.workflowtype.md)

Creates a new WorkflowType instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWorkflowType*](../interfaces/proto.temporal.api.common.v1.iworkflowtype.md) |

**Returns:** [*WorkflowType*](proto.temporal.api.common.v1.workflowtype.md)

WorkflowType instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*WorkflowType*](proto.temporal.api.common.v1.workflowtype.md)

Decodes a WorkflowType message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*WorkflowType*](proto.temporal.api.common.v1.workflowtype.md)

WorkflowType

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*WorkflowType*](proto.temporal.api.common.v1.workflowtype.md)

Decodes a WorkflowType message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*WorkflowType*](proto.temporal.api.common.v1.workflowtype.md)

WorkflowType

___

### encode

▸ `Static`**encode**(`message`: [*IWorkflowType*](../interfaces/proto.temporal.api.common.v1.iworkflowtype.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowType message. Does not implicitly [verify](proto.temporal.api.common.v1.workflowtype.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowType*](../interfaces/proto.temporal.api.common.v1.iworkflowtype.md) | WorkflowType message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IWorkflowType*](../interfaces/proto.temporal.api.common.v1.iworkflowtype.md), `writer?`: *Writer*): *Writer*

Encodes the specified WorkflowType message, length delimited. Does not implicitly [verify](proto.temporal.api.common.v1.workflowtype.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWorkflowType*](../interfaces/proto.temporal.api.common.v1.iworkflowtype.md) | WorkflowType message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*WorkflowType*](proto.temporal.api.common.v1.workflowtype.md)

Creates a WorkflowType message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*WorkflowType*](proto.temporal.api.common.v1.workflowtype.md)

WorkflowType

___

### toObject

▸ `Static`**toObject**(`message`: [*WorkflowType*](proto.temporal.api.common.v1.workflowtype.md), `options?`: IConversionOptions): *object*

Creates a plain object from a WorkflowType message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*WorkflowType*](proto.temporal.api.common.v1.workflowtype.md) | WorkflowType   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a WorkflowType message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
