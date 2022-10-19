---
id: toggle
title: tctl schedule toggle
sidebar_label: toggle
description: How to toggle (pause/unpause) a Schedule using tctl.
tags:
  - tctl
---

```shell
$ tctl schedule toggle --sid 'your-schedule-id' --pause --reason "paused because the database is down"
$ tctl schedule toggle --sid 'your-schedule-id' --unpause --reason "the database is back up"
```
