---
id: how-to-update-a-schedule-in-go
title: How to update a Schedule in Go
sidebar_label: Update Schedule
description: Update the configuration of a Schedule.
---

Updating a Schedule changes the configuration of an existing Schedule.
These changes can be made to Workflow Actions, Action parameters, Memos, and the Workflow's Cancellation Policy.

Use `Update()` on the ScheduleHandle to modify a Schedule.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-go/blob/add-go-schedule-sample/schedule/update/main_dacx.go">View source code</a>

```go
func main() {
// ...
	updateSchedule := func(input client.ScheduleUpdateInput) (*client.ScheduleUpdate, error) {
		return &client.ScheduleUpdate{
			Schedule:  &input.Description.Schedule,
		}, nil
	}

	_ = scheduleHandle.Update(ctx, client.ScheduleUpdateOptions{
		DoUpdate: updateSchedule,
	})
}
// ...
```
