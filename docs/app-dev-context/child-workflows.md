A [Child Workflow Execution](/docs/concepts/what-is-a-child-workflow-execution) is a Workflow Execution that is spawned from within another Workflow.

To asynchronously spawn a Child Workflow Execution, the Child Workflow must have an _Abandon_ [Parent Close Policy](/docs/concepts/what-is-a-parent-close-policy) set in the Child Workflow Options.
Additionally, the Parent Workflow Execution must wait for the `ChildWorkflowExecutionStarted` Event to appear in its Event History before it completes.

If the Parent makes the call to spawn the Child Workflow Execution and then immediately completes, the Child Workflow Execution will not spawn.
