---
id: introduction
title: Go SDK introduction
sidebar_label: Go SDK introduction
---

## Quick start

1. Clone the Hello World project which has all the basic files explained in our [Hello World Tutorial](/docs/go/hello-world-tutorial):

```bash
git clone https://github.com/temporalio/hello-world-project-template-go
```

2. [Install and run the Temporal Server](/docs/server/quick-install) using `docker compose`.

```bash
git clone https://github.com/temporalio/docker-compose.git
cd docker-compose
docker-compose up
```

You can now view Temporal Web at http://localhost:8088.

3. Run the worker and starter included in the project.

```bash
go run worker/main.go
go run start/main.go
```

If you have [`nodemon`](https://nodemon.io/) installed, you can automatically reload when you change any files: `nodemon --watch './**/*.go' --signal SIGTERM --exec 'go' run worker/main.go`

## Resources

- [Go SDK API reference](https://pkg.go.dev/go.temporal.io/sdk)

- [Go SDK samples library](/docs/samples-library/#go)

### Tutorials

- [Tutorial prerequisites](/docs/go/tutorial-prerequisites)

- [Run your first application tutorial](/docs/go/run-your-first-app-tutorial)

- [Build a "Hello World! app from scratch" tutorial](/docs/go/hello-world-tutorial)

### Basics

- [Workflows](/docs/go/workflows)

- [Activities](/docs/go/activities)

- [Workers](/docs/go/workers)

- [Task Queues](/docs/go/task-queues)

- [Signals](/docs/go/signals)

- [Queries](/docs/go/queries)
