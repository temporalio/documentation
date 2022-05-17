---
id: how-to-set-the-namespace-for-a-temporal-client-in-go
title: How to set a Namespace for a Temporal Client in Go
sidebar_label: Set Namespace
description: Set the Namespace field on an instance of the Client Options.
tags:
  - how-to
  - go
---

Set the `Namespace` field on an instance of the Client Options.

```go
// ...
clientOptions := client.Options{
  Namespace: "your-namespace",
}
temporalClient, err := client.NewClient(clientOptions)
// ...
```
