---
id: what-is-a-temporal-sdk
title: What is a Temporal SDK?
sidebar_label: Temporal SDK
description: A Temporal SDK is a language-specific library that offers APIs to construct and use a Temporal Client to communicate with a Temporal Cluster, develop Workflow Definitions, and develop Worker Programs.
tags:
  - explanation
---

A Temporal SDK is a language-specific library that offers APIs to do the following:

1. Construct and use a [Temporal Client](#what-is-a-temporal-client)
2. Develop [Workflow Definitions](/docs/concepts/what-is-a-workflow-definition)
3. Develop [Worker Programs](/docs/concepts/what-is-a-worker-program)

A Temporal SDK enables you to write your application code using the full power of the programming language, while the Temporal Platform handles the durability, reliability, and scalability of the application.

Temporal currently offers the following SDKs:

- [How to use the Go SDK](/docs/go/)
- [How to use the Java SDK](/docs/java/)
- [How to use the PHP SDK](/docs/php/introduction)
- [How to use the TypeScript SDK](/docs/typescript/introduction)

### What is a Temporal Client?

A Temporal Client is available in each SDK and provides a set of APIs to communicate with a [Temporal Cluster](/docs/concepts/what-is-a-temporal-cluster).

The most common operations that a Temporal Client enables you to perform are the following:

- Start a Workflow Execution.
- Get the result of Workflow Execution.
- Signal a Workflow Execution.
- Query a Workflow Execution.
- List Workflow Executions.

### SDK metrics

- [SDK metrics reference](/docs/references/sdk-metrics)
