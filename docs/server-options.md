---
id: server-options
title: Temporal server options
sidebar_label: Start options
---

## Overview

To run the Temporal, include the temporal server package `go.temporal.io/server/temporal` in your Go application. Then use it to create and start a new server:

```go
s := temporal.NewServer()
err := s.Start()
if err != nil{
	log.Fatal(err)
}
```

## Options

`NewServer()` accepts functions as parameters. Each function returns a `ServerOption` that is applied to the instance.

### WithConfig

Overrides the default configuration with a custom configuration that is defined in the config package `go.temporal.io/server/common/service/config`.

```go
s := tempora.NewServer(
	temporal.WithConfig(cfg),
)
```

### WithConfigLoader

Load a custom configuration from a file.

```go
s := tempora.NewServer(
	temporal.WithConfigLoader(configDir, env, zone),
)
```

### ForServices

Sets the list of all valid temporal services. The default can be used from the `go.temporal.io/server/temporal` package.

```go
s := tempora.NewServer(
	temporal.ForServices(temporal.Services),
)
```

### InterruptOn

InterruptOn interrupts server on the signal from server. If channel is nil Start() will block forever.

```go
s := temporal.NewServer(
	temporal.InterruptOn(temporal.InterruptCh()),
)
```

### WithAuthorizer

Sets a low level authorizer that determines whether to allow or deny inbound API calls.

```go
s := temporal.NewServer(
	temporal.WithAuthorizer(myAuthorizer),
)
```

### WithTLSConfigFactory

Overrides the default TLS configuration provider. `TLSConfigProvider` is defined in the `go.temporal.io/server/common/rpc/encryption` package.

```go
s := temporal.NewServer(
	temporal.WithTLSConfigFactory(yourTLSConfigProvider),
)
```

### WithClaimMapper

Configures a role mapper for authorization.

```go
s := temporal.NewServer(
  temporal.WithClaimMapper(func(cfg *config.Config) authorization.ClaimMapper {
		return authorization.NewDefaultJWTClaimMapper(
			authorization.NewRSAKeyProvider(cfg),
			cfg
		)
	}),
)
```

### WithCustomMetricsReporter

Sets a custom tally metric reporter.

```go
s := temporal.NewServer(
	temporal.WithCustomMetricsReporter(myReporter),
)
```
