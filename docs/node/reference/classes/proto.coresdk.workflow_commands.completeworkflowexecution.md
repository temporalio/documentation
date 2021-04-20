# Class: CompleteWorkflowExecution

[coresdk](../modules/proto.coresdk.md).[workflow_commands](../modules/proto.coresdk.workflow_commands.md).CompleteWorkflowExecution

Issued when the workflow completes successfully

## Implements

* [*ICompleteWorkflowExecution*](../interfaces/proto.coresdk.workflow_commands.icompleteworkflowexecution.md)

## Table of contents

### Constructors

- [constructor](proto.coresdk.workflow_commands.completeworkflowexecution.md#constructor)

### Properties

- [result](proto.coresdk.workflow_commands.completeworkflowexecution.md#result)

### Methods

- [toJSON](proto.coresdk.workflow_commands.completeworkflowexecution.md#tojson)
- [create](proto.coresdk.workflow_commands.completeworkflowexecution.md#create)
- [decode](proto.coresdk.workflow_commands.completeworkflowexecution.md#decode)
- [decodeDelimited](proto.coresdk.workflow_commands.completeworkflowexecution.md#decodedelimited)
- [encode](proto.coresdk.workflow_commands.completeworkflowexecution.md#encode)
- [encodeDelimited](proto.coresdk.workflow_commands.completeworkflowexecution.md#encodedelimited)
- [fromObject](proto.coresdk.workflow_commands.completeworkflowexecution.md#fromobject)
- [toObject](proto.coresdk.workflow_commands.completeworkflowexecution.md#toobject)
- [verify](proto.coresdk.workflow_commands.completeworkflowexecution.md#verify)

## Constructors

### constructor

\+ **new CompleteWorkflowExecution**(`properties?`: [*ICompleteWorkflowExecution*](../interfaces/proto.coresdk.workflow_commands.icompleteworkflowexecution.md)): [*CompleteWorkflowExecution*](proto.coresdk.workflow_commands.completeworkflowexecution.md)

Constructs a new CompleteWorkflowExecution.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ICompleteWorkflowExecution*](../interfaces/proto.coresdk.workflow_commands.icompleteworkflowexecution.md) |

**Returns:** [*CompleteWorkflowExecution*](proto.coresdk.workflow_commands.completeworkflowexecution.md)

## Properties

### result

• `Optional` **result**: *null* \| [*IPayload*](../interfaces/proto.coresdk.common.ipayload.md)

CompleteWorkflowExecution result.

Implementation of: [ICompleteWorkflowExecution](../interfaces/proto.coresdk.workflow_commands.icompleteworkflowexecution.md).[result](../interfaces/proto.coresdk.workflow_commands.icompleteworkflowexecution.md#result)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this CompleteWorkflowExecution to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ICompleteWorkflowExecution*](../interfaces/proto.coresdk.workflow_commands.icompleteworkflowexecution.md)): [*CompleteWorkflowExecution*](proto.coresdk.workflow_commands.completeworkflowexecution.md)

Creates a new CompleteWorkflowExecution instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ICompleteWorkflowExecution*](../interfaces/proto.coresdk.workflow_commands.icompleteworkflowexecution.md) |

**Returns:** [*CompleteWorkflowExecution*](proto.coresdk.workflow_commands.completeworkflowexecution.md)

CompleteWorkflowExecution instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*CompleteWorkflowExecution*](proto.coresdk.workflow_commands.completeworkflowexecution.md)

Decodes a CompleteWorkflowExecution message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*CompleteWorkflowExecution*](proto.coresdk.workflow_commands.completeworkflowexecution.md)

CompleteWorkflowExecution

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*CompleteWorkflowExecution*](proto.coresdk.workflow_commands.completeworkflowexecution.md)

Decodes a CompleteWorkflowExecution message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*CompleteWorkflowExecution*](proto.coresdk.workflow_commands.completeworkflowexecution.md)

CompleteWorkflowExecution

___

### encode

▸ `Static`**encode**(`message`: [*ICompleteWorkflowExecution*](../interfaces/proto.coresdk.workflow_commands.icompleteworkflowexecution.md), `writer?`: *Writer*): *Writer*

Encodes the specified CompleteWorkflowExecution message. Does not implicitly [verify](proto.coresdk.workflow_commands.completeworkflowexecution.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ICompleteWorkflowExecution*](../interfaces/proto.coresdk.workflow_commands.icompleteworkflowexecution.md) | CompleteWorkflowExecution message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ICompleteWorkflowExecution*](../interfaces/proto.coresdk.workflow_commands.icompleteworkflowexecution.md), `writer?`: *Writer*): *Writer*

Encodes the specified CompleteWorkflowExecution message, length delimited. Does not implicitly [verify](proto.coresdk.workflow_commands.completeworkflowexecution.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ICompleteWorkflowExecution*](../interfaces/proto.coresdk.workflow_commands.icompleteworkflowexecution.md) | CompleteWorkflowExecution message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*CompleteWorkflowExecution*](proto.coresdk.workflow_commands.completeworkflowexecution.md)

Creates a CompleteWorkflowExecution message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*CompleteWorkflowExecution*](proto.coresdk.workflow_commands.completeworkflowexecution.md)

CompleteWorkflowExecution

___

### toObject

▸ `Static`**toObject**(`message`: [*CompleteWorkflowExecution*](proto.coresdk.workflow_commands.completeworkflowexecution.md), `options?`: IConversionOptions): *object*

Creates a plain object from a CompleteWorkflowExecution message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*CompleteWorkflowExecution*](proto.coresdk.workflow_commands.completeworkflowexecution.md) | CompleteWorkflowExecution   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a CompleteWorkflowExecution message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
