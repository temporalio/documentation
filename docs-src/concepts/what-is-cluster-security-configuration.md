---
id: what-is-cluster-security-configuration
title: What is Cluster security configuration?
sidebar_label: Temporal Cluster security configuration
description: Secure your Temporal Cluster (self-hosted and Temporal Cloud) by encrypting your network communication and setting authentication and authorization protocols for API calls.
tags:
  - explanation
---

Secure your Temporal Cluster (self-hosted and Temporal Cloud) by encrypting your network communication and setting authentication and authorization protocols for API calls.

For details on setting up your Temporal Cluster security, see [Temporal Platform security features](/security).

#### mTLS encryption

Temporal supports Mutual Transport Layer Security (mTLS) to encrypt network traffic between services within a Temporal Cluster, or between application processes and a Cluster.

On self-hosted Temporal Clusters, configure mTLS in the `tls` section of the [Cluster configuration](/references/configuration#tls).
mTLS configuration is a [static configuration](#static-configuration) property.

You can then use either the [`WithConfig`](/references/server-options#withconfig) or [`WithConfigLoader`](/references/server-options#withconfigloader) server option to start your Temporal Cluster with this configuration.

The mTLS configuration includes two sections that serve to separate communication within a Temporal Cluster and client calls made from your application to the Cluster.

- `internode`: configuration for encrypting communication between nodes within the Cluster.
- `frontend`: configuration for encrypting the public endpoints of the Frontend Service.

Setting mTLS for `internode` and `frontend` separately lets you use different certificates and settings to encrypt each section of traffic.

#### Using certificates for Client connections

Use CA certificates to authenticate client connections to your Temporal Cluster.

On Temporal Cloud, you can [set your CA certificates in your Temporal Cloud settings](/cloud/how-to-manage-certificates-in-temporal-cloud) and use the end-entity certificates in your client calls.

On self-hosted Temporal Clusters, you can restrict access to Temporal Cluster endpoints by using the `clientCAFiles` or `clientCAData` property and the [`requireClientAuth`](/references/configuration#tls) property in your Cluster configuration.
These properties can be specified in both the `internode` and `frontend` sections of the [mTLS configuration](/references/configuration#tls).
For details, see the [tls configuration reference](/references/configuration#tls).

#### Server name specification

On self-hosted Temporal Clusters, you can specify the `serverName` in the `client` section of your mTLS configuration to prevent spoofing and [MITM attacks](https://en.wikipedia.org/wiki/Man-in-the-middle_attack).

Entering a value for `serverName` enables established connections to authenticate the endpoint.
This ensures that the server certificate presented to any connected client has the specified server name in its CN property.

This measure can be used for `internode` and `frontend` endpoints.

For more information on mTLS configuration, see [tls configuration reference](/references/configuration#tls).

#### Authentication and authorization

<!-- commenting this very generic explanation out. Can include it back in if everyone feels strongly.
 **Authentication** is the process of verifying users who want to access your application are actually the users you want accessing it.
**Authorization** is the verification of applications and data that a user on your Cluster or application has access to. -->

Temporal provides authentication interfaces that can be set to restrict access to your data.
These protocols address three areas: servers, client connections, and users.

Temporal offers two plugin interfaces for API call authentication and authorization.

- [`ClaimMapper`](/concepts/what-is-a-claimmapper-plugin)
- [`Authorizer`](/concepts/what-is-an-authorizer-plugin)

The logic of both plugins can be customized to fit a variety of use cases.
When plugins are provided, the Frontend Service invokes their implementation before running the requested operation.
