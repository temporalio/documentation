---
id: how-to-install-temporal-cli
title: How to install Temporal CLI and run a development server
sidebar_label: Run a development server
---

The following section describes how to install the [Temporal CLI](/cli) and start a development server that you can
interact with the [Temporal Client](/concepts/what-is-a-temporal-client) APIs, [Web UI](/web-ui), and [CLI](/cli)
commands to test and develop applications.

**For information on deploying a [production environment](/cluster-deployment-guide), see the [Temporal Cloud](/cloud)
documentation.**

Temporal CLI is a tool for interacting with Temporal from the command line and a distribution of Temporal server and web
UI that runs as a single process with zero runtime dependencies. It supports persistence to disk and in-memory mode
through SQLite.

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

**Start the Temporal Development Server**

Start the Temporal Development Server by using the `server start-dev` command.

```bash
temporal server start-dev
```

This command starts the server listening on `localhost:7233`, the web UI on
[http://localhost:8233](http://localhost:8233), automatically create the `default` [Namespace](/namespaces), and use an
in-memory SQLite database for persistence.

The server's startup configuration can be customized using command line options. For a full list of options, run:

```bash
temporal server start-dev --help
```
