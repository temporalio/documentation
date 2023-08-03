---
id: default-limits-temporal-cloud
title: Default limits for Temporal Cloud
sidebar_label: Default limits
description: Temporal Cloud sets default limits for the following aspects; Account level, Namespace level, List Filters.
tags:
  - error
  - warn
  - limits
---

Temporal Cloud sets default limits for [Account level](#account-level), [Namespace level](#namespace-level), and [List Filters](#list-filters).

#### Account level

The following limits are applied to the entire account:

- Users: 100
- Namespaces: 10
- Prometheus endpoint Retention Period: 1 month

#### Namespace level

The following limits are applied to each Namespace:

- Actions per second: 200 (with spikes to 400)
- Certificates: 32-KB payload or 16 certificates, whichever is smaller
- Concurrent Task pollers: 2,000 (configurable; maximum of 100,000)
- Custom Search Attributes (maximum per type)
  - bool: 20
  - double: 20
  - datetime: 20
  - int: 20
  - keyword: 20
  - text: 5
- Retention Period: 30 days (configurable; range of 1—90 days)
- Number of Signals received per Workflow Execution: 10,000

#### List Filters


The **ORDER BY** operator isn't supported in List Filters in Temporal Cloud.
This means that you can't apply custom ordering of Workflows with Cloud Visibility features.
Lists of Workflows are still ordered by a default ordering rule.
Be aware that this rule might change.

#### Increasing limits

Some of the default Temporal Cloud limits can be increased by [submitting a support ticket](/cloud/introduction/support#support-ticket).

The default values are intended to guard against unintentional resource usage.
