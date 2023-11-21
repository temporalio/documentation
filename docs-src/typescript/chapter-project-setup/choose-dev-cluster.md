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

The source code for the Temporal Server (the orchestrating component of the Temporal Cluster) is licensed under the MIT open source license. So, in theory, anyone can take the Temporal Server code and run their Temporal Platform in any number of creative ways.

However, for most developers we recommend starting by choosing one of the following:

- [Local development server](#local-dev-server)
- [Temporal Cloud](#temporal-cloud)
- [Self-hosted Temporal Cluster](#self-hosted-temporal-cluster)

:::info Temporal does not directly run your code

Keep in mind that in every scenario, the “Temporal Platform” does not host and run your Workers (application code).
It is up to you, the developer, to host your application code.
The Temporal Platform ensures that properly written code durably executes in the face of platform-level failures.

:::

### Local dev server

**When to use a local development server?**

We recommend using the local development server if you are new to Temporal, or want to start something from scratch and don’t have a self-hosted environment ready or want to pay for a Temporal Cloud account.

The Temporal CLI comes bundled with a development server and provides a fast way to start running Temporal Applications.

However, the local development server does not emit any metrics.
If you are eager to to set up Cluster-level metrics for performance tuning, we recommend using a self-hosted Cluster or Temporal Cloud.

#### Start the dev server

**How to start a local development server**

If you have successfully installed the Temporal CLI, open a new terminal and run the following command:

```bash
temporal server start-dev
```

This command automatically starts the Temporal Web UI, creates a default Namespace, and creates an in-memory database.

The Temporal Web UI serves to [http://localhost:8233](http://localhost:8233/).

For more command details and options, see the [CLI reference](/cli/server/start-dev)

#### Create a custom Namespace

**How to create a Namespace on the development server**

The development server does automatically create a default Namespace (named "default") when it starts up.
However, you will create a custom one for our application.
Since this is something recommended at a production level, it's recommend practicing it with the development server.

Use the `temporal operator namespace create` command using the Temporal CLI to create a Namespace on the development server.

```bash
temporal operator namespace create backgroundcheck_namespace
```

For command details and options, see the [CLI reference](/cli/operator/namespace/create).

### Temporal Cloud

**When to use Temporal Cloud**

If you do not have a Temporal Cloud Account, you can request one using the link on the [Get started with Temporal Cloud](https://docs.temporal.io/cloud/get-started) guide.

We recommend starting off with Temporal Cloud if you already have a production use case, or need to move a scalable proof of concept into production.

In other words, Temporal Cloud is perfect if you are ready to run at scale and don’t want the overhead of managing your own self-hosted Cluster.

To create a Namespace in Temporal Cloud, follow the instructions in [How to create a Namespace](/cloud/namespaces-create).

:::info Safely store your certificate and private key

Store certificates and private keys generated for your Namespace as files or environment variables in your project.
You need access to your certificate and key to run your Workers and start Workflows.

For more information on certificate requirements, see [How to manage certificates in Temporal Cloud](/cloud/certificates-intro).

:::

### Self-hosted Temporal Cluster

We recommend using a self-hosted environment if you are starting something new and need to scale with production-level features, but don’t yet need or want to pay for Temporal Cloud.

For example, running a self-hosted Cluster lets you try different databases, view Cluster metrics, use custom [Search Attributes](/concepts/what-is-a-search-attribute), and even play with the [Archival](/concepts/what-is-archival) feature.

It's completely possible to run a production level self-hosted Cluster.
However, for the purposes of this guide, we show how to use a self-hosted environment that runs completely out of Docker.
We acknowledge that it takes a fair amount of experience to elevate from a self-hosted environment in Docker to something that can run at an enterprise production scale.
The self-hosted information in this guide should help you make more informed decisions.

To follow along with self-hosted parts of this guide, install the following:

- [Docker](https://docs.docker.com/engine/install)
- [Docker Compose](https://docs.docker.com/compose/install).

Then, clone the [temporalio/docker-compose](https://github.com/temporalio/docker-compose.git) repository.

Change directory into the root of the project.

Run the `docker compose up` command.

```shell
git clone https://github.com/temporalio/docker-compose.git
cd docker-compose
docker compose up
```

Create a command alias for the Temporal CLI:

```shell
alias temporal_docker="docker exec temporal-admin-tools temporal"
```

Create a Namespace.

```shell
temporal_docker operator namespace create backgroundcheck_namespace
```
