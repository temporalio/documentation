---
id: retrieve-event-history
title: Retrieve a Workflow Execution's Event History
description: Learn how to retrieve your Workflow Execution's Event History
sidebar_label: Retrieve Event History
tags:
  - go sdk
  - developer-guide-doc-type
  - event history
---

There are a few ways to view and download a Workflow Execution's [Event History](/concepts/what-is-an-event-history).
We recommend starting off by using either the Temporal CLI or the Web UI to access it.

### Via Temporal CLI

Use the Temporal CLI's `temporal workflow show` command to save your Workflow Execution's Event History to a local file.
Run the command from the `/tests` directory so that the file saves alongside the other testing files.

```text
/backgroundcheck
    ...
    /tests
        | tests.go
        | backgroundcheck_workflow_history.json
```

**Local dev server**

If you have been following along with the earlier chapters of this guide, your Workflow Id might be something like "backgroundcheck_workflow".

```shell
temporal workflow show \
 --workflow-id backgroundcheck_workflow \
 --namespace backgroundcheck_namespace \
 --output json > backgroundcheck_workflow_event_history.json
```

:::info Workflow Id returns the most recent Workflow Execution

The most recent Event History for that Workflow Id is returned when you only use the Workflow Id to identify the Workflow Execution.
Use the `--run-id` option as well to get the Event History of an earlier Workflow Execution by the same Workflow Id.

:::

If you don't specify an output file, the CLI provides an overview of the Workflow Execution's History, that would look something like this:

```shell
Progress:
  ID          Time                     Type
   1  2023-10-25T20:28:03Z  WorkflowExecutionStarted
   2  2023-10-25T20:28:03Z  WorkflowTaskScheduled
   3  2023-10-25T20:28:03Z  WorkflowTaskStarted
   4  2023-10-25T20:28:03Z  WorkflowTaskCompleted
   5  2023-10-25T20:28:03Z  ActivityTaskScheduled
   6  2023-10-25T20:28:03Z  ActivityTaskStarted
   7  2023-10-25T20:28:03Z  ActivityTaskCompleted
   8  2023-10-25T20:28:03Z  WorkflowTaskScheduled
   9  2023-10-25T20:28:03Z  WorkflowTaskStarted
  10  2023-10-25T20:28:03Z  WorkflowTaskCompleted
  11  2023-10-25T20:28:03Z  WorkflowExecutionCompleted

Result:
  Status: COMPLETED
  Output: ["pass"]
```

**Temporal Cloud**

For Temporal Cloud, remember to either provide the paths to your certificate and private keys as command options, or set those paths as environment variables:

```shell
temporal workflow show \
 --workflow-id backgroundcheck_workflow \
 --namespace backgroundcheck_namespace \
 --tls-cert-path /path/to/ca.pem \
 --tls-key-path /path/to/ca.key \
 --output json  > backgroundcheck_workflow_history.json
```

**Self-hosted Temporal Cluster**

For Self-hosted environments, you might be using the Temporal CLI command alias:

```shell
temporal_docker workflow show \
 --workflow-id backgroundcheck_workflow \
 --namespace backgroundcheck_namespace \
 --output json  > backgroundcheck_workflow_history.json
```

### Via the UI

A Workflow Execution's Event History is also available in the Web UI.

Navigate to the Workflows page in the UI and select the Workflow Execution.

![Select a Workflow Execution from the Workflows page](/img/select-workflow-execution-in-ui.png)

From the Workflow details page you can copy the Event History from the JSON tab and paste it into the `backgroundcheck_workflow_history.json` file.

![Copy Event History JSON object from the Web UI](/img/copy-events-from-workflow-details-page.png)
