# Class: FailWorkflowExecutionCommandAttributes

[command](../modules/proto.temporal.api.command.md).[v1](../modules/proto.temporal.api.command.v1.md).FailWorkflowExecutionCommandAttributes

Represents a FailWorkflowExecutionCommandAttributes.

## Implements

* [*IFailWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.ifailworkflowexecutioncommandattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.command.v1.failworkflowexecutioncommandattributes.md#constructor)

### Properties

- [failure](proto.temporal.api.command.v1.failworkflowexecutioncommandattributes.md#failure)

### Methods

- [toJSON](proto.temporal.api.command.v1.failworkflowexecutioncommandattributes.md#tojson)
- [create](proto.temporal.api.command.v1.failworkflowexecutioncommandattributes.md#create)
- [decode](proto.temporal.api.command.v1.failworkflowexecutioncommandattributes.md#decode)
- [decodeDelimited](proto.temporal.api.command.v1.failworkflowexecutioncommandattributes.md#decodedelimited)
- [encode](proto.temporal.api.command.v1.failworkflowexecutioncommandattributes.md#encode)
- [encodeDelimited](proto.temporal.api.command.v1.failworkflowexecutioncommandattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.command.v1.failworkflowexecutioncommandattributes.md#fromobject)
- [toObject](proto.temporal.api.command.v1.failworkflowexecutioncommandattributes.md#toobject)
- [verify](proto.temporal.api.command.v1.failworkflowexecutioncommandattributes.md#verify)

## Constructors

### constructor

\+ **new FailWorkflowExecutionCommandAttributes**(`properties?`: [*IFailWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.ifailworkflowexecutioncommandattributes.md)): [*FailWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.failworkflowexecutioncommandattributes.md)

Constructs a new FailWorkflowExecutionCommandAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IFailWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.ifailworkflowexecutioncommandattributes.md) |

**Returns:** [*FailWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.failworkflowexecutioncommandattributes.md)

## Properties

### failure

• `Optional` **failure**: *null* \| [*IFailure*](../interfaces/proto.temporal.api.failure.v1.ifailure.md)

FailWorkflowExecutionCommandAttributes failure.

Implementation of: [IFailWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.ifailworkflowexecutioncommandattributes.md).[failure](../interfaces/proto.temporal.api.command.v1.ifailworkflowexecutioncommandattributes.md#failure)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this FailWorkflowExecutionCommandAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IFailWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.ifailworkflowexecutioncommandattributes.md)): [*FailWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.failworkflowexecutioncommandattributes.md)

Creates a new FailWorkflowExecutionCommandAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IFailWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.ifailworkflowexecutioncommandattributes.md) |

**Returns:** [*FailWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.failworkflowexecutioncommandattributes.md)

FailWorkflowExecutionCommandAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*FailWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.failworkflowexecutioncommandattributes.md)

Decodes a FailWorkflowExecutionCommandAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*FailWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.failworkflowexecutioncommandattributes.md)

FailWorkflowExecutionCommandAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*FailWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.failworkflowexecutioncommandattributes.md)

Decodes a FailWorkflowExecutionCommandAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*FailWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.failworkflowexecutioncommandattributes.md)

FailWorkflowExecutionCommandAttributes

___

### encode

▸ `Static`**encode**(`message`: [*IFailWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.ifailworkflowexecutioncommandattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified FailWorkflowExecutionCommandAttributes message. Does not implicitly [verify](proto.temporal.api.command.v1.failworkflowexecutioncommandattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IFailWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.ifailworkflowexecutioncommandattributes.md) | FailWorkflowExecutionCommandAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IFailWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.ifailworkflowexecutioncommandattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified FailWorkflowExecutionCommandAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.command.v1.failworkflowexecutioncommandattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IFailWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.ifailworkflowexecutioncommandattributes.md) | FailWorkflowExecutionCommandAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*FailWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.failworkflowexecutioncommandattributes.md)

Creates a FailWorkflowExecutionCommandAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*FailWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.failworkflowexecutioncommandattributes.md)

FailWorkflowExecutionCommandAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*FailWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.failworkflowexecutioncommandattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a FailWorkflowExecutionCommandAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*FailWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.failworkflowexecutioncommandattributes.md) | FailWorkflowExecutionCommandAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a FailWorkflowExecutionCommandAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
