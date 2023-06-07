---
id: additional-session-info
title: Additional Session usage information
sidebar_label: Session metadata
description: The Session Context also stores some Session metadata, which can be retrieved by the GetSessionInfo API.
tags:
  - go
  - sessions
  - task-routing
---

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

### Recreate Session

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

- Right now, a Session is considered failed if the Worker Process dies.
  However, for some use cases, you may only care whether the Worker host is alive or not.
  For these use cases, the Session should be automatically re-established if the Worker Process is restarted.

- The current implementation assumes that all Sessions are consuming the same type of resource and there's only one global limitation.
  Our plan is to allow you to specify what type of resource your Session will consume and enforce different limitations on different types of resources.
