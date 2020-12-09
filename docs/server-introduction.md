---
id: server-introduction
title: Introduction to the Temporal server
sidebar_label: Introduction
---

## Overview

The [Temporal server](https://github.com/temporalio/temporal) is a micro-service orchestration platform. It can be thought of as a layer in your technology stack that exists between your compute servers and your executable source code. It is completely open source and can be run in a variety of cloud or on-premise environments.

The Temporal server tracks the state of Workflow functions and automatically handles timeouts and retries for units of code. This enables developers to focus on writing business logic instead of application reliability infrastructure.

## Install for local development environment

The fastest way to start building Workflow applications and test out the system is to follow the [quick install guide](/docs/server-quick-install), which will get the Temporal server up and running on your local machine.

If you want to see how Temporal runs on a Kubernetes cluster, the fastest way is to use this [Helm chart](https://github.com/temporalio/helm-charts).

## Install for a live environment

To run Temporal in a cloud or on-premise live environment, [include the Temporal server package](/docs/server-options) and run it as a Go application.

## Features and dependencies

Depending on how you install Temporal, and what you features you wish to use, there are some options available when it comes to customizing Temporal's features and [dependencies](server-versions-and-dependencies).

### Security

Want to make sure your instance of Temporal is secure? There are a few options available.

1. TLS protocols can be configured to work for network communications for both internode and SDK client traffic.
2. SDK API calls can require authentication and authorization.
3. The web UI can require authentication and authorization.

#### TLS

TLS is configured in the `development.yaml` source file. The values of this configuration can be set via [server options](/docs/server-options). Follow the TLS section of the [server configuration guide](/docs/server-configuration/#tls) for details on acceptable values.

#### SDK API

API calls made via an SDK client can be restricted by authentication and authorization. Follow the [server API authorization guide](/docs/server-api-auth) to set it up.

#### Web UI

Access to the web UI can be restricted by authentication and authorization. This feature relies on the same mechanism that enables SDK auth controls. Follow the [server API authorization guide](/docs/server-api-auth) to set it up.

### Workflow search

The Temporal server supports Workflow search with filters, by default, without the need for any additional dependencies. However, Temporal's default search capabilities are limited in comparison to instances that are integrated with ElasticSearch. Integrating ElasticSearch enables the use of customizable search attributes and complex search queries. Read the [Workflow search guide](/docs/server-workflow-search) for details.

### Archiving data

Want to back up your Workflow event history? You can with a cloud provider of your choice. Read our [guide to archiving data](/docs/server-archive-data) for details.
