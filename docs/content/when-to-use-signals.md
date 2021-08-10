---
id: when-to-use-signals
title: When to use Signals?
description: Use Signals when you need to get data INTO a running workflow
tags:
  - explanation
  - when-to
---

**Signals** are a fully asynchronous and durable mechanism for **sending data _into_ a running Workflow** (as opposed to passing data as arguments when starting the Workflow or polling external data in Activities).

- When a Signal is received for a running Workflow, Temporal persists the Signal event and payload in the Workflow history.
  The Workflow can then process the Signal at any time afterwards without the risk of losing the information.
- The Workflow also has the option to pause until it receives a Signal by blocking on a **Signal channel**.
- If you don't know if the Workflow is currently running, you can use `SignalWithStart` and a new Workflow run will start up to receive the Signal if needed.
