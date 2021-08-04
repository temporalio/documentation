---
id: when-to-use-signals
title: When to use Signals?
description: Use Signals when you need to get data IN to a running workflow
tags:
  - explanation
  - when-to
---

**Signals** are a fully asynchronous and durable mechanism for **sending data _in_ to a running Workflow** (as opposed to at the start of the workflow or by polling external data via activities).

- When a signal is received for a running Workflow, Temporal persists the event and the payload in the Workflow history.
  The Workflow can then process the signal at any time afterwards without the risk of losing the information.
- The Workflow also has the option to pause until it receives a signal, by blocking on a **signal channel**.
- If you don't know if the workflow is currently running, you can use `SignalWithStart` and a new run will start up to receive the signal if needed.
