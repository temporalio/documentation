---
id: what-is-versioning
title: What is Versioning?
sidebar_label: Versioning
description: Versioning lets you more easily deploy changes to Workflow Definitions.
tags:
  - explanation
ssdi:
  - Introduced in Temporal Server version [1.21.0](https://github.com/temporalio/temporal/releases/tag/v1.21.0)
  - Available in [Go SDK](/dev-guide/go/versioning#worker-versioning) version [1.23.0](https://github.com/temporalio/sdk-go/releases/tag/v1.23.0)
  - Available in [Java SDK](/dev-guide/java/versioning#worker-versioning) version [1.20.0](https://github.com/temporalio/sdk-java/releases/tag/v1.20.0)
  - Will come to CLI in version 0.10.0
  - Not yet available in Temporal Cloud
---

# Workflow Versioning

Workflow Versioning includes the following strategies:

- [Worker Versioning](#worker-versioning)
- [Patching](#patching)
- [Workflow Type](#workflow-type-versioning)

## Worker Versioning

## Patching

Patching, is a set of steps or a technique used to manage changes or upgrades to your Workflow’s logic. Because Workflows can run for weeks, months, or years you may want to make changes to your Workflow code over time.

Take the example of needing to modify some business logic that oversees the shipment of an item. Terminating all Workflows midway through delivery would not be a desirable approach. Instead, you would use patching to update your Workflow code.

:::note

In the Go and Java SDKs, Patching is referred to as `GetVersion`.

:::

### What is Patching

Patch is a technique that allows you to update your Workflow code without terminating any running Workflows and retaining compitiaibiliyt with your Workflow Event History, as a a way to manage changes or upgrades to your Workflow’s logic.

## Workflow Type Versioning

Workflow Type versioning is a technique that involves creating a new Workflow Type for every iteration or version of your Workflow. This strategy represents the most basic form of Workflow Versioning.

### What is Workflow Type Versioning?

In essence, Workflow Type versioning is the process of delineating different versions of your Workflow by associating them with distinct Workflow Types. For instance, when you modify a Workflow code path, you update the Workflow Type as the next iteration in a sequence of Workflow Types: `workflow-v1`, `workflow-v2`, `workflow-v3`.

This approach offers a clear and straightforward way of distinguishing between various versions of your Workflow.

### Implement Workflow Type Versioning

To implement Workflow Type versioning, you need to create a new Workflow Type each time you intend to deploy an updated version of your Workflow. For instance, upon deploying `workflow-v1`, if you need to make changes, you would create a new Workflow Type and designate it as `workflow-v2`. The process continues in the same vein for all subsequent versions, such as `workflow-v3`, `workflow-v4`, and so forth.
While this approach is simple, it does require you to manually update all starters to use the latest Workflow Type. Additionally, you need to keep track of all Workflow Types and their corresponding versions.

### Advantages of Workflow Type Versioning

Workflow Type versioning is valuable in several respects:

- **Simplicity:** Workflow Type versioning provides a straightforward way to version your Workflows, making it an excellent choice for uncomplicated or small-scale projects.
- **Single Worker Fleet:** With this approach, you're not required to manage separate Worker fleets for each version of your Workflow, potentially minimizing infrastructure complexity and cost.

### Disadvantages of Workflow Type Versioning

Workflow Type versioning has several drawbacks:

- **Manual Updates:** All starters need to be informed about each new Workflow Type and its corresponding version, which might introduce communication overhead and room for error.
- **Version Tracking:** It necessitates meticulous tracking of all Workflow Types and their corresponding versions, which could become cumbersome as the number of versions increases.
