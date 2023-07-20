---
id: operating-envelope-throughput
title: What kind of throughput can I get with Temporal Cloud
sidebar_label: Throughput
description: Temporal Cloud can provide more than 150,000 Actions per second.
tags:
  - Temporal Cloud
  - Explanation archetype
  - Operations concept
  - Throughput
---

A Namespace has a default quota of 200 [Actions](/cloud/what-is-an-action) per second with spikes up to 400 Actions per second.
However, Temporal Cloud can provide more than 150,000 Actions per second.

If your Action rate exceeds your quota, Temporal Cloud throttles Actions until the rate matches your quota.
Actions like Start or Signal Workflow Execution always receive higher priority than other Actions, even when throttled.

To raise your quota, [create a ticket for Temporal Support](/cloud/support-create-ticket).
