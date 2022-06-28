---
id: what-is-claimmapper
title: What is ClaimMapper?
sidebar_label: What is ClaimMapper?
---

`ClaimMapper` is a plugin that extracts claims from JSON Web Tokens (JWT). This process is achieved with the method `GetClaims`, which translates `AuthInfo` structs from the caller into `Claims` about the caller's roles within Temporal.

A `Role` (within Temporal) is a bit mask that combines one or more of the role constants.

`GetClaims` is customizable, and can be modified with the `temporal.WithClaimMapper` server option. Temporal also offers a default JWT `ClaimMapper` for your use.

## Default JWT ClaimMapper

Temporal offers a default JWT `ClaimMapper` that extracts the information needed to form Temporal `Claims`. This plugin requires a public key to validate digital signatures, and expects JWT tokens to be in a certain format.

### Token Key Provider

### config.Authorization
