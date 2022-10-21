---
id: list_db
title: tctl admin membership list_db
sidebar_label: list_db
description: How to describe Cluster membership items
tags:
  - operation-guide
  - tctl
---

The `tctl admin membership list_db` command lists the Cluster items in a targeted membership.

The following modifiers change the behavior of the command.

#### --heartbeated_within

Filters the list by last Heartbeat time.

<!-- todo: add supported format list-->

#### --role

Filters the results by membership role.

Default: all
Values: all, frontend, history, matching, worker
