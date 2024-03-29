---
id: how-to-pause-a-schedule-in-go
title: How to pause a Schedule in Go
sidebar_label: Pause Schedule
description: To pause or unpause a Schedule in Go, use `Pause()` or `Unpause()` on the `ScheduleHandle`.
tags:
- go sdk
- code sample
- schedule
- pause
- unpause
---

<!-- DO NOT EDIT THIS FILE DIRECTLY.
THIS FILE IS GENERATED from https://github.com/temporalio/documentation/blob/main/sample-apps/go/features/schedules/pause/main.go. -->

`Pause` and `Unpause` enable the start or stop of all future Workflow Runs on a given Schedule.

Pausing a Schedule halts all future Workflow Runs.
Pausing can be enabled by setting `State.Paused` to `true`, or by using `Pause()` on the ScheduleHandle.

Unpausing a Schedule allows the Workflow to execute as planned.
To unpause a Schedule, use `Unpause()` on `ScheduleHandle`.

<div class="copycode-notice-container"><a href="https://github.com/temporalio/documentation/blob/main/sample-apps/go/features/schedules/pause/main.go">View the source code</a> in the context of the rest of the application code.</div>

```go
func main() {
// ...
	err = scheduleHandle.Pause(ctx, client.SchedulePauseOptions{
		Note: "The Schedule has been paused.",
	})
// ...
	err = scheduleHandle.Unpause(ctx, client.ScheduleUnpauseOptions{
		Note: "The Schedule has been unpaused.",
	})
```
