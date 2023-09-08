---
id: major-components
title: Temporal SDKs major components
description: Temporal SDKs provide developers with a Temporal Client to communicate with a Temporal Cluster, APIs to define Workflows, APIs to configure and start Workers, APIs to customize Activity Executions, and a common library for code that’s used across your application.
sidebar_label: Major components
tags:
  - temporal sdk
  - explanation
  - components
---

**What are the major components of Temporal SDKs?**

Temporal SDKs offer developers with the following:

- A Temporal Client to communicate with a Temporal Cluster
- APIs to develop application code Workflows & Activities
- APIs to configure and run Workers
- A common library for code that’s used across the Client, Worker, and Workflow

![Temporal SDK components create a runtime across your environment and a Temporal Cluster](/diagrams/temporal-sdk-components.svg)

Let’s break down each one.

### Temporal Client

A Temporal Client acts as a bridge of communication between the systems outside of Temporal and your application.
The Client performs key functions that facilitate the execution of, management of, and communication with Workflows.

The following code is an example using the Go SDK.
It showcases how to initialize a Temporal Client, create a connection to a local Temporal Cluster, and start a Workflow Execution:

:::caution Do not copy and use code

The following code is for example purposes only.
For tested code samples and best practices, use your preferred language SDK's developer's guide.

:::

```go
package main

import (
	"context"

	"go.temporal.io/sdk/client"
)

func main() {
  // Temporal Client setup code
	c, err := client.NewClient(client.Options{})
	if err != nil {
		log.Fatalln("Unable to create client", err)
	}
	defer c.Close()
  // Prepare Workflow option and parameters
	workflowOptions := client.StartWorkflowOptions{
		ID:        "loan-application-1",
		TaskQueue: "loan-application-task-queue",
	}
	applicantDetails := ApplicantDetails{
		// ...
	}
  // Start the Workflow
	workflowRun, err := c.ExecuteWorkflow(context.Background(), workflowOptions, "loan-application-workflow", applicantDetails)
	if err != nil {
		// ...
	}
	// ...
}
```

Developers can then use the Client as the main entry point for interacting with the application through Temporal.
From here, developers can now start or Signal Workflows, query the Workflow state etc.
We can see in the example above how the developer has used the provided start method to start the Workflow upon the running of the function.

### APIs to Develop Workflows

Workflows are defined as code as either a function or an object method, depending on the language.

For example, the following is a valid Temporal Workflow in Go:

:::caution Do not copy and use code

The following code is for example purposes only.
For tested code samples and best practices, use your preferred language SDK's developer's guide.

:::

```go
func LoanApplication(ctx context.Context) (error) {
	// ...
	return nil
}
```

The Workflow code uses Temporal SDK APIs to orchestrate the steps of the application.

:::caution Do not copy and use code

The following code is for example purposes only.
For tested code samples and best practices, use your preferred language SDK's developer's guide.

:::

```go
func LoanApplication(ctx workflow.Context, input *LoanApplicationWorkflowInput) (*LoanApplicationWorkflowResult, error) {
	// ...
	var result activities.CreditCheckResult
	f := workflow.ExecuteActivity(ctx, a.CreditCheck, CreditCheckInput(*input))
	err := f.Get(ctx, &result)
	// ...
	// Return the results
	return &loanApplicationResults, nil
}
```

A Workflow executes Activities (other functions), handles and sends messages (Queries, Signals, Updates), and interacts with other Workflows.

This Workflow code, while executing, can be paused, resumed, and migrated across physical machines without losing state.

