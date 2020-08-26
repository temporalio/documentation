---
id: install-temporal-server
title: Install Temporal
---

## Overview

This guide will show you how to quickly install and run Temporal using `docker-compose`.

## Prerequisites

1. [Install Docker](https://docs.docker.com/engine/install)
2. [Install docker-compose](https://docs.docker.com/compose/install)

## Install Temporal

In your terminal, `cd` into the directory where you want to install and run Temporal.

Run this command to download the Temporal docker-compose file:

```bash
curl -L https://github.com/temporalio/temporal/releases/latest/download/docker.tar.gz | tar -xz --strip-components 1 docker/docker-compose.yml
```

Once complete you should see the `docker-compose.yml` file in your working directory.

:::note

You can install a specific version of Temporal by changing the release version in the URL:

`https://github.com/temporalio/temporal/releases/download/<release>/docker.tar.gz`

:::

## Run Temporal

Run the following command to start the Temporal server:

```bash
docker-compose up
```

You will see output that looks similar to:

```
Creating network "quick_start_default" with the default driver
Pulling temporal (temporalio/temporal-auto-setup:0.26.0)...
...
...
temporal_1   | Description: Default namespace for Temporal Server
temporal_1   | OwnerEmail:
temporal_1   | NamespaceData: map[string]string(nil)
temporal_1   | Status: NamespaceStatusRegistered
temporal_1   | RetentionInDays: 1
temporal_1   | EmitMetrics: false
temporal_1   | ActiveClusterName: active
temporal_1   | Clusters: active
temporal_1   | HistoryArchivalStatus: Enabled
temporal_1   | HistoryArchivalURI: file:///tmp/temporal_archival/development
temporal_1   | VisibilityArchivalStatus: Disabled
temporal_1   | Bad binaries to reset:
temporal_1   | +-----------------+----------+------------+--------+
temporal_1   | | BINARY CHECKSUM | OPERATOR | START TIME | REASON |
temporal_1   | +-----------------+----------+------------+--------+
temporal_1   | +-----------------+----------+------------+--------+
temporal_1   | + echo 'Default namespace registration complete.'
temporal_1   | Default namespace registration complete.
```

The Temporal Server is now running!

You can view the Temporal web interface at [localhost:8088](http://localhost:8088/).

:::note

If you wish to deploy Temporal to a Kubernetes cluster, follow the [helm-charts guide](https://github.com/temporalio/helm-charts).

:::

## Run Workflows 

You can now run Workflows via Temporal.

Get started quickly by running either a [Go sample](https://github.com/temporalio/go-samples) or [Java sample](https://github.com/temporalio/java-samples), or write your own using the [Go SDK](/docs/go-quick-start/) or [Java SDK](/docs/java-quick-start/).

