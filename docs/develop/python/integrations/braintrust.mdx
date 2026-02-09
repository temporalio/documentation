---
id: braintrust
title: Braintrust integration
sidebar_label: Braintrust integration
toc_max_heading_level: 2
keywords:
  - ai
  - agents
  - braintrust
  - observability
  - tracing
  - prompts
tags:
  - Braintrust
  - Python SDK
  - Temporal SDKs
description:
  Add LLM observability and prompt management to Python Workflows using the Temporal Python SDK and Braintrust.
---

Temporal's integration with [Braintrust](https://braintrust.dev) gives you full observability into your AI agent
Workflows—tracing every LLM call, managing prompts without code deploys, and tracking costs across models.

When building AI agents with Temporal, you get durable execution: automatic retries, state persistence, and the ability
to recover from failures mid-workflow. Braintrust adds the observability layer: see exactly what your agents are doing,
iterate on prompts in a UI, and measure whether changes improve outcomes.

The integration connects these capabilities with minimal code changes. Every Workflow and Activity becomes a span in
Braintrust, and every LLM call is traced with inputs, outputs, tokens, and latency.

:::info

The Temporal Python SDK integration with Braintrust is currently in
[Public Preview](/evaluate/development-production-features/release-stages#public-preview). Refer to the
[Temporal product release stages guide](/evaluate/development-production-features/release-stages) for more information.

:::

All code snippets in this guide are taken from the
[deep research sample](https://github.com/braintrustdata/braintrust-cookbook/blob/main/examples/TemporalDeepResearch/TemporalDeepResearch.mdx). Refer to the sample for the
complete code and run it locally.

## Prerequisites

- This guide assumes you are already familiar with Braintrust. If you aren't, refer to the
  [Braintrust documentation](https://www.braintrust.dev/docs) for more details.
- If you are new to Temporal, we recommend reading [Understanding Temporal](/evaluate/understanding-temporal) or taking
  the [Temporal 101](https://learn.temporal.io/courses/temporal_101/) course.
- Ensure you have set up your local development environment by following the
  [Set up your local development environment](/develop/python/core-application) guide. When you're done, leave the
  Temporal Development Server running if you want to test your code locally.

## Configure Workers to use Braintrust

Workers execute the code that defines your Workflows and Activities. To trace Workflow and Activity execution in
Braintrust, add the `BraintrustPlugin` to your Worker.

Follow the steps below to configure your Worker.

1. Install the Braintrust SDK with Temporal support.

   ```bash
   uv pip install "braintrust[temporal]"
   ```

2. Initialize the Braintrust logger before creating your Worker. The logger must be initialized first so that spans are
   properly connected.

   ```python
   import os
   from braintrust import init_logger

   # Initialize BEFORE creating the Temporal client or worker
   init_logger(project=os.environ.get("BRAINTRUST_PROJECT", "my-project"))
   ```

3. Add the `BraintrustPlugin` to your Worker.

   ```python
   from braintrust.contrib.temporal import BraintrustPlugin
   from temporalio.worker import Worker

   worker = Worker(
       client,
       task_queue="my-task-queue",
       workflows=[MyWorkflow],
       activities=[my_activity],
       plugins=[BraintrustPlugin()],  # Add this line
   )
   ```

4. Add the plugin to your Temporal Client as well. This enables span context propagation, linking client code to the
   Workflows it starts.

   ```python
   from temporalio.client import Client
   from braintrust.contrib.temporal import BraintrustPlugin

   client = await Client.connect(
       "localhost:7233",
       plugins=[BraintrustPlugin()],
   )
   ```

5. Run the Worker. Ensure the Worker process has access to your Braintrust API key via the `BRAINTRUST_API_KEY`
   environment variable.

   ```bash
   export BRAINTRUST_API_KEY="your-api-key"
   python worker.py
   ```

   :::tip

   You only need to provide API credentials to the Worker process. The client application that starts Workflow
   Executions doesn't need the Braintrust API key.

   :::

## Trace LLM calls with wrap_openai

The simplest way to trace LLM calls is to wrap your OpenAI client. Every call through the wrapped client automatically
creates a span in Braintrust with inputs, outputs, token counts, and latency.

```python
from braintrust import wrap_openai
from openai import AsyncOpenAI

# Wrap the client - all calls are now traced
# max_retries=0 because Temporal handles retries
client = wrap_openai(AsyncOpenAI(max_retries=0))
```

Use this client in your Activities:

```python
from temporalio import activity

@activity.defn
async def invoke_model(prompt: str) -> str:
    client = wrap_openai(AsyncOpenAI(max_retries=0))

    response = await client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt},
        ],
    )

    return response.choices[0].message.content
```

After running a Workflow, you'll see a trace hierarchy in Braintrust:

```
my-workflow-request (client span)
└── temporal.workflow.MyWorkflow
    └── temporal.activity.invoke_model
        └── Chat Completion (gpt-4o)
```

## Add custom spans for application context

Add your own spans to capture business-level context like user queries, workflow inputs, and final outputs.

```python
from braintrust import start_span

async def run_research(query: str):
    with start_span(name="research-request", type="task") as span:
        span.log(input={"query": query})

        result = await client.execute_workflow(
            ResearchWorkflow.run,
            query,
            id=f"research-{uuid.uuid4()}",
            task_queue="research-task-queue",
        )

        span.log(output={"result": result})
        return result
```

## Manage prompts with load_prompt

Braintrust lets you manage prompts in a UI and deploy changes without code deploys. The workflow is:

1. **Develop** prompts in code, see results in Braintrust traces
2. **Create** a prompt in the Braintrust UI from your best version
3. **Evaluate** different versions using Braintrust's eval tools
4. **Deploy** by pointing your code at the Braintrust prompt
5. **Iterate** in the UI—changes go live without code deploys

To load a prompt from Braintrust in your Activity:

```python
import braintrust
from temporalio import activity

@activity.defn
async def invoke_model(prompt_slug: str, user_input: str) -> str:
    # Load prompt from Braintrust
    prompt = braintrust.load_prompt(
        project=os.environ.get("BRAINTRUST_PROJECT", "my-project"),
        slug=prompt_slug,
    )

    # Build returns the full prompt configuration
    built = prompt.build()

    # Extract system message
    system_content = None
    for msg in built.get("messages", []):
        if msg.get("role") == "system":
            system_content = msg["content"]
            break

    client = wrap_openai(AsyncOpenAI(max_retries=0))

    response = await client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": system_content},
            {"role": "user", "content": user_input},
        ],
    )

    return response.choices[0].message.content
```

:::tip

Provide a fallback prompt in your code for resilience. If Braintrust is unavailable, your Workflow continues with the
hardcoded prompt.

```python
DEFAULT_SYSTEM_PROMPT = "You are a helpful assistant."

try:
    prompt = braintrust.load_prompt(project="my-project", slug="my-prompt")
    system_content = extract_system_message(prompt.build())
except Exception as e:
    activity.logger.warning(f"Failed to load prompt: {e}. Using fallback.")
    system_content = DEFAULT_SYSTEM_PROMPT
```

:::

## Example: Deep Research Agent

The [deep research sample](https://github.com/braintrustdata/braintrust-cookbook/blob/main/examples/TemporalDeepResearch/TemporalDeepResearch.mdx) demonstrates a complete AI
agent that:

- Plans research strategies
- Generates search queries
- Executes web searches in parallel
- Synthesizes findings into comprehensive reports

The sample shows all integration patterns: wrapped OpenAI client, BraintrustPlugin on Worker and Client, custom spans,
and prompt management with `load_prompt()`.

To run the sample:

```bash
# Terminal 1: Start Temporal
temporal server start-dev

# Terminal 2: Start the worker
export BRAINTRUST_API_KEY="your-api-key"
export OPENAI_API_KEY="your-api-key"
export BRAINTRUST_PROJECT="deep-research"
uv run python -m worker

# Terminal 3: Run a research query
uv run python -m start_workflow "What are the latest advances in quantum computing?"
```
