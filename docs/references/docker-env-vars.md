---
id: docker-env-vars
title: Web UI Docker Environmental Variables
sidebar_label: Web UI Docker Environmental Variables
description: How to set the docker environmental variables quickly.
tags:
  - docker
  - webui
---

Docker containers can be configured for use in a production setting.
Use `docker run` to configure the Web UI environmental variables.

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

The environmental variables are defined below:

- [`TEMPORAL_ADDRESS`](#temporal-address) : Temporal frontend address.
- [`TEMPORAL_UI_PORT`](#temporal-ui-port) : port to serve HTTP API and UI.
- [`TEMPORAL_AUTH_ENABLED`](#temporal-auth-enabled) : enable or disable authentication/authorization.
- [`TEMPORAL_AUTH_PROVIDER_URL`](#temporal-auth-provider-url) : Authentication/authorization OIDC provider URL.
- [`TEMPORAL_AUTH_CLIENT_ID`](#temporal-auth-client-id) : authentication/authorization client ID.
- [`TEMPORAL_AUTH_CLIENT_SECRET`](#temporal-auth-client-secret) : authentication/authorization client secret.
- [`TEMPORAL_AUTH_CALLBACK_URL`](#temporal-auth-callback-url) : authentication/authorization callback URL.
- [`TEMPORAL_UI_ENABLED`](#temporal-ui-enabled) : enable or disable serve UI.
- [`TEMPORAL_OPENAPI_ENABLED`](#temporal-openapi-enabled) : enable or disable serve open API UI.
- [`TEMPORAL_TLS_CA`](#temporal-tls-ca) : TLS Certificate Authority path.
- [`TEMPORAL_TLS_CERT`](#temporal-tls-cert) : TLS certificate path.
- [`TEMPORAL_TLS_KEY`](#temporal-tls-key) : TLS key path.
- [`TEMPORAL_TLS_ENABLE_HOST_VERIFICATION`](temporal-tls-enable-host-verification) : enable or disable TLS host verification.
- [`TEMPORAL_TLS_SERVER_NAME](#temporal-tls-server-name) : TLS server name.
