# Class: WFActivationCompletion

[coresdk](../modules/proto.coresdk.md).[workflow_completion](../modules/proto.coresdk.workflow_completion.md).WFActivationCompletion

Result of a single workflow activation, reported from lang to core

## Implements

* [*IWFActivationCompletion*](../interfaces/proto.coresdk.workflow_completion.iwfactivationcompletion.md)

## Table of contents

### Constructors

- [constructor](proto.coresdk.workflow_completion.wfactivationcompletion.md#constructor)

### Properties

- [failed](proto.coresdk.workflow_completion.wfactivationcompletion.md#failed)
- [status](proto.coresdk.workflow_completion.wfactivationcompletion.md#status)
- [successful](proto.coresdk.workflow_completion.wfactivationcompletion.md#successful)
- [taskToken](proto.coresdk.workflow_completion.wfactivationcompletion.md#tasktoken)

### Methods

- [toJSON](proto.coresdk.workflow_completion.wfactivationcompletion.md#tojson)
- [create](proto.coresdk.workflow_completion.wfactivationcompletion.md#create)
- [decode](proto.coresdk.workflow_completion.wfactivationcompletion.md#decode)
- [decodeDelimited](proto.coresdk.workflow_completion.wfactivationcompletion.md#decodedelimited)
- [encode](proto.coresdk.workflow_completion.wfactivationcompletion.md#encode)
- [encodeDelimited](proto.coresdk.workflow_completion.wfactivationcompletion.md#encodedelimited)
- [fromObject](proto.coresdk.workflow_completion.wfactivationcompletion.md#fromobject)
- [toObject](proto.coresdk.workflow_completion.wfactivationcompletion.md#toobject)
- [verify](proto.coresdk.workflow_completion.wfactivationcompletion.md#verify)

## Constructors

### constructor

\+ **new WFActivationCompletion**(`properties?`: [*IWFActivationCompletion*](../interfaces/proto.coresdk.workflow_completion.iwfactivationcompletion.md)): [*WFActivationCompletion*](proto.coresdk.workflow_completion.wfactivationcompletion.md)

Constructs a new WFActivationCompletion.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWFActivationCompletion*](../interfaces/proto.coresdk.workflow_completion.iwfactivationcompletion.md) |

**Returns:** [*WFActivationCompletion*](proto.coresdk.workflow_completion.wfactivationcompletion.md)

## Properties

### failed

• `Optional` **failed**: *null* \| [*IFailure*](../interfaces/proto.coresdk.workflow_completion.ifailure.md)

WFActivationCompletion failed.

Implementation of: [IWFActivationCompletion](../interfaces/proto.coresdk.workflow_completion.iwfactivationcompletion.md).[failed](../interfaces/proto.coresdk.workflow_completion.iwfactivationcompletion.md#failed)

___

### status

• `Optional` **status**: *failed* \| *successful*

WFActivationCompletion status.

___

### successful

• `Optional` **successful**: *null* \| [*ISuccess*](../interfaces/proto.coresdk.workflow_completion.isuccess.md)

WFActivationCompletion successful.

Implementation of: [IWFActivationCompletion](../interfaces/proto.coresdk.workflow_completion.iwfactivationcompletion.md).[successful](../interfaces/proto.coresdk.workflow_completion.iwfactivationcompletion.md#successful)

___

### taskToken

• **taskToken**: *Uint8Array*

WFActivationCompletion taskToken.

Implementation of: [IWFActivationCompletion](../interfaces/proto.coresdk.workflow_completion.iwfactivationcompletion.md).[taskToken](../interfaces/proto.coresdk.workflow_completion.iwfactivationcompletion.md#tasktoken)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this WFActivationCompletion to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IWFActivationCompletion*](../interfaces/proto.coresdk.workflow_completion.iwfactivationcompletion.md)): [*WFActivationCompletion*](proto.coresdk.workflow_completion.wfactivationcompletion.md)

Creates a new WFActivationCompletion instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWFActivationCompletion*](../interfaces/proto.coresdk.workflow_completion.iwfactivationcompletion.md) |

**Returns:** [*WFActivationCompletion*](proto.coresdk.workflow_completion.wfactivationcompletion.md)

WFActivationCompletion instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*WFActivationCompletion*](proto.coresdk.workflow_completion.wfactivationcompletion.md)

Decodes a WFActivationCompletion message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*WFActivationCompletion*](proto.coresdk.workflow_completion.wfactivationcompletion.md)

WFActivationCompletion

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*WFActivationCompletion*](proto.coresdk.workflow_completion.wfactivationcompletion.md)

Decodes a WFActivationCompletion message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*WFActivationCompletion*](proto.coresdk.workflow_completion.wfactivationcompletion.md)

WFActivationCompletion

___

### encode

▸ `Static`**encode**(`message`: [*IWFActivationCompletion*](../interfaces/proto.coresdk.workflow_completion.iwfactivationcompletion.md), `writer?`: *Writer*): *Writer*

Encodes the specified WFActivationCompletion message. Does not implicitly [verify](proto.coresdk.workflow_completion.wfactivationcompletion.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWFActivationCompletion*](../interfaces/proto.coresdk.workflow_completion.iwfactivationcompletion.md) | WFActivationCompletion message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IWFActivationCompletion*](../interfaces/proto.coresdk.workflow_completion.iwfactivationcompletion.md), `writer?`: *Writer*): *Writer*

Encodes the specified WFActivationCompletion message, length delimited. Does not implicitly [verify](proto.coresdk.workflow_completion.wfactivationcompletion.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWFActivationCompletion*](../interfaces/proto.coresdk.workflow_completion.iwfactivationcompletion.md) | WFActivationCompletion message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*WFActivationCompletion*](proto.coresdk.workflow_completion.wfactivationcompletion.md)

Creates a WFActivationCompletion message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*WFActivationCompletion*](proto.coresdk.workflow_completion.wfactivationcompletion.md)

WFActivationCompletion

___

### toObject

▸ `Static`**toObject**(`message`: [*WFActivationCompletion*](proto.coresdk.workflow_completion.wfactivationcompletion.md), `options?`: IConversionOptions): *object*

Creates a plain object from a WFActivationCompletion message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*WFActivationCompletion*](proto.coresdk.workflow_completion.wfactivationcompletion.md) | WFActivationCompletion   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a WFActivationCompletion message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
