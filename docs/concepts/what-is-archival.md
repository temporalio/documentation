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
