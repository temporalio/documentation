---
id: how-to-register-namespace-in-go
title: How to register a Namespace in Go
sidebar_label: Register Namespaces
description: Use the `NamespaceClient` interface with the `Register` APIs to register your namespace.
tags:
  - developer-guide
  - go
  - workers
---

Use `Register` API with the `NamespaceClient` interface to register a [Namespace](/concepts/what-is-a-namespace) and set the [Retention Period](/concepts/what-is-a-retention-period) for the Workflow Execution Event History for the Namespace.

```go
    client, err := client.NewNamespaceClient(client.Options{HostPort: ts.config.ServiceAddr})
            //...
        err = client.Register(ctx, &workflowservice.RegisterNamespaceRequest{
            Name: your-namespace-name,
            WorkflowExecutionRetentionPeriod: &retention,
        })
```

The Retention Period setting using `WorkflowExecutionRetentionPeriod` is mandatory.
The minimum value you can set for this period is 1 day.

Once registered, set Namespace using `Dial` in a Workflow Client to run your Workflow Executions within that Namespace.
See [how to set Namespace in a Client in Go](/app-dev-context/connect-to-a-cluster) for details.

Note that Namespace registration using this API takes up to 15 seconds to complete.
Ensure that you wait for this registration to complete before starting the Workflow Execution against the Namespace.

You can also [register Namespaces using the tctl command-line tool](/tctl/namespace/register).
