# Temporal Money Transfer example in Python

This is the companion code for the tutorial [Run your first Temporal Application with Python](https://learn.temporal.io/getting_started/python/first_program_in_python).

## Install

Install [poetry](https://python-poetry.org/docs/).

```bash
curl -sSL https://install.python-poetry.org | python3 -
```

Install project dependencies.

```bash
poetry install
```

## Running this sample

1. Make sure Temporal Server is running locally see the [Run a development server](https://docs.temporal.io/application-development/foundations#run-a-development-server).
2. Run the following commands.

```python
poetry run python worker.py
poetry run python banking-client.py
```

The results will return something similar to the following.

```output
Transfer complete.
    Withdraw: {'amount': 250, 'receiver': '43-812', 'reference_id': 'cf82526f-383a-44e4-8e34-b664a98e80c7', 'sender': '85-150'}
    Deposit: {'amount': 250, 'receiver': '43-812', 'reference_id': 'cf82526f-383a-44e4-8e34-b664a98e80c7', 'sender': '85-150'}
```