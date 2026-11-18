---
id: worker
title: Temporal CLI worker command reference
sidebar_label: worker
description: Learn how to read or modify state associated with a Worker, such as Worker Deployments.
toc_max_heading_level: 6
tags:
  - Temporal CLI
---

{/* NOTE: This is an auto-generated file. Any edit to this file will be overwritten.
This file is generated from the CLI command definitions via cmd/gen-docs. */}

This page provides a reference for the `temporal` CLI `worker` command. The flags applicable to each subcommand are presented in a table within the heading for the subcommand. Refer to [Global Flags](#global-flags) for flags that you can use with every subcommand.

## count

Show a count of workers in a namespace. Use `--query` to count a subset:

```
temporal worker count --namespace YourNamespace --query 'TaskQueue="YourTaskQueue"'
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--include-system-workers` | No | **bool** Include system workers created by the server. |
| `--query`, `-q` | No | **string** Content for an SQL-like `QUERY` List Filter. |

## deployment

Deployment commands perform operations on Worker Deployments:

```
temporal worker deployment [command] [options]
```

For example:

```
temporal worker deployment list
```

Lists the Deployments in the client's namespace.

Arguments can be Worker Deployment Versions associated with
a Deployment, specified using the Deployment name and Build ID.

For example:

```
temporal worker deployment set-current-version \
         --deployment-name YourDeploymentName --build-id YourBuildID
```

Sets the current Deployment Version for a given Deployment.

### create

Create a new Worker Deployment:

```
temporal worker deployment create [options]
```

Worker Deployments are lazily created the first time a Worker polls the
Temporal Server and specifies a VersionOverride. However, if you need to
pre-define a compute configuration (for instance to set up a serverless
Worker), you need to call `temporal worker deployment create-version` and
pass in the name of the Worker Deployment. The `temporal worker
deployment create` command allows you to pre-define a Worker Deployment
so that calls to `temporal worker deployment create-version` will
succeed.

If a Worker Deployment with the supplied name already exists, this
command will return an error.

Note: This is an experimental feature and may change in the future.

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--name`, `-d` | Yes | **string** Name for a Worker Deployment. |

### create-version


Create a new Worker Deployment Version:

```
temporal worker deployment create-version [options]
```

Configure a Worker Deployment Version's compute configuration as needed.
For example, pass compute provider information for an AWS Lambda function
that spawns a Worker in the Worker Deployment:

```
temporal worker deployment create-version \
    --namespace YourNamespaceName \
    --deployment-name YourDeploymentName \
    --build-id YourBuildID \
    --aws-lambda-function-arn LambdaFunctionARN \
    --aws-lambda-assume-role-arn LambdaAssumeRoleARN \
    --aws-lambda-assume-role-external-id LambdaAssumeRoleExternalID
```

Or pass compute provider information for an AWS Bedrock Agentcore Runtime
that spawns a Worker in the Worker Deployment:

```
temporal worker deployment create-version \
    --namespace YourNamespaceName \
    --deployment-name YourDeploymentName \
    --build-id YourBuildID \
    --aws-agentcore-endpoint-arn AgentcoreRuntimeEndpointARN \
    --aws-agentcore-assume-role-arn AgentcoreAssumeRoleARN \
    --aws-agentcore-assume-role-external-id AgentcoreAssumeRoleExternalID
```

Or pass compute provider information for a GCP Cloud Run worker pool
that spawns a Worker in the Worker Deployment:

```
temporal worker deployment create-version \
    --namespace YourNamespaceName \
    --deployment-name YourDeploymentName \
    --build-id YourBuildID \
    --gcp-cloud-run-project YourGCPProject \
    --gcp-cloud-run-region us-central1 \
    --gcp-cloud-run-worker-pool YourWorkerPool \
    --gcp-cloud-run-service-account customer-sa@proj.iam.gserviceaccount.com \
    --gcp-cloud-run-min-instances 1 \
    --gcp-cloud-run-max-instances 3 \
    --gcp-cloud-run-initial-instances 1 \
    --gcp-cloud-run-utilization-target 0.75 \
    --gcp-cloud-run-scale-down-stabilization-duration 5m
```

If a Worker Deployment Version with the supplied BuildID already exists,
this command will return an error.

Returns an error if all compute configuration fields are empty.

Note: This is an experimental feature and may change in the future.

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--aws-agentcore-assume-role-arn` | No | **string** AWS IAM role ARN that the Temporal server will assume when invoking the Agentcore Runtime that spawns a new Worker in this Worker Deployment Version. Required when --aws-agentcore-endpoint-arn is specified, and must be omitted when --aws-agentcore-skip-role-and-external-id is passed. |
| `--aws-agentcore-assume-role-external-id` | No | **string** Temporal server will enforce that the AWS IAM trust policy associated with the AWS IAM role specified in --aws-agentcore-assume-role-arn has an aws:ExternalId condition that matches the supplied value. Required when --aws-agentcore-endpoint-arn is specified, and must be omitted when --aws-agentcore-skip-role-and-external-id is passed. |
| `--aws-agentcore-endpoint-arn` | No | **string** AWS Bedrock Agentcore Runtime endpoint ARN to invoke when there are no active pollers for task queue targets in the Worker Deployment. The endpoint ARN encodes the runtime, endpoint name, and region. |
| `--aws-agentcore-skip-role-and-external-id` | No | **bool** When --aws-agentcore-endpoint-arn is specified, --aws-agentcore-assume-role-arn and --aws-agentcore-assume-role-external-id are required unless this flag is passed, in which case both must be omitted. |
| `--aws-lambda-assume-role-arn` | No | **string** AWS IAM role ARN that the Temporal server will assume when invoking the Lambda function that spawns a new Worker in this Worker Deployment Version. Required when --aws-lambda-function-arn is specified, and must be omitted when --aws-lambda-skip-role-and-external-id is passed. |
| `--aws-lambda-assume-role-external-id` | No | **string** Temporal server will enforce that the AWS IAM trust policy associated with the AWS IAM role specified in --aws-lambda-assume-role-arn has an aws:ExternalId condition that matches the supplied value. Required when --aws-lambda-function-arn is specified, and must be omitted when --aws-lambda-skip-role-and-external-id is passed. |
| `--aws-lambda-function-arn` | No | **string** Qualified (contains version suffix) or unqualified AWS Lambda function ARN to invoke when there are no active pollers for task queue targets in the Worker Deployment. |
| `--aws-lambda-skip-role-and-external-id` | No | **bool** When --aws-lambda-function-arn is specified, --aws-lambda-assume-role-arn and --aws-lambda-assume-role-external-id are required unless this flag is passed, in which case both must be omitted. |
| `--build-id` | Yes | **string** Build ID of the Worker Deployment Version. |
| `--deployment-name` | Yes | **string** Name of the Worker Deployment. |
| `--gcp-cloud-run-initial-instances` | No | **int** Number of Cloud Run worker pool instances the scaler starts with. Optional, but --gcp-cloud-run-min-instances, --gcp-cloud-run-max-instances, --gcp-cloud-run-initial-instances, --gcp-cloud-run-utilization-target, and --gcp-cloud-run-scale-down-stabilization-duration must all be set together, and this value must be between the min and max (inclusive). Defaults to 0 when unset. Only valid with --gcp-cloud-run-worker-pool. |
| `--gcp-cloud-run-max-instances` | No | **int** Maximum number of Cloud Run worker pool instances the scaler may scale up to. Optional, but --gcp-cloud-run-min-instances, --gcp-cloud-run-max-instances, --gcp-cloud-run-initial-instances, --gcp-cloud-run-utilization-target, and --gcp-cloud-run-scale-down-stabilization-duration must all be set together. Defaults to 30 when unset. Only valid with --gcp-cloud-run-worker-pool. |
| `--gcp-cloud-run-min-instances` | No | **int** Minimum number of Cloud Run worker pool instances the scaler will maintain. Optional, but --gcp-cloud-run-min-instances, --gcp-cloud-run-max-instances, --gcp-cloud-run-initial-instances, --gcp-cloud-run-utilization-target, and --gcp-cloud-run-scale-down-stabilization-duration must all be set together. Defaults to 0 when unset. Only valid with --gcp-cloud-run-worker-pool. |
| `--gcp-cloud-run-project` | No | **string** GCP project ID hosting the Cloud Run worker pool. Required when --gcp-cloud-run-worker-pool is specified. |
| `--gcp-cloud-run-region` | No | **string** Region of the Cloud Run worker pool. Required when --gcp-cloud-run-worker-pool is specified. |
| `--gcp-cloud-run-scale-down-stabilization-duration` | No | **duration** Duration the scaler waits after it last saw unmet task demand before it may scale the Cloud Run worker pool down. Raise this to keep the pool from scaling down before long-running or bursty activities finish. Optional, but --gcp-cloud-run-min-instances, --gcp-cloud-run-max-instances, --gcp-cloud-run-initial-instances, --gcp-cloud-run-utilization-target, and --gcp-cloud-run-scale-down-stabilization-duration must all be set together. A value of 0s disables the wait. Defaults to 90s when unset. Only valid with --gcp-cloud-run-worker-pool. |
| `--gcp-cloud-run-service-account` | No | **string** Customer GCP service account the Temporal server impersonates to manage the Cloud Run worker pool. Required when --gcp-cloud-run-worker-pool is specified. |
| `--gcp-cloud-run-utilization-target` | No | **float** Target average worker utilization the scaler aims for, as a fraction in the range (0, 1]. Optional, but --gcp-cloud-run-min-instances, --gcp-cloud-run-max-instances, --gcp-cloud-run-initial-instances, --gcp-cloud-run-utilization-target, and --gcp-cloud-run-scale-down-stabilization-duration must all be set together. Lower values keep more spare capacity per worker. Defaults to 0.8 when unset. Only valid with --gcp-cloud-run-worker-pool. |
| `--gcp-cloud-run-worker-pool` | No | **string** GCP Cloud Run worker pool name to scale when there are no active pollers for task queue targets in the Worker Deployment. |

### delete

Remove a Worker Deployment given its Deployment Name.
A Deployment can only be deleted if it has no Version in it.

```
temporal worker deployment delete [options]
```

For example, setting the user identity that removed the deployment:

```
temporal worker deployment delete \
    --name YourDeploymentName \
    --identity YourIdentity

```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--name`, `-d` | Yes | **string** Name for a Worker Deployment. |

### delete-version

Remove a Worker Deployment Version given its fully-qualified identifier.
This is rarely needed during normal operation
since unused Versions are eventually garbage collected.
The client can delete a Version only when all of the following conditions
are met:
  - It is not the Current or Ramping Version for this Deployment.
  - It has no active pollers, i.e., none of the task queues in the
  Version have pollers.
  - It is not draining. This requirement can be ignored with the option
`--skip-drainage`.
```
temporal worker deployment delete-version [options]
```

For example, skipping the drainage restriction:

```
temporal worker deployment delete-version \
    --deployment-name YourDeploymentName --build-id YourBuildID \
    --skip-drainage
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--build-id` | Yes | **string** Build ID of the Worker Deployment Version. |
| `--deployment-name` | Yes | **string** Name of the Worker Deployment. |
| `--skip-drainage` | No | **bool** Ignore the deletion requirement of not draining. |

### describe

Describe properties of a Worker Deployment, such as the versions
associated with it, routing information of new or existing tasks
executed by this deployment, or its creation time.

```
temporal worker deployment describe [options]
```

For example, to describe a deployment `YourDeploymentName` in the default
namespace:

```
temporal worker deployment describe \
    --name YourDeploymentName
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--name`, `-d` | Yes | **string** Name for a Worker Deployment. |

### describe-version

Describe properties of a Worker Deployment Version, such as the task
queues polled by workers in this Deployment Version, or drainage
information required to safely decommission workers, or user-provided
metadata, or its creation/modification time.

```
temporal worker deployment describe-version [options]
```

For example, to describe a deployment version  in a deployment
`YourDeploymentName`, with Build ID `YourBuildID`, and in the default
namespace:

```
temporal worker deployment describe-version \
    --deployment-name YourDeploymentName --build-id YourBuildID
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--build-id` | Yes | **string** Build ID of the Worker Deployment Version. |
| `--deployment-name` | Yes | **string** Name of the Worker Deployment. |
| `--report-task-queue-stats` | No | **bool** Report stats for task queues that are present in this version. |

### list

List existing Worker Deployments in the client's namespace.

```
temporal worker deployment list [options]
```

For example, listing Deployments in YourDeploymentNamespace:

```
temporal worker deployment list \
    --namespace YourDeploymentNamespace
```

Use [global flags](#global-flags) to customize the connection to the Temporal Service for this command.

### manager-identity

Manager Identity commands change the `ManagerIdentity` of a Worker Deployment:

```
temporal worker deployment manager-identity [command] [options]
```

When present, `ManagerIdentity` is the identity of the user that has the
exclusive right to make changes to this Worker Deployment. Empty by default.
When set, users whose identity does not match the `ManagerIdentity` will not
be able to change the Worker Deployment.

This is especially useful in environments where multiple users (such as CLI
users and automated controllers) may interact with the same Worker Deployment.
`ManagerIdentity` allows different users to communicate with one another about
who is expected to make changes to the Worker Deployment.

The current Manager Identity is returned with `describe`:
```
 temporal worker deployment describe \
    --deployment-name YourDeploymentName
```

#### set

Set the `ManagerIdentity` of a Worker Deployment given its Deployment Name.

When present, `ManagerIdentity` is the identity of the user that has the
exclusive right to make changes to this Worker Deployment. Empty by default.
When set, users whose identity does not match the `ManagerIdentity` will not
be able to change the Worker Deployment.

This is especially useful in environments where multiple users (such as CLI
users and automated controllers) may interact with the same Worker Deployment.
`ManagerIdentity` allows different users to communicate with one another about
who is expected to make changes to the Worker Deployment.

```
temporal worker deployment manager-identity set [options]
```

For example:

```
temporal worker deployment manager-identity set \
   --deployment-name DeploymentName \
   --self \
   --identity YourUserIdentity # optional, populated by CLI if not provided
```

Sets the Manager Identity of the Deployment to the identity of the user making
this request. If you don't specifically pass an identity field, the CLI will
generate your identity for you.

For example:
```
temporal worker deployment manager-identity set \
   --deployment-name DeploymentName \
   --manager-identity NewManagerIdentity
```

Sets the Manager Identity of the Deployment to any string.

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--deployment-name` | No | **string** Name for a Worker Deployment. Required. |
| `--manager-identity` | No | **string** New Manager Identity. Required unless --self is specified. |
| `--self` | No | **bool** Set Manager Identity to the identity of the user submitting this request. Required unless --manager-identity is specified. |
| `--yes`, `-y` | No | **bool** Don't prompt to confirm set Manager Identity. |

#### unset

Unset the `ManagerIdentity` of a Worker Deployment given its Deployment Name.

When present, `ManagerIdentity` is the identity of the user that has the
exclusive right to make changes to this Worker Deployment. Empty by default.
When set, users whose identity does not match the `ManagerIdentity` will not
be able to change the Worker Deployment.

This is especially useful in environments where multiple users (such as CLI
users and automated controllers) may interact with the same Worker Deployment.
`ManagerIdentity` allows different users to communicate with one another about
who is expected to make changes to the Worker Deployment.

```
temporal worker deployment manager-identity unset [options]
```

For example:

```
temporal worker deployment manager-identity unset \
   --deployment-name YourDeploymentName
```

Clears the Manager Identity field for a given Deployment.

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--deployment-name` | No | **string** Name for a Worker Deployment. Required. |
| `--yes`, `-y` | No | **bool** Don't prompt to confirm unset Manager Identity. |

### set-current-version

Set the Current Version for a Deployment.
When a Version is current, Workers of that Deployment Version will receive
tasks from new Workflows, and from existing AutoUpgrade Workflows that
are running on this Deployment.

If not all the expected Task Queues are being polled by Workers in the
new Version the request will fail. To override this protection use
`--ignore-missing-task-queues`. Note that this would ignore task queues
in a deployment that are not yet discovered, leading to inconsistent task
queue configuration.

```
temporal worker deployment set-current-version [options]
```

For example, to set the Current Version of a deployment
`YourDeploymentName`, with a version with Build ID `YourBuildID`, and
in the default namespace:

```
temporal worker deployment set-current-version \
    --deployment-name YourDeploymentName --build-id YourBuildID
```

The target of set-current-version can also be unversioned workers:

```
temporal worker deployment set-current-version \
    --deployment-name YourDeploymentName --unversioned
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--allow-no-pollers` | No | **bool** Override protection and set version as current even if it has no pollers. |
| `--build-id` | No | **string** Build ID of the Worker Deployment Version. Required unless --unversioned is specified. |
| `--deployment-name` | Yes | **string** Name of the Worker Deployment. |
| `--ignore-missing-task-queues` | No | **bool** Override protection to accidentally remove task queues. |
| `--unversioned` | No | **bool** Set unversioned workers as the target version. Cannot be used with --build-id. |
| `--yes`, `-y` | No | **bool** Don't prompt to confirm set Current Version. |

### set-ramping-version

Set the Ramping Version and Percentage for a Deployment.

The Ramping Version can be set using deployment name and build ID,
or set to unversioned workers using the --unversioned flag.

The Ramping Percentage is a float with values in the range [0, 100].
A value of 100 does not make the Ramping Version Current, use
`set-current-version` instead.

To remove a Ramping Version use the flag `--delete`.

If not all the expected Task Queues are being polled by Workers in the
new Ramping Version the request will fail. To override this protection use
`--ignore-missing-task-queues`. Note that this would ignore task queues
in a deployment that are not yet discovered, leading to inconsistent task
queue configuration.

```
temporal worker deployment set-ramping-version [options]
```

For example, to set the Ramping Version of a deployment
`YourDeploymentName`, with a version with Build ID `YourBuildID`, with
10 percent of tasks redirected to this version, and
using the default namespace:

```
temporal worker deployment set-ramping-version \
    --deployment-name YourDeploymentName --build-id YourBuildID \
    --percentage 10.0
```

And to remove that ramping:
```
temporal worker deployment set-ramping-version \
    --deployment-name YourDeploymentName --build-id YourBuildID \
    --delete
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--allow-no-pollers` | No | **bool** Override protection and set version as ramping even if it has no pollers. |
| `--build-id` | No | **string** Build ID of the Worker Deployment Version. Required unless --unversioned is specified. |
| `--delete` | No | **bool** Delete the Ramping Version. |
| `--deployment-name` | Yes | **string** Name of the Worker Deployment. |
| `--ignore-missing-task-queues` | No | **bool** Override protection to accidentally remove task queues. |
| `--percentage` | No | **float** Percentage of tasks redirected to the Ramping Version. Valid range [0,100]. |
| `--unversioned` | No | **bool** Set unversioned workers as the target version. Cannot be used with --build-id. |
| `--yes`, `-y` | No | **bool** Don't prompt to confirm set Ramping Version. |

### update-version-compute-config

Update compute configuration associated with a Worker Deployment
Version.

For example, to update the AWS Lambda function ARN associated with an
existing Worker Deployment Version:

```
 temporal worker deployment update-version-compute-config \
    --deployment-name YourDeploymentName --build-id YourBuildID \
    --aws-lambda-function-arn UpdatedLambdaFunctionARN
```

To update the AWS IAM role ARN that is assumed by the serverless worker
manager associated with an existing Worker Deployment Version:

```
 temporal worker deployment update-version-compute-config \
    --deployment-name YourDeploymentName --build-id YourBuildID \
    --aws-lambda-assume-role-arn UpdatedRoleARN
```

To update the AWS Bedrock Agentcore Runtime endpoint associated with an
existing Worker Deployment Version:

```
 temporal worker deployment update-version-compute-config \
    --deployment-name YourDeploymentName --build-id YourBuildID \
    --aws-agentcore-endpoint-arn UpdatedAgentcoreRuntimeEndpointARN \
    --aws-agentcore-assume-role-arn UpdatedRoleARN \
    --aws-agentcore-assume-role-external-id UpdatedExternalID
```

To update the GCP Cloud Run worker pool associated with an existing
Worker Deployment Version:

```
 temporal worker deployment update-version-compute-config \
    --deployment-name YourDeploymentName --build-id YourBuildID \
    --gcp-cloud-run-project YourGCPProject \
    --gcp-cloud-run-region us-central1 \
    --gcp-cloud-run-worker-pool UpdatedWorkerPool \
    --gcp-cloud-run-service-account customer-sa@proj.iam.gserviceaccount.com \
    --gcp-cloud-run-min-instances 1 \
    --gcp-cloud-run-max-instances 3 \
    --gcp-cloud-run-initial-instances 1 \
    --gcp-cloud-run-utilization-target 0.75 \
    --gcp-cloud-run-scale-down-stabilization-duration 5m
```

To update only the scaling settings on an existing GCP Cloud Run Worker
Deployment Version, supply the five scaler flags without the provider
fields (all five must be set together):

```
 temporal worker deployment update-version-compute-config \
    --deployment-name YourDeploymentName --build-id YourBuildID \
    --gcp-cloud-run-min-instances 1 \
    --gcp-cloud-run-max-instances 3 \
    --gcp-cloud-run-initial-instances 1 \
    --gcp-cloud-run-utilization-target 0.75 \
    --gcp-cloud-run-scale-down-stabilization-duration 5m
```

Provider fields are only required when changing the compute provider.
Switching the provider resets the scaling settings for the new provider.

If --remove is specified, the compute configuration for the Worker
Deployment Version will be removed:

```
 temporal worker deployment update-version-compute-config \
    --deployment-name YourDeploymentName --build-id YourBuildID \
    --remove
```

If a Worker Deployment Version with the supplied BuildID does not exist,
this command will return an error.

Note: This is an experimental feature and may change in the future.

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--aws-agentcore-assume-role-arn` | No | **string** AWS IAM role ARN that the Temporal server will assume when invoking the Agentcore Runtime that spawns a new Worker in this Worker Deployment Version. Required when --aws-agentcore-endpoint-arn is specified, and must be omitted when --aws-agentcore-skip-role-and-external-id is passed. |
| `--aws-agentcore-assume-role-external-id` | No | **string** Temporal server will enforce that the AWS IAM trust policy associated with the AWS IAM role specified in --aws-agentcore-assume-role-arn has an aws:ExternalId condition that matches the supplied value. Required when --aws-agentcore-endpoint-arn is specified, and must be omitted when --aws-agentcore-skip-role-and-external-id is passed. |
| `--aws-agentcore-endpoint-arn` | No | **string** AWS Bedrock Agentcore Runtime endpoint ARN to invoke when there are no active pollers for task queue targets in the Worker Deployment. The endpoint ARN encodes the runtime, endpoint name, and region. |
| `--aws-agentcore-skip-role-and-external-id` | No | **bool** When --aws-agentcore-endpoint-arn is specified, --aws-agentcore-assume-role-arn and --aws-agentcore-assume-role-external-id are required unless this flag is passed, in which case both must be omitted. |
| `--aws-lambda-assume-role-arn` | No | **string** AWS IAM role ARN that the Temporal server will assume when invoking the Lambda function that spawns a new Worker in this Worker Deployment Version. Required when --aws-lambda-function-arn is specified, and must be omitted when --aws-lambda-skip-role-and-external-id is passed. |
| `--aws-lambda-assume-role-external-id` | No | **string** Temporal server will enforce that the AWS IAM trust policy associated with the AWS IAM role specified in --aws-lambda-assume-role-arn has an aws:ExternalId condition that matches the supplied value. Required when --aws-lambda-function-arn is specified, and must be omitted when --aws-lambda-skip-role-and-external-id is passed. |
| `--aws-lambda-function-arn` | No | **string** Qualified (contains version suffix) or unqualified AWS Lambda function ARN to invoke when there are no active pollers for task queue targets in the Worker Deployment. |
| `--aws-lambda-skip-role-and-external-id` | No | **bool** When --aws-lambda-function-arn is specified, --aws-lambda-assume-role-arn and --aws-lambda-assume-role-external-id are required unless this flag is passed, in which case both must be omitted. |
| `--build-id` | Yes | **string** Build ID of the Worker Deployment Version. |
| `--deployment-name` | Yes | **string** Name of the Worker Deployment. |
| `--gcp-cloud-run-initial-instances` | No | **int** Number of Cloud Run worker pool instances the scaler starts with. Optional, but --gcp-cloud-run-min-instances, --gcp-cloud-run-max-instances, --gcp-cloud-run-initial-instances, --gcp-cloud-run-utilization-target, and --gcp-cloud-run-scale-down-stabilization-duration must all be set together, and this value must be between the min and max (inclusive). If omitted, the version's existing scaling settings are left unchanged. Only applies to a GCP Cloud Run worker pool. |
| `--gcp-cloud-run-max-instances` | No | **int** Maximum number of Cloud Run worker pool instances the scaler may scale up to. Optional, but --gcp-cloud-run-min-instances, --gcp-cloud-run-max-instances, --gcp-cloud-run-initial-instances, --gcp-cloud-run-utilization-target, and --gcp-cloud-run-scale-down-stabilization-duration must all be set together. If omitted, the version's existing scaling settings are left unchanged. Only applies to a GCP Cloud Run worker pool. |
| `--gcp-cloud-run-min-instances` | No | **int** Minimum number of Cloud Run worker pool instances the scaler will maintain. Optional, but --gcp-cloud-run-min-instances, --gcp-cloud-run-max-instances, --gcp-cloud-run-initial-instances, --gcp-cloud-run-utilization-target, and --gcp-cloud-run-scale-down-stabilization-duration must all be set together. If omitted, the version's existing scaling settings are left unchanged. Only applies to a GCP Cloud Run worker pool. |
| `--gcp-cloud-run-project` | No | **string** GCP project ID hosting the Cloud Run worker pool. Required when --gcp-cloud-run-worker-pool is specified. |
| `--gcp-cloud-run-region` | No | **string** Region of the Cloud Run worker pool. Required when --gcp-cloud-run-worker-pool is specified. |
| `--gcp-cloud-run-scale-down-stabilization-duration` | No | **duration** Duration the scaler waits after it last saw unmet task demand before it may scale the Cloud Run worker pool down. Raise this to keep the pool from scaling down before long-running or bursty activities finish. Optional, but --gcp-cloud-run-min-instances, --gcp-cloud-run-max-instances, --gcp-cloud-run-initial-instances, --gcp-cloud-run-utilization-target, and --gcp-cloud-run-scale-down-stabilization-duration must all be set together. A value of 0s disables the wait. If omitted, the version's existing scaling settings are left unchanged. Only applies to a GCP Cloud Run worker pool. |
| `--gcp-cloud-run-service-account` | No | **string** Customer GCP service account the Temporal server impersonates to manage the Cloud Run worker pool. Required when --gcp-cloud-run-worker-pool is specified. |
| `--gcp-cloud-run-utilization-target` | No | **float** Target average worker utilization the scaler aims for, as a fraction in the range (0, 1]. Optional, but --gcp-cloud-run-min-instances, --gcp-cloud-run-max-instances, --gcp-cloud-run-initial-instances, --gcp-cloud-run-utilization-target, and --gcp-cloud-run-scale-down-stabilization-duration must all be set together. Lower values keep more spare capacity per worker. If omitted, the version's existing scaling settings are left unchanged. Only applies to a GCP Cloud Run worker pool. |
| `--gcp-cloud-run-worker-pool` | No | **string** GCP Cloud Run worker pool name to scale when there are no active pollers for task queue targets in the Worker Deployment. |
| `--remove` | No | **bool** Removes any compute configuration associated with this Worker Deployment Version. |

### update-version-metadata

Update metadata associated with a Worker Deployment Version.

For example:

```
 temporal worker deployment update-version-metadata \
    --deployment-name YourDeploymentName --build-id YourBuildID \
    --metadata bar=1 \
    --metadata foo=true
```

The current metadata is also returned with `describe-version`:
```
 temporal worker deployment describe-version \
    --deployment-name YourDeploymentName --build-id YourBuildID \
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--build-id` | Yes | **string** Build ID of the Worker Deployment Version. |
| `--deployment-name` | Yes | **string** Name of the Worker Deployment. |
| `--metadata` | No | **string[]** Set deployment metadata using `KEY="VALUE"` pairs. Keys must be identifiers, and values must be JSON values. For example: `YourKey={"your": "value"}` Can be passed multiple times. |
| `--remove-entries` | No | **string[]** Keys of entries to be deleted from metadata. Can be passed multiple times. |

### version

Version commands create, describe, and delete a single Worker
Deployment Version, and manage its compute configuration:

```
temporal worker deployment version [command] [options]
```

Note: This is an experimental feature and may change in the future.

#### compute-config

A Worker Deployment Version's compute configuration is made of one
or more scaling groups. Each scaling group is identified by a key
and is made of a compute provider that starts Workers and a scaler
that decides when to start them. Each compute provider has its own
command, such as `aws-lambda` or `modal-function`, to create and update
scaling groups:

```
temporal worker deployment version compute-config [command] [options]
```

Note: This is an experimental feature and may change in the future.

##### aws-lambda

AWS Lambda commands set the compute configuration of a Worker Deployment
Version for an AWS Lambda function that spawns a Worker in the Worker
Deployment:

```
temporal worker deployment version compute-config aws-lambda [command] [options]
```

Note: This is an experimental feature and may change in the future.

###### create

Create a new Worker Deployment Version with compute configuration for an
AWS Lambda function that spawns a Worker in the Worker Deployment:

```
temporal worker deployment version compute-config aws-lambda create \
    --deployment-name YourDeploymentName \
    --build-id YourBuildID \
    --function-arn YourLambdaFunctionARN \
    --assume-role-arn YourAssumeRoleARN \
    --assume-role-external-id YourExternalID
```

To tune when Workers are started, pass any of the scaler flags (the
--scale-up-* and --suppress-* flags, --max-worker-lifetime-ms, and
--metrics-poll-interval-ms). Each one that is not set keeps the
server default:

```
temporal worker deployment version compute-config aws-lambda create \
    --deployment-name YourDeploymentName \
    --build-id YourBuildID \
    --function-arn YourLambdaFunctionARN \
    --assume-role-arn YourAssumeRoleARN \
    --assume-role-external-id YourExternalID \
    --scale-up-backlog-threshold 5 \
    --scale-up-cooloff-ms 500 \
    --max-worker-lifetime-ms 300000
```

The Worker Deployment must already exist; create it with
`temporal worker deployment create`.

If a Worker Deployment Version with the supplied BuildID already exists,
this command will return an error. To update its compute configuration,
use `temporal worker deployment version compute-config aws-lambda update`.

Note: This is an experimental feature and may change in the future.

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--assume-role-arn` | No | **string** AWS IAM role ARN that the Temporal server will assume when calling the compute provider that spawns a new Worker in this Worker Deployment Version. Required when setting the compute provider, and must be omitted when --skip-role-and-external-id is passed. |
| `--assume-role-external-id` | No | **string** Temporal server will enforce that the AWS IAM trust policy associated with the AWS IAM role specified in --assume-role-arn has an aws:ExternalId condition that matches the supplied value. Required when setting the compute provider, and must be omitted when --skip-role-and-external-id is passed. |
| `--build-id` | Yes | **string** Build ID of the Worker Deployment Version. |
| `--deployment-name` | Yes | **string** Name of the Worker Deployment. |
| `--function-arn` | Yes | **string** Qualified (contains version suffix) or unqualified AWS Lambda function ARN to invoke when there are no active pollers for task queue targets in the Worker Deployment. |
| `--max-worker-lifetime-ms` | No | **int** While there is a backlog, start a new Worker at least this often, in milliseconds, even within --scale-up-cooloff-ms. A value of 0 disables this. Defaults to 600000 (10 minutes) when unset. |
| `--metrics-poll-interval-ms` | No | **int** How often Task Queue metrics are checked to decide whether to start a Worker, in milliseconds. Must be at least 10000, and at least --scale-up-cooloff-ms. Defaults to 60000 (1 minute) when unset. |
| `--scale-up-backlog-threshold` | No | **int** At each Task Queue metrics check (see --metrics-poll-interval-ms), start a new Worker if the backlog is larger than this number of tasks. Defaults to 0 when unset. A task that arrives while no Worker is waiting for it still starts a Worker, subject to --scale-up-cooloff-ms. |
| `--scale-up-cooloff-ms` | No | **int** Minimum time between two Worker starts, in milliseconds. A value of 0 disables the wait. Defaults to 100 when unset. |
| `--scale-up-dispatch-rate-epsilon` | No | **float** Band around the dispatch rate, as a fraction of it, of at most 0.1. While a Task Queue type has a backlog and its dispatch rate stays within this band, Worker starts for it are paused. Starts from --max-worker-lifetime-ms are not paused. Defaults to 0 when unset, which disables pausing. |
| `--scale-up-dispatch-rate-epsilon-confirm-ms` | No | **int** How long the dispatch rate must stay within --scale-up-dispatch-rate-epsilon before Worker starts are paused, in milliseconds. Must be longer than --metrics-poll-interval-ms. Only valid with --scale-up-dispatch-rate-epsilon. Defaults to 90000 when unset. |
| `--scaling-group` | No | **string** Key of the scaling group. |
| `--skip-role-and-external-id` | No | **bool** When setting the compute provider, --assume-role-arn and --assume-role-external-id are required unless this flag is passed, in which case both must be omitted. |
| `--suppress-poll-interval-ms` | No | **int** How often Task Queue metrics are checked while Worker starts are paused, in milliseconds. Only valid with --scale-up-dispatch-rate-epsilon. Defaults to 90000 when unset. |
| `--suppress-scale-up-ms` | No | **int** How long Worker starts stay paused each time the dispatch rate is found within --scale-up-dispatch-rate-epsilon, in milliseconds. Must be longer than --suppress-poll-interval-ms. Only valid with --scale-up-dispatch-rate-epsilon. Defaults to 120000 when unset. |

###### update

Update a scaling group in the compute configuration of a Worker
Deployment Version, for an AWS Lambda function that spawns a Worker in
the Worker Deployment. Only the scaling group named by --scaling-group
("default" when unset) changes; other scaling groups are not affected.

To update the AWS Lambda function and the AWS IAM role associated with
an existing Worker Deployment Version:

```
temporal worker deployment version compute-config aws-lambda update \
    --deployment-name YourDeploymentName \
    --build-id YourBuildID \
    --function-arn YourLambdaFunctionARN \
    --assume-role-arn YourAssumeRoleARN \
    --assume-role-external-id YourExternalID
```

To update only the scaler of an existing scaling group, supply the
scaler flags without the provider flags. The scaler is replaced as a
whole, so scaler flags that are not passed go back to their
defaults:

```
temporal worker deployment version compute-config aws-lambda update \
    --deployment-name YourDeploymentName \
    --build-id YourBuildID \
    --scale-up-backlog-threshold 5 \
    --max-worker-lifetime-ms 300000
```

The provider flags are --function-arn, --assume-role-arn,
--assume-role-external-id, and --skip-role-and-external-id. The
scaler flags are the --scale-up-* and --suppress-* flags,
--max-worker-lifetime-ms, and --metrics-poll-interval-ms. The
provider flags are only needed when changing the compute provider,
and they must be passed together: --function-arn with either both
role flags or --skip-role-and-external-id. Changing the provider
also resets the scaler: scaler flags passed with it are applied, and
the rest, or all of them if none are passed, go back to their
defaults.

If a Worker Deployment Version with the supplied BuildID does not exist,
this command will return an error. To create it, use
`temporal worker deployment version compute-config aws-lambda create`.

Returns an error if all compute configuration fields are empty.

Note: This is an experimental feature and may change in the future.

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--assume-role-arn` | No | **string** AWS IAM role ARN that the Temporal server will assume when calling the compute provider that spawns a new Worker in this Worker Deployment Version. Required when setting the compute provider, and must be omitted when --skip-role-and-external-id is passed. |
| `--assume-role-external-id` | No | **string** Temporal server will enforce that the AWS IAM trust policy associated with the AWS IAM role specified in --assume-role-arn has an aws:ExternalId condition that matches the supplied value. Required when setting the compute provider, and must be omitted when --skip-role-and-external-id is passed. |
| `--build-id` | Yes | **string** Build ID of the Worker Deployment Version. |
| `--deployment-name` | Yes | **string** Name of the Worker Deployment. |
| `--function-arn` | No | **string** Qualified (contains version suffix) or unqualified AWS Lambda function ARN to invoke when there are no active pollers for task queue targets in the Worker Deployment. Required when changing the compute provider. |
| `--max-worker-lifetime-ms` | No | **int** While there is a backlog, start a new Worker at least this often, in milliseconds, even within --scale-up-cooloff-ms. A value of 0 disables this. Defaults to 600000 (10 minutes) when unset. |
| `--metrics-poll-interval-ms` | No | **int** How often Task Queue metrics are checked to decide whether to start a Worker, in milliseconds. Must be at least 10000, and at least --scale-up-cooloff-ms. Defaults to 60000 (1 minute) when unset. |
| `--scale-up-backlog-threshold` | No | **int** At each Task Queue metrics check (see --metrics-poll-interval-ms), start a new Worker if the backlog is larger than this number of tasks. Defaults to 0 when unset. A task that arrives while no Worker is waiting for it still starts a Worker, subject to --scale-up-cooloff-ms. |
| `--scale-up-cooloff-ms` | No | **int** Minimum time between two Worker starts, in milliseconds. A value of 0 disables the wait. Defaults to 100 when unset. |
| `--scale-up-dispatch-rate-epsilon` | No | **float** Band around the dispatch rate, as a fraction of it, of at most 0.1. While a Task Queue type has a backlog and its dispatch rate stays within this band, Worker starts for it are paused. Starts from --max-worker-lifetime-ms are not paused. Defaults to 0 when unset, which disables pausing. |
| `--scale-up-dispatch-rate-epsilon-confirm-ms` | No | **int** How long the dispatch rate must stay within --scale-up-dispatch-rate-epsilon before Worker starts are paused, in milliseconds. Must be longer than --metrics-poll-interval-ms. Only valid with --scale-up-dispatch-rate-epsilon. Defaults to 90000 when unset. |
| `--scaling-group` | No | **string** Key of the scaling group. |
| `--skip-role-and-external-id` | No | **bool** When setting the compute provider, --assume-role-arn and --assume-role-external-id are required unless this flag is passed, in which case both must be omitted. |
| `--suppress-poll-interval-ms` | No | **int** How often Task Queue metrics are checked while Worker starts are paused, in milliseconds. Only valid with --scale-up-dispatch-rate-epsilon. Defaults to 90000 when unset. |
| `--suppress-scale-up-ms` | No | **int** How long Worker starts stay paused each time the dispatch rate is found within --scale-up-dispatch-rate-epsilon, in milliseconds. Must be longer than --suppress-poll-interval-ms. Only valid with --scale-up-dispatch-rate-epsilon. Defaults to 120000 when unset. |

##### describe

Show the scaling groups in the compute configuration of a Worker
Deployment Version, with their compute provider and scaler settings:

```
temporal worker deployment version compute-config describe \
    --deployment-name YourDeploymentName \
    --build-id YourBuildID
```

If a Worker Deployment Version with the supplied BuildID does not exist,
this command will return an error.

Note: This is an experimental feature and may change in the future.

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--build-id` | Yes | **string** Build ID of the Worker Deployment Version. |
| `--deployment-name` | Yes | **string** Name of the Worker Deployment. |

##### modal-function

Modal Function commands set the compute configuration of a Worker
Deployment Version for a Modal Function that spawns a Worker in the
Worker Deployment:

```
temporal worker deployment version compute-config modal-function [command] [options]
```

Note: This is an experimental feature and may change in the future.

###### create

Create a new Worker Deployment Version with compute configuration for a
Modal Function that spawns a Worker in the Worker Deployment:

```
temporal worker deployment version compute-config modal-function create \
    --deployment-name YourDeploymentName \
    --build-id YourBuildID \
    --app-name YourModalApp \
    --function-name YourModalFunction \
    --environment YourModalEnvironment
```

To select a specific Modal workspace or deployed App version,
pass --workspace-id or --app-version.

To tune when Workers are started, pass any of the scaler flags (the
--scale-up-* and --suppress-* flags, --max-worker-lifetime-ms, and
--metrics-poll-interval-ms). Each one that is not set keeps the
server default:

```
temporal worker deployment version compute-config modal-function create \
    --deployment-name YourDeploymentName \
    --build-id YourBuildID \
    --app-name YourModalApp \
    --function-name YourModalFunction \
    --environment YourModalEnvironment \
    --scale-up-backlog-threshold 5 \
    --scale-up-cooloff-ms 500 \
    --max-worker-lifetime-ms 300000
```

The Worker Deployment must already exist; create it with
`temporal worker deployment create`.

If a Worker Deployment Version with the supplied BuildID already exists,
this command will return an error. To update its compute configuration,
use `temporal worker deployment version compute-config modal-function update`.

Note: This is an experimental feature and may change in the future.

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--app-name` | Yes | **string** Name of the deployed Modal application containing the Worker function. |
| `--app-version` | No | **string** Optional Modal App version, expressed as a non-negative integer. When setting provider details, omit or use 0 to select the App's current deployed version. Must be supplied with --app-name, --function-name, and --environment. |
| `--build-id` | Yes | **string** Build ID of the Worker Deployment Version. |
| `--deployment-name` | Yes | **string** Name of the Worker Deployment. |
| `--environment` | Yes | **string** Modal environment containing the deployed application. |
| `--function-name` | Yes | **string** Name of the Modal function to invoke when there are no active pollers for Task Queue targets in the Worker Deployment. |
| `--max-worker-lifetime-ms` | No | **int** While there is a backlog, start a new Worker at least this often, in milliseconds, even within --scale-up-cooloff-ms. A value of 0 disables this. Defaults to 600000 (10 minutes) when unset. |
| `--metrics-poll-interval-ms` | No | **int** How often Task Queue metrics are checked to decide whether to start a Worker, in milliseconds. Must be at least 10000, and at least --scale-up-cooloff-ms. Defaults to 60000 (1 minute) when unset. |
| `--scale-up-backlog-threshold` | No | **int** At each Task Queue metrics check (see --metrics-poll-interval-ms), start a new Worker if the backlog is larger than this number of tasks. Defaults to 0 when unset. A task that arrives while no Worker is waiting for it still starts a Worker, subject to --scale-up-cooloff-ms. |
| `--scale-up-cooloff-ms` | No | **int** Minimum time between two Worker starts, in milliseconds. A value of 0 disables the wait. Defaults to 100 when unset. |
| `--scale-up-dispatch-rate-epsilon` | No | **float** Band around the dispatch rate, as a fraction of it, of at most 0.1. While a Task Queue type has a backlog and its dispatch rate stays within this band, Worker starts for it are paused. Starts from --max-worker-lifetime-ms are not paused. Defaults to 0 when unset, which disables pausing. |
| `--scale-up-dispatch-rate-epsilon-confirm-ms` | No | **int** How long the dispatch rate must stay within --scale-up-dispatch-rate-epsilon before Worker starts are paused, in milliseconds. Must be longer than --metrics-poll-interval-ms. Only valid with --scale-up-dispatch-rate-epsilon. Defaults to 90000 when unset. |
| `--scaling-group` | No | **string** Key of the scaling group. |
| `--suppress-poll-interval-ms` | No | **int** How often Task Queue metrics are checked while Worker starts are paused, in milliseconds. Only valid with --scale-up-dispatch-rate-epsilon. Defaults to 90000 when unset. |
| `--suppress-scale-up-ms` | No | **int** How long Worker starts stay paused each time the dispatch rate is found within --scale-up-dispatch-rate-epsilon, in milliseconds. Must be longer than --suppress-poll-interval-ms. Only valid with --scale-up-dispatch-rate-epsilon. Defaults to 120000 when unset. |
| `--workspace-id` | No | **string** Modal workspace ID that selects which of the account's Modal OAuth credentials to use. Required for Temporal Cloud's Modal OAuth connections and any server using per-workspace OAuth credentials. Omit when the server uses a single Modal API key. The server validates this requirement. Must be supplied with --app-name, --function-name, and --environment. |

###### update

Update a scaling group in the compute configuration of a Worker
Deployment Version for a Modal Function that spawns a Worker in the
Worker Deployment. Only the scaling group named by --scaling-group
("default" when unset) changes; other scaling groups are not affected.

To update the Modal application and function associated with an existing
Worker Deployment Version:

```
temporal worker deployment version compute-config modal-function update \
    --deployment-name YourDeploymentName \
    --build-id YourBuildID \
    --app-name YourUpdatedModalApp \
    --function-name YourUpdatedModalFunction \
    --environment YourUpdatedModalEnvironment
```

To update only the scaler of an existing scaling group, supply the
scaler flags without the provider flags. The scaler is replaced as a
whole, so scaler flags that are not passed go back to their defaults:

```
temporal worker deployment version compute-config modal-function update \
    --deployment-name YourDeploymentName \
    --build-id YourBuildID \
    --scale-up-backlog-threshold 5 \
    --max-worker-lifetime-ms 300000
```

The provider flags are --app-name, --function-name, --environment,
--workspace-id, and --app-version. The scaler flags are the --scale-up-*
and --suppress-* flags, --max-worker-lifetime-ms, and
--metrics-poll-interval-ms. Provider flags are only needed when changing
the compute provider. Whenever any provider flag is passed, --app-name,
--function-name, and --environment must be passed together.

Provider details are replaced as a whole. Pass --workspace-id and
--app-version again to retain their existing values. Omitting
--workspace-id clears the workspace selection; the server rejects this
when per-workspace OAuth credentials require it. Omitting --app-version
uses the App's current deployed version. --workspace-id can be changed
to another workspace for which the account has credentials. Scaler-only
updates keep the existing provider details.

Changing the provider also resets the scaler: scaler flags passed with
it are applied, and the rest, or all of them if none are passed, go back
to their defaults.

If a Worker Deployment Version with the supplied BuildID does not exist,
this command will return an error. To create it, use
`temporal worker deployment version compute-config modal-function create`.

Returns an error if all compute configuration fields are empty.

Note: This is an experimental feature and may change in the future.

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--app-name` | No | **string** Name of the deployed Modal application containing the Worker function. Required when changing the compute provider. |
| `--app-version` | No | **string** Optional Modal App version, expressed as a non-negative integer. When setting provider details, omit or use 0 to select the App's current deployed version. Must be supplied with --app-name, --function-name, and --environment. |
| `--build-id` | Yes | **string** Build ID of the Worker Deployment Version. |
| `--deployment-name` | Yes | **string** Name of the Worker Deployment. |
| `--environment` | No | **string** Modal environment containing the deployed application. Required when changing the compute provider. |
| `--function-name` | No | **string** Name of the Modal function to invoke when there are no active pollers for Task Queue targets in the Worker Deployment. Required when changing the compute provider. |
| `--max-worker-lifetime-ms` | No | **int** While there is a backlog, start a new Worker at least this often, in milliseconds, even within --scale-up-cooloff-ms. A value of 0 disables this. Defaults to 600000 (10 minutes) when unset. |
| `--metrics-poll-interval-ms` | No | **int** How often Task Queue metrics are checked to decide whether to start a Worker, in milliseconds. Must be at least 10000, and at least --scale-up-cooloff-ms. Defaults to 60000 (1 minute) when unset. |
| `--scale-up-backlog-threshold` | No | **int** At each Task Queue metrics check (see --metrics-poll-interval-ms), start a new Worker if the backlog is larger than this number of tasks. Defaults to 0 when unset. A task that arrives while no Worker is waiting for it still starts a Worker, subject to --scale-up-cooloff-ms. |
| `--scale-up-cooloff-ms` | No | **int** Minimum time between two Worker starts, in milliseconds. A value of 0 disables the wait. Defaults to 100 when unset. |
| `--scale-up-dispatch-rate-epsilon` | No | **float** Band around the dispatch rate, as a fraction of it, of at most 0.1. While a Task Queue type has a backlog and its dispatch rate stays within this band, Worker starts for it are paused. Starts from --max-worker-lifetime-ms are not paused. Defaults to 0 when unset, which disables pausing. |
| `--scale-up-dispatch-rate-epsilon-confirm-ms` | No | **int** How long the dispatch rate must stay within --scale-up-dispatch-rate-epsilon before Worker starts are paused, in milliseconds. Must be longer than --metrics-poll-interval-ms. Only valid with --scale-up-dispatch-rate-epsilon. Defaults to 90000 when unset. |
| `--scaling-group` | No | **string** Key of the scaling group. |
| `--suppress-poll-interval-ms` | No | **int** How often Task Queue metrics are checked while Worker starts are paused, in milliseconds. Only valid with --scale-up-dispatch-rate-epsilon. Defaults to 90000 when unset. |
| `--suppress-scale-up-ms` | No | **int** How long Worker starts stay paused each time the dispatch rate is found within --scale-up-dispatch-rate-epsilon, in milliseconds. Must be longer than --suppress-poll-interval-ms. Only valid with --scale-up-dispatch-rate-epsilon. Defaults to 120000 when unset. |
| `--workspace-id` | No | **string** Modal workspace ID that selects which of the account's Modal OAuth credentials to use. Required for Temporal Cloud's Modal OAuth connections and any server using per-workspace OAuth credentials. Omit when the server uses a single Modal API key. The server validates this requirement. Must be supplied with --app-name, --function-name, and --environment. |

##### remove

Remove the compute configuration of a Worker Deployment Version. The
command lists its scaling groups and asks for confirmation first:

```
temporal worker deployment version compute-config remove \
    --deployment-name YourDeploymentName \
    --build-id YourBuildID
```

Remove one scaling group from the compute configuration, such as the one
named "default":

```
temporal worker deployment version compute-config remove \
    --deployment-name YourDeploymentName \
    --build-id YourBuildID \
    --scaling-group default
```

If the Worker Deployment Version or the scaling group does not exist,
this command will return an error.

Note: This is an experimental feature and may change in the future.

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--build-id` | Yes | **string** Build ID of the Worker Deployment Version. |
| `--deployment-name` | Yes | **string** Name of the Worker Deployment. |
| `--scaling-group` | No | **string** Key of the scaling group to remove. If unset, all scaling groups are removed. |
| `--yes`, `-y` | No | **bool** Don't prompt to confirm removing all scaling groups. Only allowed when --scaling-group is not set. |

#### create

Create a new Worker Deployment Version:

```
temporal worker deployment version create \
    --deployment-name YourDeploymentName \
    --build-id YourBuildID
```

The Worker Deployment must already exist; create it with
`temporal worker deployment create`.

If a Worker Deployment Version with the supplied BuildID already exists,
this command will return an error.

Note: This is an experimental feature and may change in the future.

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--build-id` | Yes | **string** Build ID of the Worker Deployment Version. |
| `--deployment-name` | Yes | **string** Name of the Worker Deployment. |

#### delete

Remove a Worker Deployment Version given its fully-qualified identifier.
This is rarely needed during normal operation
since unused Versions are eventually garbage collected.
The client can delete a Version only when all of the following conditions
are met:
  - It is not the Current or Ramping Version for this Deployment.
  - It has no active pollers, i.e., none of the task queues in the
  Version have pollers.
  - It is not draining. This requirement can be ignored with the option
`--skip-drainage`.
```
temporal worker deployment version delete [options]
```

For example, skipping the drainage restriction:

```
temporal worker deployment version delete \
    --deployment-name YourDeploymentName \
    --build-id YourBuildID \
    --skip-drainage
```

Note: This is an experimental feature and may change in the future.

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--build-id` | Yes | **string** Build ID of the Worker Deployment Version. |
| `--deployment-name` | Yes | **string** Name of the Worker Deployment. |
| `--skip-drainage` | No | **bool** Ignore the deletion requirement of not draining. |

#### describe

Describe properties of a Worker Deployment Version, such as the task
queues polled by workers in this Deployment Version, or drainage
information required to safely decommission workers, or user-provided
metadata, or its creation/modification time.

```
temporal worker deployment version describe [options]
```

For example, to describe a deployment version in a deployment
`YourDeploymentName`, with Build ID `YourBuildID`, and in the default
namespace:

```
temporal worker deployment version describe \
    --deployment-name YourDeploymentName \
    --build-id YourBuildID
```

Note: This is an experimental feature and may change in the future.

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--build-id` | Yes | **string** Build ID of the Worker Deployment Version. |
| `--deployment-name` | Yes | **string** Name of the Worker Deployment. |
| `--report-task-queue-stats` | No | **bool** Report stats for task queues that are present in this version. |

## describe

Look up information of a specific worker.

```
temporal worker describe --namespace YourNamespace --worker-instance-key YourKey
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--worker-instance-key` | Yes | **string** Worker instance key to describe. |

## list

Get a list of workers to the specified namespace.

```
temporal worker list --namespace YourNamespace --query 'TaskQueue="YourTaskQueue"'
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--include-system-workers` | No | **bool** Include system workers that are created implicitly by the server. By default, system workers are excluded. |
| `--limit` | No | **int** Maximum number of workers to display. |
| `--query`, `-q` | No | **string** Content for an SQL-like `QUERY` List Filter. |

## Global Flags

The following options can be used with any command.

| Flag | Required | Description | Default |
|------|----------|-------------|--------|
| `--address` | No | **string** Temporal Service gRPC endpoint. | `localhost:7233` |
| `--api-key` | No | **string** API key for request. |  |
| `--client-authority` | No | **string** Temporal gRPC client :authority pseudoheader. |  |
| `--client-connect-timeout` | No | **duration** Client connection timeout. |  |
| `--codec-auth` | No | **string** Authorization header for Codec Server requests. |  |
| `--codec-endpoint` | No | **string** Remote Codec Server endpoint. |  |
| `--codec-header` | No | **string[]** HTTP headers for codec server (KEY=VALUE, repeatable). |  |
| `--color` | No | **string-enum** Output coloring. Accepted values: always, never, auto. | `auto` |
| `--command-timeout` | No | **duration** Command execution timeout. |  |
| `--config-file` | No | **string** TOML config file path. |  |
| `--disable-config-env` | No | **bool** Disable loading config from environment variables. |  |
| `--disable-config-file` | No | **bool** Disable loading config from file. |  |
| `--env` | No | **string** Active environment name (`ENV`). | `default` |
| `--env-file` | No | **string** Path to environment settings file. |  |
| `--grpc-meta` | No | **string[]** HTTP headers for requests (KEY=VALUE, repeatable). |  |
| `--identity` | No | **string** Identity of the client submitting requests. |  |
| `--log-format` | No | **string-enum** Log format. Accepted values: text, json. | `text` |
| `--log-level` | No | **string-enum** Log level. Default is "never" for most commands and "warn" for "server start-dev". Accepted values: debug, info, warn, error, never. | `never` |
| `--namespace`, `-n` | No | **string** Temporal Service Namespace. | `default` |
| `--no-json-shorthand-payloads` | No | **bool** Raw payload output, even if the JSON option was used. |  |
| `--output`, `-o` | No | **string-enum** Non-logging data output format. Accepted values: text, json, jsonl, none. | `text` |
| `--profile` | No | **string** Configuration profile to use. Overrides the TEMPORAL_PROFILE environment variable and defaults to "default". |  |
| `--time-format` | No | **string-enum** Time format. Accepted values: relative, iso, raw. | `relative` |
| `--tls` | No | **bool** Enable base TLS encryption. Auto-enabled when api-key or TLS options are set. |  |
| `--tls-ca-data` | No | **string** Inline server CA certificate data. |  |
| `--tls-ca-path` | No | **string** Path to server CA certificate. |  |
| `--tls-cert-data` | No | **string** Inline x509 certificate data. |  |
| `--tls-cert-path` | No | **string** Path to x509 certificate. |  |
| `--tls-disable-host-verification` | No | **bool** Disable TLS host-name verification. |  |
| `--tls-key-data` | No | **string** Inline x509 private key data. |  |
| `--tls-key-path` | No | **string** Path to x509 private key. |  |
| `--tls-server-name` | No | **string** Override target TLS server name. |  |

