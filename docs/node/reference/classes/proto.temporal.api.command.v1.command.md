# Class: Command

[command](../modules/proto.temporal.api.command.md).[v1](../modules/proto.temporal.api.command.v1.md).Command

Represents a Command.

## Implements

* [*ICommand*](../interfaces/proto.temporal.api.command.v1.icommand.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.command.v1.command.md#constructor)

### Properties

- [attributes](proto.temporal.api.command.v1.command.md#attributes)
- [cancelTimerCommandAttributes](proto.temporal.api.command.v1.command.md#canceltimercommandattributes)
- [cancelWorkflowExecutionCommandAttributes](proto.temporal.api.command.v1.command.md#cancelworkflowexecutioncommandattributes)
- [commandType](proto.temporal.api.command.v1.command.md#commandtype)
- [completeWorkflowExecutionCommandAttributes](proto.temporal.api.command.v1.command.md#completeworkflowexecutioncommandattributes)
- [continueAsNewWorkflowExecutionCommandAttributes](proto.temporal.api.command.v1.command.md#continueasnewworkflowexecutioncommandattributes)
- [failWorkflowExecutionCommandAttributes](proto.temporal.api.command.v1.command.md#failworkflowexecutioncommandattributes)
- [recordMarkerCommandAttributes](proto.temporal.api.command.v1.command.md#recordmarkercommandattributes)
- [requestCancelActivityTaskCommandAttributes](proto.temporal.api.command.v1.command.md#requestcancelactivitytaskcommandattributes)
- [requestCancelExternalWorkflowExecutionCommandAttributes](proto.temporal.api.command.v1.command.md#requestcancelexternalworkflowexecutioncommandattributes)
- [scheduleActivityTaskCommandAttributes](proto.temporal.api.command.v1.command.md#scheduleactivitytaskcommandattributes)
- [signalExternalWorkflowExecutionCommandAttributes](proto.temporal.api.command.v1.command.md#signalexternalworkflowexecutioncommandattributes)
- [startChildWorkflowExecutionCommandAttributes](proto.temporal.api.command.v1.command.md#startchildworkflowexecutioncommandattributes)
- [startTimerCommandAttributes](proto.temporal.api.command.v1.command.md#starttimercommandattributes)
- [upsertWorkflowSearchAttributesCommandAttributes](proto.temporal.api.command.v1.command.md#upsertworkflowsearchattributescommandattributes)

### Methods

- [toJSON](proto.temporal.api.command.v1.command.md#tojson)
- [create](proto.temporal.api.command.v1.command.md#create)
- [decode](proto.temporal.api.command.v1.command.md#decode)
- [decodeDelimited](proto.temporal.api.command.v1.command.md#decodedelimited)
- [encode](proto.temporal.api.command.v1.command.md#encode)
- [encodeDelimited](proto.temporal.api.command.v1.command.md#encodedelimited)
- [fromObject](proto.temporal.api.command.v1.command.md#fromobject)
- [toObject](proto.temporal.api.command.v1.command.md#toobject)
- [verify](proto.temporal.api.command.v1.command.md#verify)

## Constructors

### constructor

\+ **new Command**(`properties?`: [*ICommand*](../interfaces/proto.temporal.api.command.v1.icommand.md)): [*Command*](proto.temporal.api.command.v1.command.md)

Constructs a new Command.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ICommand*](../interfaces/proto.temporal.api.command.v1.icommand.md) |

**Returns:** [*Command*](proto.temporal.api.command.v1.command.md)

## Properties

### attributes

• `Optional` **attributes**: *scheduleActivityTaskCommandAttributes* \| *startTimerCommandAttributes* \| *completeWorkflowExecutionCommandAttributes* \| *failWorkflowExecutionCommandAttributes* \| *requestCancelActivityTaskCommandAttributes* \| *cancelTimerCommandAttributes* \| *cancelWorkflowExecutionCommandAttributes* \| *requestCancelExternalWorkflowExecutionCommandAttributes* \| *recordMarkerCommandAttributes* \| *continueAsNewWorkflowExecutionCommandAttributes* \| *startChildWorkflowExecutionCommandAttributes* \| *signalExternalWorkflowExecutionCommandAttributes* \| *upsertWorkflowSearchAttributesCommandAttributes*

Command attributes.

___

### cancelTimerCommandAttributes

• `Optional` **cancelTimerCommandAttributes**: *null* \| [*ICancelTimerCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icanceltimercommandattributes.md)

Command cancelTimerCommandAttributes.

Implementation of: [ICommand](../interfaces/proto.temporal.api.command.v1.icommand.md).[cancelTimerCommandAttributes](../interfaces/proto.temporal.api.command.v1.icommand.md#canceltimercommandattributes)

___

### cancelWorkflowExecutionCommandAttributes

• `Optional` **cancelWorkflowExecutionCommandAttributes**: *null* \| [*ICancelWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icancelworkflowexecutioncommandattributes.md)

Command cancelWorkflowExecutionCommandAttributes.

Implementation of: [ICommand](../interfaces/proto.temporal.api.command.v1.icommand.md).[cancelWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.icommand.md#cancelworkflowexecutioncommandattributes)

___

### commandType

• **commandType**: [*CommandType*](../enums/proto.temporal.api.enums.v1.commandtype.md)

Command commandType.

Implementation of: [ICommand](../interfaces/proto.temporal.api.command.v1.icommand.md).[commandType](../interfaces/proto.temporal.api.command.v1.icommand.md#commandtype)

___

### completeWorkflowExecutionCommandAttributes

• `Optional` **completeWorkflowExecutionCommandAttributes**: *null* \| [*ICompleteWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icompleteworkflowexecutioncommandattributes.md)

Command completeWorkflowExecutionCommandAttributes.

Implementation of: [ICommand](../interfaces/proto.temporal.api.command.v1.icommand.md).[completeWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.icommand.md#completeworkflowexecutioncommandattributes)

___

### continueAsNewWorkflowExecutionCommandAttributes

• `Optional` **continueAsNewWorkflowExecutionCommandAttributes**: *null* \| [*IContinueAsNewWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md)

Command continueAsNewWorkflowExecutionCommandAttributes.

Implementation of: [ICommand](../interfaces/proto.temporal.api.command.v1.icommand.md).[continueAsNewWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.icommand.md#continueasnewworkflowexecutioncommandattributes)

___

### failWorkflowExecutionCommandAttributes

• `Optional` **failWorkflowExecutionCommandAttributes**: *null* \| [*IFailWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.ifailworkflowexecutioncommandattributes.md)

Command failWorkflowExecutionCommandAttributes.

Implementation of: [ICommand](../interfaces/proto.temporal.api.command.v1.icommand.md).[failWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.icommand.md#failworkflowexecutioncommandattributes)

___

### recordMarkerCommandAttributes

• `Optional` **recordMarkerCommandAttributes**: *null* \| [*IRecordMarkerCommandAttributes*](../interfaces/proto.temporal.api.command.v1.irecordmarkercommandattributes.md)

Command recordMarkerCommandAttributes.

Implementation of: [ICommand](../interfaces/proto.temporal.api.command.v1.icommand.md).[recordMarkerCommandAttributes](../interfaces/proto.temporal.api.command.v1.icommand.md#recordmarkercommandattributes)

___

### requestCancelActivityTaskCommandAttributes

• `Optional` **requestCancelActivityTaskCommandAttributes**: *null* \| [*IRequestCancelActivityTaskCommandAttributes*](../interfaces/proto.temporal.api.command.v1.irequestcancelactivitytaskcommandattributes.md)

Command requestCancelActivityTaskCommandAttributes.

Implementation of: [ICommand](../interfaces/proto.temporal.api.command.v1.icommand.md).[requestCancelActivityTaskCommandAttributes](../interfaces/proto.temporal.api.command.v1.icommand.md#requestcancelactivitytaskcommandattributes)

___

### requestCancelExternalWorkflowExecutionCommandAttributes

• `Optional` **requestCancelExternalWorkflowExecutionCommandAttributes**: *null* \| [*IRequestCancelExternalWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.irequestcancelexternalworkflowexecutioncommandattributes.md)

Command requestCancelExternalWorkflowExecutionCommandAttributes.

Implementation of: [ICommand](../interfaces/proto.temporal.api.command.v1.icommand.md).[requestCancelExternalWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.icommand.md#requestcancelexternalworkflowexecutioncommandattributes)

___

### scheduleActivityTaskCommandAttributes

• `Optional` **scheduleActivityTaskCommandAttributes**: *null* \| [*IScheduleActivityTaskCommandAttributes*](../interfaces/proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md)

Command scheduleActivityTaskCommandAttributes.

Implementation of: [ICommand](../interfaces/proto.temporal.api.command.v1.icommand.md).[scheduleActivityTaskCommandAttributes](../interfaces/proto.temporal.api.command.v1.icommand.md#scheduleactivitytaskcommandattributes)

___

### signalExternalWorkflowExecutionCommandAttributes

• `Optional` **signalExternalWorkflowExecutionCommandAttributes**: *null* \| [*ISignalExternalWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.isignalexternalworkflowexecutioncommandattributes.md)

Command signalExternalWorkflowExecutionCommandAttributes.

Implementation of: [ICommand](../interfaces/proto.temporal.api.command.v1.icommand.md).[signalExternalWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.icommand.md#signalexternalworkflowexecutioncommandattributes)

___

### startChildWorkflowExecutionCommandAttributes

• `Optional` **startChildWorkflowExecutionCommandAttributes**: *null* \| [*IStartChildWorkflowExecutionCommandAttributes*](../interfaces/proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md)

Command startChildWorkflowExecutionCommandAttributes.

Implementation of: [ICommand](../interfaces/proto.temporal.api.command.v1.icommand.md).[startChildWorkflowExecutionCommandAttributes](../interfaces/proto.temporal.api.command.v1.icommand.md#startchildworkflowexecutioncommandattributes)

___

### startTimerCommandAttributes

• `Optional` **startTimerCommandAttributes**: *null* \| [*IStartTimerCommandAttributes*](../interfaces/proto.temporal.api.command.v1.istarttimercommandattributes.md)

Command startTimerCommandAttributes.

Implementation of: [ICommand](../interfaces/proto.temporal.api.command.v1.icommand.md).[startTimerCommandAttributes](../interfaces/proto.temporal.api.command.v1.icommand.md#starttimercommandattributes)

___

### upsertWorkflowSearchAttributesCommandAttributes

• `Optional` **upsertWorkflowSearchAttributesCommandAttributes**: *null* \| [*IUpsertWorkflowSearchAttributesCommandAttributes*](../interfaces/proto.temporal.api.command.v1.iupsertworkflowsearchattributescommandattributes.md)

Command upsertWorkflowSearchAttributesCommandAttributes.

Implementation of: [ICommand](../interfaces/proto.temporal.api.command.v1.icommand.md).[upsertWorkflowSearchAttributesCommandAttributes](../interfaces/proto.temporal.api.command.v1.icommand.md#upsertworkflowsearchattributescommandattributes)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this Command to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*ICommand*](../interfaces/proto.temporal.api.command.v1.icommand.md)): [*Command*](proto.temporal.api.command.v1.command.md)

Creates a new Command instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*ICommand*](../interfaces/proto.temporal.api.command.v1.icommand.md) |

**Returns:** [*Command*](proto.temporal.api.command.v1.command.md)

Command instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*Command*](proto.temporal.api.command.v1.command.md)

Decodes a Command message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*Command*](proto.temporal.api.command.v1.command.md)

Command

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*Command*](proto.temporal.api.command.v1.command.md)

Decodes a Command message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*Command*](proto.temporal.api.command.v1.command.md)

Command

___

### encode

▸ `Static`**encode**(`message`: [*ICommand*](../interfaces/proto.temporal.api.command.v1.icommand.md), `writer?`: *Writer*): *Writer*

Encodes the specified Command message. Does not implicitly [verify](proto.temporal.api.command.v1.command.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ICommand*](../interfaces/proto.temporal.api.command.v1.icommand.md) | Command message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*ICommand*](../interfaces/proto.temporal.api.command.v1.icommand.md), `writer?`: *Writer*): *Writer*

Encodes the specified Command message, length delimited. Does not implicitly [verify](proto.temporal.api.command.v1.command.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*ICommand*](../interfaces/proto.temporal.api.command.v1.icommand.md) | Command message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*Command*](proto.temporal.api.command.v1.command.md)

Creates a Command message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*Command*](proto.temporal.api.command.v1.command.md)

Command

___

### toObject

▸ `Static`**toObject**(`message`: [*Command*](proto.temporal.api.command.v1.command.md), `options?`: IConversionOptions): *object*

Creates a plain object from a Command message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*Command*](proto.temporal.api.command.v1.command.md) | Command   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a Command message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
