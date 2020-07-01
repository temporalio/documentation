---
id: go-error-handling
title: Error Handling
---

An activity, or child workflow, might fail, and you could handle errors differently based on different
error cases. If the activity returns an error as `errors.New()` or `fmt.Errorf()`, those errors will
be converted to `*temporal.ApplicationError` and wrapped inside `*temporal.ActivityTaskError` or `*temporal.ChildWorkflowExecutionError`. If the activity returns an error as
`temporal.NewRetryableApplicationError("error message", details)`, that error will be returned as `*temporal.ApplicationError`.
There are other types of errors such as `*temporal.TimeoutError`, `*temporal.CanceledError` and
`*temporal.PanicError`. Following is an example of what your error code might look like:

```go
err := workflow.ExecuteActivity(ctx, MyActivity, ...).Get(ctx, nil)
if err != nil {
	var applicationErr *ApplicationError
	if errors.As(err, &applicationErr) {
		// retrieve error message
		fmt.Println(applicationError.Error())

		// handle activity errors (created via NewApplicationError() API)
		var detailMsg string // assuming activity return error by NewApplicationError("message", true, "string details")
		applicationErr.Details(&detailMsg) // extract strong typed details

		// handle activity errors (errors created other than using NewApplicationError() API)
		switch err.OriginalType() {
		case "CustomErrTypeA":
			// handle CustomErrTypeA
		case CustomErrTypeB:
			// handle CustomErrTypeB
		default:
			// newer version of activity could return new errors that workflow was not aware of.
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
