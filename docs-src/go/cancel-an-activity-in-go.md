---
id: cancel-activity-in-go
title: Cancel an Activity from a Workflow
description: An Activity can be canceled from within a Workflow if the Activity sends Heartbeats.
sidebar_label: Cancel an Activity
tags:
  - guide-context
---

You can cancel an Activity by using the `workflow.Context` for cancellation.
Here's an example of how you can do this:

```go
ctx, cancelFunc := workflow.WithCancel(ctx)
err := workflow.ExecuteActivity(ctx, foo).Get(null)
if _, ok := err.(*CanceledError); ok {
    // Activity was canceled
}

// ...
// Trigger cancellation of activity context from a different goroutine
cancelFunc()
```

In this code, `workflow.WithCancel(ctx)` is used to create a new context and a cancel function.
The new context is then passed to `workflow.ExecuteActivity()`.
If the Activity is canceled, it will return a `CanceledError`.

To cancel the Activity, call the `cancelFunc()` that is returned by `workflow.WithCancel(ctx)`.

This can be done from a different goroutine.
:::note

Remember that for an Activity to be cancellable, it must be heartbeating.

:::
