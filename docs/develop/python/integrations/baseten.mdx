---
id: baseten
title: Baseten integration
sidebar_label: Baseten
toc_max_heading_level: 2
tags:
  - Baseten
  - Python SDK
  - Temporal SDKs
description:
  Run OpenAI Agents SDK agents on open-weight models served by Baseten, with every model call retried and recorded as a
  Temporal Activity.
---
[Baseten](https://www.baseten.co/) serves open-weight models such as gpt-oss, DeepSeek, GLM, and Kimi, both on its
shared Model APIs and on dedicated deployments, through an API compatible with the OpenAI Chat Completions API.

Temporal's [OpenAI Agents SDK integration](/develop/python/integrations/openai-agents) runs each model call as an
Activity. A call to Baseten gets retries with backoff, a timeout, and a durable record in Event History, and the agent
loop around it survives Worker restarts. Because Baseten speaks the OpenAI Chat Completions API, the integration's model
provider hook is all you need: a model provider that maps a model name such as `baseten/openai/gpt-oss-120b` to
Baseten's endpoint. One Worker can serve Baseten alongside other providers, and each Workflow picks its provider through
the model name it gives its agent.

This integration is a sample pattern rather than a plugin. Code snippets in this guide are taken from the
[OpenAI Agents SDK model provider samples](https://github.com/temporalio/samples-python/tree/main/openai_agents/model_providers),
which run the same agent on Baseten, Fireworks AI, or Together AI from one Worker.

## Prerequisites

- This guide assumes you are already familiar with the
  [OpenAI Agents SDK integration](/develop/python/integrations/openai-agents) and with Baseten's
  [OpenAI-compatible API](https://docs.baseten.co/inference/model-apis/overview).
- If you are new to Temporal, we recommend reading [Understanding Temporal](/evaluate/understanding-temporal) or taking
  the [Temporal 101](https://learn.temporal.io/courses/temporal_101/) course.
- Set up your local development environment by following
  [Set up your local development environment](/develop/python/set-up-your-local-python) and leave the Temporal
  development server running.
- Create a [Baseten API key](https://app.baseten.co/settings/api_keys) and export it as `BASETEN_API_KEY` in the
  Worker's environment. The key stays in the Worker process; it is never part of Workflow input or Event History.

## Install

```bash
uv add temporalio-openai-agents
```

The package installs the Temporal Python SDK, the OpenAI Agents SDK, and the `openai` client. The Baseten CLI and the
`truss` package are for deploying models to Baseten; calling Model APIs needs neither.

## Configure the model provider

The sample describes each provider as a base URL, the environment variable that holds its API key, and an example model
with tool calling:

<!--SNIPSTART python-openai-agents-baseten-provider-->
[openai_agents/model_providers/openai_compatible_providers.py](https://github.com/temporalio/samples-python/blob/main/openai_agents/model_providers/openai_compatible_providers.py)
```py
BASETEN = OpenAICompatibleProvider(
    name="baseten",
    base_url="https://inference.baseten.co/v1",
    api_key_env="BASETEN_API_KEY",
    default_model="openai/gpt-oss-120b",
)
```
<!--SNIPEND-->

Model APIs name models the way Hugging Face does, as `<organization>/<model>`, so the example here is
`openai/gpt-oss-120b`, named `baseten/openai/gpt-oss-120b` from a Workflow: an open-weight model under the Apache 2.0
license that Baseten serves on Model APIs, where tool calling is supported for every model. Its
[model library page](https://www.baseten.co/library/gpt-oss-120b/) and `GET https://inference.baseten.co/v1/models`
describe the catalog. A [dedicated deployment](https://docs.baseten.co/inference/calling-your-model) has its own base
URL, `https://model-<id>.api.baseten.co/environments/production/sync/v1`, takes the same API key, and expects the model
name that the deployment serves. The sample's `baseten/` prefix only reaches Model APIs: to call a deployment, add a
`PROVIDERS` entry with a distinct name and that base URL, such as `baseten-dedicated`, and use its prefix in the model
name.

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
SDK's default Responses API model, which Baseten does not serve: Model APIs expose Chat Completions and, in beta, the
Anthropic Messages API.

## Configure the Worker

Pass the provider to the plugin. The Worker serves every provider whose key is set and prints which ones at startup. A
custom model provider must set a model Activity timeout; the sample uses 60 seconds. Model APIs need no deployment of
your own to warm up; a dedicated deployment that has scaled to zero parks a request until a replica starts, for up to
1200 seconds by default, so cover that cold start in the timeout or keep `min_replica` above zero. The Heartbeat Timeout
lets Temporal notice a Worker that died mid-call within seconds instead of after the full Start-To-Close Timeout; the
plugin heartbeats on its own.

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
only the Worker talks to Baseten.

## Write the Workflow

The Workflow is ordinary Agents SDK code. The model name arrives in the Workflow input and goes on the `Agent`, so one
Worker runs Workflows on Baseten and on other providers at the same time. Any model Baseten serves works, prefixed with
`baseten/`.

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

Export your Baseten key and start the Worker:

```bash
export BASETEN_API_KEY="your_api_key"
uv run openai_agents/model_providers/run_openai_compatible_worker.py
```

Then start a Workflow on Baseten in a second terminal:

```bash
uv run openai_agents/model_providers/run_openai_compatible_workflow.py --model baseten/openai/gpt-oss-120b
```

Export keys for other providers and pass several `--model` values to run one Workflow per model at the same time on
the same Worker.

## Retries, rate limits, and timeouts

The plugin classifies Baseten's HTTP errors. Status 408, 409, 429, and any 5xx retry under the Activity's Retry Policy,
and a `Retry-After` header becomes the next retry delay. Connection errors and client-side timeouts retry as well. Other
4xx responses, such as an invalid API key or an unknown model name, fail the Activity without retrying, as does a model
name whose provider has no key on the Worker. Event History records the Activity's result, its attempt count, and its
last failure, not every attempt. Individual failed attempts appear in the Worker's logs and, while the Activity is still
retrying, as the pending Activity's last failure when you describe the Workflow Execution.

Baseten enforces requests-per-minute and tokens-per-minute limits that depend on your
[account tier](https://docs.baseten.co/inference/model-apis/pricing-and-limits) and answers `429` when either is
exceeded; the `x-ratelimit-remaining-requests` and `x-ratelimit-remaining-tokens` headers show which one hit zero. A
`529` means Baseten had no serving capacity for the request even within your limits. Both retry under the Activity's
Retry Policy. Baseten's [error reference](https://docs.baseten.co/inference/errors) asks for exponential backoff and
mentions a `Retry-After` header only as a possibility on `529`, so the Retry Policy's backoff, not the provider, usually
sets the pace. Sustained `429` responses mean the limit itself needs to go up, through Baseten's
[rate limit increase form](https://www.baseten.co/talk-to-us/increase-rate-limits/).

## What works through Baseten

Function tools, Activity-backed tools, handoffs, agents as tools, and MCP servers all work unchanged: they run in the
Workflow or in Activities, not at the provider. OpenAI-hosted tools such as web search, file search, code interpreter,
and hosted MCP are Responses API features of OpenAI's own service, so they are not available through the Chat
Completions API that the sample uses. The sample disables the Agents SDK's hosted tracing, which exports to OpenAI; the
[OpenTelemetry tracing](/develop/python/integrations/openai-agents#opentelemetry) path works as usual.

## Baseten notes

- A dedicated deployment is called at `https://model-<id>.api.baseten.co/environments/production/sync/v1` with the same
  `Authorization: Bearer` key; the legacy `Api-Key` scheme is still accepted. The model name must match what the
  deployment serves. A deployment whose `min_replica` is zero releases its replicas when idle, and the first request
  after that waits for a replica to start; see Baseten's
  [request lifecycle](https://docs.baseten.co/deployment/autoscaling/request-lifecycle) page.
- `GET https://inference.baseten.co/v1/models` lists the Model APIs catalog with context windows, pricing, and supported
  features, as does `baseten model-api list` from the Baseten CLI. Baseten notes that the catalog can report different
  limits from the ones the endpoint enforces.
- gpt-oss-120b reasons by default at `medium` effort. The reasoning arrives in `reasoning_content` on the assistant
  message, and its tokens count as output tokens. Set `ModelSettings(reasoning=Reasoning(effort="low"))` on the agent to
  change the effort; Baseten's [reasoning](https://docs.baseten.co/inference/model-apis/reasoning) page lists the
  accepted values per model.
- Tool calling, structured outputs, and JSON mode are available on every Model API through `tools` and
  `response_format`; see Baseten's [function calling](https://docs.baseten.co/inference/function-calling) and
  [structured outputs](https://docs.baseten.co/inference/structured-outputs) guides. Only one completion per request is
  supported, so leave `n` at its default.
- Baseten reuses cached input tokens across requests that share an `x-session-affinity` header. An agent run resends the
  growing conversation on every turn, so sending the Workflow ID as the session, through
  `ModelSettings(extra_headers=...)`, lets later turns reuse the cache. Baseten recommends at most about 60 requests per
  minute per session.
- Two Baseten features sit outside this pattern: async inference, which delivers results to a webhook and works only on
  dedicated deployments, and server-side web search tools on Model APIs, which are in preview.

## Samples

- [openai_agents/model_providers](https://github.com/temporalio/samples-python/tree/main/openai_agents/model_providers):
  the same agent on Baseten, Fireworks AI, or Together AI from one Worker, selected per Workflow by the model name.
- [OpenAI Agents SDK integration](/develop/python/integrations/openai-agents): tools, MCP servers, conversation history,
  and tracing with the plugin.