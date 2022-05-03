A [Child Workflow Execution](/docs/concepts/what-is-a-child-workflow-execution) is a Workflow Execution that is scheduled from within another Workflow using a Child Workflow API.

When using a Child Workflow API, Child Workflow related Events ([StartChildWorkflowExecutionInitiated](/docs/references/events#startchildworkflowexecutioninitiated), [ChildWorkflowExecutionStarted](/docs/references/events#childworkflowexecutionstarted), [ChildWorkflowExecutionCompleted](/docs/references/events#childworkflowexecutioncompleted), etc...) are logged in the Workflow Execution Event History.

Always block progress until the [ChildWorkflowExecutionStarted](/docs/references/events#childworkflowexecutionstarted) Event is logged to the Event History to ensure the Child Workflow Execution has started.
After that, Child Workflow Executions may be abandoned using the default _Abandon_ [Parent Close Policy](/docs/concepts/what-is-a-parent-close-policy) set in the Child Workflow Options.
