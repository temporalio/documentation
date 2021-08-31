---
id: how-to-pass-authorization-header-in-java
title: How to pass authorization header in Java
description: Providing authorization header to Temporal Server in Java SDK including JWT tokens
sidebar_label: Authorization
tags:
  - developer-guide
  - java
---

**Overview**

Temporal Server provides a [customizable authorization system](/docs/server/security/#authorization).

A part of this system is an [`AuthInfo`](/docs/server/security/#authinfo) object that is created for each incoming request and containing an authorization information from the request.
The main piece of information that is extracted from the request and passed around for authorization purposes in a content of `authorization` gRPC header that typically contains an authorization token. 

**SDK configuration**

To provide a dynamic authorization token to Temporal Java SDK you should implement `AuthorizationTokenSupplier` and create an instance `AuthorizationGrpcMetadataProvider` based on it.
This `AuthorizationGrpcMetadataProvider` then should be provided it as a part of `WorkflowServiceStubsOptions` during creation of `WorkflowServiceStubs` that is used by `WorkflowClient`.
This SDK configuration can and, in most cases, should be performed on both Temporal client and Temporal worker side.

**AuthorizationTokenSupplier**

A provider of dynamic authorization tokens.

**AuthorizationGrpcMetadataProvider**

A provider of an `authorization` gRPC header that uses `AuthorizationTokenSupplier` as a supplier of the tokens.

**Configuration Example**

```java
  AuthorizationTokenSupplier tokenSupplier =
    //your implementation of token supplier
    () -> "Bearer <Base64 url-encoded value of the token for default JWT ClaimMapper>";
  WorkflowServiceStubsOptions serviceStubOptions =
    WorkflowServiceStubsOptions.newBuilder()
      //other service stub configuration
      .addGrpcMetadataProvider(new AuthorizationGrpcMetadataProvider(tokenSupplier))
      .build();
  WorkflowServiceStubs service = WorkflowServiceStubs.newInstance(serviceStubOptions);
  WorkflowClient client = WorkflowClient.newInstance(service);
```

**JWT**

Temporal Server provides a [default implementation of JWT authentication](/docs/server/security/#default-jwt-claimmapper) out of the box that works with [JWT tokens containing Permissions Claim](/docs/server/security/#format-of-json-web-tokens).
