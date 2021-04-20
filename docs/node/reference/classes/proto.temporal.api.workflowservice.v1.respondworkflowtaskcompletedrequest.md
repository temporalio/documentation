# Class: RespondWorkflowTaskCompletedRequest

[workflowservice](../modules/proto.temporal.api.workflowservice.md).[v1](../modules/proto.temporal.api.workflowservice.v1.md).RespondWorkflowTaskCompletedRequest

Represents a RespondWorkflowTaskCompletedRequest.

## Implements

* [*IRespondWorkflowTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedrequest.md#constructor)

### Properties

- [binaryChecksum](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedrequest.md#binarychecksum)
- [commands](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedrequest.md#commands)
- [forceCreateNewWorkflowTask](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedrequest.md#forcecreatenewworkflowtask)
- [identity](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedrequest.md#identity)
- [namespace](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedrequest.md#namespace)
- [queryResults](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedrequest.md#queryresults)
- [returnNewWorkflowTask](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedrequest.md#returnnewworkflowtask)
- [stickyAttributes](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedrequest.md#stickyattributes)
- [taskToken](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedrequest.md#tasktoken)

### Methods

- [toJSON](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedrequest.md#tojson)
- [create](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedrequest.md#create)
- [decode](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedrequest.md#decode)
- [decodeDelimited](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedrequest.md#decodedelimited)
- [encode](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedrequest.md#encode)
- [encodeDelimited](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedrequest.md#encodedelimited)
- [fromObject](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedrequest.md#fromobject)
- [toObject](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedrequest.md#toobject)
- [verify](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedrequest.md#verify)

## Constructors

### constructor

\+ **new RespondWorkflowTaskCompletedRequest**(`properties?`: [*IRespondWorkflowTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md)): [*RespondWorkflowTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedrequest.md)

Constructs a new RespondWorkflowTaskCompletedRequest.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRespondWorkflowTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md) |

**Returns:** [*RespondWorkflowTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedrequest.md)

## Properties

### binaryChecksum

• **binaryChecksum**: *string*

RespondWorkflowTaskCompletedRequest binaryChecksum.

Implementation of: [IRespondWorkflowTaskCompletedRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md).[binaryChecksum](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md#binarychecksum)

___

### commands

• **commands**: [*ICommand*](../interfaces/proto.temporal.api.command.v1.icommand.md)[]

RespondWorkflowTaskCompletedRequest commands.

Implementation of: [IRespondWorkflowTaskCompletedRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md).[commands](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md#commands)

___

### forceCreateNewWorkflowTask

• **forceCreateNewWorkflowTask**: *boolean*

RespondWorkflowTaskCompletedRequest forceCreateNewWorkflowTask.

Implementation of: [IRespondWorkflowTaskCompletedRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md).[forceCreateNewWorkflowTask](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md#forcecreatenewworkflowtask)

___

### identity

• **identity**: *string*

RespondWorkflowTaskCompletedRequest identity.

Implementation of: [IRespondWorkflowTaskCompletedRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md).[identity](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md#identity)

___

### namespace

• **namespace**: *string*

RespondWorkflowTaskCompletedRequest namespace.

Implementation of: [IRespondWorkflowTaskCompletedRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md).[namespace](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md#namespace)

___

### queryResults

• **queryResults**: *object*

RespondWorkflowTaskCompletedRequest queryResults.

#### Type declaration:

Implementation of: [IRespondWorkflowTaskCompletedRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md).[queryResults](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md#queryresults)

___

### returnNewWorkflowTask

• **returnNewWorkflowTask**: *boolean*

RespondWorkflowTaskCompletedRequest returnNewWorkflowTask.

Implementation of: [IRespondWorkflowTaskCompletedRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md).[returnNewWorkflowTask](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md#returnnewworkflowtask)

___

### stickyAttributes

• `Optional` **stickyAttributes**: *null* \| [*IStickyExecutionAttributes*](../interfaces/proto.temporal.api.taskqueue.v1.istickyexecutionattributes.md)

RespondWorkflowTaskCompletedRequest stickyAttributes.

Implementation of: [IRespondWorkflowTaskCompletedRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md).[stickyAttributes](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md#stickyattributes)

___

### taskToken

• **taskToken**: *Uint8Array*

RespondWorkflowTaskCompletedRequest taskToken.

Implementation of: [IRespondWorkflowTaskCompletedRequest](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md).[taskToken](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md#tasktoken)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this RespondWorkflowTaskCompletedRequest to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IRespondWorkflowTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md)): [*RespondWorkflowTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedrequest.md)

Creates a new RespondWorkflowTaskCompletedRequest instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IRespondWorkflowTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md) |

**Returns:** [*RespondWorkflowTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedrequest.md)

RespondWorkflowTaskCompletedRequest instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*RespondWorkflowTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedrequest.md)

Decodes a RespondWorkflowTaskCompletedRequest message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*RespondWorkflowTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedrequest.md)

RespondWorkflowTaskCompletedRequest

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*RespondWorkflowTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedrequest.md)

Decodes a RespondWorkflowTaskCompletedRequest message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*RespondWorkflowTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedrequest.md)

RespondWorkflowTaskCompletedRequest

___

### encode

▸ `Static`**encode**(`message`: [*IRespondWorkflowTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified RespondWorkflowTaskCompletedRequest message. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRespondWorkflowTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md) | RespondWorkflowTaskCompletedRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IRespondWorkflowTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md), `writer?`: *Writer*): *Writer*

Encodes the specified RespondWorkflowTaskCompletedRequest message, length delimited. Does not implicitly [verify](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedrequest.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IRespondWorkflowTaskCompletedRequest*](../interfaces/proto.temporal.api.workflowservice.v1.irespondworkflowtaskcompletedrequest.md) | RespondWorkflowTaskCompletedRequest message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*RespondWorkflowTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedrequest.md)

Creates a RespondWorkflowTaskCompletedRequest message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*RespondWorkflowTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedrequest.md)

RespondWorkflowTaskCompletedRequest

___

### toObject

▸ `Static`**toObject**(`message`: [*RespondWorkflowTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedrequest.md), `options?`: IConversionOptions): *object*

Creates a plain object from a RespondWorkflowTaskCompletedRequest message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*RespondWorkflowTaskCompletedRequest*](proto.temporal.api.workflowservice.v1.respondworkflowtaskcompletedrequest.md) | RespondWorkflowTaskCompletedRequest   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a RespondWorkflowTaskCompletedRequest message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
