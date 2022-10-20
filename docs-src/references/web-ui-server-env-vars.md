---
id: web-ui-server-env-vars
title: Temporal Web UI environmental variables
sidebar_label: Web UI environmental variables
description: How to set  environmental variables for Temporal Web UI.
tags:
  - docker
  - webui
  - ui server
---

Environmental variables are fields that are set to configure a Temporal Cluster.
This allows the user to configure the Cluster in any environment, such as a Docker container.

Use `docker run` as the image name needed to configure the Web UI environmental variables.
`docker run` requires at least 1 argument.

`docker run [options] <image> <command> [args]`

The Web UI Server is set up using specific environmental variables.
These variables need to be passed when running the image.

```
docker run \
    -e TEMPORAL_ADDRESS=127.0.0.1:7233 \
    -e TEMPORAL_UI_PORT=8080 \
    -e TEMPORAL_AUTH_ENABLED=true \
    -e TEMPORAL_AUTH_PROVIDER_URL=https://accounts.google.com \
    -e TEMPORAL_AUTH_CLIENT_ID=xxxxx-xxxx.apps.googleusercontent.com \
    -e TEMPORAL_AUTH_CLIENT_SECRET=xxxxxxxxxxxxxxx \
    -e TEMPORAL_AUTH_CALLBACK_URL=https://xxxx.com:8080/auth/sso/callback \
    -e TEMPORAL_UI_ENABLED=true \
    -e TEMPORAL_OPENAPI_ENABLED=true \
    -e TEMPORAL_TLS_CA=../ca.cert \
    -e TEMPORAL_TLS_CERT=../cluster.pem \
    -e TEMPORAL_TLS_KEY=../cluster.key \
    -e TEMPORAL_TLS_ENABLE_HOST_VERIFICATION=true \
    -e TEMPORAL_TLS_SERVER_NAME=tls-server \
    temporalio/ui:<tag>
```

The setup process involves the configuration of several components, including mTLS, authentication, and more.

