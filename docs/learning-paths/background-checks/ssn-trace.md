---
id: ssn-trace
title: What does the SSN Trace Workflow Definition look like?
sidebar_label: SSN Trace
description: The SSN Trace Workflow calls an external API via an Activity Execution and returns the results.
---

<!--SNIPSTART background-checks-ssn-trace-workflow-definition-->
[workflows/ssn_trace.go](https://github.com/temporalio/background-checks/blob/master/workflows/ssn_trace.go)
```go

// SSNTrace is a Workflow Definition that calls for the execution of a single Activity.
// This is executed as a Child Workflow by the main Background Check.
func SSNTrace(ctx workflow.Context, input *SSNTraceWorkflowInput) (*SSNTraceWorkflowResult, error) {
	var result activities.SSNTraceResult

	ctx = workflow.WithActivityOptions(ctx, workflow.ActivityOptions{
		StartToCloseTimeout: time.Minute,
	})

	f := workflow.ExecuteActivity(ctx, a.SSNTrace, SSNTraceWorkflowInput(*input))

	err := f.Get(ctx, &result)
	r := SSNTraceWorkflowResult(result)
	return &r, err
}

```
<!--SNIPEND-->

![Swim lane diagram of the SSN Trace Child Workflow Execution](/diagrams/background-checks/ssn-trace-flow.svg)
