# Hello world

In this tutorial we'll go over the different components that make up a Temporal project.
To set it up see the [getting started](./getting-started) instuctions.

The SDK steers developers to write their Workflows and Activities in TypeScript but vanilla JS is also supported. All examples in the documentation are written in TypeScript.

### Activities

[API reference](https://nodejs.temporal.io/api/modules/activity)

Activities are called from Workflows in order to run non-deterministic code.

Activities are just async functions, they run like typical NodeJS code and can be cancelled and report heartbeats.

`src/activities/greeter.ts`

<!--SNIPSTART nodejs-hello-activity {"enable_source_link": false}-->
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
<!--SNIPEND-->

#### Implementation

A Workflow implmentation module may export a `workflow` object which can be type checked using a pre-defined inteface or `main` - and optionally `signals` and `queries` - directly.

In a Workflow, Activities can be imported and called as regular functions. At runtime, the imported Activities are replaced with stubs which schedule Activities in the system.

`src/workflows/example.ts`

<!--SNIPSTART nodejs-hello-workflow {"enable_source_link": false}-->
<!--SNIPEND-->

### Worker

[API reference](https://nodejs.temporal.io/api/modules/worker)

The Worker connects to the Service and runs Workflows and Activities.

`src/worker/index.ts`

<!--SNIPSTART nodejs-hello-worker {"enable_source_link": false}-->
<!--SNIPEND-->

### Client

[API reference](https://nodejs.temporal.io/api/modules/client)

The client can be used to schedule Workflows and send other requests to the Temporal Service.
It can be used in any NodeJS process e.g an express app and does not depend on the Worker.

`src/worker/schedule-workflow.ts`

<!--SNIPSTART nodejs-hello-client {"enable_source_link": false}-->
<!--SNIPEND-->

### Testing

There's no official support for testing Workflows and Activities.

- Since Activities are async functions they should be testable as long as you avoid using [Context](https://nodejs.temporal.io/api/classes/activity.context) or are able to mock it.
- You can test Workflows by running them with a [WorkflowClient](https://nodejs.temporal.io/api/interfaces/client.workflowclient).
