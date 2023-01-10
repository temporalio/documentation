---
id: how-to-register-namespace-in-java
title: How to register a Namespace in Java
sidebar_label: Register Namespaces
description: Use the `RegisterNamespaceRequest` API to register a Namespace and set the Retention Period for the Workflow Execution Event History for the Namespace.
tags:
  - developer-guide
  - java
  - workers
---

Use the [`RegisterNamespace` API](https://github.com/temporalio/api/blob/master/temporal/api/workflowservice/v1/service.proto) to register a [Namespace](/concepts/what-is-a-namespace) and set the [Retention Period](/concepts/what-is-a-retention-period) for the Workflow Execution Event History for the Namespace.

```java
//...
import com.google.protobuf.util.Durations;
import io.temporal.api.workflowservice.v1.RegisterNamespaceRequest;
//...
public static void createNamespace(String name) {
    RegisterNamespaceRequest req = RegisterNamespaceRequest.newBuilder()
            .setNamespace("your-custom-namespace")
            .setWorkflowExecutionRetentionPeriod(Durations.fromDays(3)) // keeps the Workflow Execution
            //Event History for up to 3 days in the Persistence store. Not setting this value will throw an error.
            .build();
    service.blockingStub().registerNamespace(req);
}
//...
```

The Retention Period setting using `WorkflowExecutionRetentionPeriod` is mandatory.
The minimum value you can set for this period is 1 day.

Once registered, set Namespace using `WorkflowClientOptions` within a Workflow Client to run your Workflow Executions within that Namespace.
See [how to set Namespace in a Client in Java](/application-development/features/#namespaces) for details.

Note that Namespace registration using this API takes up to 10 seconds to complete.
Ensure that you wait for this registration to complete before starting the Workflow Execution against the Namespace.

To update your Namespace, use the [`UpdateNamespace` API](https://github.com/temporalio/api/blob/master/temporal/api/workflowservice/v1/service.proto) with the `NamespaceClient`.
