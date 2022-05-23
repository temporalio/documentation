---
id: how-to-provide-an-authorization-token-in-java
title: How to provide an Authorization Token in Java (JWT)
description: Providing authorization header to Temporal Server in Java SDK including JWT tokens
sidebar_label: Authorization
tags:
  - developer-guide
  - java
  - auth
---

import RelatedReadList from '../components/RelatedReadList.js'

The Temporal Server [expects](/server/security/#authinfo) an `authorization` gRPC header with an authorization token to be passed with API calls if [requests authorization](/server/security/#authorization) is configured.

Authorization Tokens may be provided to the Temporal Java SDK by implementing a `io.temporal.authorization.AuthorizationTokenSupplier` interface.
The implementation should be used to create `io.temporal.authorization.AuthorizationGrpcMetadataProvider` that may be configured on ServiceStub gRPC interceptors list.

The implementation is called for each SDK gRPC request and may supply dynamic tokens.

**JWT**

One of the token types that may be passed this way are JWT tokens.
Temporal Server provides a [default implementation of JWT authentication](/server/security/#default-jwt-claimmapper).

**Example**

```java
  AuthorizationTokenSupplier tokenSupplier =
    //your implementation of token supplier
    () -> "Bearer <Base64 url-encoded value of the token for default JWT ClaimMapper>";
  WorkflowServiceStubsOptions serviceStubOptions =
    WorkflowServiceStubsOptions.newBuilder()
      //other service stub options
      .addGrpcMetadataProvider(new AuthorizationGrpcMetadataProvider(tokenSupplier))
      .build();
  WorkflowServiceStubs service = WorkflowServiceStubs.newServiceStubs(serviceStubOptions);
  WorkflowClient client = WorkflowClient.newInstance(service);
```

Related read:

- [How to secure a Temporal Cluster](/server/security]
