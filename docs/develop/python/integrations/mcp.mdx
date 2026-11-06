---
id: mcp
title: Model Context Protocol (MCP) integration
sidebar_label: MCP
toc_max_heading_level: 2
tags:
  - Integrations
  - Python SDK
  - Temporal SDKs
description: Call MCP tools, prompts, and resources from Python Workflows, with Activity retries, timeouts, and results preserved across Worker restarts.
---

import { ReleaseNoteHeader } from '@site/src/components';

The `temporalio-mcp` integration runs [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) client operations
as Temporal Activities. Workflow code calls `TemporalMCPClient`, while `MCPPlugin` manages the MCP clients, transports,
and credentials on the Worker. Completed operation results are recorded in Event History and reused during Workflow
replay.

<ReleaseNoteHeader type="prerelease" />

This guide uses the standalone MCP integration, without an agent framework. To give MCP tools to an OpenAI agent,
use the [OpenAI Agents SDK integration](/develop/python/integrations/openai-agents#mcp-servers).

## Install the integration

Use Python 3.10 or later and install the package:

```bash
uv add temporalio-mcp
```

The package installs the Temporal Python SDK (version 1.32.0 or later), MCP Python SDK v2, and Pydantic dependencies.

Before running the example, follow the [Python development environment setup](/develop/python/set-up-your-local-python)
and leave the Temporal Development Server running at `localhost:7233`.
Save the following four Python files in the same directory.

## Create an MCP server

Define an MCP server with an `echo` tool that returns its input. The Worker starts this server as a subprocess and
communicates with it over stdio.

```python title="mcp_server.py"
from mcp.server.mcpserver import MCPServer

server = MCPServer("echo")


@server.tool()
def echo(value: str) -> str:
    """Return the input unchanged."""
    return value


if __name__ == "__main__":
    server.run()
```

## Call a tool from a Workflow

Create a `TemporalMCPClient` with a name you will register on the Worker. Call `call_tool()` with the tool name and
arguments, then read the returned MCP content.

```python title="workflows.py"
from mcp.types import TextContent
from temporalio import workflow
from temporalio.exceptions import ApplicationError
from temporalio.mcp import TemporalMCPClient


@workflow.defn
class EchoWorkflow:
    @workflow.run
    async def run(self, message: str) -> str:
        mcp = TemporalMCPClient("echo")
        result = await mcp.call_tool("echo", {"value": message})
        if result.is_error:
            raise ApplicationError("Echo tool failed", non_retryable=True)
        return "\n".join(
            content.text
            for content in result.content
            if isinstance(content, TextContent)
        )
```

Keep MCP client creation and network I/O on the Worker. The Workflow-side proxy schedules Activities and does not
open an MCP connection itself.

## Register the MCP client on a Worker

Pass `MCPPlugin` a mapping of names to factory functions. Each factory must return a fresh MCP `Client` and transport.
The name must match the one passed to `TemporalMCPClient`.

```python title="run_worker.py"
import asyncio
import sys
from pathlib import Path

from mcp import Client as MCPClient, StdioServerParameters, stdio_client
from temporalio.client import Client
from temporalio.mcp import MCPPlugin
from temporalio.worker import Worker

from workflows import EchoWorkflow


async def main() -> None:
    parameters = StdioServerParameters(
        command=sys.executable,
        args=[str(Path(__file__).with_name("mcp_server.py"))],
    )
    plugin = MCPPlugin(
        clients={"echo": lambda: MCPClient(stdio_client(parameters))},
    )
    client = await Client.connect("localhost:7233")
    async with Worker(
        client,
        task_queue="mcp-demo",
        workflows=[EchoWorkflow],
        plugins=[plugin],
    ):
        await asyncio.Event().wait()


if __name__ == "__main__":
    asyncio.run(main())
```

The plugin registers the MCP Activities and configures the Workflow sandbox to pass through the MCP modules.
You don't need to add `MCPPlugin` to the Temporal Client that starts the Workflow.

For a server available over Streamable HTTP, replace the stdio factory with an MCP client that points to your server:

```python
from mcp import Client as MCPClient
from temporalio.mcp import MCPPlugin

plugin = MCPPlugin(
    clients={"echo": lambda: MCPClient("http://localhost:8000/mcp")},
)
```

That server must expose the `echo` tool used in this example. In-process MCP servers and custom MCP v2 transports
are also supported through the MCP `Client` API.

## Run the Workflow

Start the Worker:

```bash
uv run run_worker.py
```

In another terminal, run a Client that starts the Workflow on the same Task Queue:

```python title="run_workflow.py"
import asyncio

from temporalio.client import Client

from workflows import EchoWorkflow


async def main() -> None:
    client = await Client.connect("localhost:7233")
    result = await client.execute_workflow(
        EchoWorkflow.run,
        "Hello from Temporal",
        id="mcp-echo-workflow",
        task_queue="mcp-demo",
    )
    print(result)


if __name__ == "__main__":
    asyncio.run(main())
```

```bash
uv run run_workflow.py
```

The script prints `Hello from Temporal`. Open the Workflow in the [Web UI](http://localhost:8233) to see the
`temporalio.mcp.echo.call-tool` Activity in its Event History.

## Use tools, prompts, and resources

`TemporalMCPClient` exposes the following request/response operations. Each schedules an Activity named
`temporalio.mcp.<name>.<operation>`, where `<name>` is the registered client name.

| Workflow method | Activity operation | Return type |
| --- | --- | --- |
| `list_tools()` | `list-tools` | `ListToolsResult` |
| `call_tool(name, arguments)` | `call-tool` | `CallToolResult` |
| `list_prompts()` | `list-prompts` | `ListPromptsResult` |
| `get_prompt(name, arguments)` | `get-prompt` | `GetPromptResult` |
| `list_resources()` | `list-resources` | `ListResourcesResult` |
| `list_resource_templates()` | `list-resource-templates` | `ListResourceTemplatesResult` |
| `read_resource(uri)` | `read-resource` | `ReadResourceResult` |

List operations fetch every page within one Activity and return a complete result with `next_cursor=None`.
`list_tools()` caches its result for the lifetime of the Workflow-side client object, so repeated calls on that object
do not schedule another Activity. Pass `cache_tools_list=False` to `TemporalMCPClient` to fetch tools on every call.

## Configure timeouts and retries

Pass an `activity_config` to `TemporalMCPClient` to configure the Activities it schedules:

```python
from datetime import timedelta

from temporalio.common import RetryPolicy
from temporalio.mcp import TemporalMCPClient

mcp = TemporalMCPClient(
    "echo",
    activity_config={
        "start_to_close_timeout": timedelta(seconds=20),
        "schedule_to_close_timeout": timedelta(minutes=1),
        "retry_policy": RetryPolicy(maximum_attempts=3),
    },
)
```

By default, each operation has a one-minute Start-To-Close Timeout. The integration adds this default only when you
omit both `start_to_close_timeout` and `schedule_to_close_timeout`, or set both to `None`.
Set a Schedule-To-Close Timeout to bound the total time, including retries. Retryable errors can retry indefinitely
with the default Retry Policy and no Schedule-To-Close Timeout.

Handle errors according to how the MCP server reports them:

- A tool result with `is_error=True` completes the Activity successfully. Inspect the result in Workflow code and
  decide whether to retry, return an error, or fail the Workflow. The example above fails the Workflow.
- JSON-RPC error responses fail the Activity with an `ApplicationError` whose type is `MCPProtocolError`.
  Its `details[0]` contains the JSON-RPC error code, and `details[1]` contains error data when provided.
  Invalid response schemas also use `MCPProtocolError`, with validation errors in `details[0]`.
- Invalid requests, invalid arguments, and invalid response schemas are non-retryable. Internal server errors,
  closed connections, request timeouts, and transport exceptions remain retryable.

Make tools with side effects [idempotent](/activity-definition#idempotency). An Activity can execute more than
once, such as when a Worker loses the response after the MCP server has completed a tool call.

MCP Activities do not heartbeat. Setting `heartbeat_timeout` does not add heartbeats or enable cancellation delivery.
An Activity timeout also does not cancel an MCP request already running on the Worker. Configure the MCP client's
`read_timeout_seconds` to bound the request itself.

## Manage connections and credentials

For factories with no arguments, the Worker reuses connections that negotiate the modern, sessionless MCP protocol
until they have been idle for five minutes. Set `connection_idle_timeout` on `MCPPlugin` to control reuse:

- Set it to `None` to keep connections until plugin shutdown.
- Set it to `timedelta(0)` to close connections as soon as they become idle.
- Set it to another `timedelta` to change the idle period.

Connections that negotiate a legacy MCP handshake are not shared between Activities.
Keep any state needed across calls in the Workflow or in persistent storage on the MCP server. A Worker restart
creates a new connection; it does not restore MCP server state.

To select configuration for a tenant or another caller, register a factory that accepts one positional parameter and
pass `factory_argument` from the Workflow. For example, given a Worker-side `clients` mapping containing
`{"echo": create_client_for_tenant}`, construct the proxy as:

```python
from temporalio.mcp import TemporalMCPClient

mcp = TemporalMCPClient("echo", factory_argument="tenant-a")
```

The factory receives `"tenant-a"`. A non-`None` argument creates a fresh client for each Activity, without reusing a
connection. Pass only a stable, non-secret identifier: the argument is recorded in Event History.
Resolve credentials inside the Worker-side factory.
