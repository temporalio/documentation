---
id: skip-time
title: How to skip time
description: The test server included in most SDKs is an in-memory implementation of Temporal Server that supports skipping time.
sidebar_label: Skip time
tags:
  - guide-context
---

Some long-running Workflows can persist for months or even years.
Implementing the test framework allows your Workflow code to skip time and complete your tests in seconds rather than the Workflow's specified amount.

For example, if you have a Workflow sleep for a day, or have an Activity failure with a long retry interval, you don't need to wait the entire length of the sleep period to test whether the sleep function works.
Instead, test the logic that happens after the sleep by skipping forward in time and complete your tests in a timely manner.

:::note

Skipping time is not relevant to unit testing Workflow code, because in that case you’re mocking functions that take time, like sleep and Activity calls.

:::

The test framework included in most SDKs is an in-memory implementation of Temporal Server that supports skipping time.
Time is a global property of an instance of `TestWorkflowEnvironment`: skipping time (either automatically or manually) applies to all currently running tests.
If you need different time behaviors for different tests, run your tests in a series or with separate instances of the test server.
For example, you could run all tests with automatic time skipping in parallel, and then all tests with manual time skipping in series, and then all tests without time skipping in parallel.
