---
id: how-to-enable-sessions-on-a-worker
title: How to enable Sessions on a Worker
sidebar_label: Enable Sessions
description: Set EnableSessionWorker to true in the Worker options.
tags:
  - go sdk
  - workers
  - sessions
  - how-to-doc-type
---

Set `EnableSessionWorker` to `true` in the Worker options.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-go/blob/main/sessions/worker/main_dacx.go">View source code</a>

```go
// ...
func main() {
// ...
	// Enable Sessions for this Worker.
	workerOptions := worker.Options{
		EnableSessionWorker: true,
// ...
	}
	w := worker.New(temporalClient, "fileprocessing", workerOptions)
	w.RegisterWorkflow(sessions.SomeFileProcessingWorkflow)
	w.RegisterActivity(&sessions.FileActivities{})
	err = w.Run(worker.InterruptCh())
// ...
}
```
