---
id: what-is-an-event
title: What is an Event?
description: todo
---

For each [Workflow](#workflow), Temporal tracks two types of Events:

1. [Command](#command) Events.
2. Everything else.

- Command Events are events that correspond to [Commands](#command) produced by the [Workflow Worker](#worker).
- All other events represent various external occurrences that the [Workflow] is expected to react to, such as an [Activity](#activity) completion, a timer firing, or a cancellation request.
- All Events are recorded in the [Event History](#event-history).
s
