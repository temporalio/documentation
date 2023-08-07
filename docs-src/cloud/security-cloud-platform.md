---
id: security-cloud-platform
title: What the security model for the Temporal Cloud platform?
sidebar_label: Temporal Cloud platform
description: The Temporal Cloud platform provides a range of security measures.
tags:
  - temporal cloud
  - security
---

### Namespace isolation

The base unit of isolation in a Temporal environment is a [Namespace](/concepts/what-is-a-namespace).
Each Temporal Cloud account can have multiple Namespaces.
A Namespace (regardless of account) cannot interact with other Namespaces.
Each Namespace is available through a secure gRPC (mTLS) endpoint and an HTTPS (TLS) endpoint.
You can make these endpoints more secure by routing all communication through AWS PrivateLink.

Temporal Cloud is a multi-tenant service.
Namespaces in the same environment are logically segregated.
Namespaces do not share data processing or data storage across regional boundaries.

### Encryption

Communication into and out of Namespaces is over TLS.
All communication within our production environments is over TLS 1.3.
Data is stored in two separate locations: an Elasticsearch instance (used when filtering Workflows in SDK clients, the [CLI](/cloud/tcld), or the Web UI) and the core Temporal Cloud persistence layer.
Both are encrypted at rest with AES-256-GCM.

For more information, see [Requirements for CA certificates in Temporal Cloud](/cloud/certificates-requirements).

### Identity

Authentication to gRPC endpoints is provided by mTLS per Namespace.

For more information, see [How to manage SAML authentication with Temporal Cloud](/cloud/how-to-manage-saml-with-temporal-cloud).

### Access

Authorization is managed at the account and Namespace level.
Users and systems are assigned one or more preconfigured roles.
Users hold [account-level Roles](/cloud/users-account-level-roles) of administrators, developers, and read-only users.
Systems and applications processes hold their own distinct roles.

### Monitoring

In addition to extensive system monitoring for operational and availability requirements, we collect and monitor audit logs from the AWS environment and all calls to the gRPC API (which is used by the SDKs, CLI, and Web UI).
These audit logs can be made available for ingestion into your security monitoring system.

### Testing

We contract with a third party to perform a full-scope pentest (with the exception of social engineering) annually.
Additionally, we perform targeted third-party and internal testing on an as-needed basis, such as when a significant feature is being released.

### Internal Temporal access

We restrict access to production systems to the small team of employees who maintain our production infrastructure.
We log all access to production systems; shared accounts are not allowed.
Access to all production systems is through SSO, with MFA enabled.

Access to AWS is granted only for limited periods of time, with a maximum of 8 hours.
(For more information, see the blog post [Rolling out access hours at Temporal](https://temporal.io/blog/rolling-out-access-hours-at-temporal).)

All Temporal engineering systems are secured by GitHub credentials, which require both membership in the Temporal GitHub organization and MFA.
Access grants are reviewed quarterly.

### Compliance

Temporal Technologies is SOC 2 Type 2 certified and compliant with GDPR.
Compliance audits are available by request through our [Contact](https://pages.temporal.io/contact-us) page.
