---
id: configuring-authorization
title: Configuring Authorization
sidebar_label: Configuring Authorization
---

Authorization is the verification of applications and data that a user on your Cluster or application has access to.

Temporal offers two plugin interfaces for implementing API call authorization.

- [`ClaimMapper`](/docs/security/how-to-use-claimmapper)

- [`Authorizer`](/docs/security/how-to-use-authorizer)

The logic of both plugins can be customized to fit a variety of use cases. When provided, the front-end will invoke the implementation of the plugins before running the requested operation.

## Authorizer Plugin Interface

`Authorizer` has a single `Authorize` method that is invoked for each incoming API call received by the Frontend gRPC service. `Authorize` receives information about the calls, along with the role and permission claims of the caller.
