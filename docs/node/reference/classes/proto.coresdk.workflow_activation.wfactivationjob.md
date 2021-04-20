# Class: WFActivationJob

[coresdk](../modules/proto.coresdk.md).[workflow_activation](../modules/proto.coresdk.workflow_activation.md).WFActivationJob

Represents a WFActivationJob.

## Implements

* [*IWFActivationJob*](../interfaces/proto.coresdk.workflow_activation.iwfactivationjob.md)

## Table of contents

### Constructors

- [constructor](proto.coresdk.workflow_activation.wfactivationjob.md#constructor)

### Properties

- [cancelWorkflow](proto.coresdk.workflow_activation.wfactivationjob.md#cancelworkflow)
- [fireTimer](proto.coresdk.workflow_activation.wfactivationjob.md#firetimer)
- [queryWorkflow](proto.coresdk.workflow_activation.wfactivationjob.md#queryworkflow)
- [resolveActivity](proto.coresdk.workflow_activation.wfactivationjob.md#resolveactivity)
- [signalWorkflow](proto.coresdk.workflow_activation.wfactivationjob.md#signalworkflow)
- [startWorkflow](proto.coresdk.workflow_activation.wfactivationjob.md#startworkflow)
- [updateRandomSeed](proto.coresdk.workflow_activation.wfactivationjob.md#updaterandomseed)
- [variant](proto.coresdk.workflow_activation.wfactivationjob.md#variant)

### Methods

- [toJSON](proto.coresdk.workflow_activation.wfactivationjob.md#tojson)
- [create](proto.coresdk.workflow_activation.wfactivationjob.md#create)
- [decode](proto.coresdk.workflow_activation.wfactivationjob.md#decode)
- [decodeDelimited](proto.coresdk.workflow_activation.wfactivationjob.md#decodedelimited)
- [encode](proto.coresdk.workflow_activation.wfactivationjob.md#encode)
- [encodeDelimited](proto.coresdk.workflow_activation.wfactivationjob.md#encodedelimited)
- [fromObject](proto.coresdk.workflow_activation.wfactivationjob.md#fromobject)
- [toObject](proto.coresdk.workflow_activation.wfactivationjob.md#toobject)
- [verify](proto.coresdk.workflow_activation.wfactivationjob.md#verify)

## Constructors

### constructor

\+ **new WFActivationJob**(`properties?`: [*IWFActivationJob*](../interfaces/proto.coresdk.workflow_activation.iwfactivationjob.md)): [*WFActivationJob*](proto.coresdk.workflow_activation.wfactivationjob.md)

Constructs a new WFActivationJob.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWFActivationJob*](../interfaces/proto.coresdk.workflow_activation.iwfactivationjob.md) |

**Returns:** [*WFActivationJob*](proto.coresdk.workflow_activation.wfactivationjob.md)

## Properties

### cancelWorkflow

• `Optional` **cancelWorkflow**: *null* \| [*ICancelWorkflow*](../interfaces/proto.coresdk.workflow_activation.icancelworkflow.md)

A request to cancel the workflow was received.

Implementation of: [IWFActivationJob](../interfaces/proto.coresdk.workflow_activation.iwfactivationjob.md).[cancelWorkflow](../interfaces/proto.coresdk.workflow_activation.iwfactivationjob.md#cancelworkflow)

___

### fireTimer

• `Optional` **fireTimer**: *null* \| [*IFireTimer*](../interfaces/proto.coresdk.workflow_activation.ifiretimer.md)

A timer has fired, allowing whatever was waiting on it (if anything) to proceed

Implementation of: [IWFActivationJob](../interfaces/proto.coresdk.workflow_activation.iwfactivationjob.md).[fireTimer](../interfaces/proto.coresdk.workflow_activation.iwfactivationjob.md#firetimer)

___

### queryWorkflow

• `Optional` **queryWorkflow**: *null* \| [*IQueryWorkflow*](../interfaces/proto.coresdk.workflow_activation.iqueryworkflow.md)

A request to query the workflow was received.

Implementation of: [IWFActivationJob](../interfaces/proto.coresdk.workflow_activation.iwfactivationjob.md).[queryWorkflow](../interfaces/proto.coresdk.workflow_activation.iwfactivationjob.md#queryworkflow)

___

### resolveActivity

• `Optional` **resolveActivity**: *null* \| [*IResolveActivity*](../interfaces/proto.coresdk.workflow_activation.iresolveactivity.md)

An activity was resolved with, result could be completed, failed or cancelled

Implementation of: [IWFActivationJob](../interfaces/proto.coresdk.workflow_activation.iwfactivationjob.md).[resolveActivity](../interfaces/proto.coresdk.workflow_activation.iwfactivationjob.md#resolveactivity)

___

### signalWorkflow

• `Optional` **signalWorkflow**: *null* \| [*ISignalWorkflow*](../interfaces/proto.coresdk.workflow_activation.isignalworkflow.md)

A request to signal the workflow was received.

Implementation of: [IWFActivationJob](../interfaces/proto.coresdk.workflow_activation.iwfactivationjob.md).[signalWorkflow](../interfaces/proto.coresdk.workflow_activation.iwfactivationjob.md#signalworkflow)

___

### startWorkflow

• `Optional` **startWorkflow**: *null* \| [*IStartWorkflow*](../interfaces/proto.coresdk.workflow_activation.istartworkflow.md)

Begin a workflow for the first time

Implementation of: [IWFActivationJob](../interfaces/proto.coresdk.workflow_activation.iwfactivationjob.md).[startWorkflow](../interfaces/proto.coresdk.workflow_activation.iwfactivationjob.md#startworkflow)

___

### updateRandomSeed

• `Optional` **updateRandomSeed**: *null* \| [*IUpdateRandomSeed*](../interfaces/proto.coresdk.workflow_activation.iupdaterandomseed.md)

Workflow was reset. The randomness seed must be updated.

Implementation of: [IWFActivationJob](../interfaces/proto.coresdk.workflow_activation.iwfactivationjob.md).[updateRandomSeed](../interfaces/proto.coresdk.workflow_activation.iwfactivationjob.md#updaterandomseed)

___

### variant

• `Optional` **variant**: *startWorkflow* \| *fireTimer* \| *updateRandomSeed* \| *queryWorkflow* \| *cancelWorkflow* \| *signalWorkflow* \| *resolveActivity*

WFActivationJob variant.

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this WFActivationJob to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IWFActivationJob*](../interfaces/proto.coresdk.workflow_activation.iwfactivationjob.md)): [*WFActivationJob*](proto.coresdk.workflow_activation.wfactivationjob.md)

Creates a new WFActivationJob instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IWFActivationJob*](../interfaces/proto.coresdk.workflow_activation.iwfactivationjob.md) |

**Returns:** [*WFActivationJob*](proto.coresdk.workflow_activation.wfactivationjob.md)

WFActivationJob instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*WFActivationJob*](proto.coresdk.workflow_activation.wfactivationjob.md)

Decodes a WFActivationJob message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*WFActivationJob*](proto.coresdk.workflow_activation.wfactivationjob.md)

WFActivationJob

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*WFActivationJob*](proto.coresdk.workflow_activation.wfactivationjob.md)

Decodes a WFActivationJob message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*WFActivationJob*](proto.coresdk.workflow_activation.wfactivationjob.md)

WFActivationJob

___

### encode

▸ `Static`**encode**(`message`: [*IWFActivationJob*](../interfaces/proto.coresdk.workflow_activation.iwfactivationjob.md), `writer?`: *Writer*): *Writer*

Encodes the specified WFActivationJob message. Does not implicitly [verify](proto.coresdk.workflow_activation.wfactivationjob.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWFActivationJob*](../interfaces/proto.coresdk.workflow_activation.iwfactivationjob.md) | WFActivationJob message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IWFActivationJob*](../interfaces/proto.coresdk.workflow_activation.iwfactivationjob.md), `writer?`: *Writer*): *Writer*

Encodes the specified WFActivationJob message, length delimited. Does not implicitly [verify](proto.coresdk.workflow_activation.wfactivationjob.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IWFActivationJob*](../interfaces/proto.coresdk.workflow_activation.iwfactivationjob.md) | WFActivationJob message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*WFActivationJob*](proto.coresdk.workflow_activation.wfactivationjob.md)

Creates a WFActivationJob message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*WFActivationJob*](proto.coresdk.workflow_activation.wfactivationjob.md)

WFActivationJob

___

### toObject

▸ `Static`**toObject**(`message`: [*WFActivationJob*](proto.coresdk.workflow_activation.wfactivationjob.md), `options?`: IConversionOptions): *object*

Creates a plain object from a WFActivationJob message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*WFActivationJob*](proto.coresdk.workflow_activation.wfactivationjob.md) | WFActivationJob   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a WFActivationJob message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
