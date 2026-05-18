# Replay Workflows


1. Start your Worker:

```bash
poetry run python run_worker.py
```

2. Run your Workflow:

```bash
poetry run python run_workflow.py
```

## Replay History

You can Replay the Workflow History either as History Object or through JSON file.

### Replay as a History Object

To Replay as a History Object run:

```bash
poetry run python replay_history.py
```

### Replay as a JSON file

1. To Replay through a JSON file, first create the JSON file:

```bash
poetry run python get_workflow_history.py
```

2. Then Replay the History:

```bash
poetry run python replay_history_from_json.py
```