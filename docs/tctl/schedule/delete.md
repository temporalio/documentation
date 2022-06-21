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
If you would also like to terminate Workflows started by the Schedule, you can identify them using the Search Attributes added to them and do a batch terminate or manually terminate them all.

```shell
$ tctl schedule delete --sid 'my-schedule-id'
```
