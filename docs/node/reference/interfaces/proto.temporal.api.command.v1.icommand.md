# Interface: ICommand

[command](../modules/proto.temporal.api.command.md).[v1](../modules/proto.temporal.api.command.v1.md).ICommand

Properties of a Command.

## Implemented by

* [*Command*](../classes/proto.temporal.api.command.v1.command.md)

## Table of contents

### Properties

- [cancelTimerCommandAttributes](proto.temporal.api.command.v1.icommand.md#canceltimercommandattributes)
- [cancelWorkflowExecutionCommandAttributes](proto.temporal.api.command.v1.icommand.md#cancelworkflowexecutioncommandattributes)
- [commandType](proto.temporal.api.command.v1.icommand.md#commandtype)
- [completeWorkflowExecutionCommandAttributes](proto.temporal.api.command.v1.icommand.md#completeworkflowexecutioncommandattributes)
- [continueAsNewWorkflowExecutionCommandAttributes](proto.temporal.api.command.v1.icommand.md#continueasnewworkflowexecutioncommandattributes)
- [failWorkflowExecutionCommandAttributes](proto.temporal.api.command.v1.icommand.md#failworkflowexecutioncommandattributes)
- [recordMarkerCommandAttributes](proto.temporal.api.command.v1.icommand.md#recordmarkercommandattributes)
- [requestCancelActivityTaskCommandAttributes](proto.temporal.api.command.v1.icommand.md#requestcancelactivitytaskcommandattributes)
- [requestCancelExternalWorkflowExecutionCommandAttributes](proto.temporal.api.command.v1.icommand.md#requestcancelexternalworkflowexecutioncommandattributes)
- [scheduleActivityTaskCommandAttributes](proto.temporal.api.command.v1.icommand.md#scheduleactivitytaskcommandattributes)
- [signalExternalWorkflowExecutionCommandAttributes](proto.temporal.api.command.v1.icommand.md#signalexternalworkflowexecutioncommandattributes)
- [startChildWorkflowExecutionCommandAttributes](proto.temporal.api.command.v1.icommand.md#startchildworkflowexecutioncommandattributes)
- [startTimerCommandAttributes](proto.temporal.api.command.v1.icommand.md#starttimercommandattributes)
- [upsertWorkflowSearchAttributesCommandAttributes](proto.temporal.api.command.v1.icommand.md#upsertworkflowsearchattributescommandattributes)

## Properties

### cancelTimerCommandAttributes

• `Optional` **cancelTimerCommandAttributes**: *null* \| [*ICancelTimerCommandAttributes*](proto.temporal.api.command.v1.icanceltimercommandattributes.md)

Command cancelTimerCommandAttributes

___

### cancelWorkflowExecutionCommandAttributes

• `Optional` **cancelWorkflowExecutionCommandAttributes**: *null* \| [*ICancelWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.icancelworkflowexecutioncommandattributes.md)

Command cancelWorkflowExecutionCommandAttributes

___

### commandType

• `Optional` **commandType**: *null* \| [*CommandType*](../enums/proto.temporal.api.enums.v1.commandtype.md)

Command commandType

___

### completeWorkflowExecutionCommandAttributes

• `Optional` **completeWorkflowExecutionCommandAttributes**: *null* \| [*ICompleteWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.icompleteworkflowexecutioncommandattributes.md)

Command completeWorkflowExecutionCommandAttributes

___

### continueAsNewWorkflowExecutionCommandAttributes

• `Optional` **continueAsNewWorkflowExecutionCommandAttributes**: *null* \| [*IContinueAsNewWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.icontinueasnewworkflowexecutioncommandattributes.md)

Command continueAsNewWorkflowExecutionCommandAttributes

___

### failWorkflowExecutionCommandAttributes

• `Optional` **failWorkflowExecutionCommandAttributes**: *null* \| [*IFailWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.ifailworkflowexecutioncommandattributes.md)

Command failWorkflowExecutionCommandAttributes

___

### recordMarkerCommandAttributes

• `Optional` **recordMarkerCommandAttributes**: *null* \| [*IRecordMarkerCommandAttributes*](proto.temporal.api.command.v1.irecordmarkercommandattributes.md)

Command recordMarkerCommandAttributes

___

### requestCancelActivityTaskCommandAttributes

• `Optional` **requestCancelActivityTaskCommandAttributes**: *null* \| [*IRequestCancelActivityTaskCommandAttributes*](proto.temporal.api.command.v1.irequestcancelactivitytaskcommandattributes.md)

Command requestCancelActivityTaskCommandAttributes

___

### requestCancelExternalWorkflowExecutionCommandAttributes

• `Optional` **requestCancelExternalWorkflowExecutionCommandAttributes**: *null* \| [*IRequestCancelExternalWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.irequestcancelexternalworkflowexecutioncommandattributes.md)

Command requestCancelExternalWorkflowExecutionCommandAttributes

___

### scheduleActivityTaskCommandAttributes

• `Optional` **scheduleActivityTaskCommandAttributes**: *null* \| [*IScheduleActivityTaskCommandAttributes*](proto.temporal.api.command.v1.ischeduleactivitytaskcommandattributes.md)

Command scheduleActivityTaskCommandAttributes

___

### signalExternalWorkflowExecutionCommandAttributes

• `Optional` **signalExternalWorkflowExecutionCommandAttributes**: *null* \| [*ISignalExternalWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.isignalexternalworkflowexecutioncommandattributes.md)

Command signalExternalWorkflowExecutionCommandAttributes

___

### startChildWorkflowExecutionCommandAttributes

• `Optional` **startChildWorkflowExecutionCommandAttributes**: *null* \| [*IStartChildWorkflowExecutionCommandAttributes*](proto.temporal.api.command.v1.istartchildworkflowexecutioncommandattributes.md)

Command startChildWorkflowExecutionCommandAttributes

___

### startTimerCommandAttributes

• `Optional` **startTimerCommandAttributes**: *null* \| [*IStartTimerCommandAttributes*](proto.temporal.api.command.v1.istarttimercommandattributes.md)

Command startTimerCommandAttributes

___

### upsertWorkflowSearchAttributesCommandAttributes

• `Optional` **upsertWorkflowSearchAttributesCommandAttributes**: *null* \| [*IUpsertWorkflowSearchAttributesCommandAttributes*](proto.temporal.api.command.v1.iupsertworkflowsearchattributescommandattributes.md)

Command upsertWorkflowSearchAttributesCommandAttributes
