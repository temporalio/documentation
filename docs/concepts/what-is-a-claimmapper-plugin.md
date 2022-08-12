---
id: what-is-a-claimmapper-plugin
title: What is a ClaimMapper Plugin?
sidebar_label: What is a ClaimMapper Plugin?
---

`ClaimMapper` is a plugin that extracts claims from JSON Web Tokens (JWT).
This process is achieved with the method `GetClaims`, which translates `AuthInfo` structs from the caller into `Claims` about the caller's roles within Temporal.

A `Role` (within Temporal) is a bit mask that combines one or more of the role constants.
In the following example, the role is assigned constants that allow the caller to read and write information.

```go
role := authorization.RoleReader | authorization.RoleWriter
```

`GetClaims` is customizable and can be modified with the `temporal.WithClaimMapper` server option.
Temporal also offers a default JWT `ClaimMapper` for your use.

A typical approach is for `ClaimMapper` to interpret custom `Claims` from a caller's JWT, such as membership in groups, and map them to Temporal roles for the user.
The subject information from the caller's mTLS certificate can also be a parameter in determining roles.

#### `AuthInfo`

`AuthInfo` is a struct that is passed to `GetClaims`. `AuthInfo` contains an authorization token extracted from the `authorization` header of the gRPC request.

`AuthInfo` includes a pointer to the `pkix.Name` struct.
This struct contains an [x.509](https://www.ibm.com/docs/en/ibm-mq/7.5?topic=certificates-distinguished-names) Distinguished Name from the caller's mTLS certificate.

#### `Claims`

`Claims` is a struct that contains information about permission claims granted to the caller.

`Authorizer` assumes that the caller has been properly authenticated, and trusts the `Claims` when making an authorization decision.

#### Default JWT ClaimMapper

Temporal offers a default JWT `ClaimMapper` that extracts the information needed to form Temporal `Claims`.
This plugin requires a public key to validate digital signatures.

To get an instance of the default JWT `ClaimMapper`, call `NewDefaultJWTClaimMapper` and provide it with:

- a `TokenKeyProvider` instance
- a `config.Authorization` pointer
- a logger

The code for the default `ClaimMapper` can also be used to build a custom `ClaimMapper`.

#### Token Key Provider

A `TokenKeyProvider` obtains public keys from given issuers' URIs that adhere to a specific format.
The default JWT Claim Mapper uses this component to obtain and refresh public keys over time.

Temporal provides an `rsaTokenKeyProvider`.
This component dynamically obtains public keys that follow the [JWKS format](https://tools.ietf.org/html/rfc7517).
`rsaTokenKeyProvider` will only use the `RSAKey` and `Close` methods.

```go
provider := authorization.NewRSAKeyProvider(cfg)
```

:::note

`KeySourceURIs` are the HTTP endpoints that return public keys of token issuers in the [JWKS format](https://tools.ietf.org/html/rfc7517).
`RefreshInterval` defines how frequently keys should be refreshed.
For example, [Auth0](https://auth0.com/) exposes such endpoints as `https://YOUR_DOMAIN/.well-known/jwks.json`.

:::

By default, "permissions" is used to name the `permissionsClaimName` value.

Configure the plugin with `config.Config.Global.Authorization.JWTKeyProvider`.

#### JWT Web Token Format

The default JWT `ClaimMapper` expects authorization tokens to be formatted as follows:

```
Bearer <token>
```

The Permissions Claim in the JWT Token is expected to be a collection of Individual Permission Claims.
Each Individual Permission Claim must be formatted as follows:

```
<namespace> : <permission>
```

These permissions are then converted into Temporal roles for the caller.
This can be one of Temporal's four values:

- read
- write
- worker
- admin

Multiple permissions for the same namespace will be overriden by the `ClaimMapper`.

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
