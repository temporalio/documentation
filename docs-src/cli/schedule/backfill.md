---
id: backfill
title: temporal schedule backfill
sidebar_label: backfill
description: Backfills a past time range of actions.
tags:
  - cli reference
---

The `temporal schedule backfill` command executes Actions ahead of their specified time range.
Backfilling can be used to fill in [Workflow Runs](/concepts/what-is-a-run-id) from a time period when the Schedule was paused, or from before the Schedule was created.

Schedule backfills require a valid Schedule ID, along with the time in which to run the Schedule and a change to the overlap policy.

```
temporal schedule backfill --schedule-id 'your-schedule-id' \
--overlap-policy 'BufferAll' 				\
--start-time '2022-05-0101T00:00:00Z'		\
--end-time '2022-05-31T23:59:59Z'
```

Use the options provided below to change this command's behavior.

- [--end-time](/cli/cmd-options/end-time)

- [--fields](/cli/cmd-options/fields)

- [--limit](/cli/cmd-options/limit)

- [--no-pager](/cli/cmd-options/no-pager)

- [--output](/cli/cmd-options/output)

- [--overlap-policy](/cli/cmd-options/overlap-policy)

- [--pager](/cli/cmd-options/pager)

- [--schedule-id](/cli/cmd-options/schedule-id)

- [--start-time](/cli/cmd-options/start-time)

- [--time-format](/cli/cmd-options/time-format)
