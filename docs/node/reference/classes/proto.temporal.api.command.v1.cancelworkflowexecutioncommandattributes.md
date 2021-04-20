# Class: CancelWorkflowExecutionCommandAttributes

[command](../modules/proto.temporal.api.command.md).[v1](../modules/proto.temporal.api.command.v1.md).CancelWorkflowExecutionCommandAttributes

Represents a CancelWorkflowExecutionCommandAttributes.

## Implements

* [*ICancelWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icancelworkflowexecutioncommandattributes.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.command.v1.cancelworkflowexecutioncommandattributes.md#constructor)

### Properties

- [details](proto.temporal.api.command.v1.cancelworkflowexecutioncommandattributes.md#details)

### Methods

- [toJSON](proto.temporal.api.command.v1.cancelworkflowexecutioncommandattributes.md#tojson)
- [create](proto.temporal.api.command.v1.cancelworkflowexecutioncommandattributes.md#create)
- [decode](proto.temporal.api.command.v1.cancelworkflowexecutioncommandattributes.md#decode)
- [decodeDelimited](proto.temporal.api.command.v1.cancelworkflowexecutioncommandattributes.md#decodedelimited)
- [encode](proto.temporal.api.command.v1.cancelworkflowexecutioncommandattributes.md#encode)
- [encodeDelimited](proto.temporal.api.command.v1.cancelworkflowexecutioncommandattributes.md#encodedelimited)
- [fromObject](proto.temporal.api.command.v1.cancelworkflowexecutioncommandattributes.md#fromobject)
- [toObject](proto.temporal.api.command.v1.cancelworkflowexecutioncommandattributes.md#toobject)
- [verify](proto.temporal.api.command.v1.cancelworkflowexecutioncommandattributes.md#verify)

## Constructors

### constructor

\+ **new CancelWorkflowExecutionCommandAttributes**(`properties?`: [*ICancelWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icancelworkflowexecutioncommandattributes.md)): [*CancelWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.cancelworkflowexecutioncommandattributes.md)

Constructs a new CancelWorkflowExecutionCommandAttributes.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ICancelWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icancelworkflowexecutioncommandattributes.md) |

**Returns:** [*CancelWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.cancelworkflowexecutioncommandattributes.md)

## Properties

### details

• `Optional` **details**: *null* \| [*IPayloads*](../interfaces/proto.temporal.api.common.v1.ipayloads.md)

CancelWorkflowExecutionCommandAttributes details.

Implementation of: [ICancelWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.icancelworkflowexecutioncommandattributes.md).[details](../interfaces/proto.temporal.api.command.v1.icancelworkflowexecutioncommandattributes.md#details)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this CancelWorkflowExecutionCommandAttributes to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ICancelWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icancelworkflowexecutioncommandattributes.md)): [*CancelWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.cancelworkflowexecutioncommandattributes.md)

Creates a new CancelWorkflowExecutionCommandAttributes instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ICancelWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icancelworkflowexecutioncommandattributes.md) |

**Returns:** [*CancelWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.cancelworkflowexecutioncommandattributes.md)

CancelWorkflowExecutionCommandAttributes instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*CancelWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.cancelworkflowexecutioncommandattributes.md)

Decodes a CancelWorkflowExecutionCommandAttributes message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*CancelWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.cancelworkflowexecutioncommandattributes.md)

CancelWorkflowExecutionCommandAttributes

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*CancelWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.cancelworkflowexecutioncommandattributes.md)

Decodes a CancelWorkflowExecutionCommandAttributes message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*CancelWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.cancelworkflowexecutioncommandattributes.md)

CancelWorkflowExecutionCommandAttributes

___

### encode

▸ `Static`**encode**(`message`: [*ICancelWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icancelworkflowexecutioncommandattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified CancelWorkflowExecutionCommandAttributes message. Does not implicitly [verify](proto.temporal.api.command.v1.cancelworkflowexecutioncommandattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ICancelWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icancelworkflowexecutioncommandattributes.md) | CancelWorkflowExecutionCommandAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ICancelWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icancelworkflowexecutioncommandattributes.md), `writer?`: *Writer*): *Writer*

Encodes the specified CancelWorkflowExecutionCommandAttributes message, length delimited. Does not implicitly [verify](proto.temporal.api.command.v1.cancelworkflowexecutioncommandattributes.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ICancelWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icancelworkflowexecutioncommandattributes.md) | CancelWorkflowExecutionCommandAttributes message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*CancelWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.cancelworkflowexecutioncommandattributes.md)

Creates a CancelWorkflowExecutionCommandAttributes message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*CancelWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.cancelworkflowexecutioncommandattributes.md)

CancelWorkflowExecutionCommandAttributes

___

### toObject

▸ `Static`**toObject**(`message`: [*CancelWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.cancelworkflowexecutioncommandattributes.md), `options?`: IConversionOptions): *object*

Creates a plain object from a CancelWorkflowExecutionCommandAttributes message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*CancelWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.cancelworkflowexecutioncommandattributes.md) | CancelWorkflowExecutionCommandAttributes   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a CancelWorkflowExecutionCommandAttributes message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
