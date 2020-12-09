---
id: server-api-auth
title: Set up server API authorization
sidebar_label: API auth setup
---

## Overview

Temporal supports the ability to restrict API call access via an optional authorization mechanism. It enables the server to process or deny individual calls based on a caller's criteria. Criteria can include the caller's unique permissions, the name of the API, and the target Namespace.

The authorization logic is customizable, making it available to a variety of use cases and identity schemes.

## Authorizer

`Authorizer` is the interface that enables access control to API calls. It is defined in the `authorization` package.

<!--SNIPSTART temporal-common-authorization-authorizer-interface-->
<!--SNIPEND-->

When authorization is enabled, the `Authorizer`'s `Authorize` method is invoked for each incoming API call that is received by the Frontend gRPC service. It then returns one of two possible decisions within the `Result.Decision` field:

- `DecisionDeny`: the requested API call is not invoked and an error is returned to the caller.
- `DecisionAllow`: the requested API call is invoked.

The logic to make the decision is customizable, and can be based on the arguments passed or other configurations available to the system.

The following arguments must be passed to the `Authorize` method.

- `context.Context`: General context of the call `ctx` of type.
- `Claims`: Claims about the roles assigned to the caller. Its intended use is [described below](#Claims).
- `CallTarget`: Target of the API call.

<!--SNIPSTART temporal-common-authorization-calltarget-->
<!--SNIPEND-->

To use the `Authorizer`, set it via the `temporal.WithAuthorizer` [server options mechanism](/docs/server-options).

```go
s := temporal.NewServer(
	...
	temporal.WithAuthorizer(myAuthorizer),
)

err = s.Start()
```

If an `Authorizer` is not set in the server options, Temporal uses the `nopAuthority` authorizer that unconditionally allows all API call to pass through. The codebase also includes a `defaultAuthorizer`.

## Claims

The `Claims` struct contains information about permission claims granted to the caller. Authorizer assumes that the caller has been properly authenticated and trusts the claims passed to it as input for making an authorization decision. That is because, this information is populated by the [`ClaimMapper` component](#claimmapper), typically by extracting information from the authentication token and/or mutual TLS certificate associated with the gRPC connection over which the call has arrived.

<!--SNIPSTART temporal-common-authorization-claims-->
<!--SNIPEND-->

`Role` is a bit mask that is a combination of one or more the role constants:

<!--SNIPSTART temporal-common-authorization-role-enum-->
<!--SNIPEND-->

For example, a role can be set as

```go
role := authorization.RoleReader | authorization.RoleWriter
```

## Mapping claims

One of the key components of Temporal's supports for authorization of API calls is a "claim mapper" that is responsible for translating (mapping) information extracted from the authorization token and/or mutual TLS certificate of the caller into [claims about callers roles within Temporal](#claims). This component is customizablea and can be set via the `temporal.WithClaimMapper` [server option](/docs/server-options).

<!--SNIPSTART temporal-common-authorization-claimmapper-interface-->
<!--SNIPEND-->

The `AuthInfo` struct that is passed to claim mapper's `GetClaims` method contains an authorization token extracted from the `"authorization"` header of the gRPC request and a pointer to the `pkix.Name` struct that contains a X.509 distinguishable name from the caller's mutual TLS certificate.

<!--SNIPSTART temporal-common-authorization-authinfo-->
<!--SNIPEND-->

```go
s := temporal.NewServer(
	...
  temporal.WithClaimMapper(func(cfg *config.Config) authorization.ClaimMapper {
		return authorization.NewNoopClaimMapper(cfg)
	}),
)

err = s.Start()
```

### Default JWT `ClaimMapper`

Temporal offers a default JSON web token claim mapper (`defaultClaimMapper`) that extracts claims from JWT access tokens and translates them into Temporal claims. The default JWT Claim Mapper expects claims in [JWT tokens](https://tools.ietf.org/html/rfc7519) to be in the certain format [described below](#Format-of-JWT-Claims).

You can use the default JWT Claim Mapper as an example to build your own for translating a caller's authorization information from other formats and conventions into Temporal claims.

The default JWT ClaimMapper expects [JWT tokens](https://tools.ietf.org/html/rfc7519) to contain custom claims of a particular configurable name.

Those custom claims are expected to be in a [particular format](#format-of-jwt-claims). The default JWT Claim Mapper needs a public key to perform validation of tokens' digital signatures.

To obtain public keys from issuers of JWT tokens and to refresh them over time, the default JWT ClaimMapper uses another pluggable component, the `TokenKeyProvider`. Token key providers implement the `TokenKeyProvider` interface:

<!--SNIPSTART temporal-common-authorization-tokenkeyprovider-->
<!--SNIPEND-->

Temporal provides an implementation of the `TokenKeyProvider, `rsaTokenKeyProvider`, that dynamically obtains public keys from given issuers' URIs that adhere to the [JWKS format](https://tools.ietf.org/html/rfc7517). Use `authorization.NewRSAKeyProvider(cfg)` to get an instance of it. Note that `rsaTokenKeyProvider` only implements `RSAKey` and `Close` methods, and returns en error from `EcdsaKey` and `HmacKey` methods.

### Format of JWT Claims

Default JWT Claim Mapper expects authorization tokens to be in the "bearer &lt;token&gt;", where &lt;token&gt; is the Base64url-encoded value of the token.

Default JWT Claim Mapper expects permission claims in JWT tokens to be named `"permissions"`, unless overriden in configuration.

Each individual claim is expected in the "&lt;namespace&gt;:&lt;permission&gt;" format, where &lt;namespace&gt; is a Temporal namespace or "system" for system-wide permissions and &lt;permission&gt; contains one of the four values: "read", "write", "worker", or "admin".

Default JWT Claim Mapper converts these permissions into Temporal roles for the caller as described [here](/docs/authorization/#Claims).

Multiple permissions for the same namespace get OR'ed.

For example, when "&lt;accounting&gt;:&lt;read&gt;" and "&lt;accounting&gt;:&lt;write&gt;" are found in a token, they are translated into `authorization.RoleReader | authorization.RoleWriter`.

## Configuring Default JWT Claim Mapper

Temporal server can be configured to use Default JWT Claim Mapper via the `temporal.WithClaimMapper` [server option](/docs/server-options).

```go
s := temporal.NewServer(
	temporal.ForServices(services),
	temporal.WithConfig(cfg),
    temporal.WithAuthorizer(myAuthorizer),
    temporal.WithClaimMapper(func(cfg *config.Config) authorization.ClaimMapper {
	    return authorization.NewDefaultJWTClaimMapper(
			authorization.NewRSAKeyProvider(cfg), cfg)
	}),
)

err = s.Start()
```

`authorization.NewDefaultJWTClaimMapper` function takes a token key provider (implementation of `authorization.TokenKeyProvider` interface) and a config object as arguments.
In this example we are passing `rsaTokenKeyProvider` instantiated by `authorization.NewRSAKeyProvider` function.

Default JWT Claim Mapper uses `config.Config.Global.Authorization.PermissionsClaimName` property as an override for the default name of the permission claims it is looking for in JWT tokens.
If `config.Config.Global.Authorization.PermissionsClaimName` isn't set it uses `"permissions"` as the name of the JWT claims.

`rsaTokenKeyProvider` is configured via `config.Config.Global.Authorization.JWTKeyProvider` which is the following struct.

```go
JWTKeyProvider struct {
	KeySourceURIs   []string      `yaml:"keySourceURIs"`
	RefreshInterval time.Duration `yaml:"refreshInterval"`
}
```

Here, `KeySourceURIs` are the HTTP endpoints that return public keys of token issuers in the [JWKS format](https://tools.ietf.org/html/rfc7517).
`RefreshInterval` defines how frequently keys should be refreshed.
For example, [Auth0](https://auth0.com/) exposes such endpoints as `https://YOUR_DOMAIN/.well-known/jwks.json`.
