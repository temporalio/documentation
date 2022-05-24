---
id: security
title: Temporal Server security
sidebar_label: Security
---

## Overview

A secured Temporal server has its network communication encrypted and has authentication and authorization protocols set up for API calls made to it.
Without these, your server could be accessed by unwanted entities.

What is documented on this page are the built-in opt-in security measures that come with Temporal.
However users may also choose to design their own security architecture with reverse proxies or run unsecured instances inside of a VPC environment.

## Server Samples

The https://github.com/temporalio/samples-server repo offers two examples, which are further explained below:

- **TLS**: how to configure Transport Layer Security (TLS) to secure network communication with and within a Temporal cluster.
- **Authorizer**: how to inject a low-level authorizer component that can control access to all API calls.

## Encryption in transit with mTLS

Temporal supports Mutual TLS (mTLS) as a way of encrypting network traffic between the services of a cluster and also between application processes and a cluster.
Self-signed or properly minted certificates can be used for mTLS.
Mutual TLS is set in Temporal's [TLS configuration](/server/configuration/#tls).
The configuration includes two sections such that intra-cluster and external traffic can be encrypted with different sets of certificates and settings:

- `internode`: Configuration for encrypting communication between nodes in the cluster.
- `frontend`: Configuration for encrypting the Frontend's public endpoints.

