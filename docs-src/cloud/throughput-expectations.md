---
id: throughput-expectations
title: Throughput expectations
sidebar_label: Throughput
description: Temporal Cloud can provide more than 150,000 Actions per second.
tags:
  - temporal cloud
  - throughput
---

**What kind of throughput can I get with Temporal Cloud?**

Each Namespace has a rate limit, which is measured in [Actions](/cloud/what-is-an-action) per second (APS).
A Namespace's default limit is set at 400 APS and automatically adjusts based on recent usage (over the prior 7 days).
Your throughput limit will never fall below this default value.

When your Action rate exceeds your quota, Temporal Cloud throttles Actions until the rate matches your quota.
Throttling means limiting the rate at which Actions are performed to prevent the Namespace from exceeding its APS limit.
Even when throttled, Actions like Start or Signal Workflow Execution always receive higher priority than other Actions.

If your usage grows slowly, your throughput limit grows with your usage.
At times, you may hit a maximum throughput threshold and need to switch to a higher consumption tier.
Learn more about our tiers by visiting our [information page](/cloud/what-is-an-action) or [reach out to our team](https://pages.temporal.io/contact-us) to help size your number of Actions.
Temporal Cloud can provide more than 150,000 Actions per second at its highest tier.
