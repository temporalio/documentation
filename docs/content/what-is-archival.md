---
id: what-is-archival
title: What is Archival?
description: todo
---

A feature that automatically moves [Event Histories](#event-history) from normal persistence to a blob store after the [Workflow](#workflow) retention period.

- The purpose of Archival is to keep [Event Histories](#event-history) as long as needed while not overwhelming the persistence store.
- You might want to keep [Event Histories](#event-history) after the retention period has passed for two reasons:
  1. Compliance: For legal reasons, [Event Histories](#event-history) may need to be stored for a long period of time.
  2. Debugging: Older [Event Histories](#event-history) can be referenced to help with debugging.
