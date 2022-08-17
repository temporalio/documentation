---
id: cluster-install
title: How to quickly install a Temporal local development server
sidebar_label: Install local dev server
description: Quickly install and run a Temporal local development server in various ways.
---

When developing Temporal Applications, you can use a local development server and interact with the [Temporal Client](/concepts/what-is-a-temporal-client) APIs and [tctl](/tctl) commands.

You can quickly run a local Temporal development server in various ways.
The following are a few of our favorites:

- [Temporalite](#temporalite): This distribution of Temporal runs as a single process with zero runtime dependencies.
- [Docker](#docker-compose): Using Docker Compose makes it easy to develop your Temporal Application.
- [Gitpod](#gitpod): One-click deployments are available for Go and TypeScript.

**For [full (production) environment](/server/production-deployment) usage, see the [Temporal Cloud](../cloud/) documentation.**

#### Temporalite

You can run a local Temporal development server to develop Temporal Applications using [Temporalite](https://github.com/temporalio/temporalite).

Temporalite is a distribution of Temporal that runs as a single process with zero runtime dependencies, that supports persistent to disk and in-memory mode through SQLite.

Requires Go 1.18 or greater.

**Build and start Temporalite**

1. Build from source.
   1. Build from source using `go install`.
   ```bash
   go install github.com/temporalio/temporalite/cmd/temporalite@latest
   ```
2. Start Temporalite locally.
   1. Run the Temporalite start command.
   ```bash
   temporalite start --namespace default
   ```
   Replace `default` with your [Namespace Name](../concepts/what-is-a-cloud-namespace-name/).

**Results**: You should have Temporal server running `http://127.0.0.1:7233` and the Temporal Web UI at [`http://127.0.0.1:8233`](http://127.0.0.1:8233/namespaces/default/workflows).

<!-- For macOS users, if you receive the `error setting up schema: stat /Users/<user_name>/Library/Application Support/temporalite/db:` error, then create the folders `temporalite/db` in your `Application Support` library. -->

#### Docker Compose

Use Docker Compose and Temporal Cluster Docker images to quickly install and run a Temporal Cluster locally while developing Temporal Applications.

You must have [Docker](https://docs.docker.com/engine/install) and [Docker Compose](https://docs.docker.com/compose/install) installed.

Then clone the [temporalio/docker-compose](https://github.com/temporalio/docker-compose) repository and run `docker-compose up` from the root of that repo:

```bash
git clone https://github.com/temporalio/docker-compose.git
cd  docker-compose
docker-compose up
```

When the Temporal Cluster is running, the Temporal Web UI becomes available in your browser: [localhost:8080](http://localhost:8080/)

The preceding steps start and run a Temporal Cluster using a default configuration.
To try other configurations (different dependencies and databases), or to try a custom Docker image, follow the [temporalio/docker-compose README](https://github.com/temporalio/docker-compose/blob/main/README.md).

#### Gitpod

You can run a Temporal Cluster and develop Temporal Applications in your browser using [Gitpod](https://www.gitpod.io/).

One-click deployments are available for the [temporalio/samples-go](https://github.com/temporalio/samples-go) repo and the [temporalio/samples-typescript](https://github.com/temporalio/samples-typescript) repo.

A one-click deployment starts a Temporal Cluster using a Temporal Cluster Docker image, starts a Worker Process, and starts one of the application's sample Workflows.

It can take up to a full minute for the one-click deployments to get fully up and running.
When it is running, you can customize the application samples.
