## Create Namespace

```bash
temporal operator namespace create backgroundcheck_namespace
```

<http://localhost:8233/namespaces/backgroundcheck_namespace/workflows>

## Start a Workflow

```bash
temporal workflow start \
 --task-queue backgroundcheck-boilerplate-task-queue-local \
 --type BackgroundCheck \
 --input '"555-55-5555"' \
 --namespace backgroundcheck_namespace \
 --workflow-id backgroundcheck_workflow
```

## Get Event History

```bash
temporal workflow show \
 --workflow-id backgroundcheck_workflow \
 --namespace backgroundcheck_namespace \
 --output json > tests/backgroundcheck_workflow_history.json
```

## Show Event History

```bash
temporal workflow show \
 --workflow-id backgroundcheck_workflow \
 --namespace backgroundcheck_namespace
```

## Start a non-deterministic Workflow

```bash
temporal workflow start \
 --task-queue backgroundcheck-boilerplate-task-queue-local \
 --type BackgroundCheckNonDeterministic \
 --input '"555-55-5555"' \
 --namespace backgroundcheck_namespace \
 --workflow-id backgroundcheck_workflow_break
```

```bash
temporal workflow show \
 --workflow-id backgroundcheck_workflow_break \
 --namespace backgroundcheck_namespace \
 --fields long
```


## Get Event History for non-deterministic Workflow

```bash
temporal workflow show \
 --workflow-id backgroundcheck_workflow_break \
 --namespace backgroundcheck_namespace \
 --output json > tests/backgroundcheck_workflow_history.json
```
## Run test

```bash
poe test
```

## Terminate

```bash
temporal workflow terminate \
  --namespace backgroundcheck_namespace \
   --workflow-id backgroundcheck_workflow
```