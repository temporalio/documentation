---
id: what-is-the-security-of-temporal-cloud
title: What is the Security of Temporal Cloud
sidebar_label: Security
description: Temporal Cloud's Security
sidebar_position: 3
---

## Customer Application & Data Security

### Code Execution Boundaries

Temporal Cloud is a managed service environment; it does not manage a customer’s applications or workers. Applications and services written using Temporal’s SDK run in the customer’s computing environment, such as containers (Docker, Kubernetes) or virtual machines (in any hosting environment). Customers have full control over how they secure their applications and services.

### Client-side Encryption

Temporal provides a [Data Converter](concepts/what-is-a-data-converter)—a plugin that can be configured to transparently encrypt and decrypt workflow data on the customer side; the Temporal Server does not need decrypted data to operate. If this feature is configured by our customers, data stored in Temporal Cloud remains secure even if the service itself is compromised. Temporal’s Data Converter also allows customers to securely decrypt data in the Temporal UI without sharing encryption material with Temporal.

## Temporal Cloud Platform Security

### Isolation

The base unit of isolation in a Temporal environment is the “namespace.” Each customer can have dozens of namespaces associated with their account. Namespaces (regardless of account) cannot interact with other namespaces. Each namespace is available through a secure gRPC (mTLS) endpoint and an HTTPS (TLS) endpoint. These can be made more secure by routing all communication through AWS PrivateLink.

Temporal Cloud is a multi-tenant service by default. Namespaces in the same environment are logically segregated from each other. Namespaces do not share data processing or data storage across regional boundaries.

### Encryption

Communication into and out of namespaces is over mTLS (for gRPC endpoints) or TLS (for HTTPS endpoints). All communication within our production environments is over mTLS 1.3. Data is stored in two separate locations: an Elasticsearch instance used to power the search function in each namespace’s web UI, and our core data storage. Both are encrypted at rest with AES 256 GCM.

### Identity

Authentication to gRPC endpoints is provided by mTLS on a per-namespace basis. Authentication to HTTPS endpoints are through Auth0, which supports both local and federated logins.

### Access

Authorization is managed at the account and namespace level. Users and systems are assigned one or multiple preconfigured roles. Users hold roles of administrators, developers, and read-only users. Systems or application processes hold their own distinct roles.

### Monitoring

In addition to extensive system monitoring for operational and availability requirements, we collect and monitor audit logs from the AWS environment, Auth0, and all calls to the gRPC API (which the Web UI uses to populate data). These audit logs can be made available to customers for ingestion into their own security monitoring system

### Testing

We contract with a third party to perform a full-scope pentest (with the exception of social engineering) at least yearly. Additionally, we perform targeted third-party and internal testing on an ad hoc basis (such as when a significant feature is being released).

### Temporal Cloud Access

Access to production systems is restricted to the small team of employees tasked with maintaining our production infrastructure. All access to production systems is logged; shared accounts are not allowed. Access to all production systems is through SSO, with MFA enabled.

All Temporal engineering systems are secured via GitHub credentials, which requires both Temporal GitHub Organization membership and MFA. Access grants are reviewed on a quarterly basis.

### Compliance

Temporal Technologies is SOC 2 Type 2 certified and compliant with GDPR.
