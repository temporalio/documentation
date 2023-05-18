---
id: how-to-create-a-schedule-in-go
title: How to create a Schedule in Go
sidebar_label: Create Schedule
description: Create a Schedule for a Workflow in Go.
---

Schedules are initiated with the `create` call.
The user generates a unique Schedule ID for each new Schedule.

To create a Schedule in Go, use `Create()` on the [Client](/concepts/what-is-a-temporal-client).
Schedules must be initialized with a Schedule ID, [Spec](/concepts/what-is-a-schedule#spec), and [Action](/concepts/what-is-a-schedule#action) in `client.ScheduleOptions{}`.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-go/blob/add-go-schedule-sample/schedule/create/main_dacx.go">View source code</a>

```go
func main() {
// ...
    // Create Schedule and Workflow IDs
	scheduleID := "schedule_" + uuid.New()
	workflowID := "schedule_workflow_" + uuid.New()
	// Create the schedule.
	scheduleHandle, err := temporalClient.ScheduleClient().Create(ctx, client.ScheduleOptions{
		ID:   scheduleID,
		Spec: client.ScheduleSpec{},
		Action: &client.ScheduleWorkflowAction{
			ID:        workflowID,
			Workflow:  schedule.ScheduleWorkflow,
			TaskQueue: "schedule",
		},
	})
// ...
```
