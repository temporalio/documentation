---
id: introduction
title: Introduction to the Temporal Server
sidebar_label: Introduction
---

## Overview

The [Temporal Server](https://github.com/temporalio/temporal) is a micro-service orchestration platform.
It can be thought of as a layer in your technology stack that exists between your compute servers and your executable source code.
It is completely open source and can be run in a variety of cloud or on-premise environments.
A single Server instance can be used for many different use cases simultaneously, or be tied to a single application.

- Read the [system architecture](/docs/content/what-is-the-temporal-server) page to get a view of the server's topology.
- Read the [Server versions and dependencies](/docs/server/versions-and-dependencies) page to see which dependencies are supported with the version of the Server you are using.

## Run the Server

How and where you run the Server depends entirely on your use-case, intended environment, and hosting infrastructure.

Choose from the list below to get started:

- [Quick install for Workflow development](/docs/server/quick-install)
- [Deploy to a live (production) environment](/docs/server/production-deployment)

## Features

- [Namespaces](/docs/server/namespaces): Create basic logical separations within a Temporal cluster, or use Global Namespaces to enable failover across multi-cluster instances.
- [Security](/docs/server/security): Learn how to keep your self-hosted instance secure with encryption and pluggable auth protocols.
- Experimental features:
  - [Archival](/docs/server/archive-data): Want to back up your Workflow event history? You can with a cloud provider of your choice.
  - [Multi-cluster Replication](/docs/server/multi-cluster): Increase availability by asynchronously replicating workflows from active cluster to other passive clusters.
  - [Enhanced Workflow search](/docs/server/workflow-search): Integrating Elasticsearch enables the use of customizable search attributes and complex search queries.
