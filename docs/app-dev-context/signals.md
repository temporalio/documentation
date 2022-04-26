First define your Signal type.
Then add a Signal handler to your Workflow Definition.

Signals can be sent to Workflow Executions via the Temporal Client or from within a Workflow.

Signal-With-Start can be used to start a Workflow Execution (if not already running) and pass it the Signal at the same time.
