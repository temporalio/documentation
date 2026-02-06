---
id: ai-sdk
title: AI SDK by Vercel integration
sidebar_label: AI SDK by Vercel integration
toc_max_heading_level: 2
keywords:
  - ai
  - agents
  - vercel
tags:
  - AI SDK
  - TypeScript SDK
  - Temporal SDKs
description: Implement AI applications in TypeScript using the Temporal TypeScript SDK and the AI SDK.
---

Temporal's integration with [Vercel's AI SDK](https://ai-sdk.dev/) lets you use the AI SDK's API directly in Workflow
code while Temporal handles Durable Execution.

Like all API calls, LLM API calls are non-deterministic. In a [Temporal Application](/glossary#temporal-application),
that means you cannot make LLM calls directly from a [Workflow](/glossary#workflow); they must run as
[Activities](/glossary#activity). The AI SDK plugin handles this automatically: when you call methods in the AI SDK such
as `generateText()`, the plugin wraps those calls in Activities behind the scenes. This preserves the Vercel AI SDK's
developer experience that you are already familiar with while Temporal handles Durable Execution for you.

All code snippets in this guide are taken from the TypeScript SDK
[ai-sdk samples](https://github.com/temporalio/samples-typescript/tree/main/ai-sdk). Refer to the samples for the
complete code and run them locally.

:::info

The Vercel AI SDK Integration is in Public Preview. Refer to the
[Temporal product release stages guide](/evaluate/development-production-features/release-stages) for more information.

:::

## Prerequisites

- This guide assumes you are already familiar with the Vercel AI SDK. If you aren't, refer to the
  [Vercel AI SDK documentation](https://ai-sdk.dev/) for more details.
- If you are new to Temporal, we also recommend you read the [Understanding Temporal](/evaluate/understanding-temporal)
  document or take the [Temporal 101](https://learn.temporal.io/courses/temporal_101/) course to understand the basics
  of Temporal.
- Ensure you have set up your local development environment by following the
  [Set up your local with the TypeScript SDK](/develop/typescript/set-up-your-local-typescript) guide. When you are
  done, leave the Temporal Development Server running if you want to test your code locally.

## Configure Workers to use the AI SDK

Workers are the compute layer of a Temporal Application. They are responsible for executing the code that defines your
[Workflows](/glossary#workflow) and [Activities](/glossary#activity). Before you can execute a Workflow or Activity with
the Vercel AI SDK, you need to create a Worker and configure it to use the AI SDK plugin.

Follow the steps below to configure your Worker.

1. Install the `@temporalio/ai-sdk` package.

   ```bash
   npm install @temporalio/ai-sdk
   ```

2. Create a `worker.ts` file and configure the Worker to use the AI SDK plugin.

   ```ts {9-11}
   import { openai } from '@ai-sdk/openai';
   import { AiSDKPlugin } from '@temporalio/ai-sdk';

   //... other import statements, initializing a connection
   //  to the Temporal Service to be used by the Worker

   const worker = await Worker.create({
     plugins: [
       new AiSDKPlugin({
         modelProvider: openai,
       }),
     ],
     connection,
     namespace: 'default',
     taskQueue: 'ai-sdk',
     workflowsPath: require.resolve('./workflows'),
     activities,
   });

   // ... code that runs the worker
   ```

   The `modelProvider` specifies which AI provider to use when creating models. Choose the provider that best suits your
   needs. In the Worker options, you are also specifying that the Worker polls the `ai-sdk` Task Queue for work in the
   `default` Namespace. Make sure that you configure your Client application to use the same Task Queue and Namespace.

3. Run the Worker. This Worker will now poll the Temporal Service for work on the `ai-sdk` Task Queue in the `default`
   Namespace until you stop it.

   ```bash
   nodemon worker.ts
   ```

   You must ensure the Worker process has access to your API credentials. Most provider SDKs read credentials from
   environment variables. Refer to the [Vercel AI SDK documentation](https://ai-sdk.dev/providers/ai-sdk-providers) for
   instructions on how to set up your environment variables for the provider you chose.

   :::tip

   You only need to give provider credentials to the Worker process. The client application, meaning the application
   that sends requests to the Temporal Service to start Workflow Executions, doesn't need to know about the credentials.

   :::

See the full example at [ai-sdk samples](https://github.com/temporalio/samples-typescript/tree/main/ai-sdk).

## Develop a Simple Haiku Agent

To help you get started, you can develop a simple Haiku Agent that generates haikus based on a prompt.

If you weren't using Temporal, you would write code like this to generate a haiku:

```ts
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

async function haikuAgent(prompt: string): Promise<string> {
  const result = await generateText({
    model: openai('gpt-4o-mini'),
    prompt,
    system: 'You only respond in haikus.',
  });
  return result.text;
}
```

To add Durable Execution to your agent, implement the agent as a Temporal Workflow. Use the AI SDK as you normally
would, but pass `temporalProvider.languageModel()` as the model. The string you provide (like `'gpt-4o-mini'`) is passed
to your configured `modelProvider` to create the model.

```ts {2,6}
import { generateText } from 'ai';
import { temporalProvider } from '@temporalio/ai-sdk';

export async function haikuAgent(prompt: string): Promise<string> {
  const result = await generateText({
    model: temporalProvider.languageModel('gpt-4o-mini'),
    prompt,
    system: 'You only respond in haikus.',
  });
  return result.text;
}
```

With only two line changes, you have added Durable Execution to your agent. Your agent now gets automatic retries,
timeouts, and the ability to run for extended periods without losing state if the process crashes.

## Provide your durable agent with tools

The Vercel AI SDK lets you provide tools to your agents, and when the model calls them, they execute in the Workflow.
Since tool functions run in Workflow context, they must follow Workflow rules. That means they must call Activities or
Child Workflows to perform non-deterministic operations like API calls.

For example, if you want to call an external API to get the weather, you would implement it as an Activity and call it
from the tool function. The following is an example of an Activity that gets the weather for a given location:

<!--SNIPSTART typescript-vercel-ai-sdk-weather-activity -->

[ai-sdk/src/activities.ts](https://github.com/temporalio/samples-typescript/blob/main/ai-sdk/src/activities.ts)

```ts
export async function getWeather(input: {
  location: string;
}): Promise<{ city: string; temperatureRange: string; conditions: string }> {
  console.log('Activity execution');
  return {
    city: input.location,
    temperatureRange: '14-20C',
    conditions: 'Sunny with wind.',
  };
}
```

<!--SNIPEND-->

Then in your agent implementation, provide the tool to the model using the `tools` option and instruct the model to use
the tool when needed.

```ts {15-23}
import { proxyActivities } from '@temporalio/workflow';
import { generateText, tool } from 'ai';
import { temporalProvider } from '@temporalio/ai-sdk';
import { z } from 'zod';

const { getWeather } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

export async function toolsAgent(question: string): Promise<string> {
  const result = await generateText({
    model: temporalProvider.languageModel('gpt-4o-mini'),
    prompt: question,
    system: 'You are a helpful agent.',
    tools: {
      getWeather: tool({
        description: 'Get the weather for a given city',
        inputSchema: z.object({
          location: z.string().describe('The location to get the weather for'),
        }),
        execute: getWeather,
      }),
    },
    stopWhen: stepCountIs(5),
  });
  return result.text;
}
```

## Integrate with Model Context Protocol (MCP) servers

[Model Context Protocol (MCP)](https://modelcontextprotocol.io/) is an open standard that lets AI applications connect
to external tools and data sources. Calls to MCP servers, being calls to external APIs, are non-deterministic and would
usually need to be implemented as Activities. The Temporal AI SDK integration handles this for you and provides a
built-in implementation of a stateless MCP client that you can use inside Workflows.

Follow the steps below to integrate your agent with an MCP server.

1. Create a connection to the MCP servers using the `experimental_createMCPClient` function from the `@ai-sdk/mcp`
   package. You can register multiple MCP servers by providing multiple factory functions in `mcpClientFactories`.

   ```ts
   import { experimental_createMCPClient as createMCPClient } from '@ai-sdk/mcp';
   import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

   const mcpClientFactories = {
     testServer: () =>
       createMCPClient({
         transport: new StdioClientTransport({
           command: 'node',
           args: ['lib/mcp-server.js'],
         }),
       }),
   };
   ```

   The example uses `StdioClientTransport` as the transport mechanisms for client-server communication. Each time the
   Worker processes a Task that requires communication with the MCP server, it will start the server process and connect
   to it as required by the Task.

2. Configure the Worker to use the MCP client factories.

   ```ts {5}
   const worker = await Worker.create({
     plugins: [
       new AiSDKPlugin({
         modelProvider: openai,
         mcpClientFactories
       }),
     ]},
     ...
   );
   ```

3. In your agent Workflow, use `TemporalMCPClient` to get tools from the MCP server by referencing it by name:

   ```ts {4-5,9}
   import { TemporalMCPClient, temporalProvider } from '@temporalio/ai-sdk';

   export async function mcpAgent(prompt: string): Promise<string> {
     const mcpClient = new TemporalMCPClient({ name: 'testServer' });
     const tools = await mcpClient.tools();
     const result = await generateText({
       model: temporalProvider.languageModel('gpt-4o-mini'),
       prompt,
       tools,
       system: 'You are a helpful agent, You always use your tools when needed.',
       stopWhen: stepCountIs(5),
     });
     return result.text;
   }
   ```

   Both listing tools and calling them run as Activities behind the scenes, giving you automatic retries, timeouts, and
   full observability.
