---
id: how-to-create-a-temporal-client-in-go
title: How to create a Temporal Client in Go
sidebar_label: Temporal Client
description: Use the `NewClient()` API available in the `go.temporal.io/sdk/client` package to create a new `Client`.
tags:
  - go
  - how-to
---

Use the [`Dial()`](https://pkg.go.dev/go.temporal.io/sdk/client#Dial) function available in the [`go.temporal.io/sdk/client`](https://pkg.go.dev/go.temporal.io/sdk/client) package to create a new [`Client`](https://pkg.go.dev/go.temporal.io/sdk/client#Client).

If you don't provide [`HostPort`](https://pkg.go.dev/go.temporal.io/sdk@v1.15.0/internal#ClientOptions), the Client defaults the address and port number to `127.0.0.1:7233`.

```go
import (
  // ...

  "go.temporal.io/sdk/client"
)

func main() {
  temporalClient, err := client.Dial(client.Options{})
  if err != nil {
    // ...
  }
  defer temporalClient.Close()
  // ...
}
```

To connect to your Cluster, specify `HostPort` followed by your Cluster address.

```go
import (
  // ...

  "go.temporal.io/sdk/client"
)

func main() {
  temporalClient, err := client.Dial(client.Options{
    HostPort: "web.<Namespace_ID>.tmprl.cloud.",
  })
  if err != nil {
    // ...
  }
  defer temporalClient.Close()
  // ...
}
```
