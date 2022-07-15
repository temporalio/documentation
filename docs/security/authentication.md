---
id: configuring-authentication
title: Configuring Authentication
sidebar_label: Configuring Authentication
---

Authentication is the process of verifying users that wish to access your application are actually the users you want accessing it.

Temporal has several authentication protocols that can be set to restrict access to your data. These protocols address three different areas: servers, client connections, and users.

# Authentication Target Areas

## Servers

Servers can fall victim to spoofing and [MITM attacks](). Prevent this by specifying `serverName` in the `client` section of your mTLS configuration.

Server configuration can be accomplished on `internode` and `frontend` endpoints.

## Client Connections

Client connections can be restricted to certain endpoints by requiring certificates from a specific Certificate Authority (CA).

Specify the certificates allowed by modifying the `clientCaFiles`/ `clientCaData` and `requireClientAuth` properties. These properties are found in the `internode` and `frontend` sections of the mTLS configuration.

## Users

User access can be restricted through extensibility points and plugins. When implemented, the `frontend` invokes the plugin before executing the requested operation.

Temporal offers two plugin interfaces for user authentication via API call:

- ['ClaimMapper'](/docs/security/what-is-claimmapper)
- ['Authorizer'](/docs/security/what-is-authorizer)

These plugins are adapatable to a variety of use cases and identity schemes.
