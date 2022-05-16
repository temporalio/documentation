---
id: list_gossip
title: tctl admin membership list_gossip
description: describing ringpop membership items
tags:
  - operation-guide
  - tctl
---

The `tctl admin membership list_gossip` command lists the ringpop membership items present on the targeted membership.

The following modifier changes the behavior of the command:

`--role value` — filters the results by membership role

Default: all
Values: all, frontend, history, matching, worker