When a Workflow calls the API to execute an Activity, the Worker sends a [Command](https://docs.temporal.io/references/commands) back to the Cluster. The Cluster creates Activity Tasks in response which the same or a different Worker can then pick up and begin executing. In this way, the Worker and Cluster work together to incrementally execute Workflow code in a reliable way.
We discuss this more in detail in [How the SDKs work] section.

The SDK APIs also enable developers to write code that more genuinely maps to their process. This is because without a specialized SDK, developers might have to write a lot of boilerplate code. This can lead to code that's hard to maintain, difficult to understand, or that doesn't directly correspond to the underlying business process.

For example, the bank loan application Workflow might actually look like this:

:::caution Do not copy and use code

The following code is for example purposes only.
For tested code samples and best practices, use your preferred language SDK's developer's guide.

:::

```go
// LoanApplicationWorkflow is the workflow definition.
func LoanApplicationWorkflow(ctx workflow.Context, applicantName string, loanAmount int) (string, error) {
	// Step 1: Notify the applicant that the application process has started
	err := workflow.ExecuteActivity(ctx, NotifyApplicantActivity, applicantName, "Application process started").Get(ctx, nil)
	if err != nil {
		return "", err
	}

	// Step 2: Perform a credit check
	var creditCheckResult string
	err = workflow.ExecuteActivity(ctx, LoanCreditCheckActivity, loanAmount).Get(ctx, &creditCheckResult)
	if err != nil {
		return "", err
	}

	// Step 3: Perform an automatic approval check
	var approvalCheckResult string
	err = workflow.ExecuteActivity(ctx, AutomaticApprovalCheckActivity, creditCheckResult).Get(ctx, &approvalCheckResult)
	if err != nil {
		return "", err
	}

	// Step 4: Notify the applicant of the decision
	var notificationResult string
	err = workflow.ExecuteActivity(ctx, NotifyApplicantActivity, applicantName, approvalCheckResult).Get(ctx, &notificationResult)
	if err != nil {
		return "", err
	}

	return notificationResult, nil
}
```

The level of abstraction that APIs offer enables the developer to focus on business logic without having to worry about the intricacies of distributed computing such as retries, or having to explicitly maintain a state machine and the intermediate state for each step of the process.

Additionally, the state of the Workflow is automatically persisted so if a failure does occur, it may resume right where it left off.

### APIs to create and manage Worker Processes

Workers are responsible for executing Workflow and Activity code (application code). The SDK provides APIs for configuring and starting Workers, enabling developers to control how the code is executed.
Workers are horizontally scalable, often run with systems like Kubernetes, and configured according to the application’s needs.

Here is an example of how you could initialize a Worker using the Go SDK.

:::caution Do not copy and use code

The following code is for example purposes only.
For tested code samples and best practices, use your preferred language SDK's developer's guide.

:::

```go
func main() {
    // Create the client object just once per process
    c, err := client.NewClient(client.Options{})
    if err != nil {
        log.Fatalln("Unable to create Temporal client", err)
    }
    defer c.Close()

    // Create the Worker instance
    w := worker.New(c, "loan-application-task-queue", worker.Options{})

    // Register the workflow and activity with the worker
    w.RegisterWorkflow(LoanApplicationWorkflow)
    w.RegisterActivity(LoanCreditCheck)

    // Start listening to the Task Queue
    err = w.Run(worker.InterruptCh())
    if err != nil {
        log.Fatalln("Unable to start Worker", err)
    }
}
```

The Worker polls on the specified Task Queue, processing those Tasks, and reporting the results back to the Temporal Cluster. They execute both the Workflows and Activities, and the SDK ensures that they perform these tasks efficiently and reliably.

### APIs to customize Activity Execution behavior

Activities in Temporal are individual units of work that often represent non-deterministic parts of the code logic, such as querying a database or calling an external service. The SDK provides APIs to customize the behavior of an Activity Execution.

By default, if an Activity attempts to communicate with another system and encounters a transient failure like a network issue, Temporal ensures the Activity is tried again automatically.

However, Temporal enables developers to control a variety of timeouts, a Retry Policy, Heartbeat monitoring, and asynchronous completion.

The following code is an example of a custom set of Activity Execution options that affect the timeout and retry behavior of the execution, should the Activity encounter a failure.

This code is for example purposes only; for best practices and tested samples, use the developer’s guide.

:::caution Do not copy and use code

The following code is for example purposes only.
For tested code samples and best practices, use your preferred language SDK's developer's guide.

:::

```go
// LoanApplicationWorkflow is the Workflow Definition.
func LoanApplicationWorkflow(ctx workflow.Context, applicantName string, loanAmount int) (string, error) {
    // ...
    var creditCheckResult string
    // set a Retry Policy
    ao := workflow.ActivityOptions{
		    ScheduleToCloseTimeout: time.Hour,
		    HeartbeatTimeout:       time.Minute,
		    RetryPolicy: &temporal.RetryPolicy{
		        InitialInterval:    time.Second,
		        BackoffCoefficient: 2,
		        MaximumInterval:    time.Minute,
		        MaximumAttempts:    5,
		    },
		}
    ctx = workflow.WithActivityOptions(ctx, ao)
    err = workflow.ExecuteActivity(ctx, LoanCreditCheckActivity, loanAmount).Get(ctx, &creditCheckResult)
    if err != nil {
        return "", err
    }
		// ...
    return notificationResult, nil
}

// LoanCreditCheckActivity is an Activity function that performs a credit check.
func LoanCreditCheckActivity(ctx context.Context, loanAmount int) (string, error) {
	// ... your logic here ...
	return "Credit check passed", nil
}
```
