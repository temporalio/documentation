# Class: FailWorkflowExecution

[coresdk](../modules/proto.coresdk.md).[workflow_commands](../modules/proto.coresdk.workflow_commands.md).FailWorkflowExecution

Issued when the workflow errors out

## Implements

* [*IFailWorkflowExecution*](../interfaces/proto.coresdk.workflow_commands.ifailworkflowexecution.md)

## Table of contents

### Constructors

- [constructor](proto.coresdk.workflow_commands.failworkflowexecution.md#constructor)

### Properties

- [failure](proto.coresdk.workflow_commands.failworkflowexecution.md#failure)

### Methods

- [toJSON](proto.coresdk.workflow_commands.failworkflowexecution.md#tojson)
- [create](proto.coresdk.workflow_commands.failworkflowexecution.md#create)
- [decode](proto.coresdk.workflow_commands.failworkflowexecution.md#decode)
- [decodeDelimited](proto.coresdk.workflow_commands.failworkflowexecution.md#decodedelimited)
- [encode](proto.coresdk.workflow_commands.failworkflowexecution.md#encode)
- [encodeDelimited](proto.coresdk.workflow_commands.failworkflowexecution.md#encodedelimited)
- [fromObject](proto.coresdk.workflow_commands.failworkflowexecution.md#fromobject)
- [toObject](proto.coresdk.workflow_commands.failworkflowexecution.md#toobject)
- [verify](proto.coresdk.workflow_commands.failworkflowexecution.md#verify)

## Constructors

### constructor

\+ **new FailWorkflowExecution**(`properties?`: [*IFailWorkflowExecution*](../interfaces/proto.coresdk.workflow_commands.ifailworkflowexecution.md)): [*FailWorkflowExecution*](proto.coresdk.workflow_commands.failworkflowexecution.md)

Constructs a new FailWorkflowExecution.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IFailWorkflowExecution*](../interfaces/proto.coresdk.workflow_commands.ifailworkflowexecution.md) |

**Returns:** [*FailWorkflowExecution*](proto.coresdk.workflow_commands.failworkflowexecution.md)

## Properties

### failure

• `Optional` **failure**: *null* \| [*IUserCodeFailure*](../interfaces/proto.coresdk.common.iusercodefailure.md)

FailWorkflowExecution failure.

Implementation of: [IFailWorkflowExecution](../interfaces/proto.coresdk.workflow_commands.ifailworkflowexecution.md).[failure](../interfaces/proto.coresdk.workflow_commands.ifailworkflowexecution.md#failure)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this FailWorkflowExecution to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IFailWorkflowExecution*](../interfaces/proto.coresdk.workflow_commands.ifailworkflowexecution.md)): [*FailWorkflowExecution*](proto.coresdk.workflow_commands.failworkflowexecution.md)

Creates a new FailWorkflowExecution instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IFailWorkflowExecution*](../interfaces/proto.coresdk.workflow_commands.ifailworkflowexecution.md) |

**Returns:** [*FailWorkflowExecution*](proto.coresdk.workflow_commands.failworkflowexecution.md)

FailWorkflowExecution instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*FailWorkflowExecution*](proto.coresdk.workflow_commands.failworkflowexecution.md)

Decodes a FailWorkflowExecution message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*FailWorkflowExecution*](proto.coresdk.workflow_commands.failworkflowexecution.md)

FailWorkflowExecution

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*FailWorkflowExecution*](proto.coresdk.workflow_commands.failworkflowexecution.md)

Decodes a FailWorkflowExecution message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*FailWorkflowExecution*](proto.coresdk.workflow_commands.failworkflowexecution.md)

FailWorkflowExecution

___

### encode

▸ `Static`**encode**(`message`: [*IFailWorkflowExecution*](../interfaces/proto.coresdk.workflow_commands.ifailworkflowexecution.md), `writer?`: *Writer*): *Writer*

Encodes the specified FailWorkflowExecution message. Does not implicitly [verify](proto.coresdk.workflow_commands.failworkflowexecution.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IFailWorkflowExecution*](../interfaces/proto.coresdk.workflow_commands.ifailworkflowexecution.md) | FailWorkflowExecution message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IFailWorkflowExecution*](../interfaces/proto.coresdk.workflow_commands.ifailworkflowexecution.md), `writer?`: *Writer*): *Writer*

Encodes the specified FailWorkflowExecution message, length delimited. Does not implicitly [verify](proto.coresdk.workflow_commands.failworkflowexecution.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IFailWorkflowExecution*](../interfaces/proto.coresdk.workflow_commands.ifailworkflowexecution.md) | FailWorkflowExecution message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*FailWorkflowExecution*](proto.coresdk.workflow_commands.failworkflowexecution.md)

Creates a FailWorkflowExecution message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*FailWorkflowExecution*](proto.coresdk.workflow_commands.failworkflowexecution.md)

FailWorkflowExecution

___

### toObject

▸ `Static`**toObject**(`message`: [*FailWorkflowExecution*](proto.coresdk.workflow_commands.failworkflowexecution.md), `options?`: IConversionOptions): *object*

Creates a plain object from a FailWorkflowExecution message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*FailWorkflowExecution*](proto.coresdk.workflow_commands.failworkflowexecution.md) | FailWorkflowExecution   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a FailWorkflowExecution message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
