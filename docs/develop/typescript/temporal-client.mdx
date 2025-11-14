---
id: temporal-client
title: Temporal Client - Typescript SDK
sidebar_label: Temporal Client
toc_max_heading_level: 4
description:
  The Temporal Client SDK enables seamless communication with the Temporal Service, allowing applications to start
  Workflow Executions, send Signals, and query Workflows efficiently.
keywords:
  - temporal typescript client
  - connect typescript client to temporal service
  - initialize temporal client
  - temporal SDK typescript guide
  - start workflow execution typescript
  - temporal cloud connection
  - typescript client for temporal cli
  - custom namespace configuration
  - temporal workflow management
  - temporal client setup
  - typescript workflow execution
  - temporal cloud integration
  - temporal client options
  - managing temporal namespaces
tags:
  - Temporal Client
  - TypeScript SDK
  - Temporal SDKs
  - Certificates
---

A [Temporal Client](/encyclopedia/temporal-sdks#temporal-client) enables you to communicate with the Temporal Service.
Communication with a Temporal Service lets you perform actions such as starting Workflow Executions, sending Signals and
Queries to Workflow Executions, getting Workflow results, and more. You cannot initialize a Temporal Client inside a
Workflow. However, they're commonly initialized inside an Activity to communicate with a Temporal Service.

This page shows you how to do the following using the TypeScript SDK with the Temporal Client:

- [Connect to a local development Temporal Service](#connect-to-development-service)
- [Connect to Temporal Cloud](#connect-to-temporal-cloud)
- [Connect to Temporal Service from a Worker](#connect-to-temporal-service-from-a-worker)
- [Start a Workflow Execution](#start-workflow-execution)
- [Get Workflow results](#get-workflow-results)

In the TypeScript SDK, connecting to Temporal Service from a Temporal Application and from within an Activity rely on a
different type of connection than connecting from a Worker. The sections
[Connect to a local development Temporal Service](#connect-to-development-service) and
[Connect to Temporal Cloud](#connect-to-temporal-cloud) apply to connecting from a Temporal Application or from within
an Activity. See [Connect to Temporal Service from a Worker](#connect-to-temporal-service-from-a-worker) for details on
connecting from a Worker.

## Connect to development Temporal Service {#connect-to-development-service}

To connect to a development Temporal service from a Temporal Application or from within an Activity, import the
[`Connection` class](https://typescript.temporal.io/api/classes/client.Connection) from `@temporalio/client` and use
[`Connection.connect`](https://typescript.temporal.io/api/classes/client.Connection#connect) to create a Connection
object to connect to the Temporal Service. Then pass in that connection when you create a new `Client` instance. If you
leave the connection options empty, the SDK defaults to connecting to `127.0.0.1:7233` in the `default` Namespace.

```ts
import { Connection, Client } from '@temporalio/client';

async function run() {
  const connection = await Connection.connect();
  const client = new Client({ connection });
}
```

If you need to connect to a Temporal Service with custom options, you can provide connection options directly in code,
load them from **environment variables**, or a **TOML configuration file** using the `@temporalio/envconfig` helpers. We
recommend environment variables or a configuration file for secure, repeatable configuration.

<Tabs groupId="connect-options" defaultValue="config-file" >

<TabItem value="config-file" label="Configuration File">

You can use a TOML configuration file to set connection options for the Temporal Client. The configuration file lets you
configure multiple profiles, each with its own set of connection options. You can then specify which profile to use when
creating the Temporal Client.

You can use the environment variable `TEMPORAL_CONFIG_FILE` to specify the location of the TOML file or provide the path
to the file directly in code. If you don't provide the configuration file path, the SDK looks for it at the path
`~/.config/temporalio/temporal.toml` or the equivalent on your OS. Refer to
[Environment Configuration](../environment-configuration.mdx) for more details about configuration files and profiles.

:::info

The connection options set in configuration files have lower precedence than environment variables. This means that if
you set the same option in both the configuration file and as an environment variable, the environment variable value
overrides the option set in the configuration file.

:::

For example, the following TOML configuration file defines two profiles: `default` and `prod`. Each profile has its own
set of connection options.

```toml title="config.toml"
# Default profile for local development
[profile.default]
address = "localhost:7233"
namespace = "default"

# Optional: Add custom gRPC headers
[profile.default.grpc_meta]
my-custom-header = "development-value"
trace-id = "dev-trace-123"

# Production profile for Temporal Cloud
[profile.prod]
address = "your-namespace.a1b2c.tmprl.cloud:7233"
namespace = "your-namespace"
api_key = "your-api-key-here"

# TLS configuration for production
[profile.prod.tls]
# TLS auto-enables when TLS config or an API key is present
# disabled = false
client_cert_path = "/etc/temporal/certs/client.pem"
client_key_path  = "/etc/temporal/certs/client.key"

# Custom headers for production
[profile.prod.grpc_meta]
environment     = "production"
service-version = "v1.2.3"
```

You can create a Temporal Client using a profile from the configuration file as follows. In this example, you load the
`default` profile for local development:

{/* SNIPSTART typescript-env-config-load-default-profile {"highlightedLines": "17-19,28-29"} */}
[env-config/src/load-from-file.ts](https://github.com/temporalio/samples-typescript/blob/main/env-config/src/load-from-file.ts)
```ts {17-19,28-29}
import { Connection, Client } from '@temporalio/client';
import { loadClientConnectConfig } from '@temporalio/envconfig';
import { resolve } from 'path';

async function main() {
  console.log('--- Loading default profile from config.toml ---');

  // For this sample to be self-contained, we explicitly provide the path to
  // the config.toml file included in this directory.
  // By default though, the config.toml file will be loaded from
  // ~/.config/temporalio/temporal.toml (or the equivalent standard config directory on your OS).
  const configFile = resolve(__dirname, '../config.toml');

  // loadClientConnectConfig is a helper that loads a profile and prepares
  // the configuration for Connection.connect and Client. By default, it loads the
  // "default" profile.
  const config = loadClientConnectConfig({
    configSource: { path: configFile },
  });

  console.log(`Loaded 'default' profile from ${configFile}.`);
  console.log(`  Address: ${config.connectionOptions.address}`);
  console.log(`  Namespace: ${config.namespace}`);
  console.log(`  gRPC Metadata: ${JSON.stringify(config.connectionOptions.metadata)}`);

  console.log('\nAttempting to connect to client...');
  try {
    const connection = await Connection.connect(config.connectionOptions);
    const client = new Client({ connection, namespace: config.namespace });
    console.log('✅ Client connected successfully!');
    await connection.close();
  } catch (err) {
    console.log(`❌ Failed to connect: ${err}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```
{/* SNIPEND */}

</TabItem>

<TabItem value="env-vars" label="Environment Variables">

Use the `@temporalio/envconfig` module to set connection options for the Temporal Client using environment variables.
For a list of all available environment variables and their default values, refer to
[Environment Configuration](/references/client-environment-configuration).

For example, the following code snippet loads all environment variables and creates a Temporal Client with the options
specified in those variables. If you have defined a configuration file at either the default location
(`~/.config/temporalio/temporal.toml`) or a custom location specified by the `TEMPORAL_CONFIG_FILE` environment
variable, this will also load the default profile in the configuration file. However, any options set via environment
variables will take precedence.

Set the following environment variables before running your application. Replace the placeholder values with your actual
configuration. Since this is for a local development Temporal Service, the values connect to `localhost:7233` and the
`default` Namespace. You may omit these variables entirely since they're the defaults.

```bash
export TEMPORAL_NAMESPACE="default"
export TEMPORAL_ADDRESS="localhost:7233"
```

After setting the environment variables, use the following code to create the Temporal Client. Since the environment
variables take precedence, they will override any values set in the configuration file. Therefore, you may leave
`loadClientConnectConfig`'s arguments empty:

{/* SNIPSTART typescript-env-config-load-default-profile {"highlightedLines": "7,17-18", "selectedLines": ["1-5","17","19","22-40"]} */}
[env-config/src/load-from-file.ts](https://github.com/temporalio/samples-typescript/blob/main/env-config/src/load-from-file.ts)
```ts {7,17-18}
import { Connection, Client } from '@temporalio/client';
import { loadClientConnectConfig } from '@temporalio/envconfig';
import { resolve } from 'path';

async function main() {
// ...
  const config = loadClientConnectConfig({
// ...
  });
// ...
  console.log(`  Address: ${config.connectionOptions.address}`);
  console.log(`  Namespace: ${config.namespace}`);
  console.log(`  gRPC Metadata: ${JSON.stringify(config.connectionOptions.metadata)}`);

  console.log('\nAttempting to connect to client...');
  try {
    const connection = await Connection.connect(config.connectionOptions);
    const client = new Client({ connection, namespace: config.namespace });
    console.log('✅ Client connected successfully!');
    await connection.close();
  } catch (err) {
    console.log(`❌ Failed to connect: ${err}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```
{/* SNIPEND */}

</TabItem>

<TabItem value="code" label="Code">

If you don't want to use environment variables or a configuration file, you can specify connection options directly in
code. This is convenient for local development and testing. You can also load a base configuration from environment
variables or a configuration file, and then override specific options in code.

```ts
const connection = await Connection.connect({
    address: <endpoint>,
    tls: true,
    apiKey: <APIKey>,
});
const client = new Client({
    connection,
    namespace: <namespace_id>.<account_id>,
});
```

</TabItem>

</Tabs>

## Connect to Temporal Cloud {#connect-to-temporal-cloud}

You can connect to Temporal Cloud using either an [API key](/cloud/api-keys) or through mTLS. Connection to Temporal
Cloud or any secured Temporal Service requires additional connection options compared to connecting to an unsecured
local development instance:

- Your credentials for authentication.
  - If you are using an API key, provide the API key value.
  - If you are using mTLS, provide the mTLS CA certificate and mTLS private key.
- Your _Namespace and Account ID_ combination, which follows the format `<namespace_id>.<account_id>`.
- The _endpoint_ may vary. The most common endpoint used is the gRPC regional endpoint, which follows the format:
  `<region>.<cloud_provider>.api.temporal.io:7233`.
- For Namespaces with High Availability features with API key authentication enabled, use the gRPC Namespace endpoint:
  `<namespace>.<account>.tmprl.cloud:7233`. This allows automated failover without needing to switch endpoints.

You can find the Namespace and Account ID, as well as the endpoint, on the Namespaces tab:

![The Namespace and Account ID combination on the left, and the regional endpoint on the right](/img/cloud/apikeys/namespaces-and-regional-endpoints.png)

You can provide these connection options using environment variables, a configuration file, or directly in code.

<Tabs groupId="connect-api-key-options" defaultValue="config-file" >

<TabItem value="config-file" label="Configuration File">

You can use a TOML configuration file to set connection options for the Temporal Client. The configuration file lets you
configure multiple profiles, each with its own set of connection options. You can then specify which profile to use when
creating the Temporal Client. For a list of all available configuration options you can set in the TOML file, refer to
[Environment Configuration](/references/client-environment-configuration).

You can use the environment variable `TEMPORAL_CONFIG_FILE` to specify the location of the TOML file or provide the path
to the file directly in code. If you don't provide the path to the configuration file, the SDK looks for it at the
default path `~/.config/temporalio/temporal.toml`.

:::info

The connection options set in configuration files have lower precedence than environment variables. This means that if
you set the same option in both the configuration file and as an environment variable, the environment variable value
overrides the option set in the configuration file.

:::

For example, the following TOML configuration file defines a `staging` profile with the necessary connection options to
connect to Temporal Cloud via an API key:

```toml
# Cloud profile for Temporal Cloud
[profile.staging]
address = "your-namespace.a1b2c.tmprl.cloud:7233"
namespace = "your-namespace"
api_key = "your-api-key-here"
```

If you want to use mTLS authentication instead of an API key, replace the `api_key` field with your mTLS certificate and
private key:

```toml
# Cloud profile for Temporal Cloud
[profile.staging]
address = "your-namespace.a1b2c.tmprl.cloud:7233"
namespace = "your-namespace"
tls_client_cert_data = "your-tls-client-cert-data"
tls_client_key_path = "your-tls-client-key-path"
```

With the connections options defined in the configuration file, use the `loadClientConnectConfig` helper from
`@temporalio/envconfig` to load the `staging` profile from the configuration file. You can then pass the resulting
configuration to the `Connection.connect` method. After that, you then pass the `connection` object and the Namespace to
the `Client` constructor to create a Temporal Client using the `staging` profile as follows. After loading the profile,
you can also programmatically override specific connection options before creating the client.

{/* SNIPSTART typescript-env-config-load-profile-with-overrides {"highlightedLines": "15-18,30-31"} */}
[env-config/src/load-profile.ts](https://github.com/temporalio/samples-typescript/blob/main/env-config/src/load-profile.ts)
```ts {15-18,30-31}
import { Connection, Client } from '@temporalio/client';
import { loadClientConnectConfig } from '@temporalio/envconfig';
import { resolve } from 'path';

async function main() {
  console.log("--- Loading 'staging' profile with programmatic overrides ---");

  const configFile = resolve(__dirname, '../config.toml');
  const profileName = 'staging';

  // The 'staging' profile in config.toml has an incorrect address (localhost:9999)
  // We'll programmatically override it to the correct address

  // Load the 'staging' profile.
  const config = loadClientConnectConfig({
    profile: profileName,
    configSource: { path: configFile },
  });

  // Override the target host to the correct address.
  // This is the recommended way to override configuration values.
  config.connectionOptions.address = 'localhost:7233';

  console.log(`\nLoaded '${profileName}' profile from ${configFile} with overrides.`);
  console.log(`  Address: ${config.connectionOptions.address} (overridden from localhost:9999)`);
  console.log(`  Namespace: ${config.namespace}`);

  console.log('\nAttempting to connect to client...');
  try {
    const connection = await Connection.connect(config.connectionOptions);
    const client = new Client({ connection, namespace: config.namespace });
    console.log('✅ Client connected successfully!');
    await connection.close();
  } catch (err) {
    console.log(`❌ Failed to connect: ${err}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```
{/* SNIPEND */}

</TabItem>

<TabItem value="env-vars" label="Environment Variables">

The following environment variables are required to connect to Temporal Cloud:

- `TEMPORAL_NAMESPACE`: Your Namespace and Account ID combination in the format `<namespace_id>.<account_id>`.
- `TEMPORAL_ADDRESS`: The gRPC endpoint for your Temporal Cloud Namespace.
- `TEMPORAL_API_KEY`: Your API key value. Required if you are using API key authentication.
- `TEMPORAL_TLS_CLIENT_CERT_DATA` or `TEMPORAL_TLS_CLIENT_CERT_PATH`: Your mTLS client certificate data or file path.
  Required if you are using mTLS authentication.
- `TEMPORAL_TLS_CLIENT_KEY_DATA` or `TEMPORAL_TLS_CLIENT_KEY_PATH`: Your mTLS client private key data or file path.
  Required if you are using mTLS authentication.

Ensure these environment variables exist in your environment before running your application.

Import the `EnvConfig` package to set connection options for the Temporal Client using environment variables. The
`MustLoadDefaultClientOptions` function will automatically load all environment variables. For a list of all available
environment variables and their default values, refer to
[Environment Configuration](/references/client-environment-configuration).

For example, the following code snippet loads all environment variables and creates a Temporal Client with the options
specified in those variables. If you have defined a configuration file at either the default location
(`~/.config/temporalio/temporal.toml`) or a custom location specified by the `TEMPORAL_CONFIG_FILE` environment
variable, this will also load the default profile in the configuration file. However, any options set via environment
variables will take precedence.

{/* SNIPSTART typescript-env-config-load-default-profile {"highlightedLines": "17-19,28-29", "selectedLines": ["1-5","17","19","22-40"]} */}
[env-config/src/load-from-file.ts](https://github.com/temporalio/samples-typescript/blob/main/env-config/src/load-from-file.ts)
```ts {17-19,28-29}
import { Connection, Client } from '@temporalio/client';
import { loadClientConnectConfig } from '@temporalio/envconfig';
import { resolve } from 'path';

async function main() {
// ...
  const config = loadClientConnectConfig({
// ...
  });
// ...
  console.log(`  Address: ${config.connectionOptions.address}`);
  console.log(`  Namespace: ${config.namespace}`);
  console.log(`  gRPC Metadata: ${JSON.stringify(config.connectionOptions.metadata)}`);

  console.log('\nAttempting to connect to client...');
  try {
    const connection = await Connection.connect(config.connectionOptions);
    const client = new Client({ connection, namespace: config.namespace });
    console.log('✅ Client connected successfully!');
    await connection.close();
  } catch (err) {
    console.log(`❌ Failed to connect: ${err}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```
{/* SNIPEND */}

</TabItem>

<TabItem value="code" label="Code">

You can also provide connections options in your code directly. To create an initial connection, provide the Namespace
and API key values to the `Connection.connect` method.

```ts
const connection = await Connection.connect({
    address: <endpoint>,
    tls: true,
    apiKey: <APIKey>,
});
const client = new Client({
    connection,
    namespace: <namespace_id>.<account_id>,
});
```

To update an API key, use the `setApiKey` method on the Connection object:

```ts
connection.setApiKey(<APIKey>);
```

</TabItem>

</Tabs>

## Connect to Temporal Service from a Worker {#connect-to-temporal-service-from-a-worker}

Connecting to Temporal Service from a Worker requires the same set of connections options as connecting from a Temporal
Application or from within an Activity, but the connection type is different. When connecting from a Worker, you create
a `NativeConnection` object instead of a `Connection` object. The
[`NativeConnection` class](https://typescript.temporal.io/api/classes/worker.NativeConnection) is imported from
`@temporalio/worker` instead of `@temporalio/client`. After you create the `NativeConnection` object, you pass it to
`Worker.create()` when creating the Worker.

To provide connection options to the `NativeConnection`, you can use environment variables, a configuration file, or
directly in code. The following code snippets show how to create a `NativeConnection` object using each method. Refer to
[Connect to a local development Temporal Service](#connect-to-development-service) and
[Connect to Temporal Cloud](#connect-to-temporal-cloud) for details on how to provide connection options using each
method.

<Tabs groupId="worker-connect-options" defaultValue="config-file" >

<TabItem value="config-file" label="Configuration File">

Ensure you have a TOML configuration file with the necessary connection options defined. For example, the following TOML
configuration file defines a `staging` profile with the necessary connection options to connect to Temporal Cloud via an
API key:

```toml
# Cloud profile for Temporal Cloud
[profile.staging]
address = "your-namespace.a1b2c.tmprl.cloud:7233"
namespace = "your-namespace"
api_key = "your-api-key-here"
```

Use the `loadClientConnectConfig` helper from `@temporalio/envconfig` to load the `staging` profile from the
configuration file and create a `NativeConnection` object as follows:

```ts {1,15,17}
import { NativeConnection } from '@temporalio/worker';
import { loadClientConnectConfig } from '@temporalio/envconfig';
import { resolve } from 'path';

async function main() {
  const configFile = resolve(__dirname, '../config.toml');
  const profileName = 'staging'

  // Load the 'staging' profile.
  const config = loadClientConnectConfig({
    profile: profileName,
    configSource: { path: configFile },
  });

  const connection = await NativeConnection.connect(config.connectionOptions);

  const worker = await Worker.create({
    connection,
    namespace: <namespace_id>.<account_id>,
    // ...
});
}
```

</TabItem>

<TabItem value="env-vars" label="Environment Variables">

Ensure you have set the necessary environment variables to connect to Temporal Cloud. For example:

```bash
export TEMPORAL_NAMESPACE="your-namespace.your-account-id"
export TEMPORAL_ADDRESS="your-namespace.a1b2c.tmprl.cloud:7233"
export TEMPORAL_TLS_CLIENT_CERT_PATH="/path/to/your/client/cert.pem"
export TEMPORAL_TLS_CLIENT_KEY_PATH="/path/to/your/client/key.pem"
```

After setting the environment variables, use the following code to create a `NativeConnection` object using the
`loadClientConnectConfig` helper from `@temporalio/envconfig`:

```ts {1,5}
import { NativeConnection } from '@temporalio/worker';
import { loadClientConnectConfig } from '@temporalio/envconfig';

async function main() {
  const config = loadClientConnectConfig();

  const connection = await NativeConnection.connect(config.connectionOptions);

  const worker = await Worker.create({
    connection,
    namespace: process.env.TEMPORAL_NAMESPACE,
    // ...
  });
}
```

</TabItem>

<TabItem value="code" label="Code">

You can also provide connections options in your TypeScript code directly. To create an initial connection, provide the
connections to the ` NativeConnection.connect` method, and then pass the resulting `NativeConnection` object to
`Worker.create()` when creating the Worker:

```ts {1,4,9}
import { NativeConnection } from '@temporalio/worker';
import { loadClientConnectConfig } from '@temporalio/envconfig';

const connection = await NativeConnection.connect({
    address: <endpoint>,
    tls: true,
    apiKey: <APIKey>,
});
const worker = await Worker.create({
    connection,
    namespace: <namespace_id>.<account_id>,
    // ...
});
```

</TabItem>

</Tabs>

## NativeConnection, Connection, and Client

`NativeConnection`, `Connection`, and `Client` are all classes provided by the TypeScript SDK to facilitate
communication with the Temporal Service. This section explains the differences between these classes and their
respective use cases. For detailed information about each class, refer to the
[Temporal TypeScript API documentation](https://typescript.temporal.io/api/namespaces/client).

### NativeConnection vs. Connection {#native-connection-vs-connection}

The TypeScript SDK provides two types of connection classes to connect to the Temporal Service: `NativeConnection` and
`Connection`. The `NativeConnection` class is used to connect from a Worker, while the `Connection` class is used to
connect from a Temporal Application or from within an Activity, typically through a `Client` object. Both connection
classes accept the same set of connection options.

### Connection vs. Client {#connection-vs-client}

A `Client` object is a high-level, lightweight abstraction that simplifies interaction with the Temporal Service. It
internally manages a `Connection` object to handle the low-level communication details. The `Client` class provides
convenient methods for common operations such as starting Workflow Executions, sending Signals and Queries, and
retrieving Workflow results.

A `Connection` object is a lower-level and expensive object that represents a direct connection to the Temporal Service.
You pass in a `Connection` object to the `Client` constructor to create a `Client` instance. Since a `Connection` is
expensive to create, create a single `Connection` object and reuse it across your application whenever possible.

When instantiating a `Connection`, you specify most connection options except for the Namespace, such as the Temporal
Service endpoint, TLS settings, and authentication credentials. When instantiating a `Client`, you provide the
`Connection` object and the Namespace you want to connect to, along with other client options.

## Start Workflow Execution {#start-workflow-execution}

**How to start a Workflow Execution using the Typescript SDK**

[Workflow Execution](/workflow-execution) semantics rely on several parameters—that is, to start a Workflow Execution
you must supply a Task Queue that will be used for the Tasks (one that a Worker is polling), the Workflow Type,
language-specific contextual data, and Workflow Function parameters.

In the examples below, all Workflow Executions are started using a Temporal Client. To spawn Workflow Executions from
within another Workflow Execution, use either the Child Workflow or External Workflow APIs.

See the [Customize Workflow Type](/develop/typescript/core-application#workflow-type) section to see how to customize
the name of the Workflow Type.

A request to spawn a Workflow Execution causes the Temporal Service to create the first Event
([WorkflowExecutionStarted](/references/events#workflowexecutionstarted)) in the Workflow Execution Event History. The
Temporal Service then creates the first Workflow Task, resulting in the first
[WorkflowTaskScheduled](/references/events#workflowtaskscheduled) Event.

When you have a Client, you can schedule the start of a Workflow with `client.workflow.start()`, specifying
`workflowId`, `taskQueue`, and `args` and returning a Workflow handle immediately after the Server acknowledges the
receipt.

```typescript
const handle = await client.workflow.start(example, {
  workflowId: 'your-workflow-id',
  taskQueue: 'your-task-queue',
  args: ['argument01', 'argument02', 'argument03'], // this is typechecked against workflowFn's args
});
const handle = client.getHandle(workflowId);
const result = await handle.result();
```

Calling `client.workflow.start()` and `client.workflow.execute()` send a command to Temporal Server to schedule a new
Workflow Execution on the specified Task Queue. It does not actually start until a Worker that has a matching Workflow
Type, polling that Task Queue, picks it up.

You can test this by executing a Client command without a matching Worker. Temporal Server records the command in Event
History, but does not make progress with the Workflow Execution until a Worker starts polling with a matching Task Queue
and Workflow Definition.

Workflow Execution run in a separate V8 isolate context in order to provide a
[deterministic runtime](/workflow-definition#deterministic-constraints).

### Set a Workflow's Task Queue {#set-task-queue}

In most SDKs, the only Workflow Option that must be set is the name of the [Task Queue](/task-queue).

For any code to execute, a Worker Process must be running that contains a Worker Entity that is polling the same Task
Queue name.

A Task Queue is a dynamic queue in Temporal polled by one or more Workers.

Workers bundle Workflow code and node modules using Webpack v5 and execute them inside V8 isolates. Activities are
directly required and run by Workers in the Node.js environment.

Workers are flexible. You can host any or all of your Workflows and Activities on a Worker, and you can host multiple
Workers on a single machine.

The Worker need three main things:

- `taskQueue`: The Task Queue to poll. This is the only required argument.
- `activities`: Optional. Imported and supplied directly to the Worker.
- Workflow bundle. Choose one of the following options:
  - Specify `workflowsPath` pointing to your `workflows.ts` file to pass to Webpack; for example,
    `require.resolve('./workflows')`. Workflows are bundled with their dependencies.
  - If you prefer to handle the bundling yourself, pass a prebuilt bundle to `workflowBundle`.

```ts
import { Worker } from '@temporalio/worker';
import * as activities from './activities';

async function run() {
  // Step 1: Register Workflows and Activities with the Worker and connect to
  // the Temporal server.
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),
    activities,
    taskQueue: 'hello-world',
  });
  // Worker connects to localhost by default and uses console.error for logging.
  // Customize the Worker by passing more options to create():
  // https://typescript.temporal.io/api/classes/worker.Worker
  // If you need to configure server connection parameters, see docs:
  // /typescript/security#encryption-in-transit-with-mtls

  // Step 2: Start accepting tasks on the `tutorial` queue
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

`taskQueue` is the only required option; however, use `workflowsPath` and `activities` to register Workflows and
Activities with the Worker.

When scheduling a Workflow, you must specify `taskQueue`.

```ts
import { Client, Connection } from '@temporalio/client';
// This is the code that is used to start a Workflow.
const connection = await Connection.create();
const client = new Client({ connection });
const result = await client.workflow.execute(yourWorkflow, {
  // required
  taskQueue: 'your-task-queue',
  // required
  workflowId: 'your-workflow-id',
});
```

When creating a Worker, you must pass the `taskQueue` option to the `Worker.create()` function.

```ts
const worker = await Worker.create({
  // imported elsewhere
  activities,
  taskQueue: 'your-task-queue',
});
```

Optionally, in Workflow code, when calling an Activity, you can specify the Task Queue by passing the `taskQueue` option
to `proxyActivities()`, `startChild()`, or `executeChild()`. If you do not specify `taskQueue`, the TypeScript SDK
places Activity and Child Workflow Tasks in the same Task Queue as the Workflow Task Queue.

### Set a Workflow Id {#workflow-id}

Although it is not required, we recommend providing your own
[Workflow Id](/workflow-execution/workflowid-runid#workflow-id)that maps to a business process or business entity
identifier, such as an order identifier or customer identifier.

Connect to a Client with `client.workflow.start()` and any arguments. Then specify your `taskQueue` and set your
`workflowId` to a meaningful business identifier.

```typescript
const handle = await client.workflow.start(example, {
  workflowId: 'yourWorkflowId',
  taskQueue: 'yourTaskQueue',
  args: ['your', 'arg', 'uments'],
});
```

This starts a new Client with the given Workflow Id, Task Queue name, and an argument.

### Get the results of a Workflow Execution {#get-workflow-results}

If the call to start a Workflow Execution is successful, you will gain access to the Workflow Execution's Run Id.

The Workflow Id, Run Id, and Namespace may be used to uniquely identify a Workflow Execution in the system and get its
result.

It's possible to both block progress on the result (synchronous execution) or get the result at some other point in time
(asynchronous execution).

In the Temporal Platform, it's also acceptable to use Queries as the preferred method for accessing the state and
results of Workflow Executions.

To return the results of a Workflow Execution:

```typescript
return 'Completed ' + wf.workflowInfo().workflowId + ', Total Charged: ' + totalCharged;
```

`totalCharged` is just a function declared in your code. For a full example, see
[subscription-workflow-project-template-typescript/src/workflows.ts](https://github.com/temporalio/subscription-workflow-project-template-typescript/blob/main/src/workflows.ts).

A Workflow function may return a result. If it doesn’t (in which case the return type is `Promise<void>`), the result
will be `undefined`.

If you started a Workflow with `client.workflow.start()`, you can choose to wait for the result anytime with
`handle.result()`.

```typescript
const handle = client.getHandle(workflowId);
const result = await handle.result();
```

Using a Workflow Handle isn't necessary with `client.workflow.execute()`.

Workflows that prematurely end will throw a `WorkflowFailedError` if you call `result()`.

If you call `result()` on a Workflow that prematurely ended for some reason, it throws a
[`WorkflowFailedError` error](https://typescript.temporal.io/api/classes/client.WorkflowFailedError/) that reflects the
reason. For that reason, it is recommended to catch that error.

```typescript
const handle = client.getHandle(workflowId);
try {
  const result = await handle.result();
} catch (err) {
  if (err instanceof WorkflowFailedError) {
    throw new Error('Temporal workflow failed: ' + workflowId, {
      cause: err,
    });
  } else {
    throw new Error('error from Temporal workflow ' + workflowId, {
      cause: err,
    });
  }
}
```
