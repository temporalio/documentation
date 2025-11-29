# Client Sample Project: Configuring a Client for local Service using a custom Namespace

This project demonstrates how to access a Temporal Service running locally using the Temporal Client provided by the Java SDK.
Adding custom Namespaces during development supports isolation.
It enables you to you stage multiple configurations and/or Workflow versions separate from each other.

## Configuring Clients
The WorkflowServiceStubs instance represents a connection to the Temporal Service.

```
WorkflowServiceStubs service = WorkflowServiceStubs.newLocalServiceStubs();
```

The two source files that configure instances of  Workflow Clients are located at:

* **Worker**: src/main/java/clientsample/YourWorker.java.
  The Worker uses its client to poll the Task Queue for tasks, and to initiate their execution.
* **Caller**: src/main/java/clientsample/YourCallerApp.java.
  The Caller uses its client to establish a "stub" (unique to the JavaSDK) and invoke a new Workflow Execution. 

## Creating Custom Namespaces for the Development Server

To build a Namespace, issue the following command at your command line:

```
temporal operator namespace create -n new_custom_namespace_name
```

**Note**: Older versions of the 'temporal' CLI do not use '-n' or '--namespace'.

The utility immediately confirms the creation of the new Namespace.

```
Namespace custom-namespace successfully registered.
```

**Tips**:

* Visit localhost:8233/namespaces to see the provisioned Namespaces.
* Visit localhost:8233/workflows, and select your new Namespace from the drop-down at the top-left.
* To remove a Namespace, use 'temporal operator namespace delete -n namespace_name'. 
    You will be prompted to type the Namespace name again before deletion.
    **Note**: Older versions of the 'temporal' CLI do not use '-n' or '--namespace'.

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
