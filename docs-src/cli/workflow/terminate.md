---
id: terminate
title: temporal workflow terminate
sidebar_label: terminate
description: Terminate Workflow Execution by Id or List Filter.
tags:
  - cli reference
  - temporal cli
  - workflow
  - command-line-interface-cli
  - workflow terminate
  - termination
---

The `temporal workflow terminate` command terminates a [Workflow Execution](/concepts/what-is-a-workflow-execution)

Terminating a running Workflow Execution records a [`WorkflowExecutionTerminated` event](/references/events#workflowexecutionterminated) as the closing Event in the [Event History](/concepts/what-is-an-event-history).
Any further [Command](/concepts/what-is-a-command) Tasks cannot be scheduled after running this command.

Workflow terminations require a valid [Workflow ID](/concepts/what-is-a-workflow-id) to function.
`temporal workflow terminate --workflow-id=meaningful-business-id`

Use the following options to change termination behavior.

- [--address](/cli/cmd-options/address)

- [--codec-auth](/cli/cmd-options/codec-auth)

- [--codec-endpoint](/cli/cmd-options/codec-endpoint)

- [--color](/cli/cmd-options/color)

- [--context-timeout](/cli/cmd-options/context-timeout)

- [--env](/cli/cmd-options/env)

- [--grpc-meta](/cli/cmd-options/grpc-meta)

- [--namespace](/cli/cmd-options/namespace)

- [--query](/cli/cmd-options/query)

- [--reason](/cli/cmd-options/reason)

- [--rps](/cli/cmd-options/rps)

- [--run-id](/cli/cmd-options/run-id)

- [--tls](/cli/cmd-options/tls)

- [--tls-ca-path](/cli/cmd-options/tls-ca-path)

- [--tls-cert-path](/cli/cmd-options/tls-cert-path)

- [--tls-disable-host-verification](/cli/cmd-options/tls-disable-host-verification)

- [--tls-key-path](/cli/cmd-options/tls-key-path)

- [--tls-server-name](/cli/cmd-options/tls-server-name)

- [--workflow-id](/cli/cmd-options/workflow-id)

- [--yes](/cli/cmd-options/yes)
