---
id: server-introduction
title: Introduction to the Temporal server
sidebar_label: Introduction
---

## Overview

The [Temporal server](https://github.com/temporalio/temporal) is a micro-service orchestration platform.
It can be thought of as a layer in your technology stack that exists between your compute servers and your executable source code.
It is completely open source and can be run in a variety of cloud or on-premise environments.

## Design

The "Temporal Server" is actually a cluster of different services.
Read the [system architecture](/docs/system-architecture) page to get a view of the server's topology.

## Install for local development environment

The fastest way to start building Workflow applications and test out the system is to follow the [quick install guide](/docs/server-quick-install), which will get the Temporal server up and running on your local machine.

If you want to see how Temporal runs on a Kubernetes cluster, the fastest way is to use this [Helm chart](https://github.com/temporalio/helm-charts).

## Install for live environment

To run Temporal in your own cloud or on-premise live environment, [include the Temporal server package](/docs/server-options) and run it as a Go application.
If you want to use a hosted solution, checkout out [Temporal Cloud](/docs/cloud-introduction).

## Security

Keep your instance secure with [encryption and auth protocols](/docs/server-security).

## Dependencies

Different versions of Temporal support different [dependencies](server-versions-and-dependencies).

## Optional features

Temporal supports some optional features such as Workflow search and archiving data.

### Workflow search

The Temporal server supports Workflow search with filters, by default, without the need for any additional dependencies.
However, Temporal's default search capabilities are limited in comparison to instances that are integrated with ElasticSearch.
Integrating ElasticSearch enables the use of customizable search attributes and complex search queries.
Read the [Workflow search guide](/docs/server-workflow-search) for details.

### Archiving data

Want to back up your Workflow event history? You can with a cloud provider of your choice. Read our [guide to archiving data](/docs/server-archive-data) for details.
