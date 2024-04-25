package main

import (
	"crypto/tls"
	"log"

	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/worker"

	"documentation-samples-go/cloud"
)

/*
To run a Worker that talks to Temporal Cloud, you need the following:
- A compatible mTLS CA certificate and mTLS private key that has been added to your Namespace.
See [certificate requirements](/cloud/certificates-requirements).
- Your [Temporal Cloud Namespace Id](/concepts/what-is-a-cloud-namespace-id), which includes your [Temporal Cloud Namespace Name](/concepts/what-is-a-cloud-namespace-name) and the unique five- or six-digit [Temporal Cloud Account Id](/concepts/what-is-a-cloud-account-id) that is appended to it.
This information can be found in the URL of your Namespace; for example, `https://cloud.temporal.io/namespaces/yournamespace.a2fx6/`.
Remember that the Namespace Id must include the Account Id: `yournamespace.a2fx6`.

For more information about managing and generating client certificates for Temporal Cloud, see [How to manage certificates in Temporal Cloud](/cloud/certificates-intro).

For more information about configuring TLS to secure inter- and intra-network communication for a Temporal Service, see [Temporal Customization Samples](https://github.com/temporalio/samples-server).
*/

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
	// Create a new Worker.
	yourWorker := worker.New(temporalClient, "cloud-connection-example-go-task-queue", worker.Options{})
	// Register your Workflow Definitions with the Worker.
	// Use the ReisterWorkflow or RegisterWorkflowWithOptions method for each Workflow registration.
	yourWorker.RegisterWorkflow(cloud.YourWorkflow)
	activities := &cloud.ActivityStruct{}
	// Use the RegisterActivity or RegisterActivityWithOptions method for each Activity.
	yourWorker.RegisterActivity(activities)
	// Run the Worker
	err = yourWorker.Run(worker.InterruptCh())
	if err != nil {
		log.Fatalln("Unable to start Worker", err)
	}
}

/* @dacx
id: how-to-run-a-temporal-cloud-worker-in-go
title: How to run a Temporal Cloud Worker in Go
label: Run a Cloud Worker
description: Use a certificate key pair and your Temporal Cloud Namespace to connect to Temporal Cloud.
tags:
- go sdk
- code sample
- worker
- how-to
- temporal cloud
lines: 1-52, 64
@dacx */
