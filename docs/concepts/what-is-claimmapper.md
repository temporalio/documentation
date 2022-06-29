---
id: what-is-claimmapper
title: What is ClaimMapper?
sidebar_label: What is ClaimMapper?
---

## Overview

`ClaimMapper` is a plugin that extracts claims from JSON Web Tokens (JWT). This process is achieved with the method `GetClaims`, which translates `AuthInfo` structs from the caller into `Claims` about the caller's roles within Temporal.

A `Role` (within Temporal) is a bit mask that combines one or more of the role constants.

`GetClaims` is customizable, and can be modified with the `temporal.WithClaimMapper` server option. Temporal also offers a default JWT `ClaimMapper` for your use.

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

<namespace>: <permission>

These permissions are then converted into Temporal roles for the caller.

Multiple permissions for the same namespace will be overriden by the `ClaimMapper`.
