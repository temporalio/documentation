---
id: how-to-set-up-codec-server
title: Codec Server setup
sidebar_label: Codec Server setup
description: Run a Codec Server with your Payload Codec and then configure the Web UI and CLI to use the server endpoints.
tags:
  - security
  - how-to
---

Use a Codec Server to decode your encoded [payloads](/concepts/what-is-a-payload) and integrate it with the Temporal Web UI and CLI commands when debugging your Workflows.

A Codec Server is an HTTP or HTTPS Server that you create and host.
It must be configured to use a [Payload Codec](/concepts/what-is-a-payload-codec) with the required decode logic and encryption keys.
Temporal Cloud requires an HTTPS Codec Server.

The Codec Server is independent of the Temporal Server and decodes your encrypted payloads through endpoints.
When you set the codec endpoint in the Temporal Web UI, the Web UI uses the remote endpoint to send encoded payloads to the Codec Server and receive decoded payloads from the Codec Server.
See [API contract requirements](#api-contract-specifications).
Decoded payloads are then displayed in the Workflow Execution Event History on the Web UI.

Note that when you use a Codec Server, the decoded payloads are visible only to you on the Web UI; payloads on the Temporal Server (whether on Temporal Cloud or a self-hosted Temporal Cluster) remain encrypted.

Because you create, operate, and manage access to your Codec Server in your controlled environment, ensure that you consider the following:

- When you set your codec endpoint with your Web UI, expect your Codec Server to receive a large number of requests per Workflow Execution from the Web UI.
- Ensure that you secure access your Codec Server.
  For details, see [Authorization](#authorization).
  <!--Need a better way to explain this; with temporal cloud, the decrypted data is sent to the browser; there is no guarantee that the cloud ui is hosted in a particular region etc.> need clearer way to set this expectation.-->
- The Temporal Web UI only displays the decoded payloads received from your Codec Server in real-time; it does not store or send the data back to the Temporal Server (whether on Cloud or self-hosted Temporal Cluster).
- You might have latencies introduced in the Web UI when sending and receiving payloads to the Codec Server.

To create a Codec Server, you need the following components:

- A [Payload Codec](/concepts/what-is-a-payload-codec) with the requisite keys and logic to decode your encrypted payloads.
  You can use the Payload Codec that you applied with your Data Converter to encode your Payloads and configure it with your Codec Server.
  However, if you are writing your Codec Server in a different SDK from the one that applies the Data Converter, ensure that your logic and keys are correctly replicated.
- Key management infrastructure or plan for sharing your encryption keys between the Workers and your Codec Server.
- [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) configuration on the HTTP/HTTPS endpoints in your Codec Server for sending and receiving requests from the Temporal Web UI.
- Optional: Secure access through VPN and access control.
  For details, see [Authorization](#authorization).

For examples on how to create your Codec Server, see following Codec Server implementation samples:

- [Go](https://github.com/temporalio/samples-go/tree/main/codec-server)
- [Java](https://github.com/temporalio/sdk-java/tree/master/temporal-remote-data-encoder)
- [Python](https://github.com/temporalio/samples-python/blob/main/encryption/codec_server.py)
- [TypeScript](https://github.com/temporalio/samples-typescript/blob/main/encryption/src/codec-server.ts)

### API contract specifications

When you create your Codec Server to handle requests from the Web UI, the following requirements must be met.

#### Endpoints

The [Web UI/CLI calls the POST method with the /decode endpoint](https://github.com/temporalio/ui/blob/11ef7ddb47711444a365c7760eae41853446da07/src/lib/services/data-encoder.ts#L38).

In your Codec Server, create a `/decode` path and pass the incoming payload to the decode method in your Payload Codec.

You can also add a [verification step](#authorization) to check whether the incoming request has the required authorization to access the decode logic in your Payload Codec.

#### Headers

Each request from the Web UI to your Codec Server includes the following headers:

- `Content-Type: application/json`: Ensure that your Codec Server can accommodate this [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types).

- `X-Namespace: {namespace}`: This is a custom HTTP Header. Ensure that the [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) configuration in your Codec Server includes this header.

- [Optional] `Authorization: <credentials>`: Include this in your CORS configuration when enabling authorization with your Codec Server.

For details on setting up authorization, see [Authorization](#authorization).

#### Request body

The general specification for the `POST` request body contains payloads.
By default, all field values in your payload are base64 encoded, regardless of whether they are encrypted by your custom codec implementation.

The following example shows a sample `POST` request body with base64 encoding.

```json
{
  "payloads": [{
    "metadata": {
      "encoding": <base64EncodedEncodingHint>
    },
    "data": <encryptedPayloadData>
  }, ...]
}
```

#### CORS

Enable [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) requests on your Codec Server to receive HTTP/HTTPS requests from the Temporal Web UI.

At a minimum, enable the following responses from your Codec Server to allow requests coming from the Temporal Web UI:

- `Access-Control-Allow-Origin`
- `Access-Control-Allow-Methods`
- `Access-Control-Allow-Headers`

For example, for Temporal Cloud Web UI hosted at https://cloud.temporal.io, enable the following in your Codec Server:

- `Access-Control-Allow-Origin: https://cloud.temporal.io`
- `Access-Control-Allow-Methods: POST, GET, OPTIONS`
- `Access-Control-Allow-Headers: X-Namespace, Content-Type`

For details on what a sample request/response looks like from the Temporal Web UI, see [Sample Request/Response](#sample-requestresponse).
If setting authorization, include `Authorization` in your `Access-Control-Allow-Headers`.
For details on setting up authorization, see [Authorization](#authorization).

#### Authorization

To enable authorization from the Web UI (for both self-hosted Cluster and Temporal Cloud), your Codec Server must be an HTTPS Server.

**Temporal Cloud**

The Temporal Cloud UI provides an option to pass access tokens (JWT) to your Codec Server endpoints.
Use the access tokens to validate access and then return decoded payloads from the Codec Server.

You can enable this by selecting **Pass access token** in your Codec Server endpoint interface where you add your endpoint.
Enabling this option in the Temporal Cloud UI adds an authorization header to each request sent to the Codec Server endpoint that you set.

In your Codec Server implementation, verify the signature on this access token (in your authorization header) against the JWKS endpoint provided to you.

<!--Update: the JWKS link is provided in the UI onboarding content for now.
Is this process defined? when a customer signs up for temporal cloud, do we provide them with the JWKS as part of the onboarding process? also the JWKS endpoint is rate-limited - something we should call out when providing the link to users.-->

<!-- Commenting this for now.-->
<!--If you want to unpack the claims in your token to add additional checks on whether the user has valid access to the Namespace and payloads they are trying to access, you can implement it using Auth0 SDKs, middleware, or one of the third-party libraries at JWT.io.-->

The token provided from Temporal Cloud UI contains the email identifier of the person requesting access to the payloads.
Based on the permissions you have provided to the user in your access control systems, set conditions in your Codec Server whether to return decoded payloads or just return the original encoded payloads.

**Self-hosted Temporal Cluster**

On self-hosted Temporal Clusters, configure [authorization in the Web UI configuration](/references/web-ui-configuration#auth) in your Temporal Cluster setup.

With this enabled, you can pass access tokens to your Codec Server and validate the requests from the Web UI to the Codec Server endpoints that you set.

Note that with self-hosted Temporal Clusters, you must explicitly configure authorization specifications for the Web UI and CLI.

The following sample provides implementation examples for applying authentication on your Codec Server using the Go SDK.

- [Codec Server](https://github.com/temporalio/samples-go/tree/main/codec-server)

#### Sample request/response

Consider the following sample request/response when creating and hosting a Codec Server with the following specifications:

- Scheme: `https`
- Host: `dev.mydomain.com/codec`
- Path: `/decode`

```json
HTTP/1.1 POST /decode
Host: https://dev.mydomain.com/codec
Content-Type: application/json
X-Namespace: myapp-dev.acctid123
Authorization: Bearer <token>

{"payloads":[{"metadata":{"encoding":"anNvbi9wcm90b2J1Zg==","messageType":"dGVtcG9yYWxfc2hvcC5vcmNoZXN0cmF0aW9ucy52MS5TdGFydFNob3BwaW5nQ2FydFJlcXVlc3Q="},"data":"eyJjYXJ0SWQiOiJleGFtcGxlLWNhcnQiLCJzaG9wcGVySWQiOiJ5b3VyLXNob3BwZXItaWQtZXhhbXBsZSIsImVtYWlsIjoieW91ci1lbWFpbEBkb21haW4uY29tIn0"}]}

200 OK
Content-Type: application/json

{
  "payloads": [{
    "metadata":{
      "encoding": "json/protobuf",
      "messageType": "temporal_shop.orchestrations.v1.StartShoppingCartRequest"
    },
    "data":{
      "cartId":"example-cart",
      "shopperId":"your-shopper-id-example",
      "email":"your-email@domain.com"
    }}]
}
```

### Hosting your Codec Server

Your Codec Server can be hosted at an organization level or locally.

#### Organization-level hosting

Hosting the Codec Server for your organization simplifies both key management used for decryption and versioning the codec itself.
Consider the following details for a multi-tenant approach to setting up your Codec Server:

- Ingress: Your server will require ingress configuration for your users to access the server.
- Authorization: You must set explicit authorization checks to validate requests to your Codec Server.

#### Local hosting

Locally hosting the Codec Server is simpler to get started.
However, consider the following before choosing to do so:

- A single URL configuration is accepted for the Cloud account.
  This means some agreed-upon policy on the URL must be made for everyone using the Namespaces in this account.
  For example, if you configure your remote codec endpoint to be http://localhost:8080/codec, every developer must host your Codec Server locally at that port.

  Alternatively, you can use the local `hosts` file to allow each developer to choose where to host.
  For example, configure the remote codec endpoint as http://codec.server and allow each developer to control what it maps to locally.

- Distributing encryption keys that can decrypt the payloads at your organization can be a security risk.

### Set your Codec Server endpoints with Web UI and CLI

After you create your Codec Server and expose the requisite endpoints, set the endpoints in your Web UI and CLI.

#### Web UI

On Temporal Cloud and self-hosted Temporal Clusters, you can configure a Codec Server endpoint to be used for a Namespace in the Web UI.

![Codec Server endpoint setting](/img/docs/data-encoder-button.png)

To set a Codec Server endpoint on a Namespace, do the following.

1. In the Web UI, go to Namespaces, select the Namespace where you want to configure the Codec Server endpoint, and click **Edit**.
1. In the **Codec Server** section on the Namespace configuration page, enter your Codec Server endpoint and port number.
1. Optional: If your Codec Server is configured to [authenticate requests](#authorization) from Temporal Web UI, enable **Pass access token** to send a JWT access token with the HTTPS requests.
1. Optional: If your Codec Server is configured to [verify origins of requests](#cors), enable **Include cross-origin credentials**.

Setting a Codec Server endpoint on a Namespace enables it for all users on the Namespace.
On Temporal Cloud, you must have [Namespace Admin privileges](/cloud/#namespace-level-permissions) to add a Codec Server endpoint on the Namespace.

All users on a Namespace have the option to override the Namespace-level setting at the browser level.
Overriding the Namespace-level endpoint only affects your browser.
This can be useful when developing, testing, or troubleshooting encoding functionality.
To set a browser override for the Namespace-level endpoint, do the following.

1. Navigate to Workflows in your Namespace.
2. In the top-right corner, select **Configure Codec Server**.
3. Select whether you want to use the Namespace-level (or Cluster-level for self-hosted Cluster) or the browser-level Codec Endpoint setting as the default for your browser.
   In Temporal Cloud:
   - **Use Namespace-level settings, where available. Otherwise, use my browser setting.**
      Uses the Namespace-level Codec Server endpoint by default.
      If no endpoint is set on the Namespace, your browser setting is applied.
   - **Use my browser setting and ignore Namespace-level setting.**
      Applies your browser-level setting by default, overriding the Namespace-level Codec Server endpoint.
1. Enter your Codec Server endpoint and port number.
1. Optional: If your Codec Server is configured to [authenticate requests](#authorization) from Temporal Web UI, enable **Pass access token** to send a JWT access token with the HTTPS requests.
1. Optional: If your Codec Server is configured to [verify origins of requests](#cors), enable **Include cross-origin credentials**.

In self-hosted Temporal Clusters where you set up your UI Server, you can also set the codec endpoint in the UI server [configuration file](/references/web-ui-configuration#codec), as shown in the following example.

```yaml
codec:
    endpoint: {{ default .Env.TEMPORAL_CODEC_ENDPOINT "{namespace}"}}
```

Start the UI server to use this endpoint on the Web UI for decoding data in Workflow Executions in the specified Namespace.

#### CLI

In self-hosted Temporal Clusters, after the Codec Server is started, provide the exposed endpoint to CLI using the `--codec_endpoint` command option.

For example, if you are running your Codec Server locally and expose port 8888 as your endpoint, run the following command to set the codec endpoint globally.

```bash
temporal env set --codec-endpoint "http://localhost:8888"
```

If your codec endpoint is not set globally, use the `--codec-endpoint` option with your CLI commands.
For example, to see the decoded output of the Workflow Execution "yourWorkflow" in the Namespace "yourNamespace", run the following command.

```bash
temporal --codec-endpoint "http://localhost:8888" --namespace "yourNamespace" workflow show --workflow-id "yourWorkflow"  --run-id "<yourRunId>" --output "table"
```

For details, see the [CLI reference](/cli/).

Currently in Temporal Cloud, you can set the Codec Server endpoint only from the Web UI.
