---
id: how-to-create-a-temporal-client-in-go
title: How to create a Temporal Client in Go
sidebar_label: Temporal Client
description: Use the `NewClient()` API available in the `go.temporal.io/sdk/client` package to create a new `Client`.
tags:
  - go
  - how-to
---

Use the [`Dial()`](https://pkg.go.dev/go.temporal.io/sdk/client#Dial) API available in the [`go.temporal.io/sdk/client`](https://pkg.go.dev/go.temporal.io/sdk/client) package to create a new [`Client`](https://pkg.go.dev/go.temporal.io/sdk/client#Client)

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
