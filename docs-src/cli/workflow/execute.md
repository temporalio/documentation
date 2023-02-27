---
id: execute
title: temporal workflow execute
sidebar_label: execute
description: Start a new Workflow Execution and prints its progress.
tags:
	- cli
---

The `temporal workflow execute` command starts a new [Workflow Execution](/concepts/what-is-a-workflow-execution) and prints its progress.
The command doesn't finish until the [Workflow](/concepts/what-is-a-workflow) completes.

Single quotes('') are used to wrap input as JSON.

Use the command options listed below to change how the Workflow Execution behaves during its run.
Make sure to write the command in this format:
`temporal workflow execute [command options] [arguments]`

- [--address](/cmd-options/address)

- [--codec-auth](/cmd-options/codec-auth)

- [--codec-endpoint](/cmd-options/codec-endpoint)

- [--color](/cmd-options/color)

- [--context-timeout](/cmd-options/context-timeout)

- [--cron](/cmd-options/cron)
│ │ │ │ │
* * * * *

- [--env](/cmd-options/env)

- [--execution-timeout](/cmd-options/execution-timeout)

- [--fields](/cmd-options/fields)

- [--grpc-meta](/cmd-options/grpc-meta)

- [--id-reuse-policy](/cmd-options/id-reuse-policy)

- [--input](/cmd-options/input)

- [--input-file](/cmd-options/input-file)

- [--limit](/cmd-options/limit)

- [--max-field-length](/cmd-options/max-field-length)

- [--memo](/cmd-options/memo)
Use valid JSON formats for value.

- [--memo-file](/cmd-options/memo-file)

- [--namespace](/cmd-options/namespace)

- [--no-pager](/cmd-options/no-pager)

- [--output](/cmd-options/output)

- [--pager](/cmd-options/pager)

- [--run-timeout](/cmd-options/run-timeout)

- [--search-attribute](/cmd-options/search-attribute)

- [--task-queue](/cmd-options/task-queue)

- [--task-timeout](/cmd-options/task-timeout)

- [--time-format](/cmd-options/time-format)

- [--tls-ca-path](/cmd-options/tls-ca-path)

- [--tls-cert-path](/cmd-options/tls-cert-path)

- [--tls-disable-host-verification](/cmd-options/tls-disable-host-verification)

- [--tls-key-path](/cmd-options/tls-key-path)

- [--tls-server-name](/cmd-options/tls-server-name)

- [--type](/cmd-options/type)

- [--workflow-id](/cmd-options/workflow-id)

