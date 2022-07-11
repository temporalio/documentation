---
id: how-to-use-claimmapper
title: How to Use ClaimMapper
sidebar_label: How to Use ClaimMapper
---

`ClaimMapper` is a plugin that extracts claims from JSON Web Tokens (JWT). This process is achieved with the method `GetClaims`, which translates `AuthInfo` structs from the caller into `Claims` about the caller's roles within Temporal.

A `Role` (within Temporal) is a bit mask that combines one or more of the role constants.

```go
role := authorization.RoleReader | authorization.RoleWriter
```

`GetClaims` is customizable, and can be modified with the `temporal.WithClaimMapper` server option. Temporal also offers a default JWT `ClaimMapper` for your use.

A typical approach is for `ClaimMapper` to interpret custom `Claims` from a caller's JWT access token, such as membership in groups, and map them to Temporal roles for the user. The subject information from the caller's TLS certificate can also be a parameter in determining roles.

### `AuthInfo`

`AuthInfo` is a struct that is passed to `GetClaims`. `AuthInfo` contains an authorization token extracted from the `authorization` header of the gRPC request.

`AuthInfo` includes a pointer to the `pkix.Name` struct. This struct contains an x.509 distinguishable name from the caller's mTLS certificate.

### `Claims`

`Claims` is a struct that contains information about permission claims granted to the caller.

`Authorizer` assumes that the caller has been properly authenticated, and trusts the `Claims` when making an authorization decision.

## Default JWT ClaimMapper

Temporal offers a default JWT `ClaimMapper` that extracts the information needed to form Temporal `Claims`. This plugin requires a public key to validate digital signatures, and expects JWT tokens to be in a certain format.

To get an instance of the default JWT `ClaimMapper`, call `NewDefaultJWTClaimMapper` and provide it with:

- a `TokenKeyProvider` instance
- a `config.Authorization` pointer
- a logger

The code for the default `ClaimMapper` can also be used to build a custom `ClaimMapper`.

### Token Key Provider

A `TokenKeyProvider` obtains public keys from given issuers' URIs that adhere to a specific format.

Temporal provides an `rsaTokenKeyProvider`. This component dynamically obtains public keys that follow the JWKS format. `rsaTokenKeyProvider` will only use the `RSAKey` and `Close` methods.

By default, "permissions" is used to name the `permissionsClaimName` value.

Configure the plugin with `config.Config.Global.Authorization.JWTKeyProvider`.

### JWT Web Token Format

The default JWT `ClaimMapper` expects authorization tokens to be formatted as follows:

Bearer <token>

The Permissions Claim in the JWT Token is expected to be a collection of Individual Permission Claims. Each Individual Permission Claim must be formatted as follows:

`<namespace>` : `<permission>`

These permissions are then converted into Temporal roles for the caller.

Multiple permissions for the same namespace will be overriden by the `ClaimMapper`.

// example
