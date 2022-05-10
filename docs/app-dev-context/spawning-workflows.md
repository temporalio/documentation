[Workflow Execution](/concepts/what-is-a-workflow-execution) semantics rely on several parameters - that is, to start a Workflow Execution you must supply a Task Queue that will be used for the Tasks (one that a Worker is polling), the Workflow Type, language specific contextual data, and Workflow Function parameters.

In the examples below, all Workflow Executions are started using a Temporal Client.
To spawn Workflow Executions from within other Workflow Executions, use either the [Child Workflow](#child-workflows) or External Workflow APIs.

See the [Customize Workflow Type](#customize-workflow-type) section to see how to customize the name of the Workflow Type.

A request to spawn a Workflow Execution causes the Temporal Cluster to create the first Event ([WorkflowExecutionStarted](/concepts/what-is-an-event#workflowexecutionstarted)) in the Workflow Execution Event History.
The Temporal Cluster then creates the first Workflow Task resulting the first [WorkflowTaskScheduled](/concepts/what-is-an-event/#workflowtaskscheduled) Event.
