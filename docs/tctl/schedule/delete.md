---
id: delete
title: tctl schedule delete
sidebar_label: delete
description: How to delete a Schedule using tctl
tags:
  - tctl
---

A Schedule may be deleted.

Deleting a Schedule **does not** affect any Workflows started by the Schedule.
Workflow Executions started by Schedules may be Cancelled or Terminated using the same methods as any others.
However, Workflow Executions started by a Schedule can be identified by the Search Attributes added to them and can be targeted by a [batch](/tctl/batch/) command for Termination.

```shell
$ tctl schedule delete --sid 'my-schedule-id'
```
