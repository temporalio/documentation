---
id: how-to-create-a-schedule-in-go
title: How to create a Schedule in Go
sidebar_label: Create Schedule
description: To create a Schedule in Go, use Create() on the Client.
tags:
  - go sdk
  - how-to-doc-type
  - developer-guide-doc-type
  - schedule
  - schedule create
---

Schedules are initiated with the `create` call.
The user generates a unique Schedule ID for each new Schedule.

To create a Schedule in Go, use `Create()` on the Client.
Schedules must be initialized with a Schedule ID, [Spec](/concepts/what-is-a-schedule#spec), and [Action](/concepts/what-is-a-schedule#action) in `client.ScheduleOptions{}`.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-go/blob/main/schedule/create/main_dacx.go">View source code</a>

```go
func main() {
// ...
	scheduleID := "schedule_id"
	workflowID := "schedule_workflow_id"
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
}
// ...
```
