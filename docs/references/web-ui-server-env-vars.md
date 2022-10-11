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
Temporal frontend address.

// story
// relations
// vars needed
// use case: kinda need it in general

## `TEMPORAL_UI_PORT`

//def
port to serve HTTP API and UI.
//story
//relations
//vars needed
//use case

## `TEMPORAL_AUTH_ENABLED`

// def
enable or disable authentication/authorization.

//story
//relations
//vars needed
//use case

## `TEMPORAL_AUTH_PROVIDER_URL`

//def
Authentication/authorization OIDC provider URL.

//story
//relations
//vars needed
//use case

## `TEMPORAL_AUTH_CLIENT_ID`

// def
authentication/authorization client ID.

//story
//relations
//vars needed
//use case

## `TEMPORAL_AUTH_CLIENT_SECRET`

// def
authentication/authorization client secret.

//story
//relations
//vars needed
//use case

## `TEMPORAL_AUTH_CALLBACK_URL`

//def
authentication/authorization callback URL.
//story
//relations
//vars needed
//use case

## `TEMPORAL_UI_ENABLED`

//def
enable or disable serve UI.
//story
//relations
//vars needed
//use case

## `TEMPORAL_OPENAPI_ENABLED`

// def
enable or disable serve open API UI.
//story
//relations
//vars needed
//use case

## `TEMPORAL_TLS_CA`

//def
TLS Certificate Authority path.
//story
//relations
//vars needed
//use case

## `TEMPORAL_TLS_CERT`

//def
TLS certificate path.
//story
//relations
//vars needed
//use case

## `TEMPORAL_TLS_KEY`

//def
TLS key path.
//story
//relations
//vars needed
//use case

## `TEMPORAL_TLS_ENABLE_HOST_VERIFICATION`

//def
enable or disable TLS host verification.
//story
//relations
//vars needed
//use case

## `TEMPORAL_TLS_SERVER_NAME`

//def
TLS server name.
//story
//relations
//vars needed
//use case
