# Schedules README

- [x] create: Creates a new Schedule. Newly created Schedules return a Schedule ID to be used in other Schedule commands.
- [x] backfill: Executes Actions ahead of their specified time range.
- [x] delete: Deletes a Schedule. Deleting a Schedule does not affect any Workflows started by the Schedule.
- [x] describe: Shows the current Schedule configuration. This command also provides information about past, current, and future Workflow Runs.
- [x] list: Lists all Schedule configurations. Listing Schedules in Standard Visibility will only provide Schedule IDs.
- [x] toggle: (Pause in python) can pause and unpause a Schedule.
- [x] trigger: Triggers an immediate action with a given Schedule. By default, this action is subject to the Overlap Policy of the Schedule.
- [x] update: Updates an existing Schedule.

1. Run the following at the root of the directory.

```bash
poetry install
```

2. Start your Worker.

```bash
poetry run python run_worker.py
```

3. Run your Workflow

Start the Schedules file, then run a feature.

```bash
poetry run python start_schedule_dacx.py
poetry run python backfill_schedule_dacx.py
poetry run python delete_schedule_dacx.py
poetry run python describe_schedule_dacx.py
poetry run python toggle_schedule_dacx.py
poetry run python update_schedule_dacx.py
```
