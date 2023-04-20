---
id: how-to-set-up-codec-server
title: Codec Server Setup
sidebar_label: Codec Server Setup
description: Run a Codec Server with your Payload Codec and then configure CLI and the Web UI to use the server endpoints.
tags:
  - security
  - how-to
---

Use a Codec Server to decrypt your encoded [payloads](/concepts/what-is-a-payload) and integrate it with the Temporal Web UI and CLI commands when debugging your Workflows.

A Codec Server is an HTTP or HTTPS Server that you create and host.
It must be configured to use a [Payload Codec](/concepts/what-is-a-payload-codec) with the required decode logic and encryption keys.

The Codec Server is independent of the Temporal Server and decodes your encrypted payloads through endpoints.
When you set the codec endpoint in the Temporal Web UI, the Web UI uses the remote endpoint to send encoded data to the Codec Server and receive decoded payloads from the Codec Server. See [API contract requirements](#api-contract-specifications).
Decoded payloads are then displayed in the Workflow Execution Event History on the Web UI.
Note that the decoded payloads are visible only to you on the Web UI; All data on the Temporal Server remains encrypted.

Since you create, operate, and manage access to your Codec Server in your controlled environment, ensure that you consider the following:

- When you set your codec endpoint with your Web UI, expect your Codec Server to receive a large number of requests per Workflow Execution from the Web UI.
- Ensure that you secure access to the decrypted data from your Codec Server. <!--Need a better way to explain this; with temporal cloud, the decrypted data is sent to the browser; there is no guarantee that the cloud ui is hosted in a particualr region etc.> need clearer way to set this expectation.-->
- The Temporal Web UI only displays the decoded payloads received from your Codec Server in real-time; it does not store or send the data back to the Temporal Server (whether on Cloud or self-hosted Temporal Clusters).
- You might have latencies introduced in the Web UI when sending and receiving payloads to the Codec Server.

To create a Codec Server, you need the following components:

- A [Payload Codec](/concepts/what-is-a-payload-codec) with the requisite keys and logic to decode your encrypted payloads.
  You can use the Payload Codec that you applied with your Data Converter to encode your Payloads and configure it with your Codec Server.
  However, if you are writing your Codec Server in a different SDK from the one that applies the Data Converter, ensure that your logic and keys are correctly replicated.
- Key management infrastructure or plan for sharing your encryption keys between the Workers and your Codec Server.
- [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) configuration on the HTTP router in your Codec Server for sending and receiving requests from the Temporal Web UI.

For examples on how to create your Codec Server, see following Codec Server implementation samples:

- [Go](https://github.com/temporalio/samples-go/tree/main/codec-server)
- [Java](https://github.com/temporalio/sdk-java/tree/master/temporal-remote-data-encoder)
- [Python](https://github.com/temporalio/samples-python/blob/main/encryption/codec_server.py)
- [TypeScript](https://github.com/temporalio/samples-typescript/blob/main/encryption/src/codec-server.ts)

### API contract specifications

When you create your Codec Server to handle requests from the Web UI, the following requirements must be met.

#### Endpoints

The [Web UI/CLI calls the `POST` method with the `/decode` endpoint](https://github.com/temporalio/ui/blob/11ef7ddb47711444a365c7760eae41853446da07/src/lib/services/data-encoder.ts#L38).

In your Codec Server, create a `/decode` path and pass the incoming payload to the decode method in your Payload Codec.

You can also add a [verification step](#authorization) to check whether the incoming request has the required authorization to access the decode logic in your Payload Codec.

#### Headers

Each request from the Web UI to your Codec Server includes the following headers:

- `Content-Type: application/json`: Ensure that your Codec Server can accommodate this [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types).

- `X-Namespace: {namespace}`: This is a custom HTTP Header. Ensure that the [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) configuration in your Codec Server includes this header.

#### Request Body

General specification for the `POST` Request body contains payloads.
By default, all field values in your payload are Base64 encoded, regardless of whether they are encrypted by your custom codec implementation.

The following example shows a sample `POST` Request body with Base64 encoding.

```json
{
  "payloads": [{
    "metadata": {
      "encoding": <base64EncodedEncodingHint>,
      "messageType": <base64EncodedMessageTypeName>
    },
    "data": <encryptedPayloadData>
  }, ...]
}
```

#### CORS

Enable [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) requests on your Codec Server to receive HTTP requests from the Temporal Web UI.

At a minimum, enable the following responses from your Codec Server to allow requests coming in from the Temporal Web UI:

- `Access-Control-Allow-Origin`
- `Access-Control-Allow-Methods`
- `Access-Control-Allow-Headers`

For example, for Temporal Cloud Web UI hosted at https://cloud.temporal.io, enable the following in your Codec Server:

- `Access-Control-Allow-Origin: https://cloud.temporal.io`
- `Access-Control-Allow-Methods: POST, GET, OPTIONS`
- `Access-Control-Allow-Headers: X-Namespace, Content-Type`

For details on what a sample request/response looks like from the Temporal Web UI, see [Sample Request/Response](#sample-request/response].

#### Authorization

To enable authorization, your Codec Server must be an HTTPS Server with SSL certificates and corresponding private keys.

**Temporal Cloud**

Temporal Cloud uses Auth0 to authenticate access.
The Temporal Cloud UI provides an option to pass access tokens (JWT) to your Codec Server endpoints to validate access and then return decoded payloads.

You can enable this by selecting **Pass access token** in your Codec Server endpoint interface where you add your endpoint.
Enabling this option in the Temporal Cloud UI adds an authorization header to each request sent to the Codec Server endpoint that you set. <!--NEED AN EXAMPLE HERE FOR WHAT A SAMPLE REQUEST LOOKS LIKE WITH AN ASUTH HEADER-->

In your Codec Server implementation, verify the signature on this access token (in your authorization header) against the JWKS endpoint provided to you. <!--Is this process defined? when a customer signs up for temporal cloud, do we provide them with the JWKS as part of the onboarding process?-->
If you want to unpack the claims in your token to add additional checks on whether the user has valid access to the namespace and payloads they are trying to access, you can implement it using Auth0 SDKs, middleware, or one of the third-party libraries at JWT.io.
The claims in the token provided from Temporal Cloud UI contain the following detail:

- `id`: Email ID of the person requesting access to the payloads.
- `<namespace name>: <permissions>`: Namespace name and read/write permissions to the namespace. For example:

  ```json
  mynamespace:read
  anothernamespace:write
  ```

Based on the identity information in the claims, you can set conditions in your Codec Server whether to return decoded payloads or just return the original encoded payloads.

**Self-hosted Temporal Cluster**

On self-hosted Temporal Clusters, configure [authorization in the Web UI configuration](/references/web-ui-configuration#auth) in your Temporal Cluster setup.

With this enabled, you can pass access tokens to your Codec Server and validate the requests from the Web UI to the Codec Server endpoints that you set.

Note that with self-hosted Temporal Clusters, you must explicitly configure authorization specifications for the Web UI and CLI.

The following samples provide implementation examples for applying authentication on your Codec Server using the Go SDK.

- [Codec Server](https://github.com/temporalio/samples-go/tree/main/codec-server)
- [GRPC proxy server](https://github.com/temporalio/samples-go/tree/main/grpc-proxy)

#### Sample Request/Response

Consider the following sample Request/Response when creating and hosting a Codec Server with the following specifications:

- Scheme: https
- Host: dev.mydomain.com/codec
- Path: /decode

```json
HTTP/1.1 POST /decode
Host: https://dev.mydomain.com/codec
Content-Type: application/json
X-Namespace: myapp-dev.acctid123

{"payloads":[{"metadata":{"encoding":"anNvbi9wcm90b2J1Zg==","messageType":"dGVtcG9yYWxfc2hvcC5vcmNoZXN0cmF0aW9ucy52MS5TdGFydFNob3BwaW5nQ2FydFJlcXVlc3Q="},"data":"eyJjYXJ0SWQiOiJleGFtcGxlLWNhcnQiLCJzaG9wcGVySWQiOiJ5b3VyLXNob3BwZXItaWQtZXhhbXBsZSIsImVtYWlsIjoieW91ci1lbWFpbEBkb21haW4uY29tIn0"}]}

200 OK
Content-Type: application/json
{
  "payloads": [{
    "metadata":{
"encoding": "json/protobuf",
"messageType": "temporal_shop.orchestrations.v1.StartShoppingCartRequest"
    },"data":{
"cartId":"example-cart",
"shopperId":"your-shopper-id-example",
"email":"your-email@domain.com"
    }}]
}
```

### Hosting your Codec Server

Your Codec Server can be hosted at an organization-level or locally.

#### Organization-level hosting

Hosting the Codec Server for your organization simplifies both key management used for decryption and versioning the codec itself.
Consider the following details for a multi-tenant approach to setting up your Codec Server:

- Ingress: Your server must be reachable from the public internet, and will require configuration for ingress to that server.
- Authorization: You must set explicit authorization checks to validate requests to your Codec Server.

#### Local Hosting

Locally hosting the Codec Server is simpler to get started.
However, consider the following before choosing to do so:

- A single URL configuration is accepted for the Cloud account.
  This means some agreed-upon policy on the url must be made for everyone using the namespaces in this account.
  For example, if you configure your Remote Codec Endpoint to be http://localhost:8080/codec then every developer must host your codec server locally at that port.

  Alternatively, you can use the local hosts file to allow each developer to choose where to host.
  For example, configure the remote codec endpoint as http://codec.server and allow each developer to control what it maps to locally.

- Distributing encryption keys that can decrypt the payloads at your organization can be a security risk.

### Set your Codec Server endpoints with Web UI and CLI

After you create your Codec Server and expose the requisite endpoints, set the endpoints in your Web UI and CLI.

#### CLI

After the Codec Server is started, provide the exposed endpoint to CLI using `--codec_endpoint` command option.

For example, if you are running your Codec Server locally and expose port 8888 as your endpoint, run the following command to set the codec endpoint globally.

```bash
temporal env set --codec-endpoint "http://localhost:8888"
```

If your codec endpoint is not set globally, use the `--codec-endpoint` option with your CLI commands.
For example, to see the decoded output of the Workflow Execution "yourWorkflow" in the Namespace "yourNamespace".

```bash
temporal --codec-endpoint "http://localhost:8888" --namespace "yourNamespace" workflow show --workflow-id "yourWorkflow"  --run-id "<yourRunId>" --output "table"
```

For details, see the [CLI reference](/cli/).

#### Web UI

You can set the codec endpoints either in the Web UI or in the [UI server](https://github.com/temporalio/ui-server) configuration file before starting the UI server.

**In the Web UI**

![Codec Server endpoint setting](/img/docs/data-encoder-button.png)

In the top-right corner, select **Configure Codec Server**.
In the codec endpoint dialog, enter the URL and port number for your codec endpoint.
Refresh your Workflow Execution page to see encoded/decoded data.

**In the Web UI server configuration file**

Specify the codec endpoint in the Web UI server [configuration file](/references/web-ui-configuration#codec):

```yaml
codec:
    endpoint: {{ default .Env.TEMPORAL_CODEC_ENDPOINT "{namespace}"}}
```

Start the UI server to use this endpoint on the Web UI for decoding data in Workflow Executions in the specified Namespace.
