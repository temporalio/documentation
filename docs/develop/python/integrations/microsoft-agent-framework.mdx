---
id: microsoft-agent-framework
title: Microsoft Agent Framework integration
sidebar_label: Microsoft Agent Framework
toc_max_heading_level: 2
tags:
  - Microsoft Agent Framework
  - Python SDK
  - Temporal SDKs
description: Microsoft Agent Framework agents run inside Temporal Workflows with the Python SDK; each model and MCP call is an Activity with timeouts and retries.
---

import { ReleaseNoteHeader } from '@site/src/components';

Temporal's integration with [Microsoft Agent Framework](https://github.com/microsoft/agent-framework) is an
[SDK Plugin](/develop/plugins-guide) that runs an Agent Framework `Agent` inside a Temporal Workflow. You write the
agent the way Agent Framework documents it and swap the chat client for `TemporalChatClient`. Each model round trip then
runs as a Temporal Activity with its own timeout and retries, and Temporal records its result in the Workflow's Event
History.

The agent's own function-invocation loop, tools, middleware, context providers and approvals run in the Workflow. After
a crash or a Worker restart, Temporal replays the Workflow from Event History and the agent resumes after the last
completed Activity instead of starting over.

<ReleaseNoteHeader type="prerelease" />

Code snippets in this guide are taken from the
[Agent Framework plugin samples](https://github.com/temporalio/samples-python/tree/main/microsoft_agent_framework_plugin).
Refer to the samples for the complete code.

## Get started

Install the plugin, then run one agent inside a Workflow.

**Prerequisites**

- This guide assumes you are familiar with Microsoft Agent Framework. If you are not, start with the
  [Agent Framework documentation](https://github.com/microsoft/agent-framework).
- If you are new to Temporal, read [Understanding Temporal](/evaluate/understanding-temporal) or take the
  [Temporal 101](https://learn.temporal.io/courses/temporal_101/) course.
- Set up your local development environment by following
  [Set up your local development environment](/develop/python/set-up-your-local-python). Leave the Temporal development
  server running if you want to test your code locally.
- Use Python 3.11 or later. The plugin declares `requires-python = ">=3.11"`, as Temporal Python SDK 1.36 does; current
  Agent Framework releases require it too.
- Export `OPENAI_API_KEY` in the Worker's environment. The samples use OpenAI's `gpt-4o-mini`; the Workflow never sees
  the key.

### Install the plugin

Install the `temporalio-microsoft-agent-framework` package together with the Agent Framework provider package you use.
The samples use OpenAI:

```bash
uv add temporalio-microsoft-agent-framework agent-framework-openai
```

or with pip:

```bash
pip install temporalio-microsoft-agent-framework agent-framework-openai
```

The package depends on `agent-framework-core` (1.23.0 or newer, below 2), not the `agent-framework` meta package, so it
does not install every provider. The tested range, 1.23.0 through 1.24.0, runs from the floor the plugin was first
tested on through the version its lock pins, which CI runs on every change. MCP support is an extra;
[Connect to MCP servers](#connect-to-mcp-servers) installs it. Refer to the
[package requirements](https://github.com/temporalio/ai-integrations/blob/main/python/microsoft_agent_framework/pyproject.toml)
for the supported Python, Temporal SDK and Agent Framework versions.

Import `MicrosoftAgentFrameworkPlugin`, `TemporalChatClient` and `TemporalMCPToolProvider` from
`temporalio.microsoft_agent_framework`, and `activity_as_tool` from `temporalio.microsoft_agent_framework.workflow`.

### Run an agent with Durable Execution

The following example runs one `Agent` inside a Workflow. The Workflow carries the model name `"gpt-4o-mini"` and
nothing else; the Worker maps that name to a real chat client.

**1. Define the Workflow**

Build the `Agent` over a `TemporalChatClient` instead of a provider client. Each round trip to the model runs as the
`microsoft_agent_framework.invoke_model` Activity with the Activity options you pass to the client. The sample sets a
60-second `start_to_close_timeout`. The defaults are a 5-minute `start_to_close_timeout` and a 10-second
`heartbeat_timeout`; the Activity heartbeats on its own every 5 seconds, so the Temporal Service marks the Activity
timed out within 10 seconds of a Worker dying mid-call and schedules the retry.

<!--SNIPSTART python-microsoft-agent-framework-hello-world-workflow-->
[microsoft_agent_framework_plugin/hello_world/workflow.py](https://github.com/temporalio/samples-python/blob/main/microsoft_agent_framework_plugin/hello_world/workflow.py)
```py
from datetime import timedelta

from agent_framework import Agent
from temporalio import workflow
from temporalio.microsoft_agent_framework import TemporalChatClient


@workflow.defn
class HelloWorldWorkflow:
    @workflow.run
    async def run(self, prompt: str) -> str:
        agent = Agent(
            client=TemporalChatClient(
                "gpt-4o-mini", start_to_close_timeout=timedelta(seconds=60)
            ),
            instructions="You are a concise assistant.",
        )
        response = await agent.run(prompt)
        return response.text
```
<!--SNIPEND-->

**2. Start a Worker**

`MicrosoftAgentFrameworkPlugin(chat_clients=...)` maps each model name to a factory that builds the provider's chat
client. The factory runs on the Worker on first use and its client is cached for the Worker's lifetime, so
`OPENAI_API_KEY` and the connection stay on the Worker. Temporal retries the model Activity, so turn the OpenAI SDK's
own retries off with `AsyncOpenAI(max_retries=0)`; `OpenAIChatClient` has no `max_retries` setting of its own. A client
that still retries gets one warning in the Worker log the first time it runs.

Register the plugin on `Client.connect(...)`, as the sample does. The Worker inherits the plugins of the Client it is
built from, and only a plugin on the Client sets the Pydantic data converter: a Worker takes its converter from its
Client, so a plugin passed to the Worker alone leaves Pydantic models in Workflow inputs and outputs to the default
converter. Do not pass it to both; the second copy registers the model Activities twice and the Worker refuses to start
with a `ValueError`. The plugin registers the `microsoft_agent_framework.invoke_model` and
`microsoft_agent_framework.invoke_model_streaming` Activities and configures the Workflow sandbox for Agent Framework,
so the Worker needs no other wiring. Keep the provider imports and the factory in the Worker module, as the sample does:
the sandbox loads the Workflow file for every run, and the OpenAI SDK's import tree trips its restrictions, so a provider
import in the Workflow file fails the Worker at start.

<!--SNIPSTART python-microsoft-agent-framework-hello-world-worker-->
[microsoft_agent_framework_plugin/hello_world/run_worker.py](https://github.com/temporalio/samples-python/blob/main/microsoft_agent_framework_plugin/hello_world/run_worker.py)
```py
import asyncio
import os

from agent_framework.openai import OpenAIChatClient
from openai import AsyncOpenAI
from temporalio.client import Client
from temporalio.microsoft_agent_framework import MicrosoftAgentFrameworkPlugin
from temporalio.worker import Worker

from microsoft_agent_framework_plugin.hello_world.workflow import HelloWorldWorkflow


def openai_chat_client() -> OpenAIChatClient:
    # Runs on the Worker on first use; OPENAI_API_KEY never reaches the Workflow.
    # Temporal retries the model Activity, so the OpenAI SDK's own retries are off.
    return OpenAIChatClient(
        model="gpt-4o-mini", async_client=AsyncOpenAI(max_retries=0)
    )


async def main() -> None:
    if not os.environ.get("OPENAI_API_KEY"):
        raise SystemExit("Set OPENAI_API_KEY before starting the Worker.")

    plugin = MicrosoftAgentFrameworkPlugin(
        chat_clients={"gpt-4o-mini": openai_chat_client}
    )
    client = await Client.connect(
        os.environ.get("TEMPORAL_ADDRESS", "localhost:7233"),
        plugins=[plugin],
    )

    worker = Worker(
        client,
        task_queue="microsoft-agent-framework-hello-world",
        workflows=[HelloWorldWorkflow],
    )
    print("Worker started. Ctrl+C to exit.")
    await worker.run()


if __name__ == "__main__":
    asyncio.run(main())
```
<!--SNIPEND-->

**3. Run the Workflow**

Start the Workflow from a separate script:

<!--SNIPSTART python-microsoft-agent-framework-hello-world-run-workflow-->
[microsoft_agent_framework_plugin/hello_world/run_workflow.py](https://github.com/temporalio/samples-python/blob/main/microsoft_agent_framework_plugin/hello_world/run_workflow.py)
```py
import asyncio
import os

from temporalio.client import Client

from microsoft_agent_framework_plugin.hello_world.workflow import HelloWorldWorkflow


async def main() -> None:
    client = await Client.connect(os.environ.get("TEMPORAL_ADDRESS", "localhost:7233"))

    result = await client.execute_workflow(
        HelloWorldWorkflow.run,
        "Write a haiku about durable execution.",
        id="microsoft-agent-framework-hello-world",
        task_queue="microsoft-agent-framework-hello-world",
    )

    print(f"Result: {result}")


if __name__ == "__main__":
    asyncio.run(main())
```
<!--SNIPEND-->

The Workflow's Event History shows one `microsoft_agent_framework.invoke_model` Activity. Its summary is the model name,
so the Web UI shows which model each call used.

To run the sample from a `samples-python` checkout: `uv sync --group microsoft-agent-framework`, then
`uv run microsoft_agent_framework_plugin/hello_world/run_worker.py` and, in a second terminal,
`uv run microsoft_agent_framework_plugin/hello_world/run_workflow.py`.

## Build the agent

Choose where each tool runs, connect MCP servers, and add middleware.

### Run tools as Activities

Decide per tool where it runs. A tool that is pure logic stays in the Workflow as an ordinary `@tool`. A tool that does
I/O or reads a clock belongs in an Activity: decorate the function with `@activity.defn`, register it on the Worker, and
pass it to the agent through `activity_as_tool`. The plugin cannot tell the two apart, so the choice is yours.

The sample has one of each. `letter_counter` counts characters and runs in the Workflow:

<!--SNIPSTART python-microsoft-agent-framework-tools-tool-->
[microsoft_agent_framework_plugin/tools/workflow.py](https://github.com/temporalio/samples-python/blob/main/microsoft_agent_framework_plugin/tools/workflow.py)
```py
@tool
def letter_counter(word: str, letter: str) -> int:
    """Count how many times a letter appears in a word, ignoring case."""
    return word.lower().count(letter.lower())
```
<!--SNIPEND-->

`fetch_weather` stands in for an HTTP call and runs as an Activity:

<!--SNIPSTART python-microsoft-agent-framework-tools-activity-->
[microsoft_agent_framework_plugin/tools/workflow.py](https://github.com/temporalio/samples-python/blob/main/microsoft_agent_framework_plugin/tools/workflow.py)
```py
@activity.defn
async def fetch_weather(city: str) -> dict[str, Any]:
    """Look up the current weather for a city."""
    # Stands in for an HTTP call. Anything that does I/O belongs in an Activity.
    return {"city": city, "temperature_f": 72, "conditions": "sunny"}
```
<!--SNIPEND-->

`activity_as_tool` takes the same Activity options as `workflow.execute_activity`, and like it needs a
`start_to_close_timeout` or a `schedule_to_close_timeout`; without either it raises `ValueError` when the tool is built,
not when the model calls it. The sample gives the tool a 30-second `start_to_close_timeout`. Agent Framework reads the
tool's parameter schema from the Activity's signature and its description from the docstring, so `Annotated` parameters
work as they do on `@tool`. A failed Activity, including one that ran out of retries, raises its failure cause from the
tool, and Agent Framework turns that into an error result for the model.

<!--SNIPSTART python-microsoft-agent-framework-tools-workflow-->
[microsoft_agent_framework_plugin/tools/workflow.py](https://github.com/temporalio/samples-python/blob/main/microsoft_agent_framework_plugin/tools/workflow.py)
```py
@workflow.defn
class ToolsWorkflow:
    @workflow.run
    async def run(self, prompt: str) -> str:
        agent = Agent(
            client=TemporalChatClient(
                "gpt-4o-mini", start_to_close_timeout=timedelta(seconds=60)
            ),
            instructions="Use the tools you are given and answer briefly.",
            tools=[
                letter_counter,
                activity_as_tool(
                    fetch_weather, start_to_close_timeout=timedelta(seconds=30)
                ),
            ],
        )
        response = await agent.run(prompt)
        return response.text
```
<!--SNIPEND-->

Register the Activity on the Worker next to the Workflow:

<!--SNIPSTART python-microsoft-agent-framework-tools-worker-->
[microsoft_agent_framework_plugin/tools/run_worker.py](https://github.com/temporalio/samples-python/blob/main/microsoft_agent_framework_plugin/tools/run_worker.py)
```py
import asyncio
import os

from agent_framework.openai import OpenAIChatClient
from openai import AsyncOpenAI
from temporalio.client import Client
from temporalio.microsoft_agent_framework import MicrosoftAgentFrameworkPlugin
from temporalio.worker import Worker

from microsoft_agent_framework_plugin.tools.workflow import ToolsWorkflow, fetch_weather


def openai_chat_client() -> OpenAIChatClient:
    return OpenAIChatClient(
        model="gpt-4o-mini", async_client=AsyncOpenAI(max_retries=0)
    )


async def main() -> None:
    if not os.environ.get("OPENAI_API_KEY"):
        raise SystemExit("Set OPENAI_API_KEY before starting the Worker.")

    plugin = MicrosoftAgentFrameworkPlugin(
        chat_clients={"gpt-4o-mini": openai_chat_client}
    )
    client = await Client.connect(
        os.environ.get("TEMPORAL_ADDRESS", "localhost:7233"),
        plugins=[plugin],
    )

    worker = Worker(
        client,
        task_queue="microsoft-agent-framework-tools",
        workflows=[ToolsWorkflow],
        # The Activity behind the fetch_weather tool.
        activities=[fetch_weather],
    )
    print("Worker started. Ctrl+C to exit.")
    await worker.run()


if __name__ == "__main__":
    asyncio.run(main())
```
<!--SNIPEND-->

A synchronous `def` tool runs on the Workflow's event loop. Agent Framework hands it to `asyncio.to_thread`, which the
Workflow event loop does not implement, so the plugin's Worker runtime rebinds that name in the framework's tool module
to a stand-in that calls the function directly inside a Workflow and still uses a thread anywhere else. The tool object
itself is not changed, so one shared with an Activity or a plain agent in the same process keeps its normal behavior
there. A sync tool that blocks for long blocks the Workflow Task, so keep sync tools quick or make them Activities.

Agent Framework's loop settings apply unchanged: tool calls of one response run concurrently by default
(`allow_concurrent_invocation=True`), a run makes at most `max_iterations` (40) model calls before one last call with
`tool_choice="none"`, and after three consecutive rounds of failing tools the loop stops calling tools and asks for a
final answer. Set them on `TemporalChatClient(function_invocation_configuration={...})`.

### Connect to MCP servers

MCP support runs on [`temporalio-mcp`](/develop/python/integrations/mcp) and MCP Python SDK 2. Install the `mcp`
extra, which adds `temporalio-mcp` 0.4, `mcp` 2.2 or later and `mcp-types`; a project that still pins MCP SDK 1 cannot
install it:

```bash
uv add "temporalio-microsoft-agent-framework[mcp]"
```

`MicrosoftAgentFrameworkPlugin(mcp_clients=...)` maps a server name to a factory that returns an `mcp.Client`, the same
shape as `chat_clients`. A factory that raises fails the attempt with a retryable `ApplicationError` of type
`MicrosoftAgentFrameworkMCPClientFactoryError`, under the same rule as the chat client factories; one that returns
something other than an `mcp.Client` fails the Activity non-retryably with the same type. For each server the
plugin registers the `temporalio.mcp.<server>.list-tools` and `temporalio.mcp.<server>.call-tool` Activities, plus
`temporalio-mcp`'s prompt and resource operations (`list-prompts`, `get-prompt`, `list-resources`,
`list-resource-templates`, `read-resource`). The connection lives on the Worker: the plugin connects on the first MCP
Activity and closes the connection after 5 minutes of idleness (`mcp_connection_idle_timeout`; `None` keeps it until
shutdown, `timedelta(0)` closes it after every Activity).

In the Workflow, `TemporalMCPToolProvider("echo")` is an Agent Framework context provider. Before each `agent.run` it
lists the server's tools through the `list-tools` Activity and adds one tool per entry, with the server's input schema;
`cache_tools=True` lists once per provider instance instead. Each call the model makes runs the `call-tool` Activity.
Pass it in `context_providers`, not `tools`. Agent Framework's `MCPStdioTool`, `MCPStreamableHTTPTool` and
`MCPWebsocketTool` hold a live connection, which cannot exist in a Workflow, so they cannot be used in `tools=`; the
provider replaces them.

<!--SNIPSTART python-microsoft-agent-framework-mcp-workflow-->
[microsoft_agent_framework_plugin/mcp/workflow.py](https://github.com/temporalio/samples-python/blob/main/microsoft_agent_framework_plugin/mcp/workflow.py)
```py
from datetime import timedelta

from agent_framework import Agent
from temporalio import workflow
from temporalio.microsoft_agent_framework import (
    TemporalChatClient,
    TemporalMCPToolProvider,
)


@workflow.defn
class MCPWorkflow:
    @workflow.run
    async def run(self, prompt: str) -> str:
        agent = Agent(
            client=TemporalChatClient(
                "gpt-4o-mini", start_to_close_timeout=timedelta(seconds=60)
            ),
            instructions="Use the echo tool when asked to echo something.",
            context_providers=[
                TemporalMCPToolProvider(
                    "echo", start_to_close_timeout=timedelta(seconds=30)
                )
            ],
        )
        response = await agent.run(prompt)
        return response.text
```
<!--SNIPEND-->

Register the server factory on the Worker. The sample starts a one-tool echo server over stdio; swap in any MCP server
by changing the factory. The sample is its own uv project because it needs MCP Python SDK 2, so its imports are flat:

<!--SNIPSTART python-microsoft-agent-framework-mcp-worker-->
[microsoft_agent_framework_plugin/mcp/run_worker.py](https://github.com/temporalio/samples-python/blob/main/microsoft_agent_framework_plugin/mcp/run_worker.py)
```py
import asyncio
import os
import sys
from pathlib import Path

from agent_framework.openai import OpenAIChatClient
from mcp import Client as MCPClient
from mcp import StdioServerParameters, stdio_client
from openai import AsyncOpenAI
from temporalio.client import Client
from temporalio.microsoft_agent_framework import MicrosoftAgentFrameworkPlugin
from temporalio.worker import Worker

from workflow import MCPWorkflow

ECHO_SERVER = Path(__file__).parent / "echo_mcp_server.py"


def openai_chat_client() -> OpenAIChatClient:
    return OpenAIChatClient(
        model="gpt-4o-mini", async_client=AsyncOpenAI(max_retries=0)
    )


def echo_mcp_client() -> MCPClient:
    # Runs on the Worker. The plugin connects on the first MCP Activity and
    # keeps the connection for 5 minutes of idleness.
    return MCPClient(
        stdio_client(
            StdioServerParameters(command=sys.executable, args=[str(ECHO_SERVER)])
        )
    )


async def main() -> None:
    if not os.environ.get("OPENAI_API_KEY"):
        raise SystemExit("Set OPENAI_API_KEY before starting the Worker.")

    plugin = MicrosoftAgentFrameworkPlugin(
        chat_clients={"gpt-4o-mini": openai_chat_client},
        mcp_clients={"echo": echo_mcp_client},
    )
    client = await Client.connect(
        os.environ.get("TEMPORAL_ADDRESS", "localhost:7233"),
        plugins=[plugin],
    )

    worker = Worker(
        client,
        task_queue="microsoft-agent-framework-mcp",
        workflows=[MCPWorkflow],
    )
    print("Worker started. Ctrl+C to exit.")
    await worker.run()


if __name__ == "__main__":
    asyncio.run(main())
```
<!--SNIPEND-->

The Activity options on the provider apply to its list and call Activities. The sample sets a 30-second
`start_to_close_timeout`; without one, `temporalio-mcp`'s one-minute default applies. The default Retry Policy retries
without limit, so a run waits while its server is down; bound it with `retry_policy` or `schedule_to_close_timeout`.
An exhausted `call-tool` then becomes an error result for the model, and an exhausted `list-tools` raises from
`agent.run`. MCP Activities heartbeat at half the `heartbeat_timeout` while they run, and `temporalio-mcp` defaults it to
10 seconds when the provider leaves it unset, so a cancel reaches a request already running on a Worker and a lost Worker
is noticed within 10 seconds instead of at the start-to-close timeout; in Temporal Cloud each heartbeat that reaches the
Temporal Service is an Action, at most one every 8 seconds of a running request. Pass `heartbeat_timeout=` on
`TemporalMCPToolProvider` to change it, or `None` to turn heartbeats off.
`tool_name_prefix`, `allowed_tools` and `approval_mode` work as they do on Agent Framework's `MCPTool`, and tool names
are normalized the same way: a character outside `A-Za-z0-9_.-` becomes `-` and the separators between the prefix and
the name are trimmed, so `files/read` reaches the model as `files-read` and prefix `gh_` gives `gh_files-read`.
`approval_mode` is one mode for every tool of the server; the per-tool mapping `MCPTool` also takes fails the Workflow
with `MicrosoftAgentFrameworkWorkflowError`. A server tool whose name the agent already has fails the Workflow with
`MicrosoftAgentFrameworkWorkflowError` before the model call; give that provider a `tool_name_prefix` or an
`allowed_tools` list. Tools passed to `agent.run(tools=...)` are merged after context providers run, so a collision with
one of those raises Agent Framework's own `ValueError` instead; put such tools on the `Agent`. Do not register the same
server name through `MCPPlugin` on the same Worker: the Activity names clash. A server name that no Worker registered has
no Activity to run, so the attempt fails with a retryable `NotFoundError` and the run waits until a Worker with that name
polls the Task Queue.

### Add middleware

Pass middleware to the `Agent` or to `TemporalChatClient` as you do natively. Agent middleware runs in the `Agent`; chat
and function middleware run in `TemporalChatClient`'s layers. All of it runs in the Workflow, next to the agent's loop.
In the sample, `delete_file` is a plain `@tool` and `ALLOWED_PREFIX` is `/tmp/`. `BlockOutsideTmp` is function
middleware that refuses `delete_file` calls outside that prefix by setting `context.result` without calling
`call_next()`, so the tool never runs and the model reads the refusal. It normalizes the path with `posixpath.normpath`
before the check, so `/tmp/../etc/passwd` is refused too. `AppendReminder` is chat middleware that appends `REMINDER` to
the instructions of every model call before the request leaves for the Activity.

<!--SNIPSTART python-microsoft-agent-framework-middleware-middleware-->
[microsoft_agent_framework_plugin/middleware/workflow.py](https://github.com/temporalio/samples-python/blob/main/microsoft_agent_framework_plugin/middleware/workflow.py)
```py
ALLOWED_PREFIX = "/tmp/"
REMINDER = "Answer in one short sentence."


class BlockOutsideTmp(FunctionMiddleware):
    """Refuses delete_file calls outside /tmp without running the tool."""

    async def process(
        self,
        context: FunctionInvocationContext,
        call_next: Callable[[], Awaitable[None]],
    ) -> None:
        if context.function.name == "delete_file":
            arguments = context.arguments
            raw_path = str(
                arguments.get("path", "")
                if isinstance(arguments, Mapping)
                else getattr(arguments, "path", "")
            )
            # Normalize first, so "/tmp/../etc/passwd" does not pass as /tmp.
            path = posixpath.normpath(raw_path)
            if not path.startswith(ALLOWED_PREFIX):
                # Not calling call_next() skips the tool; the model gets this result.
                context.result = f"Refused: {raw_path} is outside {ALLOWED_PREFIX}"
                return
        await call_next()


class AppendReminder(ChatMiddleware):
    """Adds a reminder to the instructions of every model call."""

    async def process(
        self, context: ChatContext, call_next: Callable[[], Awaitable[None]]
    ) -> None:
        options = dict(context.options or {})
        instructions = options.get("instructions") or ""
        options["instructions"] = f"{instructions} {REMINDER}".strip()
        context.options = options
        await call_next()
```
<!--SNIPEND-->

<!--SNIPSTART python-microsoft-agent-framework-middleware-workflow-->
[microsoft_agent_framework_plugin/middleware/workflow.py](https://github.com/temporalio/samples-python/blob/main/microsoft_agent_framework_plugin/middleware/workflow.py)
```py
@workflow.defn
class MiddlewareWorkflow:
    @workflow.run
    async def run(self, prompt: str) -> str:
        agent = Agent(
            client=TemporalChatClient(
                "gpt-4o-mini", start_to_close_timeout=timedelta(seconds=60)
            ),
            instructions="You manage files. Use delete_file when asked to delete one.",
            tools=[delete_file],
            middleware=[BlockOutsideTmp(), AppendReminder()],
        )
        response = await agent.run(prompt)
        return response.text
```
<!--SNIPEND-->

:::caution

A Workflow Definition must be [deterministic](/workflow-definition#deterministic-constraints), and middleware is part
of it. Do not read the clock, do I/O or draw random numbers in middleware. Middleware that needs I/O calls
`await workflow.execute_activity(...)`. Context providers run in the Workflow too and may await Activities in
`before_run` and `after_run`.

:::

Agents compose inside the Workflow too. `Agent.as_tool()` turns a sub-agent into a tool of a coordinator; every agent
runs in the Workflow and every agent's model calls are Activities, so the whole tree is durable with no per-agent
wiring. A
sub-agent called through `as_tool()` runs streaming, so its calls are `microsoft_agent_framework.invoke_model_streaming`
Activities. The
[multi-agent sample](https://github.com/temporalio/samples-python/tree/main/microsoft_agent_framework_plugin/multi_agent)
gives each agent its own `TemporalChatClient` with a `summary`, so the Activities read `coordinator`, `researcher` and
`writer` in the Web UI.

## Add human approval to tool calls

Approvals are Agent Framework's own. A tool with `approval_mode="always_require"` does not run; `agent.run` returns with
the request in `response.user_input_requests`, and you answer with `request.to_function_approval_response(approved)` on
the same session. In a Workflow the wait is durable. The sample publishes the pending requests through a
[Query](/develop/python/workflows/message-passing#queries), waits in `workflow.wait_condition` until a `decide`
[Update](/develop/python/workflows/message-passing#updates) has answered each of them with a `Decision` that carries
the request's identifier and the verdict, and runs the agent again with the decisions. Only an approved call runs the
tool; a rejected call sends the model Agent Framework's rejection result. Agent Framework decides what happens to a
request you do not answer: a response whose `id` matches no pending request is ignored with a log line and the request
stays pending, and a run that brings a new message without answering drops the pending call from the transcript. Check
`response.user_input_requests` before the next run if a dropped request matters.

<!--SNIPSTART python-microsoft-agent-framework-human-in-the-loop-workflow-->
[microsoft_agent_framework_plugin/human_in_the_loop/workflow.py](https://github.com/temporalio/samples-python/blob/main/microsoft_agent_framework_plugin/human_in_the_loop/workflow.py)
```py
from dataclasses import dataclass, field
from datetime import timedelta
from typing import Any

from agent_framework import Agent, AgentResponse, AgentSession, Content, tool
from temporalio import workflow
from temporalio.exceptions import ApplicationError
from temporalio.microsoft_agent_framework import TemporalChatClient


@tool(approval_mode="always_require")
def delete_file(path: str) -> str:
    """Delete a file. Runs only after a person approves."""
    return f"deleted {path}"


@dataclass
class ApprovalRequest:
    request_id: str
    tool_name: str
    arguments: dict[str, Any] = field(default_factory=dict)


@dataclass
class Decision:
    request_id: str
    approved: bool


def approval_request(request: Content) -> ApprovalRequest:
    call = request.function_call
    return ApprovalRequest(
        request_id=request.id or "",
        tool_name=(call.name if call is not None else None) or "",
        arguments=(call.parse_arguments() if call is not None else None) or {},
    )


@workflow.defn
class HumanInTheLoopWorkflow:
    def __init__(self) -> None:
        self._pending: dict[str, ApprovalRequest] = {}
        self._decisions: dict[str, bool] = {}
        self._awaiting_reply = False

    @workflow.query
    def pending_approvals(self) -> list[ApprovalRequest]:
        return list(self._pending.values())

    @workflow.update
    async def decide(self, decision: Decision) -> str:
        # A decision can arrive in the same Workflow Task as the model's reply,
        # before the loop in run has read the requests in that reply. Judge the
        # id once the reply has been read.
        await workflow.wait_condition(lambda: not self._awaiting_reply)
        if decision.request_id in self._decisions:
            raise ApplicationError(
                f"approval request {decision.request_id!r} is already decided",
                non_retryable=True,
            )
        if decision.request_id not in self._pending:
            raise ApplicationError(
                f"no pending approval request {decision.request_id!r}",
                non_retryable=True,
            )
        self._decisions[decision.request_id] = decision.approved
        return "approved" if decision.approved else "rejected"

    @decide.validator
    def validate_decide(self, decision: Decision) -> None:
        # Validators run before the Workflow sees the model's reply, so this one
        # checks the input and not the state. Bad input never enters history.
        if not decision.request_id:
            raise ValueError("request_id is required")

    @workflow.run
    async def run(self, prompt: str) -> str:
        agent = Agent(
            client=TemporalChatClient(
                "gpt-4o-mini", start_to_close_timeout=timedelta(seconds=60)
            ),
            instructions="You manage files. Use delete_file when asked to delete one.",
            tools=[delete_file],
        )
        # Approvals are keyed by the function call's id and resolved against
        # the session, so every run uses the same session.
        session = agent.create_session()
        response = await self._reply(agent, prompt, session)
        while response.user_input_requests:
            requests = response.user_input_requests
            self._pending = {
                item.request_id: item for item in map(approval_request, requests)
            }
            await workflow.wait_condition(
                lambda: all(
                    request_id in self._decisions for request_id in self._pending
                )
            )
            replies = [
                request.to_function_approval_response(self._decisions[request.id or ""])
                for request in requests
            ]
            self._pending = {}
            response = await self._reply(agent, replies, session)
        return response.text

    async def _reply(
        self, agent: Agent, messages: Any, session: AgentSession
    ) -> AgentResponse:
        self._awaiting_reply = True
        try:
            return await agent.run(messages, session=session)
        finally:
            self._awaiting_reply = False
```
<!--SNIPEND-->

Agent Framework keys the approval by the request's `id` and binds the response to the request recorded in the
session, so both runs use the same session. When a provider omits the function call's identifier, the provider's client
assigns one on the Worker before the response enters Event History, so the `id` in a pending request survives a Worker
restart and a replay. The Update's validator checks only that `request_id` is present; the handler does the state check.
The SDK runs the validator when the Update arrives, before the Workflow's main coroutine has seen an Activity result
delivered in the same Workflow Task, so a validator that checked for a pending request would reject a decision that
arrives together with the model's reply. The handler instead waits until the reply has been read, then fails the Update
with an `ApplicationError` for a request that is already decided or not pending, so a double submit or a wrong
identifier cannot answer a later request.

## Return structured output

Pass a Pydantic class as `response_format` in the run options. It crosses to the model Activity as the strict JSON
schema the OpenAI clients send natively for a class (`strict: true` under the class name, every property required,
`additionalProperties: false`), so the provider holds the model to the schema, and the Workflow parses the reply into
`response.value`:

<!--SNIPSTART python-microsoft-agent-framework-structured-output-workflow-->
[microsoft_agent_framework_plugin/structured_output/workflow.py](https://github.com/temporalio/samples-python/blob/main/microsoft_agent_framework_plugin/structured_output/workflow.py)
```py
from datetime import timedelta

from agent_framework import Agent
from pydantic import BaseModel, Field
from temporalio import workflow
from temporalio.exceptions import ApplicationError
from temporalio.microsoft_agent_framework import TemporalChatClient


class PersonInfo(BaseModel):
    name: str = Field(description="Name of the person")
    age: int = Field(description="Age of the person")
    occupation: str = Field(description="Occupation of the person")


@workflow.defn
class StructuredOutputWorkflow:
    @workflow.run
    async def run(self, prompt: str) -> PersonInfo:
        agent = Agent(
            client=TemporalChatClient(
                "gpt-4o-mini", start_to_close_timeout=timedelta(seconds=60)
            ),
            instructions="Extract the person's details from the text.",
        )
        # The model's JSON schema crosses to the Activity; the Workflow parses the reply.
        response = await agent.run(prompt, options={"response_format": PersonInfo})
        person = response.value
        if not isinstance(person, PersonInfo):
            raise ApplicationError(
                "The model did not return a PersonInfo", non_retryable=True
            )
        return person
```
<!--SNIPEND-->

The Workflow returns the model itself. With the plugin on the Client, it sets the
[Pydantic data converter](/develop/python/data-handling/data-conversion#use-pydantic-models) unless your Client already
has a payload converter of its own, so the typed value crosses the Workflow boundary; a plugin on the Worker alone does
not change the converter. Add `MicrosoftAgentFrameworkPlugin()` to the starter's Client as well, as the sample does, so
the starter decodes the result with the same converter; the starter is a separate process, so this is not a second copy
on the Worker. `response.value` parses with the run's `response_format` from an `Agent` run or from
`client.get_response(...)` on the `TemporalChatClient` itself.

## Stream agent output

`agent.run(prompt, stream=True)` works as it does natively: the `microsoft_agent_framework.invoke_model_streaming`
Activity consumes the provider's stream and the Workflow receives the updates once the Activity completes. To forward
updates to a consumer outside the Workflow while the call runs, host a
[Workflow Stream](/develop/python/workflows/workflow-streams) on the Workflow and pass `streaming_topic` to
`TemporalChatClient`. With a topic set, every model call of that client runs as the streaming Activity, with or without
`stream=True`, and publishes each `ChatResponseUpdate`, in its `to_dict()` form, to the topic; a run without
`stream=True` gets its response assembled from the same updates. A batch goes out every 100 milliseconds
(`streaming_batch_interval`) or at 256 updates, whichever comes first. Each batch is one Signal to the Workflow, so it
adds an Event to Event History and counts toward the 10,000 Signals a Workflow Execution can receive. A client without a
topic runs `agent.run(prompt)` as the plain model Activity and publishes nothing.

<!--SNIPSTART python-microsoft-agent-framework-streaming-workflow-->
[microsoft_agent_framework_plugin/streaming/workflow.py](https://github.com/temporalio/samples-python/blob/main/microsoft_agent_framework_plugin/streaming/workflow.py)
```py
from datetime import timedelta

from agent_framework import Agent
from temporalio import workflow
from temporalio.contrib.workflow_streams import WorkflowStream
from temporalio.microsoft_agent_framework import TemporalChatClient

STREAMING_TOPIC = "events"


@workflow.defn
class StreamingWorkflow:
    def __init__(self) -> None:
        # Host the stream so the model Activity has somewhere to publish.
        self._stream = WorkflowStream()

    @workflow.run
    async def run(self, prompt: str) -> str:
        agent = Agent(
            client=TemporalChatClient(
                "gpt-4o-mini",
                start_to_close_timeout=timedelta(seconds=60),
                streaming_topic=STREAMING_TOPIC,
            ),
            instructions="You are a concise assistant.",
        )
        # With a topic set, this call runs as the streaming Activity and
        # publishes its updates, with or without stream=True.
        response = await agent.run(prompt)
        return response.text
```
<!--SNIPEND-->

Any client can subscribe to the topic by Workflow ID and decode each item with `ChatResponseUpdate.from_dict`:

<!--SNIPSTART python-microsoft-agent-framework-streaming-client-->
[microsoft_agent_framework_plugin/streaming/run_workflow.py](https://github.com/temporalio/samples-python/blob/main/microsoft_agent_framework_plugin/streaming/run_workflow.py)
```py
import asyncio
import os
from datetime import timedelta

from agent_framework import ChatResponseUpdate
from temporalio.client import Client
from temporalio.contrib.workflow_streams import WorkflowStreamClient

from microsoft_agent_framework_plugin.streaming.workflow import (
    STREAMING_TOPIC,
    StreamingWorkflow,
)


async def main() -> None:
    client = await Client.connect(os.environ.get("TEMPORAL_ADDRESS", "localhost:7233"))
    workflow_id = "microsoft-agent-framework-streaming"

    handle = await client.start_workflow(
        StreamingWorkflow.run,
        "Count from 1 to 5, one number per sentence.",
        id=workflow_id,
        task_queue="microsoft-agent-framework-streaming",
    )

    async def consume() -> None:
        # Each item is a ChatResponseUpdate in its dict form.
        stream = WorkflowStreamClient.create(client, workflow_id)
        async for item in stream.subscribe(
            [STREAMING_TOPIC],
            from_offset=0,
            result_type=dict,
            poll_cooldown=timedelta(milliseconds=50),
        ):
            update = ChatResponseUpdate.from_dict(item.data)
            if update.text:
                print(update.text, end="", flush=True)

    consume_task = asyncio.create_task(consume())
    result = await handle.result()
    # Once the Workflow is complete, subscribe reads the rest of the stream
    # and then ends, so this returns with every update printed.
    await consume_task

    print()
    print(f"Final result: {result}")


if __name__ == "__main__":
    asyncio.run(main())
```
<!--SNIPEND-->

The durable result is the same as without streaming. The Activity result is one payload, which has to stay under the
2 MiB payload limit, so the Activity does not record one entry per token. It records one entry per run of
text, one entry per streamed tool call with its argument deltas merged (a provider's final full-arguments update stays
its own entry), and one entry per usage or finish update; the topic still receives every update. If the updates cannot
all be published, the Activity fails with an `ApplicationError` of type `MicrosoftAgentFrameworkStreamError`. It is
non-retryable when a retry would fail the same way, such as a batch over the 2 MiB payload limit or one past the run's
10,000-Signal limit; other publish failures are retried. A retry calls the model again and publishes from its first
update again, so a subscriber sees the earlier attempt's updates followed by the whole retry; a consumer that must not
repeat output keys on `response_id` (a new provider response carries a new one) or on each call's `call_id`.

## Keep long conversations under the history limit

Temporal owns the conversation by default. Unless you set `store` yourself, `TemporalChatClient` sends `store=False` to
the provider, so the provider keeps no conversation of its own (the OpenAI Responses API stores one and returns its
identifier when `store` is left unset), and when you pass a session, Agent Framework keeps the transcript in its
in-memory history and resends it on every call. Event History is the durable record and replay rebuilds the session.

Every turn adds Events, and a streamed turn adds one per published batch, so a chat that streams has to Continue-As-New
sooner. When `workflow.info().is_continue_as_new_suggested()` turns `True`, serialize the session with
`session.to_dict()` and hand it to a fresh run with [Continue-As-New](/develop/python/workflows/continue-as-new); the new
run restores it with `AgentSession.from_dict`. The dict carries the transcript, pending approval state and the
provider's conversation identifier (`session.service_session_id`). The `Agent` object, provider connections and spans
do not cross; build the agent again in the new run. Your own Workflow state does not cross either: a prompt or an
`end_chat` that arrives while a turn is running sits in the Workflow's fields, so carry those in the input too.

Compaction strategies (`TruncationStrategy`, `SummarizationStrategy(client=TemporalChatClient(...))`) run in the
Workflow and bound what each call resends; the summary call is an Activity. They do not shrink Event History.

In the sample each user turn is an Update, so the caller gets the reply from the same call; a lock runs one turn at a
time so the session's history stays in order, an `end_chat` Signal ends the chat, and a `transcript` Query reads the
messages from the in-memory history provider's entry in `session.state`. The `run` method waits until the chat ends or
Temporal suggests Continue-As-New, lets in-flight Updates finish with `workflow.all_handlers_finished`, and continues
as new with the serialized session:

<!--SNIPSTART python-microsoft-agent-framework-continue-as-new-workflow-->
[microsoft_agent_framework_plugin/continue_as_new/workflow.py](https://github.com/temporalio/samples-python/blob/main/microsoft_agent_framework_plugin/continue_as_new/workflow.py)
```py
import asyncio
from dataclasses import dataclass
from datetime import timedelta
from typing import Any

from agent_framework import Agent, AgentSession, InMemoryHistoryProvider
from temporalio import workflow
from temporalio.microsoft_agent_framework import TemporalChatClient


@dataclass
class ChatInput:
    session: dict[str, Any] | None = None


@workflow.defn
class ChatWorkflow:
    @workflow.init
    def __init__(self, input: ChatInput) -> None:
        # Runs before any handler, so a turn that arrives with the start finds
        # the agent and the session ready.
        self._done = False
        self._lock = asyncio.Lock()
        self._agent = Agent(
            client=TemporalChatClient(
                "gpt-4o-mini", start_to_close_timeout=timedelta(seconds=60)
            ),
            instructions="You are a helpful assistant. Keep replies short.",
        )
        self._session = (
            AgentSession.from_dict(input.session)
            if input.session
            else self._agent.create_session()
        )

    @workflow.update
    async def turn(self, prompt: str) -> str:
        # One turn at a time, so the session's history stays in order.
        async with self._lock:
            response = await self._agent.run(prompt, session=self._session)
            return response.text

    @workflow.signal
    def end_chat(self) -> None:
        self._done = True

    @workflow.query
    def transcript(self) -> list[dict[str, str]]:
        # Agent Framework's in-memory history provider keeps the messages here.
        state = self._session.state.get(InMemoryHistoryProvider.DEFAULT_SOURCE_ID, {})
        messages = state.get("messages", [])
        return [
            {
                "role": str(getattr(message.role, "value", message.role)),
                "text": message.text,
            }
            for message in messages
        ]

    @workflow.run
    async def run(self, input: ChatInput) -> None:
        await workflow.wait_condition(
            lambda: self._done or workflow.info().is_continue_as_new_suggested()
        )
        # Let in-flight turns finish before the handoff.
        await workflow.wait_condition(workflow.all_handlers_finished)

        if not self._done:
            workflow.continue_as_new(ChatInput(session=self._session.to_dict()))
```
<!--SNIPEND-->

To let the provider keep the conversation instead, pass `store=True` in the agent's `default_options` or a run's
`options`. The returned conversation identifier lands in `session.service_session_id`, the next call carries it, and
only the new turn crosses the Activity boundary.

## Compose with an observability plugin

`OpenTelemetryPlugin` composes with `MicrosoftAgentFrameworkPlugin` on the same Client, and the Worker inherits both in
registration order. The sample passes `add_temporal_spans=True`, which adds the `StartWorkflow`, `RunWorkflow`,
`StartActivity` and `RunActivity` spans; the default `OpenTelemetryPlugin()` does not emit them.

Agent Framework starts its `invoke_agent` span from Workflow code through the global tracer provider, so that provider
must be replay-safe: set `create_tracer_provider()` from `temporalio.contrib.opentelemetry` as the global provider
before connecting the Client. With a plain OpenTelemetry SDK `TracerProvider` every replay re-emits the agent spans, and
the plugin warns at Worker and Replayer start. Agent Framework records tool metrics the same way, so wrap a metrics
provider in `ReplaySafeMeterProvider`. The provider client's own `chat` span runs inside the Activity with real timings.

The sample's `install_tracer_provider`, which the Worker calls before `Client.connect`, is these lines plus a service
name on the resource and the endpoint read from `OTEL_EXPORTER_OTLP_ENDPOINT`:

```python
import opentelemetry.trace
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from temporalio.contrib.opentelemetry import create_tracer_provider

provider = create_tracer_provider()
provider.add_span_processor(BatchSpanProcessor(OTLPSpanExporter("http://localhost:4317")))
opentelemetry.trace.set_tracer_provider(provider)
```

<!--SNIPSTART python-microsoft-agent-framework-open-telemetry-worker-->
[microsoft_agent_framework_plugin/open_telemetry/run_worker.py](https://github.com/temporalio/samples-python/blob/main/microsoft_agent_framework_plugin/open_telemetry/run_worker.py)
```py
import asyncio
import os

from agent_framework.openai import OpenAIChatClient
from openai import AsyncOpenAI
from temporalio.client import Client
from temporalio.contrib.opentelemetry import OpenTelemetryPlugin
from temporalio.microsoft_agent_framework import MicrosoftAgentFrameworkPlugin
from temporalio.worker import Worker

from microsoft_agent_framework_plugin.open_telemetry.telemetry import (
    install_tracer_provider,
)
from microsoft_agent_framework_plugin.open_telemetry.workflow import TracedWorkflow


def openai_chat_client() -> OpenAIChatClient:
    return OpenAIChatClient(
        model="gpt-4o-mini", async_client=AsyncOpenAI(max_retries=0)
    )


async def main() -> None:
    if not os.environ.get("OPENAI_API_KEY"):
        raise SystemExit("Set OPENAI_API_KEY before starting the Worker.")

    # Set the provider before connecting; the plugins read it at startup.
    install_tracer_provider("microsoft-agent-framework-worker")
    plugin = MicrosoftAgentFrameworkPlugin(
        chat_clients={"gpt-4o-mini": openai_chat_client}
    )
    # The Worker inherits the Client's plugins in this order: tracing first.
    client = await Client.connect(
        os.environ.get("TEMPORAL_ADDRESS", "localhost:7233"),
        plugins=[OpenTelemetryPlugin(add_temporal_spans=True), plugin],
    )

    worker = Worker(
        client,
        task_queue="microsoft-agent-framework-open-telemetry",
        workflows=[TracedWorkflow],
    )
    print("Worker started. Ctrl+C to exit.")
    await worker.run()


if __name__ == "__main__":
    asyncio.run(main())
```
<!--SNIPEND-->

One trace then runs from the starter's root span through `StartWorkflow:TracedWorkflow`, `RunWorkflow:TracedWorkflow`,
`invoke_agent assistant`, `StartActivity:microsoft_agent_framework.invoke_model` and
`RunActivity:microsoft_agent_framework.invoke_model` to the OpenAI client's `chat gpt-4o-mini` span. See
[Set up tracing](/develop/python/platform/observability#tracing) for the plugin's options.

## Runtime behavior and limitations

- **Temporal owns retries.** Model calls retry under the `retry_policy` on `TemporalChatClient`; Activity tools and
  MCP providers take their own. Provider errors are classified by HTTP status: 408, 409, 429 and 5xx stay retryable and
  honor `retry-after-ms` and `retry-after` headers through the next retry delay (parsed as numbers, fractions included,
  or as an HTTP date; a hint above 60 seconds is capped at 60 seconds), other 4xx are non-retryable, and errors without
  a status,
  such as connection failures, stay retryable. The failure reaches the Workflow as an `ActivityError` whose cause is an
  `ApplicationError` with `type` set to the provider SDK's exception class name, such as `RateLimitError` or
  `AuthenticationError`. Match on `type`, not on the message.
- **Credentials and clients stay on the Worker.** The Workflow carries a model name. A name the Worker that runs the
  Activity does not know fails it with a non-retryable `ApplicationError` of type
  `MicrosoftAgentFrameworkUnknownChatClient`, so during a rolling deployment add a new name to every Worker before
  Workflows use it. A factory that raises (an `OpenAIChatClient` without `OPENAI_API_KEY` on the Worker, for example, or
  a secret store that is down for a moment) fails the attempt with a retryable `ApplicationError` of type
  `MicrosoftAgentFrameworkChatClientFactoryError`, logged at ERROR on the Worker, so the call's `retry_policy` or
  `schedule_to_close_timeout` bounds the wait and another Worker can pick the attempt up; a factory that returns `None`
  fails the Activity non-retryably with the same type. Calling a `TemporalChatClient` outside a Workflow raises
  `RuntimeError`.
- **What crosses the Activity boundary.** Messages and chat options cross in their `to_dict()` form, tools as their
  JSON schema specs, and the `ChatResponse` comes back the same way; provider SDK objects never enter Event History. A
  run's `client_kwargs`, such as `extra_headers`, reach the provider client when they are JSON-compatible. They are
  recorded in Event History, so an `extra_headers` entry named `authorization`, `x-api-key` or `api-key` (in any case)
  fails the Workflow with `MicrosoftAgentFrameworkWorkflowError`; such a header belongs on the provider client in the
  factory, for example `AsyncOpenAI(default_headers=...)`. Hosted tools passed as mappings, such as a provider's web
  search, run on the provider's side. A hosted MCP tool must not carry
  `headers` or `authorization` in Workflow code, because the tool mapping is recorded in Event History; the run fails
  with `MicrosoftAgentFrameworkWorkflowError`. Register the headers on the Worker with
  `MicrosoftAgentFrameworkPlugin(hosted_mcp_headers={...})`, keyed by the server label or URL, and the Activity adds them
  before the provider call; for an OpenAI connector (a mapping with `connector_id`), an `authorization` entry lands in
  the tool's `authorization` field as the bare token, because the Responses API takes a connector's OAuth token there,
  so a leading `Bearer ` is dropped from that one entry, and the other entries stay headers and are passed as written. A
  tool object the plugin cannot send to the model fails the Workflow with
  `MicrosoftAgentFrameworkWorkflowError`.
- **Sandbox and clocks.** The plugin passes `agent_framework`, `pydantic_core`, `annotated_types`, `msgspec`,
  `typing_inspection`, `opentelemetry`, `dotenv`, `mcp` and `mcp_types` through the Workflow sandbox, and installs
  Workflow-aware stand-ins for the clock and identifier reads in Agent Framework's agent code (default agent and session
  identifiers, the loop's time budget, span durations) so they replay deterministically. Workers and Replayers both get them. A
  Worker fails at start, naming the seam and the tested range (1.23.0 through 1.24.0), if an Agent Framework release
  moves one of them.
- **Framework exceptions fail the Workflow.** Agent Framework's own exceptions raised in Workflow code, such as
  `MiddlewareFailure`, and `MicrosoftAgentFrameworkWorkflowError` are registered as Workflow failure types, because
  retrying the Workflow Task cannot change a deterministic failure.
- **File-backed persistence does not work in a Workflow.** `FileHistoryProvider` and `FileSessionStore` read and write
  files on a thread, which a Workflow does not have, so the run fails with `MicrosoftAgentFrameworkWorkflowError`
  naming the call. Use the default in-memory history and carry `session.to_dict()` across Continue-As-New, or pass
  `store=True` to let the provider keep the conversation.
- **MCP tool classes do not work in `tools=`.** `MCPStdioTool`, `MCPStreamableHTTPTool` and `MCPWebsocketTool` hold a
  live connection; use `TemporalMCPToolProvider` in `context_providers`. The provider exposes tools only: server prompts
  are not loaded, a result's `_meta` is not carried to the model, and there is no `tool_result_content` choice.
- **Global OpenTelemetry providers must be replay-safe.** Agent Framework emits agent spans and tool metrics from
  Workflow code; use `create_tracer_provider()` and `ReplaySafeMeterProvider`, or every replay re-emits them.
- **Synchronous tools block the Workflow Task** while they run. Keep them quick or make them Activities.
- **Out of scope.** The Agent Framework Workflows pillar (`WorkflowBuilder`, executors, checkpoints,
  `agent-framework-orchestrations`), the harness, skills, evaluations, DevUI, declarative agents, hosting, memory and
  vector providers, and the experimental agent hooks are out of scope. Compose agents with Temporal Workflow code
  instead: `Agent.as_tool()`, Signals, Timers and Child Workflows. OpenAI background responses (`continuation_token`)
  and embedding clients are not routed through Activities.

## Samples

The
[Agent Framework plugin samples](https://github.com/temporalio/samples-python/tree/main/microsoft_agent_framework_plugin)
cover the ten scenarios on this page: hello world, tools, MCP, human in the loop, middleware, multi-agent, structured
output, streaming, Continue-As-New and OpenTelemetry. The repository's tests run each one against the plugin's scripted
chat client, with no API key. The MCP sample is its own uv project because it needs MCP Python SDK 2. The plugin's
source and README are in the
[`temporalio/ai-integrations` repository](https://github.com/temporalio/ai-integrations/tree/main/python/microsoft_agent_framework).
