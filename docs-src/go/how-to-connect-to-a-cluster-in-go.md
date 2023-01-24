---
id: how-to-connect-to-a-cluster-in-go
title: How to connect to a Temporal Cluster in Go
sidebar_label: Connect a Temporal Client
description: Connect a Temporal Client to a Cluster in the Go SDK.
tags:
  - developer-guide
  - sdk
  - go
---

Use the [`Dial()`](https://pkg.go.dev/go.temporal.io/sdk/client#Dial) API available in the [`go.temporal.io/sdk/client`](https://pkg.go.dev/go.temporal.io/sdk/client) package to create a new [`Client`](https://pkg.go.dev/go.temporal.io/sdk/client#Client).

If you don't provide [`HostPort`](https://pkg.go.dev/go.temporal.io/sdk/internal#ClientOptions), the Client defaults the address and port number to `127.0.0.1:7233`.

Set a custom Namespace name in the Namespace field on an instance of the Client Options.

Use the [`ConnectionOptions`](https://pkg.go.dev/go.temporal.io/sdk/client#ConnectionOptions) API to connect a Client with mTLS.

```go
import (
  // ...

  "go.temporal.io/sdk/client"
)
func main() {
    cert, err := tls.LoadX509KeyPair(clientCertPath, clientKeyPath)
    if err != nil {
        return err
    }
    client, err := client.Dial(client.Options{
        HostPort:  "your-custom-namespace.tmprl.cloud:7233",
        Namespace: "your-custom-namespace",
        ConnectionOptions: client.ConnectionOptions{
            TLS: &tls.Config{Certificates: []tls.Certificate{cert}},
        },
    }
    defer temporalClient.Close()
  // ...
}
```
