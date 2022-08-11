---
id: how-to-set-mtls-configuration-in-java
title: How to set mTLS configuration in Java
sidebar_label: Set mTLS configuration
description: To set the mTLS configuration in Java, provide the certificate and private key in an instance of `WorkflowServiceStub`.
tags:
  - developer-guide
  - sdk
  - java
---

To set the mTLS configuration in Java, provide the certificate and private key in an instance of `WorkflowServiceStub`.

The following example shows how to set up certificates and pass the `SSLContext` for the Client.

<!--SNIPSTART java-mtls-configuration-->
<!--SNIPEND-->

For more information, see the [SSL sample](https://github.com/temporalio/samples-java/blob/main/src/main/java/io/temporal/samples/ssl/SslEnabledWorker.java).
