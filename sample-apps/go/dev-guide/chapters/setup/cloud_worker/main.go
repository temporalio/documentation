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
 To run a Temporal Cloud Worker, you'll change some parameters in your Client connection code, such as updating the namespace and gRPC endpoint.
 You'll use:
 
 - The [Temporal Cloud Namespace Id](https://docs.temporal.io/cloud/namespaces#temporal-cloud-namespace-id).
 - The [Namespace's gRPC endpoint](https://docs.temporal.io/cloud/namespaces#temporal-cloud-grpc-endpoint).
 The endpoint uses this format `(namespace.unique_id.tmprl.cloud:port)`.
 - [Paths to the SSL certificate (.pem) and private key (.key)](https://docs.temporal.io/cloud/saml#integrate-saml-with-your-temporal-cloud-account) registered to your Namespace and stored on your Worker's file system.
 
 Copy the Namespace Id and the gRPC endpoint from the Namespace detail Web page on [Temporal Cloud Namespaces](https://cloud.temporal.io/namespaces). Click on a Namespace name to open the Namespace details.
 
 For information about managing and generating client certificates for Temporal Cloud, see [How to manage certificates in Temporal Cloud](https://docs.temporal.io/cloud/certificates#issue-certificates).
 
 For information about configuring TLS to secure inter- and intra-network communication for a Temporal Cluster, see [Temporal Customization Samples](https://github.com/temporalio/samples-server).
 
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
