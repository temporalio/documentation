// dacx
package main

import (
	"crypto/tls"
	"log"
	"os"

	"github.com/joho/godotenv"

	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/worker"

	"documentation-samples-go/dev-guide/chapters/setup/activities"
	"documentation-samples-go/dev-guide/chapters/setup/workflows"
)

/*
A Temporal Cloud Worker requires that you specify the following in the Client connection options:

- Temporal Cloud Namespace
- Temporal Cloud Address
- Certificate and private key associated with the Namespace
*/

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalln("Unable to load environment variables from file", err)
	}
	// Get the key and cert from your env or local machine
	clientKeyPath := "./ca.key"
	clientCertPath := "./ca.pem"
	// Use the crypto/tls package to create a cert object
	cert, err := tls.LoadX509KeyPair(clientCertPath, clientKeyPath)
	if err != nil {
		log.Fatalln("Unable to load cert and key pair.", err)
	}
	// Specify the host and port of your Temporal Cloud Namespace
	// Host and port format: namespace.unique_id.tmprl.cloud:port
	namespace := os.Getenv("TEMPORAL_CLOUD_NAMESPACE")
	port := os.Getenv("TEMPORAL_CLOUD_PORT")
	hostPort := namespace + ".tmprl.cloud:" + port
	// Create a new Temporal Client
	// Specify Namespace, Hostport and tls certificates in the ConnectionOptions
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
	// Create a new Worker
	yourWorker := worker.New(temporalClient, "backgroundcheck-boilerplate-task-queue-cloud", worker.Options{})
	// Register Workflows
	yourWorker.RegisterWorkflow(workflows.BackgroundCheck)
	// Register Activities
	yourWorker.RegisterActivity(activities.SSNTraceActivity)
	// Start the Worker Process
	err = yourWorker.Run(worker.InterruptCh())
	if err != nil {
		log.Fatalln("Unable to start the Worker Process", err)
	}
}

/*
When specifying the Temporal Cloud Namespace, make sure to append the Account Id as it appears in the url of the Cloud UI.
Consider the following Namespace url: https://cloud.temporal.io/namespaces/backgroundcheck-app.1a23b/workflows, if your Namespace is "backgroundcheck-app" and your Account Id is "1a23b", then you would specify your Namespace as "backgroundcheck-app.1a23b".

The Temporal Cloud gRPC connection address includes your [Namesapce](/concepts/what-is-a-namespace) and a port number: `<Namespace>.<AccountId>.tmprl.cloud:<port>`.
For example: `https://backgroundcheck-app.1a23b.tmprl.cloud:1234`.
There is an option to copy the grPC endpoint address from the Temporal Cloud UI.

![Copy your gRPC endpoint from the UI](/img/copy-grpc-endpoint.png)
*/

/* @dacx
id: backgroundcheck-boilerplate-cloud-worker
title: Run a Temporal Cloud Worker
description: Provide your Namespace, Address, and certificate key pair to connect to Temporal Cloud.
label: Cloud Worker
lines: 2-68
tags:
- worker
- temporal cloud
- developer guide
- temporal client
@dacx */

/* @dacx
id: backgroundcheck-boilerplate-cloud-worker-details
title: Cloud Worker details
description: When specifying the Temporal Cloud Namespace, make sure to append the Account Id as it appears in the url of the Cloud UI.
label: Cloud Worker details
lines: 70-79
tags:
- worker
- cloud certificate
@dacx */
