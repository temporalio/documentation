# Client Sample Project: Development Server

This project demonstrates how to configure a Temporal Client to work with the local Development Server.

## Configuring Clients

Configuration for the Development Service is built into Temporal Clients.
Clients know the Temporal Service is run on localhost (127.0.0.1) using port 7233.
Calling `newLocalServiceStubs` sets up the default service details for you.

```
// Create a stub that accesses a Temporal Service on the local development machine
WorkflowServiceStubs service = WorkflowServiceStubs.newLocalServiceStubs();
```

The two Client configuration source files are located at:

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
