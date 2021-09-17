---
id: what-is-archival
title: What is Archival?
description: Archival is a feature that automatically backs up Event Histories from Temporal Cluster persistence to a custom blob store after the Closed Workflow Execution retention period is reached.
tags:
  - explanation
---

Archival is a feature that automatically backs up [Event Histories](/docs/content/what-is-an-event-history) from Temporal Cluster persistence to a custom blob store after the [Workflow Execution](/docs/content/what-is-a-workflow-execution) retention period is reached.

The purpose of Archival is to keep [Event Histories](#event-history) as long as needed while not overwhelming the persistence store.

You might want to keep [Event Histories](#event-history) after the retention period has passed for two reasons:

1. Compliance: For legal reasons, [Event Histories](#event-history) may need to be stored for a long period of time.
2. Debugging: Older [Event Histories](#event-history) can be referenced to help with debugging.
