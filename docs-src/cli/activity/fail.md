---
id: fail
title: temporal activity fail
sidebar_label: fail
description: Fails an Activity Execution.
tags: 
    - cli reference
    - temporal cli 
    - activity
    - activity execution 
    - activity fail
    - cli-feature
    - command-line-interface-cli
---

The `temporal activity fail` command fails an [Activity Execution](/concepts/what-is-an-activity-execution).
The Activity must already be running on a valid [Workflow](/concepts/what-is-a-workflow).

`temporal fail --workflow-id=meaningful-business-id --activity-id=MyActivity`

Use the following options to change the behavior of this command.

- [--activity-id](/cli/cmd-options/activity-id)

- [--address](/cli/cmd-options/address)

- [--codec-auth](/cli/cmd-options/codec-auth)

- [--codec-endpoint](/cli/cmd-options/codec-endpoint)

- [--color](/cli/cmd-options/color)

- [--context-timeout](/cli/cmd-options/context-timeout)

- [--detail](/cli/cmd-options/detail)

- [--env](/cli/cmd-options/env)

- [--grpc-meta](/cli/cmd-options/grpc-meta)

- [--identity](/cli/cmd-options/identity)

- [--namespace](/cli/cmd-options/namespace)

- [--reason](/cli/cmd-options/reason)

- [--run-id](/cli/cmd-options/run-id)

- [--tls](/cli/cmd-options/tls)

- [--tls-ca-path](/cli/cmd-options/tls-ca-path)

- [--tls-cert-path](/cli/cmd-options/tls-cert-path)

- [--tls-disable-host-verification](/cli/cmd-options/tls-disable-host-verification)

- [--tls-key-path](/cli/cmd-options/tls-key-path)

- [--tls-server-name](/cli/cmd-options/tls-server-name)

- [--workflow-id](/cli/cmd-options/workflow-id)
