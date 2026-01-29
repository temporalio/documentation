---
id: multi-tenant-patterns
title: Multi-tenant application patterns
sidebar_label: Multi-tenant patterns
description: Learn how to build multi-tenant applications using Temporal with task queue isolation patterns, worker design, and best practices.
slug: /production-deployment/multi-tenant-patterns
toc_max_heading_level: 4
keywords:
  - multi-tenant
  - task queues
  - worker patterns
  - SaaS
tags:
  - Multitenancy
  - Best Practices
---

import { RelatedReadContainer, RelatedReadItem } from '@site/src/components';

Many SaaS providers and large enterprise platform teams use a single Temporal [Namespace](/namespaces) with [per-tenant Task Queues](#1-task-queues-per-tenant-recommended) to power their multi-tenant applications. This approach maximizes resource efficiency while maintaining logical separation between tenants.

This guide covers architectural patterns, design considerations, and practical examples for building multi-tenant applications with Temporal.

## Architectural principles

When designing a multi-tenant Temporal application, follow these principles:

- **Define your tenant model** - Determine what constitutes a tenant in your business (customers, pricing tiers, teams, etc.)
- **Prefer simplicity** - Start with the simplest pattern that meets your needs
- **Understand Temporal limits** - Design within the constraints of your Temporal deployment
- **Test at scale** - Performance testing must drive your capacity decisions
- **Plan for growth** - Consider how you'll onboard new tenants and scale workers

## Architectural patterns

There are three main patterns for multi-tenant applications in Temporal, listed from most to least recommended:

### 1. Task queues per tenant (Recommended)

**Use different [Task Queues](/task-queue) for each tenant's [Workflows](/workflows) and [Activities](/activities).**

This is the recommended pattern for most use cases. Each tenant gets dedicated Task Queue(s), with [Workers](/workers) polling multiple tenant Task Queues in a single process.

**Pros:**
- Strong isolation between tenants
- Efficient resource utilization
- Flexible worker scaling
- Easy to add new tenants
- Can handle thousands of tenants per [Namespace](/namespaces)

**Cons:**
- Requires worker configuration management
- Potential for uneven resource distribution
- Need to prevent "noisy neighbor" issues at the worker level

<RelatedReadContainer>
  <RelatedReadItem path="#task-queue-isolation-pattern" text="Task Queue Isolation Pattern Details" archetype="feature-guide" />
</RelatedReadContainer>

### 2. Shared Workflow Task Queues, separate Activity Task Queues

**Share [Workflow Task Queues](/task-queue) but use different [Activity Task Queues](/task-queue) per tenant.**

Use this pattern when [Workflows](/workflows) are lightweight but [Activities](/activities) have heavy resource requirements or external dependencies that need isolation.

**Pros:**
- Easier worker management than full isolation
- Activity-level tenant isolation
- Good for compute-intensive Activities

**Cons:**
- Less isolation than pattern #1
- Workflow visibility is shared
- More complex to reason about

### 3. Namespace per tenant

**Use a separate [Namespace](/namespaces) for each tenant.**

Only practical for a small number (< 50) of high-value tenants due to operational overhead.

**Pros:**
- Complete isolation between tenants
- Per-tenant rate limiting
- Maximum security

**Cons:**
- Higher operational overhead
- Credential and connectivity management per [Namespace](/namespaces)
- Requires more [Workers](/workers) (minimum 2 per Namespace for high availability)
- Expensive at scale

<RelatedReadContainer>
  <RelatedReadItem path="/evaluate/development-production-features/multi-tenancy#namespace-isolation" text="Namespace Isolation in Temporal Cloud" archetype="cloud-guide" />
</RelatedReadContainer>

## Task Queue isolation pattern

This section details the recommended pattern for most multi-tenant applications.

### Worker design

When a [Worker](/workers) starts up:

1. **Load tenant configuration** - Retrieve the list of tenants this Worker should handle (from config file, API, or database)
2. **Create [Task Queues](/task-queue)** - For each tenant, generate a unique Task Queue name (e.g., `customer-{tenant-id}`)
3. **Register [Workflows](/workflows) and [Activities](/activities)** - Register your Workflow and Activity implementations once, passing the tenant-specific Task Queue name
4. **Poll multiple Task Queues** - A single Worker process polls all assigned tenant Task Queues

```go
// Example: Go worker polling multiple tenant Task Queues
for _, tenant := range assignedTenants {
    taskQueue := fmt.Sprintf("customer-%s", tenant.ID)

    worker := worker.New(client, taskQueue, worker.Options{})
    worker.RegisterWorkflow(YourWorkflow)
    worker.RegisterActivity(YourActivity)
}
```

### Routing requests to Task Queues

Your application needs to route [Workflow](/workflows) starts and other operations to the correct tenant [Task Queue](/task-queue):

```go
// Example: Starting a Workflow for a specific tenant
taskQueue := fmt.Sprintf("customer-%s", tenantID)
workflowOptions := client.StartWorkflowOptions{
    ID:        workflowID,
    TaskQueue: taskQueue,
}
```

Consider creating an API or service that:
- Maps tenant IDs to Task Queue names
- Tracks which [Workers](/workers) are handling which tenants
- Allows both your application and Workers to read the mappings of:
    1. Tenant IDs to Task Queues 
    1. Workers to tenants

### Capacity planning

Key questions to answer through performance testing:

**[Namespace](/namespaces) capacity:**
- How many concurrent [Task Queue](/task-queue) pollers can your Namespace support?
- What are your [Actions Per Second (APS)](/cloud/limits#actions-per-second) limits?
- What are your [Operations Per Second (OPS)](/references/operation-list) limits?

**[Worker](/workers) capacity:**
- How many tenants can a single Worker process handle?
- What are the CPU and memory requirements per tenant?
- How many concurrent [Workflow](/workflows) executions per tenant?
- How many concurrent [Activity](/activities) executions per tenant?

**SDK configuration to tune:**
- `MaxConcurrentWorkflowTaskExecutionSize`
- `MaxConcurrentActivityExecutionSize`
- `MaxConcurrentWorkflowTaskPollers`
- `MaxConcurrentActivityTaskPollers`
- Worker replicas (in Kubernetes deployments)

### Provisioning new tenants

Automate tenant onboarding with a Temporal [Workflow](/workflows):

1. Create a tenant onboarding Workflow that:
   - Validates tenant information
   - Provisions infrastructure
   - Deploys/updates [Worker](/workers) configuration
   - Triggers Worker restarts or scaling
   - Verifies the tenant is operational

2. Store tenant-to-Worker mappings in a database or configuration service

3. Update Worker deployments to pick up new tenant assignments

## Practical example

**Scenario:** A SaaS company has 1,000 customers and expects to grow to 5,000 customers over 3 years. They have 2 [Workflows](/workflows) and ~25 [Activities](/activities) per Workflow. All customers are on the same tier (no segmentation yet).

### Assumptions

| Item | Value |
|------|-------|
| Current customers | 1,000 |
| Workflow Task Queues per customer | 1 |
| Activity Task Queues per customer | 1 |
| Max Task Queue pollers per Namespace | 5,000 |
| SDK concurrent Workflow task pollers | 5 |
| SDK concurrent Activity task pollers | 5 |
| Max concurrent Workflow executions | 200 |
| Max concurrent Activity executions | 200 |

### Capacity calculations

**[Task Queue](/task-queue) poller limits:**
- Each [Worker](/workers) uses 10 pollers per tenant (5 Workflow + 5 Activity)
- Maximum Workers in [Namespace](/namespaces): 5,000 pollers ÷ 10 = **500 Workers**

**Worker capacity:**
- Each Worker can theoretically handle 200 [Workflows](/workflows) and 200 [Activities](/activities) concurrently
- Conservative estimate: **250 tenants per Worker** (accounting for overhead)
- For 1,000 customers: **4 Workers minimum** (plus replicas for HA)
- For 5,000 customers: **20 Workers minimum** (plus replicas for HA)

**Namespace capacity:**
- At 250 tenants per Worker, need 2 Workers per group of tenants (for HA)
- Maximum tenants in Namespace: (500 Workers ÷ 2) × 250 = **62,500 tenants**

:::note
These are theoretical calculations based on SDK defaults. **Always perform load testing** to determine actual capacity for your specific workload. Monitor CPU, memory, and Temporal metrics during testing.

While testing, also pay attention to your [metrics capacity and cardinality](/cloud/metrics/openmetrics/api-reference#managing-high-cardinality).
:::

### Worker assignment strategies

**Option 1: Static configuration**
- Each [Worker](/workers) reads a config file listing assigned tenant IDs
- Simple to implement
- Requires deployment to add tenants

**Option 2: Dynamic API**
- Workers call an API on startup to get assigned tenants
- Workers identified by static ID (1 to N)
- API returns tenant list based on Worker ID
- More flexible, no deployment needed for new tenants

## Best practices

### Monitoring

Track these [metrics](/references/sdk-metrics) per tenant:
- [Workflow completion](/cloud/metrics/openmetrics/metrics-reference#workflow-completion-metrics) rates
- [Activity execution](/cloud/metrics/openmetrics/metrics-reference#task-queue-metrics) rates
- [Task Queue backlog](/cloud/metrics/openmetrics/metrics-reference#task-queue-metrics)
- [Worker resource utilization](/references/sdk-metrics#worker_task_slots_used)
- [Workflow failure rates](/encyclopedia/detecting-workflow-failures)

### Handling noisy neighbors

Even with [Task Queue](/task-queue) isolation, monitor for tenants that:
- Generate excessive load
- Have high failure rates
- Cause [Worker](/workers) resource exhaustion

Strategies:
- Implement per-tenant rate limiting in your application
- Move problematic tenants to dedicated Workers
- Use [Workflow](/workflows)/[Activity](/activities) timeouts aggressively

### Tenant lifecycle

Plan for:
- **Onboarding** - Automated provisioning [Workflow](/workflows)
- **Scaling** - When to add new [Workers](/workers) for growing tenants
- **Offboarding** - Graceful tenant removal and data cleanup
- **Rebalancing** - Redistributing tenants across Workers

### Search Attributes

Use [Search Attributes](/search-attribute) to enable tenant-scoped queries:
```go
// Add tenant ID as a Search Attribute
searchAttributes := map[string]interface{}{
    "TenantId": tenantID,
}
```

This allows filtering [Workflows](/workflows) by tenant in the UI and SDK:
```sql
TenantId = 'customer-123' AND ExecutionStatus = 'Running'
```

## Related resources

<RelatedReadContainer>
  <RelatedReadItem path="/evaluate/development-production-features/multi-tenancy" text="Multi-tenancy Overview" archetype="feature-guide" />
  <RelatedReadItem path="/cloud/limits" text="Temporal Cloud Limits" archetype="cloud-guide" />
  <RelatedReadItem path="/visibility" text="Visibility and Search Attributes" archetype="feature-guide" />
</RelatedReadContainer>
