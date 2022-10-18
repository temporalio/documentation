---
id: trigger
title: tctl schedule trigger
sidebar_label: trigger
description: How to trigger a Schedule Action using tctl
tags:
  - tctl
---

Starting a Workflow Run immediately with a Schedule, regardless of its configured Spec, is a common use case.

```shell
$ tctl schedule trigger --sid 'your-schedule-id'
```

Note that the action that it takes is subject to the Overlap Policy of the Schedule by default: if the overlap policy is `Skip` and a Workflow is already running, the triggered Action to start the next Workflow Run is skipped!
Likewise, if the overlap policy is `BufferAll`, the triggered run is buffered behind one or more runs.

If you really want it to run right now, you can override the overlap policy for this request:

```shell
$ tctl schedule trigger --sid 'your-schedule-id' --overlap-policy 'AllowAll'
```
