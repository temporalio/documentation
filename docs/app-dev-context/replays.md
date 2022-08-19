---
id: replay
title: How to Replay a Workflow Execution
description: Replay recreates the exact state of the Workflow code.
sidebar_label: Replay
tags:
  - guide-context
---

Replay recreates the exact state of the Workflow code. You can replay Workflows from the beginning of their history when resumed.

Replays allow code to resume only if it is compatible from a deterministic point of view.

**To retrieve the Workflow History**
You can retrieve the Workflow History from any of the following options and then pass the object to your SDK of choice.

- Proto History object
- [Temporal Web UI](/web-ui)
  1. Select a Workflow ID.
  2. Click **Download**.
- [tctl](/tctl) commands, for example:
  - [`tctl workflow list --print_json`](../tctl/workflow/list#--print_full)
  - [`tctl workflow list --open`](../tctl/workflow/list#--open)
- Client
