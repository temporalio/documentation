---
id: activity-parameters
title: How to develop Activity Parameters
sidebar_label: Activity parameters
description: When it comes to your application data—that is, data that is serialized and encoded into a Payload—we recommend that you use a single object as an argument that wraps the application data passed to Activities.
tags:
  - guide-context
---

There is no explicit limit to the total number of parameters that an [Activity Definition](/concepts/what-is-an-activity-definition) may support.
However, there is a limit of the total size of the data ends up encoded into a gRPC message Payload.

A single argument is limited to a maximum size of 2 MB.
And the total size of a gRPC message, which includes all the arguments, is limited to a maximum of 4 MB.

Also, keep in mind that all Payload data is recorded in the [Workflow Execution Event History](/concepts/what-is-an-event-history) and large Event Histories can affect Worker performance.
This is because the entire Event History could be transferred to a Worker Process with a [Workflow Task](/concepts/what-is-a-workflow-task).

<!--TODO link to gRPC limit section when available -->

Some SDKs require that you pass context objects, others do not.
When it comes to your application data—that is, data that is serialized and encoded into a Payload—we recommend that you use a single object as an argument that wraps the application data passed to Activities.
This is so that you can change what data is passed to the Activity without breaking a function or method signature.
