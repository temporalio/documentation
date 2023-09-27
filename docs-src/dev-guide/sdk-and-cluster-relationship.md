---
id: sdk-and-cluster-relationship
title: The SDK and Temporal Cluster relationship
sidebar_label: SDK and Cluster relationship
description: The SDKs work together with the Cluster to enable durable execution.
tags:
  - explanation
  - temporal-sdk
  - temporal-cluster
  - event-loop
  - replay
---

**How do the Temporal SDKs work with the Temporal Cluster?**

The Temporal Cluster functions more as a choreographer than a conductor. Rather than directly assigning tasks to Workers, the Cluster arranges the Tasks into a Task Queue while Workers poll the Task Queue. Developers may create a fleet of Workers and tune them so that a Task is picked up as soon as it is available. If a Worker goes down, Tasks can wait until the next Worker is available.

A Workflow might request to execute an Activity, start a Timer, or start a Child Workflow, each of which translates into a Command, dispatched to the Temporal Cluster.
In addition to acting on these Commands, the Cluster documents that interaction by appending their corresponding Events into to the Workflow Execution's Event History.

Take for instance the call to execute an Activity. When a Workflow invokes it, the Worker doesn’t immediately execute that Activity code. Instead, it generates a ScheduleActivityTask Command, dispatching it to the Cluster. In response, the Cluster queues up a new Activity Task. Only when a Worker finds itself free, it collects the task and begins executing the Activity code.

The Cluster persists Workflow Execution Event History, so that if there is a failure, the SDK Worker is able to Replay the execution and resume where it left off.

This is where the deterministic constraints of the Workflow code comes into play, requiring the use of Activities to create side effects and interact with the outside world.

Let’s look at an example Workflow with a single Activity.

```go
func LoanApplication(ctx workflow.Context, input *LoanApplicationWorkflowInput) (*LoanApplicationWorkflowResult, error) {

	ctx = workflow.WithActivityOptions(ctx, workflow.ActivityOptions{
		StartToCloseTimeout: time.Minute,
	})

	var result activities.NotifyApplicantActivityResult
	f := workflow.ExecuteActivity(ctx, a.NotifyApplicantActivity, NotifyApplicantActivityInput(*input))

	err := f.Get(ctx, &result)

	// Return the results
	return &l.LoanApplicationState, nil
}

type Activities struct {}

func (a *Activities) NotifyApplicantActivity(ctx context.Context, input *NotifyApplicantActivityInput) (*NotifyApplicantActivityResult, error) {
	var result NotifyApplicantActivityResult

	// Call the thirdparty API and handle the result

	return &result, err
}
```

The Activity above is performing a single call to an external API. Since the call can fail due to transient issues, we define it outside of the Workflow and provide it with retry options.

When you create a new Worker process, the Worker creates a long-lasting connection to the Cluster, polling a Task Queue for Tasks that related to the code it is capable of executing.

![A Worker long polls for Tasks](/diagrams/how-sdk-works-1.svg)

Although the Worker is now running, unless a Workflow is explicitly started, the Task Queue doesn't have any Tasks on it and so, no code executes.
We can use a Temporal Client (Available in Temporal SDKs and the CLI) to start a new Workflow.

![Start a Workflow using a Temporal Client](/diagrams/how-sdk-works-2.svg)

Starting a Workflow Execution creates a new Event, WorkflowExecutionStarted, and adds it to the Workflow Execution's Event History.

The Temporal Cluster then schedules a Workflow Task by adding it to the Task Queue.
When the Worker has capacity, it picks up this Task, and begin executing code.

Each step of the Task, Scheduled, Started, Completed gets recorded into the Event History.

- Scheduled means that the Cluster has added a Task to the Task Queue.
- Started means that the Worker has dequeued the Task.
- Completed means that the Worker finished executing the Task by responding to the Cluster.

When the call to invoke the Activity is evaluated, the Worker suspends executing the code and sends a Command to the Temporal Cluster to schedule an Activity Task.

![Worker suspends code execution and sends a Command to the Cluster](/diagrams/how-sdk-works-3.svg)

When the Worker process can perform more work, it picks up the Activity Task and begins executing the Activity code, which includes the call to the external API.

If the Activity fails, say the API goes down, Temporal will automatically retry the Activity with one second between intervals, as the configurations have defined, an infinite amount of times until the Activity succeeds or is canceled.

In the case where the calls succeeds, and the code completes, the Worker tells the Cluster the Activity Task completed.

![The Worker reports that the Activity Execution completed](/diagrams/how-sdk-works-activity.svg)

Included is any data that was returned from the Activity (results of the API call), which is then persisted in the Workflow Execution Event History, and is now accessible to the Workflow code.

The Cluster creates a new Workflow Task which the Worker picks up.

![The Worker picks up the new Task](/diagrams/how-sdk-works-1.svg)

This is when the SDK Worker Replays the Workflow code, uses the Event History as guidance on what to expect. If the Replay encounters an Event that doesn’t match up with what is expected from the code, a [non-determinism](/references/strongly-typed-errors/non-deterministic-error) error gets thrown.

If there is alignment, the Worker continues evaluating code.

Assuming the Activity Execution is successful, the Workflow now has the result of the Activity and the Worker is able to finish evaluating and executing the Workflow code, responding to the Cluster when complete.

The result of the Workflow can now be retrieved using a Temporal Client.

![The Temporal Client can now access the result of the Workflow](/diagrams/how-sdk-works-4.svg)

And that’s how a Temporal Worker and Cluster work together.
