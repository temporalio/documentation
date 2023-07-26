---
id: how-to-trigger-a-schedule-in-go
title: How to trigger a Schedule in Go
sidebar_label: Trigger Schedule
description: To trigger a Schedule in Go, use `trigger()` on `ScheduleHandle`.
---

Triggering a Schedule immediately executes an Action defined in that Schedule.
By default, `trigger` is subject to the Overlap Policy.

To trigger a Scheduled Workflow Execution, use `trigger()` on `ScheduleHandle`.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-go/blob/main/schedule/trigger/main_dacx.go">View source code</a>

```go
func main() {
// ...
	for i := 0; i < 5; i++ {
		scheduleHandle.Trigger(ctx, client.ScheduleTriggerOptions{
			Overlap: enums.SCHEDULE_OVERLAP_POLICY_ALLOW_ALL,
		})
		time.Sleep(2 * time.Second)
	}
// ...
```
