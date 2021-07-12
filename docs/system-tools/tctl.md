---
id: tctl
title: Temporal CLI - tctl
sidebar_label: CLI
---

The Temporal CLI is a command-line tool you can use to perform various tasks on a Temporal server.
It can perform namespace operations such as register, update, and describe as well as workflow operations like start
workflow, show workflow history, and signal workflow.

## Install the CLI

There are a few ways to install the CLI.

### Docker Hub image

The Temporal CLI can be used directly from the [Docker Hub image](https://hub.docker.com/r/temporalio/tctl).

:::note

On Docker versions 18.03 and later, you may get a "connection refused" error.
You can work around this by setting the host to "host.docker.internal".
See the [Docker for Mac workarounds page](https://docs.docker.com/docker-for-mac/networking/#use-cases-and-workarounds) for more info.

Example using the Docker image to describe a Namespace without setting host:

```bash
docker run --rm temporalio/tctl:1.10.1 --namespace samples-namespace namespace describe
```

Example setting the host:

```bash
docker run --network=host --rm temporalio/tctl:1.10.1 --namespace samples-namespace namespace describe
```

:::

### Build it locally

To build the CLI tool locally, clone the [Temporal server repo](https://github.com/temporalio/temporal) and run `make bins`. This produces an executable called `tctl`.
With a local build, the command to describe a namespace would look like this:

```bash
./tctl --namespace samples-namespace namespace describe
```

### Brew install

You can also install it using [Homebrew](https://brew.sh/):

```bash
brew install tctl
```

:::note

The example commands below will use `./tctl` for brevity.

:::

## Environment variables

Setting environment variables for repeated parameters can shorten the CLI commands.

- **TEMPORAL_CLI_ADDRESS** - host and port for Temporal frontend service (default: `127.0.0.1:7233`)
- **TEMPORAL_CLI_NAMESPACE** - workflow namespace, so you don't need to specify `--namespace` (default namespace: `default`)
- **TEMPORAL_CLI_TLS_CA** - path to server Certificate Authority certificate file
- **TEMPORAL_CLI_TLS_CERT** - path to public x509 certificate file for mutual TLS authentication
- **TEMPORAL_CLI_TLS_KEY** - path to private key file for mutual TLS authentication

## Quick Start

- Run `./tctl -h` for help on top level commands and global options
- Run `./tctl namespace -h` for help on namespace operations
- Run `./tctl workflow -h` for help on workflow operations
- Run `./tctl taskqueue -h` for help on task queue operations

**Note:** make sure you have a Temporal server running before using CLI

### Namespace operation examples

- Register a new namespace named "samples-namespace":

```bash
./tctl --namespace samples-namespace namespace register
# OR using short alias
./tctl --ns samples-namespace n re
```

- View "samples-namespace" details:

```bash
./tctl --namespace samples-namespace namespace describe
```

### Workflow operation examples

The following examples assume the `TEMPORAL_CLI_NAMESPACE` environment variable is set.

#### Run Workflow

Start a Workflow and see its progress.
This command doesn't finish until Workflow completes.

```bash
./tctl workflow run --tq hello-world --wt Workflow --et 60 -i '"temporal"'

# view help messages for workflow run
./tctl workflow run -h
```

Brief explanation:
To run a Workflow, the user must specify the following:

1. Task queue name (--tq)
2. Workflow type (--wt)
3. Execution start to close timeout in seconds (--et)
4. Input in JSON format (--i) (optional)

The example above uses [this sample Workflow](https://github.com/temporalio/go-samples/blob/master/helloworld/helloworld.go) and takes a string as input with the `-i '"temporal"'` parameter.
Single quotes (`''`) are used to wrap input as JSON.

**Note:** You need to start the worker so that the Workflow can make progress.
(Run `make && ./bin/helloworld -m worker` in temporal-go-samples to start the worker)

#### Show running Workers of a Task Queue

```bash
./tctl taskqueue desc --tq hello-world
```

#### Start Workflow

```bash
./tctl workflow start --tq hello-world --wt Workflow --et 60 -i '"temporal"'

# view help messages for workflow start
./tctl workflow start -h

# for a workflow with multiple inputs, provide a separate -i flag for each of them
./tctl workflow start --tq hello-world --wt WorkflowWith3Args --et 60 -i '"your_input_string"' -i 'null' -i '{"Name":"my-string", "Age":12345}'
```

The Workflow `start` command is similar to the `run` command, but immediately returns the workflow_id and run_id after starting the Workflow. Use the `show` command to view the Workflow's history/progress.

Locally with Docker:

```bash
docker run --network=host --rm temporalio/tctl:1.10.1 workflow run --taskqueue HelloWorldTaskQueue --workflow_type HelloWorld --execution_timeout 3600 --input \"World\"
```

CLI output:

```bash
Running execution:
  Workflow Id : d58237c9-2ae7-4e17-9cbd-311beeedfbe2
  Run Id      : 7a948e0b-0b0a-4aea-9457-994821c7f7be
  Type        : HelloWorld
  Namespace   : default
  Task Queue  : HelloWorldTaskQueue
  Args        : [World]
Progress:
  1, 2020-10-13T20:40:12Z, WorkflowExecutionStarted
  2, 2020-10-13T20:40:12Z, WorkflowTaskScheduled
  3, 2020-10-13T20:40:12Z, WorkflowTaskStarted
  4, 2020-10-13T20:40:12Z, WorkflowTaskCompleted
  5, 2020-10-13T20:40:12Z, WorkflowExecutionCompleted

Result:
  Run Time: 1 seconds
  Status: COMPLETED
  Output: []
```

##### Reuse the same Workflow Id when starting/running a Workflow

Use option `--workflowidreusepolicy` or `--wrp` to configure the Workflow id reuse policy.
There are three:

- **AllowDuplicateFailedOnly:** Allow starting a Workflow execution using the same Workflow Id when a Workflow with the same Workflow Id is not already running and the last execution close state is one of _[terminated, cancelled, timedout, failed]_.
- **AllowDuplicate:** Allow starting a Workflow execution using the same Workflow Id when a Workflow with the same Workflow Id is not already running.
- **RejectDuplicate:** Do not allow starting a Workflow execution using the same Workflow Id as a previous Workflow.

```bash
# use AllowDuplicateFailedOnly option to start a Workflow
./tctl workflow start --tq hello-world --wt Workflow --et 60 -i '"temporal"' --wid "<duplicated workflow id>" --wrp AllowDuplicateFailedOnly

# use AllowDuplicate option to run a workflow
./tctl workflow run --tq hello-world --wt Workflow --et 60 -i '"temporal"' --wid "<duplicated workflow id>" --wrp AllowDuplicate
```

You may also set this inside your workflow code with `WorkflowOptions.WorkflowIdReusePolicy`.

##### Start a Workflow with a memo

Memos are immutable key/value pairs that can be attached to a workflow run when starting the workflow.
These are visible when listing workflows.
More information on memos can be found [here](/docs/server/workflow-search/#memo-vs-search-attributes).

```bash
tctl workflow start \
  -tq hello-world \
  -wt Workflow \
  -et 60 \
  -i '"temporal"' \
  -memo_key '"Service" "Env" "Instance"' \
  -memo '"serverName1" "test" 5'
```

#### Show Workflow history

```bash
./tctl workflow show \
  -w 3ea6b242-b23c-4279-bb13-f215661b4717 \
  -r 866ae14c-88cf-4f1e-980f-571e031d71b0
```

Shortcut without `-w` and `-r` flag:

```bash
./tctl workflow showid 3ea6b242-b23c-4279-bb13-f215661b4717 866ae14c-88cf-4f1e-980f-571e031d71b0
```

If the `run_id` is not provided, the latest run history for the workflow_id:

```bash
./tctl workflow show \
  -w 3ea6b242-b23c-4279-bb13-f215661b4717
```

Shortcut:

```bash
./tctl workflow showid 3ea6b242-b23c-4279-bb13-f215661b4717
```

#### Show Workflow execution information

```bash
./tctl workflow describe -w 3ea6b242-b23c-4279-bb13-f215661b4717 -r 866ae14c-88cf-4f1e-980f-571e031d71b0
# a shortcut of this is (without -w -r flag)
./tctl workflow describeid 3ea6b242-b23c-4279-bb13-f215661b4717 866ae14c-88cf-4f1e-980f-571e031d71b0

# if run_id is not provided, it will show the latest workflow execution of that workflow_id
./tctl workflow describe -w 3ea6b242-b23c-4279-bb13-f215661b4717
# a shortcut of this is
./tctl workflow describeid 3ea6b242-b23c-4279-bb13-f215661b4717
```

#### Query Workflow execution

```bash
# use custom query type
./tctl workflow query -w <wid> -r <rid> --qt <query-type>

# use build-in query type "__stack_trace" which is supported by Temporal SDK
./tctl workflow query -w <wid> -r <rid> --qt __stack_trace
# a shortcut to query using __stack_trace is (without --qt flag)
./tctl workflow stack -w <wid> -r <rid>
```

#### Signal, cancel, terminate Workflow

```bash
# signal
./tctl workflow signal -w <wid> -r <rid> -n <signal-name> -i '"signal-value"'

# cancel
./tctl workflow cancel -w <wid> -r <rid>

# terminate
./tctl workflow terminate -w <wid> -r <rid> --reason
```

Terminating a running Workflow execution will record a WorkflowExecutionTerminated event as the closing event in the history.
No more command tasks will be scheduled for a terminated workflow execution.
Canceling a running workflow execution will record a WorkflowExecutionCancelRequested event in the history, and a new command task will be scheduled.
The workflow has a chance to do some clean up work after cancellation.

#### Signal, cancel, terminate workflows as a batch job

import CustomWarning from "../shared/CustomWarning.js"

<CustomWarning>

Temporal's Batch Jobs feature is considered **experimental** and not subject to normal [versioning and support policy](/docs/server/versions-and-dependencies).

</CustomWarning>

Batch job is based on List Workflow Query(**--query**).
It supports signal, cancel and terminate as batch job type.
For terminating workflows as batch job, it will terminate the children recursively.

Start a batch job(using signal as batch type):

```bash
tctl --ns samples-namespace batch start --query "WorkflowType='main.SampleParentWorkflow' AND CloseTime=missing" --reason "test" --bt signal --sig testname
This batch job will be operating on 5 workflows.
Please confirm[Yes/No]:yes
{
  "jobId": "<batch-job-id>",
  "msg": "batch job is started"
}

```

You need to remember the JobId or use List command to get all your batch jobs:

```bash
tctl --ns samples-namespace batch list
```

Describe the progress of a batch job:

```bash
tctl --ns samples-namespace batch desc -jid <batch-job-id>
```

Terminate a batch job:

```bash
tctl --ns samples-namespace batch terminate -jid <batch-job-id>
```

Note that the operation performed by a batch will not be rolled back by terminating the batch.
However, you can use reset to rollback your workflows.

#### Restart, reset Workflow

The Reset command allows resetting a workflow to a particular point and continue running from there.
There are a lot of use cases:

- Rerun a failed workflow from the beginning with the same start parameters.
- Rerun a failed workflow from the failing point without losing the achieved progress(history).
- After deploying new code, reset an open workflow to let the workflow run to different flows.

You can reset to some predefined event types:

```bash
./tctl workflow reset -w <wid> -r <rid> --reset_type <reset_type> --reason "some_reason"
```

- FirstWorkflowTask: reset to the beginning of the history.
- LastWorkflowTask: reset to the end of the history.
- LastContinuedAsNew: reset to the end of the history for the previous run.
- BadBinary: reset to the point where a bad binary was used.

If you are familiar with the Temporal history event, You can also reset to any command finish event by using:

```bash
./tctl workflow reset -w <wid> -r <rid> --event_id <decision_finish_event_id> --reason "some_reason"
```

Some things to note:

- When reset, a new run will be kicked off with the same workflowId. But if there is a running execution for the workflow(workflowId), the current run will be terminated.
- decision_finish_event_id is the Id of events of the type: DecisionTaskComplete/DecisionTaskFailed/DecisionTaskTimeout.
- To restart a workflow from the beginning, reset to the first command task finish event.

To reset multiple workflows, you can use batch reset command:

```bash
./tctl workflow reset-batch --input_file <file_of_workflows_to_reset> --reset_type <reset_type> --reason "some_reason"
```

#### Recovery from bad deployment -- auto-reset workflow

If a bad deployment lets a workflow run into a wrong state, you might want to reset the workflow to the point that the bad deployment started to run.
But usually it is not easy to find out all the workflows impacted, and every reset point for each workflow.
In this case, auto-reset will automatically reset all the workflows given a bad deployment identifier.

Let's get familiar with some concepts.
Each deployment will have an identifier, we call it "**Binary Checksum**" as it is usually generated by the md5sum of a binary file.
For a workflow, each binary checksum will be associated with an **auto-reset point**, which contains a **runId**, an **eventID**, and the **created_time** that binary/deployment made the first command for the workflow.

To find out which **binary checksum** of the bad deployment to reset, you should be aware of at least one workflow running into a bad state.
Use the describe command with **--reset_points_only** option to show all the reset points:

```bash
./tctl workflow desc -w <WorkflowId>  --reset_points_only
+----------------------------------+--------------------------------+--------------------------------------+---------+
|         BINARY CHECKSUM          |          CREATE TIME           |                RUNID                 | EVENTID |
+----------------------------------+--------------------------------+--------------------------------------+---------+
| c84c5afa552613a83294793f4e664a7f | 2019-05-24 10:01:00.398455019  | 2dd29ab7-2dd8-4668-83e0-89cae261cfb1 |       4 |
| aae748fdc557a3f873adbe1dd066713f | 2019-05-24 11:01:00.067691445  | d42d21b8-2adb-4313-b069-3837d44d6ce6 |       4 |
...
...
```

Then use this command to tell Temporal to auto-reset all Workflows impacted by the bad deployment.
The command will store the bad binary checksum into namespace info and trigger a process to reset all your workflows.

```bash
./tctl --ns <YourNamespace> namespace update --add_bad_binary aae748fdc557a3f873adbe1dd066713f  --reason "rollback bad deployment"
```

As you add the bad binary checksum to your namespace, Temporal will not dispatch any command tasks to the bad binary.
So make sure that you have rolled back to a good deployment(or roll out new bits with bug fixes).
Otherwise your workflow can't make any progress after auto-reset.

#### Secure connection to Temporal cluster

`tctl` supports optional Transport Level Security (TLS) for secure communication with Temporal, authentication of the server, and authentication of the client (mutual TLS).

`--tls_ca_path=<certificate file path>` command line argument that passes a certificate authority (CA) certificate for the validating server that `tctl` is connecting to.

`--tls_cert_path=<certificate file path>` command line argument that passes a client certificate for the server to validate the client (`tctl`) identity. Requires that `--tls_key_path` is also provided.

`--tls_key_path=<private key file path>` command line argument that passes a private key associated with the client certificate supplied with the --tls_cert_path setting.

`--tls_disable_host_verification` command line argument that disables verification of the server certificate, i.e. host verification.

`--tls_server_name=<server name>` command line argument that passes an override value for the target server that is used for TLS host verification.
It also enables host verification. The value must be one of the DNS names listed in the server TLS certificate.

TLS command line arguments can be provided via their respective environment variables to shorten the command line.

## Search Workflows

### List closed or open workflow executions

```bash
tctl workflow list
```

By default only one page is shown.
To view more items, use the `--more` flag.

```bash
tctl workflow list --more
```

Use the `--query` flag to list Workflows using an SQL-like query:

```bash
tctl workflow list \
  --query "WorkflowType='main.SampleParentWorkflow' AND CloseTime = missing"
```

This will return all open Workflows with `workflowType` as `main.SampleParentWorkflow`.

Locally using Docker:

```bash
docker run --network=host --rm temporalio/tctl:1.10.1 workflow list
```

CLI output should be similar to:

```text
  WORKFLOW TYPE |             WORKFLOW ID              |                RUN ID                |     TASK QUEUE      | START TIME | EXECUTION TIME | END TIME
  HelloWorld    | 08c0259f-c1d5-41d9-b51f-8c70c203ccca | f0c04163-833f-490b-99a9-ee48b6199213 | HelloWorldTaskQueue | 20:41:06   | 20:41:06       | 20:41:06
  HelloWorld    | d58237c9-2ae7-4e17-9cbd-311beeedfbe2 | 7a948e0b-0b0a-4aea-9457-994821c7f7be | HelloWorldTaskQueue | 20:40:12   | 20:40:12       | 20:40:12
```

Looking at the Workflow execution history more closely:

```bash
docker run --network=host --rm temporalio/tctl:1.10.1 workflow showid 08c0259f-c1d5-41d9-b51f-8c70c203ccca
```

CLI output:

```text
  1  WorkflowExecutionStarted    {WorkflowType:{Name:HelloWorld}, ParentInitiatedEventId:0,
                                  TaskQueue:{Name:HelloWorldTaskQueue, Kind:Normal},
                                  Input:[Temporal], WorkflowExecutionTimeout:1h0m0s,
                                  WorkflowRunTimeout:1h0m0s, WorkflowTaskTimeout:10s,
                                  Initiator:Unspecified, LastCompletionResult:[],
                                  OriginalExecutionRunId:f0c04163-833f-490b-99a9-ee48b6199213,
                                  Identity:tctl@z0mb1e,
                                  FirstExecutionRunId:f0c04163-833f-490b-99a9-ee48b6199213,
                                  Attempt:1, WorkflowExecutionExpirationTime:2020-10-13
                                  21:41:06.349 +0000 UTC, FirstWorkflowTaskBackoff:0s}
  2  WorkflowTaskScheduled       {TaskQueue:{Name:HelloWorldTaskQueue,
                                  Kind:Normal},
                                  StartToCloseTimeout:10s, Attempt:1}
  3  WorkflowTaskStarted         {ScheduledEventId:2, Identity:15079@z0mb1e,
                                  RequestId:731f7b41-5ae4-42e4-9695-ecd857d571f1}
  4  WorkflowTaskCompleted       {ScheduledEventId:2,
                                  StartedEventId:3,
                                  Identity:15079@z0mb1e}
  5  WorkflowExecutionCompleted  {Result:[],
                                  WorkflowTaskCompletedEventId:4}
```

Even for such a trivial Workflow, the history gives a lot of useful information about all steps that were executed and their inputs.
For complex Workflows this is a really useful tool for production and development troubleshooting.

### List search attributes

You can query the list of search attributes with the following command:

```bash
tctl cluster get-search-attributes
```

Here is some example output:

```bash
+-----------------------+----------+
|         NAME          |   TYPE   |
+-----------------------+----------+
| BinaryChecksums       | Keyword  |
| CloseTime             | Int      |
| CustomBoolField       | Bool     |
| CustomDatetimeField   | Datetime |
| CustomDoubleField     | Double   |
| CustomIntField        | Int      |
| CustomKeywordField    | Keyword  |
| CustomNamespace       | Keyword  |
| CustomStringField     | String   |
| ExecutionStatus       | Int      |
| ExecutionTime         | Int      |
| Operator              | Keyword  |
| RunId                 | Keyword  |
| StartTime             | Int      |
| TaskQueue             | Keyword  |
| TemporalChangeVersion | Keyword  |
| WorkflowId            | Keyword  |
| WorkflowType          | Keyword  |
+-----------------------+----------+
```

### Add new search attributes

Here is how you add a new search attribute:

```bash
tctl admin cluster add-search-attributes --name <NewKey> --type string
```

The possible values for `--type` are:

- string
- keyword
- int
- double
- bool
- datetime

### Start Workflow with Search Attributes

```bash
tctl workflow start \
  --taskqueue helloWorldGroup \
  --workflow_type main.Workflow \
  --execution_timeout 60 \
  --input '"john"' \
  --search_attr_key 'CustomIntField | CustomKeywordField | CustomStringField | CustomBoolField | CustomDatetimeField' \
  --search_attr_value '5 | keyword1 | john test | true | 2019-06-07T16:16:36-08:00'
```

### Search Workflows with List API

```bash
tctl workflow list \
  --query '(CustomKeywordField = "keyword1" and CustomIntField >= 5) or CustomKeywordField = "keyword2"' \
  --print_search_attr
```

```bash
tctl workflow list \
  --query 'CustomKeywordField in ("keyword2", "keyword1") and CustomIntField >= 5 and CloseTime between "2018-06-07T16:16:36-08:00" and "2019-06-07T16:46:34-08:00" order by CustomDatetimeField desc' \
  --print_search_attr
```

To list only open Workflows, add `CloseTime = missing` to the end of the query.

Note that queries can support more than one type of filter:

```bash
tctl workflow list \
  --query 'WorkflowType = "main.Workflow" and (WorkflowId = "1645a588-4772-4dab-b276-5f9db108b3a8" or RunId = "be66519b-5f09-40cd-b2e8-20e4106244dc")'
```

```bash
tctl workflow list \
  --query 'WorkflowType = "main.Workflow" StartTime > "2019-06-07T16:46:34-08:00" and CloseTime = missing'
```

### Workflow Id Uniqueness

Let's take a look at the Workflow Id semantic.
When starting a Workflow without providing an Id, the client generates one in the form of a UUID.
In most real-life scenarios this is not a desired behavior. The business Id should be used instead.
Here, we'll specify the Id when starting a Workflow:

```bash
docker run --network=host --rm temporalio/tctl:1.10.1 workflow start  --workflow_id "HelloTemporal1" --taskqueue HelloWorldTaskQueue --workflow_type HelloWorld --execution_timeout 3600 --input \"Temporal\"
```

CLI output:

```text
Started Workflow Id: HelloTemporal1, run Id: 78ca0a3f-8cd2-46a2-8d23-076c3f0f187c
```

Now the list operation is more meaningful as the WORKFLOW ID is our business Id:

```bash
docker run --network=host --rm temporalio/tctl:1.10.1 workflow list
```

CLI output:

```text
     WORKFLOW TYPE    |      WORKFLOW ID      |                RUN ID                | START TIME | EXECUTION TIME | END TIME
  HelloWorld_sayHello | HelloTemporal1        | 78ca0a3f-8cd2-46a2-8d23-076c3f0f187c | 01:47:24   | 01:47:24       | 01:47:25
```

After the previous Workflow completes, let's try to start another one with the same Id:

```bash
docker run --network=host --rm temporalio/tctl:1.10.1 workflow start  --workflow_id "HelloTemporal1" --taskqueue HelloWorldTaskQueue --workflow_type HelloWorld --execution_timeout 3600 --input \"Temporal\"
```

Output:

```text
Started Workflow Id: HelloTemporal1, run Id: 9b5e36a3-9868-4de5-bbdf-eda9cedcd865
```

After the second start list Workflows with:

```bash
docker run --network=host --rm temporalio/tctl:1.10.1 workflow list
```

CLI output:

```text
  WORKFLOW TYPE |             WORKFLOW ID              |                RUN ID                |     TASK QUEUE      | START TIME | EXECUTION TIME | END TIME
  HelloWorld    | HelloTemporal1                       | 0514b7fe-6ba7-4f94-ad1a-60557018da7b | HelloWorldTaskQueue | 20:44:40   | 20:44:40       | 20:44:40
  HelloWorld    | HelloTemporal1                       | a90989f0-e629-46c8-9dbd-f7e6c374ceea | HelloWorldTaskQueue | 20:43:36   | 20:43:36       | 20:43:36
```

As you can see Workflow Id can be reused while system-generated Run Id uniquely identifies a particular execution of a Workflow.

Note - Under no circumstances does Temporal allow more than one instance of an open Workflow with the same Id.
Multiple Workflow Ids are required in the case that paralell invocations wish to be supported (such as an Actor patern)

### CLI Help

See the CLI help command for all of the options supported:

```bash
docker run --network=host --rm temporalio/tctl:1.10.1 workflow help start
```

CLI output:

```text
NAME:
   tctl workflow start - start a new Workflow execution

USAGE:
   tctl workflow start [command options] [arguments...]

OPTIONS:
   --taskqueue value, --tq value               TaskQueue
   --workflow_id value, --wid value, -w value  WorkflowId
   --workflow_type value, --wt value           WorkflowTypeName
   --execution_timeout value, --et value       Execution start to close timeout in seconds (default: 0)
   --workflow_task_timeout value, --wtt value  Workflow task start to close timeout in seconds (default: 10)
   --cron value                                Optional cron schedule for the Workflow. Cron spec is as following:
                                               ┌───────────── minute (0 - 59)
                                               │ ┌───────────── hour (0 - 23)
                                               │ │ ┌───────────── day of the month (1 - 31)
                                               │ │ │ ┌───────────── month (1 - 12)
                                               │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday)
                                               │ │ │ │ │
                                               * * * * *
   --workflowidreusepolicy value, --wrp value  Configure if the same workflow Id is allowed for use in new Workflow execution. Options: AllowDuplicate, AllowDuplicateFailedOnly, RejectDuplicate
   --input value, -i value                     Optional input for the Workflow in JSON format. If there are multiple parameters, pass each as a separate input flag. Pass "null" for null values
   --input_file value, --if value              Optional input for the Workflow from JSON file. If there are multiple JSON, concatenate them and separate by space or newline. Input from file will be overwrite by input from command line
   --memo_key value                            Optional key of memo. If there are multiple keys, concatenate them and separate by space
   --memo value                                Optional info that can be showed when list Workflow, in JSON format. If there are multiple JSON, concatenate them and separate by space. The order must be same as memo_key
   --memo_file value                           Optional info that can be listed in list Workflow, from JSON format file. If there are multiple JSON, concatenate them and separate by space or newline. The order must be same as memo_key
   --search_attr_key value                     Optional search attributes keys that can be be used in list query. If there are multiple keys, concatenate them and separate by |. Use 'cluster get-search-attr' cmd to list legal keys.
   --search_attr_value value                   Optional search attributes value that can be be used in list query. If there are multiple keys, concatenate them and separate by |. If value is array, use json array like ["a","b"], [1,2], ["true","false"], ["2019-06-07T17:16:34-08:00","2019-06-07T18:16:34-08:00"]. Use 'cluster get-search-attr' cmd to list legal keys and value types
```

## Random

Start a new Workflow execution:

```bash
temporal: docker run --network=host --rm temporalio/tctl:1.10.1 workflow start  --workflow_id "HelloActivityWorker" --taskqueue HelloWorldTaskQueue --workflow_type HelloWorld_sayHello --execution_timeout 3600 --input \"World\"
Started Workflow Id: HelloActivityWorker, run Id: ff015637-b5af-43e8-b3f6-8b6c7b919b62
```

The Workflow is started, but nothing visible happens.
This is expected as the Activity worker is not running. What are the options to understand the currently running Workflow state?

The first option is look at the stack trace:

```text
temporal: docker run --network=host --rm temporalio/tctl:1.10.1 workflow stack  --workflow_id "HelloActivityWorker"
Query result as JSON:
"workflow-root: (BLOCKED on Feature.get)io.temporal.internal.sync.CompletablePromiseImpl.get(CompletablePromiseImpl.java:71)
io.temporal.internal.sync.ActivityStubImpl.execute(ActivityStubImpl.java:58)
io.temporal.internal.sync.ActivityInvocationHandler.lambda$invoke$0(ActivityInvocationHandler.java:87)
io.temporal.internal.sync.ActivityInvocationHandler$$Lambda$25/1816732716.apply(Unknown Source)
io.temporal.internal.sync.ActivityInvocationHandler.invoke(ActivityInvocationHandler.java:94)
com.sun.proxy.$Proxy6.say(Unknown Source)
io.temporal.samples.hello.GettingStarted$HelloWorldImpl.sayHello(GettingStarted.java:55)
sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
"
```

It shows that the Workflow code is blocked on the "say" method of a Proxy object that implements the Activity stub.
You can restart the Workflow worker if you want to make sure that restarting it does not change that.
It works for Activities of any duration.
It is okay for the Workflow code to block on an Activity invocation for a month for example.

Another way to see what exactly happened in the Workflow execution is to look at the Workflow execution history:

```text
temporal: docker run --network=host --rm temporalio/tctl:1.10.1 workflow show  --workflow_id "HelloActivityWorker"
  1  WorkflowExecutionStarted  {WorkflowType:{Name:HelloWorld_sayHello},
                                TaskQueue:{Name:HelloWorldTaskQueue},
                                Input:["World"],
                                ExecutionStartToCloseTimeoutSeconds:3600,
                                TaskStartToCloseTimeoutSeconds:10,
                                ContinuedFailureDetails:[],
                                LastCompletionResult:[],
                                Identity:temporal-cli@linuxkit-025000000001,
                                Attempt:0,
                                FirstDecisionTaskBackoffSeconds:0}
  2  DecisionTaskScheduled     {TaskQueue:{Name:HelloWorldTaskQueue},
                                StartToCloseTimeoutSeconds:10,
                                Attempt:0}
  3  DecisionTaskStarted       {ScheduledEventId:2,
                                Identity:36234@maxim-C02XD0AAJGH6,
                                RequestId:ef645576-7cee-4d2e-9892-597a08b7b01f}
  4  DecisionTaskCompleted     {ExecutionContext:[],
                                ScheduledEventId:2,
                                StartedEventId:3,
                                Identity:36234@maxim-C02XD0AAJGH6}
  5  ActivityTaskScheduled     {ActivityId:0,
                                ActivityType:{Name:HelloWorldActivities_say},
                                TaskQueue:{Name:HelloWorldTaskQueue},
                                Input:["1: Hello World!"],
                                ScheduleToCloseTimeoutSeconds:100,
                                ScheduleToStartTimeoutSeconds:100,
                                StartToCloseTimeoutSeconds:100,
                                HeartbeatTimeoutSeconds:100,
                                DecisionTaskCompletedEventId:4}
```

The last event in the Workflow history is `ActivityTaskScheduled`.
It is recorded when Workflow invoked the Activity, but it wasn't picked up by an Activity worker yet.

Another useful API is `DescribeWorkflowExecution` which, among other information, contains the list of outstanding Activities:

```text
temporal: docker run --network=host --rm temporalio/tctl:1.10.1 workflow describe  --workflow_id "HelloActivityWorker"
{
  "ExecutionConfiguration": {
    "taskQueue": {
      "name": "HelloWorldTaskQueue"
    },
    "executionStartToCloseTimeoutSeconds": 3600,
    "taskStartToCloseTimeoutSeconds": 10,
    "childPolicy": "TERMINATE"
  },
  "WorkflowExecutionInfo": {
    "Execution": {
      "workflowId": "HelloActivityWorker",
      "runId": "ff015637-b5af-43e8-b3f6-8b6c7b919b62"
    },
    "Type": {
      "name": "HelloWorld_sayHello"
    },
    "StartTime": "2019-06-08T23:56:41Z",
    "CloseTime": "1970-01-01T00:00:00Z",
    "Status": null,
    "HistoryLength": 5,
    "ParentNamespaceId": null,
    "ParentExecution": null,
    "AutoResetPoints": {}
  },
  "PendingActivities": [
    {
      "ActivityId": "0",
      "ActivityType": {
        "name": "HelloWorldActivities_say"
      },
      "State": "SCHEDULED",
      "ScheduledTimestamp": "2019-06-08T23:57:00Z"
    }
  ]
}
```

Let's start the Activity worker.
It starts and immediately prints:

```text
1: Hello World!
```

Let's look at the Workflow execution history:

```text
temporal: docker run --network=host --rm temporalio/tctl:1.10.1 workflow show  --workflow_id "HelloActivityWorker"
   1  WorkflowExecutionStarted  {WorkflowType:{Name:HelloWorld_sayHello},
                                TaskQueue:{Name:HelloWorldTaskQueue},
                                Input:["World"],
                                ExecutionStartToCloseTimeoutSeconds:3600,
                                TaskStartToCloseTimeoutSeconds:10,
                                ContinuedFailureDetails:[],
                                LastCompletionResult:[],
                                Identity:temporal-cli@linuxkit-025000000001,
                                Attempt:0,
                                FirstDecisionTaskBackoffSeconds:0}
   2  DecisionTaskScheduled     {TaskQueue:{Name:HelloWorldTaskQueue},
                                StartToCloseTimeoutSeconds:10,
                                Attempt:0}
   3  DecisionTaskStarted       {ScheduledEventId:2,
                                Identity:37694@maxim-C02XD0AAJGH6,
                                RequestId:1d7cba6d-98c8-41fd-91b1-c27dffb21c7f}
   4  DecisionTaskCompleted     {ExecutionContext:[],
                                ScheduledEventId:2,
                                StartedEventId:3,
                                Identity:37694@maxim-C02XD0AAJGH6}
   5  ActivityTaskScheduled     {ActivityId:0,
                                ActivityType:{Name:HelloWorldActivities_say},
                                TaskQueue:{Name:HelloWorldTaskQueue},
                                Input:["1: Hello World!"],
                                ScheduleToCloseTimeoutSeconds:300,
                                ScheduleToStartTimeoutSeconds:300,
                                StartToCloseTimeoutSeconds:300,
                                HeartbeatTimeoutSeconds:300,
                                DecisionTaskCompletedEventId:4}
   6  ActivityTaskStarted       {ScheduledEventId:5,
                                Identity:37784@maxim-C02XD0AAJGH6,
                                RequestId:a646d5d2-566f-4f43-92d7-6689139ce944,
                                Attempt:0}
   7  ActivityTaskCompleted     {Result:[], ScheduledEventId:5,
                                StartedEventId:6,
                                Identity:37784@maxim-C02XD0AAJGH6}
   8  DecisionTaskScheduled     {TaskQueue:{Name:maxim-C02XD0AAJGH6:fd3a85ed-752d-4662-a49d-2665b7667c8a},
                                StartToCloseTimeoutSeconds:10, Attempt:0}
   9  DecisionTaskStarted       {ScheduledEventId:8,
                                Identity:fd3a85ed-752d-4662-a49d-2665b7667c8a,
                                RequestId:601ef30a-0d1b-4400-b034-65b8328ad34c}
  10  DecisionTaskCompleted     {ExecutionContext:[],
                                ScheduledEventId:8,
                                StartedEventId:9,
                                Identity:37694@maxim-C02XD0AAJGH6}
```

_ActivityTaskStarted_ event is recorded when the Activity task is picked up by an Activity worker.
The Identity field contains the Id of the worker (you can set it to any value on worker startup).

_ActivityTaskCompleted_ event is recorded when Activity completes.
It contains the result of the Activity execution.

Let's look at various failure scenarios.

## Signals

```bash
docker run --network=host --rm temporalio/tctl:1.10.1 workflow start  --workflow_id "HelloSignal" --taskqueue HelloWorldTaskQueue --workflow_type HelloWorld --execution_timeout 3600 --input \"World\"
```

Worker output:

```text
13:57:44.258 [workflow-method] INFO  c.t.s.javaquickstart.GettingStarted - 1: Hello World!
```

Let's send a signal using CLI:

```bash
docker run --network=host --rm temporalio/tctl:1.10.1 workflow signal --workflow_id "HelloSignal" --name "updateGreeting" --input \"Hi\"
```

Worker output:

```text
13:57:44.258 [workflow-method] INFO  c.t.s.javaquickstart.GettingStarted - 1: Hello World!
13:58:22.352 [workflow-method] INFO  c.t.s.javaquickstart.GettingStarted - 2: Hi World!
```

Try sending the same signal with the same input again.
Note that the output doesn't change. This happens because the await condition doesn't unblock when it sees the same value. But a new greeting unblocks it:

```bash
docker run --network=host --rm temporalio/tctl:1.10.1 workflow signal --workflow_id "HelloSignal" --name "updateGreeting" --input \"Welcome\"
```

Worker output:

```text
13:57:44.258 [workflow-method] INFO  c.t.s.javaquickstart.GettingStarted - 1: Hello World!
13:58:22.352 [workflow-method] INFO  c.t.s.javaquickstart.GettingStarted - 2: Hi World!
13:59:29.097 [workflow-method] INFO  c.t.s.javaquickstart.GettingStarted - 3: Welcome World!
```

Now shut down the worker and send the same signal again:

```bash
docker run --network=host --rm temporalio/tctl:1.10.1 workflow signal --workflow_id "HelloSignal" --name "updateGreeting" --input \"Welcome\"
```

CLI output:

```text
Signal workflow succeeded.
```

Note that sending signals as well as starting Workflows does not need a worker running.
The requests are queued inside the Temporal server.

Now bring the worker back. Note that it doesn't log anything besides the standard startup messages.
This occurs because it ignores the queued signal that contains the same input as the current value of greeting.
Note that the restart of the worker didn't affect the Workflow execution.
It is still blocked on the same line of code as before the failure.
This is the most important feature of Temporal.
The Workflow code doesn't need to deal with worker failures at all.
Its state is fully recovered to its current state that includes all the local variables and threads.

Let's look at the line where the Workflow is blocked:

```bash
docker run --network=host --rm temporalio/tctl:1.10.1 workflow stack --workflow_id HelloSignal
```

CLI output:

```text
Query result:
[workflow-method: (BLOCKED on await)
app//io.temporal.internal.sync.WorkflowThreadContext.yield(WorkflowThreadContext.java:79)
app//io.temporal.internal.sync.WorkflowThreadImpl.yield(WorkflowThreadImpl.java:402)
app//io.temporal.internal.sync.WorkflowThread.await(WorkflowThread.java:45)
app//io.temporal.internal.sync.SyncWorkflowContext.await(SyncWorkflowContext.java:775)
app//io.temporal.internal.sync.WorkflowInternal.await(WorkflowInternal.java:274)
app//io.temporal.workflow.Workflow.await(Workflow.java:748)
app//com.temporal.samples.javaquickstart.GettingStarted$HelloWorldImpl.sayHello(GettingStarted.java:34)
java.base@14.0.1/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
java.base@14.0.1/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
java.base@14.0.1/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
java.base@14.0.1/java.lang.reflect.Method.invoke(Method.java:564)
app//io.temporal.internal.sync.POJOWorkflowImplementationFactory$POJOWorkflowImplementation$RootWorkflowInboundCallsInterceptor.execute(POJOWorkflowImplementationFactory.java:289)
]
```

Yes, indeed the Workflow is blocked on await.
Stack feature works for any open Workflow, greatly simplifying troubleshooting in production.
Let's complete the Workflow by sending a signal with a "Bye" greeting:

```bash
docker run --network=host --rm temporalio/tctl:1.10.1 workflow signal --workflow_id "HelloSignal" --name "updateGreeting" --input \"Bye\"
```

You can make sure that Workflow execution has been completed by looking at the Workflow execution history:

```bash
docker run --network=host --rm temporalio/tctl:1.10.1 workflow showid HelloSignal
```

Note that the value of the count variable was not lost during the restart.
This is one of key features of temporal, which allows us to restore Workflow state on any worker based on previous Workflow events.

Also note that while a single worker instance was used for this walkthrough, any real production deployment has multiple worker instances running.
So any worker failure or restart does not delay any Workflow execution because it is just migrated to any other available worker.

```bash
temporal: docker run --network=host --rm temporalio/tctl:1.10.1 workflow start  --workflow_id "HelloQuery" --taskqueue HelloWorldTaskQueue --workflow_type HelloWorld --execution_timeout 3600 --input \"World\"
Started Workflow Id: HelloQuery, run Id: 1925f668-45b5-4405-8cba-74f7c68c3135
temporal: docker run --network=host --rm temporalio/tctl:1.10.1 workflow signal --workflow_id "HelloQuery" --name "updateGreeting" --input \"Hi\"
Signal workflow succeeded.
temporal: docker run --network=host --rm temporalio/tctl:1.10.1 workflow signal --workflow_id "HelloQuery" --name "updateGreeting" --input \"Welcome\"
Signal workflow succeeded.
```

The worker output:

```text
17:35:50.485 [workflow-root] INFO  c.u.c.samples.hello.GettingStarted - 1: Hello World!
17:36:10.483 [workflow-root] INFO  c.u.c.samples.hello.GettingStarted - 2: Hi World!
17:36:16.204 [workflow-root] INFO  c.u.c.samples.hello.GettingStarted - 3: Welcome World!
```

## Queries

Now let's query the Workflow using the CLI:

```bash
temporal: docker run --network=host --rm temporalio/tctl:1.10.1 workflow query --workflow_id "HelloQuery" --query_type "getCount"
Query result as JSON:
3
```

One limitation of the query is that it requires a worker process running because it is executing callback code.
An interesting feature of the query is that it works for completed Workflows as well.
Let's complete the Workflow by sending "Bye" and query it.

```bash
temporal: docker run --network=host --rm temporalio/tctl:1.10.1 workflow signal --workflow_id "HelloQuery" --name "updateGreeting" --input \"Bye\"
Signal workflow succeeded.
temporal: docker run --network=host --rm temporalio/tctl:1.10.1 workflow query --workflow_id "HelloQuery" --query_type "getCount"
Query result as JSON:
4
```

The Query method can accept parameters.
This might be useful if only part of the Workflow state should be returned.
