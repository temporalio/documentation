---
id: how-to-delete-a-schedule-in-go
title: How to delete a Schedule in Go
sidebar_label: Delete Schedule
description: 
---

Deleting a [Schedule](/concepts/what-is-a-schedule) erases a Schedule.
Deletion does not affect any [Workflows](/concepts/what-is-a-workflow) started by the Schedule.

To delete a Schedule, use `Delete()` on the `ScheduleHandle`.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-go/blob/add-go-schedule-sample/schedule/delete/main_dacx.go">View source code</a>

```go
func main() {
// ...
	scheduleHandle.Delete(ctx)	
}
// ...
```
