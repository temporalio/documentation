---
id: how-to-provide-an-authorization-token-in-java
title: How to provide an Authorization Token in Java
description: Providing authorization header to Temporal Server in Java SDK including JWT tokens
sidebar_label: Authorization
tags:
  - developer-guide
  - java
  - auth
---

import RelatedReadList from '../components/RelatedReadList.js'

Authorization Tokens are provided in the `WorkflowServiceStubsOptions` that are passed to the instance of the `WorkflowServiceStubs`.

Create an instance of `AuthorizationTokenSupplier` (available from the `io.temporal.serviceclient.WorkflowServiceStubsOptions` package) which is a header string that specifies a Base64 url-encoded value of your token.

The instance of `AuthorizationTokenSupplier` is then passed to an instance `AuthorizationGrpcMetadataProvider` which is then added to an instance of `WorkflowServiceStubsOptions` via the `addGrpcMetadataProvider` method.

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
  WorkflowServiceStubs service = WorkflowServiceStubs.newInstance(serviceStubOptions);
  WorkflowClient client = WorkflowClient.newInstance(service);
```

Related read:

- [How to secure a Temporal Cluster](/docs/server/security]
