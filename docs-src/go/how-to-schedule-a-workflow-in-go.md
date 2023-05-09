---
id: how-to-schedule-a-workflow-in-go
title: How to Schedule a Workflow in Go 
sidebar_label: Schedule
description: Set a Schedule in Go for scheduling Workflows to run at specific times.
tags:
  - go
  - developer-guide
  - how-to
---

Scheduling [Workflows](/concepts/what-is-a-workflow) is crucial to automation.
By scheduling [Workflow Executions](/concepts/what-is-a-workflow-execution), you can reduce manual intervention and ensure timely execution of business processes.

Temporal allows you to execute multiple Schedule operations through code, the Web UI, and with the [CLI tool](/concepts/what-is-the-temporal-cli).
Read on to find out how to create and edit Schedules.

:::note
If using your own server instead of Temporal Cloud, be sure to [enable Schedules in your environment](/concepts/what-is-a-schedule#limitations) before creating any Schedules.
:::

## Create

Schedules are created with the `create` call.
For each new Schedule, the user generates a unique Schedule ID.

To create a Schedule in Go, use `ScheduleClient().Create()` on the [Client](/concepts/what-is-the-temporal-client).
Schedules must be initialized with a Schedule ID, [Spec](/concepts/what-is-a-schedule#spec), and [Action](/concepts/what-is-a-schedule#action) to perform.
Enter these values in `client.Schedule.Options{}`.

```go
scheduleID := "schedule_" + uuid.New()
workflowID := "schedule_workflow_" + uuid.New()
log.Println("Creating schedule", "ScheduleID", scheduleID)
scheduleHandle, err := c.ScheduleClient().Create(ctx, client.ScheduleOptions{
	ID:   scheduleID,
	Spec: client.ScheduleSpec{},
	Action: &client.ScheduleWorkflowAction{
		ID:        workflowID,
		Workflow:  schedule.SampleScheduleWorkflow,
		TaskQueue: "schedule",
	},
})
if err != nil {
	log.Fatalln("Unable to create schedule", err)
}
```

## Backfill

Backfilling a Schedule executes [Workflow Tasks](/concepts/what-is-a-workflow-task) ahead of the Schedule's specified time range.
This is useful when you need to execute a missed or delayed Action, or if you want to test the Workflow ahead of time.

To backfill a Schedule in Go, use `Backfill()` on `ScheduleHandle`.

```go
log.Println("Backfilling schedule", "ScheduleID", scheduleHandle.GetID())
err = scheduleHandle.Backfill()
if err != nil {
	log.Fatalln("Unable to backfill schedule", err)
}
```

## Delete

Deleting a Schedule erases a Schedule.
Deletion does not affect any Workflows started by the Schedule.

To delete a Schedule in Go, use the `Delete()` command on `ScheduleHandle`.

```go
log.Println("Deleting schedule", "ScheduleID", scheduleHandle.GetID())
err = scheduleHandle.Delete(ctx)
if err != nil {
	log.Fatalln("Unable to delete schedule", err)
}
```

## Describe

You can retrieve information about the current Schedule configuration by using the `describe` call.
This is helpful when you want to get a detailed view of the Schedule and its associated [Workflow Runs](/concepts/what-is-a-run-id).

To describe a Schedule in Go, use `Describe()` on `ScheduleHandle`.

```go
description, err := scheduleHandle.Describe(ctx)
if err != nil {
	log.Fatalln("Unable to describe schedule", err)
}
```

## List

When used, `list` returns all available Schedules and their Schedule Ids.

To retrieve a list of Schedules, use `ScheduleClient().List()`.

## Pause/unpause

The `pause` and `unpause` calls enable starting or stopping all future Workflow Runs on a given Schedule.
Pausing a Schedule halts all future Workflow Runs; unpausing a Schedule allows the Workflow to execute as planned.

Pausing can be enabled when you create a Schedule by setting `State.Paused` to `true`.

```go
schedule.Description.Schedule.State.Paused = true
```

Pausing can also be done by using `Pause()` on `ScheduleHandle`.

```go
ScheduleHandle.Pause()
if err != nil {
	log.Fatalln("Unable to pause schedule", err)
}
```

To unpause a Schedule, use `Unpause()` on `ScheduleHandle`.

```go
log.Println("Unpausing schedule", "ScheduleID", scheduleHandle.GetID())
err = scheduleHandle.Unpause(ctx, client.ScheduleUnpauseOptions{})
if err != nil {
	log.Fatalln("Unable to unpause schedule", err)
}
```

## Trigger

Triggering a Schedule immediately executes an Action defined in the Schedule.
By default, `trigger` is subject to the Overlap Policy.

To trigger a Scheduled Workflow Execution in Go, use `Trigger()` on `ScheduleHandle`.
Set desired changes in `ScheduleTriggerOptions`.

```go
log.Println("Manually triggering schedule", "ScheduleID", scheduleHandle.GetID())
err = scheduleHandle.Trigger(ctx, client.ScheduleTriggerOptions{
	Overlap: enums.SCHEDULE_OVERLAP_POLICY_ALLOW_ALL,
})
if err != nil {
	log.Fatalln("Unable to trigger schedule", err)
}
```

## Update

Updating a Schedule changes the configuration of existing Schedules.

Use the `Update()` command to modify an existing Schedule.

```go
// Update the schedule with a spec so it will run periodically,
log.Println("Updating schedule", "ScheduleID", scheduleHandle.GetID())
err = scheduleHandle.Update(ctx, client.ScheduleUpdateOptions{
	DoUpdate: func(schedule client.ScheduleUpdateInput) (*client.ScheduleUpdate, error) {
		schedule.Description.Schedule.Spec = &client.ScheduleSpec{
			// Run the schedule at 5pm on Friday
			Calendars: []client.ScheduleCalendarSpec{
				{
					Hour: []client.ScheduleRange{
						{
							Start: 17,
						},
					},
					DayOfWeek: []client.ScheduleRange{
						{
							Start: 5,
						},
					},
				},
			},
			// Run the schedule every 5s
			Intervals: []client.ScheduleIntervalSpec{
				{
					Every: 5 * time.Second,
				},
			},
		}
		// Start the schedule paused to demonstrate how to unpause a schedule
		schedule.Description.Schedule.State.Paused = true
		schedule.Description.Schedule.State.LimitedActions = true
		schedule.Description.Schedule.State.RemainingActions = 10

		return &client.ScheduleUpdate{
			Schedule: &schedule.Description.Schedule,
		}, nil
	},
})
if err != nil {
	log.Fatalln("Unable to update schedule", err)
}
```
