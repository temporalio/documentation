# Class: WFActivation

[coresdk](../modules/proto.coresdk.md).[workflow_activation](../modules/proto.coresdk.workflow_activation.md).WFActivation

a cached state.

## Implements

* [*IWFActivation*](../interfaces/proto.coresdk.workflow_activation.iwfactivation.md)

## Table of contents

### Constructors

- [constructor](proto.coresdk.workflow_activation.wfactivation.md#constructor)

### Properties

- [jobs](proto.coresdk.workflow_activation.wfactivation.md#jobs)
- [runId](proto.coresdk.workflow_activation.wfactivation.md#runid)
- [taskToken](proto.coresdk.workflow_activation.wfactivation.md#tasktoken)
- [timestamp](proto.coresdk.workflow_activation.wfactivation.md#timestamp)

### Methods

- [toJSON](proto.coresdk.workflow_activation.wfactivation.md#tojson)
- [create](proto.coresdk.workflow_activation.wfactivation.md#create)
- [decode](proto.coresdk.workflow_activation.wfactivation.md#decode)
- [decodeDelimited](proto.coresdk.workflow_activation.wfactivation.md#decodedelimited)
- [encode](proto.coresdk.workflow_activation.wfactivation.md#encode)
- [encodeDelimited](proto.coresdk.workflow_activation.wfactivation.md#encodedelimited)
- [fromObject](proto.coresdk.workflow_activation.wfactivation.md#fromobject)
- [toObject](proto.coresdk.workflow_activation.wfactivation.md#toobject)
- [verify](proto.coresdk.workflow_activation.wfactivation.md#verify)

## Constructors

### constructor

\+ **new WFActivation**(`properties?`: [*IWFActivation*](../interfaces/proto.coresdk.workflow_activation.iwfactivation.md)): [*WFActivation*](proto.coresdk.workflow_activation.wfactivation.md)

Constructs a new WFActivation.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWFActivation*](../interfaces/proto.coresdk.workflow_activation.iwfactivation.md) |

**Returns:** [*WFActivation*](proto.coresdk.workflow_activation.wfactivation.md)

## Properties

### jobs

• **jobs**: [*IWFActivationJob*](../interfaces/proto.coresdk.workflow_activation.iwfactivationjob.md)[]

The things to do upon activating the workflow

Implementation of: [IWFActivation](../interfaces/proto.coresdk.workflow_activation.iwfactivation.md).[jobs](../interfaces/proto.coresdk.workflow_activation.iwfactivation.md#jobs)

___

### runId

• **runId**: *string*

The id of the currently active run of the workflow

Implementation of: [IWFActivation](../interfaces/proto.coresdk.workflow_activation.iwfactivation.md).[runId](../interfaces/proto.coresdk.workflow_activation.iwfactivation.md#runid)

___

### taskToken

• **taskToken**: *Uint8Array*

WFActivation taskToken.

Implementation of: [IWFActivation](../interfaces/proto.coresdk.workflow_activation.iwfactivation.md).[taskToken](../interfaces/proto.coresdk.workflow_activation.iwfactivation.md#tasktoken)

___

### timestamp

• `Optional` **timestamp**: *null* \| [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md)

The current time as understood by the workflow, which is set by workflow task started events

Implementation of: [IWFActivation](../interfaces/proto.coresdk.workflow_activation.iwfactivation.md).[timestamp](../interfaces/proto.coresdk.workflow_activation.iwfactivation.md#timestamp)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this WFActivation to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IWFActivation*](../interfaces/proto.coresdk.workflow_activation.iwfactivation.md)): [*WFActivation*](proto.coresdk.workflow_activation.wfactivation.md)

Creates a new WFActivation instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWFActivation*](../interfaces/proto.coresdk.workflow_activation.iwfactivation.md) |

**Returns:** [*WFActivation*](proto.coresdk.workflow_activation.wfactivation.md)

WFActivation instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*WFActivation*](proto.coresdk.workflow_activation.wfactivation.md)

Decodes a WFActivation message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*WFActivation*](proto.coresdk.workflow_activation.wfactivation.md)

WFActivation

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*WFActivation*](proto.coresdk.workflow_activation.wfactivation.md)

Decodes a WFActivation message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*WFActivation*](proto.coresdk.workflow_activation.wfactivation.md)

WFActivation

___

### encode

▸ `Static`**encode**(`message`: [*IWFActivation*](../interfaces/proto.coresdk.workflow_activation.iwfactivation.md), `writer?`: *Writer*): *Writer*

Encodes the specified WFActivation message. Does not implicitly [verify](proto.coresdk.workflow_activation.wfactivation.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWFActivation*](../interfaces/proto.coresdk.workflow_activation.iwfactivation.md) | WFActivation message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IWFActivation*](../interfaces/proto.coresdk.workflow_activation.iwfactivation.md), `writer?`: *Writer*): *Writer*

Encodes the specified WFActivation message, length delimited. Does not implicitly [verify](proto.coresdk.workflow_activation.wfactivation.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWFActivation*](../interfaces/proto.coresdk.workflow_activation.iwfactivation.md) | WFActivation message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*WFActivation*](proto.coresdk.workflow_activation.wfactivation.md)

Creates a WFActivation message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*WFActivation*](proto.coresdk.workflow_activation.wfactivation.md)

WFActivation

___

### toObject

▸ `Static`**toObject**(`message`: [*WFActivation*](proto.coresdk.workflow_activation.wfactivation.md), `options?`: IConversionOptions): *object*

Creates a plain object from a WFActivation message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*WFActivation*](proto.coresdk.workflow_activation.wfactivation.md) | WFActivation   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a WFActivation message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
