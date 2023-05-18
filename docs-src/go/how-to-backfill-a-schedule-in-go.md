---
id: how-to-backfill-a-schedule-in-go
title: How to backfill a Schedule in Go
sidebar_label: Backfill Schedule
description: Backfill a Schedule to execute a Workflow at a later time.
---

Backfilling a [Schedule](/concepts/what-is-a-schedule) executes [Workflow Tasks](/concepts/what-is-a-workflow-task) ahead of the Schedule's specified time range.
This is useful for executing a missed or delayed [Action](/concepts/what-is-a-schedule#action), or for testing the [Workflow](/concepts/what-is-a-workflow) ahead of time.

To backfill a Schedule in Go, use `Backfill()` on `ScheduleHandle`.
Specify the start and end times to execute the Workflow, along with the [Overlap Policy](/docs-src/concepts/what-is-a-schedule#overlap-policy).

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-go/blob/add-go-schedule-sample/schedule/backfill/main_dacx.go">View source code</a>

```go
func main() {
// ...
		Backfill: []client.ScheduleBackfill{
			{
				Start: now.Add(-4 * time.Minute),
				End: now.Add(-2 * time.Minute),
				Overlap: enums.SCHEDULE_OVERLAP_POLICY_ALLOW_ALL,
			},
			{
				Start: now.Add(-2 * time.Minute),
				End: now,
				Overlap: enums.SCHEDULE_OVERLAP_POLICY_ALLOW_ALL,
			},
		},
	})
		
// ...
```
