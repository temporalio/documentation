---
id: how-to-connect-to-temporal-cloud-in-go
title: How to connect to Temporal Cloud
sidebar_label: Connect to Temporal Cloud
description: Use a certificate key pair and your Temporal Cloud Namespace to connect to Temporal Cloud.
---

To connect to and run Workflows through Temporal Cloud, you need the following:

- A compatible mTLS CA certificate and mTLS private key that has been added to your Namespace.
  See [certificate requirements](/cloud-context/certificates-requirements).
- Your [Temporal Cloud Namespace Id](/concepts/what-is-a-cloud-namespace-id), which includes your [Temporal Cloud Namespace Name](/concepts/what-is-a-cloud-namespace-name) and the unique five- or six-digit [Temporal Cloud Account Id](/concepts/what-is-a-cloud-account-id) that is appended to it.
  This information can be found in the URL of your Namespace; for example, `https://cloud.temporal.io/namespaces/yournamespace.a2fx6/`.
  Remember that the Namespace Id must include the Account Id: `yournamespace.a2fx6`.

For more information about managing and generating client certificates for Temporal Cloud, see [How to manage certificates in Temporal Cloud](/cloud/how-to-manage-certificates-in-temporal-cloud.md).

For more information about configuring TLS to secure inter- and intra-network communication for a Temporal Cluster, see [Temporal Customization Samples](https://github.com/temporalio/samples-server).

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-go/blob/main/cloud/client/main_dacx.go">View source code</a>

```go
package main

import (
	"context"
	"crypto/tls"
	"encoding/json"
	"log"

	"documentation-samples-go/cloud"

	"go.temporal.io/sdk/client"
)


func main() {
	// Get the key and cert from your env or local machine
	clientKeyPath := "./secrets/yourkey.key"
	clientCertPath := "./secrets/yourcert.pem"
	// Specify the host and port of your Temporal Cloud Namespace
	// Host and port format: namespace.unique_id.tmprl.cloud:port
	hostPort := "<yournamespace>.<id>.tmprl.cloud:7233"
	namespace := "<yournamespace>.<id>"
	// Use the crypto/tls package to create a cert object
	cert, err := tls.LoadX509KeyPair(clientCertPath, clientKeyPath)
	if err != nil {
		log.Fatalln("Unable to load cert and key pair.", err)
	}
	// Add the cert to the tls certificates in the ConnectionOptions of the Client
	temporalClient, err := client.Dial(client.Options{
		HostPort:  hostPort,
		Namespace: namespace,
		ConnectionOptions: client.ConnectionOptions{
			TLS: &tls.Config{Certificates: []tls.Certificate{cert}},
		},
	})
	if err != nil {
		log.Fatalln("Unable to connect to Temporal Cloud.", err)
	}
	defer temporalClient.Close()
// ...
}
```
