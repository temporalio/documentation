---
id: operating-envelope-throughput
title: Temporal Cloud - Throughput
sidebar_label: Throughput
description: Temporal Cloud can provide more than 150,000 Actions per second.
tags:
  - guide-context
---

A Namespace has a default quota of 200 [Actions](/concepts/what-is-an-action) per second with spikes up to 400 Actions per second.
However, Temporal Cloud can provide more than 150,000 Actions per second.

If your Action rate exceeds your quota, Temporal Cloud throttles Actions until the rate matches your quota.
Actions like Start or Signal Workflow Execution always receive higher priority than other Actions, even when throttled.

To raise your quota, [create a ticket for Temporal Support](/cloud/how-to-create-a-ticket-for-temporal-support).
