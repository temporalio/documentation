---
id: how-to-set-sessionoptions-in-go
title: How to set SessionOptions in Go
sidebar_label: SessionOptions
description: TODO
tags:
  - developer-guide
---

Options used to specify metadata for a session

| Field | Required | Type |
| ----- | -------- | ---- |
| [`ExecutionTimeout`](#executiontimeout) | No | `time.Duration` |
| [`CreationTimeout`](#creationtimeout) | No | `time.Duration` |
| [`HeartbeatTimeout`](#heartbeattimeout) | No | `time.Duration` |

### ExecutionTimeout

Specifies the maximum amount of time the session can run

- Type: `time.Duration`
- Default:

### CreationTimeout

Specifies how long session creation can take before returning an error

- Type: `time.Duration`
- Default:

### HeartbeatTimeout

Specifies the heartbeat timeout

- Type: `time.Duration`
- Default:
