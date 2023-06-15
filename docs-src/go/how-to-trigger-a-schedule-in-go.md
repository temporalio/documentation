---
id: how-to-trigger-a-schedule-in-go
title: How to trigger a Schedule in Go
sidebar_label: Trigger Schedule
description: Immediately execute an Action in a Schedule.
---

Triggering a [Schedule](/concepts/what-is-a-schedule) immediately executes an [Action](/concepts/what-is-a-schedule#action) defined in that Schedule.
By default, `trigger` is subject to the `AllowAll` Overlap Policy.

To trigger a Scheduled [Workflow Execution](/concepts/what-is-a-workflow-execution), use `trigger()` on `ScheduleHandle`.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-go/blob/add-go-schedule-sample/schedule/trigger/main_dacx.go">View source code</a>

```go
func main() {
// ...
	// Create a Schedule to trigger
	scheduleHandle, _ := temporalClient.ScheduleClient().Create(ctx, client.ScheduleOptions{
		ID: "trigger-schedule",
		Spec: client.ScheduleSpec{},
		Action: &client.ScheduleWorkflowAction{},
		Paused: true,
		Overlap: enums.SCHEDULE_OVERLAP_POLICY_ALLOW_ALL,
	})
// ...
	// Trigger Schedule
	for i := 0; i < 5; i++ {
		scheduleHandle.Trigger(ctx, client.ScheduleTriggerOptions{
			Overlap: enums.SCHEDULE_OVERLAP_POLICY_ALLOW_ALL,
		})
		time.Sleep(2 * time.Second)
	}
}
// ...
```
