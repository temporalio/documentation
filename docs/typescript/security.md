---
id: security
title: Security in Node
sidebar_label: Security
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

In order to connect to the server using TLS, set a _truthy_ value (`true` or [TLSConfig](https://typescript.temporal.io/api/interfaces/client.tlsconfig) for custom options) in the `tls` configuration option.

Use [`ServerOptions.tls`](https://typescript.temporal.io/api/interfaces/worker.serveroptions#tls)When [creating](https://typescript.temporal.io/api/classes/worker.worker-1#create) a new Worker and
[`ConnectionOptions.tls`](https://typescript.temporal.io/api/interfaces/client.connectionoptions#tls) for the [`Connection`](https://typescript.temporal.io/api/classes/client.connection) constructor.

The client connection also accepts [gRPC credentials](https://grpc.github.io/grpc/node/grpc.credentials.html) at [`ConnectionOptions.credentials`](https://typescript.temporal.io/api/interfaces/client.connectionoptions#tls) as long as `tls` is not also specified.

### mTLS tutorial

Follow this tutorial for setting up mTLS (Mutual TLS authentication) for a local server, client, and Worker.

1. Clone the [customization samples repo](https://github.com/temporalio/customization-samples/)
1. Change directory to `tls/tls-simple` in the cloned repository
1. Follow [these instructions](https://github.com/temporalio/customization-samples/tree/master/tls/tls-simple#readme) to set up a local server with mTLS
1. The sample does not register the default namespace on startup, register it with: `docker exec -it tls-simple_temporal-admin-tools_1 tctl n re --retention 1 default`
1. Create a new temporal project with `npm init @temporalio --sample hello-world-mtls` or copy the relevant configuration from the snippets below into an existing project.
1. Build your project with `npm run build`
1. Export the required environment variables:

- `export TEMPORAL_ADDRESS=localhost`
- `export TEMPORAL_NAMESPACE=default`
- `export TEMPORAL_SERVER_ROOT_CA_CERT_PATH=/path/to/customization-samples/tls/tls-simple/certs/ca.cert`
- `export TEMPORAL_SERVER_NAME_OVERRIDE=tls-sample`
- `export TEMPORAL_CLIENT_CERT_PATH=/path/to/customization-samples/tls/tls-simple/certs/client.pem`
- `export TEMPORAL_CLIENT_KEY_PATH=/path/to/customization-samples/tls/tls-simple/certs/client.key`

8. Run the Worker

<!--SNIPSTART typescript-mtls-worker -->
<!--SNIPEND-->

9. In a new terminal run the client to schedule a sample Workflow

<!--SNIPSTART typescript-mtls-client -->
<!--SNIPEND-->

### Connecting to Temporal Cloud (with mTLS)

The sample above can be used to connect to a Temporal Cloud account.
When signing up to Temporal Cloud you should receive a namespace, a server address and a client certificate and key. Use the following environment variables to set up the sample:

- `TEMPORAL_ADDRESS`
- `TEMPORAL_NAMESPACE`
- `TEMPORAL_CLIENT_CERT_PATH`
- `TEMPORAL_CLIENT_KEY_PATH`

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
