# Hello world

In this tutorial we'll go over the different components that make up a Temporal project.
To set it up see the [getting started](./getting-started) instuctions.

The SDK steers developers to write their workflows and activities in TypeScript but vanilla JS is also supported. All examples in the documentation are written in TypeScript.

### Activities

[API reference](./reference/modules/activity)

Activities are called from workflows in order to run non-deterministic code.

Activities are just async functions, they run like typical NodeJS code and can be cancelled and report heartbeats.

`src/activities/greeter.ts`

<!--SNIPSTART nodejs-hello-activity {"enable_source_link": false}-->
<!--SNIPEND-->

### Workflows

[API reference](./reference/modules/workflow)

Workflows are the core of the Temporal system, they abstract away the complexities of writing distributed programs.

In the NodeJS SDK, each workflow runs in a separate V8 isolate to provide a [deterministic runtime](./determinism).

#### Interface

A workflow's interface is used for validating the implementation and generating a type safe [WorkflowClient](./reference/interfaces/client.workflowclient) and `ChildWorkflow` (not yet implemented).

Workflow interfaces are directly referenced by their implementation and maybe be written in sync or async form meaning a method could return `number` or it could return `Promise<number>`.

Workflow interface declarations are optional, they're only required for generating type safe clients. It is considered good practice to declare an interface for each workflow.

`src/interfaces/workflows.ts`

<!--SNIPSTART nodejs-hello-workflow-interface {"enable_source_link": false}-->
<!--SNIPEND-->

#### Implementation

A workflow implmentation module may export a `workflow` object which can be type checked using a pre-defined inteface or `main` - and optionally `signals` and `queries` - directly.

In a workflow, activities can be imported and called as regular functions. At runtime, the imported activities are replaced with stubs which schedule activities in the system.

`src/workflows/example.ts`

<!--SNIPSTART nodejs-hello-workflow {"enable_source_link": false}-->
<!--SNIPEND-->

### Worker

[API reference](./reference/modules/worker)

The worker connects to the service and runs workflows and activities.

`src/worker/index.ts`

<!--SNIPSTART nodejs-hello-worker {"enable_source_link": false}-->
<!--SNIPEND-->

### Client

[API reference](./reference/modules/client)

The client can be used to schedule workflows and send other requests to the temporal service.
It can be used in any NodeJS process e.g an express app and does not depend on the worker.

`src/worker/schedule-workflow.ts`

<!--SNIPSTART nodejs-hello-client {"enable_source_link": false}-->
<!--SNIPEND-->

### Testing

There's no official support for testing workflows and activities.

- Since activities are async functions they should be testable as long as you avoid using [Context](./reference/classes/activity.context) or are able to mock it.
- You can test workflows by running them with a [WorkflowClient](./reference/interfaces/client.workflowclient).
