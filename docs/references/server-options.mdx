---
id: server-options
title: Temporal Server options reference
sidebar_label: Server options
description: ServerOption functions for embedding the Temporal Server as a Go library with temporal.NewServer(), covering config, shutdown, auth, TLS, and metrics.
toc_max_heading_level: 4
tags:
  - Reference
---

:::info

For when and how to run the Temporal Server in-process, see [Embedding Temporal server as a Go library](/self-hosted-guide/embedded-server).

For the settings in the configuration file, see the [Temporal Service configuration reference](/references/service-configuration).

:::

You can run the [Temporal Server](/temporal-service/temporal-server) as a Go application.
Import the `go.temporal.io/server/temporal` package, then create and start a server with `temporal.NewServer()`.

```go
s, err := temporal.NewServer()
if err != nil {
    log.Fatal(err)
}
err = s.Start()
if err != nil {
    log.Fatal(err)
}
```

`NewServer()` accepts functions that each return a `ServerOption`.
The server applies each option to the instance it creates.

Server options are defined in [server_option.go](https://github.com/temporalio/temporal/blob/main/temporal/server_option.go) in the Temporal Server repository.

## WithConfig

Sets the static configuration the server starts with.
Without this option, the server looks for a configuration file at `./config/development.yaml`.

For the configuration structure, see the [`config` package](https://pkg.go.dev/go.temporal.io/server/common/config) and the [Temporal Service configuration reference](/references/service-configuration).

```go
s, err := temporal.NewServer(
    temporal.WithConfig(cfg),
)
```

## WithConfigLoader

Loads the configuration from files in `configDir`, selected by environment (`env`) and availability zone (`zone`).

```go
s, err := temporal.NewServer(
    temporal.WithConfigLoader(configDir, env, zone),
)
```

## WithDynamicConfigClient

Sets the `dynamicconfig.Client` that the server reads [dynamic configuration](/references/dynamic-configuration) from.
`dynamicconfig.Client` is defined in the `go.temporal.io/server/common/dynamicconfig` package.

Without this option, the server reads the file named in the [`dynamicConfigClient`](/references/service-configuration#dynamicconfigclient) section of its static configuration.
If that section is also missing, the server uses the default value for every dynamic configuration key.

```go
s, err := temporal.NewServer(
    temporal.WithDynamicConfigClient(myDynamicConfigClient),
)
```

## ForServices

Sets the Temporal services the server runs.
To run every service, pass `temporal.DefaultServices` from the `go.temporal.io/server/temporal` package.

```go
s, err := temporal.NewServer(
    temporal.ForServices(temporal.DefaultServices),
)
```

## InterruptOn

Sets a channel that stops the server when it receives a signal.
The value you pass controls whether `s.Start()` blocks:

| Value                                          | Behavior of `s.Start()`                                               |
| ---------------------------------------------- | --------------------------------------------------------------------- |
| Option not passed                              | Returns without blocking. Call `s.Stop()` to stop the server.         |
| `temporal.InterruptOn(nil)`                    | Blocks until the process is killed.                                   |
| `temporal.InterruptOn(temporal.InterruptCh())` | Blocks until you press Ctrl+C, then shuts the server down gracefully. |
| `temporal.InterruptOn(yourCustomChan)`         | Blocks until a signal is sent to `yourCustomChan`.                    |

```go
s, err := temporal.NewServer(
    temporal.InterruptOn(temporal.InterruptCh()),
)
```

## WithAuthorizer

Sets the [`Authorizer`](/self-hosted-guide/security#authorizer-plugin) that allows or denies inbound API calls.

```go
s, err := temporal.NewServer(
    temporal.WithAuthorizer(myAuthorizer),
)
```

## WithTLSConfigFactory

Overrides the default TLS configuration provider.
`TLSConfigProvider` is defined in the `go.temporal.io/server/common/rpc/encryption` package.

```go
s, err := temporal.NewServer(
    temporal.WithTLSConfigFactory(yourTLSConfigProvider),
)
```

## WithClaimMapper

Sets the [`ClaimMapper`](/self-hosted-guide/security#claim-mapper) that maps a caller's credentials to `Claims` for authorization.

```go
s, err := temporal.NewServer(
    temporal.WithClaimMapper(func(cfg *config.Config) authorization.ClaimMapper {
        logger := getYourLogger() // Replace with how you retrieve or initialize your logger
        return authorization.NewDefaultJWTClaimMapper(
            authorization.NewDefaultTokenKeyProvider(&cfg.Global.Authorization, logger),
            &cfg.Global.Authorization,
            logger,
        )
    }),
)
```

## WithTokenProvider

Sets the [`TokenProvider`](/self-hosted-guide/security#token-provider) that supplies bearer tokens for outbound RPCs to remote clusters in [Multi-Cluster Replication](/self-hosted-guide/multi-cluster-replication).
`TokenProvider` is defined in the `go.temporal.io/server/common/rpc/auth` package.

The token requires TLS to the remote cluster.
Configure it with [`global.tls.remoteClusters`](/references/service-configuration#tls) or with [WithTLSConfigFactory](#withtlsconfigfactory).

```go
s, err := temporal.NewServer(
    temporal.WithTokenProvider(myTokenProvider),
)
```

## WithLogger

Sets the `log.Logger` that the server writes its logs to.
`log.Logger` is defined in the `go.temporal.io/server/common/log` package.

Without this option, the server builds a logger from the [`log`](/references/service-configuration#log) section of its static configuration.

```go
s, err := temporal.NewServer(
    temporal.WithLogger(myLogger),
)
```

## WithCustomMetricsHandler

Sets a custom implementation of the `metrics.Handler` interface that publishes the server's metrics.

For the metrics the Temporal Server emits, see the [Temporal Service metrics reference](/references/service-metrics).

```go
s, err := temporal.NewServer(
    temporal.WithCustomMetricsHandler(myHandler),
)
```
