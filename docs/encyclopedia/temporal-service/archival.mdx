---
id: archival
title: Archival
sidebar_label: Archival
description: Archival is a feature that automatically backs up Event Histories and Visibility records from Temporal Service persistence to a custom blob store.
slug: /temporal-service/archival
toc_max_heading_level: 4
keywords:
  - archival
  - event-history
tags:
  - Concepts
  - Temporal Service
---

This page discusses [Archival](#archival).

## What is Archival? {#archival}

Use Archival to copy closed Workflow Execution [Event Histories](/workflow-execution/event#event-history) and Visibility records from Temporal Service persistence to blob storage.

- [How to create a custom Archiver](/self-hosted-guide/archival#custom-archiver)
- [How to set up Archival](/self-hosted-guide/archival#set-up-archival)

When a Workflow Execution closes, Temporal schedules close-processing tasks for both Visibility records and Event History archival.
Archival then runs asynchronously after a randomized delay.
By default, that delay is up to 5 minutes (`history.archivalProcessorArchiveDelay`), capped by the Namespace [Retention Period](/temporal-service/temporal-server#retention-period).

The closed execution still stays in Temporal persistence until retention cleanup runs.
For some time, the same closed execution can exist in both persistence and archival storage.
Archival enables Workflow Execution data to persist beyond retention without overwhelming the Temporal Service persistence store.

This feature is helpful for compliance and debugging.

Temporal's Archival feature is considered **experimental** and not subject to normal [versioning and support policy](/temporal-service/temporal-server#versions-and-support).

Archival is not supported when running Temporal through Docker.
It's disabled by default when installing the system manually and when deploying through [helm charts](https://github.com/temporalio/helm-charts/blob/main/charts/temporal/templates/server-configmap.yaml).
It can be enabled in the [config](https://github.com/temporalio/temporal/blob/main/config/development.yaml).
