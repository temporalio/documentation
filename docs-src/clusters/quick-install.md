---
id: quick-install
title: How to install a Temporal Cluster quickly for testing and local development
sidebar_label: Run a development Cluster
description: There are four ways to quickly install and run a Temporal Cluster.
---

The following section describes how to deploy your [Temporal Clusters](/concepts/what-is-a-temporal-cluster) locally so that you can use and interact with the [Temporal Client](/concepts/what-is-a-temporal-client) APIs, [Web UI](/web-ui), and [CLI](/cli) commands to test and develop applications.

**For information on deploying a [production environment](/cluster-deployment-guide), see the [Temporal Cloud](/cloud) documentation.**

Temporal CLI is a distribution of Temporal that runs as a single process with zero runtime dependencies.
It supports persistence to disk and in-memory mode through SQLite.

**Install the Temporal CLI**

Choose one of the following install methods to install the Temporal CLI.

<Tabs>
<TabItem value="macOS" label="macOS">

- Install the Temporal CLI with Homebrew.

  ```bash
  brew install temporal
  ```

- Install the Temporal CLI with cURL.

  ```bash
  curl -sSf https://temporal.download/cli.sh | sh
  ```

- Install the Temporal CLI from CDN.
  1. Select the platform and architecture needed.
     - <a href="https://temporal.download/cli/archive/latest?platform=darwin&arch=amd64">Download for Darwin amd64</a>
     - <a href="https://temporal.download/cli/archive/latest?platform=darwin&arch=arm64">Download for Darwin arm64</a>
  2. Extract the downloaded archive.
  3. Add the `temporal` binary to your PATH.

</TabItem>
<TabItem value="Linux" label="Linux">

- Install the Temporal CLI with cURL.

  ```bash
  curl -sSf https://temporal.download/cli.sh | sh
  ```

- Install the Temporal CLI from CDN.
  1. Select the platform and architecture needed.
     - <a href="https://temporal.download/cli/archive/latest?platform=linux&arch=amd64">Download for Linux amd64</a>
     - <a href="https://temporal.download/cli/archive/latest?platform=linux&arch=arm64">Download for Linux arm64</a>
  2. Extract the downloaded archive.
  3. Add the `temporal` binary to your PATH.

</TabItem>
<TabItem value="Windows" label="Windows">

- Install the Temporal CLI from CDN.
  1. Select the platform and architecture needed and download the binary.
     - <a href="https://temporal.download/cli/archive/latest?platform=windows&arch=amd64">Download for Windows amd64</a>
     - <a href="https://temporal.download/cli/archive/latest?platform=windows&arch=arm64">Download for Windows arm64</a>
  2. Extract the downloaded archive.
  3. Add the `temporal.exe` binary to your PATH.

</TabItem>
</Tabs>

**Start the Temporal Server**

Start Temporal Server by using the `start-dev` command.

```bash
temporal server start-dev
```

This command uses the default [Namespace Name](/namespaces), `default`, to start and connect to the Temporal Server.

To connect to the Temporal Server with a custom Namespace Name, use the `--namespace` command.

```bash
temporal server start-dev --namespace your-custom-namespace
```

**Results**: You should have access to the Temporal Server running at `http://127.0.0.1:7233` and the Temporal Web UI at [`http://127.0.0.1:8233`](http://127.0.0.1:8233/).
