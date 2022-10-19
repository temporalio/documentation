---
id: clusters
title: tctl clusters modifier
description: definition for the --clusters modifier
sidebar_label: --clusters
tags:
  - tctl
---

Specify a list of [Temporal Clusters](/concepts/what-is-a-temporal-cluster/) when registering a [Namespace](/concepts/what-is-a-namespace).

The list contains the names of Clusters (separated by spaces) to which the Namespace can fail over.
Make sure to include to the currently active Cluster.
This is a read-only setting and cannot be changed.

This modifier is valid only when the `--global-namespace` modifier is set to true.

Alias `--cl`
