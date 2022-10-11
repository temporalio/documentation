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
This is necessary for setting up a Web UI server for your application.

Use `docker run` as the image name needed to configure the Web UI environmental variables.
`docker run` requires at least 1 argument.

`docker run [options] <image> <command> [args]`

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

The environmental variables are defined as follows.
For more information on setting up a server environment, see [mTLS configuration guide](/typescript/security)

To view a full list of the environmental variables, refer to the [configuration template](https://github.com/temporalio/ui-server/blob/main/docker/config_template.yaml).

The environmental variables needed for this setup are defined as follows:

- `TEMPORAL_ADDRESS` : Temporal frontend address.
- `TEMPORAL_UI_PORT` : port to serve HTTP API and UI.
- `TEMPORAL_AUTH_ENABLED` : enable or disable authentication/authorization.
- `TEMPORAL_AUTH_PROVIDER_URL` : Authentication/authorization OIDC provider URL.
- `TEMPORAL_AUTH_CLIENT_ID` : authentication/authorization client ID.
- `TEMPORAL_AUTH_CLIENT_SECRET` : authentication/authorization client secret.
- `TEMPORAL_AUTH_CALLBACK_URL` : authentication/authorization callback URL.
- `TEMPORAL_UI_ENABLED` : enable or disable serve UI.
- `TEMPORAL_OPENAPI_ENABLED` : enable or disable serve open API UI.
- `TEMPORAL_TLS_CA` : TLS Certificate Authority path.
- `TEMPORAL_TLS_CERT` : TLS certificate path.
- `TEMPORAL_TLS_KEY` : TLS key path.
- `TEMPORAL_TLS_ENABLE_HOST_VERIFICATION` : enable or disable TLS host verification.
- `TEMPORAL_TLS_SERVER_NAME` : TLS server name.
