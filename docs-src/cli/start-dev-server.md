---
id: start-dev-server
title: Temporal dev server
description: Learn how to start and run a local dev server
sidebar_label: Start dev server
tags:
  - cli
  - dev server
---

**How to start the Temporal development server**

To start the Temporal development server run the following command:

```bash
temporal server start-dev
```

This command automatically starts the Web UI, creates the `default` [Namespace](/namespaces), and uses an in-memory database.

The Temporal Server should be available on `localhost:7233` and the Temporal Web UI should be available at [`http://localhost:8233`](http://localhost:8233/).

The in-memory SQLite database does not persist if you stop the dev server.
Use the `--db-filename` option to specify a database file, persisting application state.
This is helpful if you plan on stopping and re-starting the dev server.

```shell
temporal server start-dev --db-filename temporal.db
```

For the full list of dev server options use the `--help` flag:

```shell
temporal server start-dev --help
```
