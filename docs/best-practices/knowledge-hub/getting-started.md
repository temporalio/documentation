---
id: getting-started
title: Getting Started with Temporal
sidebar_label: Getting Started
description: A self-service tutorial to set up your Temporal development environment and run your first Workflow.
toc_max_heading_level: 3
keywords:
  - temporal getting started
  - temporal tutorial
  - temporal development environment
  - first temporal workflow
tags:
  - Best Practices
  - Knowledge Hub
---

:::info
This page is part of the [Temporal Knowledge Hub](./index.md).
:::

:::note
Update learning objectives to match your organization's onboarding goals.
:::

In 30 minutes, you will:

* Set up a complete Temporal development environment.
* Write and run your first Temporal Workflow locally.
* Run your Temporal Workflow in our dev environment.

By the end, you'll have:

* A functional "Hello World" Workflow.
* Access to our internal Temporal Cloud namespaces.

## Prerequisites

* One of the following supported programming languages:
  * Python 3.12+
  * Java 17+
* [Temporal CLI](https://docs.temporal.io/cli#install)
* [Docker Desktop](https://docs.docker.com/desktop/setup/install/mac-install/)
* [Visual Studio Code](https://code.visualstudio.com/download)
  * Install these extensions: [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

## Development environment setup

:::note
Replace with your organization's starter template and tooling.
:::

You have two options for setting up your local environment. We strongly recommend using [Dev Container](https://containers.dev/) because it is 1) faster to set up and 2) maintained by the Temporal Platform team.

### Option A: Dev Container (Recommended)

1. Clone the [starter template](https://github.com/kawofong/temporal-python-template/tree/main)

```shell
git clone git@github.com:kawofong/temporal-python-template.git
code temporal-python-template
```

2. Reopen VS Code in Dev Container.

```
1. In VS Code, open Command Palette (Cmd/Ctrl + Shift + P).
2. Select "Dev Containers: Reopen in Container".
3. Wait 2-3 minutes for image pull and setup.
4. After the Dev Container is running, open your browser and verify that you can access Temporal UI via http://localhost:8233.
```

3. Verify development environment.

```shell
# 1. Run all unit tests; all tests shall succeed.
uv run poe test

# 2. Run pre-commit on all files; all pre-commit validations shall succeed.
uv run poe pre-commit-run
```

**What's included in the dev container:**

* Local Temporal development server
* Pre-configured git hooks and linters
* Debugging tools and extensions

### Option B: From Scratch

1. Clone the [starter-template](https://github.com/kawofong/temporal-python-template/tree/main)

```shell
git clone git@github.com:kawofong/temporal-python-template.git
code temporal-python-template
```

2. Install dependency locally.

```shell
# Requires `uv` to be installed in local machine.

# 1. Install all uv dependencies.
uv sync --dev.

# 2. Install pre-commit hooks.
uv run poe pre-commit-install
```

3. Verify development environment.

```shell
# 1. Run all unit tests; all tests shall succeed.
uv run poe test

# 2. Run pre-commit on all files; all pre-commit validations shall succeed.
uv run poe pre-commit-run

# 3. Run Temporal dev server and verify UI is up via http://localhost:8233.
temporal server start-dev
```

## Run your first Workflow locally

:::note
Update commands to match your starter template's Workflow examples.
:::

Once your development environment is configured, you are ready to run your first Temporal Workflow locally.

1. Run a Temporal Worker from the starter-template.

```shell
uv run -m src.workflows.crawler.worker
```

2. Start a crawler Workflow Execution.

```shell
uv run -m src.workflows.crawler.crawler_workflow
```

3. Wait for ~1 minute for the Workflow Execution to complete.
   * You can verify completion of the Workflow Execution by:
     * Observing the Workflow Execution output in your terminal or
     * Navigating to the Temporal UI

## Run your first Workflow on Temporal Cloud

:::note
Link to your internal process for Temporal Cloud access and Namespace provisioning.
:::

To run the same Workflow on Temporal Cloud, take the following steps:

* Request Temporal Cloud access via an internal service ticket.
* Request a Temporal Cloud Namespace via an internal service ticket.

Once your user account and Namespace are ready, follow these steps to run your Workflow on Temporal Cloud:

1. Log in to Temporal Cloud.
2. Access your Temporal Cloud Namespace via the Temporal Cloud UI.
3. Generate an [API key via Temporal Cloud UI](https://docs.temporal.io/cloud/api-keys#generate-api-keys-with-the-temporal-cloud-ui).
4. Replace the Temporal Client code in [src/workflows/crawler/worker.py](https://github.com/kawofong/temporal-python-template/blob/main/src/workflows/crawler/worker.py#L21) and [src/workflows/crawler/crawler_workflow.py](https://github.com/kawofong/temporal-python-template/blob/main/src/workflows/crawler/crawler_workflow.py#L101).

```python
client = await Client.connect(
    "<your-new-namespace>.<temporal-cloud-account-id>.tmprl.cloud:7233",
    namespace="<your-new-namespace>.<temporal-cloud-account-id>",
    api_key="your-api-key",
    tls=True,  # Required for Temporal Cloud
)
```

5. Run the Temporal Worker from the starter-template.

```shell
uv run -m src.workflows.crawler.worker
```

6. Start the crawler Workflow Execution.

```shell
uv run -m src.workflows.crawler.crawler_workflow
```

7. Wait for ~1 minute for the Workflow Execution to complete.
   * You can verify completion of the Workflow Execution by:
     * Observing the Workflow Execution output in your terminal or
     * Navigating to the Temporal Cloud UI
