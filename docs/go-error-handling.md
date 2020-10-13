---
id: go-error-handling
title: Error Handling
---

An Activity, or a child Workflow, might fail, and you could handle errors differently based on the different
error cases.

If the Activity returns an error as `errors.New()` or `fmt.Errorf()`, that error will
be converted to `*temporal.ApplicationError` and wrapped inside `*temporal.ActivityTaskError` or `*temporal.ChildWorkflowExecutionError`.

If the Activity returns an error as `temporal.NewRetryableApplicationError("error message", details)`, that error will be returned as `*temporal.ApplicationError`.

There are other types of errors such as `*temporal.TimeoutError`, `*temporal.CanceledError` and
`*temporal.PanicError`.
Following is an example of what your error code might look like:

Here's an example of handling Activity errors within Workflow code that differentiates between different error types.

```go
err := workflow.ExecuteActivity(ctx, MyActivity, ...).Get(ctx, nil)
if err != nil {
	var applicationErr *ApplicationError
	if errors.As(err, &applicationErr) {
		// retrieve error message
		fmt.Println(applicationError.Error())

		// handle Activity errors (created via NewApplicationError() API)
		var detailMsg string // assuming Activity return error by NewApplicationError("message", true, "string details")
		applicationErr.Details(&detailMsg) // extract strong typed details

		// handle Activity errors (errors created other than using NewApplicationError() API)
		switch err.OriginalType() {
		case "CustomErrTypeA":
			// handle CustomErrTypeA
		case CustomErrTypeB:
			// handle CustomErrTypeB
		default:
			// newer version of Activity could return new errors that Workflow was not aware of.
		}
	}

	var canceledErr *CanceledError
	if errors.As(err, &canceledErr) {
		// handle cancellation
	}

	var timeoutErr *TimeoutError
	if errors.As(err, &timeoutErr) {
		// handle timeout, could check timeout type by timeoutErr.TimeoutType()
        switch err.TimeoutType() {
        case commonpb.ScheduleToStart:
                // Handle ScheduleToStart timeout.
        case commonpb.StartToClose:
                // Handle StartToClose timeout.
        case commonpb.Heartbeat:
                // Handle heartbeat timeout.
        default:
        }
	}

	var panicErr *PanicError
	if errors.As(err, &panicErr) {
		// handle panic, message and stack trace are available by panicErr.Error() and panicErr.StackTrace()
	}
}
```
