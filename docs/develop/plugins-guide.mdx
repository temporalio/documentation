---
id: plugins-guide
title: Plugins guide
sidebar_label: Plugins guide
description: Best practices for creating plugins for AI Agents
toc_max_heading_level: 4
hide_table_of_contents: true
keywords:
 - ai agents
 - best practices
tags:
 - Best Practices
 - AI Agents
---

import SdkTabs from '@site/src/components';

# Plugins

A **Plugin** is an abstraction that allows you to customize any aspect of your Temporal Worker setup, including registering Workflow and Activity definitions, modifying worker and client options, and more. Using plugins, you can build reusable open-source libraries or build add-ons for engineers at your company.

This guide will teach you how to create plugins and give platform engineers general guidance on using and managing Temporal's primitives.

Here are some common use cases for plugins:

- AI Agent SDKs
- Observability, tracing, or logging middleware
- Adding reliable built-in functionality such as LLM calls, messaging systems, and payments infrastructure
- Encryption or compliance middleware

## How to build a Plugin

The recommended way to start building plugins is with a `SimplePlugin`. This abstraction will tackle the vast majority of plugins people want to write.  

For advanced use cases, you can extend the methods in lower-level classes that Simple Plugin is based on without re-implementing what you’ve done. See the [Advanced Topics section](#advanced-topics-for-plugins) for more information.

### Example Plugins

If you prefer to learn by getting hands-on with code, check out some existing plugins.

- Temporal's Python SDK ships with an [OpenAI Agents SDK](https://github.com/temporalio/sdk-python/tree/main/temporalio/contrib/openai_agents) plugin
- [Temporal client and Worker plugin for Pydantic AI](https://github.com/pydantic/pydantic-ai/blob/757d40932ebb8ef00f25cc469ff44e9b267b1aa3/pydantic_ai_slim/pydantic_ai/durable_exec/temporal/__init__.py#L83)

## What you can provide to users in a plugin

There are a number of features you can give your users with a plugin. Here's a short list of some of the things you can do.

- [Built-in Activities](#built-in-activity)
- [Workflow-friendly libraries](#workflow-friendly-libraries)
- [Built-in Workflows](#built-in-workflows)
- [Built-in Nexus Operations](#built-in-nexus-operations)
- [Custom Data Converters](#custom-data-converters)
- [Interceptors](#interceptors)

### Built-in Activity

You can provide built-in Activities in a Plugin for users to call from their Workflows. Check out the [Activities doc](/activities) for more detail on how these work.

You should refer to the [best practices for creating Activities](/activity-definition#best-practices-for-defining-activities) when you are making Activity plugins.

#### Timeouts and retry policies

Temporal's Activity retry mechanism gives applications the benefits of durable execution. See the [Activity retry policy explanation](/activity-definition#activity-retry-policy) for more details.

Here is an example with Python:

```python
@activity.defn
async def some_activity() -> None:
  return None

plugin = SimplePlugin(
  activities = [some_activity]
)
```

### Workflow-friendly libraries

You can provide a library with functionality for use within a Workflow if you'd like to abstract away some Temporal-specific details for your users. Your library will call elements you include in your Plugin such as Activities, Child Workflows, Signals, Updates, Queries, Nexus Operations, Interceptors, Data Converters, and any other code as long as it follows these requirements:

- It should be [deterministic](/workflow-definition#deterministic-constraints), running the same way every time it’s executed. Non-deterministic code should go in Activities or Nexus Operations.
- See [observability](/evaluate/development-production-features/observability) to avoid duplicating observation side effects when Workflows replay.
- Put other side effects inside of Activities or [Local Activities](/local-activity). This helps your Workflow handle being restarted, resumed, or executed in a different process from where it originally began without losing correctness or state consistency.
- See [testing your Plugin](#testing-your-plugin) to write tests that check for issues with side effects.
- It should run quickly since it may be replayed many times during a long Workflow execution. More expensive code should go in Activities or Nexus Operations.

A Plugin should allow a user to decompose their Workflows into Activities, as well as Child Workflows and Nexus Calls when needed. This gives users granular control through retries and timeouts, debuggability through the Temporal UI, operability with resets, pauses, and cancels, memoization for efficiency and resumability, and scalability using task queues and Workers.

Users use Workflows for:

- Orchestration and decision-making
- Interactivity via [message-passing](/evaluate/development-production-features/workflow-message-passing)
- Tracing and observability

#### Making changes to your library

Your users may want to keep their Workflows running across deployments of their Worker code. If their deployment includes a new version of your Plugin, changes to your Plugin could break Workflow code that started before the new version was deployed. This can be due to [non-deterministic behavior from code changes](/workflow-definition#non-deterministic-change) in your Plugin.

See [testing](#testing-your-plugin) to see how to test for this. And, if you make substantive changes, you need to use [patching](/patching).

#### Example of a Workflow library that uses a Plugin in Python

- [Implementation of the `OpenAIAgentsPlugin`](https://github.com/temporalio/sdk-python/tree/main/temporalio/contrib/openai_agents)
- [Example of replay testing](https://github.com/temporalio/sdk-python/blob/main/tests/contrib/openai_agents/test_openai_replay.py)

### Built-in Workflows

You can provide a built-in Workflow in a `SimplePlugin`. It’s callable as a Child Workflow or standalone. When you want to provide a piece of functionality that's more complex than an Activity, you can:

- Use a [Workflow Library](#workflow-friendly-libraries) that runs directly in the end user’s Workflow
- Add a Child Workflow

Consider adding a Child Workflow when one or more of these conditions applies:

- That child should outlive the parent.
- The Workflow Event History would otherwise [not scale](/workflow-execution/event#event-history-limits) in parent Workflows.
- When you want a separate Workflow ID for the child so that it can be operated independently of the parent's state (canceled, terminated, paused).

Any Workflow can be run as a standalone Workflow or as a Child Workflow, so registering a Child Workflow in a `SimplePlugin` is the same as registering any Workflow.

Here is an example with Python:

```python
@workflow.defn
class HelloWorkflow:
  @workflow.run
  async def run(self, name: str) -> str:
    return f"Hello, {name}!"

plugin = SimplePlugin(
  workflows = [HelloWorkflow]
)
 
...

client = await Client.connect(
  "localhost:7233",
  plugins=[
    plugin,
  ],
)
async with Worker(
  client,
  task_queue="task-queue",
):
  client.execute_workflow(
      HelloWorkflow.run,
      "Tim",
      task_queue=worker.task_queue,
    )
```

### Built-in Nexus Operations

Nexus calls are used from Workflows similar to Activities and you can check out some common [Nexus Use Cases](/nexus/use-cases). Like Activities, Nexus Call arguments and return values must be serializable.

Here's an example of how to register Nexus handlers in Workflows with Python:

```python
@nexusrpc.service
class WeatherService:
  get_weather_nexus_operation: nexusrpc.Operation[WeatherInput, Weather]

@nexusrpc.handler.service_handler(service=WeatherService)
class WeatherServiceHandler:
  @nexusrpc.handler.sync_operation
  async def get_weather_nexus_operation(
    self, ctx: nexusrpc.handler.StartOperationContext, input: WeatherInput
  ) -> Weather:
    return Weather(
      city=input.city, temperature_range="14-20C", conditions="Sunny with wind."
    )

plugin = SimplePlugin(
  nexus_service_handlers = [WeatherServiceHandler()]
)
```

### Custom Data Converters

A [custom Data Converter](/default-custom-data-converters#custom-data-converter) can alter data formats or provide compression or encryption.

Note that you can use an existing Data Converter such as, in Python, `PydanticPayloadConverter` in your Plugin.

Here's an example of how to add a Custom Data Converter to a Plugin with Python:

```python
def add_converter(converter: Optional[DataConverter]) -> DataConverter
  if converter is None or converter == temporalio.converter.DataConverter.default
    return pydantic_data_converter
  # Should consider interactions with other plugins, 
  # as this will override the data converter.
  # This may mean failing, warning, or something else
  return converter

plugin = SimplePlugin(
  data_converter = add_converter
)
```

### Interceptors

Interceptors are middleware that can run before and after various calls such as Activities, Workflows, and Signals. You can [learn more about interceptors](/develop/python/interceptors) for the details of implementing them. They're used to:

- Create side effects such as logging and tracing.
- Modify arguments, such as adding headers for authorization or tracing propagation.

Here's an example of how to add one to a Plugin with Python:

```python
class SomeWorkerInterceptor(
  temporalio.worker.Interceptor
):
  pass  # Your implementation

plugin = SimplePlugin(
  worker_interceptors = [SomeWorkerInterceptor()]
)
```

### Special considerations for different languages

Each of the SDKs has nuances you should be aware of so you can account for it in your code.

For example, you can choose to [run your Workflows in a sandbox in Python](/develop/python/python-sdk-sandbox). This lets you run Workflow code in a sandbox environment to help prevent non-determinism errors in your application. To work for users who use sandboxing, your Plugin should specify the Workflow runner that it uses.

Here's an example of how to explicitly define the Workflow runner for your Plugin with Python:

```python
def workflow_runner(runner: Optional[WorkflowRunner]) -> WorkflowRunner:
  if not runner:
    raise ValueError("No WorkflowRunner provided to the OpenAI plugin.")

  # If in sandbox, add additional passthrough
  if isinstance(runner, SandboxedWorkflowRunner):
    return dataclasses.replace(
      runner,
      restrictions=runner.restrictions.with_passthrough_modules("mcp"),
    )
  return runner

SimplePlugin(..., workflow_runner=workflow_runner)
```

## Testing your Plugin {#testing-your-plugin}

To test your Plugin, you'll write a normal Temporal Workflow tests, having included the plugin in your Client. 

Two special concerns are versioning tests, for when you're making changes to your plugin, and testing unwanted side effects.

### Versioning tests 

When you make changes to your plugin after it has already shipped to users, it's recommended that you set up [replay testing](/develop/python/testing-suite#replay) on each important change to make sure that you’re not causing non-determinism errors for your users.

### Side effects tests

Your Plugin should cater to Workflows resuming in different processes than the ones they started on and then replaying from the beginning, which can happen, for example, after an intermittent failure.

You can ensure you're not depending on local side effects by turning Workflow caching off, which will mean that the Workflow replays from the top each time it progresses. Here's an example with Python:

```python
import my_module

client = await Client.connect(
  "localhost:7233",
  plugins=[
    my_module.my_plugin,
  ],
)
async with Worker(
  client,
  task_queue="task-queue",
  max_cached_workflows=0
):
    # Start a workflow ...
```

Check for duplicate side effects or other types of failures.

It's harder to test against side effects to global variables, so this practice is best avoided entirely.

## Advanced Topics for Plugins

If you go deeper into `SimplePlugin`, you'll see it aggregates a pair of raw Plugin classes that you can use for a higher level of flexibility: a Worker Plugin and a client Plugin.

- Worker Plugins contain functionality that runs inside your users’ Workflows.
- Client Plugins contain functionality that runs when Workflows are created and return results.

If your Plugin implements both of them, registering it in the client will also register it in Workers created with that client.

### Client Plugin

Client Plugins are provided to the Temporal client on creation. They can change client configurations and service client configurations. `ClientConfig` contains settings like client Interceptors and DataConverters. `ConnectConfig` configures the actual network connections to the local or cloud Temporal server with values like an API key. This is the basic implementation of a client Plugin using Python:

```python
class MyAdvancedClientPlugin(temporalio.client.Plugin):

  def configure_client(self, config: ClientConfig) -> ClientConfig:
    return config

  async def connect_service_client(
    self,
    config: ConnectConfig,
    next: Callable[[ConnectConfig], Awaitable[ServiceClient]],
  ) -> temporalio.service.ServiceClient:
    return await next(config)
```

The primary use case for integrations so far is setting a `DataConverter`, like in the [Data Converter example](#custom-data-converters).

### Worker Plugin

Worker Plugins are provided at Worker creation and have more capabilities and corresponding implementation than client Plugins. They can change Worker configurations, run code during the Worker lifetime, and manage the Replayer in a similar way. You can learn more about the [Replayer](#replayer) in a later section.

Similar to `configure_client` above, you implement `configure_worker` and `configure_replayer` to change any necessary configurations. In addition, `run_worker` allows you to execute code before and after the Worker runs. This can be used to set up resources or globals for use during the Worker execution. `run_replayer` does the same for the Replayer, but keep in mind that the Replayer has a more complex return type. This is a basic implementation of a Worker plugin using Python:

```python
class MyAdvancedWorkerPlugin(temporalio.worker.Plugin):
  def configure_worker(self, config: WorkerConfig) -> WorkerConfig:
    return config

  async def run_worker(
    self, worker: Worker, next: Callable[[Worker], Awaitable[None]]
  ) -> None:
    next(worker)

  def configure_replayer(self, config: ReplayerConfig) -> ReplayerConfig:
    return config

  def run_replayer(
    self,
    replayer: Replayer,
    histories: AsyncIterator[temporalio.client.WorkflowHistory],
    next: Callable[
      [Replayer, AsyncIterator[WorkflowHistory]],
      AbstractAsyncContextManager[AsyncIterator[WorkflowReplayResult]],
    ],
  ) -> AbstractAsyncContextManager[AsyncIterator[WorkflowReplayResult]]:
    return next(replayer, histories)
```

### Replayer

The Replayer allows Workflow authors to validate that their Workflows will work after changes to either the Workflow or a library they depend on. It’s normally used in test runs or when testing Workers before they roll out in production.

The Replayer runs on a Workflow History created by a previous Workflow run. Suppose something in the Workflow or underlying code has changed in a way which could potentially cause a non-determinism error. In that case, the Replayer will notice the change in the way it runs compared to the history provided. 

The Replayer is typically configured identically to the Worker and client. Ff you’re using `SimplePlugin`, this is already handled for you.

If you need to do something custom for the Replayer, you can configure it directly. Here's an example of how to do that with Python:

```python
class MyAdvancedWorkerPlugin(temporalio.worker.Plugin):
  def configure_replayer(self, config: ReplayerConfig) -> ReplayerConfig:
    return config

  def run_replayer(
    self,
    replayer: Replayer,
    histories: AsyncIterator[temporalio.client.WorkflowHistory],
    next: Callable[
      [Replayer, AsyncIterator[WorkflowHistory]],
      AbstractAsyncContextManager[AsyncIterator[WorkflowReplayResult]],
    ],
  ) -> AbstractAsyncContextManager[AsyncIterator[WorkflowReplayResult]]:
    return next(replayer, histories)
```
