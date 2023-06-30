---
id: what-is-visibility
title: What is Visibility?
sidebar_label: Visibility
description: The term Visibility, within the Temporal Platform, refers to the subsystems and APIs that enable an operator to view Workflow Executions that currently exist within a Cluster.
tags:
  - term
ssdi:
  - For Temporal Server v1.19 and earlier, all supported databases for Visibility provide standard Visibility features, and an Elasticsearch database is required for advanced Visibility features.
  - For Temporal Server v1.20 and later, advanced Visibility features are enabled on all supported SQL databases, in addition to Elasticsearch.
  - In Temporal Server v1.21 and later:
  
      - Standard Visibility is no longer in development, and we recommend migrating to a [database that supports advanced Visibility features](/cluster-deployment-guide#supported-databases).
      - Visibility configuration in Temporal Cluster is updated. For details, see [Visibility store setup](/cluster-deployment-guide#visibility-store).
      - Dual Visibility is enabled.
---

The term [Visibility](/visibility), within the Temporal Platform, refers to the subsystems and APIs that enable an operator to view, filter, and search for Workflow Executions that currently exist within a Cluster.

The [Visibility store](/cluster-deployment-guide#visibility-store) in your Temporal Cluster stores persisted Workflow Execution Event History data and is set up as a part of your [Persistence store](/concepts/what-is-a-temporal-cluster#persistence) to enable listing and filtering details about Workflow Executions that exist on your Temporal Cluster.

- [How to set up a Visibility store](/cluster-deployment-guide#visibility-store)

With Temporal Server v1.21, you can set up [Dual Visibility](/concepts/what-is-dual-visibility) to migrate your Visibility store from one database to another.

<!-- A Visibility store can be configured to provide [atandard Visibility](/visibility#standard-visibility) and [advanced Visibility](/visibility#advanced-visibility) features.

Support for separate standard and advanced Visibility setups will be deprecated from Temporal Server v1.21 onwards. Check [Supported databases](/cluster-deployment-guide#supported-databases) for updates. -->
