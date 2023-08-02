---
id: how-to-create-a-session-from-the-workflow-in-go
title: How to create a Worker Session in Go
sidebar_label: Worker Session
description: Enable Sessions on the Worker via the Worker Options and then use the `CreateSession` API to create a Context object that can be passed to the calls to spawn Activity Executions.
tags:
  - go sdk
  - how-to-doc-type
  - sessions
  - api
  - developer-guide-doc-type
---

Use the [`CreateSession`](https://pkg.go.dev/go.temporal.io/sdk/workflow#CreateSession) API to create a Context object that can be passed to calls to spawn Activity Executions.

Pass an instance of `workflow.Context` and [`SessionOptions`](https://pkg.go.dev/go.temporal.io/sdk/workflow#SessionOptions) to the `CreateSession` API call and get a Session Context that contains metadata information of the Session.

Use the Session Context to spawn all Activity Executions that should belong to the Session.
All associated Activity Tasks are then processed by the same Worker Entity.
When the `CreateSession` API is called, the Task Queue name that is specified in `ActivityOptions` (or in `StartWorkflowOptions` if the Task Queue name is not specified in `ActivityOptions`) is used, and a Session is created with one of the Workers polling that Task Queue.

The Session Context is cancelled if the Worker executing this Session dies or `CompleteSession()` is called.
When using the returned Session Context to spawn Activity Executions, a `workflow.ErrSessionFailed` error is returned if the Session framework detects that the Worker executing this Session has died.
The failure of Activity Executions won't affect the state of the Session, so you still need to handle the errors returned from your Activities and call `CompleteSession()` if necessary.

If the context passed in already contains an open Session, `CreateSession()` returns an error.
If all the Workers are currently busy and unable to handle a new Session, the framework keeps retrying until the `CreationTimeout` period you specified in `SessionOptions` has passed before returning an error.
(For more details, check the "Concurrent Session Limitation" section.)

`CompleteSession()` releases the resources reserved on the Worker, so it's important to call it as soon as you no longer need the Session.
It cancels the session context and therefore all the Activity Executions using that Session Context.
It is safe to call `CompleteSession()` on a failed Session, meaning that you can call it from a `defer` function after the Session is successfully created.

If the Worker goes down between Activities, any scheduled Activities meant for the Session Worker are canceled.
If not, you get a `workflow.ErrSessionFailed` error when the next call of `workflow.ExecuteActivity()` is made from that Workflow.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-go/blob/main/sessions/workflow_dacx.go">View source code</a>

```go
package sessions

import (
	"time"

	"go.temporal.io/sdk/workflow"
)

// ...
// SomeFileProcessingWorkflow is a Workflow Definition.
func SomeFileProcessingWorkflow(ctx workflow.Context, param FileProcessingWFParam) error {
	activityOptions := workflow.ActivityOptions{
		StartToCloseTimeout: time.Minute,
	}
	ctx = workflow.WithActivityOptions(ctx, activityOptions)
// ...
	sessionOptions := &workflow.SessionOptions{
		CreationTimeout:  time.Minute,
		ExecutionTimeout: time.Minute,
	}
	// Create a Session with the Worker so that all Activities execute with the same Worker.
	sessionCtx, err := workflow.CreateSession(ctx, sessionOptions)
	if err != nil {
		return err
	}
	defer workflow.CompleteSession(sessionCtx)
// ...
	err = workflow.ExecuteActivity(sessionCtx, a.DownloadFile, param).Get(sessionCtx, &downloadResult)
// ...
	err = workflow.ExecuteActivity(sessionCtx, a.ProcessFile, processParam).Get(sessionCtx, &processResult)
// ...
	err = workflow.ExecuteActivity(sessionCtx, a.UploadFile, uploadParam).Get(sessionCtx, nil)
// ...
}
```
