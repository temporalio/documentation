---
id: what-is-the-temporal-platform
title: What is the Temporal Platform?
sidebar_label: Temporal Platform
description: The Temporal Platform consists of a Temporal Cluster and Worker Processes.
tags:
  - explanation
---

The Temporal Platform consists of a [Temporal Cluster](/concepts/what-is-a-temporal-cluster) and [Worker Processes](/concepts/what-is-a-worker-process).
Together these components create a runtime for Workflow Executions.

![The Temporal Platform (runtime)](/diagrams/temporal-platform-simple.svg)

The Temporal Cluster is open source and can be operated by you.
The Temporal Cloud is a set of Clusters operated by us.

Worker Processes are hosted by you and execute your code.
They communicate with a Temporal Cluster via gRPC.
