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

Scheduling [Workflows]() is crucial to automation.
By scheduling [Workflow Executions](), you can reduce manual intervention and ensure timely execution of business processes.

Temporal allows you to execute multiple Schedule operations, either through code or with the [CLI tool]().
Read on to find out how to create and edit Schedules.

:::note
Make sure to [enable Schedules in your environment]() before creating any Schedules.
:::

## Create

Schedules are created with the `create` action. 
Each new Schedule is given a uniquely generated Schedule ID.

To create a Schedule in Go, use `ScheduleClient().Create()` on the [Client]().
Schedules must be initialized with a Schedule ID, [Spec](), and [Action]() to perform.
Enter these values in `client.Schedule.Options{}`.

<!--SNIPSTART samples-go-schedule {"selectedLines": ["28-36"]}-->
<!--SNIPEND-->

## Backfill

Backfilling a Schedule executes [Workflow Actions]() ahead of the Schedule's specified time range.
This is useful when you need to execute a missed or delayed Action, or if you want to test the Workflow ahead of time.

To backfill a Schedule in Go, use `Backfill()` on the `scheduleHandle`.

## Delete

Deleting a Schedule erases a Schedule from a Workflow.
Deletion does not affect any Workflows started by the Schedule.

To delete a Schedule in Go, use the `Delete()` command on the `scheduleHandle`.

<!--SNIPSTART samples-go-schedule {"selectedLines": ["43-46"]}-->
<!--SNIPEND-->

## Describe

Information about the current Schedule configuration can be retrieved with the `describe` action.
This is helpful when you want to get a detailed view of the Schedule and its associated [Workflow Runs]().

To describe a Schedule in Go, use `Describe()` on the `scheduleHandle`.

<!--SNIPSTART samples-go-schedule {"selectedLines": ["107-110"]}-->
<!--SNIPEND-->

## List

When used, `list` returns all available Schedules and their Schedule IDs.

To retrieve a list of Schedules, use `ScheduleClient().List()`.

## Pause/unpause

The `pause` and `unpause` actions enable the start or stop of all future Workflow Runs on a given Schedule.
Pausing a Schedule halts all future Workflow Runs, while unpausing a Schedule allows the Workflow to execute as planned.

Pausing can be enabled upon creating a Schedule by setting `State.Paused` to `true`.

<!--SNIPSTART samples-go-schedule {"selectedLines": ["85"]}-->
<!--SNIPEND-->

Pausing can also be done by using `Pause()` on the `scheduleHandle`.

```go
scheduleHandle.Pause()
```

To unpause a Schedule, use `Unpause()` on the `scheduleHandle`.
<!--SNIPSTART samples-go-schedule {"selectedLines": ["99-102"]}-->
<!--SNIPEND-->

## Trigger

Triggering a Schedule immediately executes an [Action]() defined in the Schedule.
By default, `trigger` is subject to the Overlap Policy.

To trigger a Scheduled Workflow Execution in Go, use `Trigger()` on the `scheduleHandle`.
Set desired changes in `ScheduleTriggerOptions`.

<!--SNIPSTART samples-go-schedule {"selectedLines": ["51-56"]}-->
<!--SNIPEND-->

## Update

Updating a Schedule changes the configuration of existing Schedules.

Use the `Update()` command to modify an existing Schedule.

<!--SNIPSTART samples-go-schedule {"selectedLines": ["59-83"]}-->
<!--SNIPEND-->