---
id: interrupt-workflow
title: Interrupt a Workflow - Ruby SDK
sidebar_label: Interrupt a Workflow
description:
  Interrupt Workflow Execution in Ruby using the Temporal SDK. Cancel for graceful stops; terminate for forceful stops.
  Handle Cancellation in Workflow and Activities efficiently.
toc_max_heading_level: 4
keywords:
  - interrupt workflow execution
  - cancel workflow
  - terminate workflow
  - temporal cancellation
  - temporal termination
  - workflow execution
  - cancellation token
  - workflow handle
  - ruby examples
tags:
  - Workflows
  - Ruby SDK
  - Temporal SDKs
---

This page shows how to interrupt a Workflow Execution.

You can interrupt a Workflow Execution in one of the following ways:

- [Cancel](#cancellation): Canceling a Workflow provides a graceful way to stop Workflow Execution.
- [Terminate](#termination): Terminating a Workflow forcefully stops Workflow Execution.

Terminating a Workflow forcefully stops Workflow Execution. This action resembles killing a process.

- The system records a `WorkflowExecutionTerminated` event in the Workflow History.
- The termination forcefully and immediately stops the Workflow Execution.
- The Workflow code gets no chance to handle termination.
- A Workflow Task doesn't get scheduled.

In most cases, canceling is preferable because it allows the Workflow to finish gracefully. Terminate only if the
Workflow is stuck and cannot be canceled normally.

## Cancellation {#cancellation}

To give a Workflow and its Activities the ability to be cancelled, do the following:

- Handle a Cancellation request within a Workflow.
- Set Activity Heartbeat Timeouts.
- Listen for and handle a Cancellation request within an Activity.
- Send a Cancellation request from a Temporal Client.

## Handle Cancellation in Workflow {#handle-cancellation-in-workflow}

Workflow Definitions can be written to respond to cancellation requests. It is common for an Activity to be run on
Cancellation to perform cleanup.

Cancellation Requests on Workflows cancel the `Temporalio::Workflow.cancellation` which is a `Temporalio::Cancellation`
that effectively serves as a cancellation token. This is the cancellation that is implicitly used for all calls within
the workflow as well (e.g. Timers, Activities, etc) and therefore cancellation is propagated to them to be handled and
bubble out.

```ruby
class MyWorkflow < Temporalio::Workflow::Definition
  def execute
    # Whether this workflow waits on the activity to handle the cancellation or not is
    # dependent upon the cancellation_type parameter. We leave the default here which
    # sends the cancellation but does not wait on it to be handled.
    Temporalio::Workflow.execute_activity(MyActivity, start_to_close_timeout: 100)
  rescue Temporalio::Error => e
    # For this sample, we only want to execute cleanup when it's a cancellation
    raise unless Temporalio::Error.canceled?(e)

    # Call a cleanup activity. We have to do this with a new/detached cancellation
    # because the default workflow-level one is already canceled at this point.
    Temporalio::Workflow.execute_activity(
      MyCleanupActivity,
      start_to_close_timeout: 100,
      cancellation: Temporalio::Cancellation.new
    )

    # Re-raise the original exception
    raise
  end
end
```

## Handle Cancellation in an Activity {#handle-cancellation-in-an-activity}

Ensure that the Activity is [Heartbeating](/develop/ruby/failure-detection#activity-heartbeats) to receive the
Cancellation request and stop execution. Also make sure that the
[Heartbeat Timeout](/develop/ruby/failure-detection#heartbeat-timeout) is set on the Activity Options when calling from
the Workflow. An Activity Cancellation Request raises a `Temporalio::Error::CanceledError` in the Activity.

```ruby
class MyActivity < Temporalio::Activity::Definition
  def execute
    # This is a naive loop simulating work, but similar heartbeat/cancellation logic
    # applies to other scenarios as well
    loop do
      # Send heartbeat
      Temporalio::Activity::Context.current.heartbeat
      # Sleep before heartbeating again
      sleep(3)
    end
  rescue Temporalio::Error::CanceledError
    raise 'Canceled!'
  end
end
```

## Request Cancellation {#request-cancellation}

Use `cancel` on the `WorkflowHandle` to cancel a Workflow Execution.

```ruby
# Get a workflow handle by its workflow ID. This could be made specific to a run by
# passing run ID. This could also just be a handle that is returned from
# start_workflow instead.
handle = my_client.workflow_handle('my-workflow-id')

# Send cancellation. This returns when cancellation is received by the server. Wait on
# the handle's result to wait for cancellation to be applied.
handle.cancel
```

By default, Activities are automatically cancelled when the Workflow is cancelled since the workflow cancellation is
used by activities by default. To issue a cancellation explicitly, a new cancellation token can be created.

```ruby
class MyWorkflow < Temporalio::Workflow::Definition
  def execute
    # Create a new cancellation linked to the workflow one, so that it inherits
    # cancellation that comes from the workflow. Users can choose to make it
    # completely detached by not providing a parent.
    cancellation, cancel_proc = Temporalio::Cancellation.new(
      Temporalio::Workflow.cancellation
    )

    # Start the activity in the background. Whether this workflow waits on the activity
    # to handle the cancellation or not is dependent upon the cancellation_type
    # parameter. We leave the default here which sends the cancellation but does not wait
    # on it to be handled.
    future = Temporalio::Future.new do
      Temporalio::Workflow.execute_activity(
        MyActivity,
        start_to_close_timeout: 100,
        cancellation:
      )
    end

    # Wait 5 minutes, then cancel it
    Temporalio::Workflow.sleep(5 * 60)
    cancel_proc.call

    # Wait on the activity which will raise an activity error with a cause of
    # cancellation which will fail the workflow
    future.wait
  end
end
```

## Termination {#termination}

To Terminate a Workflow Execution in Ruby, use the `terminate` method on the Workflow handle.

```ruby
# Get a workflow handle by its workflow ID. This could be made specific to a run by
# passing run ID. This could also just be a handle that is returned from
# start_workflow instead.
handle = my_client.workflow_handle('my-workflow-id')

# Terminate
handle.terminate
```

Workflow Executions can also be Terminated directly from the WebUI. In this case, a custom note can be logged from the
UI when that happens.

## Reset a Workflow Execution {#reset}

Resetting a Workflow Execution terminates the current Workflow Execution and starts a new Workflow Execution from a
point you specify in its Event History. Use reset when a Workflow is blocked due to a non-deterministic error or other
issues that prevent it from completing.

When you reset a Workflow, the Event History up to the reset point is copied to the new Workflow Execution, and the
Workflow resumes from that point with the current code. Reset only works if you've fixed the underlying issue, such as
removing non-deterministic code. Any progress made after the reset point will be discarded. Provide a reason when
resetting, as it will be recorded in the Event History.

<Tabs>

<TabItem value="web-ui" label="Web UI">

1. Navigate to the Workflow Execution details page,
2. Click the **Reset** button in the top right dropdown menu,
3. Select the Event ID to reset to,
4. Provide a reason for the reset,
5. Confirm the reset.

The Web UI shows available reset points and creates a link to the new Workflow Execution after the reset completes.

</TabItem>

<TabItem value="cli" label="Temporal CLI">

Use the `temporal workflow reset` command to reset a Workflow Execution:

```bash
temporal workflow reset \
    --workflow-id <workflow-id> \
    --event-id <event-id> \
    --reason "Reason for reset"
```

For example:

```bash
temporal workflow reset \
    --workflow-id my-background-check \
    --event-id 4 \
    --reason "Fixed non-deterministic code"
```

By default, the command resets the latest Workflow Execution in the `default` Namespace. Use `--run-id` to reset a
specific run. Use `--namespace` to specify a different Namespace:

```bash
temporal workflow reset \
    --workflow-id my-background-check \
    --event-id 4 \
    --reason "Fixed non-deterministic code" \
    --namespace my-namespace \
    --tls-cert-path /path/to/cert.pem \
    --tls-key-path /path/to/key.pem
```

Monitor the new Workflow Execution after resetting to ensure it completes successfully.

</TabItem>

</Tabs>
