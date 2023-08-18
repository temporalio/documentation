---
id: execute
title: temporal workflow execute
sidebar_label: execute
description: Start a new Workflow Execution and prints its progress.
tags:
  - cli reference
  - temporal cli
  - workflow
  - command-line-interface-cli
  - workflow execute
  - workflow execution
---

The `temporal workflow execute` command starts a new [Workflow Execution](/concepts/what-is-a-workflow-execution) and prints its progress.
The command doesn't finish until the Workflow Execution completes.

To execute a [Workflow](/concepts/what-is-a-workflow) from the CLI:
`temporal workflow execute --workflow-id=meaningful-business-id --type=MyWorkflow --task-queue=MyTaskQueue`

Single quotes('') are used to wrap input as JSON.

`temporal workflow execute --workflow-id=meaningful-business-id --type-MyWorkflow --task-queue-MyTaskQueue --input='{"JSON": "Input"}'`

Use the following command options to change how the Workflow Execution behaves during its run.

- [--address](/cli/cmd-options/address)

- [--codec-auth](/cli/cmd-options/codec-auth)

- [--codec-endpoint](/cli/cmd-options/codec-endpoint)

- [--color](/cli/cmd-options/color)

- [--context-timeout](/cli/cmd-options/context-timeout)

- [--cron](/cli/cmd-options/cron)

- [--env](/cli/cmd-options/env)

- [--execution-timeout](/cli/cmd-options/execution-timeout)

- [--fields](/cli/cmd-options/fields)

- [--grpc-meta](/cli/cmd-options/grpc-meta)

- [--id-reuse-policy](/cli/cmd-options/id-reuse-policy)

- [--input](/cli/cmd-options/input)

- [--input-file](/cli/cmd-options/input-file)

- [--limit](/cli/cmd-options/limit)

- [--max-field-length](/cli/cmd-options/max-field-length)

- [--memo](/cli/cmd-options/memo)

- [--memo-file](/cli/cmd-options/memo-file)

- [--namespace](/cli/cmd-options/namespace)

- [--no-pager](/cli/cmd-options/no-pager)

- [--output](/cli/cmd-options/output)

- [--pager](/cli/cmd-options/pager)

- [--run-timeout](/cli/cmd-options/run-timeout)

- [--search-attribute](/cli/cmd-options/search-attribute)

- [--task-queue](/cli/cmd-options/task-queue)

- [--task-timeout](/cli/cmd-options/task-timeout)

- [--time-format](/cli/cmd-options/time-format)

- [--tls](/cli/cmd-options/tls)

- [--tls-ca-path](/cli/cmd-options/tls-ca-path)

- [--tls-cert-path](/cli/cmd-options/tls-cert-path)

- [--tls-disable-host-verification](/cli/cmd-options/tls-disable-host-verification)

- [--tls-key-path](/cli/cmd-options/tls-key-path)

- [--tls-server-name](/cli/cmd-options/tls-server-name)

- [--type](/cli/cmd-options/type)

- [--workflow-id](/cli/cmd-options/workflow-id)
