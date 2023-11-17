---
id: what-is-the-temporal-platform
title: What is the Temporal Platform?
sidebar_label: Temporal Platform
description: The Temporal Platform consists of a Temporal Cluster and Worker Processes.
tags:
  - term
  - explanation
---

The Temporal Platform consists of a [Temporal Cluster](/concepts/what-is-a-temporal-cluster) and [Worker Processes](/concepts/what-is-a-worker-process).
Together these components create a runtime for Workflow Executions.

The Temporal Platform consists of a supervising software typically called a [Temporal Cluster](/concepts/what-is-a-temporal-cluster) and application code bundled as Worker Processes.
Together these components create a runtime for your application.

![The Temporal Platform](/diagrams/temporal-platform-simple.svg)

A Temporal Cluster consists of the Temporal Server and a database.

Our software as a server (SaaS) offering, Temporal Cloud, offers an alternative to hosting a Temporal Cluster yourself.

Worker Processes are hosted and operated by you and execute your code. Workers run using one of our SDKs.

![Basic component topology of the Temporal Platform](/diagrams/temporal-platform-component-topology.svg)
