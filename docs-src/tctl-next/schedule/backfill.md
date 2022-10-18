---
id: backfill
title: tctl schedule backfill
sidebar_label: backfill
description: How to backfill a Schedule using tctl.
tags:
  - tctl
---

Backfilling a Schedule means having it do now what it would have done over a specified time range (generally in the past, although it won't prevent you from giving a time range in the future).
You might use this to fill in runs from a time period when the Schedule was paused due to an external condition that's now resolved, or a period before the Schedule was created.

```shell
tctl schedule backfill --sid 'your-schedule-id' \
  --overlap-policy 'BufferAll'                \
  --start-time '2022-05-01T00:00:00Z'         \
  --end-time   '2022-05-31T23:59:59Z'
```

Note that, similar to [tctl schedule trigger](/tctl-next/schedule#trigger) immediately, you probably want to override the Overlap Policy.
Specifying `AllowAll` runs all the backfilled Workflows at once; `BufferAll` runs them sequentially.
The other policies don't make much sense in this context.
