---
id: quick-install
title: How to install a Temporal Cluster quickly for testing and local development
sidebar_label: Run a development Cluster
description: There are four ways to quickly install and run a Temporal Cluster.
---

The following section describes how to deploy your [Temporal Clusters](/concepts/what-is-a-temporal-cluster) locally so that you can use and interact with the [Temporal Client](/concepts/what-is-a-temporal-client) APIs and [tctl](/tctl-v1) commands to test and develop applications.

**For information on deploying a [production environment](/server/production-deployment), see the [Temporal Cloud](/cloud) documentation.**

### Temporal CLI

Temporal CLI is a distribution of Temporal that runs as a single process with zero runtime dependencies.
It supports persistence to disk and in-memory mode through SQLite.

**Prerequisites**

The Temporal CLI requires [Go 1.19 or later](https://go.dev/dl/).

**Build and start the Temporal CLI**

The following steps start and run a Temporal Cluster.

1. Choose one of the following install methods.
   1. curl
   ```bash
   curl -sSf https://temporal.download/cli.sh | sh
   ```
   2. Homebrew
   ```bash
   brew install temporal
   ```
2. Start Temporal Server by using the `start-dev` command.
   ```bash
   temporal server start-dev
   ```

To customize the pre-registered [Namespace Name](/namespaces), start the server with the `--namespace` command.

```bash
temporal server start-dev --namespace your-custom-namespace
```

**Results**: You should have Temporal Cluster running at `http://127.0.0.1:7233` and the Temporal Web UI at [`http://127.0.0.1:8233`](http://127.0.0.1:8233/).

<!-- For macOS users, if you receive the `error setting up schema: stat /Users/<user_name>/Library/Application Support/temporalite/db:` error, then create the folders `temporalite/db` in your `Application Support` library. -->
