---
id: how-to-list-a-schedule-in-go
title: How to list a Schedule in Go
sidebar_label: List Schedules
description: To list all Schedules in Go, use ScheduleClient.List().
tags:
  - go sdk
  - how-to-doc-type
  - developer-guide-doc-type
  - schedule
  - schedule list
---

The `List` action returns all available Schedules and their respective Schedule IDs.

To return information on all Schedules, use `ScheduleClient.List()`.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-go/blob/main/schedule/list/main_dacx.go">View source code</a>

```go
func main() {
// ...
	listView, _ := temporalClient.ScheduleClient().List(ctx, client.ScheduleListOptions{
		PageSize: 1,
	})

	for listView.HasNext() {
		log.Println(listView.Next())
	}
// ...
```
