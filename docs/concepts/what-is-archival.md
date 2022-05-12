---
id: what-is-archival
title: What is Archival?
sidebar_label: Archival
description: Archival is a feature that automatically backs up Event Histories from Temporal Cluster persistence to a custom blob store after the Closed Workflow Execution retention period is reached.
tags:
  - explanation
---

Archival is a feature that automatically backs up [Event Histories](/docs/concepts/what-is-an-event-history) from Temporal Cluster persistence to a custom blob store after the Closed [Workflow Execution](/docs/concepts/what-is-a-workflow-execution) retention period is reached.

The purpose of Archival is to keep Event Histories as long as needed while not overwhelming the persistence store.

You might want to keep Event Histories after the retention period has passed for two reasons:

- Compliance: For legal reasons, Event Histories may need to be stored for a long period of time.
- Debugging: Older Event Histories can be referenced to help with debugging.

Temporal's Archival feature is considered **experimental** and not subject to normal [versioning and support policy](/docs/server/versions-and-dependencies).

Archival is not supported when running Temporal via docker-compose and is disabled by default when installing the system manually and when deploying via [helm charts](https://github.com/temporalio/helm-charts/blob/master/templates/server-configmap.yaml) (but can be enabled in the [config](https://github.com/temporalio/temporal/blob/master/config/development.yaml)).

Archival only supports Event Histories. You may notice some boilerplate infrastructure to support archiving visibility records. Visibility archival is not yet supported and visibility records are deleted after the Workflow retention period.

- [How to set up Archival](/docs/clusters/how-to-set-up-archival)
- [How to create a custom Archiver](/docs/clusters/how-to-create-a-custom-archiver)
