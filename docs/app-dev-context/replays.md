---
id: replays
title: How to Replay a Workflow Execution
description: Replay recreates the exact state of a Workflow Execution.
sidebar_label: Replay
tags:
  - guide-context
---

Replay recreates the exact state of a Workflow Execution.
You can replay a Workflow from the beginning of its history when resumed.

Replay allows code to resume only if it is compatible from a deterministic point of view.

To retrieve the Workflow History, use any of the following options and then pass the object to your SDK of choice.

- Proto History object
- [Temporal Web UI](/web-ui)
  1. Select a Workflow ID.
  2. Click **Download**.
- [tctl](/tctl) commands; for example:
  - [`tctl workflow list --print_json`](../tctl/workflow/list#--print_full)
  - [`tctl workflow list --open`](../tctl/workflow/list#--open)
- Client
