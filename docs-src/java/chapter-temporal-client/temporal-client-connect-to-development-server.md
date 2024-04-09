---
id: temporal-client-connect-to-development-server
title: Connect your Client to a Temporal Development Cluster
description: Configure your Client to connect to a Temporal Development Cluster.
sidebar_label: Connect to a Temporal Development Service
tags:
 - guide-context
 - java
 - client
 - temporal client
 - workers
 - applications
---

Working with a Temporal Development Cluster requires little effort and is easily configured. Here's an example of how you would build a new Client, and use it to establish a Worker Factory.

```
public static void startWorker(String[] args) {
    // Create a service stub
    WorkflowServiceStubs service = WorkflowServiceStubs.newLocalServiceStubs();

    // A Workflow Client can start, Signal, and Query a Workflow Execution
    WorkflowClient client = WorkflowClient.newInstance(service);

    // A Workflow Factory creates workers.
    WorkerFactory factory = WorkerFactory.newInstance(client);

    // A Worker listens to one task queue, processing workflows and activities.
    Worker worker = factory.newWorker("MyWorkflowQueue");

    // Register a Workflow implementation with this worker.
    // The implementation must be known at runtime to dispatch workflow tasks.
    worker.registerWorkflowImplementationTypes(MyWorkflow.MyWorkflowImpl.class);

    // Register Activity Types from the Activity vendor with the worker.
    // Each activity is stateless and thread-safe, so use a single shared instance.
    worker.registerActivitiesImplementations(new MyActivities.MyActivitiesImpl());

    // Start all registered workers. The workers will start polling.
    factory.start();
}
```
