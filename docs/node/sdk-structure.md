# SDK Structure

The NodeJS SDK is developed in a mono-repo consisting of several packages, the public packages are listed below.

- [`@temporalio/worker`](./reference/modules/worker) - Communicates with the Temporal service and runs workflows and activities
- [`@temporalio/workflow`](./reference/modules/workflow/) - Workflow runtime library
- [`@temporalio/activity`](./reference/modules/activity/) - Access to current activity context
- [`@temporalio/client`](./reference/modules/client/) - Communicate with the Temporal service for things like administration and scheduling workflows
- [`@temporalio/proto`](./reference/modules/proto/) - Compiled protobuf definitions
- [`@temporalio/create`](./package-initializer) - NPM package initializer

The repository is hosted on [github](https://github.com/temporalio/sdk-node) and managed with [`lerna`](https://lerna.js.org/).
