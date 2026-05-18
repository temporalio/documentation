---
id: embedded-server
title: Embedding Temporal server as a Go library
sidebar_label: Embedded server
description: Run Temporal server as an embedded Go library for testing and development. Learn how to use temporal.NewServer() to run Temporal server in-process.
slug: /self-hosted-guide/embedded-server
toc_max_heading_level: 4
keywords:
  - embedded
  - library
  - testing
  - development
  - go
tags:
  - Temporal Service
  - Self-hosting
  - Go SDK
---

You can run Temporal server as an embedded Go library instead of deploying it as a separate service.
This approach is useful for testing and development scenarios where you want to run Temporal in-process without managing external infrastructure.

:::caution Not for production use

Embedded deployments with SQLite are suitable for **testing and development only**.
For production workloads, deploy Temporal as a service using [MySQL, PostgreSQL, or Cassandra](/temporal-service/persistence) as the persistence layer.

:::

## Reference implementation

The recommended way to run an embedded Temporal server is to use the Temporal CLI's dev server implementation as a reference.
The CLI's [devserver package](https://github.com/temporalio/cli/tree/main/internal/devserver) provides a complete implementation that handles:

- SQLite configuration and schema setup
- Namespace creation
- Service configuration
- Port allocation

You can study and adapt this implementation for your own embedded use case.

## Basic server API

The core API for embedding Temporal is `temporal.NewServer()`:

```go
import (
    "go.temporal.io/server/temporal"
    "go.temporal.io/server/common/config"
)

server, err := temporal.NewServer(
    temporal.ForServices(temporal.DefaultServices),
    temporal.WithConfig(cfg),
    temporal.InterruptOn(temporal.InterruptCh()),
)
if err != nil {
    log.Fatal(err)
}

if err := server.Start(); err != nil {
    log.Fatal(err)
}
```

The challenge is building the `config.Config` struct correctly, especially for SQLite which requires:

1. **Schema setup** - SQLite databases need schema initialization via `sqliteschema.SetupSchema()`
2. **Namespace creation** - Namespaces can be pre-created via `sqliteschema.CreateNamespaces()`
3. **Service configuration** - All four services (frontend, history, matching, worker) need proper port configuration

## Configuration from file

For non-SQLite databases, you can load configuration from a YAML file:

```go
cfg, err := config.Load(
    config.WithConfigFile("/path/to/config.yaml"),
)
if err != nil {
    log.Fatal(err)
}

server, err := temporal.NewServer(
    temporal.ForServices(temporal.DefaultServices),
    temporal.WithConfig(cfg),
)
```

Or load from a directory with environment-specific files:

```go
cfg, err := config.Load(
    config.WithConfigDir("./config"),
    config.WithEnv("development"),
)
```

## Server options reference

The `temporal.NewServer()` function accepts options to customize the server.
See [Server Options Reference](/references/server-options) for the complete list.

Key options include:

| Option | Description |
|--------|-------------|
| `ForServices([]string)` | Services to run (default: frontend, history, matching, worker) |
| `WithConfig(*config.Config)` | Server configuration |
| `WithLogger(log.Logger)` | Custom logger |
| `WithAuthorizer(authorization.Authorizer)` | Custom authorization |
| `WithClaimMapper(func)` | Role/claim mapping for auth |
| `WithCustomMetricsHandler(metrics.Handler)` | Custom metrics handler |
| `WithDynamicConfigClient(dynamicconfig.Client)` | Runtime configuration |
| `InterruptOn(chan)` | Channel for graceful shutdown |

## SQLite limitations

SQLite is intended for testing and development only:

- **Single writer**: SQLite supports only one writer at a time, limiting write throughput
- **No durability in memory mode**: In-memory mode loses data on restart
- **Not scalable**: Cannot handle production workloads
- **Single shard**: Use `NumHistoryShards: 1` for SQLite

For production, use MySQL, PostgreSQL, or Cassandra with a properly scaled multi-node deployment.

## Examples

For complete working examples, see:

- [Temporal CLI dev server](https://github.com/temporalio/cli/tree/main/internal/devserver) - Reference implementation for SQLite embedding
- [samples-server repository](https://github.com/temporalio/samples-server) - Server extensibility examples:
  - [Authorizer](https://github.com/temporalio/samples-server/tree/main/extensibility/authorizer) - Custom authorization and claim mapping
  - [Metrics handler](https://github.com/temporalio/samples-server/tree/main/extensibility/metrics-handler) - Custom metrics handling
  - [TLS](https://github.com/temporalio/samples-server/tree/main/tls) - TLS configuration for secure communication
  - [Docker Compose](https://github.com/temporalio/samples-server/tree/main/compose) - Database configurations (PostgreSQL, MySQL, Cassandra)

## Related

- [Server Options Reference](/references/server-options)
- [Deployment](/self-hosted-guide/deployment)
- [Visibility Storage](/self-hosted-guide/visibility)
