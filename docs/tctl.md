---
id: tctl
title: tctl (CLI)
sidebar_label: tctl (CLI)
---

The Temporal CLI is a command-line tool you can use to perform various tasks on a Temporal server. It can perform
namespace operations such as register, update, and describe as well as workflow operations like start
workflow, show workflow history, and signal workflow.

## Using the CLI

The Temporal CLI can be used directly from the Docker Hub image _temporalio/tctl_ or by building the CLI tool
locally.

Example of using the docker image to describe a namespace:

```
docker run --rm temporalio/tctl:0.29.0 --namespace samples-namespace namespace describe
```

On Docker versions 18.03 and later, you may get a "connection refused" error. You can work around this by setting the host to "host.docker.internal" (see [here](https://docs.docker.com/docker-for-mac/networking/#use-cases-and-workarounds) for more info).

```
docker run --network=host --rm temporalio/tctl:0.29.0 --namespace samples-namespace namespace describe
```

To build the CLI tool locally, clone the [Temporal server repo](https://github.com/temporalio/temporal) and run
`make bins`. This produces an executable called `tctl`. With a local build, the same command to
describe a namespace would look like this:

```
./tctl --namespace samples-namespace namespace describe
```

The example commands below will use `./tctl` for brevity.

## Environment variables

Setting environment variables for repeated parameters can shorten the CLI commands.

- **TEMPORAL_CLI_ADDRESS** - host:port for Temporal frontend service, the default is for the local server
- **TEMPORAL_CLI_NAMESPACE** - default workflow namespace, so you don't need to specify `--namespace`

## Quick Start

Run `./tctl` for help on top level commands and global options
Run `./tctl namespace` for help on namespace operations
Run `./tctl workflow` for help on workflow operations
Run `./tctl taskqueue` for help on task queue operations
(`./tctl help`, `./tctl help [namespace|workflow]` will also print help messages)

**Note:** make sure you have a Temporal server running before using CLI

### Namespace operation examples

- Register a new namespace named "samples-namespace":

```
./tctl --namespace samples-namespace namespace register --global_namespace false
# OR using short alias
./tctl --ns samples-namespace n re --gd false
```

- View "samples-namespace" details:

```
./tctl --namespace samples-namespace namespace describe
```

### Workflow operation examples

The following examples assume the TEMPORAL_CLI_NAMESPACE environment variable is set.

#### Run workflow

Start a workflow and see its progress. This command doesn't finish until workflow completes.

```
./tctl workflow run --tq hello-world --wt Workflow --et 60 -i '"temporal"'

# view help messages for workflow run
./tctl workflow run -h
```

Brief explanation:
To run a workflow, the user must specify the following:

1. Task queue name (--tq)
2. Workflow type (--wt)
3. Execution start to close timeout in seconds (--et)
4. Input in JSON format (--i) (optional)

example above uses [this sample workflow](https://github.com/temporalio/go-samples/blob/master/helloworld/helloworld.go)
and takes a string as input with the `-i '"temporal"'` parameter. Single quotes (`''`) are used to wrap input as JSON.

**Note:** You need to start the worker so that the workflow can make progress.
(Run `make && ./bin/helloworld -m worker` in temporal-go-samples to start the worker)

#### Show running workers of a task queue

```
./tctl taskqueue desc --tq hello-world
```

#### Start workflow

```
./tctl workflow start --tq hello-world --wt Workflow --et 60 -i '"temporal"'

# view help messages for workflow start
./tctl workflow start -h

# for a workflow with multiple inputs, separate each json with space/newline like
./tctl workflow start --tq hello-world --wt WorkflowWith3Args --et 60 -i '"your_input_string" 123 {"Name":"my-string", "Age":12345}'
```

The workflow `start` command is similar to the `run` command, but immediately returns the workflow_id and
run_id after starting the workflow. Use the `show` command to view the workflow's history/progress.

##### Reuse the same workflow id when starting/running a workflow

Use option `--workflowidreusepolicy` or `--wrp` to configure the workflow id reuse policy.
**Option 0 AllowDuplicateFailedOnly:** Allow starting a workflow execution using the same workflow Id when a workflow with the same workflow Id is not already running and the last execution close state is one of _[terminated, cancelled, timedout, failed]_.
**Option 1 AllowDuplicate:** Allow starting a workflow execution using the same workflow Id when a workflow with the same workflow Id is not already running.
**Option 2 RejectDuplicate:** Do not allow starting a workflow execution using the same workflow Id as a previous workflow.

```
# use AllowDuplicateFailedOnly option to start a workflow
./tctl workflow start --tq hello-world --wt Workflow --et 60 -i '"temporal"' --wid "<duplicated workflow id>" --wrp 0

# use AllowDuplicate option to run a workflow
./tctl workflow run --tq hello-world --wt Workflow --et 60 -i '"temporal"' --wid "<duplicated workflow id>" --wrp 1
```

##### Start a workflow with a memo

Memos are immutable key/value pairs that can be attached to a workflow run when starting the workflow. These are
visible when listing workflows. More information on memos can be found
[here](/docs/filter-workflows/#memo-vs-search-attributes).

```
tctl wf start -tq hello-world -wt Workflow -et 60 -i '"temporal"' -memo_key ‘“Service” “Env” “Instance”’ -memo ‘“serverName1” “test” 5’
```

#### Show workflow history

```
./tctl workflow show -w 3ea6b242-b23c-4279-bb13-f215661b4717 -r 866ae14c-88cf-4f1e-980f-571e031d71b0
# a shortcut of this is (without -w -r flag)
./tctl workflow showid 3ea6b242-b23c-4279-bb13-f215661b4717 866ae14c-88cf-4f1e-980f-571e031d71b0

# if run_id is not provided, it will show the latest run history of that workflow_id
./tctl workflow show -w 3ea6b242-b23c-4279-bb13-f215661b4717
# a shortcut of this is
./tctl workflow showid 3ea6b242-b23c-4279-bb13-f215661b4717
```

#### Show workflow execution information

```
./tctl workflow describe -w 3ea6b242-b23c-4279-bb13-f215661b4717 -r 866ae14c-88cf-4f1e-980f-571e031d71b0
# a shortcut of this is (without -w -r flag)
./tctl workflow describeid 3ea6b242-b23c-4279-bb13-f215661b4717 866ae14c-88cf-4f1e-980f-571e031d71b0

# if run_id is not provided, it will show the latest workflow execution of that workflow_id
./tctl workflow describe -w 3ea6b242-b23c-4279-bb13-f215661b4717
# a shortcut of this is
./tctl workflow describeid 3ea6b242-b23c-4279-bb13-f215661b4717
```

#### List closed or open workflow executions

```
./tctl workflow list

# default will only show one page, to view more items, use --more flag
./tctl workflow list -m
```

Use **--query** to list workflows with SQL like query:

```
./tctl workflow list --query "WorkflowType='main.SampleParentWorkflow' AND CloseTime = missing "
```

This will return all open workflows with workflowType as "main.SampleParentWorkflow".

#### Query workflow execution

```
# use custom query type
./tctl workflow query -w <wid> -r <rid> --qt <query-type>

# use build-in query type "__stack_trace" which is supported by Temporal SDK
./tctl workflow query -w <wid> -r <rid> --qt __stack_trace
# a shortcut to query using __stack_trace is (without --qt flag)
./tctl workflow stack -w <wid> -r <rid>
```

#### Signal, cancel, terminate workflow

```
# signal
./tctl workflow signal -w <wid> -r <rid> -n <signal-name> -i '"signal-value"'

# cancel
./tctl workflow cancel -w <wid> -r <rid>

# terminate
./tctl workflow terminate -w <wid> -r <rid> --reason
```

Terminating a running workflow execution will record a WorkflowExecutionTerminated event as the closing event in the history. No more decision tasks will be scheduled for a terminated workflow execution.
Canceling a running workflow execution will record a WorkflowExecutionCancelRequested event in the history, and a new decision task will be scheduled. The workflow has a chance to do some clean up work after cancellation.

#### Signal, cancel, terminate workflows as a batch job

Batch job is based on List Workflow Query(**--query**). It supports signal, cancel and terminate as batch job type.
For terminating workflows as batch job, it will terminte the children recursively.

Start a batch job(using signal as batch type):

```
tctl --ns samples-namespace wf batch start --query "WorkflowType='main.SampleParentWorkflow' AND CloseTime=missing" --reason "test" --bt signal --sig testname
This batch job will be operating on 5 workflows.
Please confirm[Yes/No]:yes
{
  "jobId": "<batch-job-id>",
  "msg": "batch job is started"
}

```

You need to remember the JobId or use List command to get all your batch jobs:

```
tctl --ns samples-namespace wf batch list
```

Describe the progress of a batch job:

```
tctl --ns samples-namespace wf batch desc -jid <batch-job-id>
```

Terminate a batch job:

```
tctl --ns samples-namespace wf batch terminate -jid <batch-job-id>
```

Note that the operation performed by a batch will not be rolled back by terminating the batch. However, you can use reset to rollback your workflows.

#### Restart, reset workflow

The Reset command allows resetting a workflow to a particular point and continue running from there.
There are a lot of use cases:

- Rerun a failed workflow from the beginning with the same start parameters.
- Rerun a failed workflow from the failing point without losing the achieved progress(history).
- After deploying new code, reset an open workflow to let the workflow run to different flows.

You can reset to some predefined event types:

```
./tctl workflow reset -w <wid> -r <rid> --reset_type <reset_type> --reason "some_reason"
```

- FirstDecisionCompleted: reset to the beginning of the history.
- LastDecisionCompleted: reset to the end of the history.
- LastContinuedAsNew: reset to the end of the history for the previous run.

If you are familiar with the Temporal history event, You can also reset to any decision finish event by using:

```
./tctl workflow reset -w <wid> -r <rid> --event_id <decision_finish_event_id> --reason "some_reason"
```

Some things to note:

- When reset, a new run will be kicked off with the same workflowId. But if there is a running execution for the workflow(workflowId), the current run will be terminated.
- decision_finish_event_id is the Id of events of the type: DecisionTaskComplete/DecisionTaskFailed/DecisionTaskTimeout.
- To restart a workflow from the beginning, reset to the first decision task finish event.

To reset multiple workflows, you can use batch reset command:

```
./tctl workflow reset-batch --input_file <file_of_workflows_to_reset> --reset_type <reset_type> --reason "some_reason"
```

#### Recovery from bad deployment -- auto-reset workflow

If a bad deployment lets a workflow run into a wrong state, you might want to reset the workflow to the point that the bad deployment started to run. But usually it is not easy to find out all the workflows impacted, and every reset point for each workflow. In this case, auto-reset will automatically reset all the workflows given a bad deployment identifier.

Let's get familiar with some concepts. Each deployment will have an identifier, we call it "**Binary Checksum**" as it is usually generated by the md5sum of a binary file. For a workflow, each binary checksum will be associated with an **auto-reset point**, which contains a **runId**, an **eventID**, and the **created_time** that binary/deployment made the first decision for the workflow.

To find out which **binary checksum** of the bad deployment to reset, you should be aware of at least one workflow running into a bad state. Use the describe command with **--reset_points_only** option to show all the reset points:

```
./tctl wf desc -w <WorkflowId>  --reset_points_only
+----------------------------------+--------------------------------+--------------------------------------+---------+
|         BINARY CHECKSUM          |          CREATE TIME           |                RUNID                 | EVENTID |
+----------------------------------+--------------------------------+--------------------------------------+---------+
| c84c5afa552613a83294793f4e664a7f | 2019-05-24 10:01:00.398455019  | 2dd29ab7-2dd8-4668-83e0-89cae261cfb1 |       4 |
| aae748fdc557a3f873adbe1dd066713f | 2019-05-24 11:01:00.067691445  | d42d21b8-2adb-4313-b069-3837d44d6ce6 |       4 |
...
...
```

Then use this command to tell Temporal to auto-reset all workflows impacted by the bad deployment. The command will store the bad binary checksum into namespace info and trigger a process to reset all your workflows.

```
./tctl --ns <YourNamespace> namespace update --add_bad_binary aae748fdc557a3f873adbe1dd066713f  --reason "rollback bad deployment"
```

As you add the bad binary checksum to your namespace, Temporal will not dispatch any decision tasks to the bad binary. So make sure that you have rolled back to a good deployment(or roll out new bits with bug fixes). Otherwise your workflow can't make any progress after auto-reset.
