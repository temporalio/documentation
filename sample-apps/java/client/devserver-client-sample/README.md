# Client Sample Project: Configuring a Client for local Service

 This project demonstrates how to access a Temporal Service running locally using the Temporal Client provided by the Java SDK.

## Configuring Clients

The WorkflowServiceStubs instance represents a connection to the Temporal Service.

```
// Create a stub that accesses a Temporal Service on the local development machine
WorkflowServiceStubs service = WorkflowServiceStubs.newLocalServiceStubs();
```

The two source files that configure instances of Workflow Clients are located at:

* **Worker**: src/main/java/clientsample/YourWorker.java.
  The Worker uses its client to poll the Task Queue for tasks, and to initiate their execution.
* **Caller**: src/main/java/clientsample/YourCallerApp.java.
  The Caller uses its client to establish a "stub" (unique to the JavaSDK) and invoke a new Workflow Execution.

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
