---
slug: install-temporal-clusters-for-development
title: Install Temporal Clusters for development
tags:
  - kb-article
date: 2022-06-07T00:00:00Z
---

The following section list different methods of deploying your [Temporal Clusters](/concepts/what-is-a-temporal-cluster) locally, so that you can use and interact with the [Temporal Client](/concepts/what-is-a-temporal-client) APIs and [tctl](/tctl) commands to test and develop applications.

- [Docker](#docker-compose): Using Docker Compose makes it easy to develop your Temporal Application.
- [Gitpod](#gitpod): One-click deployments are available for Go and TypeScript.
- [Helm charts](#helm-charts): Deploying a Cluster to [Kubernetes](https://kubernetes.io/) is an easy way to test the system and develop Temporal Applications.
- [Render](#render): Our [temporalio/docker-compose](https://github.com/temporalio/docker-compose) experience has been translated to Render's Blueprint format for an alternative cloud connection.
- [Temporalite](#temporalite): This distribution of Temporal runs as a single process with zero runtime dependencies.

**For information on deploying a [production environment](/server/production-deployment), see the [Temporal Cloud](../cloud/) documentation.**

#### Docker Compose

Use Docker Compose and Temporal Cluster Docker images to quickly install and run a Temporal Cluster locally.

**Prerequisites**
Install [Docker](https://docs.docker.com/engine/install) and [Docker Compose](https://docs.docker.com/compose/install).

**Clone the repo and run Docker Compose**

The following steps start and run a Temporal Cluster using the default configuration.

1. Clone the [temporalio/docker-compose](https://github.com/temporalio/docker-compose) repository.
   ```bash
   git clone https://github.com/temporalio/docker-compose.git
   ```
2. Change to the directory for the project.
   ```bash
   cd docker-compose
   ```
3. From your project directory, start up your application by running docker compose up.
   ```bash
   docker-compose up
   ```

**Results**: You should have Temporal Cluster running at `http://127.0.0.1:7233` and the Temporal Web UI at [`http://127.0.0.1:8080`](http://127.0.0.1:8080/namespaces/default/workflows).

To try other configurations (different dependencies and databases), or to try a custom Docker image, follow the [temporalio/docker-compose README](https://github.com/temporalio/docker-compose/blob/main/README.md).

#### Gitpod

You can run a Temporal Cluster and develop Temporal Applications in your browser using [Gitpod](https://www.gitpod.io/).

One-click deployments are available for the [temporalio/samples-go](https://github.com/temporalio/samples-go) repo and the [temporalio/samples-typescript](https://github.com/temporalio/samples-typescript) repo.

A one-click deployment starts a Temporal Cluster using a Temporal Cluster Docker image, starts a Worker Process, and starts one of the application's sample Workflows.

It can take up to a full minute for the one-click deployments to get fully up and running.
When it is running, you can customize the application samples.

#### Helm charts

Use [Temporal Helm charts](https://github.com/temporalio/helm-charts) to deploy the Temporal Server to a [Kubernetes](https://kubernetes.io/) cluster.

Deploying the Temporal Cluster with Helm is not recommended for a production environment, but it is a great way to test the system while developing Workflows.

#### Render

[temporal-render-simple](https://github.com/temporalio/temporal-render-simple) translates our docker-compose to Render by using the [Auto-Setup Docker image](/blog/auto-setup).
We do not recommend using this technique for production because all four Temporal internal services (Frontend, Matching, History, and Worker) are run in one process, but the benefit is one-click deployments.

#### Temporalite

Temporalite is a distribution of Temporal that runs as a single process with zero runtime dependencies.
It supports persistence to disk and in-memory mode through SQLite.

**Prerequisites**
Temporalite requires Go 1.18 or later.

**Build and start Temporalite**

The following steps start and run a Temporal Cluster.

1. Build from source by using `go install`.
   ```bash
   go install github.com/temporalio/temporalite/cmd/temporalite@latest
   ```
2. Start Temporalite by using the `start` command.
   ```bash
   temporalite start --namespace default
   ```
   Replace `default` with your [Namespace Name](../concepts/what-is-a-cloud-namespace-name/).

**Results**: You should have Temporal Cluster running at `http://127.0.0.1:7233` and the Temporal Web UI at [`http://127.0.0.1:8233`](http://127.0.0.1:8233/namespaces/default/workflows).

<!-- For macOS users, if you receive the `error setting up schema: stat /Users/<user_name>/Library/Application Support/temporalite/db:` error, then create the folders `temporalite/db` in your `Application Support` library. -->
