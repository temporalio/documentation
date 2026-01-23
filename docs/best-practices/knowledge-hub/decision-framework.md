---
id: decision-framework
title: Temporal Decision Framework
sidebar_label: Decision Framework
description: A guide to help you determine whether Temporal is the right solution for your use case.
toc_max_heading_level: 3
keywords:
  - temporal decision framework
  - when to use temporal
  - temporal use cases
  - temporal alternatives
tags:
  - Best Practices
  - Knowledge Hub
---

:::info
This page is part of the [Temporal Knowledge Hub](./index.md).
:::

This guide helps you quickly determine whether Temporal is the right solution for your use case.

## Temporal decision framework

:::note
Tailor these questions to match your organization's technical landscape.
:::

To decide whether Temporal is a suitable solution for your use case, ask yourself 3 questions:

1. **Does your digital process have multiple steps that can fail independently?**
2. **Do you need the process to survive failures?**
3. **Does your process span multiple services, APIs, or long time periods (i.e. &gt;10 seconds)?**

If you answered "**yes**" to 2 or more questions, Temporal is likely a good fit. Continue reading.

If you answered "**no**" to all three questions, consider alternatives first. Skip to [Bad use cases for Temporal](#bad-use-cases-for-temporal) to explore alternative solutions.

## Temporal benefits

:::note
Highlight benefits that address your developers' pain points.
:::

1. **Durable Execution** - your code will always complete.
   * Automatic retry, recovery from infrastructure failures, durable state persistence, and exactly-once execution semantics—all without custom code.
2. **Developer velocity** - ship faster with less code to maintain.
   * Write business logic in familiar languages, collaborate with developers across language barriers, eliminate boilerplate infrastructure code, and leverage built-in testing for rapid iteration.
3. **Audit trail** - complete visibility in your digital process.
   * Immutable execution history, self-documenting Workflow execution, and operational transparency.
4. **Priority and Fairness** - enterprise-grade multi-tenancy.
   * Priority-based execution, and fair distribution of Workflow Executions across your customer base or tenant.
5. **Workflow fabric** - break down development silo.
   * Cross-team Workflow orchestration with reusable operations, cross-namespace coordination, and service registry for discoverability.

## Good use cases for Temporal

:::note
Replace with use cases from your domain. See [Customer Stories](https://temporal.io/in-use) for inspiration.
:::

### Business transactions

1. **Payment processing**
   * **Why Temporal is perfect**: Multi-party coordination with compensation logic, audit requirements, idempotency guarantees, timeout handling for authorizations that expire, and scalability to support more than billions of transactions per day.
2. **Order management**
   * **Why Temporal is perfect**: Long-running state machines spanning hours to days with complex state transitions, human intervention, parallel operations, different order priority, variable timing per order, and support for more than millions of orders per hour.
3. **Mortgage underwriting**
   * **Why Temporal is perfect**: Weeks-long processes with complex decision trees, multiple external integrations, human approvals, strict compliance requirements, and durable state persistence.

### Customer experience

1. **Marketing campaign**
   * **Why Temporal is perfect**: Multi-channel orchestration with time-based sequencing and long campaign durations with dynamic personalization.
2. **Customer onboarding**
   * **Why Temporal is perfect:** Great for long-running, multi-step, and sometimes human-in-the-loop processes that onboarding often requires.

### Data engineering

1. **Document processing**
   * **Why Temporal is perfect**: Multi-stage pipelines with variable processing times, external service dependencies, rate limit requirements, and coordinated large-scale processing.
2. **Data pipeline**
   * **Why Temporal is perfect**: Data orchestration with complex dependencies, incremental processing, backfill coordination, cross-system dependencies, SLA monitoring, and idempotent execution.
3. **Video processing**
   * **Why Temporal is perfect**: Long-running compute, resource-intensive GPU activities, complex pipelines with parallel variant generation, failure isolation, and cost-optimized scheduling.

### AI/ML

1. **ML inference**
   * **Why Temporal is perfect**: Multi-model orchestration with fallback logic, batch and real-time handling, feature engineering, and comprehensive audit trail.
2. **RAG**
   * **Why Temporal is perfect**: Multi-step retrieval with hybrid search, context assembly from multiple sources, LLM orchestration with retries and fallbacks, and evaluation pipeline tracking.
3. **AI agents**
   * **Why Temporal is perfect**: Long-running autonomous execution with tool orchestration, planning and replanning, human-in-the-loop controls, durable memory management, and safety guardrails.

### Operational

1. **Infrastructure management**
   * **Why Temporal is perfect**: Multi-step provisioning with automatic rollback on failure, idempotent cloud operations, change management, and complete auditability.
2. **CI/CD**
   * **Why Temporal is perfect**: Complex pipeline stages with environment promotion gates, parallel test execution, conditional deployment strategies, automatic rollback monitoring, and approval gates.

## Bad use cases for Temporal

:::note
Add anti-patterns specific to your organization's domain and technology stack.
:::

1. **Simple Request-Response APIs**
   * No failure recovery needed
   * Better alternative: REST / gRPC server
2. **Real-time stream processing**
   * High throughput (&gt;1M events/sec)
   * Ultra-low latency requirements (&lt;100ms)
   * No durable state needed
   * Better alternative: Flink, Amazon Kinesis, Google Cloud Dataflow
3. **Database triggers & stored procedures**
   * Logic tightly coupled to database
   * Needs transactional guarantees within single DB
   * No external service calls
   * Better alternative: database native features
4. **Pure Compute Workloads**
   * CPU/GPU intensive calculations
   * No I/O or service calls
   * No state management needed
   * Better alternative: AWS Lambda, Spark, Ray

## Next steps

:::note
Add relevant links (i.e. support channel) for your developers to explore next.
:::

To learn more:

* [Run your first Temporal Workflow in under 30 minutes](./getting-started.md)
* Schedule a discovery session with the Temporal platform team to validate your use case
* [See how other teams are using Temporal today](./temporal-overview.md#temporal-use-cases-at-abc-financial)
