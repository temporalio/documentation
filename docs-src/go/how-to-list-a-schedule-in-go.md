---
id: how-to-list-a-schedule-in-go
title: How to list a Schedule in Go
sidebar_label: List Schedules
description: List all Schedules in a Namespace in Go.
---

The `List` action returns a list of existing Schedules and their respective Schedule IDs.

To return information on all Schedules, use `ScheduleClient.List()`.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-go/blob/add-go-schedule-sample/schedule/list/main_dacx.go">View source code</a>

```go
func main() {
// ...
	// list schedules
	listView, _ := temporalClient.ScheduleClient().List(ctx, client.ScheduleListOptions{
		PageSize: 1,
	})
// ...
}
// ...
```
