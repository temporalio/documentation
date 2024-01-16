# Signals

## Signal your Workflow

```command
# terminal one
poetry run python your_worker.py
# terminal two
poetry run python singal_dacx.py
```

## Signal External Workflow

```command
# terminal one
poetry run python external_signal_worker.py
# terminal two
poetry run python external_signal_main.py
```

## Signal with Start

Run the following commands to Signal With Start.

```command
# terminal one
poetry run python your_worker.py
# terminal two
poetry run python signal_with_start_dacx.py
```