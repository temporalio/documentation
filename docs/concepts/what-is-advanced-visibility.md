---
id: what-is-advanced-visibility
title: What is Advanced Visibility?
sidebar_label: Advanced Visibility
description: Advanced Visibility, within the Temporal Platform, is the subsystem and APIs that enable the listing, filtering, and sorting of Workflow Executions through an SQL-like query syntax.
tags:
  - explanation
  - filtered-lists
  - visibility
---

Advanced Visibility, within the Temporal Platform, is the subsystem and APIs that enable the listing, filtering, and sorting of Workflow Executions through a custom SQL-like [List Filter](/concepts/what-is-a-list-filter).

To use Advanced Visibility, your Temporal Cluster must be [integrated with Elasticsearch](/clusters/how-to-integrate-elasticsearch-into-a-temporal-cluster).
We highly recommend operating a Temporal Cluster with Elasticsearch for any use case that spawns more than just a few Workflow Executions.
Elasticsearch takes on the Visibility request load, relieving potential performance issues.
