---
id: how-to-set-tls-configuration-in-java
title: How to set TLS configuration in Java
sidebar_label: Set TLS configuration
description: Set TLS configuration
tags:
  - developer-guide
  - sdk
  - java
---

To set the TLS configuration in Java, provide the certificate and private key. 

The following example shows how to set up certificates and pass the `SSLContext` for the Client.

```java
import io.temporal.serviceclient.SimpleSslContextBuilder;
...
// Load your client certificate, which should look like:
    // -----BEGIN CERTIFICATE-----
    // ...
    // -----END CERTIFICATE-----
    InputStream clientCert = new FileInputStream(System.getenv("TEMPORAL_CLIENT_CERT"));
    // PKCS8 client key, which should look like:
    // -----BEGIN PRIVATE KEY-----
    // ...
    // -----END PRIVATE KEY-----
    InputStream clientKey = new FileInputStream(System.getenv("TEMPORAL_CLIENT_KEY"));
    // For Temporal Cloud this would likely be ${namespace}.tmprl.cloud:7233
    String targetEndpoint = System.getenv("TEMPORAL_ENDPOINT");
    // Your registered Namespace.
    String namespace = System.getenv("TEMPORAL_NAMESPACE");
    // Create SSL enabled client by passing SslContext, created by SimpleSslContextBuilder.
    WorkflowServiceStubs service =
        WorkflowServiceStubs.newInstance(
            WorkflowServiceStubsOptions.newBuilder()
                .setSslContext(SimpleSslContextBuilder.forPKCS8(clientCert, clientKey).build())
                .setTarget(targetEndpoint)
                .build());

```

For more information, see [Sample](https://github.com/temporalio/samples-java/blob/main/src/main/java/io/temporal/samples/ssl/SslEnabledWorker.java).