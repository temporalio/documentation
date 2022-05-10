Calls to spawn [Activity Executions](/concepts/what-is-an-activity-execution) are written within a Workflow Definition.
The call to spawn an Activity Execution generates the [ScheduleActivityTask](/concepts/what-is-a-command#scheduleactivitytask) Command.
This results in the set of three [Activity Task](/concepts/what-is-an-activity-task) related Events ([ActivityTaskScheduled](/references/events/#activitytaskscheduled), [ActivityTaskStarted](/references/events/#activitytaskstarted), and ActivityTask[Closed])in your Workflow Execution Event History.

A single instance of the Activities implementation is shared across multiple simultaneous Activity invocations.
Therefore, the Activity implementation code must be _stateless_.

The values passed to Activities through invocation parameters or returned through a result value are recorded in the Execution history.
The entire Execution history is transferred from the Temporal service to Workflow Workers when a Workflow state needs to recover.
A large Execution history can thus adversely impact the performance of your Workflow.

Therefore, be mindful of the amount of data you transfer through Activity invocation parameters or Return Values.
Otherwise, no additional limitations exist on Activity implementations.
