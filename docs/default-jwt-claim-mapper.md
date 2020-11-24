---
id: default-jwt-claim-mapper
title: Default JWT Claim Mapper
sidebar_label: Security
---

One of the key components of Temporal's supports for [authorization of API calls](/docs/authorization) is [Claim Mapper](/docs/authorization/#Claim-Mapper) that is responsible for translating (mapping) information extracted from the authorization token and/or mutual TLS certificate of the caller into [claims about callers roles within Temporal](authorization.md#Claims).
Claim Mapper is a pluggable component.
Temporal includes a Default JWT Claim Mapper (`defaultClaimMapper`) that extracts claims from JWT access tokens and translates them into Temporal claims.
Default JWT Claim Mapper expects claims in [JWT tokens](https://tools.ietf.org/html/rfc7519) to be in the certain format [described below](#Format-of-JWT-Claims).
The secondary purpose of Default JWT Claim Mapper is to serve as an example that would help others build their own claim mappers for translating caller's authorization information from other formats and conventions into Temporal claims.

Default JWT Claim Mapper expects [JWT tokens](https://tools.ietf.org/html/rfc7519) to contain custom claims of a particular (configurable) name.
Those custom claims are expected to be in a [particular format](#Format-of-JWT-Claims).
Default JWT Claim Mapper needs a public key to perform validation of tokens' digital signatures.
To obtain public keys from issuers of JWT tokens and to refresh them over time, Default JWT Claim Mapper uses another pluggable component - Token Key Provider.
Token Key Providers implement `TokenKeyProvider` interface.

```go
type TokenKeyProvider interface {
	EcdsaKey(alg string, kid string) (*ecdsa.PublicKey, error)
	HmacKey(alg string, kid string) ([]byte, error)
	RsaKey(alg string, kid string) (*rsa.PublicKey, error)
	Close()
}
```

Temporal includes an implementation of Token Key Provider, `rsaTokenKeyProvider`, that dynamically obtains public keys from given issuers' URIs that adhere to the [JWKS format](https://tools.ietf.org/html/rfc7517).
Note that `rsaTokenKeyProvider` only implements `RSAKey` and `Close` methods, and returns en error from `EcdsaKey` and `HmacKey` methods.

## Format of JWT Claims

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
