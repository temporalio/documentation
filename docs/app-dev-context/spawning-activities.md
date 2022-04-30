Calls to spawn [Activity Executions](/docs/concepts/what-is-an-activity-execution) are written within a Workflow Definition.
The call to spawn an Activity Execution generates the [ScheduleActivityTask](/docs/concepts/what-is-a-command#scheduleactivitytask) Command.
This results in the set of three [Activity Task](/docs/concepts/what-is-an-activity-task) related Events ([ActivityTaskScheduled](/docs/references/events/#activitytaskscheduled), [ActivityTaskStarted](/docs/references/events/#activitytaskstarted), and ActivityTask[Closed])in your Workflow Execution Event History.
