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
$ tctl schedule trigger --sid 'my-schedule-id'
```

Note that the action that it takes is subject to the Overlap Policy of the Schedule by default: if the overlap policy is `Skip` and there already is a Workflow running, the triggered Action to start the next Workflow Run will be skipped! 
Likewise, if the overlap policy is `BufferAll`, the triggered run will be buffered behind one or more runs.
If you really want it to run right now, you can override the overlap policy for this request:

```shell
$ tctl schedule trigger --sid 'my-schedule-id' --overlap-policy 'AllowAll'
```
