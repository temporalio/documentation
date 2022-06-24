---
id: what-is-claimmapper
title: What is ClaimMapper?
sidebar_label: What is ClaimMapper?
---

ClaimMapper has a single method (GetClaims) for decoding information from the authorization token and/or mTLS certificate of the caller. This information is divided into Claims, which symbolize the caller’s roles within the Temporal architecture.

GetClaims is fully customizable, and can be set via the temporal.WithClaimMapper server option. This enables a wide array of options for interpreting the identity of the caller.

### AuthInfo

AuthInfo is a struct that is passed to ClaimMapper’s GetClaims method.

AuthInfo contains an authorization token extracted from the ‘authorization’ header of the gRPC request. It also includes a pointer to ‘pkix.Name’, which contains a X.509 distinguishable name from the client’s mTLS certificate.

### Claims

Claims is a struct containing information about permission claims granted to the caller.

During authorization, the Authorizer assumes that the caller has been properly authenticated. Any Claims passed to it for authorization will be trusted.

### Role

Role is a bit mask combining one or more of the role constants.

## Default JWT ClaimMapper

The Temporal default JSON Web Token (JWT) ClaimMapper extracts claims from JWT access tokens. These Claims are then translated into Temporal ‘Claims’

The default JWT ClaimMapper needs a public key to validate the signatures of digital tokens. The default JWT ClaimMapper also expects JWT tokens to be in a certain format (described below or elsewhere)

To get an instance of the default JWT ClaimMapper, call NewDefaultJWTClaimMapper and provide it with an instance of TokenKeyProvider. This pointes to a config and logger.

### Token Key Provider

### config.Authorization