The environmental variables for the entire configuration template can be found [here](https://github.com/temporalio/ui-server/blob/main/docker/config_template.yaml).

The environmental variables needed to configure the WebUI server environment are explained below.

## `TEMPORAL_ADDRESS`

The [Frontend Service](/concepts/what-is-the-frontend-service) address for the Temporal Cluster.
This environmental variable can be set [in the base configuration file](/docs-src/references/ui-configuration#) using `temporalGrpcAddress`.

`TEMPORAL_ADDRESS` allows the UI Server to [refresh as needed](/references/ui-configuration#refreshinterval) and [find the latest updates](/references/ui-configuration#notifyonnewversion) for the Temporal Cluster.

This variable is required for the configuration of other environmental variables.
`TEMPORAL_ADDRESS` is also needed when setting up [Cross-Origin Resource Sharing](/references/ui-configuration#cors).

## `TEMPORAL_UI_PORT`

The port used by the Temporal WebUI Server and the HTTP API.

Defining this variable allows the Cluster and API to communicate effectively.

This variable is needed for `TEMPORAL_OPENAPI_ENABLED` and all auth-related settings to work properly.
`TEMPORAL_UI_ENABLED` requires a valid port number.

## `TEMPORAL_PUBLIC_PATH`

The location in the Web UI Server where everything is stored.

## `TEMPORAL_AUTH_ENABLED`

Enables or disables Temporal authentication and authorization methods.

When enabled, the Temporal Cluster will use the provider information in the [UI configuration file](/references/ui-configuration#auth) to verify the identity of users.

All auth-related environmental variables depend on `TEMPORAL_AUTH_ENABLED`.
Disabling the variable will retain given values.

All auth-related variables must be defined when this is enabled.

## `TEMPORAL_AUTH_PROVIDER_URL`

The URL for Temporal's authentication and authorization OIDC provider.

This can be set as in the UI server configuration with [auth](/references/ui-configuration#auth).

The Temporal Cluster can be set up to use your preferred authentication and authorization methods.

This variable is required for configuring auth and its related variables.

## `TEMPORAL_AUTH_ISSUER_URL`

The URL for the authentication or authorization issuer.

## `TEMPORAL_AUTH_CLIENT_ID`

The client ID for Temporal authentication and authorization methods.

Authentication and authorization need to identify the correct client.
Providing a Client ID ensures that auth methods will run smoothly.

This variable is needed to [configure auth](/references/ui-configuration#auth).
Other auth variables must be defined along with `TEMPORAL_AUTH_CLIENT_ID`.

## `TEMPORAL_AUTH_CLIENT_SECRET`

The client secret used for authentication and authorization.

Client Secrets are used by the oAuth Client for authentication.

This variable is needed to configure auth.
Define all auth-related variables when using this variable.

## `TEMPORAL_AUTH_CALLBACK_URL`

The callback URL used by Temporal for authentication and authorization.

Callback URLs are invoked by the API after it's finished communicating with the Temporal Cluster.

This variable should be defined when [configuring auth](/references/ui-configuration#auth).

## `TEMPORAL_UI_ENABLED`

Enables or disables the [browser UI](/references/ui-configuration#enableui) for the Temporal Cluster.

Enabling the browser UI allows the Server to be accessed from your web browser.
If disabled, the server cannot be viewed on the web, but the UI server APIs remain available for use.

This variable needs to be set to 'true' in order to set `TEMPORAL_OPENAPI_ENABLED`.

## `TEMPORAL_OPENAPI_ENABLED`

Enables or disables OpenAPI features for the Temporal Web UI.

This can be set initially with the [enableOpenAPI](/references/ui-configuration#enableopenapi) UI configuration.
The documentation can be found at `/openapi/` on your Temporal Cluster.

This variable requires `TEMPORAL_UI_ENABLED` to be set to 'true'.

## `TEMPORAL_DEFAULT_NAMESPACE`

The default [Namespace](/concepts/what-is-a-namespace) that the Web UI loads data for.

## `TEMPORAL_FEEDBACK_URL`

The URL that users are directed to when they click the Feedback button in the UI.

If not specified, this variable defaults to the UI's GitHub Issue page.

## `TEMPORAL_NOTIFY_ON_NEW_VERSION`

Enables or disables notifications that appear in the UI whenever a newer version of the Temporal Cluster is available.

## `TEMPORAL_CONFIG_REFRESH_INTERVAL`

## `TEMPORAL_TLS_CA`

The path for the Transport Layer Security (TLS) Certificate Authority file.

In order to [configure TLS for your server](/references/ui-configuration#tls), you'll need a CA certificate issued by a trusted Certificate Authority.
Set this variable to properly locate and use the file.

`TEMPORAL_TLS_CA` is required for TLS configuration.

## `TEMPORAL_TLS_CERT`

The path for the Transport Layer Security (TLS) Certificate.

In order to [configure TLS for your server](/references/ui-configuration#tls), you'll need a self-signed certificate.
Set the path to allow the environment to locate and use the certificate.

`TEMPORAL_TLS_CERT` is required for TLS configuration.

## `TEMPORAL_TLS_KEY`

The path for the Transport Layer Security (TLS) [key file](/references/ui-configuration#tls).

A key file is used to create private and public keys.
These keys are used to create certificates.

A key file is needed to generate "key pairs" for encryption and signing.
This variable is required for `TEMPORAL_TLS_CERT`.

## `TEMPORAL_TLS_CA_DATA`

The data obtained from `TEMPORAL_TLS_CA`.

This variable requires a valid `TEMPORAL_TLS_CA`.

## `TEMPORAL_TLS_CERT_DATA`

The data obtained from `TEMPORAL_TLS_CERT_DATA`.

`TEMPORAL_TLS_CERT` must be defined to obtain a value for this variable.

## `TEMPORAL_TLS_KEY_DATA`

The data obtained from `TEMPORAL_TLS_KEY_DATA`.

`TEMPORAL_TLS_KEY` must be defined to use this variable.

## `TEMPORAL_TLS_ENABLE_HOST_VERIFICATION`

Enables or disables [Transport Layer Security (TLS) host verification](/references/ui-configuration#tls).

When enabled, TLS checks the Host Server to ensure that files are being sent to and from the correct URL.

This variable is needed when configuring TLS and its associated variables.

## `TEMPORAL_TLS_SERVER_NAME`

The server on which to operate [Transport Layer Security (TLS) protocols](/references/ui-configuration#tls).

TLS allows the current server to transmit encrypted files to other URLs without having to reveal itself.
Because of this, TLS operates a go-between server.

This variable is needed to configure TLS and its related environmental variables.

## `TEMPORAL_CODEC_ENDPOINT`

The endpoint for the Codec Server, if configured.

//story
//relations

## `TEMPORAL_CODEC_PASS_ACCESS_TOKEN`

The access token needed to transport data through the Codec Server.

Make sure that `TEMPORAL_CODEC_ENDPOINT` is defined to use this variable.

## `TEMPORAL_FORWARD_HEADERS`

The headers needed to forward payloads through the Codec Server.

This variable requires a valid `TEMPORAL_CODEC_ENDPOINT` and `TEMPORAL_CODEC_PASS_ACCESS_TOKEN` to work properly.
