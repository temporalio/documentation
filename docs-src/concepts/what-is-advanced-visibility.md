---
id: what-is-advanced-visibility
title: What is Advanced Visibility?
sidebar_label: Advanced Visibility
description: Advanced Visibility, within the Temporal Platform, is the subsystem and APIs that enable the listing, filtering, and sorting of Workflow Executions through an SQL-like query syntax.
tags:
  - term
  - explanation
  - filtered-lists
  - visibility
---

Advanced Visibility, within the Temporal Platform, is the subsystem and APIs that enable the listing, filtering, and sorting of Workflow Executions through a custom SQL-like [List Filter](/concepts/what-is-a-list-filter).

- With Temporal Cluster version 1.20 and later, Advanced Visibility is available on SQL databases like MySQL (version 8.0.17 and later) and PostgreSQL (version 12 and later), in addition to supporting Elasticsearch.
- For Temporal Server versions 1.19.1 and earlier, you must [integrate with ElasticSearch](/clusters/how-to-integrate-elasticsearch-into-a-temporal-cluster) to use Advanced Visibility.
  Elasticsearch takes on the Visibility request load, relieving potential performance issues.
  We highly recommend operating a Temporal Cluster with Elasticsearch for any use case that spawns more than just a few Workflow Executions.
