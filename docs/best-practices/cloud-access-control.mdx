---
id: cloud-access-control
title: Managing Temporal Cloud access control
sidebar_label: Managing Cloud access control
description: Best practices for managing access control, permissions, and user management in Temporal Cloud.
toc_max_heading_level: 4
keywords:
  - temporal cloud
  - access control
  - permissions
  - user management
  - best practices
tags:
  - Best Practices
  - Temporal Cloud
  - Security
---

Temporal Cloud supports two secure authentication methods for Workers:
- **mTLS Certificates**
- **API Keys** (configured via the UI when creating a namespace)

Both options help secure communication between workers and Temporal Cloud. Choosing the right method and managing it properly is key to maintaining security and minimizing downtime. 

The high-level end-to-end rotation process is:

1. **Generate new credentials**: Create new certificates or API keys in Temporal Cloud before the current ones expire
2. **Support dual credentials**: Update Temporal Cloud to support both old and new credentials
3. **Migrate Workers**: Transition Worker applications from old credentials to new credentials
4. **Validate connectivity**: Confirm all Workers can authenticate, and business processes operate normally with new credentials
5. **Remove old credentials**: Remove old certificates and API keys from your secrets provider after confirming successful migration 

This approach ensures near-zero-downtime rotation and prevents authentication failures that could impact running workflows. For specific guidance to rotate mTLS certificates and API keys, see:
- https://docs.temporal.io/cloud/certificates#manage-certificates 
- https://docs.temporal.io/cloud/api-keys#rotate-an-api-key 
- https://github.com/temporal-sa/temporal-Worker-cert-rotation 

For mutual TLS (mTLS) implementations, using Let's Encrypt is not recommended, as it is designed primarily for public-facing services and lacks support for internal certificate requirements. 

While we are not making a specific product recommendation, there are several valid options for managing certificates. Many organizations choose vendor solutions such as AWS Private CA, Setigo, Microsoft Certification Authority, or DigiCert for their robust integration and lifecycle features. Alternatively, self-signed certificates are a valid and commonly used approach, even in production environments. If you choose to self-sign, tools like [OpenSSL](https://openssl-library.org/), [CFSSL](https://github.com/cloudflare/cfssl), or [step CLI](https://github.com/smallstep/cli) can help generate and manage certificates effectively. 

Select the option that aligns best with your infrastructure, security requirements, and operational needs.

In the case that you are using multiple certificates signed by the same CA, and some of these certificates are for production environments, there are some workarounds you can employ. 

One convention is to give certificates a common name that matches the namespace. If you do this when using the same CA for dev and prod, then you can leverage Certificate Filters to prevent access to production environments. This is described in detail under the [authorization section](https://docs.temporal.io/cloud/certificates#control-authorization) of the documentation. 

## Best practices: 
#### 1. Establish clear guidelines on authentication methods: Teams should standardize on either [mTLS certificates](https://docs.temporal.io/cloud/certificates) or [API keys](https://docs.temporal.io/cloud/api-keys) for the following operations:
- Connect Temporal clients to Temporal Cloud (e.g. Worker processes)
- Automation (e.g. Temporal Cloud [Operations API](https://docs.temporal.io/ops), [Terraform provider](https://docs.temporal.io/cloud/terraform-provider), [Temporal CLI](https://docs.temporal.io/cli/setup-cli))

    By default, it is recommended for teams to use API keys and [service accounts](https://docs.temporal.io/cloud/service-accounts) for both operations because API keys are easier to manage and rotate for most teams. In addition, you can control account-level and namespace-level roles for service accounts. 

    If your organization requires mutual authentication and stronger cryptographic guarantees, then it is encouraged for your teams to use mTLS certificates to authenticate Temporal clients to Temporal Cloud and use API keys for automation (because Temporal Cloud [Operations API](https://docs.temporal.io/ops) and [Terraform provider](https://docs.temporal.io/cloud/terraform-provider) only supports API key for authentication)

#### 2. Use Certificate Filters to restrict access when using shared CAs (e.g., `dev` vs `prod`):

  Certificate Filters are an additional way of validating using the client certificate presented during client authenticationGive certificates a common name that matches the namespace. This is not a requirement.   

  If you do this when using the same CA for dev and prod environments, then you can leverage Certificate Filters to prevent access to production. 
