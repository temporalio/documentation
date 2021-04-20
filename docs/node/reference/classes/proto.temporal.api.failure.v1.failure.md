# Class: Failure

[failure](../modules/proto.temporal.api.failure.md).[v1](../modules/proto.temporal.api.failure.v1.md).Failure

Represents a Failure.

## Implements

* [*IFailure*](../interfaces/proto.temporal.api.failure.v1.ifailure.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.failure.v1.failure.md#constructor)

### Properties

- [activityFailureInfo](proto.temporal.api.failure.v1.failure.md#activityfailureinfo)
- [applicationFailureInfo](proto.temporal.api.failure.v1.failure.md#applicationfailureinfo)
- [canceledFailureInfo](proto.temporal.api.failure.v1.failure.md#canceledfailureinfo)
- [cause](proto.temporal.api.failure.v1.failure.md#cause)
- [childWorkflowExecutionFailureInfo](proto.temporal.api.failure.v1.failure.md#childworkflowexecutionfailureinfo)
- [failureInfo](proto.temporal.api.failure.v1.failure.md#failureinfo)
- [message](proto.temporal.api.failure.v1.failure.md#message)
- [resetWorkflowFailureInfo](proto.temporal.api.failure.v1.failure.md#resetworkflowfailureinfo)
- [serverFailureInfo](proto.temporal.api.failure.v1.failure.md#serverfailureinfo)
- [source](proto.temporal.api.failure.v1.failure.md#source)
- [stackTrace](proto.temporal.api.failure.v1.failure.md#stacktrace)
- [terminatedFailureInfo](proto.temporal.api.failure.v1.failure.md#terminatedfailureinfo)
- [timeoutFailureInfo](proto.temporal.api.failure.v1.failure.md#timeoutfailureinfo)

### Methods

- [toJSON](proto.temporal.api.failure.v1.failure.md#tojson)
- [create](proto.temporal.api.failure.v1.failure.md#create)
- [decode](proto.temporal.api.failure.v1.failure.md#decode)
- [decodeDelimited](proto.temporal.api.failure.v1.failure.md#decodedelimited)
- [encode](proto.temporal.api.failure.v1.failure.md#encode)
- [encodeDelimited](proto.temporal.api.failure.v1.failure.md#encodedelimited)
- [fromObject](proto.temporal.api.failure.v1.failure.md#fromobject)
- [toObject](proto.temporal.api.failure.v1.failure.md#toobject)
- [verify](proto.temporal.api.failure.v1.failure.md#verify)

## Constructors

### constructor

\+ **new Failure**(`properties?`: [*IFailure*](../interfaces/proto.temporal.api.failure.v1.ifailure.md)): [*Failure*](proto.temporal.api.failure.v1.failure.md)

Constructs a new Failure.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IFailure*](../interfaces/proto.temporal.api.failure.v1.ifailure.md) |

**Returns:** [*Failure*](proto.temporal.api.failure.v1.failure.md)

## Properties

### activityFailureInfo

• `Optional` **activityFailureInfo**: *null* \| [*IActivityFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iactivityfailureinfo.md)

Failure activityFailureInfo.

Implementation of: [IFailure](../interfaces/proto.temporal.api.failure.v1.ifailure.md).[activityFailureInfo](../interfaces/proto.temporal.api.failure.v1.ifailure.md#activityfailureinfo)

___

### applicationFailureInfo

• `Optional` **applicationFailureInfo**: *null* \| [*IApplicationFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iapplicationfailureinfo.md)

Failure applicationFailureInfo.

Implementation of: [IFailure](../interfaces/proto.temporal.api.failure.v1.ifailure.md).[applicationFailureInfo](../interfaces/proto.temporal.api.failure.v1.ifailure.md#applicationfailureinfo)

___

### canceledFailureInfo

• `Optional` **canceledFailureInfo**: *null* \| [*ICanceledFailureInfo*](../interfaces/proto.temporal.api.failure.v1.icanceledfailureinfo.md)

Failure canceledFailureInfo.

Implementation of: [IFailure](../interfaces/proto.temporal.api.failure.v1.ifailure.md).[canceledFailureInfo](../interfaces/proto.temporal.api.failure.v1.ifailure.md#canceledfailureinfo)

___

### cause

• `Optional` **cause**: *null* \| [*IFailure*](../interfaces/proto.temporal.api.failure.v1.ifailure.md)

Failure cause.

Implementation of: [IFailure](../interfaces/proto.temporal.api.failure.v1.ifailure.md).[cause](../interfaces/proto.temporal.api.failure.v1.ifailure.md#cause)

___

### childWorkflowExecutionFailureInfo

• `Optional` **childWorkflowExecutionFailureInfo**: *null* \| [*IChildWorkflowExecutionFailureInfo*](../interfaces/proto.temporal.api.failure.v1.ichildworkflowexecutionfailureinfo.md)

Failure childWorkflowExecutionFailureInfo.

Implementation of: [IFailure](../interfaces/proto.temporal.api.failure.v1.ifailure.md).[childWorkflowExecutionFailureInfo](../interfaces/proto.temporal.api.failure.v1.ifailure.md#childworkflowexecutionfailureinfo)

___

### failureInfo

• `Optional` **failureInfo**: *applicationFailureInfo* \| *timeoutFailureInfo* \| *canceledFailureInfo* \| *terminatedFailureInfo* \| *serverFailureInfo* \| *resetWorkflowFailureInfo* \| *activityFailureInfo* \| *childWorkflowExecutionFailureInfo*

Failure failureInfo.

___

### message

• **message**: *string*

Failure message.

Implementation of: [IFailure](../interfaces/proto.temporal.api.failure.v1.ifailure.md).[message](../interfaces/proto.temporal.api.failure.v1.ifailure.md#message)

___

### resetWorkflowFailureInfo

• `Optional` **resetWorkflowFailureInfo**: *null* \| [*IResetWorkflowFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iresetworkflowfailureinfo.md)

Failure resetWorkflowFailureInfo.

Implementation of: [IFailure](../interfaces/proto.temporal.api.failure.v1.ifailure.md).[resetWorkflowFailureInfo](../interfaces/proto.temporal.api.failure.v1.ifailure.md#resetworkflowfailureinfo)

___

### serverFailureInfo

• `Optional` **serverFailureInfo**: *null* \| [*IServerFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iserverfailureinfo.md)

Failure serverFailureInfo.

Implementation of: [IFailure](../interfaces/proto.temporal.api.failure.v1.ifailure.md).[serverFailureInfo](../interfaces/proto.temporal.api.failure.v1.ifailure.md#serverfailureinfo)

___

### source

• **source**: *string*

Failure source.

Implementation of: [IFailure](../interfaces/proto.temporal.api.failure.v1.ifailure.md).[source](../interfaces/proto.temporal.api.failure.v1.ifailure.md#source)

___

### stackTrace

• **stackTrace**: *string*

Failure stackTrace.

Implementation of: [IFailure](../interfaces/proto.temporal.api.failure.v1.ifailure.md).[stackTrace](../interfaces/proto.temporal.api.failure.v1.ifailure.md#stacktrace)

___

### terminatedFailureInfo

• `Optional` **terminatedFailureInfo**: *null* \| [*ITerminatedFailureInfo*](../interfaces/proto.temporal.api.failure.v1.iterminatedfailureinfo.md)

Failure terminatedFailureInfo.

Implementation of: [IFailure](../interfaces/proto.temporal.api.failure.v1.ifailure.md).[terminatedFailureInfo](../interfaces/proto.temporal.api.failure.v1.ifailure.md#terminatedfailureinfo)

___

### timeoutFailureInfo

• `Optional` **timeoutFailureInfo**: *null* \| [*ITimeoutFailureInfo*](../interfaces/proto.temporal.api.failure.v1.itimeoutfailureinfo.md)

Failure timeoutFailureInfo.

Implementation of: [IFailure](../interfaces/proto.temporal.api.failure.v1.ifailure.md).[timeoutFailureInfo](../interfaces/proto.temporal.api.failure.v1.ifailure.md#timeoutfailureinfo)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this Failure to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IFailure*](../interfaces/proto.temporal.api.failure.v1.ifailure.md)): [*Failure*](proto.temporal.api.failure.v1.failure.md)

Creates a new Failure instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IFailure*](../interfaces/proto.temporal.api.failure.v1.ifailure.md) |

**Returns:** [*Failure*](proto.temporal.api.failure.v1.failure.md)

Failure instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*Failure*](proto.temporal.api.failure.v1.failure.md)

Decodes a Failure message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*Failure*](proto.temporal.api.failure.v1.failure.md)

Failure

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*Failure*](proto.temporal.api.failure.v1.failure.md)

Decodes a Failure message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*Failure*](proto.temporal.api.failure.v1.failure.md)

Failure

___

### encode

▸ `Static`**encode**(`message`: [*IFailure*](../interfaces/proto.temporal.api.failure.v1.ifailure.md), `writer?`: *Writer*): *Writer*

Encodes the specified Failure message. Does not implicitly [verify](proto.temporal.api.failure.v1.failure.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IFailure*](../interfaces/proto.temporal.api.failure.v1.ifailure.md) | Failure message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IFailure*](../interfaces/proto.temporal.api.failure.v1.ifailure.md), `writer?`: *Writer*): *Writer*

Encodes the specified Failure message, length delimited. Does not implicitly [verify](proto.temporal.api.failure.v1.failure.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IFailure*](../interfaces/proto.temporal.api.failure.v1.ifailure.md) | Failure message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*Failure*](proto.temporal.api.failure.v1.failure.md)

Creates a Failure message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*Failure*](proto.temporal.api.failure.v1.failure.md)

Failure

___

### toObject

▸ `Static`**toObject**(`message`: [*Failure*](proto.temporal.api.failure.v1.failure.md), `options?`: IConversionOptions): *object*

Creates a plain object from a Failure message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*Failure*](proto.temporal.api.failure.v1.failure.md) | Failure   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a Failure message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
