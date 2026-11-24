---
id: web-ui-configuration
title: Temporal Web UI configuration reference
sidebar_label: Web UI configuration
description:
  Keys in the Temporal Web UI Server's YAML configuration files, covering the Frontend connection, Workflow actions,
  auth, TLS, CORS, and Codec Server.
toc_max_heading_level: 4
tags:
  - Reference
  - Temporal Web UI
---

:::info

To set these keys with environment variables in the `temporalio/ui` Docker image, see the
[Temporal Web UI environment variables reference](/references/web-ui-environment-variables).

:::

The Temporal Web UI Server reads its configuration from YAML files in its configuration directory.
It loads `base.yaml` first, then the file for the current environment, such as `development.yaml`.
Values in the environment file override values in `base.yaml`.

The configuration structs are defined in
[config.go](https://github.com/temporalio/ui-server/blob/main/server/config/config.go) in the ui-server repository.
For a complete example, see
[development.yaml](https://github.com/temporalio/ui-server/blob/main/config/development.yaml).

Each key on this page lists its **environment variable** and its **default**.
The default is the value the Web UI Server uses when no configuration file sets the key.
The Docker image sets its own defaults through environment variables.

## Server settings

### `temporalGrpcAddress`

Address of the [Frontend Service](/temporal-service/temporal-server#frontend-service) that the Web UI Server connects
to.
The Web UI Server doesn't start without this value.

- Environment variable: [`TEMPORAL_ADDRESS`](/references/web-ui-environment-variables#temporal_address)
- Default: `127.0.0.1:7233`, set in `base.yaml`

### `host`

Network interface that the Web UI Server listens on.
When empty, the Web UI Server listens on every interface.

- Environment variable: none
- Default: empty

### `port`

Port that the Web UI Server listens on for the browser UI and the HTTP API.

- Environment variable: [`TEMPORAL_UI_PORT`](/references/web-ui-environment-variables#temporal_ui_port)
- Default: `8233`, set in `base.yaml`

### `publicPath`

Subpath to serve the Web UI from, such as `/custom-path`.
Leave it empty to serve the Web UI from the root path.

- Environment variable: [`TEMPORAL_UI_PUBLIC_PATH`](/references/web-ui-environment-variables#temporal_ui_public_path)
- Default: empty

### `enableUi`

Set to `true` to serve the browser UI.
When `false`, the Web UI Server serves only its APIs.

- Environment variable: [`TEMPORAL_UI_ENABLED`](/references/web-ui-environment-variables#temporal_ui_enabled)
- Default: `false`

### `uiAssetPath`

Directory to serve the Web UI's static files from, instead of the files built into the Web UI Server.

- Environment variable: none
- Default: empty

### `cloudUi`

Set to `true` to use the Temporal Cloud version of the Web UI.

- Environment variable: [`TEMPORAL_CLOUD_UI`](/references/web-ui-environment-variables#temporal_cloud_ui)
- Default: `false`

### `refreshInterval`

How often the Web UI Server reloads its configuration files, such as `1m`.
Set it to `0s` to turn off reloading.
Settings that the Web UI Server reads only at startup, such as `host`, `port`, and `publicPath`, still need a restart.

- Environment variable:
  [`TEMPORAL_CONFIG_REFRESH_INTERVAL`](/references/web-ui-environment-variables#temporal_config_refresh_interval)
- Default: `0s`

### `forwardHeaders`

List of HTTP headers that the Web UI Server forwards from HTTP API requests to the Temporal Service's gRPC API.

```yaml
forwardHeaders:
  - X-Forwarded-For
```

- Environment variable: [`TEMPORAL_FORWARD_HEADERS`](/references/web-ui-environment-variables#temporal_forward_headers)
- Default: empty

### `hideLogs`

Set to `true` to stop the Web UI Server from printing its logs to the console.

- Environment variable: [`TEMPORAL_HIDE_LOGS`](/references/web-ui-environment-variables#temporal_hide_logs)
- Default: `false`

### `distribution`

How the Web UI was installed: `cli`, `docker`, `helm`, or `server`.
When [`notifyOnNewVersion`](#notifyonnewversion) is `true`, the Web UI Server uses this value to choose which release
to check for updates.

- Environment variable: [`TEMPORAL_UI_DISTRIBUTION`](/references/web-ui-environment-variables#temporal_ui_distribution)
- Default: empty, which the Web UI Server treats as `server`

### `distributionVersion`

Version of the distribution that installed the Web UI, such as the Temporal CLI version.
Only the `cli` distribution uses this value.

- Environment variable:
  [`TEMPORAL_UI_DISTRIBUTION_VERSION`](/references/web-ui-environment-variables#temporal_ui_distribution_version)
- Default: empty

## Web UI behavior settings

### `defaultNamespace`

[Namespace](/namespaces) that the Web UI opens first.

- Environment variable:
  [`TEMPORAL_DEFAULT_NAMESPACE`](/references/web-ui-environment-variables#temporal_default_namespace)
- Default: empty

### `feedbackUrl`

URL that the Feedback button in the Web UI opens.
When empty, the button opens the Web UI's GitHub issues page.

- Environment variable: [`TEMPORAL_FEEDBACK_URL`](/references/web-ui-environment-variables#temporal_feedback_url)
- Default: empty

### `showTemporalSystemNamespace`

Set to `true` to show the Temporal System Namespace in the Web UI.
The System Namespace holds the Workflow Executions that the Temporal Service runs internally.

- Environment variable:
  [`TEMPORAL_SHOW_TEMPORAL_SYSTEM_NAMESPACE`](/references/web-ui-environment-variables#temporal_show_temporal_system_namespace)
- Default: `false`

### `disableNewsFetch`

Set to `true` to stop the Web UI from requesting the news feed.
The Web UI also hides the button that opens the news feed panel.

- Environment variable:
  [`TEMPORAL_DISABLE_NEWS_FETCH`](/references/web-ui-environment-variables#temporal_disable_news_fetch)
- Default: `false`

### `notifyOnNewVersion`

Set to `true` to show a notice in the Web UI when a newer release is available.
The Web UI Server checks the release that matches [`distribution`](#distribution).

- Environment variable:
  [`TEMPORAL_NOTIFY_ON_NEW_VERSION`](/references/web-ui-environment-variables#temporal_notify_on_new_version)
- Default: `false`

### `navCollapsedByDefault`

Set to `true` to collapse the left navigation and the saved views navigation when the Web UI loads.

- Environment variable:
  [`TEMPORAL_NAV_COLLAPSED_BY_DEFAULT`](/references/web-ui-environment-variables#temporal_nav_collapsed_by_default)
- Default: `false`

### `hideWorkflowQueryErrors`

Set to `true` to hide server errors from Workflow Queries in the Web UI.

- Environment variable:
  [`TEMPORAL_HIDE_WORKFLOW_QUERY_ERRORS`](/references/web-ui-environment-variables#temporal_hide_workflow_query_errors)
- Default: `false`

### `refreshWorkflowCountsDisabled`

Set to `true` to stop the Web UI from refreshing the Workflow status counts on the Workflows page.

- Environment variable:
  [`TEMPORAL_REFRESH_WORKFLOW_COUNTS_DISABLED`](/references/web-ui-environment-variables#temporal_refresh_workflow_counts_disabled)
- Default: `false`

## Workflow and Activity action settings

These keys disable actions in the Web UI that change Workflow Executions or Activities.
Each key hides or disables the matching control in the Web UI.

### `disableWriteActions`

Set to `true` to disable every action in the Web UI that changes a Workflow Execution or Activity, including batch
actions.
This key overrides the other keys in this section.

The Web UI Server also rejects write requests to its HTTP API.
Workflow Queries still work.

- Environment variable:
  [`TEMPORAL_DISABLE_WRITE_ACTIONS`](/references/web-ui-environment-variables#temporal_disable_write_actions)
- Default: `false`

### `workflowTerminateDisabled`

Set to `true` to prevent users from terminating Workflow Executions from the Web UI.

- Environment variable:
  [`TEMPORAL_WORKFLOW_TERMINATE_DISABLED`](/references/web-ui-environment-variables#temporal_workflow_terminate_disabled)
- Default: `false`

### `workflowCancelDisabled`

Set to `true` to prevent users from canceling Workflow Executions from the Web UI.

- Environment variable:
  [`TEMPORAL_WORKFLOW_CANCEL_DISABLED`](/references/web-ui-environment-variables#temporal_workflow_cancel_disabled)
- Default: `false`

### `workflowSignalDisabled`

Set to `true` to prevent users from sending Signals to Workflow Executions from the Web UI.

- Environment variable:
  [`TEMPORAL_WORKFLOW_SIGNAL_DISABLED`](/references/web-ui-environment-variables#temporal_workflow_signal_disabled)
- Default: `false`

### `workflowUpdateDisabled`

Set to `true` to prevent users from sending Updates to Workflow Executions from the Web UI.

- Environment variable:
  [`TEMPORAL_WORKFLOW_UPDATE_DISABLED`](/references/web-ui-environment-variables#temporal_workflow_update_disabled)
- Default: `false`

### `workflowResetDisabled`

Set to `true` to prevent users from resetting Workflow Executions from the Web UI.

- Environment variable:
  [`TEMPORAL_WORKFLOW_RESET_DISABLED`](/references/web-ui-environment-variables#temporal_workflow_reset_disabled)
- Default: `false`

### `workflowPauseDisabled`

Set to `true` to prevent users from pausing Workflow Executions from the Web UI.

- Environment variable:
  [`TEMPORAL_WORKFLOW_PAUSE_DISABLED`](/references/web-ui-environment-variables#temporal_workflow_pause_disabled)
- Default: `false`

### `batchActionsDisabled`

Set to `true` to prevent users from running batch actions on multiple Workflow Executions from the Web UI.

- Environment variable:
  [`TEMPORAL_BATCH_ACTIONS_DISABLED`](/references/web-ui-environment-variables#temporal_batch_actions_disabled)
- Default: `false`

### `startWorkflowDisabled`

Set to `true` to prevent users from starting Workflow Executions from the Web UI.

- Environment variable:
  [`TEMPORAL_START_WORKFLOW_DISABLED`](/references/web-ui-environment-variables#temporal_start_workflow_disabled)
- Default: `false`

### `activityCommandsDisabled`

Set to `true` to hide the commands for pending Activities in the Web UI.
These commands pause, unpause, and reset an Activity, and update its options.

- Environment variable:
  [`TEMPORAL_ACTIVITY_COMMANDS_DISABLED`](/references/web-ui-environment-variables#temporal_activity_commands_disabled)
- Default: `false`

## cors

The `cors` section controls which origins can call the Web UI Server APIs and how the Web UI Server sets its
cross-site request forgery (CSRF) cookie.
CORS stands for Cross-Origin Resource Sharing.

```yaml
cors:
  allowOrigins:
    - http://localhost:3000
  unsafeAllowAllOrigins: false
  cookieInsecure: false
```

- `allowOrigins`: List of origins that can make cross-origin requests to the Web UI Server APIs.
  A value of `*` allows every origin.
  - Environment variable: [`TEMPORAL_CORS_ORIGINS`](/references/web-ui-environment-variables#temporal_cors_origins)
  - Default: empty, which allows no cross-origin requests
- `unsafeAllowAllOrigins`: Set to `true` to accept cross-origin requests from any origin and ignore `allowOrigins`.
  Use it only for local development.
  - Environment variable:
    [`TEMPORAL_CORS_UNSAFE_ALLOW_ALL_ORIGINS`](/references/web-ui-environment-variables#temporal_cors_unsafe_allow_all_origins)
  - Default: `false`
- `cookieInsecure`: Set to `true` to send the CSRF cookie over connections the browser considers insecure, such as
  plain HTTP.
  Use it only when something other than HTTPS secures the connection, such as a VPN.
  - Environment variable:
    [`TEMPORAL_CSRF_COOKIE_INSECURE`](/references/web-ui-environment-variables#temporal_csrf_cookie_insecure)
  - Default: `false`

## auth

The `auth` section configures sign-in to the Web UI through an identity provider (IdP).
It controls who can access the Web UI, not authorization against the Temporal Service.

```yaml
auth:
  enabled: true
  providers:
    - label: sso
      type: oidc
      providerUrl: https://accounts.google.com
      issuerUrl:
      clientId: xxxxx-xxxx.apps.googleusercontent.com
      clientSecret: xxxxxxxxxxxxxxxxxxxx
      callbackUrl: https://xxxx.com:8080/auth/sso/callback
      scopes:
        - openid
        - profile
        - email
```

- `enabled`: Set to `true` to require users to sign in to the Web UI.
  The other `auth` keys take effect only when this key is `true`.
  - Environment variable: [`TEMPORAL_AUTH_ENABLED`](/references/web-ui-environment-variables#temporal_auth_enabled)
  - Default: `false`
- `redirectToProvider`: Set to `true` to skip the Web UI sign-in page and send users who aren't signed in directly to
  the IdP.
  - Environment variable:
    [`TEMPORAL_AUTH_REDIRECT_TO_PROVIDER`](/references/web-ui-environment-variables#temporal_auth_redirect_to_provider)
  - Default: `false`
- `maxSessionDuration`: Longest a user session can last, such as `8h` or `168h`.
  After this duration, users must sign in again even if their tokens are still valid.
  When empty, sessions have no maximum duration.
  - Environment variable:
    [`TEMPORAL_MAX_SESSION_DURATION`](/references/web-ui-environment-variables#temporal_max_session_duration)
  - Default: empty
- `providers`: List of IdPs.
  The Web UI Server uses only the first provider in the list.
  - Default: empty

### providers

Each provider takes the following keys.
When `enabled` is `true`, the Web UI Server doesn't start unless `providerUrl`, `clientId`, and `callbackUrl` are set.

- `label`: Label for the IdP.
  - Environment variable: [`TEMPORAL_AUTH_LABEL`](/references/web-ui-environment-variables#temporal_auth_label)
  - Default: empty
- `type`: Authentication type.
  Only `oidc` is supported.
  - Environment variable: [`TEMPORAL_AUTH_TYPE`](/references/web-ui-environment-variables#temporal_auth_type)
  - Default: empty
- `providerUrl`: IdP URL that the Web UI Server uses for OpenID Connect (OIDC) discovery, such as
  `https://accounts.google.com`.
  - Environment variable:
    [`TEMPORAL_AUTH_PROVIDER_URL`](/references/web-ui-environment-variables#temporal_auth_provider_url)
  - Default: empty
- `issuerUrl`: URL of the token issuer.
  Set it only when the issuer differs from `providerUrl`.
  - Environment variable: [`TEMPORAL_AUTH_ISSUER_URL`](/references/web-ui-environment-variables#temporal_auth_issuer_url)
  - Default: empty
- `clientId`: OAuth client ID that the IdP issued for the Web UI.
  - Environment variable: [`TEMPORAL_AUTH_CLIENT_ID`](/references/web-ui-environment-variables#temporal_auth_client_id)
  - Default: empty
- `clientSecret`: OAuth client secret that the IdP issued for the Web UI.
  - Environment variable:
    [`TEMPORAL_AUTH_CLIENT_SECRET`](/references/web-ui-environment-variables#temporal_auth_client_secret)
  - Default: empty
- `callbackUrl`: URL that the IdP redirects users to after they sign in, such as
  `https://xxxx.com:8080/auth/sso/callback`.
  - Environment variable:
    [`TEMPORAL_AUTH_CALLBACK_URL`](/references/web-ui-environment-variables#temporal_auth_callback_url)
  - Default: empty
- `scopes`: List of OIDC scopes to request, such as `openid`, `profile`, and `email`.
  - Environment variable: [`TEMPORAL_AUTH_SCOPES`](/references/web-ui-environment-variables#temporal_auth_scopes)
  - Default: empty
- `options`: Map of query parameters that the Web UI Server adds to the redirect URL for the IdP.
  Use it for IdP-specific sign-in flows, such as the Auth0 `audience` and `organization` parameters.
  - Environment variable: none
  - Default: empty
- `useIdTokenAsBearer`: Set to `true` to send the ID token instead of the access token as the bearer token in the
  `Authorization` header.
  - Environment variable:
    [`TEMPORAL_AUTH_USE_ID_TOKEN_AS_BEARER`](/references/web-ui-environment-variables#temporal_auth_use_id_token_as_bearer)
  - Default: `false`
- `refreshTokenDuration`: Lifetime of the refresh tokens that the IdP issues, such as `24h`.
  Set it only when the IdP issues opaque refresh tokens, because the Web UI Server can't read their expiration.
  For JSON Web Token (JWT) refresh tokens, the Web UI Server uses the token's `exp` claim and ignores this value.
  When neither is available, the Web UI Server assumes a lifetime of 7 days.
  - Environment variable:
    [`TEMPORAL_AUTH_REFRESH_TOKEN_DURATION`](/references/web-ui-environment-variables#temporal_auth_refresh_token_duration)
  - Default: empty

## tls

The `tls` section configures Transport Layer Security (TLS) for the Web UI Server's connection to the Frontend Service.
It doesn't configure TLS for the Web UI itself.
To serve the Web UI over HTTPS, see [`uiServerTLS`](#uiservertls).

```yaml
tls:
  caFile: ../ca.cert
  certFile: ../cluster.pem
  keyFile: ../cluster.key
  caData:
  certData:
  keyData:
  enableHostVerification: true
  serverName: tls-server
```

- `caFile`: Path to the Certificate Authority (CA) certificate that verifies the Frontend Service's certificate.
  - Environment variable: [`TEMPORAL_TLS_CA`](/references/web-ui-environment-variables#temporal_tls_ca)
  - Default: empty
- `certFile`: Path to the client certificate that the Web UI Server presents to the Frontend Service for mutual TLS
  (mTLS).
  - Environment variable: [`TEMPORAL_TLS_CERT`](/references/web-ui-environment-variables#temporal_tls_cert)
  - Default: empty
- `keyFile`: Path to the private key for the certificate in `certFile`.
  - Environment variable: [`TEMPORAL_TLS_KEY`](/references/web-ui-environment-variables#temporal_tls_key)
  - Default: empty
- `caData`: PEM data for the CA certificate.
  Use it instead of `caFile`.
  - Environment variable: [`TEMPORAL_TLS_CA_DATA`](/references/web-ui-environment-variables#temporal_tls_ca_data)
  - Default: empty
- `certData`: PEM data for the client certificate.
  Use it instead of `certFile`.
  - Environment variable: [`TEMPORAL_TLS_CERT_DATA`](/references/web-ui-environment-variables#temporal_tls_cert_data)
  - Default: empty
- `keyData`: PEM data for the private key.
  Use it instead of `keyFile`.
  - Environment variable: [`TEMPORAL_TLS_KEY_DATA`](/references/web-ui-environment-variables#temporal_tls_key_data)
  - Default: empty
- `enableHostVerification`: Set to `true` to verify that the Frontend Service's certificate matches its hostname.
  - Environment variable:
    [`TEMPORAL_TLS_ENABLE_HOST_VERIFICATION`](/references/web-ui-environment-variables#temporal_tls_enable_host_verification)
  - Default: `false`
- `serverName`: Overrides the server name sent for Server Name Indication (SNI) and checked against the Frontend
  Service's certificate.
  - Environment variable: [`TEMPORAL_TLS_SERVER_NAME`](/references/web-ui-environment-variables#temporal_tls_server_name)
  - Default: empty

## uiServerTLS

The `uiServerTLS` section configures the Web UI Server to serve the Web UI over HTTPS.
The Web UI Server starts in TLS mode only when you set both keys.

```yaml
uiServerTLS:
  certFile: ../ui-server.pem
  keyFile: ../ui-server.key
```

- `certFile`: Path to the certificate that the Web UI Server presents to browsers.
  - Environment variable:
    [`TEMPORAL_UI_SERVER_TLS_CERT`](/references/web-ui-environment-variables#temporal_ui_server_tls_cert)
  - Default: empty
- `keyFile`: Path to the private key for the certificate in `certFile`.
  - Environment variable:
    [`TEMPORAL_UI_SERVER_TLS_KEY`](/references/web-ui-environment-variables#temporal_ui_server_tls_key)
  - Default: empty

## codec

The `codec` section configures how the Web UI sends payloads to a [Codec Server](/codec-server) for decoding.

```yaml
codec:
  endpoint: https://your-codec-server-endpoint
  passAccessToken: false
  includeCredentials: false
  defaultErrorMessage:
  defaultErrorLink:
```

- `endpoint`: URL of the Codec Server.
  - Environment variable: [`TEMPORAL_CODEC_ENDPOINT`](/references/web-ui-environment-variables#temporal_codec_endpoint)
  - Default: empty
- `passAccessToken`: Set to `true` to send the user's access token in the `Authorization` header of requests to the
  Codec Server.
  - Environment variable:
    [`TEMPORAL_CODEC_PASS_ACCESS_TOKEN`](/references/web-ui-environment-variables#temporal_codec_pass_access_token)
  - Default: `false`
- `includeCredentials`: Set to `true` to include browser credentials, such as cookies, in requests to the Codec Server.
  - Environment variable:
    [`TEMPORAL_CODEC_INCLUDE_CREDENTIALS`](/references/web-ui-environment-variables#temporal_codec_include_credentials)
  - Default: `false`
- `defaultErrorMessage`: Message that the Web UI shows in its error banner when it can't reach the Codec Server.
  When empty, the Web UI shows its built-in message.
  - Environment variable:
    [`TEMPORAL_CODEC_DEFAULT_ERROR_MESSAGE`](/references/web-ui-environment-variables#temporal_codec_default_error_message)
  - Default: empty
- `defaultErrorLink`: Link that the Web UI shows in its error banner when it can't reach the Codec Server.
  When empty, the Web UI links to
  [Set your Codec Server endpoints with Web UI and CLI](/production-deployment/data-encryption#set-your-codec-server-endpoints-with-web-ui-and-cli).
  - Environment variable:
    [`TEMPORAL_CODEC_DEFAULT_ERROR_LINK`](/references/web-ui-environment-variables#temporal_codec_default_error_link)
  - Default: empty
