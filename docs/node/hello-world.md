# Hello world in Node

import CustomWarning from "../components/CustomWarning.js"

<CustomWarning>

The Node SDK and associated documentation is in an Alpha stage and may change at any time.

</CustomWarning>

In this tutorial, we'll go over the different components that make up a Temporal project.
All of the code on this page is included in our package initializer skeleton, which we set up in [Getting started](/docs/node/getting-started).

The SDK steers developers to write their Workflows and Activities in TypeScript but vanilla JS is also supported. All examples in the documentation are written in TypeScript.

### Activities

[API reference](https://nodejs.temporal.io/api/namespaces/activity)

Activities are called from Workflows in order to run non-deterministic code.

Activities are just async functions. They run like typical Node.js code, and they can be cancelled and report heartbeats.

`src/activities.ts`

<!--SNIPSTART nodejs-hello-activity {"enable_source_link": false}-->
<!--SNIPEND-->

### Workflows

[API reference](https://nodejs.temporal.io/api/namespaces/workflow)

Workflows are the core of the Temporal system. They abstract away the complexities of writing distributed programs.

In the Node.js SDK, each Workflow runs in a separate V8 isolate in order to provide a [deterministic runtime](/docs/node/determinism).

#### Interface

A Workflow's interface is used for validating the implementation and generating a type safe [WorkflowClient](https://nodejs.temporal.io/api/interfaces/client.workflowclient) and `ChildWorkflow` (not yet implemented).

Workflow interfaces are directly referenced by their implementation and may be written in sync or async form: for example, a method could return a `number` or a `Promise<number>`.

Workflow interface declarations are optional but recommended. They're only required for generating type-safe clients.

`src/interfaces/workflows.ts`

<!--SNIPSTART nodejs-hello-workflow-interface {"enable_source_link": false}-->
<!--SNIPEND-->

#### Implementation

A Workflow implementation may export a `workflow` object, which can be type-checked using a pre-defined interface or `main` (and optionally [signals](signals) and [queries](queries)) directly.

Use `Context.setupActivities` to create functions that schedule Activities in the system.

`src/workflows/example.ts`

<!--SNIPSTART nodejs-hello-workflow {"enable_source_link": false}-->
<!--SNIPEND-->

### Worker

[API reference](https://nodejs.temporal.io/api/namespaces/worker)

The Worker connects to Temporal Server and runs Workflows and Activities.
`Worker.create()` accepts [these options](https://nodejs.temporal.io/api/interfaces/worker.workeroptions).

`src/worker/index.ts`

<!--SNIPSTART nodejs-hello-worker {"enable_source_link": false}-->
<!--SNIPEND-->

### Client

[API reference](https://nodejs.temporal.io/api/namespaces/client)

The client can be used to schedule Workflows and send other requests to Temporal Server.
It can be used in any Node.js process (for example, an [Express](https://expressjs.com/) web server) and is separate from the Worker.

`src/worker/schedule-workflow.ts`

<!--SNIPSTART nodejs-hello-client {"enable_source_link": false}-->
<!--SNIPEND-->

### Testing

There's no official support for testing Workflows and Activities.

- Since Activities are async functions, they should be testable as long as you avoid using [Context](https://nodejs.temporal.io/api/classes/activity.context) or are able to mock it.
- You can test Workflows by running them with a [WorkflowClient](https://nodejs.temporal.io/api/classes/client.workflowclient).
