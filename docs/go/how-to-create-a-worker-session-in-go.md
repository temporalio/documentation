---
id: how-to-create-a-worker-session-in-go
title: How to create a Worker Session in Go
sidebar_label: Worker Session
description: First, enable Sessions on the Worker via the Worker Options and then use the `CreateSession` API to create a Context object that can be passed to the calls to spawn Activity Executions.
tags:
  - go
  - developer-guide
---

First, [enable Sessions on the Worker via the Worker Options](/go/how-to-set-workeroptions-in-go#enablesessionworker).

Next, use the [`CreateSession`](https://pkg.go.dev/go.temporal.io/sdk/workflow#CreateSession) API to create a Context object that can be passed to calls to spawn Activity Executions.

Pass an instance of `workflow.Context` and [`SessionOptions`](https://pkg.go.dev/go.temporal.io/sdk/workflow#SessionOptions) to the `CreateSession` API call and get a Session Context which contains metadata information of the Session.

Use the Session Context to spawn all Activity Executions that should belong to the Session.
All associated Activity Tasks are then processed by the same Worker Entity.

```go
func YourWorkflowDefinition(ctx workflow.Context, fileID string) (err error) {
  // ...
  sessionOptions := &workflow.SessionOptions{
    CreationTimeout:  time.Minute,
    ExecutionTimeout: time.Minute,
  }
  sessionCtx, err := workflow.CreateSession(ctx, sessionOptions)
  if err != nil {
    return err
  }
  defer workflow.CompleteSession(sessionCtx)

  var activityResult1 *ActivityResult1
  err = workflow.ExecuteActivity(sessionCtx, ActivityFunction1, param1).Get(sessionCtx, &activityResult1)
  if err != nil {
    return err
  }

  var activityResult2 *ActivityResult2
  err = workflow.ExecuteActivity(sessionCtx, ActivityFunction2, *activityResult1).Get(sessionCtx, &activityResult2)
  if err != nil {
    return err
  }

  return workflow.ExecuteActivity(sessionCtx, uploadFileActivityName, *activityResult2).Get(sessionCtx, nil)
}
```

When the `CreateSession` API is called, the Task Queue name that is specified in the `ActivityOptions` is used (or in the `StartWorkflowOptions` if the Task Queue name is not specified in `ActivityOptions`), and a Session is created with one of the Workers polling that Task Queue.

The Session Context is cancelled if the Worker executing this Session dies or `CompleteSession()` is called.
When using the returned Session Context to spawn Activity Executions, a `workflow.ErrSessionFailed` error may be returned if the Session framework detects that the Worker executing this Session has died.
The failure of Activity Executions won't affect the state of the Session, so you still need to handle the errors returned from your Activities and call `CompleteSession()` if necessary.

`CreateSession()` will return an error if the context passed in already contains an open Session.
If all the Workers are currently busy and unable to handle new Session, the framework will keep retrying until the `CreationTimeout` you specified in `SessionOptions` has passed before returning an error (check the **Concurrent Session Limitation** section for more details).

`CompleteSession()` releases the resources reserved on the Worker, so it's important to call it as soon as you no longer need the Session.
It will cancel the session context and therefore all the Activity Executions using that Session Context.
Note that it's safe to call `CompleteSession()` on a failed Session, meaning that you can call it from a `defer` function after the Session is successfully created.

#### Session metadata

```go
type SessionInfo struct {
  // A unique Id for the session
  SessionID         string
  // The hostname of the worker that is executing the session
  HostName          string
  // ... other unexported fields
}

func GetSessionInfo(ctx Context) *SessionInfo
```

The Session Context also stores some Session metadata, which can be retrieved by the `GetSessionInfo()` API.
If the Context passed in doesn't contain any Session metadata, this API will return a `nil` pointer.

#### Limiting concurrent Sessions

To limit the number of concurrent Sessions running on a Worker, set the `MaxConcurrentSessionExecutionSize` field of `worker.Options` to the desired value.
By default this field is set to a very large value, so there's no need to manually set it if no limitation is needed.

If a Worker hits this limitation, it won't accept any new `CreateSession()` requests until one of the existing sessions is completed. `CreateSession()` will return an error if the session can't be created within `CreationTimeout`.

#### Recreate Session

For long-running Sessions, you may want to use the `ContinueAsNew` feature to split the Workflow into multiple runs when all Activities need to be executed by the same Worker.
The `RecreateSession()` API is designed for such a use case.

```go
func RecreateSession(ctx Context, recreateToken []byte, sessionOptions *SessionOptions) (Context, error)
```

Its usage is the same as `CreateSession()` except that it also takes in a `recreateToken`, which is needed to create a new Session on the same Worker as the previous one.
You can get the token by calling the `GetRecreateToken()` method of the `SessionInfo` object.

```go
token := workflow.GetSessionInfo(sessionCtx).GetRecreateToken()
```

**Is there a complete example?**

Yes, the [file processing example](https://github.com/temporalio/samples-go/tree/master/fileprocessing) in the [temporalio/samples-go](https://github.com/temporalio/samples-go) repo has been updated to use the session framework.

**What happens to my Activity if the Worker dies?**

If your Activity has already been scheduled, it will be canceled.
If not, you will get a `workflow.ErrSessionFailed` error when you call `workflow.ExecuteActivity()`.

**Is the concurrent session limitation per process or per host?**

It's per Worker Process, so make sure there's only one Worker Process running on the host if you plan to use this feature.

**Future Work**

- Right now a Session is considered failed if the Worker Process dies.
  However, for some use cases, you may only care whether the Worker host is alive or not.
  For these uses cases, the Session should be automatically re-established if the Worker Process is restarted.

- The current implementation assumes that all Sessions are consuming the same type of resource and there's only one global limitation.
  Our plan is to allow you to specify what type of resource your Session will consume and enforce different limitations on different types of resources.
