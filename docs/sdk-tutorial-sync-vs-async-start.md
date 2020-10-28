---
id: sdk-tutorial-sync-vs-async-start
title: Sync vs async Workflow start
sidebar_label: Sync vs async Workflow start
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Workflows can be started both synchronously and asynchronously.

## Synchronous start

A Synchronous start initiates a Workflow and then waits for its completion. The started Workflow will not rely on the invocation process and will continue executing even if the waiting process crashes or stops.

<Tabs
  defaultValue="go"
  groupId="codePreference"
  values={[
    { label: 'Go', value: 'go', },
    { label: 'Java', value: 'java', },
  ]
}>
<TabItem value="go">

In Go, the only difference between a synchronous start and an asynchronous start is whether you use the Workflow Execution entity to get the result of the Workflow from the same process in which you started it.

<!--SNIPSTART hello-world-project-template-go-start-workflow-->
<!--SNIPEND-->

</TabItem>
<TabItem value="java">

To start a Workflow synchronously in Java you just call the entry point method.

<!--SNIPSTART hello-world-project-template-java-workflow-initiator-->
<!--SNIPEND-->

</TabItem>
</Tabs>

## Asynchronous start

An asynchronous start initiates a Workflow execution and immediately returns to the caller. This is the most common way to start Workflows in a live environment.

<Tabs
  defaultValue="go"
  groupId="codePreference"
  values={[
    { label: 'Go', value: 'go', },
    { label: 'Java', value: 'java', },
  ]
}>
<TabItem value="go">

To start a Workflow asynchronously in Go just call `ExecuteWorkflow()` on the client and don't wait for the result in the same process.

<!--SNIPSTART money-transfer-project-template-go-start-workflow-->
<!--SNIPEND-->

</TabItem>
<TabItem value="java">

To start a Workflow asynchronously in Java you must use the `start` method of the `WorkflowClient`.

<!--SNIPSTART money-transfer-project-template-java-workflow-initiator-->
<!--SNIPEND-->

</TabItem>
</Tabs>

If you need to get the result of a Workflow after an asynchronous start, the most straightforward way is to make a blocking call to the Workflow.

If `WorkflowOptions.WorkflowIdReusePolicy` is not set to `AllowDuplicate`, then instead of throwing `DuplicateWorkflowException`, it reconnects to an existing Workflow and waits for its completion. The following example shows how to do this from a different process than the one that started the Workflow. All this process needs is a `WorkflowId`.

<Tabs
  defaultValue="go"
  groupId="codePreference"
  values={[
    { label: 'Go', value: 'go', },
    { label: 'Java', value: 'java', },
  ]
}>
<TabItem value="go">

```go
we = client.GetWorkflow(workflowID)
var result string
we.Get(ctx, result)
```

</TabItem>
<TabItem value="java">

```java
WorkflowExecution we = new WorkflowExecution().setWorkflowId(workflowId);
YourWorkflow workflow = client.newWorkflowStub(YourWorkflow.class, we);
// Returns the result after waiting for the Workflow to complete.
String result = workflow.yourMethod();
```

</TabItem>
</Tabs>
