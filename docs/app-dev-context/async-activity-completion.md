[Asynchronous Activity Completion](/concepts/what-is-asynchronous-activity-completion) enables the Activity Function to return without the Activity Execution completing.

There are three steps to follow:

1. The Activity provides the external system with the [Task Token](/concepts/what-is-a-task-token) needed to complete it.
2. The Activity identifies itself as waiting to be completed by an external system.
3. The Temporal Client is used to complete the Activity.