A customized configuration can be passed using either the [WithConfig](/server/options/#withconfig) or [WithConfigLoader](/server/options/#withconfigloader) server options.

See [TLS configuration reference](/server/configuration/#tls) for more details.

## Encryption at rest with DataConverter

import DataConverter from '../concepts/what-is-a-data-converter.md'

<DataConverter />

## Authentication

There are a few authentication protocols available to prevent unwanted access such as authentication of servers, clients, and users.

### Servers

To prevent spoofing and [MITM attacks](https://en.wikipedia.org/wiki/Man-in-the-middle_attack) you can specify the `serverName` in the `client` section of your respective mTLS configuration.
This enables established connections to authenticate the endpoint, ensuring that the server certificate presented to any connecting client has the given server name in its CN property.
It can be used for both `internode` and `frontend` endpoints.

More guidance on mTLS setup can be found in [the `samples-server` repo](https://github.com/temporalio/samples-server/tree/master/tls) and you can reach out to us for further guidance.

### Client connections

To restrict a client's network access to cluster endpoints you can limit it to clients with certificates issued by a specific Certificate Authority (CA).
Use the `clientCAFiles`/ `clientCAData` and `requireClientAuth` properties in both the `internode` and `frontend` sections of the [mTLS configuration](/server/configuration/#tls).

### Users

To restrict access to specific users, authentication and authorization is performed through extensibility points and plugins as described in the [Authorization](#authorization) section below.

## Authorization

Temporal offers two plugin interfaces for implementing API call authorization:

- `ClaimMapper`
- `Authorizer`

The authorization and claim mapping logic is customizable, making it available to a variety of use cases and identity schemes.
When these are provided the frontend invokes the implementation of these interfaces before executing the requested operation.

See https://github.com/temporalio/samples-server/blob/main/extensibility/authorizer for a sample implementation.

![](/img/docs/frontend-authorization-order-of-operations.png)

### `Authorizer` plugin interface

The `Authorizer` has a single `Authorize` method which is invoked for each incoming API call that is received by the Frontend gRPC service.
The `Authorize` method receives information about the API call and the role/permission claims of the caller.

<!--SNIPSTART temporal-common-authorization-authorizer-interface-->
<!--SNIPEND-->

`Authorizer` allows for a wide range of authorization logic, as information such as the call target, a set of role/permission claims, and any other data available to the system can be used in the authorization logic.
The following arguments must be passed to the `Authorize` method for example:

- `context.Context`: General context of the call.
- `authorization.Claims`: Claims about the roles assigned to the caller. Its intended use is [described below](#claims).
- `authorization.CallTarget`: Target of the API call.

<!--SNIPSTART temporal-common-authorization-authorizer-calltarget-->
<!--SNIPEND-->

The `Authorize` method then returns one of two possible decisions within the `Result.Decision` field:

- `DecisionDeny`: the requested API call is not invoked and an error is returned to the caller.
- `DecisionAllow`: the requested API call is invoked.

If you don't want to create your own, you can use the default `Authorizer`:

```go
a := authorization.NewDefaultAuthorizer()
```

Configure your `Authorizer` when you start the server via the `temporal.WithAuthorizer` [server option](/server/options/#withauthorizer).

If an `Authorizer` is not set in the server options, Temporal uses the `nopAuthority` authorizer that unconditionally allows all API calls to pass through.

### `ClaimMapper` plugin interface

`ClaimMapper` has a single method, `GetClaims` that is responsible for translating information from the authorization token and/or mutual TLS certificate of the caller into [Claims](#claims) about the callers roles within Temporal.
This component is customizable and can be set via the `temporal.WithClaimMapper` [server option](/server/options/#withclaimmapper), enabling a wide range of options for interpreting a caller's identity.

<!--SNIPSTART temporal-common-authorization-claimmapper-interface-->
<!--SNIPEND-->

A typical approach is for `ClaimMapper` to interpret custom `Claims` from a caller's JWT access token, such as membership in groups, and map them to Temporal roles for the user.
Another approach is to use the subject information from the caller's TLS certificate as a parameter for determining roles.
See the [default JWT `ClaimMapper`](#default-jwt-claimmapper) as an example.

#### `AuthInfo`

The `AuthInfo` struct that is passed to claim mapper's `GetClaims` method contains an authorization token extracted from the `authorization` header of the gRPC request.
It also includes a pointer to the `pkix.Name` struct that contains a X.509 distinguishable name from the caller's mutual TLS certificate.

<!--SNIPSTART temporal-common-authorization-authinfo-->
<!--SNIPEND-->

#### `Claims`

The `Claims` struct contains information about permission claims granted to the caller.
The `Authorizer` assumes that the caller has been properly authenticated and trusts the `Claims` that are passed to it for making an authorization decision.

<!--SNIPSTART temporal-common-authorization-claims-->
<!--SNIPEND-->

`Role` is a bit mask that is a combination of one or more the role constants:

<!--SNIPSTART temporal-common-authorization-role-enum-->
<!--SNIPEND-->

For example, a role can be set as

```go
role := authorization.RoleReader | authorization.RoleWriter
```

### Default JWT `ClaimMapper`

Temporal offers a default JSON Web Token `ClaimMapper` that extracts claims from JWT access tokens and translates them into Temporal `Claims`.
The default JWT `ClaimMapper` needs a public key to perform validation of tokens' digital signatures and expects [JWT tokens](https://tools.ietf.org/html/rfc7519) to be in the certain format [described below](#format-of-json-web-tokens).

You can use the default JWT `ClaimMapper` as an example to build your own `ClaimMapper` for translating a caller's authorization information from other formats and conventions into Temporal `Claims`.

To get an instance of the default JWT `ClaimMapper`, call `NewDefaultJWTClaimMapper` and provide it with an instance of a [`TokenKeyProvider`](#tokenkeyprovider), a pointer to a [`config.Authorization`](#configauthorization) config, and a logger.

```go
claimMapper := authorization.NewDefaultJWTClaimMapper(tokenKeyProvider, authCfg, logger)
```

#### `TokenKeyProvider`

To obtain public keys from issuers of JWT tokens and to refresh them over time, the default JWT ClaimMapper uses another pluggable component, the `TokenKeyProvider`.

<!--SNIPSTART temporal-common-authorization-tokenkeyprovider-interface-->
<!--SNIPEND-->

Temporal provides an implementation of the `TokenKeyProvider`, `rsaTokenKeyProvider`, that dynamically obtains public keys from given issuers' URIs that adhere to the [JWKS format](https://tools.ietf.org/html/rfc7517).

```go
provider := authorization.NewRSAKeyProvider(cfg)
```

Note that the `rsaTokenKeyProvider` returned by `NewRSAKeyProvider` only implements `RSAKey` and `Close` methods, and returns an error from `EcdsaKey` and `HmacKey` methods. It is configured via `config.Config.Global.Authorization.JWTKeyProvider`:

<!--SNIPSTART temporal-common-service-config-jwtkeyprovider-->
<!--SNIPEND-->

`KeySourceURIs` are the HTTP endpoints that return public keys of token issuers in the [JWKS format](https://tools.ietf.org/html/rfc7517).
`RefreshInterval` defines how frequently keys should be refreshed.
For example, [Auth0](https://auth0.com/) exposes such endpoints as `https://YOUR_DOMAIN/.well-known/jwks.json`.

#### `config.Authorization`

- `permissionsClaimName`: Name of the [Permissions Claim](#format-of-json-web-tokens) to be used by the default JWT `ClaimMapper`. "permissions" is used as a default name. Use `config.Config.Global.Authorization.PermissionsClaimName` configuration property to override the name.

#### Format of JSON Web Tokens

The default JWT `ClaimMapper` expects authorization tokens to be in the following format:

```
Bearer <token>
```

- &lt;token&gt;: Must be the Base64 url-encoded value of the token.

The default JWT `ClaimMapper` expects Permissions Claim in the JWT token to be named "permissions", unless overridden [in configuration](#configauthorization).

Permissions Claim is expected to be a collection of Individual Permission Claims. Each Individual Permission Claim is expected to be in the following format:

```
<namespace>:<permission>
```

- &lt;namespace&gt;: This can be either a Temporal Namespace name or "system" to represent system-wide permissions.
- &lt;permission&gt;: This can be one of the four values:
  - read
  - write
  - worker
  - admin

The default JWT claim mapper converts these permissions into Temporal roles for the caller as described [above](#claims).

Multiple permissions for the same namespace get OR'ed. For example, when `accounting:read` and `accounting:write` are found in a token, they are translated into `authorization.RoleReader | authorization.RoleWriter`.

##### Example of a JWT payload for The Default JWT ClaimMapper

```
{
   "permissions":[
      "system:read",
      "namespace1:write"
   ],
   "aud":[
      "audience"
   ],
   "exp":1630295722,
   "iss":"Issuer"
}
```

## Single sign-on integration

Temporal can be integrated with a single sign-on (SSO) experience by utilizing the `ClaimMapper` and `Authorizer` plugins.
The default JWT `ClaimMapper` implementation can be used as is or as a base for a custom implementation of a similar plugin.

### Temporal Web

To enable SSO for the Temporal Web UI edit the web service's configuration per the [Temporal Web README](https://github.com/temporalio/web#configuring-authentication-optional).
