---
id: together-ai
title: Together AI integration
sidebar_label: Together AI
toc_max_heading_level: 2
tags:
  - Together AI
  - Python SDK
  - Temporal SDKs
description:
  Run OpenAI Agents SDK agents on open-weight models served by Together AI, with every model call retried and recorded
  as a Temporal Activity.
---
[Together AI](https://www.together.ai/) serves open-weight models such as gpt-oss, DeepSeek, Qwen, and GLM on a
serverless per-token API and on dedicated endpoints through an API compatible with the OpenAI Chat Completions API.

Temporal's [OpenAI Agents SDK integration](/develop/python/integrations/openai-agents) runs each model call as an
Activity. A call to Together AI gets retries with backoff, a timeout, and a durable record in Event History, and the
agent loop around it survives Worker restarts. Because Together AI speaks the OpenAI Chat Completions API, the
integration's model provider hook is all you need: a model provider that maps a model name such as
`together/openai/gpt-oss-120b` to Together AI's endpoint. One Worker can serve Together AI alongside other providers,
and each Workflow picks its provider through the model name it gives its agent.

This integration is a sample pattern rather than a plugin. Code snippets in this guide are taken from the
[OpenAI Agents SDK model provider samples](https://github.com/temporalio/samples-python/tree/main/openai_agents/model_providers),
which run the same agent on Baseten, Fireworks AI, or Together AI from one Worker.

## Prerequisites

- This guide assumes you are already familiar with the
  [OpenAI Agents SDK integration](/develop/python/integrations/openai-agents) and with Together AI's
  [OpenAI-compatible API](https://docs.together.ai/docs/inference/openai-compatibility).
- If you are new to Temporal, we recommend reading [Understanding Temporal](/evaluate/understanding-temporal) or taking
  the [Temporal 101](https://learn.temporal.io/courses/temporal_101/) course.
- Set up your local development environment by following
  [Set up your local development environment](/develop/python/set-up-your-local-python) and leave the Temporal
  development server running.
- Create a [Together AI API key](https://api.together.ai/settings/projects/~current/api-keys) and export it as
  `TOGETHER_API_KEY` in the Worker's environment. The key stays in the Worker process; it is never part of Workflow
  input or Event History.

## Install

```bash
uv add temporalio-openai-agents
```

The package installs the Temporal Python SDK, the OpenAI Agents SDK, and the `openai` client. Together AI's own
[`together`](https://pypi.org/project/together/) package is not needed; the sample talks to Together AI through the
`openai` client.

## Configure the model provider

The sample describes each provider as a base URL, the environment variable that holds its API key, and an example model
with tool calling:

<!--SNIPSTART python-openai-agents-together-provider-->
[openai_agents/model_providers/openai_compatible_providers.py](https://github.com/temporalio/samples-python/blob/main/openai_agents/model_providers/openai_compatible_providers.py)
```py
TOGETHER = OpenAICompatibleProvider(
    name="together",
    base_url="https://api.together.ai/v1",
    api_key_env="TOGETHER_API_KEY",
    default_model="openai/gpt-oss-120b",
)
```
<!--SNIPEND-->

Together AI model IDs follow the `<organization>/<model-name>` convention, for example `openai/gpt-oss-120b`; OpenAI's
own model names return a 404. The [serverless models](https://docs.together.ai/docs/serverless/models) catalog lists
each model's ID and whether it supports function calling and structured outputs. The sample's example,
`openai/gpt-oss-120b`, is an open-weight reasoning model that supports both; a Workflow names it
`together/openai/gpt-oss-120b`. A [dedicated endpoint](https://docs.together.ai/docs/dedicated-endpoints/overview) is
addressed the same way: its endpoint string, `<project-slug>/<endpoint-name>`, goes in the `model` field, and requests
go to `https://api-inference.together.ai/v1` instead of the serverless base URL. The sample's `together/` prefix only
reaches the serverless API: to call a dedicated endpoint, add a `PROVIDERS` entry with a distinct name and that base
URL, such as `together-dedicated`, and use its prefix in the model name.

A `ModelProvider` routes a `<provider>/<model>` name to the matching endpoint and returns the Chat Completions model
that the Agents SDK calls:

<!--SNIPSTART python-openai-agents-openai-compatible-model-provider-->
[openai_agents/model_providers/openai_compatible_providers.py](https://github.com/temporalio/samples-python/blob/main/openai_agents/model_providers/openai_compatible_providers.py)
```py
class OpenAICompatibleModelProvider(ModelProvider):
    """Routes ``<provider>/<model>`` names to the matching OpenAI-compatible endpoint.

    One Worker serves every provider whose API key is set, so Workflows on
    different providers run side by side on the same Task Queue. Client
    retries are off: the plugin runs each model call as a Temporal Activity,
    and the Activity's Retry Policy owns the retries.
    """

    def __init__(self, providers: Iterable[OpenAICompatibleProvider]) -> None:
        self._providers = {provider.name: provider for provider in providers}
        self._clients: dict[str, AsyncOpenAI] = {}
        for provider in self._providers.values():
            api_key = os.environ.get(provider.api_key_env)
            if api_key:
                self._clients[provider.name] = AsyncOpenAI(
                    base_url=provider.base_url, api_key=api_key, max_retries=0
                )

    @property
    def configured(self) -> list[str]:
        """Names of the providers whose API key is set."""
        return sorted(self._clients)

    def get_model(self, model_name: str | None) -> Model:
        provider_name, _, model = (model_name or "").partition("/")
        provider = self._providers.get(provider_name)
        if provider is None or not model:
            # A mistake in the Workflow's input: fail the Activity without retrying.
            raise ApplicationError(
                f"Model name {model_name!r} must be <provider>/<model> with a "
                f"provider in {sorted(self._providers)}",
                non_retryable=True,
            )
        client = self._clients.get(provider_name)
        if client is None:
            raise ApplicationError(
                f"Set {provider.api_key_env} and restart the Worker to use {provider_name}",
                non_retryable=True,
            )
        # Chat Completions is the API all of these providers serve. The Agents
        # SDK defaults to the Responses API, which not every provider offers.
        return OpenAIChatCompletionsModel(model=model, openai_client=client)
```
<!--SNIPEND-->

Three details matter here. The provider builds a client only for the providers whose API key is set, and a model name
for a provider without one, or with an unknown prefix, fails the Activity without retrying. Client retries are off
(`max_retries=0`), so every attempt is a visible Activity attempt governed by the Activity's Retry Policy rather than a
hidden retry inside the HTTP client. And the provider builds an `OpenAIChatCompletionsModel` rather than the Agents
SDK's default Responses API model, which Together AI's OpenAI compatibility guide does not cover.

## Configure the Worker

Pass the provider to the plugin. The Worker serves every provider whose key is set and prints which ones at startup. A
custom model provider must set a model Activity timeout; the sample uses 60 seconds. Serverless performance on Together
AI is best-effort, and a dedicated endpoint that was stopped or scaled down pays a cold start on its next request, so
size the timeout for the slowest call you expect rather than the median. The Heartbeat Timeout lets Temporal notice a
Worker that died mid-call within seconds instead of after the full Start-To-Close Timeout; the plugin heartbeats on its
own.

<!--SNIPSTART python-openai-agents-openai-compatible-worker-->
[openai_agents/model_providers/run_openai_compatible_worker.py](https://github.com/temporalio/samples-python/blob/main/openai_agents/model_providers/run_openai_compatible_worker.py)
```py
# One provider for every endpoint whose API key is set. The model name on
# each Workflow's agent selects the endpoint.
model_provider = OpenAICompatibleModelProvider(PROVIDERS.values())
if not model_provider.configured:
    env_vars = ", ".join(provider.api_key_env for provider in PROVIDERS.values())
    sys.exit(f"No provider API key is set; export at least one of {env_vars}.")
print(f"Serving providers: {', '.join(model_provider.configured)}", flush=True)

client = await Client.connect(
    "localhost:7233",
    plugins=[
        OpenAIAgentsPlugin(
            model_params=ModelActivityParameters(
                # A custom model provider must set a timeout. Raise it for
                # slow models or deployments that scale up from zero.
                start_to_close_timeout=timedelta(seconds=60),
                # The plugin heartbeats, so a Worker that dies mid-call is
                # noticed in seconds rather than after the full timeout.
                heartbeat_timeout=timedelta(seconds=10),
            ),
            model_provider=model_provider,
        ),
    ],
)

worker = Worker(
    client,
    task_queue="openai-agents-model-providers-task-queue",
    workflows=[OpenAICompatibleAgentWorkflow],
)
await worker.run()
```
<!--SNIPEND-->

The Client that starts the Workflow also needs `OpenAIAgentsPlugin()`, for its Data Converter, but no model provider:
only the Worker talks to Together AI.

## Write the Workflow

The Workflow is ordinary Agents SDK code. The model name arrives in the Workflow input and goes on the `Agent`, so one
Worker runs Workflows on Together AI and on other providers at the same time. Any model Together AI serves works,
prefixed with `together/`.

<!--SNIPSTART python-openai-agents-openai-compatible-workflow-->
[openai_agents/model_providers/workflows/openai_compatible_workflow.py](https://github.com/temporalio/samples-python/blob/main/openai_agents/model_providers/workflows/openai_compatible_workflow.py)
```py
@dataclass
class OpenAICompatibleAgentInput:
    prompt: str
    # "<provider>/<model>", such as "together/openai/gpt-oss-120b". The Worker's
    # model provider routes the agent's model calls to that provider.
    model: str


@workflow.defn
class OpenAICompatibleAgentWorkflow:
    @workflow.run
    async def run(self, input: OpenAICompatibleAgentInput) -> str:
        # Tools that run inside the Workflow must be async: the Agents SDK runs
        # sync tools in a thread, which the Workflow sandbox does not allow.
        @function_tool
        async def get_weather(city: str) -> str:
            workflow.logger.debug(f"Getting weather for {city}")
            return f"The weather in {city} is sunny."

        agent = Agent(
            name="Assistant",
            instructions="You only respond in haikus. When asked about the weather always use the tool to get the current weather.",
            model=input.model,
            tools=[get_weather],
        )

        result = await Runner.run(agent, input.prompt)
        return result.final_output
```
<!--SNIPEND-->

Name the model on the agent, as the sample does. An agent that names no model inherits the Agents SDK's default settings
for OpenAI's current default model, which include `verbosity` and a reasoning effort; `temporalio-openai-agents` 1.1.0
forwards them to the provider unchanged, and Fireworks AI, for example, rejects `verbosity` with a 400. On that release,
give such an agent an explicit `model_settings=ModelSettings()`.

Tools that run inside the Workflow must be `async`: the Agents SDK runs sync tools in a thread, which the Workflow
sandbox does not allow. Tools that do I/O belong in Activities; see
[Activity-backed tools](/develop/python/integrations/openai-agents#activity-backed-tools).

## Run the sample

Export your Together AI key and start the Worker:

```bash
export TOGETHER_API_KEY="your_api_key"
uv run openai_agents/model_providers/run_openai_compatible_worker.py
```

Then start a Workflow on Together AI in a second terminal:

```bash
uv run openai_agents/model_providers/run_openai_compatible_workflow.py --model together/openai/gpt-oss-120b
```

Export keys for other providers and pass several `--model` values to run one Workflow per model at the same time on
the same Worker.

## Retries, rate limits, and timeouts

The plugin classifies Together AI's HTTP errors. Status 408, 409, 429, and any 5xx retry under the Activity's Retry
Policy, and a `Retry-After` header becomes the next retry delay. Connection errors and client-side timeouts retry as
well. Other 4xx responses, such as an invalid API key or an unknown model name, fail the Activity without retrying, as
does a model name whose provider has no key on the Worker. Event History records the Activity's result, its attempt
count, and its last failure, not every attempt. Individual failed attempts appear in the Worker's logs and, while the
Activity is still retrying, as the pending Activity's last failure when you describe the Workflow Execution.

Under high demand, Together AI's serverless API answers `429 Too Many Requests` or `503 Service Unavailable` and asks
clients to retry with exponential backoff, which is what the default Activity Retry Policy does; Together AI's
documentation does not describe a `Retry-After` header. Its [error codes](https://docs.together.ai/docs/error-codes)
page lists 500, 503, 504, 524, and 529 as retryable and the rest as request, credential, or billing problems to fix
first, including 402 when the account reaches its monthly spending limit and 403 when the prompt plus `max_tokens`
exceeds the model's context length. Serverless performance is best-effort; see
[rate limits](https://docs.together.ai/docs/serverless/rate-limits) for the current policy and
[provisioned throughput](https://docs.together.ai/docs/inference/provisioned-throughput) for reserved capacity with a
throughput and reliability commitment.

## What works through Together AI

Function tools, Activity-backed tools, handoffs, agents as tools, and MCP servers all work unchanged: they run in the
Workflow or in Activities, not at the provider. OpenAI-hosted tools such as web search, file search, code interpreter,
and hosted MCP are Responses API features of OpenAI's own service, so they are not available through the Chat
Completions API that the sample uses. The sample disables the Agents SDK's hosted tracing, which exports to OpenAI; the
[OpenTelemetry tracing](/develop/python/integrations/openai-agents#opentelemetry) path works as usual.

## Together AI notes

- Dedicated endpoints are served at `https://api-inference.together.ai/v1`, not the serverless base URL. Deploy a model,
  wait for the deployment to reach `DEPLOYMENT_STATE_READY` (first-time provisioning takes minutes), then use the
  endpoint string as the model name. A running deployment keeps at least one replica; stopping it ends the cost and
  makes the next request pay a cold start. See [autoscaling](https://docs.together.ai/docs/dedicated-endpoints/scaling)
  for the replica bounds.
- Regional inference: `https://us-api.together.ai/v1` keeps serverless processing in the United States and
  `https://ca-api.together.ai/v1` in Canada, each with its own model list. See
  [geo-specific inference](https://docs.together.ai/docs/serverless/geo-specific-inference).
- `openai/gpt-oss-120b` is a reasoning model. Together AI accepts `reasoning_effort` (`low`, `medium`, or `high`; the
  default is `medium`), which the Agents SDK sends when an agent sets
  `ModelSettings(reasoning=Reasoning(effort="low"))`.
  Together AI returns the model's chain of thought in a `reasoning` field, which the Agents SDK's Chat Completions model
  does not read, so prior reasoning is not passed back between tool calls. See
  [reasoning](https://docs.together.ai/docs/inference/chat/reasoning).
- Structured outputs: an agent's `output_type` becomes a `response_format` JSON schema, which
  [Together AI supports](https://docs.together.ai/docs/inference/chat/structured-outputs) on models marked for it in the
  catalog. Together AI recommends also describing the schema in the prompt, and a response that stops with
  `finish_reason` of `length` leaves the JSON truncated, so give structured answers enough `max_tokens`.
- Model discovery: the `openai` client's `models.list()` works against Together AI, and the serverless catalog marks
  function calling and structured outputs per model. Together AI retires serverless models over time (for example,
  `openai/gpt-oss-20b` in September 2026), so check the [changelog](https://docs.together.ai/docs/changelog) before
  pinning a model in production.

## Samples

- [openai_agents/model_providers](https://github.com/temporalio/samples-python/tree/main/openai_agents/model_providers):
  the same agent on Baseten, Fireworks AI, or Together AI from one Worker, selected per Workflow by the model name.
- [OpenAI Agents SDK integration](/develop/python/integrations/openai-agents): tools, MCP servers, conversation history,
  and tracing with the plugin.