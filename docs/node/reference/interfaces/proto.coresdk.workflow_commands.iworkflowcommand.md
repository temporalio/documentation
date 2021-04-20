# Interface: IWorkflowCommand

[coresdk](../modules/proto.coresdk.md).[workflow_commands](../modules/proto.coresdk.workflow_commands.md).IWorkflowCommand

Properties of a WorkflowCommand.

## Implemented by

* [*WorkflowCommand*](../classes/proto.coresdk.workflow_commands.workflowcommand.md)

## Table of contents

### Properties

- [cancelTimer](proto.coresdk.workflow_commands.iworkflowcommand.md#canceltimer)
- [completeWorkflowExecution](proto.coresdk.workflow_commands.iworkflowcommand.md#completeworkflowexecution)
- [failWorkflowExecution](proto.coresdk.workflow_commands.iworkflowcommand.md#failworkflowexecution)
- [requestCancelActivity](proto.coresdk.workflow_commands.iworkflowcommand.md#requestcancelactivity)
- [respondToQuery](proto.coresdk.workflow_commands.iworkflowcommand.md#respondtoquery)
- [scheduleActivity](proto.coresdk.workflow_commands.iworkflowcommand.md#scheduleactivity)
- [startTimer](proto.coresdk.workflow_commands.iworkflowcommand.md#starttimer)

## Properties

### cancelTimer

• `Optional` **cancelTimer**: *null* \| [*ICancelTimer*](proto.coresdk.workflow_commands.icanceltimer.md)

WorkflowCommand cancelTimer

___

### completeWorkflowExecution

• `Optional` **completeWorkflowExecution**: *null* \| [*ICompleteWorkflowExecution*](proto.coresdk.workflow_commands.icompleteworkflowexecution.md)

WorkflowCommand completeWorkflowExecution

___

### failWorkflowExecution

• `Optional` **failWorkflowExecution**: *null* \| [*IFailWorkflowExecution*](proto.coresdk.workflow_commands.ifailworkflowexecution.md)

WorkflowCommand failWorkflowExecution

___

### requestCancelActivity

• `Optional` **requestCancelActivity**: *null* \| [*IRequestCancelActivity*](proto.coresdk.workflow_commands.irequestcancelactivity.md)

WorkflowCommand requestCancelActivity

___

### respondToQuery

• `Optional` **respondToQuery**: *null* \| [*IQueryResult*](proto.coresdk.workflow_commands.iqueryresult.md)

WorkflowCommand respondToQuery

___

### scheduleActivity

• `Optional` **scheduleActivity**: *null* \| [*IScheduleActivity*](proto.coresdk.workflow_commands.ischeduleactivity.md)

WorkflowCommand scheduleActivity

___

### startTimer

• `Optional` **startTimer**: *null* \| [*IStartTimer*](proto.coresdk.workflow_commands.istarttimer.md)

WorkflowCommand startTimer
