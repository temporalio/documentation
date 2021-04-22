---
id: starting-workflow-executions
title: Starting workflow executions
---

In Java, Workflows can be started both synchronously and asynchronously in Java. To do either, you must initialize an instance of a `WorkflowClient`, create a client side Workflow stub, and then call a method that is annotated with `@WorkflowMethod`.

## Asynchronous start

An asynchronous start initiates a Workflow execution and immediately returns to the caller. This is the most common way to start Workflows in a live environment.

<!--SNIPSTART money-transfer-project-template-java-workflow-initiator-->
[src/main/java/moneytransferapp/InitiateMoneyTransfer.java](https://github.com/temporalio/money-transfer-project-template-java/blob/master/src/main/java/moneytransferapp/InitiateMoneyTransfer.java)
```java
public class InitiateMoneyTransfer {

    public static void main(String[] args) throws Exception {

        // WorkflowServiceStubs is a gRPC stubs wrapper that talks to the local Docker instance of the Temporal server.
        WorkflowServiceStubs service = WorkflowServiceStubs.newInstance();
        WorkflowOptions options = WorkflowOptions.newBuilder()
                .setTaskQueue(Shared.MONEY_TRANSFER_TASK_QUEUE)
                // A WorkflowId prevents this it from having duplicate instances, remove it to duplicate.
                .setWorkflowId("money-transfer-workflow")
                .build();
        // WorkflowClient can be used to start, signal, query, cancel, and terminate Workflows.
        WorkflowClient client = WorkflowClient.newInstance(service);
        // WorkflowStubs enable calls to methods as if the Workflow object is local, but actually perform an RPC.
        MoneyTransferWorkflow workflow = client.newWorkflowStub(MoneyTransferWorkflow.class, options);
        String referenceId = UUID.randomUUID().toString();
        String fromAccount = "001-001";
        String toAccount = "002-002";
        double amount = 18.74;
        // Asynchronous execution. This process will exit after making this call.
        WorkflowExecution we = WorkflowClient.start(workflow::transfer, fromAccount, toAccount, referenceId, amount);
        System.out.printf("\nTransfer of $%f from account %s to account %s is processing\n", amount, fromAccount, toAccount);
        System.out.printf("\nWorkflowID: %s RunID: %s", we.getWorkflowId(), we.getRunId());
        System.exit(0);
    }
}
```
<!--SNIPEND-->

If you need to wait for the completion of a Workflow after an asynchronous start, the most straightforward way is to call the blocking Workflow instance again. If `WorkflowOptions.WorkflowIdReusePolicy` is not set to `AllowDuplicate`, then instead of throwing `DuplicateWorkflowException`, it reconnects to an existing Workflow and waits for its completion. The following example shows how to do this from a different process than the one that started the Workflow. All this process needs is a `WorkflowId`.

```java
WorkflowExecution we = new WorkflowExecution().setWorkflowId(workflowId);
YourWorkflow workflow = client.newWorkflowStub(YourWorkflow.class, we);
// Returns the result after waiting for the Workflow to complete.
String result = workflow.yourMethod();
```

## Synchronous start

A Synchronous start initiates a Workflow and then waits for its completion. The started Workflow will not rely on the invocation process and will continue executing even if the waiting process crashes or was stops.

<!--SNIPSTART hello-world-project-template-java-workflow-initiator-->
[src/main/java/helloworldapp/InitiateHelloWorld.java](https://github.com/temporalio/hello-world-project-template-java/blob/master/src/main/java/helloworldapp/InitiateHelloWorld.java)
```java
package helloworldapp;

import io.temporal.client.WorkflowClient;
import io.temporal.client.WorkflowOptions;
import io.temporal.serviceclient.WorkflowServiceStubs;

public class InitiateHelloWorld {

    public static void main(String[] args) throws Exception {
        // This gRPC stubs wrapper talks to the local docker instance of the Temporal service.
        WorkflowServiceStubs service = WorkflowServiceStubs.newInstance();
        // WorkflowClient can be used to start, signal, query, cancel, and terminate Workflows.
        WorkflowClient client = WorkflowClient.newInstance(service);
        WorkflowOptions options = WorkflowOptions.newBuilder()
                .setTaskQueue(Shared.HELLO_WORLD_TASK_QUEUE)
                .build();
        // WorkflowStubs enable calls to methods as if the Workflow object is local, but actually perform an RPC.
        HelloWorldWorkflow workflow = client.newWorkflowStub(HelloWorldWorkflow.class, options);
        // Synchronously execute the Workflow and wait for the response.
        String greeting = workflow.getGreeting("World");
        System.out.println(greeting);
        System.exit(0);
    }
}
```
<!--SNIPEND-->
