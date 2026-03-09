---
id: managing-namespace
title: Namespace best practices
sidebar_label: Namespace best practices
description: Best practices for organizing and managing Temporal Namespaces, including naming conventions, organizational patterns, and production safeguards.
toc_max_heading_level: 4
keywords:
  - namespace management
  - temporal namespace
  - best practices
  - namespace configuration
tags:
  - Best Practices
  - Namespaces
---

:::info Applies to both open source and Temporal Cloud
This page covers namespace best practices that apply to **both** open source Temporal and Temporal Cloud.
Platform-specific guidance is clearly labeled throughout.

For reference documentation, see:
- [Namespace concepts](/namespaces)
- [Managing Namespaces (open source)](/self-hosted-guide/namespaces)
- [Namespaces (Temporal Cloud)](/cloud/namespaces)
:::

A [Namespace](/namespaces) is a unit of isolation within the Temporal Platform.
It ensures that Workflow Executions, Task Queues, and resources are logically separated, preventing conflicts and enabling safe multi-tenant usage.

## Naming Conventions

### Use lowercase and hyphens

Use lowercase letters and hyphens (`-`) as separators in Namespace names.

- **Temporal Cloud**: Namespace names are case-insensitive, so `MyNamespace` and `mynamespace` refer to the same Namespace.
- **Open source**: Namespace names are case-sensitive, so `MyNamespace` and `mynamespace` are different Namespaces.

To avoid confusion across environments, always use lowercase.

**Example**: `payment-checkout-prd`

### Follow a consistent naming pattern

Use a pattern like `<use-case>-<domain>-<environment>` to name Namespaces:

| Component | Max Length | Examples |
|-----------|------------|----------|
| Use case | 10 chars | `payments`, `fulfill`, `orders` |
| Domain | 10 chars | `checkout`, `notify`, `inventory` |
| Environment | 3 chars | `dev`, `stg`, `prd` |

**Examples**: `payments-checkout-dev`, `fulfill-notify-prd`, `orders-inventory-stg`

**Why this pattern?**
- Simple and easy to understand
- Clearly separates environments
- Groups related services under domains
- Allows platform teams to implement chargeback to application teams
- Namespace-level limits are isolated between different services and environments

:::tip Temporal Cloud
Cloud Namespace names are limited to [39 characters](/cloud/namespaces#temporal-cloud-namespace-name).
If you need to include region, use short codes (e.g., `aps1`, `use1`).
:::

## Organizational Patterns

### Pattern 1: Namespace per use case and environment

For simple configurations without multiple services or team boundaries.

**Naming convention**: `<use-case>_<environment>`

**Example**: `payments_prod`, `orders_dev`

### Pattern 2: Namespace per use case, service, and environment

When multiple services that are part of the same use case communicate externally to Temporal via API (HTTP/gRPC).

**Naming convention**: `<use-case>_<service>_<environment>`

**Example**: `payments_gateway_prod`, `payments_processor_prod`

### Pattern 3: Namespace per use case, domain, and environment

When multiple services need to communicate with each other, use [Temporal Nexus](/nexus) to connect Workflows across Namespace boundaries.
This provides better security, fault isolation, and modularity than sharing a Namespace.

**Naming convention**: `<use-case>_<domain>_<environment>`

**Example**: `payments_checkout_prod`, `payments_refunds_prod`

For systems without Nexus, services can communicate via [Signals](/sending-messages#sending-signals) or [Child Workflows](/child-workflows) within the same Namespace.

:::note Workflow ID uniqueness
When multiple teams share a Namespace, prefix each Workflow ID with a service-specific string to ensure uniqueness.
Task Queue names must also be unique within the Namespace.
:::

## Production Safeguards

### Use an Authorizer (open source only) {#authorizer}

Use a custom [Authorizer](/self-hosted-guide/security#authorizer-plugin) on your Frontend Service to set restrictions on who can create, update, or deprecate Namespaces.

If an Authorizer is not set, Temporal uses the `nopAuthority` authorizer that unconditionally allows all API calls.

On Temporal Cloud, [role-based access controls](/cloud/users#namespace-level-permissions) provide namespace-level authorization without custom configuration.

### Enable deletion protection (Temporal Cloud only) {#deletion-protection}

[Enable deletion protection](/cloud/namespaces#delete-protection) for production Namespaces to prevent accidental deletion.

### Enable High Availability (Temporal Cloud only) {#high-availability}

For business-critical use cases with strict uptime requirements, enable [High Availability features](/cloud/high-availability) for a [99.99% contractual SLA](/cloud/high-availability#high-availability-features).

### Use Infrastructure as Code (Temporal Cloud only) {#terraform}

Use the [Temporal Cloud Terraform provider](/cloud/terraform-provider) to manage Namespaces.
If Terraform isn't suitable, scripting against the [Cloud Ops API](/ops) or [tcld](/cloud/tcld) is a good alternative.

This provides:
- Documentation of each Namespace's purpose and owners
- Prevention of infrastructure drift
- Version-controlled configuration changes

Use `prevent_destroy = true` in your Terraform configuration to prevent accidental Namespace deletion via Terraform.
This is separate from [Temporal Cloud deletion protection](/cloud/namespaces#delete-protection), which prevents deletion through any interface.

**Reference**: [Example Terraform configuration](https://github.com/kawofong/temporal-terraform)

## Tagging (Temporal Cloud only) {#tagging}

[Tags](/cloud/namespaces#tag-a-namespace) are key-value metadata pairs that help organize, track, and manage Namespaces.

Tags complement your naming convention by adding metadata that doesn't fit in the Namespace name.
While the name captures use case, domain, and environment, tags can capture additional dimensions like team ownership, data sensitivity, or business criticality.

### Recommended tag categories

| Tag Key | Purpose | Examples |
|---------|---------|----------|
| `environment` | Deployment stage | `dev`, `staging`, `production` |
| `team` | Owning team | `platform`, `payments`, `identity` |
| `division` | Business unit | `engineering`, `finance`, `ops` |
| `criticality` | Business importance | `high`, `medium`, `low` |
| `data-sensitivity` | Data classification | `pii`, `pci`, `public` |
| `latency-sensitivity` | Performance tier | `realtime`, `batch`, `async` |

For tag structure, limits, and management instructions, see [How to tag a Namespace](/cloud/namespaces#tag-a-namespace).

## SDK Client Configuration

Set Namespaces in your SDK Client to isolate your Workflow Executions.
If you do not set a Namespace, all Workflow Executions started using the Client will be associated with the `default` Namespace.

You must register a Namespace before setting it in your Client.

For configuration details, see:
- [Namespace concepts](/namespaces)
- [Namespaces (Temporal Cloud)](/cloud/namespaces#access-namespaces)
