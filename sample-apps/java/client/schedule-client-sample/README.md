# Client Sample Project: Configuring a Schedule Client

 This project demonstrates how to configure a Java SDK Schedule Client.
 Schedule Clients produce a scheduled Workflow Execution that's invoked at regular intervals.
 The project uses a local Temporal service and can be adapted for Temporal Cloud or self-hosted use.
 
## Configuring Schedule Clients

The source file that configures an instance of a Schedule Client is located at:

* **Scheduler**: src/main/java/clientsample/YourSchedulerApp.java.
  The Scheduler uses its client to register a schedule that will repeatedly invoke new Workflow Executions at set times.

The source file that configures a Workflow Client is located at:

* **Worker**: src/main/java/clientsample/YourWorker.java.
  The Worker uses its client to poll the Task Queue for tasks, and to initiate their execution.

## Building and Executing

This project uses a Makefile to simplify compilation and execution using the Maven package manager (`mvn`).

```
build:
     mvn clean install -Dmaven.logging.level=0

clean:
     mvn clean -q -Dmaven.logging.level=0

worker:
     mvn compile exec:java -Dexec.mainClass="clientsample.YourWorkerApp" -Dmaven.logging.level=1

scheduler (run once):
     mvn exec:java -Dexec.mainClass="clientsample.YourSchedulerApp" -q -Dmaven.logging.level=1
```
