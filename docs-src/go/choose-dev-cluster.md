---
id: choose-dev-cluster
title: Choose a development Cluster
sidebar_label: Choose dev Cluster
description: Discover which development Cluster you should choose
tags:
  - developer guide
  - go sdk
---

**Which development Cluster should you choose?**

We recommend choosing a development environment based on your requirements.

The source code for the Temporal Server (the orchestrating component of the Temporal Cluster) has an MIT open source license. So, in theory, anyone can take the Temporal Server code and run their Temporal Platform in any number of creative ways.

However, for most developers we recommend starting by choosing one of the following:

- Local development server
- Temporal Cloud
- Self-hosted

:::info Temporal does not directly run your code

Keep in mind that in every scenario, the “Temporal Platform” does not host and run your Workers (application code). It is up to you, the developer, to host your Application code. The Temporal Platform ensures that properly written code durably executes in the face of platform level failures.

:::

### Local dev server

**When to use a local development server?**

We recommend using the local development server if you are new to Temporal, or want to start something from scratch and don’t have a Self-hosted environment ready or want to pay for a Temporal Cloud Account.

The Temporal CLI comes bundled with a development server and it provides a fast way to start running Temporal Applications.

However, the local development server does not emit any metrics, and if you are eager to to set up Cluster level metrics for performance tuning, we recommend using a Self-hosted Cluster or Temporal Cloud.

#### Start the dev server

**How to start a local development server?**

If you have successfully installed the Temporal CLI, open a new terminal and run the following command:

```bash
temporal server start-dev
```

This command automatically starts up the Temporal Web UI, creates a default Namespace, and creates an in-memory database.

The Temporal Web UI serves to [`http://localhost:8233`](http://localhost:8233/).

For more command details and options, see the [CLI reference](/cli/server/start-dev)

#### Create a custom Namespace

**How to create a new Namespace on the development server?**

The development server does automatically create a default Namespace (named "default") when it starts up.
However, we will create a custom one for our application.
Since this is something we recommend at a production level, we recommend practicing it with the development server.

Use the `temporal operator namespace create` command using the Temporal CLI to create a new Namespace on the development server.

```bash
temporal operator namespace create backgroundcheck_namespace
```

For command details and options, see the [CLI reference](/cli/operator/namespace/create).

### Temporal Cloud

**When to use Temporal Cloud?**

If you do not have a Temporal Cloud Account, you can request one using the link on the [getting started page](https://docs.temporal.io/cloud/get-started).

We recommend starting off with Temporal Cloud if you already have a production use case, or need to move a scalable proof of concept into production.

In other words, Temporal Cloud is perfect if you are ready to run at scale and don’t want the overhead of managing your own Self-hosted Cluster.

Follow the [Create a new Temporal Cloud Namespace guide](/cloud/namespaces-create) to create a new Namespace in Temporal Cloud.

:::info Safely store your certificate and private key

Store your certificate and private key you generated for your Namespace as files or env variables in your project.
You will need access to your cert and key to run your Workers and start Workflows.

For Cloud certificate requirements and details check out the [Cloud certificate management guide](/cloud/certificates-intro).

:::

### Self-hosted Temporal Cluster

We recommend using a Self-Hosted environment if you are starting something new and need to scale with production-level features, but don’t yet need or want to pay for Temporal Cloud.

For example, running a Self-Hosted Cluster enables you to try different databases, view Cluster metrics, use custom [Search Attributes](/concepts/what-is-a-search-attribute), and even play with the [Archival](/concepts/what-is-archival) feature.

It's completely possible to run a production level Self-hosted Cluster.
However, for the purposes of this guide, we show how to use a Self-hosted environment that runs completely out of Docker.
We acknowledge that it takes a fair amount of experience to elevate from a Self-hosted environment in Docker to something that can run at an enterprise production scale.
The Self-hosted information in this guide should help you make more informed decisions.

To follow along with Self-hosted parts of this guide, install the following:

- [Docker](https://docs.docker.com/engine/install)
- [Docker Compose](https://docs.docker.com/compose/install).

Then, clone the [temporalio/docker-compose](https://github.com/temporalio/docker-compose.git) repository.

Change directory into the root of the project.

Run the `docker-compose up` command.

```shell
git clone https://github.com/temporalio/docker-compose.git
cd  docker-compose
docker-compose up
```

Create a command alias for the Temporal CLI:

```shell
alias temporal_docker="docker exec temporal-admin-tools temporal"
```

Create a new Namespace.

```shell
temporal_docker operator namespace create backgroundcheck_namespace
```
