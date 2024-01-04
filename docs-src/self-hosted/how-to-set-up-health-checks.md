---
id: how-to-set-up-health-checks
title: How to set up health checks for a Temporal Cluster
description: The Frontend Service supports TCP or gRPC health checks on port 7233.
sidebar_label: Health checks
tags:
  - how-to
  - cluster
---

The [Frontend Service](/clusters#frontend-service) supports TCP or [gRPC](https://github.com/grpc/grpc/blob/875066b61e3b57af4bb1d6e36aabe95a4f6ba4f7/src/proto/grpc/health/v1/health.proto#L45) health checks on port 7233.

If you use [Nomad](https://www.nomadproject.io/) to manage your containers, the [check stanza](https://developer.hashicorp.com/nomad/docs/job-specification/check) would look like this for TCP:

```
service {
  check {
    type     = "tcp"
    port     = 7233
    interval = "10s"
    timeout  = "2s"
  }
```

or like this for gRPC (requires Consul ≥ `1.0.5`):

```
service {
  check {
    type         = "grpc"
    port         = 7233
    interval     = "10s"
    timeout      = "2s"
  }
```
