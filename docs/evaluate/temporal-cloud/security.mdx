---
id: security
title: Security model - Temporal Cloud
sidebar_label: Security model
description: Temporal Cloud provides robust security for applications, data, and its platform with features like mTLS, client-side encryption, PrivateLink, and SOC 2 Type 2 compliance.
slug: /cloud/security
toc_max_heading_level: 4
keywords:
  - introduction
  - security
  - temporal cloud
tags:
  - Multitenancy
  - Security
  - Temporal Cloud
---

**What kind of security does Temporal Cloud provide?**

The security model of [Temporal Cloud](/cloud) encompasses applications, data, and the Temporal Cloud platform itself.

:::info General platform security

For information about the general security features of Temporal, see our [Platform security page](/security).

:::

## Application and data {#applications-and-data}

**What is the security model for applications and data in Temporal Cloud?**

### Code execution boundaries

Temporal Cloud provides the capabilities of Temporal Server as a managed service; it does not manage your applications or [Workers](/workers#worker).
Applications and services written using [Temporal SDKs](/encyclopedia/temporal-sdks) run in your computing environment, such as containers (Docker, Kubernetes) or virtual machines (in any hosting environment).
You have full control over how you secure your applications and services.

### Data Converter: Client-side encryption

The optional [Data Conversion](/dataconversion) capability of the Temporal Platform lets you transparently encrypt data before it's sent to Temporal Cloud and decrypt it when it comes out.

Data Conversion runs on your Temporal Workers and [Clients](/encyclopedia/temporal-sdks#temporal-client); Temporal Cloud cannot see or decrypt your data.
If you use this feature, data stored in Temporal Cloud remains encrypted even if the service itself is compromised.

By deploying a [Codec Server](/production-deployment/data-encryption) you can securely decrypt data in the [Temporal Web UI](/web-ui) without sharing encryption keys with Temporal.

## The platform {#the-platform}

**What is the security model for the Temporal Cloud platform?**

### Namespace isolation

The base unit of isolation in a Temporal environment is a [Namespace](/namespaces).
Each Temporal Cloud account can have multiple Namespaces, and each Namespace is isolated to ensure your workloads remain secure and performant.

#### Authentication

Each Namespace is secured with your choice of authentication method:
- **mTLS certificates** - Namespace-specific X.509 certificates for mutual TLS authentication
- **API keys** - Namespace-scoped API keys for authentication

See [API Keys](/cloud/api-keys) and [mTLS Certificates](/cloud/certificates) for more details on configuring authentication for your Namespace.

#### Rate limiting

Temporal Cloud protects each Namespace with separate rate limits to prevent noisy neighbor problems:
- **Actions Per Second (APS)** - Limits the rate of [actions](/best-practices/managing-aps-limits) performed in your Workflows
- **Operations Per Second (OPS)** - Limits the rate of all [operations](/references/operation-list) that create load on Temporal Server

These per-Namespace rate limits ensure that one Namespace experiencing a traffic spike cannot impact the performance or reliability of other Namespaces, whether those Namespaces belong to a single Temporal Cloud account or separate ones.

See [Rate limiting](/cloud/limits) for more information about Temporal Cloud limits, and [Monitoring trends against limits](/cloud/service-health#rps-aps-rate-limits) for monitoring best practices.

#### Inter-Namespace communication

Namespaces are isolated by default. The only way for Workflows in one Namespace to interact with Workflows in another Namespace is through [Temporal Nexus](/nexus), which provides controlled, secure cross-Namespace communication via Nexus Endpoints.

See [Nexus Security](/nexus/security) for details on how Nexus enables secure inter-Namespace communication.

#### Logical segregation

Temporal Cloud is a multi-tenant service.
Namespaces in the same environment are logically segregated.
Namespaces do not share data processing or data storage across regional boundaries.

### Private Connectivity

Temporal Cloud supports private connectivity to enable you to connect to Temporal Cloud from a secured network.

See the [Connectivity](/cloud/connectivity) page for more information and details about using AWS PrivateLink and GCP Private Service Connect with Temporal Cloud.

### Temporal Nexus

Like Namespaces, a Nexus Endpoint is an account-scoped resource that is global within a Temporal Cloud account.
Any Developer role (or higher) in an account, who is also a Namespace Admin on the endpoint’s target Namespace, can manage (create/update/delete) a Nexus Endpoint.
All users with a Read-only role (or higher) in an account, can view and browse the full list of Endpoints.

Runtime access from a Workflow in a caller Namespace to a Nexus Endpoint is controlled by an allowlist policy (of caller Namespaces) for each Endpoint in the Nexus API registry.
Workers authenticate with Temporal Cloud as they do today with mTLS certificates or API keys as allowed by the Namespace configuration.
Nexus requests are sent from the caller’s Namespace to the handler’s Namespace over a secure multi-region mTLS Envoy mesh.

For payload encryption, the DataConverter works the same for a Nexus Operation as it does for other payloads sent between a Worker and Temporal Cloud.

See [Nexus Security](/nexus/security) for more information.

### Encryption

:::tip TLS vs mTLS

**TLS** (Transport Layer Security) encrypts data in transit. **mTLS** (mutual TLS) is an authentication method where both client and server present certificates to verify identity. All Temporal Cloud connections use TLS encryption. When you choose "mTLS authentication," you're choosing how to prove your identity, not whether your connection is encrypted.

:::

**In transit**: All connections to Temporal Cloud use TLS 1.3 encryption, regardless of your authentication method ([API keys](/cloud/api-keys) or [mTLS certificates](/cloud/certificates)).

**At rest**: Data is stored in two locations: an Elasticsearch instance (used when filtering Workflows in SDK clients, the [CLI](/cloud/tcld), or the Web UI) and the core Temporal Cloud persistence layer.
Both are encrypted at rest with AES-256-GCM.

### Identity

Authentication to Temporal Cloud gRPC endpoints supports two methods:

- **[API keys](/cloud/api-keys)**: Identity-based authentication using bearer tokens. Recommended for most use cases.
- **[mTLS certificates](/cloud/certificates)**: Mutual TLS authentication using client certificates issued by your CA.

Both methods provide secure, encrypted connections to Temporal Cloud. Choose based on your organization's security requirements and key management preferences.

For user authentication to the Temporal Cloud UI, see [How to manage SAML authentication with Temporal Cloud](/cloud/saml).

### Access

Authorization is managed at the account and Namespace level.
Users and systems are assigned one or more preconfigured roles.
Users hold [account-level Roles](/cloud/users#account-level-roles) of administrators, developers, and read-only users.
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

Access to our cloud environments is granted only for limited periods of time, with a maximum of 8 hours.
(For more information, see the blog post [Rolling out access hours at Temporal](https://temporal.io/blog/rolling-out-access-hours-at-temporal).)

All Temporal engineering systems are secured by GitHub credentials, which require both membership in the Temporal GitHub organization and MFA.
Access grants are reviewed quarterly.

### Compliance

Temporal Technologies is SOC 2 Type 2 certified and compliant with GDPR and HIPAA regulations.
Compliance audits are available by request through our [Contact](https://pages.temporal.io/contact-us) page.
