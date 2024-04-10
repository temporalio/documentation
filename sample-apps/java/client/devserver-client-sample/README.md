# Time Fetch Project: Development Server

This project demonstrates how to configure a Temporal Client to work with the local Development Server.

## Configuring Clients

Configuration for the Development Service is built into Temporal Clients.
Clients know the service is run on localhost (127.0.0.1) using port 7233.
Calling `newLocalServiceStubs` sets up the service details for you.

```
// Create Developer Server local service stub
WorkflowServiceStubs service = WorkflowServiceStubs.newLocalServiceStubs();
```

The two Client configuration files are located at:

* **Worker**: src/main/java/timefetch/TimeWorker.java
* **Caller**: src/main/java/timefetch/TimeCallerApp.java

The Worker uses its client to poll the Task Queue for tasks, and to initiate their execution.

The Caller uses its client to establish a "stub" (unique to the JavaSDK) and invoke a new Workflow Execution. 

Use the Web UI (localhost:7233) to track the progress of each execution.

## Building and Executing

This project uses a Makefile to simplify compilation and execution using the Maven package manager (`mvn`).

```
Usage: make [target]
  make build  : Build this project using Maven (mvn clean install)
  make clean  : Clean this project using Maven (mvn clean)
  make worker : Run the TimeWorkerApp using Maven.
                The app blocks until you interrupt it.
  make caller : Run the TimeCallerApp using Maven
                The app blocks until it completes.
```

The Worker app executes indefinitely and the caller app will block until the Workflow completes.
Because of this, prepare to run this sample in two terminal sessions.

## NIST Time - Background

This project reaches out to the US National Institute of Standards and Technology.
It retrieves the current time, reporting it with respect to Greenwich Mean Time (GMT).
GMT is the mean solar time at the Royal Observatory in Greenwich, London, UK.

Be respectful of the NIST service and the default Retry Options set in the sample.
Heavy call patterns are treated as denial of service attacks.

The [NIST Internet Time Service](https://www.nist.gov/pml/time-and-frequency-division/time-distribution/internet-time-service-its) is a wonderful endpoint to practice with.
Calls will naturally fail with 5- or 10-second delays on a regular basis.

