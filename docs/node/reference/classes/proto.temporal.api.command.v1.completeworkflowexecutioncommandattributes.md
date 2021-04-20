# Class: CompleteWorkflowExecutionCommandAttributes

[command](../modules/proto.temporal.api.command.md).[v1](../modules/proto.temporal.api.command.v1.md).CompleteWorkflowExecutionCommandAttributes

Represents a CompleteWorkflowExecutionCommandAttributes.

## Implements

* [*ICompleteWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icompleteworkflowexecutioncommandattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.command.v1.completeworkflowexecutioncommandattributes.md#constructor)

### Properties

- [result](proto.temporal.api.command.v1.completeworkflowexecutioncommandattributes.md#result)

### Methods

- [toJSON](proto.temporal.api.command.v1.completeworkflowexecutioncommandattributes.md#tojson)
- [create](proto.temporal.api.command.v1.completeworkflowexecutioncommandattributes.md#create)
- [decode](proto.temporal.api.command.v1.completeworkflowexecutioncommandattributes.md#decode)
- [decodeDelimited](proto.temporal.api.command.v1.completeworkflowexecutioncommandattributes.md#decodedelimited)
- [encode](proto.temporal.api.command.v1.completeworkflowexecutioncommandattributes.md#encode)
- [encodeDelimited](proto.temporal.api.command.v1.completeworkflowexecutioncommandattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.command.v1.completeworkflowexecutioncommandattributes.md#fromobject)
- [toObject](proto.temporal.api.command.v1.completeworkflowexecutioncommandattributes.md#toobject)
- [verify](proto.temporal.api.command.v1.completeworkflowexecutioncommandattributes.md#verify)

## Constructors

### constructor

\+ **new CompleteWorkflowExecutionCommandAttributes**(`properties?`: [*ICompleteWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icompleteworkflowexecutioncommandattributes.md)): [*CompleteWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.completeworkflowexecutioncommandattributes.md)

Constructs a new CompleteWorkflowExecutionCommandAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ICompleteWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icompleteworkflowexecutioncommandattributes.md) |

**Returns:** [*CompleteWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.completeworkflowexecutioncommandattributes.md)

## Properties

### result

• `Optional` **result**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

CompleteWorkflowExecutionCommandAttributes result.

Implementation of: [ICompleteWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.icompleteworkflowexecutioncommandattributes.md).[result](../interfaces/proto.temporal.api.command.v1.icompleteworkflowexecutioncommandattributes.md#result)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this CompleteWorkflowExecutionCommandAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ICompleteWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icompleteworkflowexecutioncommandattributes.md)): [*CompleteWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.completeworkflowexecutioncommandattributes.md)

Creates a new CompleteWorkflowExecutionCommandAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ICompleteWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icompleteworkflowexecutioncommandattributes.md) |

**Returns:** [*CompleteWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.completeworkflowexecutioncommandattributes.md)

CompleteWorkflowExecutionCommandAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*CompleteWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.completeworkflowexecutioncommandattributes.md)

Decodes a CompleteWorkflowExecutionCommandAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*CompleteWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.completeworkflowexecutioncommandattributes.md)

CompleteWorkflowExecutionCommandAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*CompleteWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.completeworkflowexecutioncommandattributes.md)

Decodes a CompleteWorkflowExecutionCommandAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*CompleteWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.completeworkflowexecutioncommandattributes.md)

CompleteWorkflowExecutionCommandAttributes

___

### encode

▸ `Static`**encode**(`message`: [*ICompleteWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icompleteworkflowexecutioncommandattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified CompleteWorkflowExecutionCommandAttributes message. Does not implicitly [verify](proto.temporal.api.command.v1.completeworkflowexecutioncommandattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ICompleteWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icompleteworkflowexecutioncommandattributes.md) | CompleteWorkflowExecutionCommandAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ICompleteWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icompleteworkflowexecutioncommandattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified CompleteWorkflowExecutionCommandAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.command.v1.completeworkflowexecutioncommandattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ICompleteWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icompleteworkflowexecutioncommandattributes.md) | CompleteWorkflowExecutionCommandAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*CompleteWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.completeworkflowexecutioncommandattributes.md)

Creates a CompleteWorkflowExecutionCommandAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*CompleteWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.completeworkflowexecutioncommandattributes.md)

CompleteWorkflowExecutionCommandAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*CompleteWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.completeworkflowexecutioncommandattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a CompleteWorkflowExecutionCommandAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*CompleteWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.completeworkflowexecutioncommandattributes.md) | CompleteWorkflowExecutionCommandAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a CompleteWorkflowExecutionCommandAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
