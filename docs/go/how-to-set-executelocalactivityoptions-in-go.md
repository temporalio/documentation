---
id: how-to-set-executelocalactivityoptions-in-go
title: How to set ExecuteLocalActivityOptions in Go
sidebar_label: ExecuteLocalActivityOptions
description: TODO
tags:
  - go
  - developer-guide
---

- Used to set local activity specific parameters that will be stored inside of a context

| Option                 | Description                                                         | Type          |
| ---------------------- | ------------------------------------------------------------------- | ------------- |
| ScheduleToCloseTimeout | Set the end to end timeout for the local activity including retries | time.Duration |
| StartToCloseTimeout    | Set timeout for a single execution of the local activity            | time.Duration |
| RetryPolicy            | Set how to retry activity if error happens                          | time.Duration |
