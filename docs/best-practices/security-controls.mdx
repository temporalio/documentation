---
id: security-controls
title: Security controls for Temporal Cloud
sidebar_label: Security controls for Cloud
description: Best practices for implementing and managing security controls in Temporal Cloud environments.
toc_max_heading_level: 4
keywords:
  - temporal cloud security
  - security controls
  - best practices
  - compliance
  - data protection
tags:
  - Best Practices
  - Security
  - Temporal Cloud
---

Temporal Cloud provides the capabilities of Self-Hosted Temporal as a managed service; it does not manage your applications or workers. Applications and services written using Temporal SDKs still run in your compute environment, and you have full control over how you secure your applications and services.

These best practices ensure your Temporal Cloud environment adheres to the security guidelines recommended by our team. You can also learn more about our security practices, compliance posture, and subscribe for vulnerability (CVE) updates at https://trust.temporal.io/. 

If you have any concerns or questions, please reach out to your Account Executive or to our security team at security@temporal.io.

:::tip 

**Stay Updated on Temporal Security Advisories:** 
Subscribe to Temporal’s security updates on the [Temporal Trust Portal](https://trust.temporal.io/) so you are aware of any patches or CVEs. While Temporal Cloud server-side updates are handled by the vendor, your Temporal SDKs (in application code) should be kept up-to-date.

:::

## Identity and Access Management

Strong identity management in Temporal Cloud is crucial for ensuring secure access for your Temporal account. It’s critical that only authorized users and services can access your Temporal Cloud account and that each has the minimum necessary permissions needed for their role. 

### Best Practices:

#### 1. Enable [SAML Single Sign-on](https://docs.temporal.io/cloud/saml) (SSO) for User Access

Integrate Temporal Cloud with your organization's identity provider via SAML 2.0 for centralized authentication. SSO allows you to enforce your corporate login policies (MFA, password complexity, etc.). When you configure SAML with Temporal Cloud, you can disable social logins (i.e. Microsoft, Google) by opening a support ticket. 

#### 2. Use Least-Privilege Roles for Temporal Cloud Users

Temporal Cloud provides [preconfigured account-level roles](https://docs.temporal.io/cloud/users) (Account Owner, Finance Admin, Global Admin, Developer, Read-Only) and Namespace-level permissions. Assign users the lowest level of access they need. For example, give developers access only to the Namespaces they work on, and use read-only roles for auditors or reviewers. Regularly review user roles and remove or downgrade accounts that are no longer needed

#### 3. Leverage SCIM or Automated User Provisioning

When applicable, use [SCIM](https://docs.temporal.io/cloud/scim) or the Temporal Cloud user management API to automate adding and removing user accounts. This ensures timely removal of access when people change roles or leave the organization.

#### Use Service Accounts for Automation

For non-human access (CI/CD pipelines, backend services), use [Temporal Cloud Service Accounts](https://docs.temporal.io/cloud/service-accounts) instead of shared user logins. Service Accounts are machine identities that can be granted specific permissions without ties to an individual. Create separate Service Accounts with unique API keys for different applications or microservices, and apply least privilege to each (e.g. a service account that only has access to one Namespace).

## Secure Application Authentication and API Access

Clients interact with the Temporal Service to initiate and manage Workflows, while Workers execute the business logic defined in Workflows and Activities in your own environment. 

A crucial aspect of strengthening your usage involves securing these interactions. Temporal Cloud offers two authentication methods for your applications: mutual TLS certificates and API keys.

### Best Practices:

#### 1. Using Mutual TLS (mTLS) provides comprehensive security

Temporal Cloud secures its gRPC endpoint per Namespace via mutual TLS. This means you provide a Certificate Authority (CA) certificate for your Namespace, and all your Temporal clients/workers must present client certificates signed by that CA. 

We recommend you enable mTLS for strong identity assurance of clients; it ensures only systems holding a valid certificate (issued by your trusted CA) can connect. Generate a private key and CA certificate (or use your enterprise CA) and upload the CA to Temporal Cloud. Do not share these certificates and associated keys beyond the authorized services.

#### 2. Proactively manage and rotate certificates

Track the expiration dates of your client and [Certificate Authority certificates](https://docs.temporal.io/cloud/certificates). Temporal Cloud trusts the uploaded CA; if it expires, all client authorizations will fail. Establish and automate a certificate rotation schedule (e.g. rotate client certificates quarterly and CA certificates annually, well before expiry). Temporal supports uploading a new CA certificate alongside the old one to allow seamless rollover. Always test new certificates in a staging environment if possible.

#### 3. If you’re using API Keys, handle them with strict care

Temporal Cloud API keys are an alternative to mTLS for authentication of SDKs, CLI, and automation. If you opt for API keys, handle them with strict care by enacting the following practices: 
- Keep them secret: store in a secrets manager, never in code or Git.
- Rotate at least every 90 days: Temporal lets you create a new key, swap it in, then delete the old one.
- One key per service/person: no sharing or reuse.
- Monitor usage & revoke on anomalies: feed Temporal audit logs to SIEM.
- Optional: Admins can disable all user API keys if your policy is “mTLS only.”

## Network Configuration and Isolation

Although Temporal Cloud is a SaaS offering, you retain control over its networking configurations, allowing for tailored security measures. By minimizing public internet exposure and segmenting Temporal workflows into suitable network zones, you can significantly bolster security and reduce potential vulnerabilities. This approach ensures that your workflows are isolated and protected within your defined network boundaries, even while leveraging the benefits of a cloud-based service. 

### Best Practices:

#### 1. Use Private Connectivity

Temporal Cloud supports private connectivity options such as [AWS PrivateLink](https://docs.temporal.io/cloud/connectivity/aws-connectivity) and [Google Cloud Private Service Connect](https://docs.temporal.io/cloud/connectivity/gcp-connectivity). If your infrastructure is in AWS or GCP, configure a PrivateLink/PSC endpoint for Temporal Cloud. This allows your workers and applications to reach Temporal Cloud over a private network path, avoiding traversal of the public internet. Private connectivity reduces the surface for man-in-the-middle attacks and can meet stringent network security policies.

#### 2. Separate environments by Namespace

Use [Temporal Namespaces](https://learn.temporal.io/best_practice_guides/managing_a_namespace/#2-use-domain-service-and-environment-to-name-namespaces) to isolate workflows for different environments or teams (e.g. development, staging, production). Each Namespace is logically segregated and cannot interact with others by default, providing a security boundary. 

Ensure that your production Namespace uses stricter network controls (e.g. only accessible from the prod network) and that credentials for it are separate from non-prod Namespaces. This limits the impact of any compromise in a lower environment, and as workflow data is only visible to users with access to that Namespace, separating environments by Namespace also enforces data-visibility boundaries.

## Data Protection and Encryption

Temporal's data encryption capabilities ensure the security and confidentiality of your Workflows and provide protection without compromising performance. Protecting the data that you send to and store in Temporal Cloud is a joint responsibility. Temporal Cloud already encrypts all data at rest on the server side, but you can add additional layers of encryption and control. 

### Best Practices:

#### 1. Enable Client-Side Encryption for Workflow Data

Temporal provides an optional [data conversion framework](https://docs.temporal.io/dataconversion) (Data Converter) and payload codec interface; customers must implement, deploy, and operate their own custom codec and manage encryption keys. 

In practice, this means you can encrypt any sensitive data before it is sent to Temporal Cloud and only decrypt it on the Client/Worker side. Because encryption keys stay under your control, you are responsible for key generation, secure storage, rotation, and versioning. Implementing this involves developing a custom codec plugin in your Temporal SDK and optionally (if you need to inspect decrypted payloads in the Web UI or CLI) deploying a dedicated codec server.

#### 2. Encode Workflow Failure Details with a [Failure Converter](https://docs.temporal.io/failure-converter)

Temporal’s default behavior copies error messages and call stacks as plain text, and this text is directly accessible in the Message field of Workflow Executions.

If your failure messages and stack traces contain sensitive information, it is recommended that you configure the [Failure Converter](https://docs.temporal.io/failure-converter) to encrypt the error information. This would encrypt the `message` and `stack_trace` fields in the payloads.

#### 3. Leverage Namespace Data Retention Policies

Temporal Cloud Namespace has a [Retention Period](https://docs.temporal.io/temporal-service/temporal-server#retention-period) setting for workflow histories (1 to 90 days). Set an appropriate retention period to balance operational needs with security. Shorter retention means completed workflow data (history, payloads) is purged sooner, reducing the amount of sensitive data stored in the cloud at any time. Document your retention choices to align with your company’s data retention policies and regulatory requirements. For retention periods over 90 days, these can be exported to your own GCS or S3 buckets.

### Availability and Disaster Recovery

Temporal Cloud’s platform is engineered for fault-tolerance out of the box, but you determine which Namespaces merit the very highest availability guarantees. Use the table below to decide when to turn on different High Availability models and how to operationalise them.

| Namespace scope | Use Case | Uptime SLA | Recovery Time Objective (RTO) | Recovery Point Objective (RPO) |
|-----------------|----------|------------|--------------------------------|--------------------------------|
| **Single-Region** | **If your application is built for one region and does not have stringent high-availability or disaster recovery requirements.** | 99.9% | ≤ 8 hours | ≤ 8 hours |
| **Same-Region Replication** | **If you want higher availability but your application is designed for a single region or if cross region latency doesn’t meet SLAs for application** | 99.99% | ≤ 20 minutes | Near-zero (≈ seconds) |
| **Multi-Region Replication** | **If a disruption of your workflow will cause loss of revenue, poor end-user experience, or issues with regulatory compliance.** | 99.99% | ≤ 20 minutes | Near-zero (≈ seconds) |
| **Multi-Cloud Replication** | **If you need the highest level of disaster tolerance, protecting against outages of an entire cloud provider (e.g., AWS or GCP)** | 99.99% | ≤ 20 minutes | Near-zero (≈ seconds) |

### Best Practices:

#### 1. Identify Availability-sensitive Namespaces

Run a business-impact analysis to flag workflows where a regional outage would cause significant customer, revenue, or safety impact. Identify Namespaces that are availability-sensitive where a regional outage may have outsized business impacts such as revenue loss, poor customer experience, or inability to meet legal obligations.

#### 2. Enable High Availability for business critical use cases

For many organizations, ensuring High Availability (HA) is required because of strict uptime requirements, compliance, and regulatory needs. 

For these critical use cases, enable High Availability features for specific namespaces for a [99.99% contractual SLA](https://docs.temporal.io/cloud/high-availability#high-availability-features). When choosing between [same-region, multi-region, and multi-cloud replication](https://docs.temporal.io/cloud/high-availability), it is recommended to use multi-region/multi-cloud replication to distribute your dependencies across regions. Using physically separated regions improves the fault tolerance of your application.

By default, Temporal Cloud provides a [99.9% contractual SLA guarantee](https://docs.temporal.io/cloud/high-availability) against service errors for all namespaces. 

Note: [enabling HA features for namespaces will 2x the consumption cost.](https://docs.temporal.io/cloud/pricing#high-availability-features)
