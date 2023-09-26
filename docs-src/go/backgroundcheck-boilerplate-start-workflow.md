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

**How to start the Workflow using the CLI?**

You can use the Temporal CLI to start a Workflow whether you are using a local development server, Temporal Cloud, or are in a Self-hosted environment.
However, you need to provide additional options to the command when operating with the Temporal Cloud or Self-hosted environments.

### Local dev Server

**How to start a Workflow with the Temporal CLI while using the local development server.**

Use the Temporal CLI `temporal workflow start` command to start your Workflow.

```shell
temporal workflow start --task-queue backgroundcheck-boilerplate-task-queue --type BackgroundCheck --input '"555-55-5555"' --namespace backgroundcheck_namespace
```

See the [temporal workflow start](/cli/workflow/start) command API reference for more details.

After starting the Workflow, we can now see it in the Temporal Platform.
We can use the Temporal CLI, or the Temporal Web UI to monitor the Workflow's progress.

#### List Workflows

Use the 'temporal workflow list` command to list all of the Workflows in the Namespace:

```shell
temporal workflow list --namespace backgroundcheck_namespace
```

#### View in Web UI

We can also use the Web UI to see all of the Workflows associated with the Namespace.

The local development server starts up the Web UI at [http://localhost:8233](http://localhost:8233).

When you visit for the first time, the Web UI direct you to [http://localhost:8233/namespaces/default/workflows](http://localhost:8233/namespaces/default/workflows).

Use the Namespace dropdown to select the project Namespace you created earlier.

![Web UI Namespace selection](/img/web-ui-namespace-selection.png)

You should now be at [http://localhost:8233/namespaces/backgroundcheck_namespace/workflows](http://localhost:8233/namespaces/backgroundcheck_namespace/workflows)

### Temporal Cloud

**How to start a Workflow with Temporal CLI when using Temporal Cloud.**

### Self-hosted Cluster

**How to start a Workflow with the Temporal CLI when using a Self-hosted Cluster.**

Use your Temporal CLI alias to run the `temporal workflow start` command and start your Workflow.

```shell
temporal_docker workflow start --task-queue backgroundcheck-boilerplate-task-queue --type BackgroundCheck --input '"555-55-5555"' --namespace backgroundcheck_namespace
```

#### List Workflows

Use your Temporal CLI alias to run the `temporal workflow list` command to list all of the Workflows in the Namespace:

```shell
temporal_docker workflow list --namespace backgroundcheck_namespace
```

#### View in the Web UI

When you visit for the first time, the Web UI direct you to [http://localhost:8233/namespaces/default/workflows](http://localhost:8080/namespaces/default/workflows).

Use the Namespace dropdown to select the project Namespace you created earlier.

You should now be at [http://localhost:8080/namespaces/backgroundcheck_namespace/workflows](http://localhost:8080/namespaces/backgroundcheck_namespace/workflows)
