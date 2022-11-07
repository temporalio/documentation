---
id: what-is-archival
title: What is Archival?
sidebar_label: Archival
description: Archival is a feature that automatically backs up Event Histories from Temporal Cluster persistence to a custom blob store after the Closed Workflow Execution retention period is reached.
tags:
  - term
  - explanation
---

Archival is a feature that automatically backs up [Event Histories](/concepts/what-is-an-event-history) and Visibility records from Temporal Cluster persistence to a custom blob store.

- [How to create a custom Archiver](/clusters/how-to-create-a-custom-archiver)
- [How to set up Archival](/clusters/how-to-set-up-archival)

Workflow Execution Event Histories are backed up after the [Retention Period](/concepts/what-is-a-namespace/#retention-period) is reached.
Visibility records are backed up immediately after a Workflow Execution reaches a Closed status.

Archival enables Workflow Execution data to persist as long as needed, while not overwhelming the Cluster's persistence store.

This feature is helpful for compliance and debugging.

Temporal's Archival feature is considered **experimental** and not subject to normal [versioning and support policy](/clusters).

Archival is not supported when running Temporal through Docker and is disabled by default when installing the system manually and when deploying through [helm charts](https://github.com/temporalio/helm-charts/blob/master/templates/server-configmap.yaml) (but can be enabled in the [config](https://github.com/temporalio/temporal/blob/master/config/development.yaml)).
