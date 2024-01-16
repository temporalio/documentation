# Dynamic Handlers README

Temporal supports Dynamic Workflows, Activities, Signals, and Queries.
These are unnamed handlers that are invoked if no other statically defined handler with the given name exists.

This is a sample project to demonstrate how to use the Dynamic Handlers.


1. Run the following at the root of the directory.

```bash
poetry install
```

## Dynamic Activity

Starts the Worker.

```bash
poetry run python your_worker_activity_dacx.py
```

Start your Workflow:

```bash
temporal workflow execute \
 --task-queue dynamic-activity-task-queue \
 --type GreetingWorkflow \
 --input '"Dynamic Activity argument"'  \
 --namespace default
```

## Dynamic Query


Starts the Worker.

```bash
poetry run python your_worker_query_dacx.py
```

Start your Workflow:

```bash
temporal workflow execute \
 --task-queue dynamic-query-task-queue \
 --type GreetingWorkflow \
 --input '"SomeName"' \
 --namespace default
```

## Dynamic Signal


Starts the Worker.

```bash
poetry run python your_worker_signal_dacx.py
```

Start your Workflow:

```bash
temporal workflow execute \
 --task-queue dynamic-signal-task-queue \
 --type GreetingWorkflow \
 --namespace default
```

Signal your Workflow:

```bash
temporal workflow signal \
 --workflow-id <your workflow id> \
 --namespace default \
 --name "unregister_signal" \
 --input '"Dynamic Signal argument 1"'
```
Complete your Workflow:

```bash
temporal workflow signal \
 --workflow-id <your workflow id>c \
 --namespace default \
 --name "exit" \
```
## Dynamic Workflow

Starts the Worker.

```bash
poetry run python your_worker_workflow_dacx.py
```

Start your Workflow:

```bash
temporal workflow execute \
 --task-queue dynamic-workflow-task-queue \
 --type UnRegisterWorkflow \
 --input '"SomeName"' \
 --namespace default
```