/* dacx */
package backgroundcheckreplay.workers;

import backgroundcheckreplay.BackgroundCheckReplayActivitiesImpl;
import backgroundcheckreplay.BackgroundCheckReplayWorkflowImpl;
import backgroundcheckreplay.BackgroundCheckReplayNonDeterministicWorkflowImpl;
import io.temporal.client.WorkflowClient;
import io.temporal.serviceclient.WorkflowServiceStubs;
import io.temporal.worker.Worker;
import io.temporal.worker.WorkerFactory;

/*
To run a Worker Process with a local development server, define the following steps in code:
- Generate the gRPC stubs necessary to configure a connection to a Temporal Cluster running on localhost using the 'default' namespace
- Initialize a Temporal Client (`WorkflowClient`), passing in the gRPC stubs.
- Initialize a WorkerFactory, passing in the Temporal Client (`WorkflowClient`)
- Create a new Worker using the WorkerFactory, passing in the task queue the Worker should listen on.
- Register the application's Workflow and Activities.
- Call start on the Worker.

Temporal recommends keeping Worker code separate from Workflow and Activity code.
*/

public class DevServerWorker {
  public static void main(String[] args) {

    // Generate the gRPC stubs
    WorkflowServiceStubs service = WorkflowServiceStubs.newLocalServiceStubs();

    // Initialize the Temporal Client, passing in the gRPC stubs
    WorkflowClient client = WorkflowClient.newInstance(service);

    // Initialize a WorkerFactory, passing in the Temporal Client (WorkflowClient)
    WorkerFactory factory = WorkerFactory.newInstance(client);

    // Create a new Worker
    Worker worker = factory.newWorker("backgroundcheck-replay-task-queue-local");

    // Register the Workflow by passing in the class to the worker
    worker.registerWorkflowImplementationTypes(BackgroundCheckReplayWorkflowImpl.class);
    worker.registerWorkflowImplementationTypes(BackgroundCheckReplayNonDeterministicWorkflowImpl.class);

    // Register the Activities by passing in an Activities object used for execution
    worker.registerActivitiesImplementations(new BackgroundCheckReplayActivitiesImpl());

    // Start the Worker
    factory.start();
  }
}

/* @dacx
id: backgroundcheck-boilerplate-run-a-dev-server-worker
title: Run a dev server Worker
description: Define the code needed to run a Worker Process in Java.
label: Dev server Worker
lines: 4-47
tags:
- worker
- developer guide
- temporal client
@dacx */