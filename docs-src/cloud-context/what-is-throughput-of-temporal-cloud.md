---
id: what-is-throughput-of-temporal-cloud
title: What is the throughput of Temporal Cloud?
sidebar_label: Throughput
description: Temporal Cloud throughput
---

A namespace has a default quota of 200 action/s.
To raise the quota, open a [support ticket](/cloud/how-to-create-a-ticket-for-temporal-support).
Temporal Cloud can handle more than 150,000 actions/s.

Actions can be throttled when they exceed your quota.
Actions like Start or Signal Workflow Execution always receive higher priority than other Actions, even when throttled.
