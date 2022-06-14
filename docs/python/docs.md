## Workflow parameters

Workflow parameters are the method parameters of the singular method decorated
with `@workflow.run`. These can be any data type Temporal can convert including
`dataclass`es. Technically this can be multiple parameters, but Temporal
strongly encourages a single `dataclass` parameter containing all input fields.
For example:

```python
@dataclass
class MyParams:
    my_int_param: int
    my_str_param: str


@workflow.defn
class MyWorkflow:
    @workflow.run
    async def run(self, params: MyParams) -> None:
        # Do stuff
        ...
```

## Activity parameters

Activity parameters are the function parameters of the function decorated with
`@activity.defn`. These can be any data type Temporal can convert including
`dataclass`es. Technically this can be multiple parameters, but Temporal
strongly encourages a single `dataclass` parameter containing all input fields.
For example:

```python
@dataclass
class MyParams:
    my_int_param: int
    my_str_param: str


@activity.defn
async def my_activity(params: MyParams) -> None:
    # Do stuff
    ...
```

## Register multiple types

When a `Worker` is created, it accepts an iterable (e.g. list, tuple, etc) of
workflows and activities in the `workflows` and `activities` parameters
respectively. Simply provide more than one value to register multiple values.
