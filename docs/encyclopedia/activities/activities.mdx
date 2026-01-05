---
id: activities
title: What is a Temporal Activity?
sidebar_label: Activities
description:
  Understand Temporal Activities, including  Activity Definitions, Types, Executions, idempotency, cancellations, and
  Local Activities.
slug: /activities
toc_max_heading_level: 4
keywords:
  - explanation
  - term
  - timeouts
tags:
  - Concepts
  - Activities
  - Durable Execution
---

This guide provides a comprehensive overview of Temporal Activities including
[Activity Definition](/activity-definition), [Activity Type](/activity-definition#activity-type),
[Activity Execution](/activity-execution), and [Local Activity](/local-activity).

An Activity is a normal function or method that executes a single, well-defined action (either short or long running),
such as calling another service, transcoding a media file, or sending an email message. Activity code can be
non-deterministic. We recommend that it be [idempotent](/activity-definition#idempotency).

Activities are the most common Temporal primitive and encompass small units of work such as:

- Single write operations, like updating user information or submitting a credit card payment
- Batches of similar writes, like creating multiple orders or sending multiple messages
- One or more read operations followed by a write operation, like checking an product status and user address before updating an order status
- A read that should be memoized, like an LLM call, a large download, or a slow-polling read

Larger pieces of functionality should be broken up into multiple activities. This makes it easier to do failure recovery, have short timeouts, and be idempotent.

Workflow code orchestrates the execution of Activities, persisting the results. If an Activity Function Execution fails,
any future execution starts from initial state (except
[Heartbeats](/encyclopedia/detecting-activity-failures#activity-heartbeat)).

Activity Functions are executed by Worker Processes. When the Activity Function returns, the Worker sends the results
back to the Temporal Service as part of the [ActivityTaskCompleted](/references/events#activitytaskcompleted) Event. The
Event is added to the Workflow Execution's Event History. For other Activity-related Events, see
[Activity Events](/workflow-execution/event#activity-events).
