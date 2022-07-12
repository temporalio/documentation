---
id: what-is-task-routing
title: What is Task Routing?
sidebar_label: Task Routing
description: Task Routing is when a Task Queue is paired with one or more Worker Processes, primarily for Activity Task Executions.
tags:
  - explanation
---

Task Routing is simply when a Task Queue is paired with one or more Workers, primarily for Activity Task Executions.

This could also mean employing multiple Task Queues, each one paired with a Worker Process.

Task Routing has many applicable use cases.

### Flow control

A Worker that consumes from a Task Queue asks for an Activity Task only when it has available capacity, so it is never overloaded by request spikes.
If Activity Tasks get created faster than Workers can process them, they are backlogged in the Task Queue.

### Throttling

The rate at which each Activity Worker polls for and processes Activity Tasks is configurable per Worker.
Workers do not exceed this rate even if it has spare capacity.
There is also support for global Task Queue rate limiting.
This limit works across all Workers for the given Task Queue.
It is frequently used to limit load on a downstream service that an Activity calls into.

### Specific environments

In some cases, you might need to execute Activities in a dedicated environment.
To send Activity Tasks to this environment, use a dedicated Task Queue.

#### Route Activity Tasks to a specific host

In some use cases, such as file processing or machine learning model training, an Activity Task must be routed to a specific Worker Process or Worker Entity.

For example, suppose that you have a Workflow with the following three separate Activities:

- Download a file.
- Process the file in some way.
- Upload a file to another location.

The first Activity, to download the file, could occur on any Worker on any host.
However, the second and third Activities must be executed by a Worker on the same host where the first Activity downloaded the file.

In a real-life scenario, you might have many Worker Processes scaled over many hosts.
You would need to develop your Temporal Application to route Tasks to specific Worker Processes when needed.

Code samples:

- [Java file processing example](https://github.com/temporalio/samples-java/tree/master/src/main/java/io/temporal/samples/fileprocessing)
- [PHP file processing example](https://github.com/temporalio/samples-php/tree/master/app/src/FileProcessing)
- [Go file processing example](https://github.com/temporalio/samples-go/tree/master/fileprocessing)

#### Sessions

Some SDKs provide a Session API that provides a straightforward way to ensure that Activity Tasks are executed with the same Worker without requiring you to manually specify Task Queue names.
It also includes features like **concurrent session limitations** and **worker failure detection**.

- [How to create Worker Sessions in Go](/go/how-to-create-a-worker-session-in-go)

#### Route Activity Tasks to a specific process

Some Activities load large datasets and cache them in the process.
The Activities that rely on those datasets should be routed to the same process.

In this case, a unique Task Queue would exist for each Worker Process involved.

#### Workers with different capabilities

Some Workers might exist on GPU boxes versus non-GPU boxes.
In this case, each type of box would have its own Task Queue and a Workflow can pick one to send Activity Tasks.

### Multiple priorities

If your use case involves more than one priority, you can create one Task Queue per priority, with a Worker pool per priority.

### Versioning

Task Routing is the simplest way to version your code.

If you have a new backward-incompatible Activity Definition, start by using a different Task Queue.
