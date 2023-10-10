---
id: backgroundcheck-boilerplate-start-workflow
title: Start Workflow using the CLI
sidebar_label: Start Workflow
description: Learn how to start a Temporal Workflow using the CLI
tags:
  - go sdk
  - workflow
  - developer guide
  - temporal cli
---

**How to start a Workflow using the CLI**

You can use the Temporal CLI to start a Workflow whether you are using a local development server, Temporal Cloud, or are in a self-hosted environment.
However, you need to provide additional options to the command when operating with the Temporal Cloud or self-hosted environments.

### Local dev Server

**How to start a Workflow with the Temporal CLI while using the local development server**

Use the Temporal CLI `temporal workflow start` command to start your Workflow.

```shell
temporal workflow start \
 --task-queue backgroundcheck-boilerplate-task-queue \
 --type BackgroundCheck \
 --input '"555-55-5555"' \
 --namespace backgroundcheck_namespace
```

For more details, see the [temporal workflow start](/cli/workflow/start) command API reference.

After you start the Workflow, you can see it in the Temporal Platform.
Use the Temporal CLI or the Temporal Web UI to monitor the Workflow's progress.

#### List Workflows

Use the 'temporal workflow list` command to list all of the Workflows in the Namespace:

```shell
temporal workflow list \
 --namespace backgroundcheck_namespace
```

#### View in Web UI

You can also use the Web UI to see the Workflows associated with the Namespace.

The local development server starts the Web UI at [http://localhost:8233](http://localhost:8233).

When you visit for the first time, the Web UI directs you to [http://localhost:8233/namespaces/default/workflows](http://localhost:8233/namespaces/default/workflows).

Use the Namespace dropdown to select the project Namespace you created earlier.

![Web UI Namespace selection](/img/web-ui-namespace-selection.png)

You should now be at [http://localhost:8233/namespaces/backgroundcheck_namespace/workflows](http://localhost:8233/namespaces/backgroundcheck_namespace/workflows).

### Temporal Cloud

**How to start a Workflow with Temporal CLI when using Temporal Cloud**

Run the `temporal workflow start` command, and make sure to specify the certificate and private key arguments.

```shell
temporal workflow start \
 --task-queue backgroundcheck-boilerplate-task-queue-cloud \
 --type BackgroundCheck \
 --tls-cert-path ca.pem \
 --tls-key-path ca.key \
 --input '"555-55-5555"' \
 --namespace <namespace>.<account-id> \
 --address <namespace>.<account-id>.tmprl.cloud:<port>
```

Make sure that the certificate path, private key path, Namespace, and address argument values match your project.

:::info Use environment variables

Use environment variables as a way to quickly switch between a local dev server and Temporal Cloud, for example.

You can customize the environment names to be anything you want.

```shell
# set Cloud env variables
temporal env set cloud.namespace <namespace>.<account-id>
temporal env set cloud.address <namespace>.<account-id>.tmprl.cloud:<port>
temporal env set cloud.tls-cert-path ca.pem
temporal env set cloud.tls-key-path ca.key
# set local env variables
temporal env set local.namespace <namespace>
```

In this way, you can just provide a single `--env` command option when using the CLI rather than specifying each connection option in every command.

```shell
temporal workflow start \
 # ...
 --env cloud \
 # ...
```

:::

#### List Workflows

Run the `temporal workflow list` command, and make sure to specify the certificate and private key arguments.

```shell
temporal workflow list \
 --tls-cert-path ca.pem \
 --tls-key-path ca.key \
 --namespace <namespace>.<account-id> \
 --address <namespace>.<account-id>.tmprl.cloud:<port>
```

#### View in Web UI

Visit the Workflows page of your Cloud Namespace.
The URL will look something like the following:

```text
https://cloud.temporal.io/namespaces/<namespace>.<account-id>/workflows
```

![View Workflows in the Cloud UI](/img/cloud-view-workflows.png)

### Self-hosted

**How to start a Workflow with the Temporal CLI when using a Self-hosted Cluster**

Use your Temporal CLI alias to run the `temporal workflow start` command and start your Workflow.

```shell
temporal_docker workflow start \
 --task-queue backgroundcheck-boilerplate-task-queue-self-hosted \
 --type BackgroundCheck \
 --input '"555-55-5555"' \
 --namespace backgroundcheck_namespace
```

#### List Workflows

Using your Temporal CLI alias, run the `temporal workflow list` command.
This command lists the Workflows Executions within the Namespace:

```shell
temporal_docker workflow list \
 --namespace backgroundcheck_namespace
```

#### View in the Web UI

When you visit for the first time, the Web UI directs you to [http://localhost:8233/namespaces/default/workflows](http://localhost:8080/namespaces/default/workflows).

Use the Namespace dropdown to select the project Namespace you created earlier.

You should now be at [http://localhost:8080/namespaces/backgroundcheck_namespace/workflows](http://localhost:8080/namespaces/backgroundcheck_namespace/workflows).
