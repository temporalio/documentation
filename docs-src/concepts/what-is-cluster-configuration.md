---
id: what-is-cluster-configuration
title: What is Cluster configuration?
sidebar_label: Cluster configuration
description: Cluster Configuration is the setup and configuration details of your Temporal Cluster, defined using YAML.
tags:
  - term
  - explanation
---

Cluster configuration is the setup and configuration details of your self-hosted Temporal Cluster, defined using YAML.
You must define your Cluster configuration when setting up your Temporal Cluster.

Cluster configuration is composed of two types of configurations: Static configuration and Dynamic configuration.

### Static configuration

Static configuration contains details of how the Cluster should be set up. The static configuration is read just once and used to configure service nodes container/pod at startup.
Depending on how you want to deploy your self-hosted Temporal Cluster, your static configuration must contain details for setting up:

- Temporal Services - Frontend, History, Matching, Worker
- Membership ports for the Temporal Services
- Persistence (including Shard count), Visibility and Advanced Visibility, Archival store setups.
- TLS, Auth
- Server log level
- Metrics
- Cluster Metadata
- Dynamic Config Client

Static configuration values cannot be changed at runtime.
Some values, such as Metrics configuration or Server log level can be changed in the static configuration but require restarting the Cluster for the changes to take effect.

### Dynamic configuration

Dynamic configuration is the ability to change the behavior of Temporal Server without having to redeploy the server images.

Some configuration fields are truly dynamic; that is, changes to those values take effect immediately.
Other configuration fields require a server restart because they are checked only at server startup (such as thread pool size).

For details on dynamic configuration keys, see [Dynamic configuration reference](/references/dynamic-configuration).

### Temporal Cluster security configuration

Secure your Temporal Cluster (self-hosted and Temporal Cloud) by encrypting your network communication and setting authentication and authorization protocols for API calls.

For details on setting up your Temporal Cluster security, see [Temporal Platform security features](/security).

#### mTLS encryption

Temporal supports Mutual Transport Layer Security (mTLS) to encrypt network traffic between services within a Temporal Cluster, or between application processes and a Cluster.

On self-hosted Temporal Clusters, configure mTLS in the `tls` section of the [Cluster configuration](/references/configuration#tls).
mTLS configuration is a [static configuration](#static-configuration) property.

You can then use either [`WithConfig`](/references/server-options#withconfig) or [`WithConfigLoader`](/references/server-options#withconfigloader) server options to start your Temporal Cluster with this configuration.

The mTLS configuration includes two sections that serve to separate communication within a Temporal Cluster and client calls made from your application the Cluster.

- `internode`: configuration for encrypting communication between nodes within the Cluster.
- `frontend`: configuration for encrypting the Frontend's public endpoints

Setting mTLS for `internode` and `frontend` separately allows you to use different certificates and settings to encrypt each section of traffic.

#### Using certificates for Client connections

Use CA certificates to authenticate client connections to your Temporal Cluster.

On Temporal Cloud, you can [set your CA certificates in your Temporal Cloud settings](/cloud-context/get-started-certificates) and use the end-entity certificates in your client calls.

On self-hosted Temporal Clusters, you can restrict access to Temporal Cluster endpoints by using the `clientCAFiles` or `clientCAData` property and the [`requireClientAuth`](/references/configuration#tls) property in your Cluster configuration.
These properties can be specified in both the `internode` and `frontend` sections of the [mTLS configuration](/references/configuration#tls).
For details, see the [tls confiuration reference](/references/configuration#tls).

##### Server name specification

On self-hosted Temporal Clusters, you can specify the `serverName` in the `client` section of your mTLS configuration to prevent spoofing and [MITM attacks](https://en.wikipedia.org/wiki/Man-in-the-middle_attack).

Entering a value for `serverName` enables established connections to authenticate the endpoint.
This ensures that the server certificate presented to any connected client has the specified server name in its CN property.

This measure can be used for `internode` and `frontend` endpoints.

For more information on mTLS configuration, see [tls configuration reference](/references/configuration#tls).

#### Auth

<!-- commenting this very generic explanation out. Can include it back in if everyone feels strongly.
 **Authentication** is the process of verifying users who want to access your application are actually the users you want accessing it.
**Authorization** is the verification of applications and data that a user on your Cluster or application has access to. -->

Temporal provides authentication protocols that can be set to restrict access to your data.
These protocols address three areas: servers, client connections, and users.

Temporal offers two plugin interfaces for API call authentication and authorization.

- [`ClaimMapper`](/concepts/what-is-a-claimmapper-plugin)
- [`Authorizer`](/concepts/what-is-an-authorizer-plugin)

The logic of both plugins can be customized to fit a variety of use cases.
When provided, the Frontend Service invokes the implementation of the plugins before running the requested operation.
