---
id: index
title: temporal batch index
sidebar_label: batch
description: Operations performed on Batch jobs.
tags:
  - cli reference
  - temporal cli
  - batch
  - cli-feature
  - command-line-interface-cli
---

Batch commands change multiple [Workflow Executions](/concepts/what-is-a-workflow-execution) by providing a [List Filter](/concepts/what-is-visibility) and the type of Batch Job to execute.
The List Filter identifies the Workflow Executions in the Batch Job; the Batch type determines what will happen to the Workflow Executions.

**Which batch operations can be performed by the Temporal CLI?**

There are three types of Batch Jobs:

- Cancel: cancels the Workflow Executions specified by the List Filter.
- Signal: sends a [Signal](/concepts/what-is-a-signal) to the Workflow Executions specified by the List Filter.
- Terminate: terminates the Workflow Executions specified by the List Filter.

Batch operations can affect multiple Workflows simultaneously.
Depending on your needs, you might want to send Signals to running Workflows, Cancel them, or even Terminate them entirely.
Below are examples of how to use the Temporal CLI for each type of Batch operation.

These commands will directly impact the Workflows you target, so it's important to use them judiciously.

You can use the `--query` flag, which acts as [List Filter](/concepts/what-is-a-list-filter), to filter the Workflow Executions to be affected by the Batch Job.

To Cancel Workflows:

```command
temporal workflow cancel \
  --query 'ExecutionStatus = "Running" AND WorkflowType="YourWorkflow"' \
  --reason "Testing"
```

To Signal Workflows:

```command
temporal workflow signal \
  --workflow-id MyWorkflowId \
  --name MySignal \
  --input '{"Input": "As-JSON"}' \
  --query 'ExecutionStatus = "Running" AND WorkflowType="YourWorkflow"' \
  --reason "Testing"
```

To Terminate Workflows:

```command
temporal workflow terminate \
  --query 'ExecutionStatus = "Running" AND WorkflowType="YourWorkflow"' \
  --reason "Testing"
```

A successfully started Batch job will return a Job ID.
Use this Job ID to execute other actions on the Batch job.
