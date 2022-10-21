---
slug: all-the-ways-to-run-a-cluster
title: All the ways to run a Temporal Cluster
tags:
  - kb-article
date: 2022-10-20T00:00:00Z
---

There are many ways to run a [Temporal Cluster](/clusters) on your own.
However, the right way for you depends entirely on your use case and where you plan to run it.
This article aims to maintain a comprehensive list of all the ways we know of.

<!-- truncate -->

## Temporalite

[Temporalite](https://github.com/temporalio/temporalite/cmd/temporalite) is a complete, but minimal, Temporal Cluster distribution (four Temporal Server services and a database) that runs as a single process with zero runtime dependencies.
It supports persistence to disk and in-memory mode through SQLite.

Temporalite is great for local testing and development purposes.
It offers great performace in terms of processing Workflow Executions per second.
Although it does currently default to one History Shard, we plan to make this setting configurable at start time, and you can adjust the setting by cloning the repository.
In theory, performance at this point is limited to your machine's processing capabilities, SQLite capacity, and SQLite read/write speeds.

One drawback is that Temporalite does not yet support [Advanced Visibility](/visibility/#advanced-visibility), or other Cluster features such as Archival.
However, work is in progress to bring Advanced Visibility to SQLite as a built-in feature.

Temporalite also requires that you have Go 1.18 or later installed.

To build and start Temporalite, run the following commands:

```bash
git clone https://github.com/temporalio/temporalite.git
cd temporalite
go build ./cmd/temporalite
```

For macOS users, if you receive the error `error setting up schema: stat /Users/<user_name>/Library/Application Support/temporalite/db: no such file or directory`, create the `temporalite/db` directories in your `Application Support` library and run the `start` command again.

Replace `default` with your custom [Namespace](/namespaces) name.

Local Temporal Clients and Workers can connect to Temporalite at 127.0.0.1:7233 (default Client connection for most SDKs) and the Temporal Web UI at 127.0.0.1:8233.

## Docker & Docker Compose

You can easily run a Temporal Cluster in [Docker](https://docs.docker.com/engine/install) containers using [Docker Compose](https://docs.docker.com/compose/install).

If you have Docker and Docker Compose installed, all you need to do is clone the [temporalio/docker-compose](https://github.com/temporalio/docker-compose) repo and run the `docker-compose up` command from its root.

The `temporalio/docker-compose` repo comes loaded with a variety of configuration templates that enable you to try all three databases that the Temporal Platform supports (PostgreSQL, MySQL, Cassandra).
It also enables you to try [Advanced Visibility](/visibility/#advanced-visibility) using [Search Attributes](/visibility/#search-attribute), emit metrics, and even play with the [Archival](/clusters/#archival) feature.
The Docker images in this repo are produced using the Temporal Server [auto-setup.sh](https://github.com/temporalio/docker-builds/blob/main/docker/auto-setup.sh) script.
This script defaults to creating images that run all of the Temporal Server services in a single process.
You can use this script as a starting point for producing your own images.

Running your Cluster in Docker is convenient and enables you to play with features.
However, on your local machine, it usually does not offer the same performance as Temporalite in terms of Workflow Executions per second.
Granted, you would notice this limitation only if you run hundreds of Workflows concurrently.

The following commands start and run a Temporal Cluster in Docker using the default configuration (docker-compose.yml):

```bash
git clone https://github.com/temporalio/docker-compose.git
cd docker-compose
docker-compose up
```

Local [Temporal Clients](/temporal/#temporal-client) and [Workers](/workers) can connect to the Cluster running in Docker at 127.0.0.1:7233 (default connection for most SDKs) and the Temporal Web UI at 127.0.0.1:8080.

To try other configurations (different dependencies and databases), or to try a custom Docker image, follow the [temporalio/docker-compose README](https://github.com/temporalio/docker-compose/blob/main/README.md).

## Import the Server package

The Temporal Server is a standalone Go application that can be [imported](/references/server-options) into another project.

The main reason you might want to do this is to pass in custom plugins or any other customizations through the [Server Options](/references/server-options).
Then you can build and run a binary that contains your customizations.

Doing this requires [Go v1.18+](https://github.com/temporalio/temporal/blob/master/CONTRIBUTING.md).

## Temporal Server as a binary

You can run the Temporal Server as a single Go binary, or you can run each service within the Server separately.
For example, if you are using Kubernetes, you could have one service per pod so they can be scaled independently in future.

In Docker, you could run each service in its own container, using the `SERVICES` flag to specify the service:

```bash
docker run
    # persistence/schema setup flags omitted
    -e SERVICES=history \                      -- Spin up one or more: history, matching, worker, frontend
    -e LOG_LEVEL=debug,info \                           -- Logging level
    -e DYNAMIC_CONFIG_FILE_PATH=config/foo.yaml         -- Dynamic config file to be watched
    temporalio/server:<tag>
```

For more details, see the [Docker source file](https://github.com/temporalio/temporal/tree/master/docker).

Each Temporal Server release also ships a `Server with Auto Setup` Docker image that includes an [`auto-setup.sh` script](https://github.com/temporalio/docker-builds/blob/main/docker/auto-setup.sh) we recommend using for initial schema setup of each supported database.
You should familiarize yourself with [what auto-setup does](https://temporal.io/blog/auto-setup), because you will likely replace every part of the script to customize it for your own infrastructure and tooling choices.

## Gitpod

You can run a Temporal Cluster, run Worker processes, and develop Temporal Applications in your browser using [Gitpod](https://www.gitpod.io/).

One-click deployments are available for the [temporalio/samples-go](https://github.com/temporalio/samples-go) repo and the [temporalio/samples-typescript](https://github.com/temporalio/samples-typescript) repo.
This approach runs a Cluster using a Temporal Server Docker image, starts a Worker Process, and starts one of the application's sample Workflows.

A one-click deployment can take up to a full minute to get fully up and running.
When it is running, you can customize the application samples.
This approach does not offer features such as Advanced Visibility or Archival.

This approach is often used for ephemeral purposes, such as learning and demos.

## Helm charts

[Temporal Helm charts](https://github.com/temporalio/helm-charts) enables you to get a Cluster running on [Kubernetes](https://kubernetes.io/) by deploying the Temporal Server services to individual pods and connecting them to your existing database and Elasticsearch instances.

The template in the temporalio/helm-charts repo is your starting point, but you can and adjust it to fit your infrastructure needs.

Keep in mind that the configuration can become very complex if you try to scale services or run many Workflows concurrently.

## Render

Our [temporalio/docker-compose](https://github.com/temporalio/docker-compose) experience has been translated to Render's Blueprint format for an alternative cloud connection.
[temporal-render-simple](https://github.com/temporalio/temporal-render-simple) translates our docker-compose to Render by using the Auto-Setup Docker image.

The benefit to this approach is a one-click deployment.

This approach is often used for ephemeral purposes, such as learning and demos.
