---
id: how-to-set-sessionoptions-in-go
title: How to set SessionOptions in Go
sidebar_label: SessionOptions
description: Create an instance of `SessionOptions` and pass it to the `CreateSession()` API call.
tags:
  - developer-guide
---

Create an instance of [`SessionOptions`](https://pkg.go.dev/go.temporal.io/sdk/workflow#SessionOptions) and pass them to the [`CreateSession()`](https://pkg.go.dev/go.temporal.io/sdk/workflow#CreateSession)

| Field                                   | Required | Type            |
| --------------------------------------- | -------- | --------------- |
| [`ExecutionTimeout`](#executiontimeout) | No       | `time.Duration` |
| [`CreationTimeout`](#creationtimeout)   | No       | `time.Duration` |
| [`HeartbeatTimeout`](#heartbeattimeout) | No       | `time.Duration` |

### ExecutionTimeout

Specifies the maximum amount of time the session can run.

- Type: `time.Duration`
- Default:

### CreationTimeout

Specifies how long session creation can take before returning an error.

- Type: `time.Duration`
- Default:

### HeartbeatTimeout

Specifies the heartbeat timeout.

- Type: `time.Duration`
- Default:
