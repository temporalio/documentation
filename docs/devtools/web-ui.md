---
id: web-ui
title: Temporal Web UI
sidebar_label: Web UI
---

The Temporal Web UI can be used to view Workflow Execution states or explore and debug Workflow Executions. It is [open source](https://github.com/temporalio/web).

For a **video demo** of how this looks, you can [check our docs](/java/run-your-first-app-tutorial/#state-visibility).

<img width="1222" alt="CleanShot 2021-07-20 at 18 00 27@2x" src="https://user-images.githubusercontent.com/6764957/126414038-860403cd-dd86-4348-82f3-be2214c804bb.png" />

## Deploying and securing Temporal Web

_If you have specific questions you'd like us to answer, please check Slack, Forums, or [post questions on GitHub](https://github.com/temporalio/web/)._

### Configuring Temporal Web

Set these environment variables if you need to change their defaults:

| Variable                         | Description                                                                     | Default                       |
| -------------------------------- | ------------------------------------------------------------------------------- | ----------------------------- |
| TEMPORAL_GRPC_ENDPOINT           | String representing server gRPC endpoint                                        | 127.0.0.1:7233                |
| TEMPORAL_WEB_PORT                | HTTP port to serve on                                                           | 8080                          |
| TEMPORAL_CONFIG_PATH             | Path to config file, see [configurations](#configuring-authentication-optional) | ./server/config.yml           |
| TEMPORAL_PERMIT_WRITE_API        | Boolean to permit write API methods such as Terminating Workflows               | true                          |
| TEMPORAL_WEB_ROOT_PATH           | The root path to serve the app under                                            | /                             |
| TEMPORAL_HOT_RELOAD_PORT         | HTTP port used by hot reloading in development                                  | 8081                          |
| TEMPORAL_HOT_RELOAD_TEST_PORT    | HTTP port used by hot reloading in tests                                        | 8082                          |
| TEMPORAL_SESSION_SECRET          | Secret used to hash the session with HMAC                                       | "ensure secret in production" |
| TEMPORAL_EXTERNAL_SCRIPTS        | Additional JavaScript tags to serve in the UI                                   |                               |
| TEMPORAL_GRPC_MAX_MESSAGE_LENGTH | gRPC max message length (bytes)                                                 | 4194304 (4mb)                 |

<details>
<summary>
Optional TLS configuration variables:
</summary>

| Variable                              | Description                                                         | Default |
| ------------------------------------- | ------------------------------------------------------------------- | ------- |
| TEMPORAL_TLS_CERT_PATH                | Certificate for the server to validate the client (web) identity    |         |
| TEMPORAL_TLS_KEY_PATH                 | Private key for secure communication with the server                |         |
| TEMPORAL_TLS_CA_PATH                  | Certificate authority (CA) certificate for the validation of server |         |
| TEMPORAL_TLS_ENABLE_HOST_VERIFICATION | Enables verification of the server certificate                      | true    |
| TEMPORAL_TLS_SERVER_NAME              | Target server that is used for TLS host verification                |         |

- To enable mutual TLS, you need to specify `TEMPORAL_TLS_KEY_PATH` and `TEMPORAL_TLS_CERT_PATH`.
- For server-side TLS you need to specify only `TEMPORAL_TLS_CA_PATH`.

By default we will also verify your server `hostname`, matching it to `TEMPORAL_TLS_SERVER_NAME`. You can turn this off by setting `TEMPORAL_TLS_ENABLE_HOST_VERIFICATION` to `false`.

</details>

### Configuring authentication

> This section covers how to secure Temporal Web.
> To secure the Temporal Server, see the [Server security docs](/server/security).
> ⚠️ This is currently a beta feature, [please report any and all issues to us!](https://github.com/temporalio/web/issues/new)

Since v1.3, Temporal Web offers optional OAuth SSO authentication.
It can be enabled it in 2 steps:

1. Edit the `server/config.yml` file:

   ```yaml
   auth:
     enabled: true # Temporal Web checks this first before reading your provider config
     providers:
       - label: "google oidc" # for internal use; in future may expose as button text
         type: oidc # for futureproofing; only oidc is supported today
         issuer: https://accounts.google.com
         client_id: xxxxxxxxxx-xxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
         client_secret: xxxxxxxxxxxxxxxxxxxxxxx
         scope: openid profile email
         audience: temporal # identifier of the audience for an issued token (optional)
         callback_base_uri: http://localhost:8080
         pass_id_token: false # adds ID token as 'authorization-extras' header with every request to server
   ```

   <details>
   <summary>
   Providing <code>config.yml</code> to Docker image
   </summary>

   If you are running Temporal Web from the docker image, you can provide your external config.yml to docker to override the internal config.
   Create config.yml file on your machine, for example at `~/Desktop/config.yml`.
   Start the Docker image, providing the path to your `config.yml` file using external volume flag (-v).
   Leave the path after the semicolon as is:

   ```bash
   docker run --network host -v ~/Desktop/config.yml:/usr/app/server/config.yml temporalio/web:latest
   ```

   </details>

   In the future, multiple OAuth providers may be supported, however for now we only read the first OAuth provider under the `providers` key above.

   Common OAuth Providers and their docs:

   - **Google**: https://developers.google.com/identity/protocols/oauth2/openid-connect
   - **Auth0**: https://auth0.com/docs/protocols/configure-okta-as-oauth2-identity-provider
   - **Okta**: https://help.okta.com/en/prod/Content/Topics/Apps/Apps_App_Integration_Wizard_OIDC.htm
       <details>
         <summary>
           Troubleshooting note for Okta users:
         </summary>
         Some providers like Okta, have a race condition that may cause logins to occasionally fail. You can get around this by providing the full URL to the `openid-configuration` path as part of the `issuer` parameter:

     ```yaml
       auth:
         enabled: true
         providers:
             - label: 'okta dev'
               type: oidc
               issuer: https://dev-xxxxxxx.okta.com/.well-known/openid-configuration
               ...
     ```

     </details>

   - **Keycloak**: https://www.keycloak.org/getting-started/getting-started-docker
   - please feel free to [PR or request more help on the Temporal Web repo](https://github.com/temporalio/web/)

  <!-- prettier-ignore-end -->

2.  You will need to provide a redirect URL to your OAuth Provider.
    If you are hosting Temporal Web at `http://localhost:8080` (this is configured by `callback_base_uri` in `server/config.yml`), then it's `http://localhost:8080/auth/sso_callback`.

    By default, Temporal Web asks for 3 scopes, make sure your provider recognizes these or you may see scope-related errors:

    - `openid` required by some OIDC providers like [auth0](https://auth0.com/docs/scopes/openid-connect-scopes)
    - `profile` for name
    - `email` for email

## Using Temporal Web for development

When you have the Temporal Cluster running locally (use the [quick install guide](/application-development-guide#run-a-dev-cluster)), you can view the Temporal Web UI at [http://localhost:8080](http://localhost:8080).
(You can configure the port number by setting the `TEMPORAL_WEB_PORT` environment variable.)

> ⚠️ This is a basic guide to troubleshooting/debugging Temporal applications.
> It is work-in-progress and we encourage [reading about our Architecture](/concepts/what-is-a-temporal-cluster) for more detail.
> The better you understand how Temporal works, the better you will be at debugging Workflow Executions.

If you have the time, we recommend [watching our 19 minute video guide on YouTube](https://youtu.be/PqcVKIxI0nU) which demonstrates the debugging explained below.

### Basic debugging via Temporal Web

The primary mechanism we recommend for debugging is [Temporal Web](https://github.com/temporalio/web), which is run in a separate process:

![6XkjmR](https://user-images.githubusercontent.com/6764957/110544958-71746480-8167-11eb-8152-8d3a3eb73d4e.gif)

- [Workflow Executions](/concepts/what-is-a-workflow-execution) are identified by their [**Workflow ID**](/concepts/what-is-a-workflow-id), which you provide when creating the workflow. They also have a **Name** which is directly taken from your code.
- Workflow **Status** is usually in one of a few states: Running, Completed, or Terminated, with **Start Time** and **End Time** shown accordingly.
- Workflow ID's are are distinct from **Run ID's**, which uniquely identify one of potentially many Runs of Workflows with the same Workflow ID.

> Tip: Don't confuse Runs with [Workflow Executions](/concepts/what-is-a-workflow-execution)—they are similar, but a long-running Workflow Execution can have multiple Runs. A Run is the atomic unit.

The full state of every Run is inspectable in Temporal Web:

<details>
<summary>
If your workflows seem like they aren't receiving the right data, check the **Input** arguments given.
</summary>

![CleanShot 2021-07-20 at 18 05 24@2x](https://user-images.githubusercontent.com/6764957/126414387-fb2e0be4-86f9-491a-9722-e94060cd0115.png)

</details>
<details>
<summary>
If your workflows seem "stuck", check the **Task Queue** assigned to a given workflow to see that there are active workers polling.
</summary>

<img width="882" alt="CleanShot 2021-07-20 at 17 48 45@2x" src="https://user-images.githubusercontent.com/6764957/126413160-18663430-bb7a-4d3a-874e-80598e1fa07d.png" />

</details>
<details>
<summary>
If you see inspect the **Pending Activities** and see an activity with a lot of retry `attempt`s, you can check the `lastFailure` field for a clue as to what happened.
</summary>

![CleanShot 2021-07-20 at 18 08 18@2x](https://user-images.githubusercontent.com/6764957/126414614-432a0db3-603c-4f64-995f-6289863c6ee5.png)

</details>
<details>
<summary>
If you need to go back in time from the current state, check the **History Events** where you can see the full Workflow Execution History logs (this is what makes Temporal so resilient)

</summary>

![CleanShot 2021-07-20 at 18 07 29@2x](https://user-images.githubusercontent.com/6764957/126414550-595b3c22-c719-40c9-abe1-e1fd75c459f8.png)

</details>

### Execution Histories on Temporal Web

Reading execution histories is one of the more reliable ways of debugging:

![CleanShot 2021-07-20 at 18 07 29@2x](https://user-images.githubusercontent.com/6764957/126414550-595b3c22-c719-40c9-abe1-e1fd75c459f8.png)

Here, you can see the exact sequence of events that has happened so far, which includes the relevant state for each event and details about what went wrong or what is preventing the next correct event.
There are about 40 system events in total.
See our [Temporal Server Event Types reference](/concepts/what-is-an-event/) for detailed descriptions.

### Viewing Stack Traces on Temporal Web

Temporal also stores the stack trace of where a given activity is currently blocked:

![image](https://user-images.githubusercontent.com/6764957/110547621-20ff0600-816b-11eb-84f3-c6a97c5cad31.png)

This is often a good way to get a deep understanding of whether your workflow is executing as expected.

### Recovering In-flight Workflows While Running

Here we will discuss how to proceed once you have identified and fixed the code for an erroring activity.

If your activity code is deterministic, you might be able to simply restart the worker to pick up the changes. Execution will continue from where it last succeeded. In other words, we get "hotfixing for free" due to Temporal's execution model.

However, if your activity is more complex, you will have to explicitly [version your workflows](/go/versioning/) or even manually terminate and restart the workflows.

_This section is still being written - if you have specific questions you'd like us to answer, please search or [ask on the Temporal Forum](https://community.temporal.io/)._
