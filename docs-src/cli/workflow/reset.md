---
id: reset
title: temporal workflow reset
sidebar_label: reset
description: Resets a Workflow Execution by Event Id or reset type.
tags:
  - cli reference
  - temporal cli
  - workflow
  - command-line-interface-cli
  - workflow reset
  - resets-feature
---

The `temporal workflow reset` command resets a [Workflow Execution](/concepts/what-is-a-workflow-execution).
A reset resumes the Workflow from a certain point without losing your parameters or [Event History](/concepts/what-is-an-event-history).

The Workflow Execution can be set to a given [Event Type](/concepts/what-is-an-event).
For example, `temporal workflow reset --workflow-id=meaningful-business-id --type=LastContinuedAsNew`.

The Workflow Execution can also be reset to any Event after WorkflowTaskStarted.
For example, `temporal workflow reset --workflow-id=meaningful-business-id --event-id=MyLastEvent`.

Use the following options to change reset behavior.

- [--address](/cli/cmd-options/address)

- [--codec-auth](/cli/cmd-options/codec-auth)

- [--codec-endpoint](/cli/cmd-options/codec-endpoint)

- [--color](/cli/cmd-options/color)

- [--context-timeout](/cli/cmd-options/context-timeout)

- [--env](/cli/cmd-options/env)

- [--event-id](/cli/cmd-options/event-id)

- [--grpc-meta](/cli/cmd-options/grpc-meta)

- [--namespace](/cli/cmd-options/namespace)

- [--reapply-type](/cli/cmd-options/reapply-type)

- [--reason](/cli/cmd-options/reason)

- [--run-id](/cli/cmd-options/run-id)

- [--tls](/cli/cmd-options/tls)

- [--tls-ca-path](/cli/cmd-options/tls-ca-path)

- [--tls-cert-path](/cli/cmd-options/tls-cert-path)

- [--tls-disable-host-verification](/cli/cmd-options/tls-disable-host-verification)

- [--tls-key-path](/cli/cmd-options/tls-key-path)

- [--tls-server-name](/cli/cmd-options/tls-server-name)

- [--type](/cli/cmd-options/type)

- [--workflow-id](/cli/cmd-options/workflow-id)
