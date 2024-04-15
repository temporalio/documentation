# Client Sample Project: Configuring a Client for Temporal Cloud
This project demonstrates how to access a Temporal Service running on Temporal Cloud using the Temporal Client provided by the Java SDK.

## Configuring Clients

The WorkflowServiceStubs instance represents a connection to the Temporal Service.

```
WorkflowServiceStubs serviceStub = WorkflowServiceStubs.newServiceStubs(stubsOptions);
```


The two source files that configure instances of Workflow Clients are located at:

* **Worker**: src/main/java/clientsample/YourWorker.java.
  The Worker uses its client to poll the Task Queue for tasks, and to initiate their execution.
* **Caller**: src/main/java/clientsample/YourCallerApp.java.
  The Caller uses its client to establish a "stub" (unique to the JavaSDK) and invoke a new Workflow Execution. 

## Setting up Environmental Variables

You will need to set up the following Environmental Variables to use this sample.

* **TEMPORAL\_CLOUD\_NAMESPACE**: Copy the full Namespace Id from the Cloud Namespace details page.
* **TEMPORAL\_CLOUD\_GRPC\_ENDPOINT**: Copy the gRPC endpoint from the Cloud Namespace details page.
* **TEMPORAL\_MTLS\_PRIVATE\_KEY\_PATH**: The path to the file with your mTLS private key.
* **TEMPORAL\_MTLS\_CERT\_PATH**: The path to the .pem file with your mTLS x509 Certificate.

## Building and Executing

This project uses a Makefile to simplify compilation and execution using the Maven package manager (`mvn`).

```
build:
     mvn clean install -Dmaven.logging.level=0

clean:
     mvn clean -q -Dmaven.logging.level=0

worker:
     mvn compile exec:java -Dexec.mainClass="clientsample.YourWorkerApp" -Dmaven.logging.level=1

caller:
     mvn exec:java -Dexec.mainClass="clientsample.YourCallerApp" -q -Dmaven.logging.level=1
```
