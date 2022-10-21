---
id: get_shardid
title: tctl admin history_host get_shardid
sidebar_label: get_shardid
description: Providing the shardId on command
tags:
  - tctl
---

The `tctl admin history_host get_shardid` command gets the `shardId` for a given `namespaceId` and `workflowId`.

Alias: `gsh`

The following modifiers change the behavior of this command.

#### --namespace_id

The `namespaceId` of the history host where we're getting the `shardId`.

#### --workflow_id

Aliases: `--wid value`, `-w value`

The WorkflowId of the history host where we're getting the shardId.

#### --number_of_shards

The total amount of shards for the Temporal Cluster.

Default: 0
