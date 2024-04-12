# Client Sample Project: Development Server with Custom Namespace

This project demonstrates how to configure a Temporal Client for the local Development Server.
Adding custom Namespaces during development supports isolation.
It also lets you stage different configurations and separate multiple Workflow versions from each other.

## Configuring Clients

The two Client configuration source files are located at:

* **Worker**: src/main/java/clientsample/YourWorker.java.
  The Worker uses its client to poll the Task Queue for tasks, and to initiate their execution.
* **Caller**: src/main/java/clientsample/YourCallerApp.java.
  The Caller uses its client to establish a "stub" (unique to the JavaSDK) and invoke a new Workflow Execution. 

## Creating Custom Namespaces for the Development Server

To build a Namespace, issue the following command at your command line:

```
temporal operator namespace create -n new_custom_namespace_name
```

**Note**: Older versions of the 'temporal' CLI did not use '-n'.

The utility immediately confirms the creation of the new Namespace.

```
Namespace custom-namespace successfully registered.
```

**Tips**:

* Visit localhost:8233/namespaces to see the provisioned Namespaces.
* Visit localhost:8233/workflows, and select your new Namespace from the drop-down at the top-left.
* To remove a Namespace, use 'temporal operator namespace delete -n namespace_name'.
  You will be prompted to type the Namespace name again before deletion.

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
