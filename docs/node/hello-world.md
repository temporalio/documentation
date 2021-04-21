# Hello world

In this tutorial we'll go over the different components that make up a Temporal project.
All of the code in this page is included in our package initializer, set it up using the [getting started](/docs/node/getting-started) instructions.

The SDK steers developers to write their Workflows and Activities in TypeScript but vanilla JS is also supported. All examples in the documentation are written in TypeScript.

### Activities

[API reference](https://nodejs.temporal.io/api/modules/activity)

Activities are called from Workflows in order to run non-deterministic code.

Activities are just async functions, they run like typical NodeJS code and can be cancelled and report heartbeats.

`src/activities/greeter.ts`

<!--SNIPSTART nodejs-hello-activity {"enable_source_link": false}-->
```ts
export async function greet(name: string): Promise<string> {
  return `Hello, ${name}!`;
}
```
<!--SNIPEND-->

### Workflows

[API reference](https://nodejs.temporal.io/api/modules/workflow)

Workflows are the core of the Temporal system, they abstract away the complexities of writing distributed programs.

In the NodeJS SDK, each Workflow runs in a separate V8 isolate to provide a [deterministic runtime](./determinism).

#### Interface

A Workflow's interface is used for validating the implementation and generating a type safe [WorkflowClient](https://nodejs.temporal.io/api/interfaces/client.workflowclient) and `ChildWorkflow` (not yet implemented).

Workflow interfaces are directly referenced by their implementation and maybe be written in sync or async form meaning a method could return `number` or it could return `Promise<number>`.

Workflow interface declarations are optional, they're only required for generating type safe clients. It is considered good practice to declare an interface for each Workflow.

`src/interfaces/workflows.ts`

<!--SNIPSTART nodejs-hello-workflow-interface {"enable_source_link": false}-->
```ts
import { Workflow } from '@temporalio/workflow';

// Extend the generic Workflow interface to check that Example is a valid workflow interface
// Workflow interfaces are useful for generating type safe workflow clients
export interface Example extends Workflow {
  main(name: string): Promise<string>;
}
```
<!--SNIPEND-->

#### Implementation

A Workflow implmentation module may export a `workflow` object which can be type checked using a pre-defined inteface or `main` - and optionally `signals` and `queries` - directly.

In a Workflow, Activities can be imported and called as regular functions. At runtime, the imported Activities are replaced with stubs which schedule Activities in the system.

`src/workflows/example.ts`

<!--SNIPSTART nodejs-hello-workflow {"enable_source_link": false}-->
```ts
import { Example } from '@interfaces/workflows';
import { greet } from '@activities/greeter';

// A workflow that simply calls an activity
async function main(name: string): Promise<string> {
  return greet(name);
}

// Declare the workflow's type to be checked by the Typescript compiler
export const workflow: Example = { main };
```
<!--SNIPEND-->

### Worker

[API reference](https://nodejs.temporal.io/api/modules/worker)

The Worker connects to the Service and runs Workflows and Activities.
`Worker.create()` accepts these [options](https://nodejs.temporal.io/api/interfaces/worker.workeroptions).

`src/worker/index.ts`

<!--SNIPSTART nodejs-hello-worker {"enable_source_link": false}-->
```ts
import { Worker } from '@temporalio/worker';

async function run() {
  // Automatically locate and register activities and workflows
  // (assuming package was bootstrapped with `npm init @temporalio`).
  // Worker connects to localhost by default and uses console error for logging.
  // Customize the worker by passing options a second parameter of `create()`.
  const worker = await Worker.create(__dirname);
  // Bind to the `tutorial` queue and start accepting tasks
  await worker.run('tutorial');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
```
<!--SNIPEND-->

### Client

[API reference](https://nodejs.temporal.io/api/modules/client)

The client can be used to schedule Workflows and send other requests to the Temporal Service.
It can be used in any NodeJS process e.g an express app and does not depend on the Worker.

`src/worker/schedule-workflow.ts`

<!--SNIPSTART nodejs-hello-client {"enable_source_link": false}-->
```ts
import { Connection } from '@temporalio/client';
import { Example } from '@interfaces/workflows';

async function run() {
  // Connect to localhost and use the "default" namespace
  const connection = new Connection();
  // Create a typed client for the workflow defined above
  const example = connection.workflow<Example>('example', { taskQueue: 'tutorial' });
  const result = await example.start('Temporal');
  console.log(result); // Hello, Temporal
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
```
<!--SNIPEND-->

### Testing

There's no official support for testing Workflows and Activities.

- Since Activities are async functions they should be testable as long as you avoid using [Context](https://nodejs.temporal.io/api/classes/activity.context) or are able to mock it.
- You can test Workflows by running them with a [WorkflowClient](https://nodejs.temporal.io/api/interfaces/client.workflowclient).
