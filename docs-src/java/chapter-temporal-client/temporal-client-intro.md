---
id: temporal-client-intro
title: Temporal Client
sidebar_label: Client
description: Temporal Client Cloud Introduction.
tags:
 - java
 - client
 - temporal client
 - workers
 - applications
---

Every Temporal application, whether it is a worker, a Webpage backend, or a calling application deployed on a desktop or mobile device, starts with a Client.
Provided by our SDKs, Clients are Temporal features that communicate and interact with a Temporal Cluster.

A Client is more than just a language-specific wrapper around a set of server APIs.
Each client encapsulates complex mechanisms that interact with the Temporal server.
Clients enables the Temporal Server to keep Workflow Execution state, caching, and resilience fully orchestrated.
This makes simplifies your application code and lets you focus on your business logic.

Temporal Clients are capable and flexible.
At their most basic level, Clients can initiate, signal, schedule, and query Workflow Executions, and retrieve Execution results.
They can also:

- Capture stack traces from any failed Workflow execution to support debugging.
- Handle the non-trivial process of reconstructing Client state after a failure occurs.
- And more...
