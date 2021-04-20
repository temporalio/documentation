# Class: CancelWorkflow

[coresdk](../modules/proto.coresdk.md).[workflow_activation](../modules/proto.coresdk.workflow_activation.md).CancelWorkflow

Cancel a running workflow

## Implements

* [*ICancelWorkflow*](../interfaces/proto.coresdk.workflow_activation.icancelworkflow.md)

## Table of contents

### Constructors

- [constructor](proto.coresdk.workflow_activation.cancelworkflow.md#constructor)

### Methods

- [toJSON](proto.coresdk.workflow_activation.cancelworkflow.md#tojson)
- [create](proto.coresdk.workflow_activation.cancelworkflow.md#create)
- [decode](proto.coresdk.workflow_activation.cancelworkflow.md#decode)
- [decodeDelimited](proto.coresdk.workflow_activation.cancelworkflow.md#decodedelimited)
- [encode](proto.coresdk.workflow_activation.cancelworkflow.md#encode)
- [encodeDelimited](proto.coresdk.workflow_activation.cancelworkflow.md#encodedelimited)
- [fromObject](proto.coresdk.workflow_activation.cancelworkflow.md#fromobject)
- [toObject](proto.coresdk.workflow_activation.cancelworkflow.md#toobject)
- [verify](proto.coresdk.workflow_activation.cancelworkflow.md#verify)

## Constructors

### constructor

\+ **new CancelWorkflow**(`properties?`: [*ICancelWorkflow*](../interfaces/proto.coresdk.workflow_activation.icancelworkflow.md)): [*CancelWorkflow*](proto.coresdk.workflow_activation.cancelworkflow.md)

Constructs a new CancelWorkflow.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ICancelWorkflow*](../interfaces/proto.coresdk.workflow_activation.icancelworkflow.md) |

**Returns:** [*CancelWorkflow*](proto.coresdk.workflow_activation.cancelworkflow.md)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this CancelWorkflow to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ICancelWorkflow*](../interfaces/proto.coresdk.workflow_activation.icancelworkflow.md)): [*CancelWorkflow*](proto.coresdk.workflow_activation.cancelworkflow.md)

Creates a new CancelWorkflow instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ICancelWorkflow*](../interfaces/proto.coresdk.workflow_activation.icancelworkflow.md) |

**Returns:** [*CancelWorkflow*](proto.coresdk.workflow_activation.cancelworkflow.md)

CancelWorkflow instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*CancelWorkflow*](proto.coresdk.workflow_activation.cancelworkflow.md)

Decodes a CancelWorkflow message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*CancelWorkflow*](proto.coresdk.workflow_activation.cancelworkflow.md)

CancelWorkflow

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*CancelWorkflow*](proto.coresdk.workflow_activation.cancelworkflow.md)

Decodes a CancelWorkflow message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*CancelWorkflow*](proto.coresdk.workflow_activation.cancelworkflow.md)

CancelWorkflow

___

### encode

▸ `Static`**encode**(`message`: [*ICancelWorkflow*](../interfaces/proto.coresdk.workflow_activation.icancelworkflow.md), `writer?`: *Writer*): *Writer*

Encodes the specified CancelWorkflow message. Does not implicitly [verify](proto.coresdk.workflow_activation.cancelworkflow.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ICancelWorkflow*](../interfaces/proto.coresdk.workflow_activation.icancelworkflow.md) | CancelWorkflow message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ICancelWorkflow*](../interfaces/proto.coresdk.workflow_activation.icancelworkflow.md), `writer?`: *Writer*): *Writer*

Encodes the specified CancelWorkflow message, length delimited. Does not implicitly [verify](proto.coresdk.workflow_activation.cancelworkflow.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ICancelWorkflow*](../interfaces/proto.coresdk.workflow_activation.icancelworkflow.md) | CancelWorkflow message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*CancelWorkflow*](proto.coresdk.workflow_activation.cancelworkflow.md)

Creates a CancelWorkflow message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*CancelWorkflow*](proto.coresdk.workflow_activation.cancelworkflow.md)

CancelWorkflow

___

### toObject

▸ `Static`**toObject**(`message`: [*CancelWorkflow*](proto.coresdk.workflow_activation.cancelworkflow.md), `options?`: IConversionOptions): *object*

Creates a plain object from a CancelWorkflow message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*CancelWorkflow*](proto.coresdk.workflow_activation.cancelworkflow.md) | CancelWorkflow   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a CancelWorkflow message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
