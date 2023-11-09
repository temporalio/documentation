---
id: how-to-configure-max-concurrent-sessions
title: How to configure the maximum concurrent Sessions on the Worker
sidebar_label: Max concurrent Sessions
description: Set MaxConcurrentSessionExecutionSize in the Worker options.
tags:
- go sdk
- code sample
- session
- worker
---

<!-- DO NOT EDIT THIS FILE DIRECTLY.
THIS FILE IS GENERATED from https://github.com/temporalio/documentation-samples-go/blob/typos-fix/sessions/worker/main_dacx.go. -->

To limit the number of concurrent Sessions running on a Worker, set the `MaxConcurrentSessionExecutionSize` field of `worker.Options` to the desired value.
By default, this field is set to a very large value, so there's no need to manually set it if no limitation is needed.

If a Worker hits this limitation, it won't accept any new `CreateSession()` requests until one of the existing sessions is completed.
If the session can't be created within `CreationTimeout`, `CreateSession()` returns an error .

<div class="copycode-notice-container"><div class="copycode-notice"><img data-style="copycode-icon" src="/icons/copycode.png" alt="Copy code icon" /> Sample application code information <img id="i-a819ef06-f459-444d-9ff6-33693b413d66" data-event="clickable-copycode-info" data-style="chevron-icon" src="/icons/chevron.png" alt="Chevron icon" /></div><div id="copycode-info-a819ef06-f459-444d-9ff6-33693b413d66" class="copycode-info">The following code sample comes from a working and tested sample application. The code sample might be abridged within the guide to highlight key aspects. Visit the source repository to <a href="https://github.com/temporalio/documentation-samples-go/blob/typos-fix/sessions/worker/main_dacx.go">view the source code</a> in the context of the rest of the application code.</div></div>

```go
func main() {
// ...
	workerOptions := worker.Options{
// ...
		// This configures the maximum allowed concurrent sessions.
		// Customize this value only if you need to.
		MaxConcurrentSessionExecutionSize: 1000,
// ...
}
// ...
```