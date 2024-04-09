---
id: temporal-client-configuring-development-client
title: Configuring Development Service Clients
sidebar_label: Client
description: Configuring the Temporal Development Service Client
tags:
 - java
 - client
 - temporal client
 - workers
 - applications
---

Configuring the Development Service is built into Temporal Clients.
Clients know the service is run on localhost (127.0.0.1) using port 7233.
The default Namespace is called 'default'.
If you need to change the Namespace from 'default', customize the local service from the command-line and adjust the Client configuration in your code.

### Create a custom Namespace on the Development Service

Namespaces play an important role in Temporal, regardless of the service you're using: Temporal Cloud, the Development Service, or self-hosted Temporal Service.
When using the Development Service, you may find several people or projects using the same Cluster.
Adding custom Namespaces during development supports isolation.
It also lets you stage different configurations and separate multiple Workflow versions from each other.

To build a Namespace, issue the following command at your command line:

```
temporal operator namespace create new_custom_namespace_name
```

The utility immediately confirms the creation of the new namespace.

```
Namespace custom-namespace successfully registered.
```

### Configuring the Development Client's Namespace

In Java, you can set the namespace as an environment variable in the shell where you run your applications.
Use this to customize the `WorkflowClientOptions` with your custom Namespace.
This step is not needed when using the 'default' Namespace.

```
String namespace = System.getenv("TEMPORAL_CLOUD_NAMESPACE");  

WorkflowServiceStubs service = WorkflowServiceStubs.newLocalServiceStubs();

WorkflowClientOptions options = WorkflowClientOptions.newBuilder()  
    .setNamespace(namespace)  
    .build();

WorkflowClient client = WorkflowClient.newInstance(service, options);
```
