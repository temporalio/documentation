---
id: what-is-temporal-cloud
title: Overview - Temporal Cloud
description: Temporal Cloud is a managed, hosted Temporal environment that provides a platform for Temporal Applications.
sidebar_label: Temporal Cloud
tags:
  - term
  - explanation
---

**What is Temporal Cloud?**

[Temporal Cloud](https://temporal.io/cloud) serves as a software-as-a-service (SaaS) infrastructure platform, specifically designed to manage the durability of your Temporal Applications.
**Importantly, it does not execute your code directly.** Users of Temporal Cloud must have their own environment to run Temporal Applications.
Essentially a [Temporal Application](/dev-guide/temporal-sdk) refers to any application developed using a Temporal SDK.

### High level system topology

There are two major parts of the Temporal Platform that work together to create the fully functioning system.

1. Temporal SDK: The Temporal software development kit (SDK) is available in various languages and can be integrated as a dependency into your new or existing application.
   It offers developers a comprehensive development framework and APIs, facilitating the creation and management of applications.
2. Temporal Cloud: Operating independently from the execution environment, Temporal Cloud oversees the execution process by preserving the source of truth for your Workflow Execution Event Histories.
   This independent supervision ensures the durable execution of your distributed applications and services.

![High-level system topology](/diagrams/high-level-system-topology.svg)

Temporal Cloud is based off of the open source [Temporal Server](/concepts/what-is-the-temporal-server) software and offers a comparable set of features but with out the overhead of setting up and deploying a production level Temporal Cluster (Temporal Server + all of the auxillary services it depends on).

Temporal Cloud is offered in units of isolation known as [Namespaces](/namespaces).
You can provision and use one or more Cloud Namespaces.
A typical use case is to use separate Namespaces as development, testing, integration, staging, and production environments for an application.
