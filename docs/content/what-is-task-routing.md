---
id: what-is-task-routing
title: What is Task Routing?
description: Task Routing is when a Task Queue is paired with one or more Worker Processes, primarily for Activity Task Executions.
tags:
  - explanation
---

Task Routing is when a Task Queue is paired with one or more Worker Processes, primarily for Activity Task Executions.

In some use cases, such as file processing, an Activity Task must be routed to a specific Worker Process.
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
- [Go file processing example](https://github.com/temporalio/samples-go/tree/master/fileprocessing) - The Go SDK includes a [Session](/docs/go/sessions) feature that abstracts the need to explicitly route Tasks.
