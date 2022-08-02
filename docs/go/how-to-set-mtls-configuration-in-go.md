---
id: how-to-set-mtls-configuration-in-go
title: How to set mTLS configuration in Go
sidebar_label: Set mTLS configuration
description: Set mTLS configuration
tags:
  - developer-guide
  - sdk
  - Go
---

Use [`ConnectionOptions`](https://pkg.go.dev/go.temporal.io/sdk/client#ConnectionOptions) API available in the [`go.temporal.io/sdk/client`](https://pkg.go.dev/go.temporal.io/sdk/client) package to connect a Client with mTLS.

```go
	cert, err := tls.LoadX509KeyPair(clientCertPath, clientKeyPath)
	if err != nil {
		return err
	}
	client, err := client.Dial(client.Options{
		HostPort:  "foo.bar.tmprl.cloud:7233",
		Namespace: "foo.bar",
		ConnectionOptions: client.ConnectionOptions{
			TLS: &tls.Config{Certificates: []tls.Certificate{cert}},
		},
	})
```
