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

**Install and start the Temporal CLI**

1. Choose one of the following install methods.
   1. Install the Temporal CLI with Homebrew.

      ```bash
      brew install temporal
      ```

   2. Install the Temporal CLI with cURL.

      ```bash
      curl -sSf https://temporal.download/cli.sh | sh
      ```

   3. Install the Temporal CLI for Windows.
      1. Download and run the installer for the [latest release](https://github.com/temporalio/cli/releases/latest/).
      2. Add the `temporal.exe` binary to your PATH.
2. Start Temporal Server by using the `start-dev` command.

   ```bash
   temporal server start-dev
   ```

To customize the [Namespace Name](/namespaces), start the server with the `--namespace` command.

```bash
temporal server start-dev --namespace your-custom-namespace
```

**Results**: You should have Temporal Cluster running at `http://127.0.0.1:7233` and the Temporal Web UI at [`http://127.0.0.1:8233`](http://127.0.0.1:8233/).
