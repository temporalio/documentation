---
id: setup
title: How to deploy a Temporal Cluster
sidebar_label: Deploy a Temporal Cluster
description: There are many ways to deploy a Temporal Cluster.
tags:
  - cluster
  - server
  - how-to
  - guide-context
---

There are many ways to self-host a [Temporal Cluster](/clusters).
The right way for you depends entirely on your use case and where you plan to run it.

### Minimum requirements

The Temporal Server depends on a database.

Supported databases include the following:

- [Cassandra](/self-hosted/how-to-set-up-cassandra-visibility-store)
- [MySQL](/self-hosted/how-to-set-up-mysql-visibility-store)
- [PostgreSQL](/self-hosted/how-to-set-up-postgresql-visibility-store)
- SQLite is supported with the [development server](/cli/start-dev-server)

### Docker & Docker Compose

You can easily run a Temporal Cluster in [Docker](https://docs.docker.com/engine/install) containers using [Docker Compose](https://docs.docker.com/compose/install).

If you have Docker and Docker Compose installed, all you need to do is clone the [temporalio/docker-compose](https://github.com/temporalio/docker-compose) repo and run the `docker compose up` command from its root.

The `temporalio/docker-compose` repo comes loaded with a variety of configuration templates that enable you to try all three databases that the Temporal Platform supports (PostgreSQL, MySQL, Cassandra).
It also enables you to try [Advanced Visibility](/concepts/what-is-advanced-visibility) using [Search Attributes](/concepts/what-is-a-search-attribute), emit metrics, and even play with the [Archival](/concepts/what-is-archival) feature.
The Docker images in this repo are produced using the Temporal Server [auto-setup.sh](https://github.com/temporalio/docker-builds/blob/main/docker/auto-setup.sh) script.
This script defaults to creating images that run all the Temporal Server services in a single process.
You can use this script as a starting point for producing your own images.

Running your Cluster in Docker is convenient and enables you to play with features.
However, on your local machine, it usually does not offer the same performance as Temporalite in terms of Workflow Executions per second.
Granted, you would notice this limitation only if you run hundreds of Workflows concurrently.

The following commands start and run a Temporal Cluster in Docker using the default configuration (docker-compose.yml):

```bash
git clone https://github.com/temporalio/docker-compose.git
cd docker-compose
docker compose up
```

Local [Temporal Clients](/temporal/#temporal-client) and [Workers](/workers) can connect to the Cluster running in Docker at 127.0.0.1:7233 (default connection for most SDKs) and the Temporal Web UI at 127.0.0.1:8080.

To try other configurations (different dependencies and databases), or to try a custom Docker image, follow the [temporalio/docker-compose README](https://github.com/temporalio/docker-compose/blob/main/README.md).

### Importing the Server package

The Temporal Server is a standalone Go application that can be [imported](/references/server-options) into another project.

The main reason you might want to do this is to pass in custom plugins or any other customizations through the [Server Options](/references/server-options).
Then you can build and run a binary that contains your customizations.

Doing this requires Go v1.19 or later, as specified in the Temporal Server [Build prerequisites](https://github.com/temporalio/temporal/blob/main/CONTRIBUTING.md#build-prerequisites).

### Temporal Server as a binary

You can run the Temporal Server as a single Go binary, or you can run each service within the Server separately.
For example, if you are using Kubernetes, you could have one service per pod, so they can be scaled independently in future.

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

Each Temporal Server release also ships a `Server with Auto Setup` Docker image that includes an [auto-setup.sh](https://github.com/temporalio/docker-builds/blob/main/docker/auto-setup.sh) script.
We recommend using this script for initial schema setup of each supported database.
You should familiarize yourself with [what auto-setup does](https://temporal.io/blog/auto-setup), because you will likely replace every part of the script to customize it for your own infrastructure and tooling choices.

### Helm charts

We do maintain a Helm chart you can use as a reference, but you are responsible for customizing it to your needs.

[Temporal Helm charts](https://github.com/temporalio/helm-charts) enables you to get a Cluster running on [Kubernetes](https://kubernetes.io/) by deploying the Temporal Server services to individual pods and connecting them to your existing database and Elasticsearch instances.

The template in the `temporalio/helm-charts` repo is your starting point, but you can adjust it to fit your infrastructure needs.

Keep in mind that the configuration can become very complex if you try to scale services or run many Workflows concurrently.
