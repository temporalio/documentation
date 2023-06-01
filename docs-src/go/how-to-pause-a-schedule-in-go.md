---
id: how-to-pause-a-schedule-in-go
title: How to pause a Schedule in Go
sidebar_label: Pause Schedule
description: Show how to unpause and pause a Schedule in Go.
---

`Pause` and `Unpause` enable the start or stop of all future [Workflow Runs](/concepts/what-is-a-workflow) on a given [Schedule](/concepts/what-is-a-schedule).

Pausing a Schedule halts all future Workflow Runs.
Pause a Schedule by setting `State.Paused` to `true`, or by using `Pause()` on the `ScheduleHandle`.

Unpausing a Schedule allows the Workflow to execute as planned.
To unpause a Schedule, use `Unpause()` on the `ScheduleHandle`, or set `State.Paused` to `false`.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-go/blob/add-go-schedule-sample/schedule/pause/main_dacx.go">View source code</a>

```go
func main() {
// ...
	scheduleHandle, err := temporalClient.ScheduleClient().Create(ctx, client.ScheduleOptions{
// ...
		Paused: true,
	})
// ...
	scheduleHandle.Unpause(ctx, client.ScheduleUnpauseOptions{
		Note: "The Schedule has been unpaused.",
	})
	scheduleHandle.Pause(ctx, client.SchedulePauseOptions{
		Note: "The Schedule has been paused.",
	})
}
// ...
```
