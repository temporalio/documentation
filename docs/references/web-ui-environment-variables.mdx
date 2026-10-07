---
id: web-ui-environment-variables
title: Temporal Web UI environment variables reference
sidebar_label: Web UI env vars
description:
  Environment variables that set Temporal Web UI Server options in Docker, with each one's configuration key and default
  value.
toc_max_heading_level: 4
tags:
  - Reference
  - Temporal Web UI
---

:::info

For the settings in the Web UI Server configuration file, see the
[Temporal Web UI configuration reference](/references/web-ui-configuration).

:::

Environment variables configure the Temporal Web UI Server when you run it from the `temporalio/ui` Docker image.
Each variable sets a key in the configuration file.

The variables are defined in the
[docker.yaml configuration template](https://github.com/temporalio/ui-server/blob/main/config/docker.yaml) in the
ui-server repository.
Each variable on this page lists its **configuration key** and its **default**.

```bash
docker run \
  -e TEMPORAL_ADDRESS=127.0.0.1:7233 \
  -e TEMPORAL_UI_PORT=8080 \
  -e TEMPORAL_UI_PUBLIC_PATH=path/to/webui \
  -e TEMPORAL_UI_ENABLED=true \
  -e TEMPORAL_CLOUD_UI=false \
  -e TEMPORAL_DEFAULT_NAMESPACE=default \
  -e TEMPORAL_FEEDBACK_URL=https://feedback.here \
  -e TEMPORAL_CONFIG_REFRESH_INTERVAL=0s \
  -e TEMPORAL_SHOW_TEMPORAL_SYSTEM_NAMESPACE=false \
  -e TEMPORAL_DISABLE_WRITE_ACTIONS=false \
  -e TEMPORAL_AUTH_ENABLED=true \
  -e TEMPORAL_AUTH_TYPE=oidc \
  -e TEMPORAL_AUTH_PROVIDER_URL=https://accounts.google.com \
  -e TEMPORAL_AUTH_ISSUER_URL=https://accounts.google.com \
  -e TEMPORAL_AUTH_CLIENT_ID=xxxxx-xxxx.apps.googleusercontent.com \
  -e TEMPORAL_AUTH_CLIENT_SECRET=xxxxxxxxxxxxxxx \
  -e TEMPORAL_AUTH_CALLBACK_URL=https://xxxx.com:8080/auth/sso/callback \
  -e TEMPORAL_AUTH_SCOPES=openid,email,profile \
  -e TEMPORAL_TLS_CA=../ca.cert \
  -e TEMPORAL_TLS_CERT=../cluster.pem \
  -e TEMPORAL_TLS_KEY=../cluster.key \
  -e TEMPORAL_TLS_ENABLE_HOST_VERIFICATION=true \
  -e TEMPORAL_TLS_SERVER_NAME=tls-server \
  -e TEMPORAL_CODEC_ENDPOINT=https://codec.server \
  -e TEMPORAL_CODEC_PASS_ACCESS_TOKEN=false \
  -e TEMPORAL_CODEC_INCLUDE_CREDENTIALS=false \
  -e TEMPORAL_HIDE_LOGS=false \
  temporalio/ui:<tag>
```

## Server variables

### `TEMPORAL_ADDRESS`

Address of the [Frontend Service](/temporal-service/temporal-server#frontend-service) that the Web UI Server connects
to.

- Configuration key: [`temporalGrpcAddress`](/references/web-ui-configuration#temporalgrpcaddress)
- Default: `127.0.0.1:7233`

### `TEMPORAL_UI_PORT`

Port that the Web UI Server listens on for the browser UI and the HTTP API.

- Configuration key: [`port`](/references/web-ui-configuration#port)
- Default: `8080`

### `TEMPORAL_UI_PUBLIC_PATH`

Subpath to serve the Web UI from, such as `/custom-path`.
Leave it empty to serve the Web UI from the root path.

- Configuration key: [`publicPath`](/references/web-ui-configuration#publicpath)
- Default: empty

### `TEMPORAL_UI_ENABLED`

Set to `false` to stop serving the browser UI.
The Web UI Server still serves its APIs.

- Configuration key: [`enableUi`](/references/web-ui-configuration#enableui)
- Default: `true`

### `TEMPORAL_CLOUD_UI`

Set to `true` to use the Temporal Cloud version of the Web UI.

- Configuration key: [`cloudUi`](/references/web-ui-configuration#cloudui)
- Default: `false`

### `TEMPORAL_CONFIG_REFRESH_INTERVAL`

How often the Web UI Server reloads its configuration, such as `1m`.
Set it to `0s` to turn off reloading.
Settings that the Web UI Server reads only at startup, such as `TEMPORAL_UI_PORT` and `TEMPORAL_UI_PUBLIC_PATH`, still need a restart.

- Configuration key: [`refreshInterval`](/references/web-ui-configuration#refreshinterval)
- Default: `0s`

### `TEMPORAL_FORWARD_HEADERS`

Comma-separated list of HTTP headers that the Web UI Server forwards from HTTP API requests to the Temporal Service's
gRPC API.

- Configuration key: [`forwardHeaders`](/references/web-ui-configuration#forwardheaders)
- Default: empty

### `TEMPORAL_HIDE_LOGS`

Set to `true` to stop the Web UI Server from printing its logs to the console.

- Configuration key: [`hideLogs`](/references/web-ui-configuration#hidelogs)
- Default: `false`

### `TEMPORAL_UI_SERVER_TLS_CERT`

Path to the certificate that the Web UI Server uses to serve the Web UI over HTTPS.
The Web UI Server starts in TLS mode only when you set both this variable and `TEMPORAL_UI_SERVER_TLS_KEY`.

- Configuration key: [`uiServerTLS.certFile`](/references/web-ui-configuration#uiservertls)
- Default: empty

### `TEMPORAL_UI_SERVER_TLS_KEY`

Path to the private key for the certificate in `TEMPORAL_UI_SERVER_TLS_CERT`.

- Configuration key: [`uiServerTLS.keyFile`](/references/web-ui-configuration#uiservertls)
- Default: empty

### `TEMPORAL_UI_DISTRIBUTION`

How the Web UI was installed: `cli`, `docker`, `helm`, or `server`.
When [`TEMPORAL_NOTIFY_ON_NEW_VERSION`](#temporal_notify_on_new_version) is `true`, the Web UI Server uses this value to choose which release to check for updates.

- Configuration key: [`distribution`](/references/web-ui-configuration#distribution)
- Default: `docker`

### `TEMPORAL_UI_DISTRIBUTION_VERSION`

Version of the distribution that installed the Web UI, such as the Temporal CLI version.
Only the `cli` distribution uses this value.

- Configuration key: [`distributionVersion`](/references/web-ui-configuration#distributionversion)
- Default: empty

## CORS and CSRF variables

These variables control which origins can call the Web UI Server APIs and how the Web UI Server sets its cross-site request forgery (CSRF) cookie.
For the matching configuration keys, see [`cors`](/references/web-ui-configuration#cors).

### `TEMPORAL_CORS_ORIGINS`

Comma-separated list of origins that can make cross-origin requests to the Web UI Server APIs.
A value of `*` allows every origin.

- Configuration key: [`cors.allowOrigins`](/references/web-ui-configuration#cors)
- Default: `http://localhost:8080`

### `TEMPORAL_CORS_UNSAFE_ALLOW_ALL_ORIGINS`

Set to `true` to accept cross-origin requests from any origin and ignore `TEMPORAL_CORS_ORIGINS`.
Use it only for local development.

- Configuration key: [`cors.unsafeAllowAllOrigins`](/references/web-ui-configuration#cors)
- Default: `false`

### `TEMPORAL_CSRF_COOKIE_INSECURE`

Set to `true` to send the CSRF cookie over connections the browser considers insecure, such as plain HTTP.
Use it only when something other than HTTPS secures the connection, such as a VPN.

- Configuration key: [`cors.cookieInsecure`](/references/web-ui-configuration#cors)
- Default: `false`

## Web UI behavior variables

### `TEMPORAL_DEFAULT_NAMESPACE`

[Namespace](/namespaces) that the Web UI opens first.

- Configuration key: [`defaultNamespace`](/references/web-ui-configuration#defaultnamespace)
- Default: `default`

### `TEMPORAL_FEEDBACK_URL`

URL that the Feedback button in the Web UI opens.
When empty, the button opens the Web UI's GitHub issues page.

- Configuration key: [`feedbackUrl`](/references/web-ui-configuration#feedbackurl)
- Default: empty

### `TEMPORAL_SHOW_TEMPORAL_SYSTEM_NAMESPACE`

Set to `true` to show the Temporal System Namespace in the Web UI.
The System Namespace holds the Workflow Executions that the Temporal Service runs internally.

- Configuration key: [`showTemporalSystemNamespace`](/references/web-ui-configuration#showtemporalsystemnamespace)
- Default: `false`

### `TEMPORAL_DISABLE_NEWS_FETCH`

Set to `true` to stop the Web UI from requesting the news feed.
The Web UI also hides the button that opens the news feed panel.

- Configuration key: [`disableNewsFetch`](/references/web-ui-configuration#disablenewsfetch)
- Default: `false`

### `TEMPORAL_NOTIFY_ON_NEW_VERSION`

Set to `true` to show a notice in the Web UI when a newer release is available.
The Web UI Server checks the release that matches [`TEMPORAL_UI_DISTRIBUTION`](#temporal_ui_distribution).

- Configuration key: [`notifyOnNewVersion`](/references/web-ui-configuration#notifyonnewversion)
- Default: `false`

### `TEMPORAL_NAV_COLLAPSED_BY_DEFAULT`

Set to `true` to collapse the left navigation and the saved views navigation when the Web UI loads.

- Configuration key: [`navCollapsedByDefault`](/references/web-ui-configuration#navcollapsedbydefault)
- Default: `false`

### `TEMPORAL_HIDE_WORKFLOW_QUERY_ERRORS`

Set to `true` to hide server errors from Workflow Queries in the Web UI.

- Configuration key: [`hideWorkflowQueryErrors`](/references/web-ui-configuration#hideworkflowqueryerrors)
- Default: `false`

### `TEMPORAL_REFRESH_WORKFLOW_COUNTS_DISABLED`

Set to `true` to stop the Web UI from refreshing the Workflow status counts on the Workflows page.

- Configuration key: [`refreshWorkflowCountsDisabled`](/references/web-ui-configuration#refreshworkflowcountsdisabled)
- Default: `false`

## Workflow and Activity action variables

These variables disable actions in the Web UI that change Workflow Executions or Activities.
Each variable hides or disables the matching control in the Web UI.

### `TEMPORAL_DISABLE_WRITE_ACTIONS`

Set to `true` to disable every action in the Web UI that changes a Workflow Execution or Activity, including batch actions.
This variable overrides the other variables in this section.

- Configuration key: [`disableWriteActions`](/references/web-ui-configuration#disablewriteactions)
- Default: `false`

### `TEMPORAL_WORKFLOW_TERMINATE_DISABLED`

Set to `true` to prevent users from terminating Workflow Executions from the Web UI.

- Configuration key: [`workflowTerminateDisabled`](/references/web-ui-configuration#workflowterminatedisabled)
- Default: `false`

### `TEMPORAL_WORKFLOW_CANCEL_DISABLED`

Set to `true` to prevent users from canceling Workflow Executions from the Web UI.

- Configuration key: [`workflowCancelDisabled`](/references/web-ui-configuration#workflowcanceldisabled)
- Default: `false`

### `TEMPORAL_WORKFLOW_SIGNAL_DISABLED`

Set to `true` to prevent users from sending Signals to Workflow Executions from the Web UI.

- Configuration key: [`workflowSignalDisabled`](/references/web-ui-configuration#workflowsignaldisabled)
- Default: `false`

### `TEMPORAL_WORKFLOW_UPDATE_DISABLED`

Set to `true` to prevent users from sending Updates to Workflow Executions from the Web UI.

- Configuration key: [`workflowUpdateDisabled`](/references/web-ui-configuration#workflowupdatedisabled)
- Default: `false`

### `TEMPORAL_WORKFLOW_RESET_DISABLED`

Set to `true` to prevent users from resetting Workflow Executions from the Web UI.

- Configuration key: [`workflowResetDisabled`](/references/web-ui-configuration#workflowresetdisabled)
- Default: `false`

### `TEMPORAL_WORKFLOW_PAUSE_DISABLED`

Set to `true` to prevent users from pausing Workflow Executions from the Web UI.

- Configuration key: [`workflowPauseDisabled`](/references/web-ui-configuration#workflowpausedisabled)
- Default: `false`

### `TEMPORAL_BATCH_ACTIONS_DISABLED`

Set to `true` to prevent users from running batch actions on multiple Workflow Executions from the Web UI.

- Configuration key: [`batchActionsDisabled`](/references/web-ui-configuration#batchactionsdisabled)
- Default: `false`

### `TEMPORAL_START_WORKFLOW_DISABLED`

Set to `true` to prevent users from starting Workflow Executions from the Web UI.

- Configuration key: [`startWorkflowDisabled`](/references/web-ui-configuration#startworkflowdisabled)
- Default: `false`

### `TEMPORAL_ACTIVITY_COMMANDS_DISABLED`

Set to `true` to hide the commands for pending Activities in the Web UI.
These commands pause, unpause, and reset an Activity, and update its options.

- Configuration key: [`activityCommandsDisabled`](/references/web-ui-configuration#activitycommandsdisabled)
- Default: `false`

## Authentication variables

These variables configure sign-in to the Web UI through an identity provider (IdP).
They control who can access the Web UI, not authorization against the Temporal Service.
For the matching configuration keys, see [`auth`](/references/web-ui-configuration#auth).

### `TEMPORAL_AUTH_ENABLED`

Set to `true` to require users to sign in to the Web UI.
The other authentication variables take effect only when this variable is `true`.

- Configuration key: [`auth.enabled`](/references/web-ui-configuration#auth)
- Default: `false`

### `TEMPORAL_AUTH_REDIRECT_TO_PROVIDER`

Set to `true` to skip the Web UI sign-in page and send users who aren't signed in directly to the IdP.

- Configuration key: [`auth.redirectToProvider`](/references/web-ui-configuration#auth)
- Default: `false`

### `TEMPORAL_MAX_SESSION_DURATION`

Longest a user session can last, such as `8h` or `168h`.
After this duration, users must sign in again even if their tokens are still valid.
When empty, sessions have no maximum duration.

- Configuration key: [`auth.maxSessionDuration`](/references/web-ui-configuration#auth)
- Default: empty

### `TEMPORAL_AUTH_LABEL`

Label for the identity provider.

- Configuration key: [`auth.providers.label`](/references/web-ui-configuration#providers)
- Default: `sso`

### `TEMPORAL_AUTH_TYPE`

Authentication type.

- Configuration key: [`auth.providers.type`](/references/web-ui-configuration#providers)
- Default: `oidc`

### `TEMPORAL_AUTH_PROVIDER_URL`

IdP URL that the Web UI Server uses for OpenID Connect (OIDC) discovery, such as `https://accounts.google.com`.

- Configuration key: [`auth.providers.providerUrl`](/references/web-ui-configuration#providers)
- Default: none

### `TEMPORAL_AUTH_ISSUER_URL`

URL of the token issuer.
Set it only when the issuer differs from `TEMPORAL_AUTH_PROVIDER_URL`.

- Configuration key: [`auth.providers.issuerUrl`](/references/web-ui-configuration#providers)
- Default: empty

### `TEMPORAL_AUTH_CLIENT_ID`

OAuth client ID that the IdP issued for the Web UI.
Required when authentication is enabled.

- Configuration key: [`auth.providers.clientId`](/references/web-ui-configuration#providers)
- Default: none

### `TEMPORAL_AUTH_CLIENT_SECRET`

OAuth client secret that the IdP issued for the Web UI.

- Configuration key: [`auth.providers.clientSecret`](/references/web-ui-configuration#providers)
- Default: none

### `TEMPORAL_AUTH_CALLBACK_URL`

URL that the IdP redirects users to after they sign in, such as `https://xxxx.com:8080/auth/sso/callback`.

- Configuration key: [`auth.providers.callbackUrl`](/references/web-ui-configuration#providers)
- Default: none

### `TEMPORAL_AUTH_SCOPES`

Comma-separated list of OIDC scopes to request, such as `openid,email,profile`.

- Configuration key: [`auth.providers.scopes`](/references/web-ui-configuration#providers)
- Default: empty

### `TEMPORAL_AUTH_USE_ID_TOKEN_AS_BEARER`

Set to `true` to send the ID token instead of the access token as the bearer token in the `Authorization` header.

- Configuration key: [`auth.providers.useIdTokenAsBearer`](/references/web-ui-configuration#providers)
- Default: `false`

### `TEMPORAL_AUTH_REFRESH_TOKEN_DURATION`

Lifetime of the refresh tokens that the IdP issues, such as `24h`.
Set it only when the IdP issues opaque refresh tokens, because the Web UI Server can't read their expiration.
For JSON Web Token (JWT) refresh tokens, the Web UI Server uses the token's `exp` claim and ignores this value.
When neither is available, the Web UI Server assumes a lifetime of 7 days.

- Configuration key: [`auth.providers.refreshTokenDuration`](/references/web-ui-configuration#providers)
- Default: empty

## TLS variables

These variables configure Transport Layer Security (TLS) for the Web UI Server's connection to the Frontend Service.
They don't configure TLS for the Web UI itself.
For the matching configuration keys, see [`tls`](/references/web-ui-configuration#tls).

### `TEMPORAL_TLS_CA`

Path to the Certificate Authority (CA) certificate that verifies the Frontend Service's certificate.

- Configuration key: [`tls.caFile`](/references/web-ui-configuration#tls)
- Default: empty

### `TEMPORAL_TLS_CERT`

Path to the client certificate that the Web UI Server presents to the Frontend Service for mutual TLS (mTLS).

- Configuration key: [`tls.certFile`](/references/web-ui-configuration#tls)
- Default: empty

### `TEMPORAL_TLS_KEY`

Path to the private key for the certificate in `TEMPORAL_TLS_CERT`.

- Configuration key: [`tls.keyFile`](/references/web-ui-configuration#tls)
- Default: empty

### `TEMPORAL_TLS_CA_DATA`

PEM data for the CA certificate.
Use it instead of `TEMPORAL_TLS_CA`.

- Configuration key: [`tls.caData`](/references/web-ui-configuration#tls)
- Default: empty

### `TEMPORAL_TLS_CERT_DATA`

PEM data for the client certificate.
Use it instead of `TEMPORAL_TLS_CERT`.

- Configuration key: [`tls.certData`](/references/web-ui-configuration#tls)
- Default: empty

### `TEMPORAL_TLS_KEY_DATA`

PEM data for the private key.
Use it instead of `TEMPORAL_TLS_KEY`.

- Configuration key: [`tls.keyData`](/references/web-ui-configuration#tls)
- Default: empty

### `TEMPORAL_TLS_ENABLE_HOST_VERIFICATION`

Set to `true` to verify that the Frontend Service's certificate matches its hostname.

- Configuration key: [`tls.enableHostVerification`](/references/web-ui-configuration#tls)
- Default: `false`

### `TEMPORAL_TLS_SERVER_NAME`

Overrides the server name sent for Server Name Indication (SNI) and checked against the Frontend Service's certificate.

- Configuration key: [`tls.serverName`](/references/web-ui-configuration#tls)
- Default: empty

## Codec Server variables

These variables configure how the Web UI sends payloads to a [Codec Server](/codec-server) for decoding.
For the matching configuration keys, see [`codec`](/references/web-ui-configuration#codec).

### `TEMPORAL_CODEC_ENDPOINT`

URL of the Codec Server.

- Configuration key: [`codec.endpoint`](/references/web-ui-configuration#codec)
- Default: empty

### `TEMPORAL_CODEC_PASS_ACCESS_TOKEN`

Set to `true` to send the user's access token in the `Authorization` header of requests to the Codec Server.

- Configuration key: [`codec.passAccessToken`](/references/web-ui-configuration#codec)
- Default: `false`

### `TEMPORAL_CODEC_INCLUDE_CREDENTIALS`

Set to `true` to include browser credentials, such as cookies, in requests to the Codec Server.

- Configuration key: [`codec.includeCredentials`](/references/web-ui-configuration#codec)
- Default: `false`

### `TEMPORAL_CODEC_DEFAULT_ERROR_MESSAGE`

Message that the Web UI shows in its error banner when it can't reach the Codec Server.
When empty, the Web UI shows its built-in message.

- Configuration key: [`codec.defaultErrorMessage`](/references/web-ui-configuration#codec)
- Default: empty

### `TEMPORAL_CODEC_DEFAULT_ERROR_LINK`

Link that the Web UI shows in its error banner when it can't reach the Codec Server.
When empty, the Web UI links to [Set your Codec Server endpoints with Web UI and CLI](/production-deployment/data-encryption#set-your-codec-server-endpoints-with-web-ui-and-cli).

- Configuration key: [`codec.defaultErrorLink`](/references/web-ui-configuration#codec)
- Default: empty
