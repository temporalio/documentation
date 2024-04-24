// @@@SNIPSTART sample-apps-go-cloud-client
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

	workflowOptions := client.StartWorkflowOptions{
		ID:        "cloud-connection-example-go",
		TaskQueue: "cloud-connection-example-go-task-queue",
	}

	workflowExecution, err := temporalClient.ExecuteWorkflow(
		context.Background(),
		workflowOptions,
		cloud.YourWorkflow,
	)
	if err != nil {
		log.Fatalln("Unable to execute the Workflow.", err)
	}
	var result cloud.SomeData
	workflowExecution.Get(context.Background(), &result)
	if err != nil {
		log.Fatalln("Unable to get Workflow result:", err)
	}
	b, err := json.Marshal(result)
	if err != nil {
		log.Fatalln(err)
		return
	}
	log.Println(string(b))
}

// @@@SNIPEND
