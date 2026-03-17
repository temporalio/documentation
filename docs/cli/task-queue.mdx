---
id: task-queue
title: Temporal CLI task-queue command reference
sidebar_label: task-queue
description: Temporal Task Queue commands facilitate operations like describing poller info, displaying partitions, fetching compatible Build IDs, and determining Build ID reachability for effective Workflow and Activity management.
toc_max_heading_level: 4
keywords:
  - cli reference
  - command-line-interface-cli
  - list partitions
  - task queue
  - task queue describe
  - temporal cli
tags:
  - Temporal CLI
---

{/* NOTE: This is an auto-generated file. Any edit to this file will be overwritten.
This file is generated from https://github.com/temporalio/cli/blob/main/internal/commandsgen/commands.yml via internal/cmd/gen-docs */}

This page provides a reference for the `temporal` CLI `task-queue` command. The flags applicable to each subcommand are presented in a table within the heading for the subcommand. Refer to [Global Flags](#global-flags) for flags that you can use with every subcommand.

## config

Manage Task Queue configuration:

```
temporal task-queue config [command] [options]
```

Available commands:
- `get`: Retrieve the current configuration for a task queue
- `set`: Update the configuration for a task queue

### get

Retrieve the current configuration for a Task Queue:

```
temporal task-queue config get \
    --task-queue YourTaskQueue \
    --task-queue-type activity
```

This command returns the current configuration including:
- Queue rate limit: The overall rate limit of the task queue.
  This setting overrides the worker rate limit if set.
  Unless modified, this is the system-defined rate limit.
- Fairness key rate limit defaults: Default rate limits for fairness keys.
  If set, each individual fairness key will be limited to this rate,
  scaled by the weight of the fairness key.

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--task-queue`, `-t` | Yes | **string** Task Queue name. |
| `--task-queue-type` | Yes | **string-enum** Task Queue type. Accepted values: workflow, activity, nexus. Accepted values: workflow, activity, nexus. |

### set

Update configuration settings for a Task Queue.

```
temporal task-queue config set \
    --task-queue YourTaskQueue \
    --task-queue-type activity \
    --namespace YourNamespace \
    --queue-rps-limit <requests_per_second:float> \
    --queue-rps-limit-reason <reason_string> \
    --fairness-key-rps-limit-default <requests_per_second:float> \
    --fairness-key-rps-limit-reason <reason_string>
```

This command supports updating:
- Queue rate limits: Controls the overall rate limit of the task queue.
  This setting overrides the worker rate limit if set.
  Unless modified, this is the system-defined rate limit.
- Fairness key rate limit defaults: Sets default rate limits for fairness keys.
  If set, each individual fairness key will be limited to this rate,
  scaled by the weight of the fairness key.

To unset a rate limit, pass in 'default', for example: --queue-rps-limit default

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--fairness-key-rps-limit-default` | No | **float\|default** Fairness key rate limit default in requests per second. Accepts a float; or 'default' to unset. |
| `--fairness-key-rps-limit-reason` | No | **string** Reason for fairness key rate limit update. |
| `--queue-rps-limit` | No | **float\|default** Queue rate limit in requests per second. Accepts a float; or 'default' to unset. |
| `--queue-rps-limit-reason` | No | **string** Reason for queue rate limit update. |
| `--task-queue`, `-t` | Yes | **string** Task Queue name. |
| `--task-queue-type` | Yes | **string-enum** Task Queue type. Accepted values: workflow, activity, nexus. Accepted values: workflow, activity, nexus. |

## describe

Display a list of active Workers that have recently polled a Task Queue. The
Temporal Server records each poll request time. A `LastAccessTime` over one
minute may indicate the Worker is at capacity or has shut down. Temporal
Workers are removed if 5 minutes have passed since the last poll request.

```
temporal task-queue describe \
  --task-queue YourTaskQueue
```

This command provides poller information for a given Task Queue.
Workflow and Activity polling use separate Task Queues:

```
temporal task-queue describe \
    --task-queue YourTaskQueue \
    --task-queue-type "activity"
```

This command provides the following task queue statistics:
- `ApproximateBacklogCount`: The approximate number of tasks backlogged in this
  task queue. May count expired tasks but eventually converges to the right
  value.
- `ApproximateBacklogAge`: Approximate age of the oldest task in the backlog,
  based on its creation time, measured in seconds.
- `TasksAddRate`: Approximate rate at which tasks are being added to the task
  queue, measured in tasks per second, averaged over the last 30 seconds.
  Includes tasks dispatched immediately without going to the backlog
  (sync-matched tasks), as well as tasks added to the backlog. (See note below.)
- `TasksDispatchRate`: Approximate rate at which tasks are being dispatched from
  the task queue, measured in tasks per second, averaged over the last 30
  seconds.  Includes tasks dispatched immediately without going to the backlog
  (sync-matched tasks), as well as tasks added to the backlog. (See note below.)
- `BacklogIncreaseRate`: Approximate rate at which the backlog size is
  increasing (if positive) or decreasing (if negative), measured in tasks per
  second, averaged over the last 30 seconds.  This is roughly equivalent to:
  `TasksAddRate` - `TasksDispatchRate`.

NOTE: The `TasksAddRate` and `TasksDispatchRate` metrics may differ from the
actual rate of add/dispatch, because tasks may be dispatched eagerly to an
available worker, or may apply only to specific workers (they are "sticky").
Such tasks are not counted by these metrics. Despite the inaccuracy of
these two metrics, the derived metric of `BacklogIncreaseRate` is accurate
for backlogs older than a few seconds.

Safely retire Workers assigned a Build ID by checking reachability across
all task types. Use the flag `--report-reachability`:

```
temporal task-queue describe \
    --task-queue YourTaskQueue \
    --select-build-id "YourBuildId" \
    --report-reachability
```

Task reachability information is returned for the requested versions and all
task types, which can be used to safely retire Workers with old code versions,
provided that they were assigned a Build ID.

Note that task reachability status is deprecated in favor of Drainage Status
(ie. of a Drained or Draining Worker Deployment Version) and will be removed 
in a future release. Also, determining task reachability incurs a non-trivial 
computing cost.

Task reachability states are reported per build ID. The state may be one of the
following:

- `Reachable`: using the current versioning rules, the Build ID may be used
  by new Workflow Executions or Activities OR there are currently open
  Workflow or backlogged Activity tasks assigned to the queue.
- `ClosedWorkflowsOnly`: the Build ID does not have open Workflow Executions
  and can't be reached by new Workflow Executions. It MAY have closed
  Workflow Executions within the Namespace retention period.
- `Unreachable`: this Build ID is not used for new Workflow Executions and
  isn't used by any existing Workflow Execution within the retention period.

Task reachability is eventually consistent. You may experience a delay until
reachability converges to the most accurate value. This is designed to act
in the most conservative way until convergence. For example, `Reachable` is
more conservative than `ClosedWorkflowsOnly`.

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--disable-stats` | No | **bool** Disable task queue statistics. |
| `--legacy-mode` | No | **bool** Enable a legacy mode for servers that do not support rules-based worker versioning. This mode only provides pollers info. |
| `--partitions-legacy` | No | **int** Query partitions 1 through `N`. Experimental/Temporary feature. Legacy mode only. |
| `--report-config` | No | **bool** Include task queue configuration in the response. When enabled, the command will return the current rate limit configuration for the task queue. |
| `--report-reachability` | No | **bool** Display task reachability information. |
| `--select-all-active` | No | **bool** Include all active versions. A version is active if it had new tasks or polls recently. |
| `--select-build-id` | No | **string[]** Filter the Task Queue based on Build ID. |
| `--select-unversioned` | No | **bool** Include the unversioned queue. |
| `--task-queue`, `-t` | Yes | **string** Task Queue name. |
| `--task-queue-type` | No | **string-enum[]** Task Queue type. If not specified, all types are reported. Accepted values: workflow, activity, nexus. |
| `--task-queue-type-legacy` | No | **string-enum** Task Queue type (legacy mode only). Accepted values: workflow, activity. |

## get-build-id-reachability

```
+-----------------------------------------------------------------------------+
| CAUTION: This command is deprecated and will be removed in a later release. |
+-----------------------------------------------------------------------------+
```

Show if a given Build ID can be used for new, existing, or closed Workflows
in Namespaces that support Worker versioning:

```
temporal task-queue get-build-id-reachability \
    --task-queue YourTaskQueue \
    --build-id "YourBuildId"
```

You can specify the `--build-id` and `--task-queue` flags multiple times. If
`--task-queue` is omitted, the command checks Build ID reachability against
all Task Queues.

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--build-id` | No | **string[]** One or more Build ID strings. Can be passed multiple times. |
| `--reachability-type` | No | **string-enum** Reachability filter. `open`: reachable by one or more open workflows. `closed`: reachable by one or more closed workflows. `existing`: reachable by either. New Workflow Executions reachable by a Build ID are always reported. Accepted values: open, closed, existing. |
| `--task-queue`, `-t` | No | **string[]** Search only the specified task queue(s). Can be passed multiple times. |

## get-build-ids

```
+-----------------------------------------------------------------------------+
| CAUTION: This command is deprecated and will be removed in a later release. |
+-----------------------------------------------------------------------------+
```

Fetch sets of compatible Build IDs for specified Task Queues and display their
information:

```
temporal task-queue get-build-ids \
    --task-queue YourTaskQueue
```

This command is limited to Namespaces that support Worker versioning.

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--max-sets` | No | **int** Max return count. Use 1 for default major version. Use 0 for all sets. |
| `--task-queue`, `-t` | Yes | **string** Task Queue name. |

## list-partition

Display a Task Queue's partition list with assigned matching nodes:

```
temporal task-queue list-partition \
    --task-queue YourTaskQueue
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--task-queue`, `-t` | Yes | **string** Task Queue name. |

## update-build-ids

```
+-----------------------------------------------------------------------------+
| CAUTION: This command is deprecated and will be removed in a later release. |
+-----------------------------------------------------------------------------+
```

Add or change a Task Queue's compatible Build IDs for Namespaces using Worker
versioning:

```
temporal task-queue update-build-ids [subcommands] [options] \
    --task-queue YourTaskQueue
```

### add-new-compatible

Add a compatible Build ID to a Task Queue's existing version set. Provide an
existing Build ID and a new Build ID:

```
temporal task-queue update-build-ids add-new-compatible \
    --task-queue YourTaskQueue \
    --existing-compatible-build-id "YourExistingBuildId" \
    --build-id "YourNewBuildId"
```

The new ID is stored in the set containing the existing ID and becomes the new
default for that set.

This command is limited to Namespaces that support Worker versioning.

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--build-id` | Yes | **string** Build ID to be added. |
| `--existing-compatible-build-id` | Yes | **string** Pre-existing Build ID in this Task Queue. |
| `--set-as-default` | No | **bool** Set the expanded Build ID set as the Task Queue default. |
| `--task-queue`, `-t` | Yes | **string** Task Queue name. |

### add-new-default

```
+-----------------------------------------------------------------------------+
| CAUTION: This command is deprecated and will be removed in a later release. |
+-----------------------------------------------------------------------------+
```

Create a new Task Queue Build ID set, add a Build ID to it, and make it the
overall Task Queue default. The new set will be incompatible with previous
sets and versions.

```
temporal task-queue update-build-ids add-new-default \
    --task-queue YourTaskQueue \
    --build-id "YourNewBuildId"
```

```
+------------------------------------------------------------------------+
| NOTICE: This command is limited to Namespaces that support Worker      |
| versioning. Worker versioning is experimental. Versioning commands are |
| subject to change.                                                     |
+------------------------------------------------------------------------+
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--build-id` | Yes | **string** Build ID to be added. |
| `--task-queue`, `-t` | Yes | **string** Task Queue name. |

### promote-id-in-set

```
+-----------------------------------------------------------------------------+
| CAUTION: This command is deprecated and will be removed in a later release. |
+-----------------------------------------------------------------------------+
```

Establish an existing Build ID as the default in its Task Queue set. New tasks
compatible with this set will now be dispatched to this ID:

```
temporal task-queue update-build-ids promote-id-in-set \
    --task-queue YourTaskQueue \
    --build-id "YourBuildId"
```

```
+------------------------------------------------------------------------+
| NOTICE: This command is limited to Namespaces that support Worker      |
| versioning. Worker versioning is experimental. Versioning commands are |
| subject to change.                                                     |
+------------------------------------------------------------------------+
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--build-id` | Yes | **string** Build ID to set as default. |
| `--task-queue`, `-t` | Yes | **string** Task Queue name. |

### promote-set

```
+-----------------------------------------------------------------------------+
| CAUTION: This command is deprecated and will be removed in a later release. |
+-----------------------------------------------------------------------------+
```

Promote a Build ID set to be the default on a Task Queue. Identify the set by
providing a Build ID within it. If the set is already the default, this
command has no effect:

```
temporal task-queue update-build-ids promote-set \
    --task-queue YourTaskQueue \
    --build-id "YourBuildId"
```

```
+------------------------------------------------------------------------+
| NOTICE: This command is limited to Namespaces that support Worker      |
| versioning. Worker versioning is experimental. Versioning commands are |
| subject to change.                                                     |
+------------------------------------------------------------------------+
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--build-id` | Yes | **string** Build ID within the promoted set. |
| `--task-queue`, `-t` | Yes | **string** Task Queue name. |

## versioning

```
+---------------------------------------------------------------------+
| CAUTION: This API has been deprecated by Worker Deployment.         |
+---------------------------------------------------------------------+
```

Provides commands to add, list, remove, or replace Worker Build ID assignment
and redirect rules associated with Task Queues:

```
temporal task-queue versioning [subcommands] [options] \
    --task-queue YourTaskQueue
```

Task Queues support the following versioning rules and policies:

- Assignment Rules: manage how new executions are assigned to run on specific
  Worker Build IDs. Each Task Queue stores a list of ordered Assignment Rules,
  which are evaluated from first to last. Assignment Rules also allow for
  gradual rollout of new Build IDs by setting ramp percentage.
- Redirect Rules: automatically assign work for a source Build ID to a target
  Build ID. You may add at most one redirect rule for each source Build ID.
  Redirect rules require that a target Build ID is fully compatible with
  the source Build ID.

### add-redirect-rule

Add a new redirect rule for a given Task Queue. You may add at most one
redirect rule for each distinct source build ID:

```
temporal task-queue versioning add-redirect-rule \
    --task-queue YourTaskQueue \
    --source-build-id "YourSourceBuildID" \
    --target-build-id "YourTargetBuildID"
```

```
+---------------------------------------------------------------------+
| CAUTION: This API has been deprecated by Worker Deployment.         |
+---------------------------------------------------------------------+
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--source-build-id` | Yes | **string** Source build ID. |
| `--target-build-id` | Yes | **string** Target build ID. |
| `--yes`, `-y` | No | **bool** Don't prompt to confirm. |

### commit-build-id

Complete a Build ID's rollout and clean up unnecessary rules that might have
been created during a gradual rollout:

```
temporal task-queue versioning commit-build-id \
    --task-queue YourTaskQueue
    --build-id "YourBuildId"
```

This command automatically applies the following atomic changes:

- Adds an unconditional assignment rule for the target Build ID at the
  end of the list.
- Removes all previously added assignment rules to the given target
  Build ID.
- Removes any unconditional assignment rules for other Build IDs.

Rejects requests when there have been no recent pollers for this Build ID.
This prevents committing invalid Build IDs. Use the `--force` option to
override this validation.

```
+---------------------------------------------------------------------+
| CAUTION: This API has been deprecated by Worker Deployment.         |
+---------------------------------------------------------------------+
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--build-id` | Yes | **string** Target build ID. |
| `--force` | No | **bool** Bypass recent-poller validation. |
| `--yes`, `-y` | No | **bool** Don't prompt to confirm. |

### delete-assignment-rule

Deletes a rule identified by its index in the Task Queue's list of assignment
rules.

```
temporal task-queue versioning delete-assignment-rule \
    --task-queue YourTaskQueue \
    --rule-index YourIntegerRuleIndex
```

By default, the Task Queue must retain one unconditional rule, such as "no
hint filter" or "percentage". Otherwise, the delete operation is rejected.
Use the `--force` option to override this validation.

```
+---------------------------------------------------------------------+
| CAUTION: This API has been deprecated by Worker Deployment.         |
+---------------------------------------------------------------------+
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--force` | No | **bool** Bypass one-unconditional-rule validation. |
| `--rule-index`, `-i` | Yes | **int** Position of the assignment rule to be replaced. Requests for invalid indices will fail. |
| `--yes`, `-y` | No | **bool** Don't prompt to confirm. |

### delete-redirect-rule

Deletes the routing rule for the given source Build ID.

```
temporal task-queue versioning delete-redirect-rule \
    --task-queue YourTaskQueue \
    --source-build-id "YourBuildId"
```

```
+---------------------------------------------------------------------+
| CAUTION: This API has been deprecated by Worker Deployment.         |
+---------------------------------------------------------------------+
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--source-build-id` | Yes | **string** Source Build ID. |
| `--yes`, `-y` | No | **bool** Don't prompt to confirm. |

### get-rules

Retrieve all the Worker Build ID assignments and redirect rules associated
with a Task Queue:

```
temporal task-queue versioning get-rules \
    --task-queue YourTaskQueue
```

Task Queues support the following versioning rules:

- Assignment Rules: manage how new executions are assigned to run on specific
  Worker Build IDs. Each Task Queue stores a list of ordered Assignment Rules,
  which are evaluated from first to last. Assignment Rules also allow for
  gradual rollout of new Build IDs by setting ramp percentage.
- Redirect Rules: automatically assign work for a source Build ID to a target
  Build ID. You may add at most one redirect rule for each source Build ID.
  Redirect rules require that a target Build ID is fully compatible with
  the source Build ID.
```
+---------------------------------------------------------------------+
| CAUTION: This API has been deprecated by Worker Deployment.         |
+---------------------------------------------------------------------+
```

Use [global flags](#global-flags) to customize the connection to the Temporal Service for this command.

### insert-assignment-rule

Inserts a new assignment rule for this Task Queue. Rules are evaluated in
order, starting from index 0. The first applicable rule is applied, and the
rest ignored:

```
temporal task-queue versioning insert-assignment-rule \
    --task-queue YourTaskQueue \
    --build-id "YourBuildId"
```

If you do not specify a `--rule-index`, this command inserts at index 0.

```
+---------------------------------------------------------------------+
| CAUTION: This API has been deprecated by Worker Deployment.         |
+---------------------------------------------------------------------+
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--build-id` | Yes | **string** Target Build ID. |
| `--percentage` | No | **int** Traffic percent to send to target Build ID. |
| `--rule-index`, `-i` | No | **int** Insertion position. Ranges from 0 (insert at start) to count (append). Any number greater than the count is treated as "append". |
| `--yes`, `-y` | No | **bool** Don't prompt to confirm. |

### replace-assignment-rule

Change an assignment rule for this Task Queue. By default, this enforces one
unconditional rule (no hint filter or percentage). Otherwise, the operation
will be rejected. Set `force` to true to bypass this validation.

```
temporal task-queue versioning replace-assignment-rule \
    --task-queue YourTaskQueue \
    --rule-index AnIntegerIndex \
    --build-id "YourBuildId"
```

To assign multiple assignment rules to a single Build ID, use
'insert-assignment-rule'.

To update the percent:

```
temporal task-queue versioning replace-assignment-rule \
    --task-queue YourTaskQueue \
    --rule-index AnIntegerIndex \
    --build-id "YourBuildId" \
    --percentage AnIntegerPercent
```

Percent may vary between 0 and 100 (default).

```
+---------------------------------------------------------------------+
| CAUTION: This API has been deprecated by Worker Deployment.         |
+---------------------------------------------------------------------+
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--build-id` | Yes | **string** Target Build ID. |
| `--force` | No | **bool** Bypass the validation that one unconditional rule remains. |
| `--percentage` | No | **int** Divert percent of traffic to target Build ID. |
| `--rule-index`, `-i` | Yes | **int** Position of the assignment rule to be replaced. Requests for invalid indices will fail. |
| `--yes`, `-y` | No | **bool** Don't prompt to confirm. |

### replace-redirect-rule

Updates a Build ID's redirect rule on a Task Queue by replacing its target
Build ID:

```
temporal task-queue versioning replace-redirect-rule \
    --task-queue YourTaskQueue \
    --source-build-id YourSourceBuildId \
    --target-build-id YourNewTargetBuildId
```

```
+---------------------------------------------------------------------+
| CAUTION: This API has been deprecated by Worker Deployment.         |
+---------------------------------------------------------------------+
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--source-build-id` | Yes | **string** Source Build ID. |
| `--target-build-id` | Yes | **string** Target Build ID. |
| `--yes`, `-y` | No | **bool** Don't prompt to confirm. |

## Global Flags

The following options can be used with any command.

| Flag | Required | Description | Default |
|------|----------|-------------|--------|
| `--address` | No | **string** Temporal Service gRPC endpoint. | `localhost:7233` |
| `--api-key` | No | **string** API key for request. |  |
| `--client-authority` | No | **string** Temporal gRPC client :authority pseudoheader. |  |
| `--client-connect-timeout` | No | **duration** The client connection timeout. 0s means no timeout. |  |
| `--codec-auth` | No | **string** Authorization header for Codec Server requests. |  |
| `--codec-endpoint` | No | **string** Remote Codec Server endpoint. |  |
| `--codec-header` | No | **string[]** HTTP headers for requests to codec server. Format as a `KEY=VALUE` pair. May be passed multiple times to set multiple headers. |  |
| `--color` | No | **string-enum** Output coloring. Accepted values: always, never, auto. | `auto` |
| `--command-timeout` | No | **duration** The command execution timeout. 0s means no timeout. |  |
| `--config-file` | No | **string** File path to read TOML config from, defaults to `$CONFIG_PATH/temporalio/temporal.toml` where `$CONFIG_PATH` is defined as `$HOME/.config` on Unix, `$HOME/Library/Application Support` on macOS, and `%AppData%` on Windows. _(Experimental)_ |  |
| `--disable-config-env` | No | **bool** If set, disables loading environment config from environment variables. _(Experimental)_ |  |
| `--disable-config-file` | No | **bool** If set, disables loading environment config from config file. _(Experimental)_ |  |
| `--env` | No | **string** Active environment name (`ENV`). | `default` |
| `--env-file` | No | **string** Path to environment settings file. Defaults to `$HOME/.config/temporalio/temporal.yaml`. |  |
| `--grpc-meta` | No | **string[]** HTTP headers for requests. Format as a `KEY=VALUE` pair. May be passed multiple times to set multiple headers. Can also be made available via environment variable as `TEMPORAL_GRPC_META_[name]`. |  |
| `--identity` | No | **string** The identity of the user or client submitting this request. Defaults to "temporal-cli:$USER@$HOST". |  |
| `--log-format` | No | **string-enum** Log format. Accepted values: text, json. | `text` |
| `--log-level` | No | **string-enum** Log level. Default is "info" for most commands and "warn" for `server start-dev`. Accepted values: debug, info, warn, error, never. | `info` |
| `--namespace`, `-n` | No | **string** Temporal Service Namespace. | `default` |
| `--no-json-shorthand-payloads` | No | **bool** Raw payload output, even if the JSON option was used. |  |
| `--output`, `-o` | No | **string-enum** Non-logging data output format. Accepted values: text, json, jsonl, none. | `text` |
| `--profile` | No | **string** Profile to use for config file. _(Experimental)_ |  |
| `--time-format` | No | **string-enum** Time format. Accepted values: relative, iso, raw. | `relative` |
| `--tls` | No | **bool** Enable base TLS encryption. Does not have additional options like mTLS or client certs. This is defaulted to true if api-key or any other TLS options are present. Use --tls=false to explicitly disable. |  |
| `--tls-ca-data` | No | **string** Data for server CA certificate. Can't be used with --tls-ca-path. |  |
| `--tls-ca-path` | No | **string** Path to server CA certificate. Can't be used with --tls-ca-data. |  |
| `--tls-cert-data` | No | **string** Data for x509 certificate. Can't be used with --tls-cert-path. |  |
| `--tls-cert-path` | No | **string** Path to x509 certificate. Can't be used with --tls-cert-data. |  |
| `--tls-disable-host-verification` | No | **bool** Disable TLS host-name verification. |  |
| `--tls-key-data` | No | **string** Private certificate key data. Can't be used with --tls-key-path. |  |
| `--tls-key-path` | No | **string** Path to x509 private key. Can't be used with --tls-key-data. |  |
| `--tls-server-name` | No | **string** Override target TLS server name. |  |

