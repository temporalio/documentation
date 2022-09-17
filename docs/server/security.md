---
id: security
title: Temporal Server security
sidebar_label: Security
---

:::info Work in progres

This guide is a work in progress. Some sections may be incomplete. Information may change at any time.

:::

## Overview

A secured Temporal server has its network communication encrypted and has authentication and authorization protocols set up for API calls made to it.
Without these, your server could be accessed by unwanted entities.

What is documented on this page are the built-in opt-in security measures that come with Temporal.
However users may also choose to design their own security architecture with reverse proxies or run unsecured instances inside of a VPC environment.

## Server Samples

The https://github.com/temporalio/samples-server repo offers two examples, which are further explained below:

- **TLS**: how to configure Transport Layer Security (TLS) to secure network communication with and within a Temporal cluster.
- **Authorizer**: how to inject a low-level authorizer component that can control access to all API calls.

## Encryption in transit with mTLS

Temporal supports Mutual Transport Layer Security (mTLS) as a way of encrypting network traffic between the services of a cluster and also between application processes and a Cluster.
Self-signed or properly minted certificates can be used for mTLS.
mTLS is set in Temporal's [TLS configuration](/references/configuration/#tls).
The configuration includes two sections such that intra-Cluster and external traffic can be encrypted with different sets of certificates and settings:

- `internode`: Configuration for encrypting communication between nodes in the cluster.
- `frontend`: Configuration for encrypting the Frontend's public endpoints.

A customized configuration can be passed using either the [WithConfig](/references/server-options#withconfig) or [WithConfigLoader](/references/server-options#withconfigloader) Server options.

See [TLS configuration reference](/references/configuration/#tls) for more details.

## Encryption at rest with Data Converter

import DataConverter from '../concepts/what-is-a-data-converter.md'

<DataConverter />

### Codec Server

import CodecServer from '/docs/concepts/what-is-a-codec-server.md'

<CodecServer />

### Codec Server setup

import CodecServerSetup from '/docs/clusters/how-to-set-up-codec-server.md'

<CodecServerSetup />

## Authentication

There are a few authentication protocols available to prevent unwanted access such as authentication of servers, clients, and users.

### Servers

To prevent spoofing and [MITM attacks](https://en.wikipedia.org/wiki/Man-in-the-middle_attack) you can specify the `serverName` in the `client` section of your respective mTLS configuration.
This enables established connections to authenticate the endpoint, ensuring that the server certificate presented to any connecting Client has the appropriate server name in its CN property.
It can be used for both `internode` and `frontend` endpoints.

More guidance on mTLS setup can be found in [the `samples-server` repo](https://github.com/temporalio/samples-server/tree/main/tls) and you can reach out to us for further guidance.

### Client connections

To restrict a client's network access to cluster endpoints you can limit it to clients with certificates issued by a specific Certificate Authority (CA).
Use the `clientCAFiles`/ `clientCAData` and `requireClientAuth` properties in both the `internode` and `frontend` sections of the [mTLS configuration](/references/configuration/#tls).

### Users

To restrict access to specific users, authentication and authorization is performed through extensibility points and plugins as described in the [Authorization](#authorization) section below.

## Authorization

:::note
Information regarding [`Authorizer`](/clusters#authorizer) and [`ClaimMapper`](/clusters#claim-mapper) has been moved to another location.
:::

Temporal offers two plugin interfaces for implementing API call authorization:

- [`ClaimMapper`](/clusters#claim-mapper)
- [`Authorizer`](/clusters#authorizer)

The authorization and claim mapping logic is customizable, making it available to a variety of use cases and identity schemes.
When these are provided the frontend invokes the implementation of these interfaces before executing the requested operation.

See https://github.com/temporalio/samples-server/blob/main/extensibility/authorizer for a sample implementation.

![](/img/docs/frontend-authorization-order-of-operations.png)

## Single sign-on integration

Temporal can be integrated with a single sign-on (SSO) experience by utilizing the `ClaimMapper` and `Authorizer` plugins.
The default JWT `ClaimMapper` implementation can be used as is or as a base for a custom implementation of a similar plugin.

### Temporal Web

To enable SSO for the Temporal Web UI edit the web service's configuration per the [Temporal Web README](https://github.com/temporalio/web#configuring-authentication-optional).
