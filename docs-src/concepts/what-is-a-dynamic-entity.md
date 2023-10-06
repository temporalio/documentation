Temporal supports Dynamic Workflows, Activities, Signals, and Queries.
These are unnamed entities that are invoked if no other statically defined entity with the given name exists.

## Dynamic Workflows

A Workflow can be made dynamic by adding dynamic=True to the `@workflow.defn` decorator.
The Workflow's run method must then accept a single argument of type `Sequence[temporalio.common.RawValue]`.
At runtime, the Workflow will be invoked if no Workflow with the given name is registered.
The input arguments are passed to the run method as the single `Sequence[RawValue]` argument.

```python
@dataclass
class DynamicWorkflowValue:
    some_string: str

@workflow.defn(dynamic=True)
class DynamicWorkflow:
    @workflow.run
    async def run(self, args: Sequence[RawValue]) -> DynamicWorkflowValue:
    # ...
```

## Dynamic Activities

Similar to dynamic Workflows, an Activity can be made dynamic by adding `dynamic=True` to the `@activity.defn` decorator.
The Activity function must then accept a single argument of type `Sequence[temporalio.common.RawValue]`.

At runtime, the Activity will be invoked if no Activity with the given name is registered.
The input arguments are passed to the Activity function as the single `Sequence[RawValue]` argument.

```python
@activity.defn(dynamic=True)
def concatenate_strings(args: Sequence[RawValue]) -> str:
    # Convert raw values to strings
    str1 = activity.payload_converter().from_payload(args[0].payload, str)
    str2 = activity.payload_converter().from_payload(args[1].payload, str)
    # Concatenate the strings
    result = str1 + str2
    return result
```

## Dynamic Signals

A Signal can be made dynamic by adding dynamic=True to the `@workflow.signal` decorator.
The Signal method must accept two arguments - a str name and a `Sequence[temporalio.common.RawValue]` args.
At runtime, the Signal will be invoked if no Signal with the given name exists on the Workflow.

```python
@workflow.signal(dynamic=True)
def dynamic_signal(name: str, args: Sequence[RawValue]) -> None:
    #...
```

## Dynamic Queries

Similar to dynamic Signals, a Query can be made dynamic by adding `dynamic=True` to the `@workflow.query` decorator.
The Query method must accept two arguments - a `str` name and a `Sequence[temporalio.common.RawValue]` args.
At runtime, the Query will be invoked if no Query with the given name is defined on the Workflow.

```python
@workflow.query(dynamic=True)
def dynamic_query(name: str, args: Sequence[RawValue]) -> None:
    #...
```

Dynamic Entities provide flexibility to handle cases where the names of Workflows, Activities, Signals, or Queries are not known at run time.
