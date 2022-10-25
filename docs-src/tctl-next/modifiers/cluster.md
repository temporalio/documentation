---
id: cluster
title: tctl cluster modifier
description: definition for the --cluster modifier
sidebar_label: --cluster
tags:
  - tctl
---

Specify a list of [Temporal Clusters](/concepts/what-is-a-temporal-cluster/) when registering a [Namespace](/namespaces#).

The flag contains a single name of a Cluster to which the Namespace can fail over. For multiple Clusters pass each in a separate `--cluster` option.
Make sure to include to the currently active Cluster.
This is a read-only setting and cannot be changed.

This modifier is valid only when the `--global` modifier is set to true.
