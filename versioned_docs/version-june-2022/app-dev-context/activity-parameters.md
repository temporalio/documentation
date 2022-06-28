All Activity parameters must be serializable.

There is no explicit limit to the amount of parameter data that can be passed to an Activity, but keep in mind that all parameters and return values are recorded in a [Workflow Execution Event History](/concepts/what-is-an-event-history).
A large Workflow Execution Event History can adversely impact the performance of your Workflow Executions, because the entire Event History is transferred to Worker Processes with every [Workflow Task](/concepts/what-is-a-workflow-task).
