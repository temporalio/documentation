# TLS

There are two classes in the SDK that connect to the Temporal server, the [Worker](https://nodejs.temporal.io/api/classes/worker.worker-1) and the client [Connection](https://nodejs.temporal.io/api/classes/client.connection/).
When instantiating either of them, you may choose whether to connect securely or not.

In order to connect to the server using TLS, set a _truthy_ value (`true` or [TLSConfig](https://nodejs.temporal.io/api/interfaces/client.tlsconfig) for custom options) in the `tls` configuration option.

Use [`ServerOptions.tls`](https://nodejs.temporal.io/api/interfaces/worker.serveroptions#tls)When [creating](https://nodejs.temporal.io/api/classes/worker.worker-1#create) a new Worker and
[`ConnectionOptions.tls`](https://nodejs.temporal.io/api/interfaces/client.connectionoptions#tls) for the [`Connection`](https://nodejs.temporal.io/api/classes/client.connection) constructor.

The client connection also accepts [GRPC credentials](https://grpc.github.io/grpc/node/grpc.credentials.html) at [`ConnectionOptions.credentials`](https://nodejs.temporal.io/api/interfaces/client.connectionoptions#tls) as long as `tls` is not also specified.

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

1. Run the Worker

<!--SNIPSTART nodejs-mtls-worker -->
<!--SNIPEND-->

1. In a new terminal run the client to schedule a sample Workflow

<!--SNIPSTART nodejs-mtls-client -->
<!--SNIPEND-->

### Connecting to Temporal Cloud (with mTLS)

The sample above can be used to connect to a Temporal Cloud account.
When signing up to Temporal Cloud you should receive a namespace, a server address and a client certificate and key. Use the following environment variables to set up the sample:

- `TEMPORAL_ADDRESS`
- `TEMPORAL_NAMESPACE`
- `TEMPORAL_CLIENT_CERT_PATH`
- `TEMPORAL_CLIENT_KEY_PATH`
