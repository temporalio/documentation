---
id: server-options
title: Temporal Server options
description: You can run the Temporal Server as a Go application by including the server package `go.temporal.io/server/temporal` and using it to create and start a Temporal Server.
sidebar_label: Start options
tags:
 - reference
 - web-ui
---

<!-- This file is generated. Do not edit it directly. -->

You can run the <a class="tdlp" href="/clusters#temporal-server">Temporal Server<span class="tdlpiw"><img src="/img/link-preview-icon.svg" alt="Link preview icon" /></span><div class="tdlpc"><p class="tdlppt">What is the Temporal Server?</p><p class="tdlppd">The Temporal Server is a grouping of four horizontally scalable services.</p><p class="tdlplm"><a href="/clusters#temporal-server">Learn more</a></p></div></a> as a Go application by including the server package `go.temporal.io/server/temporal` and using it to create and start a Temporal Server.

The Temporal Server services can be [run in various ways](/kb/all-the-ways-to-run-a-cluster).
We recommend this approach for a limited number of situations.

```go
s := temporal.NewServer()
err := s.Start()
if err != nil{
	log.Fatal(err)
}
```

`NewServer()` accepts functions as parameters.
Each function returns a `ServerOption` that is applied to the instance.
Source code for parameter reference is here: https://github.com/temporalio/temporal/blob/master/temporal/server_option.go

### WithConfig

Overrides the default configuration with a custom configuration that is defined in the config package `go.temporal.io/server/common/service/config`.

```go
s := temporal.NewServer(
	temporal.WithConfig(cfg),
)
```

### WithConfigLoader

Load a custom configuration from a file.

```go
s := temporal.NewServer(
	temporal.WithConfigLoader(configDir, env, zone),
)
```

### ForServices

Sets the list of all valid temporal services.
The default can be used from the `go.temporal.io/server/temporal` package.

```go
s := temporal.NewServer(
	temporal.ForServices(temporal.Services),
)
```

### InterruptOn

This option provides a channel that interrupts the server on the signal from that channel.

- If `temporal.InterruptOn()` is not passed, `server.Start()` is never blocked and you need to call `server.Stop()` somewhere.
- If `temporal.InterruptOn(nil)` is passed, `server.Start()` blocks forever until the process is killed.
- If `temporal.InterruptOn(temporal.InterruptCh())` is passed, `server.Start()` blocks until you use Ctrl+C, which then gracefully shuts the server down.
- If `temporal.Interrupt(someCustomChan)` is passed, `server.Start()` blocks until a signal is sent to `someCustomChan`.

```go
s := temporal.NewServer(
	temporal.InterruptOn(temporal.InterruptCh()),
)
```

### WithAuthorizer

Sets a low level <a class="tdlp" href="/clusters#authorizer-plugin">authorization mechanism<span class="tdlpiw"><img src="/img/link-preview-icon.svg" alt="Link preview icon" /></span><div class="tdlpc"><p class="tdlppt">What is an Authorizer Plugin?</p><p class="tdlppd">undefined</p><p class="tdlplm"><a href="/clusters#authorizer-plugin">Learn more</a></p></div></a> that determines whether to allow or deny inbound API calls.

```go
s := temporal.NewServer(
	temporal.WithAuthorizer(myAuthorizer),
)
```

### WithTLSConfigFactory

Overrides the default TLS configuration provider.
`TLSConfigProvider` is defined in the `go.temporal.io/server/common/rpc/encryption` package.

```go
s := temporal.NewServer(
	temporal.WithTLSConfigFactory(yourTLSConfigProvider),
)
```

### WithClaimMapper

Configures a [mechanism to map roles](/server/security/#claimmapper-plugin-interface) to `Claims` for authorization.

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

You can see the [Uber tally docs on custom reporter](https://github.com/uber-go/tally#report-your-metrics) and see a community implementation of [a reporter for Datadog's `dogstatsd` format](https://github.com/temporalio/temporal/pull/998#issuecomment-857884983).