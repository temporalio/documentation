---
id: activity-retry-simulator
title: How to visualize an Activity Retry Policy with timeouts
sidebar_label: Activity retry simulator
description: Use this tool to visualize total Activity Execution times and experiment with various Activity timeouts and Retry Policies.
tags:
  - guide-context
---

Use this tool to visualize total Activity Execution times and experiment with different Activity timeouts and Retry Policies.

The simulator is based on a common Activity use-case, which is to call a third party HTTP API and return the results.
See the example code snippets below.

Use the Activity Retries settings to configure how long the API request takes to succeed or fail.
There is an option to generate scenarios.
The _Task Time in Queue_ simulates the time the Activity Task might be waiting in the Task Queue.

Use the Activity Timeouts and Retry Policy settings to see how they impact the success or failure of an Activity Execution.

import RetrySimulator from '/docs/components/RetrySimulator/RetrySimulator';

<RetrySimulator />
