---
id: security
title: Security in TypeScript SDK
sidebar_label: Security
description: A summary of the security features you should know as a TypeScript SDK user.
---

import CustomWarning from "../components/CustomWarning.js"

<CustomWarning>

This SDK and associated documentation is in an Alpha stage and may change at any time.

</CustomWarning>

- **Namespaces** help isolate code from each other
- **TLS Encryption** helps encrypt code in transit
- **Data Converter** helps encrypt code at rest

Temporal Server has [additional Security features](/docs/server/security), particularly Authorization.

## Namespaces

import Content from '../content/what-is-a-namespace.md'

<Content />

You set namespaces when you create a client in any of the SDKs (necessary whenever creating workers or starters). If not specified, this defaults to the default namespace.

```ts
const connection = new Connection();
// https://typescript.temporal.io/api/interfaces/client.WorkflowClientOptions
const client = new WorkflowClient(connection.service, {
  namespace: 'my-namespace-name',
});
```

## Encryption in transit with mTLS

There are two classes in the SDK that connect to the Temporal server, the [Worker](https://typescript.temporal.io/api/classes/worker.worker-1) and the client [Connection](https://typescript.temporal.io/api/classes/client.connection/).
When instantiating either of them, you may choose whether to connect securely or not.

In order to connect to the server using TLS, set a _truthy_ value (`true` or [TLSConfig](https://typescript.temporal.io/api/interfaces/common.tlsconfig/) for custom options) in the `tls` configuration option.

Use [`ServerOptions.tls`](https://typescript.temporal.io/api/interfaces/worker.serveroptions#tls)When [creating](https://typescript.temporal.io/api/classes/worker.worker/#create) a new Worker and
[`ConnectionOptions.tls`](https://typescript.temporal.io/api/interfaces/client.connectionoptions#tls) for the [`Connection`](https://typescript.temporal.io/api/classes/client.connection) constructor.

The client connection also accepts [gRPC credentials](https://grpc.github.io/grpc/node/grpc.credentials.html) at [`ConnectionOptions.credentials`](https://typescript.temporal.io/api/interfaces/client.connectionoptions#tls) as long as `tls` is not also specified.

<span id="mtls-tutorial"></span>

### Connecting to Temporal Cloud (with mTLS)

[The Hello World mTLS sample](https://github.com/temporalio/samples-node/tree/main/hello-world-mtls/) can be used to connect to a Temporal Cloud account.
When signing up to Temporal Cloud you should receive a namespace, a server address and a client certificate and key. Use the following environment variables to set up the sample:

- `TEMPORAL_ADDRESS`: looks like `foo.bar.tmprl.cloud`
- `TEMPORAL_NAMESPACE`: looks like `foo.bar`
- `TEMPORAL_CLIENT_CERT_PATH`: e.g. `/tls/ca.pem`
  - starts with `-----BEGIN CERTIFICATE----- MIIEsjCCApqgAwIBAgIUHUWAiXLVXS/qkWLRmJ48uLGOEcEwDQYJKoZIhvcNAQEL`
- `TEMPORAL_CLIENT_KEY_PATH`: e.g. `/tls/ca.key`
  - starts with `-----BEGIN PRIVATE KEY----- MIIJQwIBADANBgkqhkiG9w0BAQEFAA`

You can leave the remaining vars, like `TEMPORAL_SERVER_NAME_OVERRIDE` and `TEMPORAL_SERVER_ROOT_CA_CERT_PATH` blank.
There is another var, `TEMPORAL_TASK_QUEUE`, which the example defaults to `'hello-world-mtls'` but you can customize as needed.

<details>
<summary>Example environment settings</summary>

```ts
export function getEnv(): Env {
  return {
    address: 'foo.bar.tmprl.cloud', // NOT web.foo.bar.tmprl.cloud
    namespace: 'foo.bar', // as assigned
    clientCertPath: 'foobar.pem', // in project root
    clientKeyPath: 'foobar.key', // in project root
    taskQueue: process.env.TEMPORAL_TASK_QUEUE || 'hello-world-mtls', // just to ensure task queue is same on client and worker, totally optional
    // // not usually needed
    // serverNameOverride: process.env.TEMPORAL_SERVER_NAME_OVERRIDE,
    // serverRootCACertificatePath: process.env.TEMPORAL_SERVER_ROOT_CA_CERT_PATH,
  };
}
```

</details>

If you have misconfigured your connection somehow, you will get an opaque `[TransportError: transport error]` error. Read through your settings carefully and contact us if you are sure you have checked everything.

Note the difference between the gRPC and Temporal Web endpoints:

- The gRPC endpoint has a DNS address of `<Namespace ID>.tmprl.cloud`, for example: `accounting-production.f45a2.tmprl.cloud`.
- The Temporal Web endpoint is `web.<Namespace ID>.tmprl.cloud`, for example: `https://web.accounting-production.f45a2.tmprl.cloud`.

### Local mTLS sample tutorial

Follow this tutorial for setting up mTLS (Mutual TLS authentication) with Temporal Server, Client, and Worker locally.
**For Temporal Cloud customers, there is a separate tutorial above.**

1. Set up Temporal Server with mTLS encryption locally
   - Clone the [customization samples repo](https://github.com/temporalio/customization-samples/) and change to the `tls/tls-simple` directory
   - Follow [these instructions](https://github.com/temporalio/customization-samples/tree/master/tls/tls-simple#readme) to set up a local server with mTLS
   - The sample does not register the default namespace on startup, register it with: `docker exec -it tls-simple_temporal-admin-tools_1 tctl n re --retention 1 default`
1. Configure your Temporal Client and Worker to connect with mTLS
   - Scaffold a new Temporal project with `npx @temporalio/create@latest` using the `hello-world-mtls` template, or copy the relevant configuration from the snippets below into an existing project.
   - Export the required environment variables:
     ```bash
     export TEMPORAL_ADDRESS=localhost
     export TEMPORAL_NAMESPACE=default
     export TEMPORAL_CLIENT_CERT_PATH=/path/to/customization-samples/tls/tls-simple/certs/client.pem
     export TEMPORAL_CLIENT_KEY_PATH=/path/to/customization-samples/tls/tls-simple/certs/client.key
     # just for the local mTLS sample
     export TEMPORAL_SERVER_ROOT_CA_CERT_PATH=/path/to/customization-samples/tls/tls-simple/certs/ca.cert
     export TEMPORAL_SERVER_NAME_OVERRIDE=tls-sample
     ```
1. Test the connection with `npm run start.watch` and `npm run workflow`.
   You should see everything working as per the regular Hello World tutorial.

Temporal has no opinions on production deployment strategy other than the connections and architecture displayed here.

## Encryption at rest with DataConverter

:::warning Not yet implemented

Temporal has a custom Data Converter feature that lets you implement customized serialization formats and encrypt and decrypt your data.
However it is not yet supported in this SDK.

:::

Workflow method arguments and return values are serializable to a [Payload](https://github.com/temporalio/api/blob/4c2f6a281fa3fde8b0a24447de3e0d0f47d230b4/temporal/api/common/v1/message.proto#L49) protobuf that contains a bytearray as well as metadata map.

You can customize _how_ this is serialized with [the SDK's DataConverter interface](https://github.com/temporalio/sdk-typescript/blob/ca6f4ee0868081e0c115ff05bda6a5e47c13493d/packages/common/src/converter/data-converter.ts) to do this, including using custom encryption at rest.
The default implementation uses JSON serializer, but you can use any alternative serialization mechanism.

If your arguments and return values are encrypted, you will have to run your custom Data Converter again when viewing it in the WebUI as well:

```bash
export TEMPORAL_CLI_PLUGIN_DATA_CONVERTER=<path to dataconverter plugin>

./tctl dataconverter web --web_ui_url http://localhost
```

To configure your Web UI session to use the local data converter use this URL: http://localhost/data-converter/33977

Following this link from the output will enable dataconverter for Temporal Web. Temporal Web will communicate to `tctl` through websocket to decrypt the data and show it on the UI.
