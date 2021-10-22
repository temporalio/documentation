---
id: what-is-advanced-visibility
title: What is Advanced Visibility?
description: Advanced Visibility, within the Temporal Platform, is the subsystem and APIs that enable the listing, filtering, and sorting of Workflow Executions via an SQL-like query syntax.
tags:
  - explanation
  - filtered-lists
---

<!-- prettier-ignore -->
import * as WhatIsAListFilter from './what-is-a-list-filter.md'

<!--TODO
import * as HowToIntegrateElasticsearch from './how-to-integrate-elasticsearch-into-a-temporal-cluster.md'
-->

Advanced Visibility, within the Temporal Platform, is the subsystem and APIs that enable the listing, filtering, and sorting of Workflow Executions via a custom SQL-like <preview page={WhatIsAListFilter}>List Filter</preview>.

<!--TODO
<preview page={HowToIntegrateElasticsearch}>integrated with Elasticsearch</preview>
-->

To use Advanced Visibility, your Temporal Cluster must be integrated with Elasticsearch.
We highly recommend operating a Temporal Cluster with Elasticsearch for any use case that spawns more than just a few Workflow Executions.
Elasticsearch takes on the Visibility request load, relieving potential performance issues.
