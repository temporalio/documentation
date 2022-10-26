---
id: query
title: tctl query modifier
description: definition for the --query modifier
sidebar_label: --query
tags:
  - tctl
---

_Required modifier_

The `--query` flag is supported only when [Advanced Visibility](/concepts/what-is-advanced-visibility) is configured with the Cluster.

Specify an SQL-like query of [Search Attributes](/concepts/what-is-a-search-attribute).

Using the `--query` option causes tctl to ignore all other filter options, including `open`, `earliest-time`, `latest-time`, `workflow-id`, and `workflow-type`.
