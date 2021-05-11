# TLS

In order to connect to the server using TLS, pass [`grpc` SSL credentials](https://grpc.github.io/grpc/node/grpc.credentials.html) to the [`Connection`](https://nodejs.temporal.io/api/classes/client.connection) constructor.

> NOTE: only the client connection supports TLS, we will add support in the [Worker soon](https://github.com/temporalio/sdk-node/issues/87).

### mTLS tutorial

Follow this tutorial for setting up mTLS (Mutual TLS authentication) for a local server and client

1. Clone the [customization samples repo](https://github.com/temporalio/customization-samples/)
1. Change directory to `tls/tls-full` in the cloned repository
1. Follow [these instructions](https://github.com/temporalio/customization-samples/tree/master/tls/tls-full#readme) to set up a local server with mTLS
1. In your NodeJS Temporal project, set up your client as shown below (If you haven't set up a project, see how to [here](/docs/node/getting-started))
1. Build your project with `npm run build`
1. Run the client and test the connection
   - If you're using the sample without alteration, pass the certs dir as first argument to the script, e.g. `node /path/to/compiled/sample.js /path/to/customization-samples/tls/tls-full/certs`

<!--SNIPSTART nodejs-mtls-client -->
<!--SNIPEND-->
