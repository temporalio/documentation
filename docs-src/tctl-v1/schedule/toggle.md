---
id: toggle
title: tctl schedule toggle
sidebar_label: toggle
description: How to toggle (pause/unpause) a Schedule using tctl.
tags:
  - tctl
  - cli-reference
---

```shell
$ tctl schedule toggle --schedule-id 'your-schedule-id' --pause --reason "paused because the database is down"
$ tctl schedule toggle --schedule-id 'your-schedule-id' --unpause --reason "the database is back up"
```
