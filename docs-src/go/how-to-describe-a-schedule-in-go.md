---
id: how-to-describe-a-schedule-in-go
title: How to describe a Schedule in Go
sidebar_label: Describe Schedule
description: To describe a Schedule in Go, use Describe() on the ScheduleHandle.
tags:
  - go-sdk
---

`Describe` retrieves information about the current Schedule configuration.
This can include details about the Schedule Spec (such as Intervals), CronExpressions, and Schedule State.

To describe a Schedule, use `Describe()` on the ScheduleHandle.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-go/blob/main/schedule/describe/main_dacx.go">View source code</a>

```go
func main() {
// ...
	scheduleHandle.Describe(ctx)
// ...
```
