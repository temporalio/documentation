---
id: skip-time
title: How to Skip Time
description: The Test Server included in most SDKs is an in-memory implementation of Temporal Server that supports skipping time.
sidebar_label: Skip Time
tags:
  - guide-context
---

Running Workflow code in integration and end-to-end tests often requires the ability to skip time: you need your tests to run in seconds or minutes, but a Workflow might sleep for a day, or have Activity failures with long retry intervals. While testing, you don’t need to test whether the sleep function works—you can trust Temporal functionality to correctly execute. Instead, you want to test the logic that happens after sleeping. You can skip forward a day during testing to see what happens in a timely manner.

:::note

Skipping time is not relevant to unit testing Workflow code, since in that case you’re mocking functions that take time like sleep and Activity calls.

:::

The Test Server included in most SDKs is an in-memory implementation of Temporal Server that supports skipping time. Time is a global property of an instance of the Test Server: if you skip time (either automatically or manually), it applies to all currently running tests. If you need different time behaviors for different tests, they need to be run in series or with separate Test Server instances. For example, you could run all tests with automatic time skipping in parallel, and then all tests with manual time skipping in series, and then all tests without time skipping in parallel.
