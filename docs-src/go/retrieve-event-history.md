---
id: retrieve-event-history
title: How to retrieve Workflow Event History
description: Every Workflow Execution has an Event History associated with it, which represents the single source of truth for what transpired during that execution. This section deals with retrieving Event Histories from your Temporal Cluster.
sidebar_label: Retrieving Event History
tags:
  - go sdk
  - developer-guide-doc-type
  - event history
---

Every Workflow Execution has an Event History associated with it, which represents the single source of truth for what transpired during that execution. Since the Temporal Cluster maintains this history, appending new Events based on requests from Clients and Workers, this history represents the Temporal Cluster's perspective about what happened during Workflow Execution.

Event Histories are persisted to the database used by the Temporal Cluster, so they're durable, and will even survive a crash of the Temporal Cluster itself. History information enables developers to investigate Workflow Executions. Although the Event History is stored in the cluster's database, you can access the history of a Workflow Execution from code that uses a Temporal SDK, from Temporal's command-line tool, or from the Web UI.

For an example of retrieving a Workflow Event History, begin by running the sample application from the Go [Foundations](https://docs.temporal.io/dev-guide/go/foundations) guide. You can retrieve the complete application sample from the [Temporal Go Documenation Samples repository](https://github.com/temporalio/documentation-samples-go/), in your `/yourapp` folder:

```shell
git clone https://github.com/temporalio/documentation-samples-go.git
cd documentation-samples-go/yourapp
```

Next, ensure that you're running a Temporal [development Cluster](https://docs.temporal.io/dev-guide/go/project-setup#choose-dev-cluster), then start the Worker Process and the HTTP server from this example, each in a separate terminal:

```shell
go run worker/main_dacx.go
```

```shell
go run gateway/main_dacx.go
```

Once both the Worker process and the HTTP server are running, access `http://localhost:8091/start` using either your browser or `curl`. It will not return any output to the browser or cURL command, but you should receive some output from the running Worker and the HTTP server process:

```output
2023/10/16 09:09:58 Started Workflow!
2023/10/16 09:09:58 WorkflowID: your-workflow-id
2023/10/16 09:09:58 RunID: baeb664e-97b0-468c-b1c8-efeca225e3e6
2023/10/16 09:09:58 {"WFResultFieldX":"Success","WFResultFieldY":1}
```

If you visit the Temporal [Web UI](http://localhost:8233/), you should see an entry for the Workflow that just completed.

![Web UI view of a completed Workflow](/img/webui-view-workflows.png)

You can learn more about working with the Web UI in our [Web UI documentation](https://docs.temporal.io/web-ui), or watch a [Web UI demo](https://www.youtube.com/watch?v=yS-XB2Wghxs) from our [Temporal 101](https://learn.temporal.io/courses/temporal_101/go) course. In the next section, you'll retrieve the Workflow Event History from the CLI.

### Retrieving Event History via CLI

Workflow Event History can be retrieved from the Web UI, by [using the Temporal SDK](https://docs.temporal.io/dev-guide/go/foundations#get-workflow-results) as part of your application, or programmatically via `temporal` CLI commands. This guide provides an example of using the CLI.

To access Workflow Event History from the CLI, use the `temporal workflow show` command. Temporal Workflow IDs are derived from Workflow names, and the name `your-workflow-id` is hardcoded into the sample application you ran in the previous step (in `/gateway/main_dacx.go`), so you should specify the `--workflow-id` you're retrieving the status of, as well as specifying `--output json`. You may also redirect that output to an `> your_workflow_history.json` file:

```shell
temporal workflow show --workflow-id your-workflow-id --output json  > your_workflow_history.json
```

This will produce a response containing each event logged by the Temporal Cluster while executing this Workflow:

```output
{
  "events": [
    {
      "eventId": "1",
      "eventTime": "2023-10-16T16:09:58.293631Z",
      "eventType": "WorkflowExecutionStarted",
      "taskId": "1048587",
      "workflowExecutionStartedEventAttributes": {
        "workflowType": {
          "name": "YourWorkflowDefinition"
        },
        "taskQueue": {
          "name": "your-custom-task-queue-name",
          "kind": "Normal"
        },
```

The Event History acts as an ordered append-only log of Events. In other words, all of the Events in the history are written in sequential order, with each new Event following the last one written. Once an Event is written to history, it is immutable, so neither its details nor its position within the history will change.

If you review the list of events, you will notice many have the `eventType` `WorkflowTaskStarted` or `ActivityTaskScheduled`. These concepts should be familiar from the [Foundations](https://docs.temporal.io/dev-guide/go/foundations) guide. You may also notice that there were no [Replays](https://docs.temporal.io/workflows#replays) logged during execution; each command executed successfully on the first attempt. This is expected, since this app only uses a local HTTP server as an example. Replays are a core Temporal feature, and as you develop more complex Temporal applications, you will be able to observe Replays logged in your Workflow Event History. Some principles to keep in mind include:

• Use workflow IDs, run IDs and replay IDs to detect duplicate events or logic.
• Monitor workflow replays in production - excessive replays may indicate issues.
• Use versioning - changes to workflow logic can break replays. Version workflows and provide backwards compatibility.

:::note

You can also use `temporal workflow count --query 'ExecutionStatus="Running"'` to get a count of all running Workflows. For more `temporal` CLI examples, refer to the [Temporal CLI documentation](https://docs.temporal.io/cli/).

:::

For a complete list of events that can be produced by the Temporal Cluster, refer to the [Event Reference](https://docs.temporal.io/references/events). In the next section, you'll add a Replayer test, so you can understand Replay logging. 

:::caution

The Temporal Cluster begins logging warnings after 10K (10,240) events and will log additional warnings as new Events are appended to the history. If the Event History exceeds 50K (51,200) Events, the Workflow Execution may be terminated. A Workflow Execution may be terminated if the size of any payload (i.e., the input passed into, or the result returned by, an Activity or Workflow) exceeds 2 MB or if the entire Event History exceeds 50 MB.

:::