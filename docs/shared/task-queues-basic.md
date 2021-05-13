From a high level, we can say that a Task Queue is exactly what the name suggests.
It is a "first-in-first-out" queue for Tasks, where a Task is the context needed to execute a chunk of code that alters the "state" of a <a href={props.workflowLink}>Workflow</a>.

Task Queues are maintained by the [Temporal Server](/docs/server/introduction).
The Server places Tasks into a Task Queue to schedule, start, cancel, and complete parts of a Workflow and/or Activity, for example.
A <a href={props.workerLink}>Worker</a> engages in a long poll with a Task Queue, hungrily waiting for a Task to become available.
The Worker then executes what ever the Task tells the Worker to do.
