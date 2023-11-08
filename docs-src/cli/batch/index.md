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

There are three types of Batch Jobs:

- Cancel: cancels the Workflow Executions specified by the List Filter.
- Signal: sends a [Signal](/concepts/what-is-a-signal) to the Workflow Executions specified by the List Filter.
- Terminate: terminates the Workflow Executions specified by the List Filter.

Batch operations can affect multiple Workflows simultaneously.
Depending on your needs, you might want to send Signals to running Workflows, Cancel them, or even Terminate them entirely.
Below, are examples on these commands using Temporal's CLI for each type of Batch operation.

Using these commands will directly impact the Workflows you target, so it's important to use them judiciously.

**What Are the CLI Commands for Batch operations in Temporal Workflows?**

You can use the `--query` flag to filter the Workflow Executions to be affected by the Batch Job.

To Cancel a Workflow

```command
temporal workflow cancel \
  --query 'ExecutionStatus = "Running" AND WorkflowType="YourWorkflow"' \
  --reason "Testing"
```

To Signal a Workflow:

```command
temporal workflow signal \
  --workflow-id MyWorkflowId \
  --name MySignal \
  --input '{"Input": "As-JSON"}' \
  --query 'ExecutionStatus = "Running" AND WorkflowType="YourWorkflow"' \
  --reason "Testing"
```

To Terminate a Workflow:

```command
temporal workflow terminate \
  --query 'ExecutionStatus = "Running" AND WorkflowType="YourWorkflow"' \
  --reason "Testing"
```

A successfully started Batch job will return a Job ID.
Use this Job ID to execute other actions on the Batch job.
