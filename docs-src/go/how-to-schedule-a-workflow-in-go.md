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

Temporal allows you to execute multiple Schedule operations, either through code or with the [CLI tool](/concepts/what-is-the-temporal-cli).
Read on to find out how to create and edit Schedules.

:::note
Be sure to [enable Schedules in your environment](/concepts/what-is-a-schedule#limitations) before creating any Schedules.
:::

## Create

Schedules are created with the `create` action.
For each new Schedule, tbe Temporal Server generates a unique Schedule ID.

To create a Schedule in Go, use `ScheduleClient().Create()` on the [Client](/concepts/what-is-the-temporal-client).
Schedules must be initialized with a Schedule ID, [Spec](/concepts/what-is-a-schedule#spec), and [Action](/concepts/what-is-a-schedule#action) to perform.
Enter these values in `client.Schedule.Options{}`.

<!--SNIPSTART samples-go-schedule {"selectedLines": ["28-36"]}-->
<!--SNIPEND-->

## Backfill

Backfilling a Schedule executes [Workflow Tasks](/concepts/what-is-a-workflow-task) ahead of the Schedule's specified time range.
This is useful when you need to execute a missed or delayed Action, or if you want to test the Workflow ahead of time.

To backfill a Schedule in Go, use `Backfill()` on `scheduleHandle`.

## Delete

Deleting a Schedule erases a Schedule from a Workflow.
Deletion does not affect any Workflows started by the Schedule.

To delete a Schedule in Go, use the `Delete()` command on `scheduleHandle`.

<!--SNIPSTART samples-go-schedule {"selectedLines": ["43-46"]}-->
<!--SNIPEND-->

## Describe

You can retrieve information about the current Schedule configuration by using the `describe` action.
This is helpful when you want to get a detailed view of the Schedule and its associated [Workflow Runs](/concepts/what-is-a-run-id).

To describe a Schedule in Go, use `Describe()` on `scheduleHandle`.

<!--SNIPSTART samples-go-schedule {"selectedLines": ["107-110"]}-->
<!--SNIPEND-->

## List

When used, `list` returns all available Schedules and their Schedule Ids.

To retrieve a list of Schedules, use `ScheduleClient().List()`.

## Pause/unpause

The `pause` and `unpause` actions enable starting or stopping all future Workflow Runs on a given Schedule.
Pausing a Schedule halts all future Workflow Runs; unpausing a Schedule allows the Workflow to execute as planned.

Pausing can be enabled when you create a Schedule by setting `State.Paused` to `true`.

<!--SNIPSTART samples-go-schedule {"selectedLines": ["85"]}-->
<!--SNIPEND-->

Pausing can also be done by using `Pause()` on `scheduleHandle`.

```go
scheduleHandle.Pause()
```

To unpause a Schedule, use `Unpause()` on `scheduleHandle`.

<!--SNIPSTART samples-go-schedule {"selectedLines": ["99-102"]}-->
<!--SNIPEND-->

## Trigger

Triggering a Schedule immediately executes an Action defined in the Schedule.
By default, `trigger` is subject to the Overlap Policy.

To trigger a Scheduled Workflow Execution in Go, use `Trigger()` on `scheduleHandle`.
Set desired changes in `ScheduleTriggerOptions`.

<!--SNIPSTART samples-go-schedule {"selectedLines": ["51-56"]}-->
<!--SNIPEND-->

## Update

Updating a Schedule changes the configuration of existing Schedules.

Use the `Update()` command to modify an existing Schedule.

<!--SNIPSTART samples-go-schedule {"selectedLines": ["59-83"]}-->
<!--SNIPEND-->
