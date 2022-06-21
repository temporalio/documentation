---
id: create
title: tctl schedule create
sidebar_label: create
description: How to create a Schedule using tctl.
tags:
  - tctl
---

With tctl, create a Schedule like this:

```shell
$ tctl config set version next   # ensure you're using the new tctl
$ tctl schedule create \
    --sid 'my-schedule-id' \
    --interval '5h/15m' \
    --cal '{"dayOfWeek":"Fri","hour":"11","minute":"3"}' \
    --overlap-policy 'BufferAll' \
    --wid 'my-workflow-id' \
    --tq 'my-task-queue' \
    --type 'MyWorkflowType'
```

This Schedule will take action every 5 hours at 15 minutes past the hour, and also at 11:03 on Fridays.
It will start a Workflow `MyWorkflowType` on task
queue `my-task-queue`, giving it an Id like
`my-workflow-id-2022-06-17T11:03:00Z`. Workflows will not be run in parallel,
but will be buffered to run sequentially if they would otherwise overlap.

See `tctl schedule create --help` for the full set of available options.
