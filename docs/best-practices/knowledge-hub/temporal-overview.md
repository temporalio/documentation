---
id: temporal-overview
title: Temporal Overview
sidebar_label: Temporal Overview
description: Learn what Temporal is, why users love it, and how it delivers business value across various industries.
toc_max_heading_level: 3
keywords:
  - temporal overview
  - what is temporal
  - durable execution
  - temporal use cases
tags:
  - Best Practices
  - Knowledge Hub
---

:::info
This page is part of the [Temporal Knowledge Hub](./index.md).
:::

## What is Temporal?

:::note
Customize this introduction to describe Temporal that resonates with your developers. Highlight pain points Temporal solves for your developers.
:::

Temporal provides a new way to build scalable, reliable applications.

**Temporal** is an **open-source Durable Execution** platform that abstracts away the complexity of building distributed systems.
Durable Execution ensures that your application behaves correctly despite adverse conditions by guaranteeing that it will run to completion.
If a failure or a crash happens, your business processes keep running seamlessly without interruptions.

With Temporal, engineering teams improve development velocity and deliver more reliable applications.

Temporal is used for critical applications at enterprises like [Nvidia](https://temporal.io/blog/transforming-gpu-resource-management-with-temporal), [ANZ Bank](https://temporal.io/resources/case-studies/anz-story), [Netflix](https://temporal.io/resources/on-demand/netflix), [Snap](https://eng.snap.com/build_a_reliable_system_in_a_microservices_world_at_snap), [Yum! Brands](https://temporal.io/resources/on-demand/temporal-at-yum-brands), and AI leaders like [Replit](https://temporal.io/resources/case-studies/replit-uses-temporal-to-power-replit-agent-reliably-at-scale), [OpenAI](https://newsletter.pragmaticengineer.com/p/chatgpt-images).

## Why users love Temporal

:::note
Update this list to reflect why your organization chose Temporal.
:::

1. **Durability**: your code never "forgets" where it is. If a server crashes or restarts, your function resumes exactly where it left off, ensuring no data or progress is ever lost.
2. **Easy-to-use code structure:**
   * Choose between the Python and Java SDKs that best suit you and start writing your business logic.
   * Integrate your favorite IDE, libraries, and tools into your development process. Temporal also supports polyglot and idiomatic programming - which enables developers to leverage the strengths of various programming languages and integrate Temporal into existing codebases.
3. **Simplicity:** You can achieve all of this without having to manage queues or complex state machines. Temporal does this all for you.
4. **Visibility:** Temporal provides a Web UI, SDK and Cloud metrics, and OpenTelemetry integration that gives developers unprecedented visibility into the current state of their applications.

## Temporal business value

:::note
Replace with metrics showing Temporal's impact at your organization.
:::

At ABC Financial, Temporal serves as the development standard and platform for all asynchronous operations (e.g. payment, statement processing).
Since adopting Temporal, the company has saved millions of dollars.
The Temporal platform team continuously monitor the following business metrics to justify the adoption of Temporal:

| Metric | Before Temporal | With Temporal | Result |
| ------ | --------------- | ------------- | ------ |
| **Service availability** | 99.7% (~2 hours of stalled transactions/month) | 99.99% (&lt;5 minutes of stalled transactions/month) | $2.5M+ annual savings in operational costs |
| **On-call alert volume** | 28 actionable alerts/week | &lt;3 alerts/week | ~90% reduction in on-call toil |
| **Feature time-to-market** | 9 months average (some projects take 12-18 months) | 3 months average | 66% faster product delivery |

## Temporal use cases at ABC Financial

:::note
Replace with Temporal use cases for your organization.
:::

### FinTech/Financial Services

1. **Payment processing** - Reliable payment orchestration with automatic retries and compensation logic (ex. [Block using Temporal](https://temporal.io/resources/on-demand/block-real-world-payments) for their checkout processes)
2. **Customer onboarding** - Leverage Temporal for multi-step customer verification and account setup processes (ex. [Mollie](https://temporal.io/resources/case-studies/mollie-payments-maximizes-operational-efficiency) for their customer onboarding processes)
3. **Cryptocurrency operations** - Orchestrate blockchain payments and crypto transactions (ex. [Coinbase](https://temporal.io/resources/case-studies/coinbase) uses Temporal for reliable crypto transactions)
4. **Operational workflows** - Various operational processes requiring high reliability

### Banking

1. **Loan origination** - Long-running approval processes with complex decision trees and human approvals (ex. [ANZ accelerates home loan origination](https://temporal.io/resources/case-studies/anz-story) with Temporal)
2. **Payment processing** - Core banking payment systems with high reliability requirements (ex. [JPMC uses Temporal](https://temporal.io/resources/on-demand/payments-modernization-jpmc) to handle complex transactions across multiple systems)
3. **Digital banking modernization** - Replacing legacy mainframe systems with cloud-native workflows (ex. [Will Bank](https://temporal.io/resources/on-demand/how-will-bank-leverages-temporal-to-handle-2-million-customers) modernized boleto processing and scaled to millions with Temporal)

### Tech/Software

1. **Data pipelines** - Orchestrate complex data processing workflows with reliability guarantees (ex. [Netflix](https://temporal.io/resources/on-demand/netflix) powers critical data pipelines on Temporal)
2. **Microservices deployment** - Coordinate deployment processes across distributed systems (ex. [Box](https://temporal.io/resources/case-studies/box) uses Temporal as a central "brain" for content operations)
3. **Workflow orchestration** - General workflow orchestration, improving development efficiency (ex. [AutoKitteh](https://temporal.io/resources/case-studies/autokitteh) increased reliability and reduced development effort with Temporal)
4. **Cloud migration** - Leverage Temporal for orchestrating complex cloud migration processes (ex. [SAP Concur](https://temporal.io/resources/case-studies/sap-concur) orchestrated a phased migration with Temporal)
5. **Infrastructure management** - Coordinate distributed operations and transactional changes reliably (ex. [DigitalOcean](https://temporal.io/resources/case-studies/digitalocean) reduced resources and developer backlog with Temporal)

### AI

1. **Long-running AI agents** - Durable execution for sophisticated agents requiring human-in-the-loop interactions (ex. [Replit uses Temporal](https://temporal.io/resources/case-studies/replit-uses-temporal-to-power-replit-agent-reliably-at-scale) to power Replit Agent reliably at scale)
2. **AI orchestration** - Coordinating multi-agent systems and LLM calls with fallback strategies (ex. [Dubber](https://temporal.io/resources/case-studies/dubber) runs conversational AI pipelines on Temporal)
3. **Data orchestration** - Managing complex AI/ML pipelines and model training workflows (ex. [Descript](https://temporal.io/resources/case-studies/descript) orchestrates applied-AI pipelines with Temporal)

### Healthcare

1. **Clinical assessments and diagnostics orchestration** - Orchestrate multi-step clinical assessments and diagnostic pipelines (ex. [Linus Health](https://temporal.io/resources/on-demand/transitioning-durable-workflows-cognitive-healthcare) uses Temporal to orchestrate cognitive assessments and analytics end-to-end)
2. **AI/ML inference and data processing in healthcare contexts** - Long-running AI/ML workflows for preprocessing, model inference, post-processing, and results delivery (ex. [Zebra Medical Vision](https://temporal.io/resources/case-studies/zebra-medical-vision)'s applied-AI diagnostics pipeline relies on Temporal for reliability and visibility)
3. **Medical imaging and bioinformatics pipelines** - Reliable, scalable orchestration for compute-heavy imaging workflows, transcription/feature extraction, and downstream analysis (ex. [Jackson Laboratory](https://temporal.io/resources/on-demand/imaging-workflows-temporal-cure-cancer) uses Temporal for imaging workflows and biological data science pipelines)

### Retail

1. **Order management and bookings** - Managing complex order fulfillment processes from payment to delivery (ex. [Yum! Brands](https://temporal.io/resources/on-demand/temporal-at-yum-brands) processes the majority of digital orders as Temporal Workflows)
2. **Orchestrating distributed transactions** - Coordinating multi-step e-commerce workflows (ex. [Vinted](https://temporal.io/resources/case-studies/vinted-10-12-million-worflows-daily-dev-velocity-low-cost) runs payment workflows at massive scale on Temporal)

### Travel/Logistics

1. **Logistics orchestration** - Managing complex shipping and delivery workflows (ex. [Maersk](https://temporal.io/resources/case-studies/maersk) built a "time machine" for logistics with Temporal to speed feature delivery)
2. **Booking management** - Long-running reservation and travel coordination processes (ex. [Turo](https://temporal.io/resources/on-demand/temporal-adoption-and-integration-at-turo) describes Temporal adoption and integration for durable, user-facing flows)
