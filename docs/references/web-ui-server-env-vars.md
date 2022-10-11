---
id: web-ui-server-env-vars
title: Docker environmental variables for Web UI
sidebar_label: Docker environmental variables
description: How to set Docker environmental variables for Temporal Web UI.
tags:
  - docker
  - webui
---

Docker containers can be configured for use in a production setting.
This is necessary for setting up a Web UI server.

Use `docker run` as the image name needed to configure the Web UI environmental variables.
`docker run` requires at least 1 argument.

`docker run [options] <image> <command> [args]`

The Web UI server can be configured with any number of environmental variables.

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

Environmental variables are fields that are set to configure a server. The setup process involves the configuration of several components, including mTLS, authentication, and more.

<!-- For more information on setting up a server environment, see [mTLS configuration guide](/typescript/security) -->

To view a full list of the environmental variables, refer to the [configuration template](https://github.com/temporalio/ui-server/blob/main/docker/config_template.yaml).

The environmental variables needed to configure the WebUI server environment are explained below.
Explanations and use cases are also provided for clarity.

## `TEMPORAL_ADDRESS`

// def
The frontend address for the Temporal Server.

// story

// relations
This variable is required for the other environmental variables to be configured.
// vars needed
// use case: kinda need it in general

## `TEMPORAL_UI_PORT`

//def
The port used to serve HTTP API and the Temporal WebUI Server.

//story
//relations
//vars needed
//use case

## `TEMPORAL_AUTH_ENABLED`

// def
Enables or disables Temporal authentication and authorization methods.

//story
//relations
//vars needed
//use case

## `TEMPORAL_AUTH_PROVIDER_URL`

//def
The URL for the Temporal Auth Provider.
Authentication/authorization OIDC provider URL.

//story
//relations
//vars needed
//use case

## `TEMPORAL_AUTH_CLIENT_ID`

// def
The client ID for Temporal authentication and authorization methods.

//story
//relations
//vars needed
//use case

## `TEMPORAL_AUTH_CLIENT_SECRET`

// def
The client secret used for authentication and authorization.

//story
//relations
//vars needed
//use case

## `TEMPORAL_AUTH_CALLBACK_URL`

//def
The callback URL used by authentication or authorization methods.

//story
//relations
//vars needed
//use case

## `TEMPORAL_UI_ENABLED`

Enables or disables the [browser UI](/references/ui-configuration#enableui) for the Temporal Server.

Enabling the browser UI allows the Server to be accessed from your web browser.
If disabled, the server cannot be viewed on the web, but the UI server APIs remain available for use.

This variable needs to be set to 'true' in order to set `TEMPORAL_OPENAPI_ENABLED`.

## `TEMPORAL_OPENAPI_ENABLED`

Enables or disables OpenAPI features for the Temporal Web UI.

This can be set initially with the [enableOpenAPI](/references/ui-configuration#enableopenapi) UI configuration.
The documentation can be found at `/openapi/` on your Temporal Server.

This variable requires `TEMPORAL_UI_ENABLED` to be set to 'true'.

## `TEMPORAL_TLS_CA`

//def
The path for the Transport Layer Security (TLS) Certificate Authority file.

//story
//relations
//vars needed
//use case

## `TEMPORAL_TLS_CERT`

//def
The path for the Transport Layer Security (TLS) Certificate.

//story
//relations
//vars needed
//use case

## `TEMPORAL_TLS_KEY`

//def
Path for the TLS key file.

//story
//relations
//vars needed
//use case

## `TEMPORAL_TLS_ENABLE_HOST_VERIFICATION`

//def
Enables or disables Transport Layer Security (TLS) host verification.

//story
//relations
//vars needed
//use case

## `TEMPORAL_TLS_SERVER_NAME`

//def
The server on which to operate Transport Layer Security (TLS) protocols.

//story
//relations
//vars needed
//use case
