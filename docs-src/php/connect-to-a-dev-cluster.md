---
id: connect-to-a-dev-cluster
title: How to connect a Temporal Client to a Temporal Cluster
description: When connecting a Temporal Client to a Temporal Cluster, you must provide the address and port number of the Temporal Cluster.
sidebar_label: Connect to a dev Cluster
tags:
  - guide-context
---

A [Temporal Client](/concepts/what-is-a-temporal-client) enables you to communicate with the [Temporal Cluster](/concepts/what-is-a-temporal-cluster).
Communication with a Temporal Cluster includes, but isn't limited to, the following:

- Starting Workflow Executions.
- Sending Signals to Workflow Executions.
- Sending Queries to Workflow Executions.
- Getting the results of a Workflow Execution.
- Providing an Activity Task Token.

:::caution

A Temporal Client cannot be initialized and used inside a Workflow.
However, it is acceptable and common to use a Temporal Client inside an Activity to communicate with a Temporal Cluster.

:::

When you are running a Cluster locally (such as the [Temporal CLI](https://docs.temporal.io/cli/server#start-dev)), the number of connection options you must provide is minimal.
Many SDKs default to the local host or IP address and port that Temporalite and [Docker Compose](/cluster-deployment-guide#docker--docker-compose) serve (`127.0.0.1:7233`).
