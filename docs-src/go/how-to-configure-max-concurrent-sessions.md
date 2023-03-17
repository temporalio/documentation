---
id: how-to-configure-max-concurrent-sessions
title: How to configure the maximum concurrent Sessions on the Worker
sidebar_label: Max concurrent Sessions
description: Set EnableSessionWorker to true in the Worker options.
---

To limit the number of concurrent Sessions running on a Worker, set the `MaxConcurrentSessionExecutionSize` field of `worker.Options` to the desired value.
By default, this field is set to a very large value, so there's no need to manually set it if no limitation is needed.

If a Worker hits this limitation, it won't accept any new `CreateSession()` requests until one of the existing sessions is completed. `CreateSession()` will return an error if the session can't be created within `CreationTimeout`.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-go/blob/sessions/sessions/worker/main_dacx.go">View source code</a>

```go
func main() {
// ...
	workerOptions := worker.Options{
// ...
		// This configures the maximum allowed concurrent sessions
		// Only customize this value if you need to.
		MaxConcurrentSessionExecutionSize: 1000,
// ...
}
// ...
```
