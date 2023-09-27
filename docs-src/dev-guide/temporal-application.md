---
id: temporal-application
title: What is a Temporal Application?
sidebar_label: Temporal Application
description: A Temporal Application is a set of Workflow Executions.
tags:
  - explanation
  - temporal application
---

A Temporal Application is the code you write, comprised of [Workflow Definitions](/concepts/what-is-a-workflow-definition), [Activity Definitions](/concepts/what-is-a-workflow-definition), code used to configure [Temporal Clients](/dev-guide/temporal-application#temporal-client), and code used to configure and start [Workers](/concepts/what-is-a-worker).
Developers create Temporal Applications using an [official Temporal SDK](/dev-guide/official-sdks).

Consider that the Workflow Definition code can be executed repeatedly.
The Temporal Platform can concurrently support millions to billions of Workflow Executions, each of which representing an invoked Workflow Definition.

Additionally, Temporal Workflow Execution is both resumable and recoverable, and it can react to external events.

- Resumable: The ability of a process to resume execution after suspending on an _awaitable_.
- Recoverable: The ability of a process to resume execution after suspending due to a _failure_.
- Reactive: The ability of a process to respond to external events.

Hence, a Temporal Application can run for seconds or years in the presence of arbitrary load and failures.
